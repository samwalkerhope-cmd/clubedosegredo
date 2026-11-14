-- Rode este arquivo inteiro no Supabase: SQL Editor > New query > colar > Run.
-- Pode ser rodado mais de uma vez sem problema.

-- ---------------------------------------------------------------- tabelas
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  nome text,
  telefone text,
  admin boolean not null default false,
  criado_em timestamptz not null default now()
);
alter table public.profiles add column if not exists admin boolean not null default false;

create table if not exists public.progress (
  user_id uuid not null references auth.users on delete cascade,
  dia int not null check (dia between 1 and 21),
  concluido_em timestamptz not null default now(),
  primary key (user_id, dia)
);

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  peso numeric(5,1) not null,
  nota text,
  criado_em timestamptz not null default now()
);

-- Telefones que podem criar conta (liberados pelo painel de administração).
create table if not exists public.acessos (
  telefone text primary key,
  nome text,
  liberado_em timestamptz not null default now()
);

-- ---------------------------------------------------------------- funções
create or replace function public.eh_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select admin from public.profiles where id = auth.uid()), false)
$$;

-- Bloqueia a criação de conta para telefones que não estão em "acessos".
create or replace function public.conferir_acesso() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.acessos where telefone = split_part(new.email, '@', 1)) then
    raise exception 'telefone sem acesso liberado';
  end if;
  return new;
end $$;

drop trigger if exists conferir_acesso on auth.users;
create trigger conferir_acesso before insert on auth.users
  for each row execute function public.conferir_acesso();

-- Cria o perfil automaticamente quando a conta é criada.
create or replace function public.criar_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nome, telefone)
  values (new.id, new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists criar_perfil on auth.users;
create trigger criar_perfil after insert on auth.users
  for each row execute function public.criar_perfil();

-- ---------------------------------------------------------------- segurança
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.checkins enable row level security;
alter table public.acessos enable row level security;

-- No perfil, a pessoa só pode alterar o próprio nome (nunca o campo admin).
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (nome) on public.profiles to authenticated;

drop policy if exists "perfil proprio" on public.profiles;
drop policy if exists "perfil leitura" on public.profiles;
drop policy if exists "perfil nome" on public.profiles;
create policy "perfil leitura" on public.profiles for select using (auth.uid() = id or public.eh_admin());
create policy "perfil nome" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "progresso proprio" on public.progress;
drop policy if exists "progresso admin" on public.progress;
create policy "progresso proprio" on public.progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progresso admin" on public.progress for select using (public.eh_admin());

drop policy if exists "registros proprios" on public.checkins;
create policy "registros proprios" on public.checkins for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "acessos admin" on public.acessos;
create policy "acessos admin" on public.acessos for all using (public.eh_admin()) with check (public.eh_admin());

-- ---------------------------------------------------------------- presentes (PDFs protegidos)
-- Os PDFs ficam no Storage, em um bucket privado. Só abre quem está logada e com o telefone liberado.
insert into storage.buckets (id, name, public) values ('presentes', 'presentes', false)
  on conflict (id) do update set public = false;

create or replace function public.tem_acesso() returns boolean
language sql stable security definer set search_path = public as $$
  select public.eh_admin() or exists (
    select 1 from public.profiles p join public.acessos a on a.telefone = p.telefone where p.id = auth.uid()
  )
$$;

drop policy if exists "presentes leitura" on storage.objects;
create policy "presentes leitura" on storage.objects for select to authenticated
  using (bucket_id = 'presentes' and public.tem_acesso());

drop policy if exists "presentes admin" on storage.objects;
create policy "presentes admin" on storage.objects for all to authenticated
  using (bucket_id = 'presentes' and public.eh_admin())
  with check (bucket_id = 'presentes' and public.eh_admin());

-- ---------------------------------------------------------------- evolução (diário com peso, humor e foto)
-- Um registro por dia para cada pessoa. A tabela "checkins" acima é da versão antiga e não é mais usada pelo app.
create table if not exists public.diario (
  user_id uuid not null references auth.users on delete cascade,
  dia int not null check (dia between 1 and 21),
  peso numeric(5,1),
  humor text check (humor in ('mal', 'normal', 'bem')),
  foto text,
  atualizado_em timestamptz not null default now(),
  primary key (user_id, dia)
);
alter table public.diario enable row level security;
grant select, insert, update, delete on public.diario to authenticated;
drop policy if exists "diario proprio" on public.diario;
create policy "diario proprio" on public.diario for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Fotos da evolução: bucket privado, uma pasta por pessoa. Só a dona da pasta lê e grava.
insert into storage.buckets (id, name, public) values ('fotos', 'fotos', false)
  on conflict (id) do update set public = false;
drop policy if exists "fotos proprias" on storage.objects;
create policy "fotos proprias" on storage.objects for all to authenticated
  using (bucket_id = 'fotos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'fotos' and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------------------------------------------------------------- plano Premium, medidas, redefinição de senha
-- plano: 'padrao' ou 'clube' (Premium). Só o admin altera, pela função definir_plano (a cliente não consegue mudar o próprio).
alter table public.profiles add column if not exists plano text not null default 'padrao' check (plano in ('padrao', 'clube'));
update public.profiles set plano = 'clube' where admin;

alter table public.diario add column if not exists cintura numeric(5,1);
alter table public.diario add column if not exists quadril numeric(5,1);

create or replace function public.definir_plano(p_id uuid, p_plano text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.eh_admin() then raise exception 'sem permissão'; end if;
  if p_plano not in ('padrao', 'clube') then raise exception 'plano inválido'; end if;
  update public.profiles set plano = p_plano where id = p_id;
end $$;

-- O admin define uma senha nova para a cliente que esqueceu (o login por telefone não tem e-mail para recuperação).
create or replace function public.admin_redefinir_senha(p_id uuid, p_senha text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public.eh_admin() then raise exception 'sem permissão'; end if;
  if length(coalesce(p_senha, '')) < 6 then raise exception 'senha muito curta'; end if;
  update auth.users set encrypted_password = extensions.crypt(p_senha, extensions.gen_salt('bf')), updated_at = now() where id = p_id;
  if not found then raise exception 'conta não encontrada'; end if;
end $$;

-- Quem pode chamar cada função pela API (corrige os avisos do Security Advisor).
revoke execute on function public.conferir_acesso() from public, anon, authenticated;
revoke execute on function public.criar_perfil() from public, anon, authenticated;
grant execute on function public.conferir_acesso() to supabase_auth_admin;
grant execute on function public.criar_perfil() to supabase_auth_admin;
revoke execute on function public.eh_admin() from public, anon;
revoke execute on function public.tem_acesso() from public, anon;
revoke execute on function public.definir_plano(uuid, text) from public, anon;
revoke execute on function public.admin_redefinir_senha(uuid, text) from public, anon;
grant execute on function public.eh_admin() to authenticated;
grant execute on function public.tem_acesso() to authenticated;
grant execute on function public.definir_plano(uuid, text) to authenticated;
grant execute on function public.admin_redefinir_senha(uuid, text) to authenticated;

-- ---------------------------------------------------------------- primeira administradora
-- 1) Libere o seu próprio telefone (troque pelo seu número, só dígitos, com DDD):
--      insert into public.acessos (telefone, nome) values ('85999999999', 'Seu nome');
-- 2) Abra o app e crie sua conta com esse telefone.
-- 3) Torne-se administradora:
--      update public.profiles set admin = true where telefone = '85999999999';
-- Depois disso, os demais telefones são liberados pelo painel dentro do app (Perfil > Administração).
