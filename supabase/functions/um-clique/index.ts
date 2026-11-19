// Compra do Club Secreto em 1 clique (Edge Function "um-clique").
// O navegador NUNCA fala com o serviço de cobrança: fala só com esta função, que roda no servidor do Supabase.
//
// Segredos (Supabase → Edge Functions → Secrets). Só o nome fica no código; o valor real é colocado no painel:
//   UM_CLIQUE_CHAVE  chave do serviço de cobrança. Sem ela a função responde 503 "desligado" e nada é cobrado.
//   APP_ORIGIN       endereço do app, ex.: https://miclubdelsecreto.vercel.app (aceita mais de um, separados por vírgula)
// Em "Settings" da função, deixe "Verify JWT" desligado (a sessão é validada aqui dentro, como na função "asistente").
//
// Corpo aceito do navegador: { acao, chave_unica?, codigo? }. E-mail, preço e produto nunca vêm do navegador.
//   consultar         → pode comprar? (só mostra o cartão depois que o e-mail foi confirmado)
//   pedir_codigo      → manda o código de 6 dígitos para o e-mail DA COMPRA
//   confirmar_codigo  → confere o código
//   comprar           → cobra (só com e-mail confirmado) e, se aprovado, libera o Premium na hora

const SERVICO = 'https://cc.ritualmetabolico.com/app-um-clique.php'
const OFERTA = 'club'
const LIMITE_POR_MINUTO = 10
const ACOES = ['consultar', 'comprar', 'pedir_codigo', 'confirmar_codigo']
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function mascarar(email) {
  const [u, d] = String(email || '').split('@')
  if (!u || !d) return ''
  return u.slice(0, Math.min(2, Math.max(1, u.length - 1))) + '•••@' + d
}

// deps: { env(nome), fetch, banco: { usuario(auth), inicio(id, acao), resultado(log, texto, pedido), novoCodigo(id),
//         conferirCodigo(id, codigo), liberarPremium(id, pedido), config(chave) } }
export function criarHandler(deps) {
  const origens = () => String(deps.env('APP_ORIGIN') || '').split(',').map((s) => s.trim().replace(/\/+$/, '')).filter(Boolean)

  return async function handler(req) {
    const origem = (req.headers.get('origin') || '').replace(/\/+$/, '')
    const permitida = !!origem && origens().includes(origem)
    const cors = {
      ...(permitida ? { 'Access-Control-Allow-Origin': origem } : {}),
      Vary: 'Origin',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Cache-Control': 'no-store',
    }
    const responder = (corpo, status = 200) =>
      new Response(JSON.stringify(corpo), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

    if (req.method === 'OPTIONS') return new Response('ok', { status: permitida ? 200 : 403, headers: cors })
    // Proteção CSRF: só aceita chamada vinda da própria tela do app.
    if (!permitida) return responder({ ok: false, erro: 'origem' }, 403)
    if (req.method !== 'POST') return responder({ ok: false, erro: 'metodo' }, 405)

    let log = null
    const anotar = (texto, pedido) => (log ? deps.banco.resultado(log, texto, pedido).catch(() => {}) : Promise.resolve())
    try {
      const usuario = await deps.banco.usuario(req.headers.get('authorization') || '')
      if (!usuario) return responder({ ok: false, erro: 'sessao' }, 401)

      let entrada = {}
      try { entrada = await req.json() } catch { /* corpo inválido */ }
      const acao = String(entrada?.acao || '')
      if (!ACOES.includes(acao)) return responder({ ok: false, erro: 'campo', campo: 'acao' }, 422)

      const ctx = await deps.banco.inicio(usuario.id, acao)
      log = ctx.log
      if (ctx.chamadas > LIMITE_POR_MINUTO) { await anotar('limite'); return responder({ ok: false, erro: 'limite' }, 429) }
      if (!ctx.ativo || !ctx.email) {
        await anotar('sem_compra')
        return acao === 'comprar'
          ? responder({ ok: false, status: 'nao_elegivel', motivo: 'sem_compra' }, 409)
          : responder({ ok: true, elegivel: false, motivo: 'sem_compra' })
      }

      // ---- confirmação do e-mail (código de 6 dígitos) ----
      if (acao === 'pedir_codigo') {
        if (ctx.confirmado) return responder({ ok: true, confirmado: true })
        const novo = await deps.banco.novoCodigo(usuario.id)
        if (!novo?.ok) { await anotar('codigo ' + (novo?.motivo || 'erro')); return responder({ ok: false, erro: novo?.motivo === 'limite' ? 'limite_codigo' : 'envio' }, novo?.motivo === 'limite' ? 429 : 502) }
        const enviado = await enviarCodigo(novo)
        await anotar(enviado ? 'codigo enviado' : 'codigo falhou')
        if (!enviado) return responder({ ok: false, erro: 'envio' }, 502)
        return responder({ ok: true, enviado: true, email: mascarar(novo.email) })
      }
      if (acao === 'confirmar_codigo') {
        const codigo = String(entrada?.codigo || '').replace(/\D/g, '')
        if (codigo.length !== 6) return responder({ ok: false, erro: 'campo', campo: 'codigo' }, 422)
        const r = await deps.banco.conferirCodigo(usuario.id, codigo)
        await anotar('codigo ' + (r?.ok ? 'ok' : r?.motivo || 'erro'))
        return r?.ok ? responder({ ok: true, confirmado: true }) : responder({ ok: false, erro: r?.motivo || 'incorreto' }, 400)
      }

      const chave = deps.env('UM_CLIQUE_CHAVE')
      if (!chave) { await anotar('desligado'); return responder({ ok: false, erro: 'desligado' }, 503) }
      const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim()

      // ---- consultar ----
      if (acao === 'consultar') {
        const r = await servico(chave, { acao: 'consultar', email: ctx.email, oferta: OFERTA })
        const j = r.json
        if (j?.ok === true && !ctx.confirmado && (j.elegivel === true || j.motivo === 'ja_comprou')) {
          // Antes de confirmar o e-mail, não mostramos cartão nem liberamos nada.
          await anotar('confirmar_email')
          return responder({ ok: true, elegivel: false, motivo: 'confirmar_email', email: mascarar(ctx.email) })
        }
        if (j?.ok === true && j.elegivel === false && j.motivo === 'ja_comprou') {
          try { await deps.banco.liberarPremium(usuario.id, null) } catch { /* segue: o webhook da compra também libera */ } // compra já existe: garante o Premium, sem cobrar
        }
        await anotar('consultar ' + (j?.elegivel === true ? 'elegivel' : j?.motivo || j?.erro || r.status))
        return responder(j ?? { ok: false, erro: 'erro' }, r.status)
      }

      // ---- comprar ----
      if (!ctx.confirmado) { await anotar('confirmar_email'); return responder({ ok: false, status: 'nao_elegivel', motivo: 'confirmar_email' }, 409) }
      const chaveUnica = String(entrada?.chave_unica || '')
      if (!UUID.test(chaveUnica)) return responder({ ok: false, erro: 'campo', campo: 'chave_unica' }, 422)
      const r = await servico(chave, { acao: 'comprar', email: ctx.email, oferta: OFERTA, chave_unica: chaveUnica, ip_cliente: ip }, 40000)
      const j = r.json
      if (j?.ok === true && j.status === 'aprovado') {
        try { await deps.banco.liberarPremium(usuario.id, j.pedido ? String(j.pedido) : null) }
        catch { await anotar('aprovado SEM liberar', j.pedido ? String(j.pedido) : null); return responder(j, r.status) }
      }
      await anotar('comprar ' + (j?.status || j?.erro || r.status), j?.pedido ? String(j.pedido) : null)
      return responder(j ?? { ok: false, status: 'erro' }, r.status)
    } catch {
      await anotar('erro interno')
      return responder({ ok: false, status: 'erro' }, 500)
    }
  }

  // Chama o serviço de cobrança. Nunca registra o corpo nem a chave.
  async function servico(chave, corpo, limiteMs = 15000) {
    try {
      const resp = await deps.fetch(SERVICO, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + chave, 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo),
        cache: 'no-store',
        signal: AbortSignal.timeout(limiteMs),
      })
      let json = null
      try { json = await resp.json() } catch { /* resposta sem JSON */ }
      if (!json || typeof json !== 'object') return { status: 502, json: { ok: false, status: 'erro' } }
      return { status: resp.status, json }
    } catch {
      // Sem resposta numa cobrança: não sabemos se cobrou. O app acompanha com "consultar", nunca repete "comprar" sozinho.
      return corpo.acao === 'comprar' ? { status: 202, json: { ok: true, status: 'indefinido' } } : { status: 502, json: { ok: false, status: 'erro' } }
    }
  }

  // O e-mail com o código sai pelo n8n (Mautic → Brevo), como o de "esqueci a senha".
  async function enviarCodigo(novo) {
    try {
      const [url, token] = await Promise.all([deps.banco.config('codigo_webhook_url'), deps.banco.config('codigo_webhook_token')])
      if (!url || !token) return false
      const resp = await deps.fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-webhook-token': token },
        body: JSON.stringify({ email: novo.email, nome: novo.nome || '', codigo: novo.codigo }),
        signal: AbortSignal.timeout(15000),
      })
      return resp.ok
    } catch { return false }
  }
}

// ---- ligação com o Supabase (só roda no servidor) ----
if (typeof Deno !== 'undefined') {
  const { createClient } = await import('npm:@supabase/supabase-js@2')
  const env = (n) => Deno.env.get(n) || ''
  const deJson = (nome) => { try { const o = JSON.parse(env(nome) || '{}'); return o.default || Object.values(o)[0] || '' } catch { return '' } }
  const chavePublica = env('SUPABASE_ANON_KEY') || deJson('SUPABASE_PUBLISHABLE_KEYS')
  const chaveServidor = env('SUPABASE_SERVICE_ROLE_KEY') || deJson('SUPABASE_SECRET_KEYS')
  const admin = createClient(env('SUPABASE_URL'), chaveServidor, { auth: { persistSession: false } })
  const rpc = async (fn, args) => { const { data, error } = await admin.rpc(fn, args); if (error) throw new Error(fn); return data }
  const banco = {
    async usuario(auth) {
      if (!auth) return null
      const sb = createClient(env('SUPABASE_URL'), chavePublica, { global: { headers: { Authorization: auth } }, auth: { persistSession: false } })
      const { data } = await sb.auth.getUser()
      return data?.user ? { id: data.user.id } : null
    },
    inicio: (id, acao) => rpc('uc_inicio', { p_user: id, p_acao: acao }),
    resultado: (log, texto, pedido = null) => rpc('uc_resultado', { p_log: log, p_resultado: texto, p_pedido: pedido }),
    novoCodigo: (id) => rpc('uc_novo_codigo', { p_user: id }),
    conferirCodigo: (id, codigo) => rpc('uc_conferir_codigo', { p_user: id, p_codigo: codigo }),
    liberarPremium: (id, pedido) => rpc('uc_liberar_premium', { p_user: id, p_pedido: pedido }),
    async config(chave) { const { data } = await admin.from('config_privada').select('valor').eq('chave', chave).maybeSingle(); return data?.valor || '' },
  }
  Deno.serve(criarHandler({ env, fetch, banco }))
}
