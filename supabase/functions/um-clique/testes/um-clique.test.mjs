// Testes da função "um-clique" com serviço de cobrança e banco simulados.
// Rodar:  node supabase/functions/um-clique/testes/rodar.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { criarHandler, mascarar } from './index.copia.mjs'

const ORIGEM = 'https://miclubdelsecreto.vercel.app'
const CHAVE_UNICA = '3f2b6c1e-8a4d-4c2b-9e1f-5a6b7c8d9e0f'

function cenario({ respostas = [], confirmado = true, sessao = true, chave = 'chave-de-teste', ativo = true, chamadas = 1 } = {}) {
  const chamadasServico = [], liberados = [], emails = []
  const estado = { confirmado, codigo: null }
  const deps = {
    env: (n) => ({ APP_ORIGIN: ORIGEM, UM_CLIQUE_CHAVE: chave }[n] || ''),
    fetch: async (url, opt) => {
      const corpo = JSON.parse(opt.body)
      if (url.includes('n8n')) { emails.push(corpo); return new Response('ok') }
      chamadasServico.push({ url, corpo, auth: opt.headers.Authorization })
      const r = respostas.shift()
      if (!r) throw new Error('sem resposta simulada')
      if (r === 'timeout') throw new Error('timeout')
      return new Response(JSON.stringify(r.json), { status: r.status })
    },
    banco: {
      usuario: async (auth) => (sessao && auth ? { id: 'u1' } : null),
      inicio: async () => ({ log: 1, chamadas, email: 'ana@gmail.com', nome: 'Ana', ativo, confirmado: estado.confirmado }),
      resultado: async () => {},
      novoCodigo: async () => { estado.codigo = '482913'; return { ok: true, codigo: '482913', email: 'ana@gmail.com', nome: 'Ana' } },
      conferirCodigo: async (_id, c) => { if (c === estado.codigo) { estado.confirmado = true; return { ok: true } } return { ok: false, motivo: 'incorreto' } },
      liberarPremium: async (id, pedido) => { liberados.push({ id, pedido }) },
      config: async (k) => ({ codigo_webhook_url: 'https://n8n.exemplo/webhook/codigo', codigo_webhook_token: 't' }[k] || ''),
    },
  }
  const handler = criarHandler(deps)
  const chamar = async (corpo, { origem = ORIGEM, auth = 'Bearer sessao', ip = '201.10.20.30, 10.0.0.1' } = {}) => {
    const resp = await handler(new Request('https://x/functions/v1/um-clique', {
      method: 'POST', headers: { ...(origem ? { origin: origem } : {}), ...(auth ? { authorization: auth } : {}), 'x-forwarded-for': ip, 'content-type': 'application/json' },
      body: JSON.stringify(corpo),
    }))
    return { status: resp.status, json: await resp.json() }
  }
  return { chamar, chamadasServico, liberados, emails }
}

const ELEGIVEL = { status: 200, json: { ok: true, elegivel: true, oferta: { id: 'club', nome: 'Club Secreto', preco: '67.00', moeda: 'USD' }, cartao: { bandeira: 'VISA', final: '1234' } } }
const JA_COMPROU = { status: 200, json: { ok: true, elegivel: false, motivo: 'ja_comprou' } }

test('elegível: devolve oferta e cartão; o e-mail vem da sessão, nunca do navegador', async () => {
  const c = cenario({ respostas: [ELEGIVEL] })
  const r = await c.chamar({ acao: 'consultar', email: 'outra@pessoa.com', oferta: 'outra', preco: '1.00' })
  assert.equal(r.status, 200); assert.equal(r.json.elegivel, true); assert.equal(r.json.cartao.final, '1234')
  assert.deepEqual(c.chamadasServico[0].corpo, { acao: 'consultar', email: 'ana@gmail.com', oferta: 'club' })
  assert.equal(c.chamadasServico[0].auth, 'Bearer chave-de-teste')
  assert.equal(c.chamadasServico[0].url, 'https://cc.ritualmetabolico.com/app-um-clique.php')
})

test('já comprou: devolve ja_comprou e garante o Premium', async () => {
  const c = cenario({ respostas: [JA_COMPROU] })
  const r = await c.chamar({ acao: 'consultar' })
  assert.equal(r.json.motivo, 'ja_comprou'); assert.equal(c.liberados.length, 1)
})

test('aprovado: libera o Premium na hora e repassa IP real e chave única', async () => {
  const c = cenario({ respostas: [{ status: 200, json: { ok: true, status: 'aprovado', pedido: 'A1B2', valor: '67.00' } }] })
  const r = await c.chamar({ acao: 'comprar', chave_unica: CHAVE_UNICA, email: 'x@y.com' })
  assert.equal(r.status, 200); assert.equal(r.json.status, 'aprovado')
  assert.deepEqual(c.liberados, [{ id: 'u1', pedido: 'A1B2' }])
  assert.deepEqual(c.chamadasServico[0].corpo, { acao: 'comprar', email: 'ana@gmail.com', oferta: 'club', chave_unica: CHAVE_UNICA, ip_cliente: '201.10.20.30' })
})

test('recusado: 402, não libera', async () => {
  const c = cenario({ respostas: [{ status: 402, json: { ok: false, status: 'recusado' } }] })
  const r = await c.chamar({ acao: 'comprar', chave_unica: CHAVE_UNICA })
  assert.equal(r.status, 402); assert.equal(r.json.status, 'recusado'); assert.equal(c.liberados.length, 0)
})

test('indefinido → consulta com ja_comprou: libera na consulta', async () => {
  const c = cenario({ respostas: [{ status: 202, json: { ok: true, status: 'indefinido' } }, JA_COMPROU] })
  const r1 = await c.chamar({ acao: 'comprar', chave_unica: CHAVE_UNICA })
  assert.equal(r1.status, 202); assert.equal(r1.json.status, 'indefinido'); assert.equal(c.liberados.length, 0)
  const r2 = await c.chamar({ acao: 'consultar' })
  assert.equal(r2.json.motivo, 'ja_comprou'); assert.equal(c.liberados.length, 1)
})

test('indefinido → consulta com elegível: nova tentativa reaproveita a mesma chave', async () => {
  const c = cenario({ respostas: ['timeout', ELEGIVEL, { status: 200, json: { ok: true, status: 'aprovado', pedido: 'P9' } }] })
  const r1 = await c.chamar({ acao: 'comprar', chave_unica: CHAVE_UNICA })
  assert.equal(r1.status, 202); assert.equal(r1.json.status, 'indefinido') // sem resposta do serviço = indefinido
  const r2 = await c.chamar({ acao: 'consultar' }); assert.equal(r2.json.elegivel, true)
  await c.chamar({ acao: 'comprar', chave_unica: CHAVE_UNICA })
  assert.equal(c.chamadasServico[0].corpo.chave_unica, c.chamadasServico[2].corpo.chave_unica)
  assert.equal(c.liberados.length, 1)
})

test('erro do serviço: 502, não libera', async () => {
  const c = cenario({ respostas: [{ status: 502, json: { ok: false, erro: 'kn_indisponivel' } }] })
  const r = await c.chamar({ acao: 'comprar', chave_unica: CHAVE_UNICA })
  assert.equal(r.status, 502); assert.equal(r.json.erro, 'kn_indisponivel'); assert.equal(c.liberados.length, 0)
})

test('sessão ausente: 401 e o serviço não é chamado', async () => {
  const c = cenario({ sessao: false, respostas: [ELEGIVEL] })
  const r = await c.chamar({ acao: 'consultar' }, { auth: '' })
  assert.equal(r.status, 401); assert.equal(c.chamadasServico.length, 0)
})

test('Origin errado ou ausente: 403 e o serviço não é chamado', async () => {
  const c = cenario({ respostas: [ELEGIVEL] })
  assert.equal((await c.chamar({ acao: 'comprar', chave_unica: CHAVE_UNICA }, { origem: 'https://site-malicioso.com' })).status, 403)
  assert.equal((await c.chamar({ acao: 'consultar' }, { origem: '' })).status, 403)
  assert.equal(c.chamadasServico.length, 0)
})

// ---- extras: confirmação do e-mail e travas ----
test('e-mail não confirmado: consulta não mostra o cartão e compra é recusada sem chamar o serviço', async () => {
  const c = cenario({ confirmado: false, respostas: [ELEGIVEL] })
  const r = await c.chamar({ acao: 'consultar' })
  assert.deepEqual(r.json, { ok: true, elegivel: false, motivo: 'confirmar_email', email: 'an•••@gmail.com' })
  const r2 = await c.chamar({ acao: 'comprar', chave_unica: CHAVE_UNICA })
  assert.equal(r2.status, 409); assert.equal(r2.json.motivo, 'confirmar_email'); assert.equal(c.chamadasServico.length, 1)
})

test('código por e-mail: envia, recusa código errado, confirma o certo e então mostra o cartão', async () => {
  const c = cenario({ confirmado: false, respostas: [ELEGIVEL] })
  const p = await c.chamar({ acao: 'pedir_codigo' })
  assert.equal(p.json.enviado, true); assert.equal(p.json.email, 'an•••@gmail.com'); assert.equal(c.emails[0].codigo, '482913')
  assert.equal(JSON.stringify(p.json).includes('482913'), false) // o código nunca volta para o navegador
  assert.equal((await c.chamar({ acao: 'confirmar_codigo', codigo: '000000' })).status, 400)
  assert.equal((await c.chamar({ acao: 'confirmar_codigo', codigo: '482913' })).json.confirmado, true)
  assert.equal((await c.chamar({ acao: 'consultar' })).json.cartao.bandeira, 'VISA')
})

test('sem chave configurada: 503 desligado; limite por minuto: 429; chave_unica inválida: 422', async () => {
  assert.equal((await cenario({ chave: '' }).chamar({ acao: 'consultar' })).status, 503)
  assert.equal((await cenario({ chamadas: 11 }).chamar({ acao: 'consultar' })).status, 429)
  const c = cenario({ respostas: [ELEGIVEL] })
  assert.equal((await c.chamar({ acao: 'comprar', chave_unica: 'abc' })).status, 422); assert.equal(c.chamadasServico.length, 0)
  assert.equal(mascarar('ana@gmail.com'), 'an•••@gmail.com')
})
