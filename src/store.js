// Camada de dados. Com as variáveis do Supabase configuradas, usa o Supabase.
// Sem elas, roda em MODO DEMONSTRAÇÃO: os dados ficam só neste navegador.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const dominio = import.meta.env.VITE_AUTH_EMAIL_DOMAIN || 'membros.exemplo.com'

export const DEMO = !(url && key)
const sb = DEMO ? null : createClient(url, key)

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
const emailDe = (telefone) => `${soNumeros(telefone)}@${dominio}`
const usuarioDe = (u) => u && { id: u.id, nome: u.user_metadata?.nome || '', telefone: u.user_metadata?.telefone || '' }

// Preferências simples deste aparelho (ex.: itens marcados na lista de compras).
export const guardado = local

async function comAdmin(u) {
  if (!u) return null
  const { data } = await sb.from('profiles').select('admin').eq('id', u.id).maybeSingle()
  return { ...u, admin: !!data?.admin }
}
const demoUsuario = (u) => u && { ...u, admin: true } // no modo demonstração o painel fica visível

// ---- sessão ----
export async function sessao() {
  if (DEMO) return demoUsuario(local.get('clube.usuario', null))
  const { data } = await sb.auth.getSession()
  return comAdmin(usuarioDe(data.session?.user))
}

export async function entrar(telefone, senha) {
  if (soNumeros(telefone).length < 10) throw new Error('Informe o telefone com DDD.')
  if (DEMO) {
    const u = local.get('clube.usuario', null) || { id: 'demo', nome: '', telefone: soNumeros(telefone) }
    local.set('clube.usuario', u)
    return demoUsuario(u)
  }
  const { data, error } = await sb.auth.signInWithPassword({ email: emailDe(telefone), password: senha })
  if (error) throw new Error('Telefone ou senha incorretos.')
  return comAdmin(usuarioDe(data.user))
}

export async function criarConta(nome, telefone, senha) {
  if (!nome.trim()) throw new Error('Informe seu nome.')
  if (soNumeros(telefone).length < 10) throw new Error('Informe o telefone com DDD.')
  if (DEMO) {
    const u = { id: 'demo', nome: nome.trim(), telefone: soNumeros(telefone) }
    local.set('clube.usuario', u)
    return demoUsuario(u)
  }
  if (senha.length < 6) throw new Error('A senha precisa ter pelo menos 6 caracteres.')
  const { data, error } = await sb.auth.signUp({
    email: emailDe(telefone),
    password: senha,
    options: { data: { nome: nome.trim(), telefone: soNumeros(telefone) } },
  })
  // O banco só aceita telefones que estão na lista de acessos liberados (veja supabase/schema.sql).
  if (error) throw new Error(error.message.includes('registered') ? 'Este telefone já tem conta. Use "Entrar".' : 'Este telefone ainda não tem acesso liberado.')
  if (!data.session) throw new Error('Conta criada, mas a confirmação por e-mail está ligada no Supabase. Desligue-a (veja o README).')
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
  if (error) throw new Error('Não foi possível salvar.')
  await sb.from('profiles').update({ nome: novo.nome }).eq('id', usuario.id)
  return novo
}

// ---- progresso da jornada ----
export async function progresso(usuario) {
  if (DEMO) return local.get('clube.progresso', [])
  const { data, error } = await sb.from('progress').select('dia').eq('user_id', usuario.id)
  if (error) throw new Error('Não foi possível carregar seu progresso.')
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
  if (error) throw new Error('Não foi possível salvar o dia.')
}

// ---- evolução (registros de peso) ----
export async function registros(usuario) {
  if (DEMO) return local.get('clube.registros', [])
  const { data, error } = await sb.from('checkins').select('id, peso, nota, criado_em').eq('user_id', usuario.id).order('criado_em')
  if (error) throw new Error('Não foi possível carregar seus registros.')
  return data
}

export async function novoRegistro(usuario, peso, nota) {
  const item = { peso: Number(peso), nota: nota.trim(), criado_em: new Date().toISOString() }
  if (!(item.peso > 0)) throw new Error('Informe um peso válido.')
  if (DEMO) {
    local.set('clube.registros', [...local.get('clube.registros', []), { id: String(Date.now()), ...item }])
    return
  }
  const { error } = await sb.from('checkins').insert({ user_id: usuario.id, ...item })
  if (error) throw new Error('Não foi possível salvar o registro.')
}

export async function apagarRegistro(usuario, id) {
  if (DEMO) return local.set('clube.registros', local.get('clube.registros', []).filter((r) => r.id !== id))
  const { error } = await sb.from('checkins').delete().eq('id', id).eq('user_id', usuario.id)
  if (error) throw new Error('Não foi possível apagar.')
}

// ---- administração ----
export async function acessos() {
  if (DEMO) return local.get('clube.acessos', [])
  const { data, error } = await sb.from('acessos').select('telefone, nome, liberado_em').order('liberado_em', { ascending: false })
  if (error) throw new Error('Não foi possível carregar os acessos.')
  return data
}

export async function liberarAcesso(telefone, nome) {
  const item = { telefone: soNumeros(telefone), nome: nome.trim(), liberado_em: new Date().toISOString() }
  if (item.telefone.length < 10) throw new Error('Informe o telefone com DDD.')
  if (DEMO) return local.set('clube.acessos', [item, ...local.get('clube.acessos', []).filter((a) => a.telefone !== item.telefone)])
  const { error } = await sb.from('acessos').upsert(item)
  if (error) throw new Error('Não foi possível liberar o acesso.')
}

export async function removerAcesso(telefone) {
  if (DEMO) return local.set('clube.acessos', local.get('clube.acessos', []).filter((a) => a.telefone !== telefone))
  const { error } = await sb.from('acessos').delete().eq('telefone', telefone)
  if (error) throw new Error('Não foi possível remover o acesso.')
}

export async function membros() {
  if (DEMO) {
    const u = local.get('clube.usuario', null)
    return u ? [{ id: u.id, nome: u.nome, telefone: u.telefone, dias: local.get('clube.progresso', []).length }] : []
  }
  const [perfis, prog] = await Promise.all([
    sb.from('profiles').select('id, nome, telefone, criado_em').order('criado_em', { ascending: false }),
    sb.from('progress').select('user_id'),
  ])
  if (perfis.error || prog.error) throw new Error('Não foi possível carregar os membros.')
  const conta = {}
  for (const r of prog.data) conta[r.user_id] = (conta[r.user_id] || 0) + 1
  return perfis.data.map((p) => ({ ...p, dias: conta[p.id] || 0 }))
}
