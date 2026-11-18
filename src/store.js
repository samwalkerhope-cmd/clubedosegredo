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
const usuarioDe = (u) => u && { id: u.id, nome: u.user_metadata?.nome || '', telefone: u.user_metadata?.telefone || '', email: u.user_metadata?.email || '' }

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
  const { data } = await sb.from('profiles').select('admin, plano').eq('id', u.id).maybeSingle()
  // plano: 'clube' (Premium) ou 'padrao'. Quem define é o admin, no painel.
  return { ...u, admin: !!data?.admin, plano: data?.plano || 'padrao' }
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
