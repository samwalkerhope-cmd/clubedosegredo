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

-- ---------------------------------------------------------------- compra do Club Secreto em 1 clique (função "um-clique")
-- A cobrança é feita por um serviço nosso (cc.ritualmetabolico.com/app-um-clique.php). O app só fala com ele pela
-- Edge Function "um-clique", que usa as funções abaixo (só o servidor consegue chamá-las: service_role).
-- Antes de cobrar, a cliente confirma que é dona do e-mail da compra com um código de 6 dígitos.
alter table public.profiles add column if not exists email_confirmado_em timestamptz;

create table if not exists public.codigos_email (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  codigo_hash text not null,
  criado_em timestamptz not null default now(),
  expira_em timestamptz not null default now() + interval '10 minutes',
  tentativas int not null default 0,
  usado_em timestamptz
);
create index if not exists codigos_email_user on public.codigos_email (user_id, criado_em desc);
alter table public.codigos_email enable row level security;
revoke all on public.codigos_email from anon, authenticated;

-- Registro de cada chamada (sem dados de cartão): serve para o limite por minuto e para auditoria.
create table if not exists public.um_clique_log (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  acao text not null,
  resultado text,
  pedido text,
  criado_em timestamptz not null default now()
);
create index if not exists um_clique_log_user on public.um_clique_log (user_id, criado_em desc);
alter table public.um_clique_log enable row level security;
revoke all on public.um_clique_log from anon, authenticated;

-- Acesso (compra) ligado a uma conta.
create or replace function public.uc_acesso(p_user uuid) returns public.acessos
language sql stable security definer set search_path = public as $$
  select a.* from public.acessos a join auth.users u on split_part(u.email, '@', 1) = a.login where u.id = p_user limit 1
$$;

-- Início de cada chamada: registra, conta as chamadas do último minuto e devolve o e-mail DA COMPRA.
create or replace function public.uc_inicio(p_user uuid, p_acao text) returns json
language plpgsql security definer set search_path = public as $$
declare a public.acessos; n int; id_log bigint; conf timestamptz;
begin
  insert into public.um_clique_log (user_id, acao) values (p_user, p_acao) returning id into id_log;
  select count(*) into n from public.um_clique_log where user_id = p_user and criado_em > now() - interval '1 minute';
  a := public.uc_acesso(p_user);
  select email_confirmado_em into conf from public.profiles where id = p_user;
  return json_build_object('log', id_log, 'chamadas', n, 'email', a.email, 'nome', a.nome,
                           'ativo', coalesce(a.ativo, false), 'confirmado', conf is not null);
end $$;

create or replace function public.uc_resultado(p_log bigint, p_resultado text, p_pedido text default null) returns void
language sql security definer set search_path = public as $$
  update public.um_clique_log set resultado = left(p_resultado, 60), pedido = p_pedido where id = p_log
$$;

-- Gera o código de 6 dígitos (10 min, até 3 por hora). Só o hash fica guardado.
create or replace function public.uc_novo_codigo(p_user uuid) returns json
language plpgsql security definer set search_path = public, extensions as $$
declare a public.acessos; cod text;
begin
  a := public.uc_acesso(p_user);
  if a.id is null or not a.ativo or a.email is null then return json_build_object('ok', false, 'motivo', 'sem_email'); end if;
  if (select count(*) from public.codigos_email where user_id = p_user and criado_em > now() - interval '1 hour') >= 3 then
    return json_build_object('ok', false, 'motivo', 'limite');
  end if;
  cod := lpad((('x' || encode(extensions.gen_random_bytes(4), 'hex'))::bit(32)::bigint % 1000000)::text, 6, '0');
  update public.codigos_email set usado_em = now() where user_id = p_user and usado_em is null;
  insert into public.codigos_email (user_id, codigo_hash) values (p_user, encode(extensions.digest(p_user::text || ':' || cod, 'sha256'), 'hex'));
  return json_build_object('ok', true, 'codigo', cod, 'email', a.email, 'nome', a.nome);
end $$;

-- Confere o código (até 5 tentativas). Se bater, marca o e-mail como confirmado.
create or replace function public.uc_conferir_codigo(p_user uuid, p_codigo text) returns json
language plpgsql security definer set search_path = public, extensions as $$
declare c public.codigos_email;
begin
  select * into c from public.codigos_email where user_id = p_user and usado_em is null and expira_em > now()
   order by criado_em desc limit 1 for update;
  if c.id is null then return json_build_object('ok', false, 'motivo', 'expirado'); end if;
  if c.tentativas >= 5 then return json_build_object('ok', false, 'motivo', 'bloqueado'); end if;
  if c.codigo_hash is distinct from encode(extensions.digest(p_user::text || ':' || coalesce(p_codigo, ''), 'sha256'), 'hex') then
    update public.codigos_email set tentativas = tentativas + 1 where id = c.id;
    return json_build_object('ok', false, 'motivo', case when c.tentativas + 1 >= 5 then 'bloqueado' else 'incorreto' end);
  end if;
  update public.codigos_email set usado_em = now() where id = c.id;
  update public.profiles set email_confirmado_em = coalesce(email_confirmado_em, now()) where id = p_user;
  return json_build_object('ok', true);
end $$;

-- Compra aprovada: libera o Premium na hora, no mesmo dado que o app lê (acessos.plano e profiles.plano).
create or replace function public.uc_liberar_premium(p_user uuid, p_pedido text) returns void
language plpgsql security definer set search_path = public as $$
declare a public.acessos;
begin
  a := public.uc_acesso(p_user);
  if a.id is null then raise exception 'acesso não encontrado'; end if;
  if a.plano = 'clube' and exists (select 1 from public.profiles where id = p_user and plano = 'clube') then return; end if;
  update public.acessos set plano = 'clube', status = 'aprovada um-clique', pedido = coalesce(p_pedido, pedido), atualizado_em = now() where id = a.id;
  update public.profiles set plano = 'clube' where id = p_user;
  insert into public.eventos_compra (evento, email, telefone, pedido, premium, resultado, dados)
  values ('aprovada', a.email, a.telefone, p_pedido, true, 'ativo · clube', jsonb_build_object('origem', 'um-clique'));
end $$;

do $$ declare f text; begin
  foreach f in array array['uc_acesso(uuid)', 'uc_inicio(uuid, text)', 'uc_resultado(bigint, text, text)', 'uc_novo_codigo(uuid)',
                           'uc_conferir_codigo(uuid, text)', 'uc_liberar_premium(uuid, text)'] loop
    execute format('revoke execute on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to service_role', f);
  end loop;
end $$;

-- Quem redefine a senha pelo link recebido no e-mail também prova que é dona do e-mail.
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
  update public.profiles set email_confirmado_em = coalesce(email_confirmado_em, now()) where id = uid;
  return true;
end $$;

-- ---------------------------------------------------------------- link pessoal de acesso (convite)
-- O e-mail de acesso leva um link pessoal (/#/acceso?t=...). Ao abrir, a cliente só cria a senha: o app já sabe quem ela é.
-- Abrir o link prova que ela é dona do e-mail (vale como e-mail confirmado). Vale 30 dias e serve para criar a conta uma vez.
-- "Crea tu cuenta" (digitando o e-mail ou telefone da compra) continua funcionando para quem perder o e-mail.
create table if not exists public.convites (
  token_hash text primary key,
  acesso_id uuid not null references public.acessos (id) on delete cascade,
  criado_em timestamptz not null default now(),
  expira_em timestamptz not null default now() + interval '30 days',
  usado_em timestamptz
);
create index if not exists convites_acesso on public.convites (acesso_id);
alter table public.convites enable row level security;
revoke all on public.convites from anon, authenticated;

-- Gera um convite para um acesso (uso interno: chamado por webhook_compra e pedir_reset).
create or replace function public.novo_convite(p_acesso uuid) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare novo text := encode(extensions.gen_random_bytes(24), 'hex');
begin
  insert into public.convites (token_hash, acesso_id) values (encode(extensions.digest(novo, 'sha256'), 'hex'), p_acesso);
  return novo;
end $$;

create or replace function public.convite_valido(p_token text) returns public.convites
language sql stable security definer set search_path = public, extensions as $$
  select c.* from public.convites c
   where c.token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex') and c.usado_em is null and c.expira_em > now()
$$;

-- O app chama ao abrir o link: diz se o convite vale, o nome da compra e se a conta já existe.
create or replace function public.ver_convite(p_token text) returns json
language plpgsql stable security definer set search_path = public as $$
declare c public.convites; a public.acessos;
begin
  c := public.convite_valido(p_token);
  if c.token_hash is null then return json_build_object('ok', false); end if;
  select * into a from public.acessos where id = c.acesso_id;
  if a.id is null or not a.ativo then return json_build_object('ok', false); end if;
  return json_build_object('ok', true, 'login', a.login, 'nome', coalesce(a.nome, ''), 'email', coalesce(a.email, ''),
    'tem_conta', exists (select 1 from auth.users u where split_part(u.email, '@', 1) = a.login));
end $$;

-- Quem já tinha conta e abre o link: define uma senha nova (igual ao "esqueci a senha").
create or replace function public.senha_com_convite(p_token text, p_senha text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
declare c public.convites; a public.acessos; uid uuid;
begin
  if length(coalesce(p_senha, '')) < 6 then raise exception 'senha muito curta'; end if;
  c := public.convite_valido(p_token);
  if c.token_hash is null then raise exception 'link inválido ou expirado'; end if;
  select * into a from public.acessos where id = c.acesso_id;
  select u.id into uid from auth.users u where split_part(u.email, '@', 1) = a.login limit 1;
  if uid is null or not a.ativo then raise exception 'link inválido ou expirado'; end if;
  update auth.users set encrypted_password = extensions.crypt(p_senha, extensions.gen_salt('bf')), updated_at = now() where id = uid;
  update public.convites set usado_em = now() where acesso_id = a.id and usado_em is null;
  update public.profiles set email_confirmado_em = coalesce(email_confirmado_em, now()) where id = uid;
  return true;
end $$;

-- O perfil nasce com os dados e o plano do acesso. Conta criada pelo link pessoal já nasce com o e-mail confirmado.
create or replace function public.criar_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
declare c public.convites; a public.acessos;
begin
  select * into a from public.acessos where login = split_part(new.email, '@', 1);
  if a.id is not null then
    c := public.convite_valido(new.raw_user_meta_data->>'convite');
    insert into public.profiles (id, nome, telefone, email, plano, email_confirmado_em)
    values (new.id, coalesce(nullif(new.raw_user_meta_data->>'nome', ''), a.nome), a.telefone, a.email, a.plano,
            case when c.acesso_id = a.id then now() end)
    on conflict (id) do nothing;
    if c.acesso_id = a.id then update public.convites set usado_em = now() where acesso_id = a.id and usado_em is null; end if;
  else
    insert into public.profiles (id, nome, telefone) values (new.id, new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1))
    on conflict (id) do nothing;
  end if;
  return new;
end $$;

-- Compra aprovada: quando é o primeiro acesso e a conta ainda não existe, devolve também o convite para o e-mail de acesso.
create or replace function public.webhook_compra(p_evento text, p_email text default null, p_telefone text default null,
                                                 p_nome text default null, p_premium boolean default false, p_pedido text default null,
                                                 p_dados jsonb default null, p_token text default null) returns json
language plpgsql security definer set search_path = public as $$
declare
  r public.acessos; novo boolean; convite text;
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
  novo := r.liberado_em > now() - interval '5 seconds';
  if p_evento = 'aprovada' and novo and r.ativo and r.email is not null
     and not exists (select 1 from auth.users u where split_part(u.email, '@', 1) = r.login) then
    convite := public.novo_convite(r.id);
  end if;
  return json_build_object('ok', true, 'ativo', r.ativo, 'plano', r.plano, 'novo', novo, 'convite', convite);
end $$;

-- "Esqueci a senha" de quem tem acesso mas ainda não criou a conta: o e-mail de acesso vai com um convite novo.
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
  if uid is null then  -- tem acesso mas ainda não criou a conta: manda o e-mail de acesso (até 3 convites por hora)
    if (select count(*) from public.convites where acesso_id = r.id and criado_em > now() - interval '1 hour') >= 3 then
      return json_build_object('enviar', false, 'motivo', 'limite');
    end if;
    return json_build_object('enviar', true, 'tipo', 'acesso', 'email', r.email, 'nome', r.nome, 'convite', public.novo_convite(r.id));
  end if;
  if (select count(*) from public.resets_senha where user_id = uid and criado_em > now() - interval '1 hour') >= 3 then
    return json_build_object('enviar', false, 'motivo', 'limite');
  end if;
  novo := encode(extensions.gen_random_bytes(24), 'hex');
  insert into public.resets_senha (token_hash, user_id) values (encode(extensions.digest(novo, 'sha256'), 'hex'), uid);
  return json_build_object('enviar', true, 'tipo', 'reset', 'email', r.email, 'nome', r.nome, 'token', novo);
end $$;

revoke execute on function public.novo_convite(uuid) from public, anon, authenticated;
revoke execute on function public.convite_valido(text) from public, anon, authenticated;
revoke execute on function public.ver_convite(text) from public;
revoke execute on function public.senha_com_convite(text, text) from public;
grant execute on function public.ver_convite(text) to anon, authenticated;
grant execute on function public.senha_com_convite(text, text) to anon, authenticated;

-- Painel Admin: dar ou tirar o Premium direto na lista de acessos (vale também para a conta já criada).
create or replace function public.admin_plano_acesso(p_id uuid, p_plano text) returns void
language plpgsql security definer set search_path = public as $$
declare a public.acessos;
begin
  if not public.eh_admin() then raise exception 'sem permissão'; end if;
  if p_plano not in ('padrao', 'clube') then raise exception 'plano inválido'; end if;
  update public.acessos set plano = p_plano, atualizado_em = now() where id = p_id returning * into a;
  if a.id is null then raise exception 'acesso não encontrado'; end if;
  update public.profiles set plano = p_plano
   where not admin and id in (select u.id from auth.users u where split_part(u.email, '@', 1) = a.login);
end $$;
revoke execute on function public.admin_plano_acesso(uuid, text) from public, anon;
grant execute on function public.admin_plano_acesso(uuid, text) to authenticated;

-- ---------------------------------------------------------------- funil do quiz (retenção por tela, como a retenção de uma VSL)
-- O quiz (ritualmetabolico.com) chama quiz_passo a cada tela. Fica UMA linha por visita, com a tela mais avançada e o
-- segundo em que cada tela foi vista. Não guarda respostas, nome nem e-mail. O painel (Admin do app) lê por quiz_funil.
create table if not exists public.quiz_sessoes (
  id uuid primary key,
  inicio timestamptz not null default now(),
  ultimo_em timestamptz not null default now(),
  max_ordem int not null default 0,
  passos jsonb not null default '{}'::jsonb,
  origem jsonb not null default '{}'::jsonb,
  dispositivo text
);
create index if not exists quiz_sessoes_inicio on public.quiz_sessoes (inicio);
alter table public.quiz_sessoes enable row level security;
revoke all on public.quiz_sessoes from anon, authenticated;

-- Telas do quiz, na ordem. "email" = tela do e-mail; "preco" = viu o preço na oferta; "cta" = tocou em QUIERO EMPEZAR.
create or replace function public.quiz_ordem() returns text[]
language sql immutable as $$
  select array['home','age','body','areas','alone','news','name','email','motivation','attempts','biology','barriers','comparison',
               'goals','bloating','mechanism','weight','height','target','routine','sleep','projection','commitment','firstResult',
               'analysis','report','testimonials','generating','sales','preco','cta']
$$;

create or replace function public.quiz_passo(p_sessao uuid, p_passo text, p_seg int default 0, p_origem jsonb default null, p_disp text default null) returns void
language plpgsql security definer set search_path = public as $$
declare ord int := array_position(public.quiz_ordem(), p_passo); seg int := least(greatest(coalesce(p_seg, 0), 0), 86400); o jsonb := '{}'::jsonb;
begin
  if p_sessao is null or ord is null then return; end if;
  if p_origem is not null and jsonb_typeof(p_origem) = 'object' then
    select coalesce(jsonb_object_agg(k, left(v, 150)), '{}'::jsonb) into o
      from jsonb_each_text(p_origem) as t(k, v)
     where k in ('utm_source','utm_medium','utm_campaign','utm_content','utm_term','sub1','sub2','sub3','sub4','sub5','sub6','sub7','sub8','clickid')
       and v is not null and v <> '';
  end if;
  insert into public.quiz_sessoes as s (id, max_ordem, passos, origem, dispositivo)
  values (p_sessao, ord, jsonb_build_object(p_passo, seg), o, case when p_disp in ('m', 'd', 't') then p_disp end)
  on conflict (id) do update set
    max_ordem = greatest(s.max_ordem, excluded.max_ordem),
    passos = case when s.passos ? p_passo then s.passos else s.passos || excluded.passos end,
    origem = excluded.origem || s.origem,
    ultimo_em = now()
  where s.inicio > now() - interval '1 day';
end $$;
revoke execute on function public.quiz_passo(uuid, text, int, jsonb, text) from public;
grant execute on function public.quiz_passo(uuid, text, int, jsonb, text) to anon, authenticated;

-- Painel: funil do período (dias no fuso de Fortaleza), com filtro opcional por um campo da origem (ex.: utm_campaign).
create or replace function public.quiz_funil(p_de date, p_ate date, p_chave text default null, p_valor text default null) returns json
language plpgsql stable security definer set search_path = public as $$
declare r json;
begin
  if not public.eh_admin() then raise exception 'sem permissão'; end if;
  with base as (
    select * from public.quiz_sessoes
     where inicio >= (p_de::timestamp at time zone 'America/Fortaleza')
       and inicio < ((p_ate + 1)::timestamp at time zone 'America/Fortaleza')
  ), s as (
    select * from base where p_chave is null or p_valor is null or coalesce(origem->>p_chave, '(sem valor)') = p_valor
  ), passos as (
    select p.passo, p.ord,
           (select count(*) from s where s.passos ? p.passo) as n,
           (select percentile_cont(0.5) within group (order by (s.passos->>p.passo)::int) from s where s.passos ? p.passo) as mediana
      from unnest(public.quiz_ordem()) with ordinality as p(passo, ord)
  ), dias as (
    select (inicio at time zone 'America/Fortaleza')::date as dia, count(*) as sessoes,
           count(*) filter (where passos ? 'age') as inicio_quiz, count(*) filter (where passos ? 'sales') as oferta,
           count(*) filter (where passos ? 'cta') as cta
      from s group by 1
  ), chaves as (
    select k, coalesce(base.origem->>k, '(sem valor)') as v, count(*) as sessoes,
           count(*) filter (where passos ? 'age') as inicio_quiz, count(*) filter (where passos ? 'sales') as oferta,
           count(*) filter (where passos ? 'cta') as cta
      from base, unnest(array['utm_campaign','utm_content','utm_source','utm_medium','utm_term','sub1','sub2','sub3','sub4','sub5','sub6','sub7','sub8']) as k
     where exists (select 1 from base b where b.origem ? k)
     group by 1, 2
  ), top as (
    select *, row_number() over (partition by k order by sessoes desc) as pos from chaves
  )
  select json_build_object(
    'sessoes', (select count(*) from s),
    'celular', (select count(*) from s where dispositivo = 'm'),
    'passos', (select coalesce(json_agg(json_build_object('passo', passo, 'n', n, 'mediana', mediana) order by ord), '[]'::json) from passos),
    'dias', (select coalesce(json_agg(json_build_object('dia', dia, 'sessoes', sessoes, 'inicio', inicio_quiz, 'oferta', oferta, 'cta', cta) order by dia), '[]'::json) from dias),
    'origens', (select coalesce(json_agg(json_build_object('chave', k, 'valor', v, 'sessoes', sessoes, 'inicio', inicio_quiz, 'oferta', oferta, 'cta', cta) order by k, sessoes desc), '[]'::json) from top where pos <= 40)
  ) into r;
  return r;
end $$;
revoke execute on function public.quiz_funil(date, date, text, text) from public, anon;
grant execute on function public.quiz_funil(date, date, text, text) to authenticated;
