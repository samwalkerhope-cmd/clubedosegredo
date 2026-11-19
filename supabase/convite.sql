-- Rode DEPOIS de um-clique.sql, no SQL Editor do Supabase (projeto Club del Secreto): link pessoal de acesso.

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
