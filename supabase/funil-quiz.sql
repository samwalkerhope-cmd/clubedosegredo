-- Funil do quiz: rode no SQL Editor do Supabase (projeto Club del Secreto). Já aplicado (19/11 e ajuste da versão em 22/11/2026).

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

-- Em "origem" também fica "v": a versão da 1ª tela (a, b, c ou d) do teste de abertura.
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
     where k in ('utm_source','utm_medium','utm_campaign','utm_content','utm_term','sub1','sub2','sub3','sub4','sub5','sub6','sub7','sub8','clickid','v')
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
      from base, unnest(array['utm_campaign','utm_content','utm_source','utm_medium','utm_term','sub1','sub2','sub3','sub4','sub5','sub6','sub7','sub8','v']) as k
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
