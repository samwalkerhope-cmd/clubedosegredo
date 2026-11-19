-- Rode este arquivo no SQL Editor do Supabase (projeto Club del Secreto) para ativar a compra em 1 clique.

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
