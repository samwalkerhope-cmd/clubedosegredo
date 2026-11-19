// Camada de dados. Com as variáveis do Supabase configuradas, usa o Supabase.
// Sem elas, roda em MODO DEMONSTRAÇÃO: os dados ficam só neste navegador.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const dominio = import.meta.env.VITE_AUTH_EMAIL_DOMAIN || 'membros.exemplo.com'

export const DEMO = !(url && key)
const sb = DEMO ? null : createClient(url, key)

// ---- idioma das mensagens (VITE_IDIOMA=es no site em espanhol) ----
const ES = {
  'Informe o telefone com DDD.': 'Ingresa el teléfono con el código de país.',
  'Informe seu telefone (com DDD) ou e-mail.': 'Ingresa tu teléfono (con código de país) o tu correo.',
  'Informe um telefone ou e-mail.': 'Ingresa un teléfono o un correo.',
  'Telefone/e-mail ou senha incorretos.': 'Teléfono/correo o contraseña incorrectos.',
  'Este telefone ou e-mail já tem conta. Use "Entrar".': 'Este teléfono o correo ya tiene cuenta. Usa "Entrar".',
  'Não encontramos uma compra com este telefone ou e-mail. Use o mesmo e-mail da compra.': 'No encontramos una compra con este teléfono o correo. Usa el mismo correo de la compra.',
  'Não foi possível conectar. Tente de novo.': 'No se pudo conectar. Inténtalo de nuevo.',
  'Não foi possível alterar o acesso.': 'No se pudo cambiar el acceso.',
  'Este link expirou ou já foi usado. Peça um novo.': 'Este enlace expiró o ya fue usado. Pide uno nuevo.',
  'Não foi possível carregar a conversa.': 'No se pudo cargar la conversación.',
  'Não foi possível carregar este protocolo. Tente de novo.': 'No se pudo cargar este protocolo. Inténtalo de nuevo.',
  'Você chegou ao limite de mensagens de hoje. Volte amanhã.': 'Llegaste al límite de mensajes de hoy. Vuelve mañana.',
  'O assistente é exclusivo do acesso Premium.': 'Habla con la Dra. es exclusivo del acceso Premium.',
  'O assistente não conseguiu responder agora. Tente de novo em instantes.': 'La Dra. no pudo responder ahora. Inténtalo de nuevo en unos instantes.',
  'Sua sessão expirou. Entre de novo.': 'Tu sesión expiró. Vuelve a entrar.',
  'Telefone ou senha incorretos.': 'Teléfono o contraseña incorrectos.',
  'Informe seu nome.': 'Ingresa tu nombre.',
  'A senha precisa ter pelo menos 6 caracteres.': 'La contraseña debe tener al menos 6 caracteres.',
  'Este telefone já tem conta. Use "Entrar".': 'Este teléfono ya tiene cuenta. Usa "Entrar".',
  'Este telefone ainda não tem acesso liberado.': 'Este teléfono todavía no tiene el acceso habilitado.',
  'Conta criada, mas a confirmação por e-mail está ligada no Supabase. Desligue-a (veja o README).': 'Cuenta creada, pero la confirmación por correo está activada en Supabase. Desactívala (ver el README).',
  'Não foi possível salvar.': 'No se pudo guardar.',
  'Não foi possível carregar seu progresso.': 'No se pudo cargar tu progreso.',
  'Não foi possível salvar o dia.': 'No se pudo guardar el día.',
  'Não foi possível carregar seus registros.': 'No se pudieron cargar tus registros.',
  'Não foi possível enviar a foto.': 'No se pudo enviar la foto.',
  'Seu acesso foi encerrado. Fale com o suporte.': 'Tu acceso terminó. Habla con soporte.',
  'Não foi possível alterar o plano.': 'No se pudo cambiar el plan.',
  'Não foi possível redefinir a senha.': 'No se pudo restablecer la contraseña.',
  'Não foi possível salvar o registro.': 'No se pudo guardar el registro.',
  'Não foi possível apagar.': 'No se pudo borrar.',
  'Não foi possível abrir este material. Tente de novo ou fale com o suporte.': 'No se pudo abrir este material. Inténtalo de nuevo o contacta a soporte.',
  'Não foi possível carregar os acessos.': 'No se pudieron cargar los accesos.',
  'Não foi possível liberar o acesso.': 'No se pudo habilitar el acceso.',
  'Não foi possível remover o acesso.': 'No se pudo quitar el acceso.',
  'Não foi possível carregar os membros.': 'No se pudieron cargar los miembros.',
  'As senhas não conferem.': 'Las contraseñas no coinciden.',
  'Não foi possível alterar a senha.': 'No se pudo cambiar la contraseña.',
}
const msg = (texto) => (import.meta.env.VITE_IDIOMA === 'es' && ES[texto]) || texto

// ---- armazenamento local (modo demonstração) ----
const mem = {}
const local = {
  get(k, padrao) {
    try {
      const v = localStorage.getItem(k)
      if (v != null) return JSON.parse(v)
    } catch { /* sem acesso ao armazenamento: usa memória */ }
    return k in mem ? mem[k] : padrao
  },
  set(k, v) {
    mem[k] = v
    try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* fica só em memória */ }
  },
  del(k) {
    delete mem[k]
    try { localStorage.removeItem(k) } catch { /* nada a fazer */ }
  },
}

const soNumeros = (t) => String(t || '').replace(/\D/g, '')
const ehEmail = (t) => String(t || '').includes('@')
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Aceita telefone (8+ dígitos, com ou sem código do país) ou e-mail.
const identValido = (t) => (ehEmail(t) ? EMAIL_OK.test(String(t).trim()) : soNumeros(t).length >= 8)
// O login interno da conta (xxxx@dominio) não é o e-mail da cliente: nunca aparece na tela.
const emailReal = (e) => (e && !String(e).toLowerCase().endsWith('@' + dominio.toLowerCase()) ? e : '')
const usuarioDe = (u) => u && { id: u.id, nome: u.user_metadata?.nome || '', telefone: u.user_metadata?.telefone || '', email: emailReal(u.user_metadata?.email) }

// O banco encontra o acesso pelo telefone ou e-mail e devolve o login interno da conta (veja login_de em supabase/schema.sql).
async function emailDe(ident) {
  const { data, error } = await sb.rpc('login_de', { p_ident: String(ident).trim() })
  if (error || !data) throw new Error(msg('Não foi possível conectar. Tente de novo.'))
  return `${data}@${dominio}`
}

// Preferências simples deste aparelho (ex.: itens marcados na lista de compras).
export const guardado = local

async function comAdmin(u) {
  if (!u) return null
  const { data } = await sb.from('profiles').select('admin, plano, email, telefone').eq('id', u.id).maybeSingle()
  // plano: 'clube' (Premium) ou 'padrao'. Quem define é o admin, no painel.
  // E-mail e telefone mostrados no perfil são os da compra (guardados no banco).
  return { ...u, email: emailReal(data?.email) || u.email, telefone: data?.telefone || u.telefone, admin: !!data?.admin, plano: data?.plano || 'padrao' }
}
const demoUsuario = (u) => u && { ...u, admin: true, plano: 'clube' } // no modo demonstração o painel fica visível

// Confere se o telefone da pessoa continua na lista de acessos (admins sempre têm acesso).
// Se a consulta falhar por instabilidade, não expulsa ninguém.
async function temAcesso() {
  const { data, error } = await sb.rpc('tem_acesso')
  return error ? true : !!data
}

// ---- sessão ----
export async function sessao() {
  if (DEMO) return demoUsuario(local.get('clube.usuario', null))
  const { data } = await sb.auth.getSession()
  const u = usuarioDe(data.session?.user)
  if (u && !(await temAcesso())) {
    await sb.auth.signOut()
    return null
  }
  return comAdmin(u)
}

export async function entrar(telefone, senha) {
  if (!identValido(telefone)) throw new Error(msg('Informe seu telefone (com DDD) ou e-mail.'))
  if (DEMO) {
    const u = local.get('clube.usuario', null) || { id: 'demo', nome: '', telefone: ehEmail(telefone) ? '' : soNumeros(telefone), email: ehEmail(telefone) ? telefone.trim() : '' }
    local.set('clube.usuario', u)
    return demoUsuario(u)
  }
  const { data, error } = await sb.auth.signInWithPassword({ email: await emailDe(telefone), password: senha })
  if (error) throw new Error(msg('Telefone/e-mail ou senha incorretos.'))
  if (!(await temAcesso())) {
    await sb.auth.signOut()
    throw new Error(msg('Seu acesso foi encerrado. Fale com o suporte.'))
  }
  return comAdmin(usuarioDe(data.user))
}

export async function criarConta(nome, telefone, senha) {
  if (!nome.trim()) throw new Error(msg('Informe seu nome.'))
  if (!identValido(telefone)) throw new Error(msg('Informe seu telefone (com DDD) ou e-mail.'))
  if (DEMO) {
    const u = { id: 'demo', nome: nome.trim(), telefone: ehEmail(telefone) ? '' : soNumeros(telefone), email: ehEmail(telefone) ? telefone.trim() : '' }
    local.set('clube.usuario', u)
    return demoUsuario(u)
  }
  if (senha.length < 6) throw new Error(msg('A senha precisa ter pelo menos 6 caracteres.'))
  const { data, error } = await sb.auth.signUp({
    email: await emailDe(telefone),
    password: senha,
    options: { data: { nome: nome.trim(), ...(ehEmail(telefone) ? { email: telefone.trim().toLowerCase() } : { telefone: soNumeros(telefone) }) } },
  })
  // O banco só aceita quem está na lista de acessos ativos (compra aprovada ou liberação manual).
  if (error) throw new Error(msg(error.message.includes('registered') ? 'Este telefone ou e-mail já tem conta. Use "Entrar".' : 'Não encontramos uma compra com este telefone ou e-mail. Use o mesmo e-mail da compra.'))
  if (!data.session) throw new Error(msg('Conta criada, mas a confirmação por e-mail está ligada no Supabase. Desligue-a (veja o README).'))
  return comAdmin(usuarioDe(data.user)) // o perfil é criado pelo próprio banco
}

// ---- conteúdo Premium: o banco só entrega o protocolo completo para quem é Premium (ou admin) ----
const cacheProtocolos = {}
export async function protocoloCompleto(id) {
  if (cacheProtocolos[id]) return cacheProtocolos[id]
  if (DEMO) return { acontece: '', solucao: 'Modo demostración: el contenido completo viene del banco de datos.', frase: '', passos: [], evitar: [], lembre: '' }
  const { data, error } = await sb.from('protocolos_conteudo').select('dados').eq('id', id).maybeSingle()
  if (error || !data) throw new Error(msg('Não foi possível carregar este protocolo. Tente de novo.'))
  cacheProtocolos[id] = data.dados
  return data.dados
}

// ---- assistente (IA): o histórico fica no banco; a resposta vem da função "asistente" do Supabase (Gemini) ----
export async function historicoChat() {
  if (DEMO) return local.get('clube.chat', [])
  const { data, error } = await sb.from('chat_mensagens').select('id, papel, texto').order('id', { ascending: true }).limit(200)
  if (error) throw new Error(msg('Não foi possível carregar a conversa.'))
  return data
}

export async function enviarChat(texto) {
  if (DEMO) {
    const lista = local.get('clube.chat', [])
    const resposta = 'Modo demostración: aquí aparecerá la respuesta de la Dra.'
    local.set('clube.chat', [...lista, { id: Date.now(), papel: 'user', texto }, { id: Date.now() + 1, papel: 'model', texto: resposta }])
    return { resposta, restantes: null }
  }
  const { data, error } = await sb.functions.invoke('asistente', { body: { texto } })
  if (error) {
    let corpo = {}
    try { corpo = await error.context.json() } catch { /* sem corpo */ }
    if (corpo.erro === 'limite') throw new Error(msg('Você chegou ao limite de mensagens de hoje. Volte amanhã.'))
    if (corpo.erro === 'premium' || corpo.erro === 'acesso') throw new Error(msg('O assistente é exclusivo do acesso Premium.'))
    if (corpo.erro === 'sessao') throw new Error(msg('Sua sessão expirou. Entre de novo.'))
    throw new Error(msg('O assistente não conseguiu responder agora. Tente de novo em instantes.'))
  }
  return data
}

// ---- link pessoal de acesso (convite enviado no e-mail de acesso): a cliente só cria a senha ----
export async function verConvite(token) {
  if (DEMO) return { ok: true, nome: '', email: '', tem_conta: false }
  const { data, error } = await sb.rpc('ver_convite', { p_token: token })
  if (error) throw new Error(msg('Não foi possível conectar. Tente de novo.'))
  return data || { ok: false }
}

export async function entrarComConvite(token, convite, nome, senha, confirma) {
  const nomeFinal = (nome || convite.nome || '').trim()
  if (!nomeFinal) throw new Error(msg('Informe seu nome.'))
  if (!senha || senha.length < 6) throw new Error(msg('A senha precisa ter pelo menos 6 caracteres.'))
  if (senha !== confirma) throw new Error(msg('As senhas não conferem.'))
  if (DEMO) {
    const u = { id: 'demo', nome: nomeFinal, telefone: '', email: convite.email || '' }
    local.set('clube.usuario', u)
    return demoUsuario(u)
  }
  const email = `${convite.login}@${dominio}`
  const expirou = () => new Error(msg('Este link expirou ou já foi usado. Peça um novo.'))
  let temConta = !!convite.tem_conta
  if (!temConta) {
    const { data, error } = await sb.auth.signUp({ email, password: senha, options: { data: { nome: nomeFinal, email: (convite.email || '').toLowerCase(), convite: token } } })
    if (!error && data.session) return comAdmin(usuarioDe(data.user))
    if (error && !error.message.includes('registered')) throw expirou()
    if (!error) throw new Error(msg('Conta criada, mas a confirmação por e-mail está ligada no Supabase. Desligue-a (veja o README).'))
    temConta = true // a conta já existia: segue pela troca de senha
  }
  const { error: erroSenha } = await sb.rpc('senha_com_convite', { p_token: token, p_senha: senha })
  if (erroSenha) throw expirou()
  const { data, error } = await sb.auth.signInWithPassword({ email, password: senha })
  if (error) throw expirou()
  return comAdmin(usuarioDe(data.user))
}

// ---- compra do Club Secreto em 1 clique ----
// O app fala só com a função "um-clique" do Supabase (servidor). É ela que guarda a chave e conversa com o serviço de cobrança.
// Daqui só saem "acao", "chave_unica" e "codigo": o e-mail, o preço e o produto são definidos no servidor.
// Devolve o JSON da resposta com o código HTTP em "http". Decida sempre pelo JSON (ok, elegivel, motivo, status).
export async function umClique(acao, extra = {}) {
  const corpo = { acao }
  if (extra.chave_unica) corpo.chave_unica = extra.chave_unica
  if (extra.codigo) corpo.codigo = extra.codigo
  if (DEMO) return demoUmClique(corpo)
  try {
    const { data } = await sb.auth.getSession()
    const resp = await fetch(`${url}/functions/v1/um-clique`, {
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${data.session?.access_token || ''}` },
      body: JSON.stringify(corpo),
    })
    let json = {}
    try { json = await resp.json() } catch { /* sem corpo */ }
    return { ...json, http: resp.status }
  } catch {
    // Sem resposta numa cobrança: não sabemos se cobrou. A tela acompanha com "consultar".
    return acao === 'comprar' ? { ok: true, status: 'indefinido', http: 0 } : { ok: false, status: 'erro', http: 0 }
  }
}

// Modo demonstração: nada é cobrado. Código de teste 123456. Um teste pode trocar as respostas com window.__umCliqueDemo.
const demoUC = { confirmado: false, comprou: false }
async function demoUmClique(corpo) {
  await new Promise((r) => setTimeout(r, 400))
  if (typeof window !== 'undefined' && typeof window.__umCliqueDemo === 'function') return window.__umCliqueDemo(corpo)
  if (corpo.acao === 'pedir_codigo') return { ok: true, enviado: true, email: 'tu•••@correo.com', http: 200 }
  if (corpo.acao === 'confirmar_codigo') {
    if (corpo.codigo !== '123456') return { ok: false, erro: 'incorreto', http: 400 }
    demoUC.confirmado = true
    return { ok: true, confirmado: true, http: 200 }
  }
  if (corpo.acao === 'consultar') {
    if (demoUC.comprou) return { ok: true, elegivel: false, motivo: 'ja_comprou', http: 200 }
    if (!demoUC.confirmado) return { ok: true, elegivel: false, motivo: 'confirmar_email', email: 'tu•••@correo.com', http: 200 }
    return { ok: true, elegivel: true, oferta: { id: 'club', nome: 'Club Secreto', preco: '67.00', moeda: 'USD' }, cartao: { bandeira: 'VISA', final: '1234' }, http: 200 }
  }
  demoUC.comprou = true
  return { ok: true, status: 'aprovado', pedido: 'DEMO', valor: '67.00', http: 200 }
}

// ---- recuperação de senha (link por e-mail, enviado pelo n8n + Mautic) ----
// A resposta é sempre a mesma, exista ou não a conta (não revela quem é cliente).
export async function pedirReset(url, ident) {
  if (!identValido(ident)) throw new Error(msg('Informe seu telefone (com DDD) ou e-mail.'))
  if (DEMO || !url) return
  try {
    await fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ ident: String(ident).trim() }).toString() })
  } catch { /* a mensagem para a cliente é a mesma */ }
}

export async function redefinirComToken(token, senha, confirma) {
  if (!senha || senha.length < 6) throw new Error(msg('A senha precisa ter pelo menos 6 caracteres.'))
  if (senha !== confirma) throw new Error(msg('As senhas não conferem.'))
  if (DEMO) return
  const { error } = await sb.rpc('redefinir_com_token', { p_token: token, p_senha: senha })
  if (error) throw new Error(msg('Este link expirou ou já foi usado. Peça um novo.'))
}

export async function sair() {
  if (DEMO) return local.del('clube.usuario')
  await sb.auth.signOut()
}

export async function salvarNome(usuario, nome) {
  const novo = { ...usuario, nome: nome.trim() }
  if (DEMO) { local.set('clube.usuario', novo); return novo }
  const { error } = await sb.auth.updateUser({ data: { nome: novo.nome } })
  if (error) throw new Error(msg('Não foi possível salvar.'))
  await sb.from('profiles').update({ nome: novo.nome }).eq('id', usuario.id)
  return novo
}

export async function alterarSenha(nova, confirma) {
  if (!nova || nova.length < 6) throw new Error(msg('A senha precisa ter pelo menos 6 caracteres.'))
  if (nova !== confirma) throw new Error(msg('As senhas não conferem.'))
  if (DEMO) return
  const { error } = await sb.auth.updateUser({ password: nova })
  if (error) throw new Error(msg('Não foi possível alterar a senha.'))
}

// ---- progresso da jornada ----
export async function progresso(usuario) {
  if (DEMO) return local.get('clube.progresso', [])
  const { data, error } = await sb.from('progress').select('dia').eq('user_id', usuario.id)
  if (error) throw new Error(msg('Não foi possível carregar seu progresso.'))
  return data.map((r) => r.dia)
}

export async function marcarDia(usuario, dia, concluido) {
  if (DEMO) {
    const atual = new Set(local.get('clube.progresso', []))
    concluido ? atual.add(dia) : atual.delete(dia)
    local.set('clube.progresso', [...atual])
    return
  }
  const q = concluido
    ? sb.from('progress').upsert({ user_id: usuario.id, dia })
    : sb.from('progress').delete().eq('user_id', usuario.id).eq('dia', dia)
  const { error } = await q
  if (error) throw new Error(msg('Não foi possível salvar o dia.'))
}

// ---- evolução (diário: um registro por dia, com peso, humor e foto) ----
// As fotos ficam no bucket privado "fotos", em uma pasta por pessoa; só a dona consegue abrir.
const caminhoFoto = (usuario, dia) => `${usuario.id}/dia-${dia}.jpg`
const paraDataUrl = (blob) => new Promise((ok, falha) => {
  const leitor = new FileReader()
  leitor.onload = () => ok(leitor.result)
  leitor.onerror = falha
  leitor.readAsDataURL(blob)
})

export async function diario(usuario) {
  if (DEMO) return local.get('clube.diario', []).map((r) => ({ ...r, fotoUrl: r.foto || '' }))
  const { data, error } = await sb.from('diario').select('dia, peso, humor, cintura, quadril, foto, atualizado_em').eq('user_id', usuario.id).order('dia')
  if (error) throw new Error(msg('Não foi possível carregar seus registros.'))
  const comFoto = data.filter((r) => r.foto)
  let links = {}
  if (comFoto.length) {
    const { data: assinados } = await sb.storage.from('fotos').createSignedUrls(comFoto.map((r) => r.foto), 3600)
    for (const a of assinados || []) if (a.signedUrl) links[a.path] = a.signedUrl
  }
  // O sufixo muda quando a foto é trocada, para o navegador não mostrar a versão antiga.
  return data.map((r) => ({ ...r, fotoUrl: links[r.foto] ? `${links[r.foto]}&v=${Date.parse(r.atualizado_em)}` : '' }))
}

export async function salvarDiario(usuario, dia, { peso, humor, cintura = null, quadril = null, arquivo, removerFoto }) {
  if (DEMO) {
    const atual = local.get('clube.diario', [])
    const antigo = atual.find((r) => r.dia === dia)
    const foto = arquivo ? await paraDataUrl(arquivo) : removerFoto ? null : antigo?.foto || null
    local.set('clube.diario', [...atual.filter((r) => r.dia !== dia), { dia, peso, humor, cintura, quadril, foto }].sort((a, b) => a.dia - b.dia))
    return
  }
  const caminho = caminhoFoto(usuario, dia)
  const item = { user_id: usuario.id, dia, peso, humor, cintura, quadril, atualizado_em: new Date().toISOString() }
  if (arquivo) {
    const { error } = await sb.storage.from('fotos').upload(caminho, arquivo, { upsert: true, contentType: 'image/jpeg' })
    if (error) throw new Error(msg('Não foi possível enviar a foto.'))
    item.foto = caminho
  } else if (removerFoto) {
    await sb.storage.from('fotos').remove([caminho])
    item.foto = null
  }
  const { error } = await sb.from('diario').upsert(item)
  if (error) throw new Error(msg('Não foi possível salvar o registro.'))
}

export async function apagarDiario(usuario, dia) {
  if (DEMO) return local.set('clube.diario', local.get('clube.diario', []).filter((r) => r.dia !== dia))
  await sb.storage.from('fotos').remove([caminhoFoto(usuario, dia)])
  const { error } = await sb.from('diario').delete().eq('user_id', usuario.id).eq('dia', dia)
  if (error) throw new Error(msg('Não foi possível apagar.'))
}

// ---- presentes (PDFs protegidos no Supabase Storage, bucket "presentes") ----
// Devolve um link temporário (5 minutos) para o PDF. Só funciona para quem está logada e com acesso liberado.
export async function linkPresente(arquivo) {
  if (DEMO) return arquivo // no modo demonstração abre o arquivo local de public/presentes
  const nome = String(arquivo).split('/').pop()
  const { data, error } = await sb.storage.from('presentes').createSignedUrl(nome, 300)
  if (error) throw new Error(msg('Não foi possível abrir este material. Tente de novo ou fale com o suporte.'))
  return data.signedUrl
}

// ---- administração ----
export async function acessos() {
  if (DEMO) return local.get('clube.acessos', [])
  const { data, error } = await sb.from('acessos').select('id, telefone, email, nome, liberado_em, ativo, plano, origem, status').order('liberado_em', { ascending: false })
  if (error) throw new Error(msg('Não foi possível carregar os acessos.'))
  return data
}

// Liberação manual pelo painel (as compras aprovadas entram sozinhas, pelo n8n).
export async function liberarAcesso({ email = '', telefone = '', nome = '' }) {
  email = email.trim(); telefone = soNumeros(telefone)
  if (!email && !telefone) throw new Error(msg('Informe um telefone ou e-mail.'))
  if ((email && !EMAIL_OK.test(email)) || (telefone && telefone.length < 8)) throw new Error(msg('Informe seu telefone (com DDD) ou e-mail.'))
  if (DEMO) {
    const item = { id: String(Date.now()), email, telefone, nome: nome.trim(), liberado_em: new Date().toISOString(), ativo: true, plano: 'padrao', origem: 'manual', status: 'manual' }
    return local.set('clube.acessos', [item, ...local.get('clube.acessos', [])])
  }
  const { error } = await sb.rpc('admin_liberar', { p_email: email || null, p_telefone: telefone || null, p_nome: nome.trim() || null })
  if (error) throw new Error(msg('Não foi possível liberar o acesso.'))
}

// Bloqueia ou reativa sem apagar (a conta continua existindo).
// Dá ou tira o Premium de um acesso (vale também para a conta já criada com ele).
export async function planoAcesso(id, plano) {
  if (DEMO) return local.set('clube.acessos', local.get('clube.acessos', []).map((a) => (a.id === id ? { ...a, plano } : a)))
  const { error } = await sb.rpc('admin_plano_acesso', { p_id: id, p_plano: plano })
  if (error) throw new Error(msg('Não foi possível alterar o plano.'))
}

export async function ativarAcesso(id, ativo) {
  if (DEMO) return local.set('clube.acessos', local.get('clube.acessos', []).map((a) => (a.id === id ? { ...a, ativo } : a)))
  const { error } = await sb.rpc('admin_ativar', { p_id: id, p_ativo: ativo })
  if (error) throw new Error(msg('Não foi possível alterar o acesso.'))
}

export async function removerAcesso(id) {
  if (DEMO) return local.set('clube.acessos', local.get('clube.acessos', []).filter((a) => a.id !== id))
  const { error } = await sb.from('acessos').delete().eq('id', id)
  if (error) throw new Error(msg('Não foi possível remover o acesso.'))
}

export async function membros() {
  if (DEMO) {
    const u = local.get('clube.usuario', null)
    return u ? [{ id: u.id, nome: u.nome, telefone: u.telefone, plano: 'clube', admin: true, dias: local.get('clube.progresso', []).length }] : []
  }
  const [perfis, prog] = await Promise.all([
    sb.from('profiles').select('id, nome, telefone, email, criado_em, plano, admin').order('criado_em', { ascending: false }),
    sb.from('progress').select('user_id'),
  ])
  if (perfis.error || prog.error) throw new Error(msg('Não foi possível carregar os membros.'))
  const conta = {}
  for (const r of prog.data) conta[r.user_id] = (conta[r.user_id] || 0) + 1
  return perfis.data.map((p) => ({ ...p, dias: conta[p.id] || 0 }))
}

// Libera ou retira o Premium de uma cliente (só funciona para admins; o banco confere).
export async function definirPlano(id, plano) {
  if (DEMO) return
  const { error } = await sb.rpc('definir_plano', { p_id: id, p_plano: plano })
  if (error) throw new Error(msg('Não foi possível alterar o plano.'))
}

// Admin define uma senha nova para a cliente que esqueceu (o banco confere se quem pede é admin).
export async function redefinirSenha(id, senha) {
  if (!senha || senha.length < 6) throw new Error(msg('A senha precisa ter pelo menos 6 caracteres.'))
  if (DEMO) return
  const { error } = await sb.rpc('admin_redefinir_senha', { p_id: id, p_senha: senha })
  if (error) throw new Error(msg('Não foi possível redefinir a senha.'))
}
