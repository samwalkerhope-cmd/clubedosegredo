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

-- ---------------------------------------------------------------- compras automáticas (checkout -> n8n -> Supabase), login por telefone OU e-mail
-- Cada acesso tem um "login" próprio (o identificador interno da conta). A cliente digita telefone ou e-mail,
-- a função login_de encontra o acesso e devolve esse login. Acessos antigos continuam com login = telefone.
alter table public.acessos add column if not exists id uuid not null default gen_random_uuid();
alter table public.acessos add column if not exists email text;
alter table public.acessos add column if not exists login text;
alter table public.acessos add column if not exists ativo boolean not null default true;
alter table public.acessos add column if not exists plano text not null default 'padrao';
alter table public.acessos add column if not exists origem text not null default 'manual';
alter table public.acessos add column if not exists status text;
alter table public.acessos add column if not exists pedido text;
alter table public.acessos add column if not exists atualizado_em timestamptz not null default now();
update public.acessos set login = telefone where login is null;
do $$ begin
  if exists (select 1 from pg_constraint where conname = 'acessos_pkey' and conrelid = 'public.acessos'::regclass
             and pg_get_constraintdef(oid) like '%(telefone)%') then
    alter table public.acessos drop constraint acessos_pkey;
    alter table public.acessos add primary key (id);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'acessos_plano_check') then
    alter table public.acessos add constraint acessos_plano_check check (plano in ('padrao', 'clube'));
  end if;
end $$;
alter table public.acessos alter column telefone drop not null;
alter table public.acessos alter column login set default ('c' || replace(gen_random_uuid()::text, '-', ''));
alter table public.acessos alter column login set not null;
create unique index if not exists acessos_login on public.acessos (login);
create unique index if not exists acessos_telefone on public.acessos (telefone) where telefone is not null;
create unique index if not exists acessos_email on public.acessos (lower(email)) where email is not null;

alter table public.profiles add column if not exists email text;

-- Telefone só com números e sem zeros à esquerda.
create or replace function public.normalizar_tel(t text) returns text
language sql immutable set search_path = public as $$
  select ltrim(regexp_replace(coalesce(t, ''), '\D', '', 'g'), '0')
$$;

-- Encontra o acesso pelo e-mail ou pelo telefone. No telefone, aceita o número com ou sem código do país
-- (um termina com o outro, mínimo de 8 dígitos). Se houver mais de um candidato, não escolhe nenhum.
create or replace function public.achar_acesso(p_ident text) returns public.acessos
language plpgsql stable security definer set search_path = public as $$
declare v text := trim(coalesce(p_ident, '')); d text; r public.acessos; n int;
begin
  if position('@' in v) > 0 then
    select * into r from public.acessos where lower(email) = lower(v) limit 1;
    return r;
  end if;
  d := public.normalizar_tel(v);
  if length(d) < 8 then return r; end if;
  select * into r from public.acessos where public.normalizar_tel(telefone) = d limit 1;
  if found then return r; end if;
  -- mesmo final: um termina com o outro, ou os últimos 10 dígitos batem (ex.: México com e sem o "1")
  select count(*) into n from public.acessos a, lateral (select public.normalizar_tel(a.telefone) as t) x
   where length(x.t) >= 8
     and (x.t like '%' || d or d like '%' || x.t or (length(x.t) >= 10 and length(d) >= 10 and right(x.t, 10) = right(d, 10)));
  if n = 1 then
    select a.* into r from public.acessos a, lateral (select public.normalizar_tel(a.telefone) as t) x
     where length(x.t) >= 8
       and (x.t like '%' || d or d like '%' || x.t or (length(x.t) >= 10 and length(d) >= 10 and right(x.t, 10) = right(d, 10)));
  end if;
  return r;
end $$;

-- Usada na tela de login. Sem acesso encontrado, devolve um login que não existe (a mensagem de erro é a mesma).
create or replace function public.login_de(p_ident text) returns text
language plpgsql stable security definer set search_path = public as $$
declare r public.acessos;
begin
  r := public.achar_acesso(p_ident);
  if r.login is not null then return r.login; end if;
  return 'x' || substr(md5(lower(trim(coalesce(p_ident, '')))), 1, 24);
end $$;

-- Só cria conta quem tem acesso ATIVO.
create or replace function public.conferir_acesso() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.acessos where login = split_part(new.email, '@', 1) and ativo) then
    raise exception 'sem acesso liberado';
  end if;
  return new;
end $$;

-- O perfil nasce com os dados e o plano do acesso.
create or replace function public.criar_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nome, telefone, email, plano)
  select new.id, coalesce(nullif(new.raw_user_meta_data->>'nome', ''), a.nome), a.telefone, a.email, a.plano
    from public.acessos a where a.login = split_part(new.email, '@', 1)
  on conflict (id) do nothing;
  if not found then
    insert into public.profiles (id, nome, telefone) values (new.id, new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1))
    on conflict (id) do nothing;
  end if;
  return new;
end $$;

create or replace function public.tem_acesso() returns boolean
language sql stable security definer set search_path = public as $$
  select public.eh_admin() or exists (
    select 1 from auth.users u join public.acessos a on a.login = split_part(u.email, '@', 1)
     where u.id = auth.uid() and a.ativo
  )
$$;

-- Cria ou atualiza um acesso (por e-mail ou telefone). Parâmetros nulos não mudam o que já existe.
create or replace function public.registrar_acesso(p_email text, p_telefone text, p_nome text, p_plano text, p_ativo boolean,
                                                   p_origem text, p_status text, p_pedido text) returns public.acessos
language plpgsql security definer set search_path = public as $$
declare
  r public.acessos;
  e text := nullif(lower(trim(coalesce(p_email, ''))), '');
  t text := nullif(public.normalizar_tel(p_telefone), '');
begin
  if t is not null and length(t) < 8 then t := null; end if;
  if e is not null then select * into r from public.acessos where lower(email) = e limit 1; end if;
  if r.id is null and t is not null then r := public.achar_acesso(t); end if;
  if r.id is null then
    if e is null and t is null then raise exception 'informe e-mail ou telefone'; end if;
    insert into public.acessos (email, telefone, nome, plano, ativo, origem, status, pedido)
    values (e, t, nullif(trim(coalesce(p_nome, '')), ''), coalesce(p_plano, 'padrao'), coalesce(p_ativo, true),
            coalesce(p_origem, 'manual'), p_status, p_pedido)
    returning * into r;
  else
    update public.acessos set
      email = coalesce(email, case when e is not null and not exists (select 1 from public.acessos x where lower(x.email) = e and x.id <> r.id) then e end),
      telefone = coalesce(telefone, case when t is not null and not exists (select 1 from public.acessos x where x.telefone = t and x.id <> r.id) then t end),
      nome = coalesce(nome, nullif(trim(coalesce(p_nome, '')), '')),
      plano = coalesce(p_plano, plano), ativo = coalesce(p_ativo, ativo),
      status = coalesce(p_status, status), pedido = coalesce(p_pedido, pedido), atualizado_em = now()
    where id = r.id returning * into r;
  end if;
  update public.profiles set plano = r.plano
   where not admin and id in (select u.id from auth.users u where split_part(u.email, '@', 1) = r.login);
  return r;
end $$;

-- Painel: liberar, bloquear/reativar e remover.
create or replace function public.admin_liberar(p_email text, p_telefone text, p_nome text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.eh_admin() then raise exception 'sem permissão'; end if;
  perform public.registrar_acesso(p_email, p_telefone, p_nome, null, true, 'manual', 'manual', null);
end $$;

create or replace function public.admin_ativar(p_id uuid, p_ativo boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.eh_admin() then raise exception 'sem permissão'; end if;
  update public.acessos set ativo = p_ativo, status = case when p_ativo then 'reativado' else 'bloqueado' end, atualizado_em = now() where id = p_id;
end $$;

-- Ao mudar o plano no painel, o acesso guarda o mesmo plano.
create or replace function public.definir_plano(p_id uuid, p_plano text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.eh_admin() then raise exception 'sem permissão'; end if;
  if p_plano not in ('padrao', 'clube') then raise exception 'plano inválido'; end if;
  update public.profiles set plano = p_plano where id = p_id;
  update public.acessos set plano = p_plano, atualizado_em = now()
   where login = (select split_part(u.email, '@', 1) from auth.users u where u.id = p_id);
end $$;

-- Token secreto do webhook (gerado pelo próprio banco). Ninguém lê pela API.
create table if not exists public.config_privada (chave text primary key, valor text not null);
alter table public.config_privada enable row level security;
revoke all on public.config_privada from anon, authenticated;
insert into public.config_privada (chave, valor) values ('webhook_token', encode(extensions.gen_random_bytes(24), 'hex'))
  on conflict (chave) do nothing;

-- Registro de tudo que chegou do checkout (só admins leem).
create table if not exists public.eventos_compra (
  id bigserial primary key,
  recebido_em timestamptz not null default now(),
  evento text, email text, telefone text, pedido text, premium boolean, resultado text, dados jsonb
);
alter table public.eventos_compra enable row level security;
revoke insert, update, delete on public.eventos_compra from anon, authenticated;
drop policy if exists "eventos admin" on public.eventos_compra;
create policy "eventos admin" on public.eventos_compra for select using (public.eh_admin());

-- Chamado pelo n8n. O token vem no cabeçalho x-webhook-token (ou em p_token).
-- aprovada: libera (p_premium = true também dá o Premium).
-- reembolso / chargeback / recusada / cancelada: bloqueia; com p_premium = true só tira o Premium.
create or replace function public.webhook_compra(p_evento text, p_email text default null, p_telefone text default null,
                                                 p_nome text default null, p_premium boolean default false, p_pedido text default null,
                                                 p_dados jsonb default null, p_token text default null) returns json
language plpgsql security definer set search_path = public as $$
declare
  r public.acessos;
  tok text := coalesce(p_token, nullif(current_setting('request.headers', true), '')::json->>'x-webhook-token');
begin
  if tok is null or tok is distinct from (select valor from public.config_privada where chave = 'webhook_token') then
    raise exception 'token inválido' using errcode = '28000';
  end if;
  if p_evento = 'aprovada' then
    r := public.registrar_acesso(p_email, p_telefone, p_nome, case when p_premium then 'clube' end, true, 'checkout', 'aprovada', p_pedido);
  elsif p_evento in ('reembolso', 'chargeback', 'recusada', 'cancelada') then
    if p_premium then
      r := public.registrar_acesso(p_email, p_telefone, p_nome, 'padrao', null, 'checkout', p_evento || ' premium', p_pedido);
    else
      r := public.registrar_acesso(p_email, p_telefone, p_nome, null, false, 'checkout', p_evento, p_pedido);
    end if;
  else
    raise exception 'evento desconhecido: %', p_evento;
  end if;
  insert into public.eventos_compra (evento, email, telefone, pedido, premium, resultado, dados)
  values (p_evento, p_email, p_telefone, p_pedido, p_premium, case when r.ativo then 'ativo' else 'bloqueado' end || ' · ' || r.plano, p_dados);
  return json_build_object('ok', true, 'ativo', r.ativo, 'plano', r.plano, 'novo', r.liberado_em > now() - interval '5 seconds');
end $$;

-- Permissões
revoke execute on function public.achar_acesso(text) from public, anon, authenticated;
revoke execute on function public.registrar_acesso(text, text, text, text, boolean, text, text, text) from public, anon, authenticated;
revoke execute on function public.conferir_acesso() from public, anon, authenticated;
revoke execute on function public.criar_perfil() from public, anon, authenticated;
grant execute on function public.conferir_acesso() to supabase_auth_admin;
grant execute on function public.criar_perfil() to supabase_auth_admin;
revoke execute on function public.tem_acesso() from public, anon;
revoke execute on function public.admin_liberar(text, text, text) from public, anon;
revoke execute on function public.admin_ativar(uuid, boolean) from public, anon;
revoke execute on function public.definir_plano(uuid, text) from public, anon;
grant execute on function public.tem_acesso() to authenticated;
grant execute on function public.admin_liberar(text, text, text) to authenticated;
grant execute on function public.admin_ativar(uuid, boolean) to authenticated;
grant execute on function public.definir_plano(uuid, text) to authenticated;
grant execute on function public.login_de(text) to anon, authenticated;
grant execute on function public.normalizar_tel(text) to anon, authenticated;
grant execute on function public.webhook_compra(text, text, text, text, boolean, text, jsonb, text) to anon, authenticated;

-- ---------------------------------------------------------------- recuperação de senha por e-mail (link de uso único)
-- O app chama um webhook do n8n; o n8n chama pedir_reset (com o token secreto) e envia o link pelo Mautic.
-- O link abre /#/restablecer?t=...; o app chama redefinir_com_token com a senha nova.
create table if not exists public.resets_senha (
  token_hash text primary key,
  user_id uuid not null references auth.users on delete cascade,
  criado_em timestamptz not null default now(),
  expira_em timestamptz not null default now() + interval '1 hour',
  usado_em timestamptz
);
alter table public.resets_senha enable row level security;
revoke all on public.resets_senha from anon, authenticated;

create or replace function public.pedir_reset(p_ident text, p_token text default null) returns json
language plpgsql security definer set search_path = public, extensions as $$
declare
  tok text := coalesce(p_token, nullif(current_setting('request.headers', true), '')::json->>'x-webhook-token');
  r public.acessos; uid uuid; novo text;
begin
  if tok is null or tok is distinct from (select valor from public.config_privada where chave = 'webhook_token') then
    raise exception 'token inválido' using errcode = '28000';
  end if;
  r := public.achar_acesso(p_ident);
  if r.id is null or not r.ativo or r.email is null then
    return json_build_object('enviar', false, 'motivo', case when r.id is null then 'nao_encontrado' when not r.ativo then 'inativo' else 'sem_email' end);
  end if;
  select u.id into uid from auth.users u where split_part(u.email, '@', 1) = r.login limit 1;
  if uid is null then  -- tem acesso mas ainda não criou a conta: manda o e-mail de acesso
    return json_build_object('enviar', true, 'tipo', 'acesso', 'email', r.email, 'nome', r.nome);
  end if;
  if (select count(*) from public.resets_senha where user_id = uid and criado_em > now() - interval '1 hour') >= 3 then
    return json_build_object('enviar', false, 'motivo', 'limite');
  end if;
  novo := encode(extensions.gen_random_bytes(24), 'hex');
  insert into public.resets_senha (token_hash, user_id) values (encode(extensions.digest(novo, 'sha256'), 'hex'), uid);
  return json_build_object('enviar', true, 'tipo', 'reset', 'email', r.email, 'nome', r.nome, 'token', novo);
end $$;

create or replace function public.redefinir_com_token(p_token text, p_senha text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
declare h text := encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex'); uid uuid;
begin
  if length(coalesce(p_senha, '')) < 6 then raise exception 'senha muito curta'; end if;
  update public.resets_senha set usado_em = now()
   where token_hash = h and usado_em is null and expira_em > now()
   returning user_id into uid;
  if uid is null then raise exception 'link inválido ou expirado'; end if;
  update auth.users set encrypted_password = extensions.crypt(p_senha, extensions.gen_salt('bf')), updated_at = now() where id = uid;
  -- os outros links pendentes dessa pessoa deixam de valer
  update public.resets_senha set usado_em = now() where user_id = uid and usado_em is null;
  return true;
end $$;

revoke execute on function public.pedir_reset(text, text) from public, authenticated;
grant execute on function public.pedir_reset(text, text) to anon;
grant execute on function public.redefinir_com_token(text, text) to anon, authenticated;

-- ---------------------------------------------------------------- assistente (IA): histórico das conversas
-- A função "asistente" (Supabase Edge Function) lê e grava aqui com a sessão da própria cliente.
create table if not exists public.chat_mensagens (
  id bigserial primary key,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  papel text not null check (papel in ('user', 'model')),
  texto text not null check (length(texto) <= 8000),
  criado_em timestamptz not null default now()
);
create index if not exists chat_mensagens_user on public.chat_mensagens (user_id, id desc);
alter table public.chat_mensagens enable row level security;
revoke all on public.chat_mensagens from anon;
revoke update, delete on public.chat_mensagens from authenticated;
grant select, insert on public.chat_mensagens to authenticated;
grant usage on sequence public.chat_mensagens_id_seq to authenticated;
drop policy if exists "chat proprio leitura" on public.chat_mensagens;
drop policy if exists "chat proprio insercao" on public.chat_mensagens;
create policy "chat proprio leitura" on public.chat_mensagens for select using (auth.uid() = user_id);
create policy "chat proprio insercao" on public.chat_mensagens for insert with check (auth.uid() = user_id);

-- ---------------------------------------------------------------- conteúdo exclusivo do Premium (Protocolos para imprevistos)
-- O site guarda só a vitrine (título, foto, etiqueta, descrição). O conteúdo completo fica aqui e só sai para Premium/admin.
create table if not exists public.protocolos_conteudo (
  id text primary key,
  ordem int not null default 0,
  dados jsonb not null,
  atualizado_em timestamptz not null default now()
);
alter table public.protocolos_conteudo enable row level security;
revoke all on public.protocolos_conteudo from anon;
revoke insert, update, delete on public.protocolos_conteudo from authenticated;
grant select on public.protocolos_conteudo to authenticated;

create or replace function public.tem_premium() returns boolean
language sql stable security definer set search_path = public as $$
  select public.eh_admin() or (
    public.tem_acesso() and exists (select 1 from public.profiles where id = auth.uid() and plano = 'clube')
  )
$$;
revoke execute on function public.tem_premium() from public, anon;
grant execute on function public.tem_premium() to authenticated;

drop policy if exists "protocolos premium" on public.protocolos_conteudo;
create policy "protocolos premium" on public.protocolos_conteudo for select using (public.tem_premium());
-- O texto dos protocolos NÃO fica neste arquivo (o repositório é público). Ele foi carregado direto no banco
-- e há uma cópia em privado/protocolos-*.sql (pasta ignorada pelo git).

-- ---------------------------------------------------------------- primeira administradora
-- 1) Libere o seu próprio telefone (troque pelo seu número, só dígitos, com DDD):
--      insert into public.acessos (telefone, nome) values ('85999999999', 'Seu nome');
-- 2) Abra o app e crie sua conta com esse telefone.
-- 3) Torne-se administradora:
--      update public.profiles set admin = true where telefone = '85999999999';
-- Depois disso, os demais telefones são liberados pelo painel dentro do app (Perfil > Administração).
