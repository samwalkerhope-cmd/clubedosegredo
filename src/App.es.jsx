import { useEffect, useRef, useState } from 'react'
import { HashRouter, Routes, Route, Navigate, NavLink, Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Send, Crown, Map, Gift, LineChart, User, Check, ChevronLeft, ChevronRight, ChevronDown, MessageCircle, LogOut, FileText, Trash2, ShoppingBasket, ShieldCheck, ChefHat, Clock, Sparkles, Flame, LifeBuoy, Settings, ExternalLink, Salad, X, Volume2, Lock, KeyRound, Stethoscope } from 'lucide-react'
import { APP, OFERTAS, DIAS, SEMANAS, SEGREDOS, PRESENTES, LISTA_COMPRAS, RECEITAS, CATEGORIAS, RITUAIS, PROTOCOLOS, RECEITA_DO_DIA } from './content.es'
import * as store from './store'
import Evolucao from './Evolucao'

const iniciais = APP.nome.split(/\s+/).filter((p) => p.length > 2).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || 'C'

function Marca({ tamanho = 'h-14 w-14 text-xl' }) {
  return (
    <div className={`${tamanho} grid place-items-center rounded-full border-2 border-ouro-500 bg-azul-900 font-serif font-bold text-ouro-300`}>
      {iniciais}
    </div>
  )
}

function Erro({ children }) {
  return children ? <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{children}</p> : null
}

// ------------------------------------------------------------------ Entrada
function Entrada({ aoEntrar }) {
  const [criando, setCriando] = useState(false)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [esqueci, setEsqueci] = useState(false)
  const [linkEnviado, setLinkEnviado] = useState(false)

  async function pedirLink(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try { await store.pedirReset(APP.resetUrl, telefone); setLinkEnviado(true) } catch (err) { setErro(err.message) } finally { setEnviando(false) }
  }

  async function enviar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      aoEntrar(criando ? await store.criarConta(nome, telefone, senha) : await store.entrar(telefone, senha))
    } catch (err) {
      setErro(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-azul-900 to-azul-950 px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col items-center text-center">
          <Marca tamanho="h-20 w-20 text-3xl" />
          <h1 className="mt-4 font-serif text-3xl font-bold tracking-wide text-white">{APP.nome}</h1>
          <p className="mt-1 text-sm text-ouro-300">{APP.frase}</p>
        </div>

        {esqueci ? (
          <form onSubmit={pedirLink} className="card mt-8 space-y-4 p-6">
            <div>
              <h2 className="titulo text-2xl">Recupera tu contraseña</h2>
              <p className="mt-1 text-sm text-azul-700">Escribe el teléfono o el correo de tu compra. Te enviaremos un enlace para crear una contraseña nueva.</p>
            </div>
            {linkEnviado ? (
              <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">Listo. Si encontramos tu cuenta, te enviamos un correo con el enlace (vale por 1 hora). Revisa también la carpeta de spam.</p>
            ) : (
              <>
                <input className="campo" type="text" inputMode="email" placeholder="Teléfono o correo de la compra" value={telefone} onChange={(e) => setTelefone(e.target.value)} autoComplete="username" autoCapitalize="off" spellCheck="false" />
                <Erro>{erro}</Erro>
                <button className="btn-azul w-full" disabled={enviando}>{enviando ? 'Espera…' : 'Enviar enlace'}</button>
              </>
            )}
            <button type="button" className="block w-full text-center text-sm font-semibold text-ouro-700 underline" onClick={() => { setEsqueci(false); setErro('') }}>Volver a entrar</button>
          </form>
        ) : (
        <form onSubmit={enviar} className="card mt-8 space-y-4 p-6">
          <div>
            <h2 className="titulo text-2xl">{criando ? 'Crea tu cuenta' : 'Bienvenida de nuevo'}</h2>
            {store.DEMO && <p className="mt-1 text-xs text-azul-700">Modo demostración: cualquier teléfono entra, y los datos quedan solo en este navegador.</p>}
          </div>
          {criando && (
            <input className="campo" placeholder="Tu nombre" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />
          )}
          <input className="campo" type="text" inputMode="email" placeholder="Teléfono o correo de la compra" value={telefone} onChange={(e) => setTelefone(e.target.value)} autoComplete="username" autoCapitalize="off" spellCheck="false" />
          {criando && <p className="-mt-2 text-xs text-azul-700">Usa el mismo correo o teléfono que usaste en la compra.</p>}
          <input className="campo" type="password" placeholder="Tu contraseña" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete={criando ? 'new-password' : 'current-password'} />
          <Erro>{erro}</Erro>
          <button className="btn-azul w-full" disabled={enviando}>{enviando ? 'Espera…' : criando ? 'Crear cuenta' : 'Entrar'}</button>
          <p className="text-center text-sm text-azul-700">
            {criando ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
            <button type="button" className="font-semibold text-ouro-700 underline" onClick={() => { setCriando(!criando); setErro('') }}>
              {criando ? 'Entrar' : 'Crear ahora'}
            </button>
          </p>
          {!criando && (APP.resetUrl ? (
            <button type="button" className="block w-full text-center text-sm font-medium text-azul-700 underline" onClick={() => { setEsqueci(true); setErro(''); setLinkEnviado(false) }}>
              Olvidé mi contraseña
            </button>
          ) : APP.whatsapp && (
            <a className="block text-center text-sm font-medium text-azul-700 underline" target="_blank" rel="noreferrer"
              href={`https://wa.me/${APP.whatsapp}?text=${encodeURIComponent('¡Hola! Olvidé mi contraseña del Club. Mi teléfono o correo: ' + (telefone || ''))}`}>
              Olvidé mi contraseña
            </a>
          ))}
        </form>
        )}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Nova senha (link do e-mail)
function tokenDoLink() {
  const m = (typeof window !== 'undefined' ? window.location.hash : '').match(/^#\/restablecer\?t=([a-f0-9]{20,})/)
  return m ? m[1] : null
}

function conviteDoLink() {
  const m = (typeof window !== 'undefined' ? window.location.hash : '').match(/^#\/acceso\?t=([a-f0-9]{20,})/)
  return m ? m[1] : null
}

// Link pessoal do e-mail de acesso (/#/acceso?t=...): a cliente só cria a senha e já entra.
function NovaConta({ token, aoEntrar, aoSair }) {
  const [convite, setConvite] = useState(undefined) // undefined = conferindo · { ok: false } = link usado ou vencido
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [confirma, setConfirma] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => { store.verConvite(token).then(setConvite).catch(() => setConvite({ ok: false })) }, [token])

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try { aoEntrar(await store.entrarComConvite(token, convite, nome, senha, confirma)) } catch (err) { setErro(err.message); setEnviando(false) }
  }

  const primeiroNome = (convite?.nome || '').trim().split(/\s+/)[0]
  return (
    <div className="min-h-full bg-gradient-to-b from-azul-900 to-azul-950 px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col items-center text-center">
          <Marca tamanho="h-20 w-20 text-3xl" />
          <h1 className="mt-4 font-serif text-3xl font-bold tracking-wide text-white">{APP.nome}</h1>
        </div>
        {convite === undefined ? (
          <p className="mt-10 text-center text-sm text-white/80">Preparando tu acceso…</p>
        ) : !convite.ok ? (
          <div className="card mt-8 space-y-4 p-6">
            <h2 className="titulo text-2xl">Este enlace ya fue usado</h2>
            <p className="text-sm leading-relaxed text-azul-800">Si ya creaste tu contraseña, entra con tu correo (o teléfono) y tu contraseña. Si la olvidaste, toca «Olvidé mi contraseña» en la pantalla de entrada.</p>
            <button type="button" className="btn-azul w-full" onClick={aoSair}>Entrar</button>
          </div>
        ) : (
          <form onSubmit={salvar} className="card mt-8 space-y-4 p-6">
            <div>
              <h2 className="titulo text-2xl">{primeiroNome ? `¡Hola, ${primeiroNome}!` : '¡Bienvenida!'}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-azul-800">
                {convite.tem_conta ? 'Crea una contraseña nueva para entrar.' : 'Tu acceso está listo. Solo crea tu contraseña para entrar.'}
                {convite.email ? <> Tu correo de acceso es <b>{convite.email}</b>.</> : null}
              </p>
            </div>
            {!convite.nome && <input className="campo" placeholder="Tu nombre" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />}
            <input className="campo" type="password" placeholder="Crea tu contraseña (mínimo 6 caracteres)" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="new-password" />
            <input className="campo" type="password" placeholder="Repite la contraseña" value={confirma} onChange={(e) => setConfirma(e.target.value)} autoComplete="new-password" />
            <Erro>{erro}</Erro>
            <button className="btn-azul w-full" disabled={enviando}>{enviando ? 'Espera…' : 'Crear contraseña y entrar'}</button>
            <button type="button" className="block w-full text-center text-sm font-semibold text-ouro-700 underline" onClick={aoSair}>Ya tengo contraseña</button>
          </form>
        )}
      </div>
    </div>
  )
}

function NovaSenha({ token, aoTerminar }) {
  const [senha, setSenha] = useState('')
  const [confirma, setConfirma] = useState('')
  const [erro, setErro] = useState('')
  const [feito, setFeito] = useState(false)
  const [enviando, setEnviando] = useState(false)

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try { await store.redefinirComToken(token, senha, confirma); setFeito(true) } catch (err) { setErro(err.message) } finally { setEnviando(false) }
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-azul-900 to-azul-950 px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col items-center text-center">
          <Marca tamanho="h-20 w-20 text-3xl" />
          <h1 className="mt-4 font-serif text-3xl font-bold tracking-wide text-white">{APP.nome}</h1>
        </div>
        <form onSubmit={salvar} className="card mt-8 space-y-4 p-6">
          <h2 className="titulo text-2xl">Crea tu nueva contraseña</h2>
          {feito ? (
            <>
              <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">¡Contraseña actualizada! Ya puedes entrar con tu correo (o teléfono) y la nueva contraseña.</p>
              <button type="button" className="btn-azul w-full" onClick={aoTerminar}>Entrar</button>
            </>
          ) : (
            <>
              <input className="campo" type="password" placeholder="Nueva contraseña (mínimo 6 caracteres)" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="new-password" />
              <input className="campo" type="password" placeholder="Repite la nueva contraseña" value={confirma} onChange={(e) => setConfirma(e.target.value)} autoComplete="new-password" />
              <Erro>{erro}</Erro>
              <button className="btn-azul w-full" disabled={enviando}>{enviando ? 'Espera…' : 'Guardar contraseña'}</button>
              {erro && <button type="button" className="block w-full text-center text-sm font-semibold text-ouro-700 underline" onClick={aoTerminar}>Pedir un enlace nuevo</button>}
            </>
          )}
        </form>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Rolagem
// Cada tela nova abre do topo (sem herdar a rolagem da tela anterior).
// No app, só o conteúdo do meio (#conteudo) rola; o topo e a barra de baixo ficam fixos.
function RolarParaTopo() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.getElementById('conteudo')?.scrollTo(0, 0)
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// ------------------------------------------------------------------ Moldura
const abas = [
  { para: '/', rotulo: 'Inicio', Icone: Crown, fim: true },
  { para: '/jornada', rotulo: 'Camino', Icone: Map },
  { para: '/evolucao', rotulo: 'Evolución', Icone: LineChart },
  { para: '/presentes', rotulo: 'Regalos', Icone: Gift },
  { para: '/perfil', rotulo: 'Perfil', Icone: User },
]

function Moldura({ plano }) {
  const { pathname } = useLocation()
  const naCapa = pathname === '/'
  const premium = plano !== 'padrao'
  const telaChat = pathname === '/asistente' && premium
  return (
    <div className="mx-auto flex h-full max-w-md flex-col overflow-hidden">
      {!naCapa && (
        <header className="z-20 flex shrink-0 items-center justify-between gap-2 bg-azul-900 px-3.5 py-3.5 shadow-sm">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            <Marca tamanho="h-9 w-9 shrink-0 text-sm" />
            <span className="truncate font-serif text-[16px] font-bold tracking-normal text-white sm:text-lg">{APP.nome}</span>
          </Link>
          {premium ? (
            <Link
              to="/asistente"
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-ouro-500/50 bg-azul-800 px-2.5 py-1.5 text-[11.5px] font-semibold text-ouro-300"
            >
              <Stethoscope size={14} className="shrink-0" /> Habla con la Dra.
            </Link>
          ) : (
            <Link
              to="/clube"
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-ouro-300 to-ouro-500 px-2.5 py-1.5 text-[11.5px] font-bold text-azul-950 shadow-sm"
            >
              <Crown size={14} className="shrink-0" /> Premium <ChevronRight size={13} />
            </Link>
          )}
        </header>
      )}
      <main id="conteudo" className={telaChat ? 'flex min-h-0 flex-1 flex-col px-5 pb-3 pt-3' : 'min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-6'}>
        <Outlet />
      </main>
      <nav className="z-20 shrink-0 border-t border-azul-100 bg-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="mx-auto flex max-w-md">
          {abas.map(({ para, rotulo, Icone, fim }) => (
            <NavLink key={para} to={para} end={fim}
              className={({ isActive }) => `flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium ${isActive ? 'text-azul-900' : 'text-azul-700/60'}`}>
              {({ isActive }) => (<><Icone size={22} className={isActive ? 'text-ouro-600' : ''} />{rotulo}</>)}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

// ------------------------------------------------------------------ Bloco Segredos da Insulina
function BlocoSegredos({ abertoInicial = false }) {
  const [painelAberto, setPainelAberto] = useState(abertoInicial)
  const [segredoAtivo, setSegredoAtivo] = useState(null)

  return (
    <section className="overflow-hidden rounded-2xl border-2 border-ouro-500 bg-white shadow-card">
      <button
        type="button"
        onClick={() => setPainelAberto(!painelAberto)}
        className="flex w-full items-center gap-3 bg-gradient-to-r from-azul-900 to-azul-800 px-5 py-4 text-left text-white"
      >
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ouro-500/50 bg-azul-950 text-ouro-300">
          <Sparkles size={20} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ouro-300">Base del programa</p>
          <p className="font-semibold text-white">Mi Secreto de la Insulina</p>
        </div>
        <ChevronDown size={20} className={`text-ouro-300 transition-transform ${painelAberto ? 'rotate-180' : ''}`} />
      </button>

      {painelAberto && (
        <div className="space-y-3 p-4">
          <p className="text-xs text-azul-700">
            Elige 1 de los 3 Secretos de abajo para tomar por la mañana y por la tarde. Toca para ver la preparación:
          </p>
          {SEGREDOS.map((s) => {
            const ativo = segredoAtivo === s.id
            return (
              <div key={s.id} className="overflow-hidden rounded-xl border border-azul-100 bg-creme-50">
                <button
                  type="button"
                  onClick={() => setSegredoAtivo(ativo ? null : s.id)}
                  className="flex w-full items-center gap-3 bg-azul-900 px-4 py-3 text-left text-white"
                >
                  <span className="text-2xl">{s.icone}</span>
                  <div className="flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-ouro-300">{s.rotulo}</span>
                    <span className="block font-semibold">{s.titulo}</span>
                    <span className="block text-xs italic text-ouro-200">{s.subtitulo}</span>
                  </div>
                  <ChevronDown size={18} className={`text-ouro-300 transition-transform ${ativo ? 'rotate-180' : ''}`} />
                </button>
                {ativo && (
                  <div className="space-y-3 p-4 text-sm">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-ouro-700">Elige el líquido (300 ml)</p>
                      <ul className="mt-1.5 space-y-1 text-xs text-azul-800">
                        {s.liquidos.map((liq) => (
                          <li key={liq} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-ouro-500" />
                            {liq}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-ouro-700">Agrega</p>
                      <ul className="mt-1.5 space-y-1 text-xs font-medium text-azul-900">
                        {s.ingredientes.map((ing) => (
                          <li key={ing}>✓ {ing}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-ouro-700">Cómo hacerlo</p>
                      <p className="mt-1 text-xs leading-relaxed text-azul-800">{s.preparo}</p>
                    </div>
                    <div className="rounded-xl bg-ouro-100/70 p-3 text-xs leading-relaxed text-azul-900">
                      💡 {s.dica}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

// ------------------------------------------------------------------ Oferta Ensalada en Frasco (Banner + Modal)
const CHAVE_OFERTA_SALADA = 'ofertaSaladaV1'
const ESTADO_INICIAL_SALADA = { acessos: 0, shows: 0, last: 0, fechada: false }

function OfertaSalada() {
  const [aberta, setAberta] = useState(false)
  const [aviso, setAviso] = useState('')
  const s = OFERTAS.salada

  useEffect(() => {
    const atual = store.guardado.get(CHAVE_OFERTA_SALADA, ESTADO_INICIAL_SALADA)
    const acessos = (atual.acessos || 0) + 1
    let novo = { ...atual, acessos }
    const doisDias = 2 * 24 * 60 * 60 * 1000
    if (!atual.fechada && (atual.shows || 0) < 3 && Date.now() - (atual.last || 0) >= doisDias && acessos >= 3) {
      setAberta(true)
      novo = { ...novo, shows: (atual.shows || 0) + 1, last: Date.now() }
    }
    store.guardado.set(CHAVE_OFERTA_SALADA, novo)
  }, [])

  function comprar() {
    // Sem link de checkout configurado: avisa e não marca a oferta como encerrada.
    if (!s.checkoutUrl) return setAviso('El enlace de compra todavía no está disponible. Inténtalo de nuevo más tarde.')
    const atual = store.guardado.get(CHAVE_OFERTA_SALADA, ESTADO_INICIAL_SALADA)
    store.guardado.set(CHAVE_OFERTA_SALADA, { ...atual, fechada: true })
    window.open(s.checkoutUrl, '_blank', 'noopener,noreferrer')
    setAberta(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAberta(true)}
        className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-br from-ouro-300 to-ouro-500 p-4 text-left text-azul-950 shadow-card transition active:scale-[0.99]"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-azul-950/10">
          <Salad size={24} className="text-azul-950" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black">{s.cardTitulo}</p>
          <p className="text-xs font-semibold text-azul-950/75">{s.cardSubtitulo} · {s.preco}</p>
        </div>
        <ChevronRight size={20} className="shrink-0" />
      </button>

      {aberta && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-azul-950/50 backdrop-blur-sm" onClick={() => setAberta(false)} />
          <div className="relative flex max-h-[90vh] w-full max-w-md flex-col rounded-t-3xl bg-creme px-5 pb-8 pt-4 shadow-2xl">
            <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-azul-900/15" />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setAberta(false)}
                aria-label="Cerrar"
                className="grid h-10 w-10 place-items-center rounded-full bg-azul-900 text-white shadow-sm active:scale-95"
              >
                <X size={20} strokeWidth={2.4} />
              </button>
            </div>
            <div className="overflow-y-auto pt-1">
              <div className="text-center">
                <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-ouro-300 to-ouro-500 shadow-card">
                  <Salad size={32} className="text-azul-950" />
                </span>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ouro-600">{s.badge}</p>
                <h2 className="mt-1 font-serif text-2xl font-black text-azul-900">{s.titulo}</h2>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-azul-800">{s.descricao}</p>
              </div>

              <div className="mt-4 space-y-2">
                {s.itens.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-sm">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-700">
                      <Check size={15} strokeWidth={3} />
                    </span>
                    <p className="text-sm font-semibold text-azul-900">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-azul-900/5 p-4 text-center">
                <p className="text-xs font-semibold text-azul-700">{s.pagamentoRotulo}</p>
                <p className="mt-0.5 font-serif text-3xl font-black text-azul-900">{s.preco}</p>
              </div>

              <button
                type="button"
                onClick={comprar}
                className="btn-ouro mt-4 w-full py-4 text-base font-bold"
              >
                {s.botao}
              </button>
              {aviso && <p role="alert" className="mt-2 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">{aviso}</p>}
              <button
                type="button"
                onClick={() => setAberta(false)}
                className="mt-2 w-full py-2 text-sm font-bold text-azul-700/70"
              >
                {s.fechar}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ------------------------------------------------------------------ Cartão do Premium (no lugar da Ensalada, por enquanto)
function CartaoPremium({ plano }) {
  const premium = plano !== 'padrao'
  return (
    <Link
      to={premium ? '/asistente' : '/clube'}
      className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-br from-ouro-300 to-ouro-500 p-4 text-left text-azul-950 shadow-card transition active:scale-[0.99]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-azul-950/10">
        {premium ? <Stethoscope size={24} className="text-azul-950" /> : <Crown size={24} className="text-azul-950" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black">{premium ? 'Habla con la Dra.' : 'Club Secreto Premium'}</p>
        <p className="text-xs font-semibold text-azul-950/75">
          {premium ? 'Pregunta sobre recetas, rutina e imprevistos' : `Habla con la Dra., protocolos y tu evolución · ${OFERTAS.clube.preco}`}
        </p>
      </div>
      <ChevronRight size={20} className="shrink-0" />
    </Link>
  )
}

// ------------------------------------------------------------------ Assistente (IA) — exclusivo do Premium
// Mostra a resposta da IA com formatação simples: **negrito**, *itálico*, listas (- ou 1.) e parágrafos.
// Monta elementos React (nunca HTML cru), então nada do texto vira código na página.
function trechos(s, chave) {
  const partes = []
  const re = /(\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\s][^*\n]*\*)/g
  let ultimo = 0, m, i = 0
  while ((m = re.exec(s))) {
    if (m.index > ultimo) partes.push(s.slice(ultimo, m.index))
    const t = m[0]
    partes.push(t.startsWith('**') || t.startsWith('__')
      ? <strong key={chave + '-' + i++} className="font-semibold">{t.slice(2, -2)}</strong>
      : <em key={chave + '-' + i++}>{t.slice(1, -1)}</em>)
    ultimo = m.index + t.length
  }
  if (ultimo < s.length) partes.push(s.slice(ultimo))
  return partes
}

function TextoFormatado({ texto }) {
  const blocos = []
  let lista = null
  for (const bruta of String(texto || '').replace(/\r/g, '').split('\n')) {
    const linha = bruta.trim()
    const marcador = linha.match(/^[-*•]\s+(.*)$/)
    const numero = linha.match(/^(\d+)[.)]\s+(.*)$/)
    if (marcador || numero) {
      const tipo = numero ? 'ol' : 'ul'
      if (!lista || lista.tipo !== tipo) { lista = { tipo, inicio: numero ? Number(numero[1]) : 1, itens: [] }; blocos.push(lista) }
      lista.itens.push(numero ? numero[2] : marcador[1])
      continue
    }
    lista = null
    if (!linha) continue
    const titulo = linha.match(/^#{1,6}\s+(.*)$/)
    blocos.push({ tipo: titulo ? 'titulo' : 'p', texto: titulo ? titulo[1] : linha })
  }
  return (
    <div className="space-y-2">
      {blocos.map((b, i) => {
        if (b.tipo === 'ul') return <ul key={i} className="list-disc space-y-1 pl-5 marker:text-ouro-600">{b.itens.map((it, j) => <li key={j}>{trechos(it, i + '-' + j)}</li>)}</ul>
        if (b.tipo === 'ol') return <ol key={i} start={b.inicio} className="list-decimal space-y-1 pl-5 marker:font-semibold marker:text-ouro-700">{b.itens.map((it, j) => <li key={j}>{trechos(it, i + '-' + j)}</li>)}</ol>
        if (b.tipo === 'titulo') return <p key={i} className="font-semibold">{trechos(b.texto, i)}</p>
        return <p key={i}>{trechos(b.texto, i)}</p>
      })}
    </div>
  )
}

const SUGESTOES_CHAT = [
  '¿Cómo preparo el Secreto de hoy?',
  'Tengo una fiesta este fin de semana, ¿qué hago?',
  '¿Qué puedo cenar hoy siguiendo el plan?',
]

function Assistente({ usuario }) {
  const navegar = useNavigate()
  const [mensagens, setMensagens] = useState([])
  const [texto, setTexto] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [restantes, setRestantes] = useState(null)
  const listaRef = useRef(null)

  useEffect(() => {
    store.historicoChat().then(setMensagens).catch((e) => setErro(e.message)).finally(() => setCarregando(false))
  }, [])
  useEffect(() => {
    const el = listaRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [mensagens, enviando, carregando])

  async function enviar(valor) {
    const t = String(valor ?? texto).trim()
    if (!t || enviando) return
    setErro('')
    setTexto('')
    setMensagens((m) => [...m, { id: 'eu-' + Date.now(), papel: 'user', texto: t }])
    setEnviando(true)
    try {
      const r = await store.enviarChat(t)
      setMensagens((m) => [...m, { id: 'ia-' + Date.now(), papel: 'model', texto: r.resposta }])
      if (r.restantes != null) setRestantes(r.restantes)
    } catch (e) {
      setErro(e.message)
    } finally {
      setEnviando(false)
    }
  }

  const primeiroNome = (usuario?.nome || '').trim().split(/\s+/)[0]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <button className="flex shrink-0 items-center gap-1 self-start text-sm font-medium text-azul-700" onClick={() => navegar(-1)}>
        <ChevronLeft size={18} /> Volver
      </button>

      <div className="mt-2 flex shrink-0 items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ouro-500 bg-azul-900 text-ouro-300">
          <Stethoscope size={22} />
        </span>
        <div>
          <h1 className="font-serif text-xl font-bold text-azul-900">Habla con la Dra.</h1>
          <p className="text-xs text-azul-700">Dra. del Secreto · Tu guía diaria</p>
        </div>
      </div>

      <p className="mt-2 shrink-0 rounded-xl bg-ouro-100/70 px-3 py-2 text-[12px] leading-snug text-azul-800">
        Te ayudo con el programa, las recetas y la rutina. Para dudas de salud, medicamentos o síntomas.
      </p>

      <div ref={listaRef} className="-mx-1 mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-1 pb-2">
        {carregando ? (
          <p className="py-8 text-center text-sm text-azul-700">Cargando…</p>
        ) : mensagens.length === 0 ? (
          <div className="space-y-3 py-2">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-azul-900 shadow-sm">
              ¡Hola{primeiroNome ? ', ' + primeiroNome : ''}! 💛 Soy la Dra. del Secreto. Pregúntame sobre tu rutina de 21 días, las recetas o qué hacer en un imprevisto.
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGESTOES_CHAT.map((s) => (
                <button key={s} type="button" onClick={() => enviar(s)} className="rounded-full border border-ouro-500/60 bg-white px-3 py-1.5 text-xs font-medium text-azul-900 active:scale-95">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          mensagens.map((m) => (
            <div key={m.id} className={`flex ${m.papel === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${m.papel === 'user' ? 'whitespace-pre-wrap rounded-tr-sm bg-azul-900 text-white' : 'rounded-tl-sm bg-white text-azul-900'}`}>
                {m.papel === 'user' ? m.texto : <TextoFormatado texto={m.texto} />}
              </div>
            </div>
          ))
        )}
        {enviando && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-azul-700 shadow-sm">Escribiendo…</div>
          </div>
        )}
      </div>

      {erro && <div className="mt-2 shrink-0"><Erro>{erro}</Erro></div>}
      <form onSubmit={(e) => { e.preventDefault(); enviar() }} className="mt-2 flex shrink-0 items-end gap-2 rounded-2xl border border-azul-200 bg-white p-2 shadow-card">
        <textarea
          rows={1}
          maxLength={1500}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }}
          placeholder="Escribe tu pregunta…"
          className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-base text-azul-900 outline-none"
        />
        <button type="submit" disabled={enviando || !texto.trim()} aria-label="Enviar" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300 disabled:opacity-40">
          <Send size={18} />
        </button>
      </form>
      {restantes != null && <p className="mt-1 shrink-0 text-center text-[11px] text-azul-700">Te quedan {restantes} mensajes hoy.</p>}
    </div>
  )
}

// ------------------------------------------------------------------ Oferta Club (/clube — VSL + compra em 1 clique)
// A cobrança é feita no cartão que a cliente já usou na compra do plano, pela função "um-clique" (servidor).
// Fases: carregando · simples (página como sempre, sem cobrar) · confirmar (falta provar o e-mail) · codigo ·
//        elegivel (mostra o cartão e a autorização) · processando · confirmando (acompanha a cada 30 s) · sucesso · oculta
const ERROS_CODIGO = {
  incorreto: 'El código no coincide. Revísalo e inténtalo de nuevo.',
  expirado: 'Este código expiró. Pide uno nuevo.',
  bloqueado: 'Demasiados intentos. Pide un código nuevo.',
  limite_codigo: 'Ya enviamos varios códigos. Espera unos minutos e inténtalo de nuevo.',
  envio: 'No pudimos enviar el código ahora. Inténtalo en unos minutos.',
}
const NO_AHORA = 'No pudimos procesar ahora, intenta en unos minutos.'

function ClubeOferta({ plano, aoComprar }) {
  const navegar = useNavigate()
  const c = OFERTAS.clube
  const [aviso, setAviso] = useState('')
  const [fase, setFase] = useState(plano === 'clube' ? 'sucesso' : 'carregando')
  const [cartao, setCartao] = useState(null) // só fica na tela; nada é guardado
  const [emailCodigo, setEmailCodigo] = useState('')
  const [codigo, setCodigo] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const chaveUnica = useRef(null) // uma por compra: a mesma em toda nova tentativa
  if (!chaveUnica.current) chaveUnica.current = crypto.randomUUID()
  const vivo = useRef(true)
  const iconesBeneficios = [LifeBuoy, Stethoscope, LineChart]

  // Lê a resposta de "consultar" e decide a fase. Nunca cobra.
  function aplicarConsulta(r, { silencioso = false } = {}) {
    if (!vivo.current) return
    if (r.ok === true && r.elegivel === true && r.cartao) {
      setCartao(r.cartao); setFase('elegivel')
    } else if (r.ok === true && r.motivo === 'ja_comprou') {
      setFase('sucesso'); aoComprar?.()
    } else if (r.ok === true && r.motivo === 'em_verificacao') {
      setFase('confirmando')
    } else if (r.ok === true && r.motivo === 'confirmar_email') {
      setEmailCodigo(r.email || ''); setFase((f) => (f === 'codigo' ? f : 'confirmar'))
    } else if (!silencioso) {
      setFase('simples') // qualquer outro motivo, 401 ou 503: a página fica como está, sem cobrar
    }
  }

  useEffect(() => {
    vivo.current = true
    if (plano !== 'clube') store.umClique('consultar').then(aplicarConsulta)
    return () => { vivo.current = false }
  }, [])

  // Enquanto a compra está sendo confirmada, acompanha com "consultar" a cada 30 s (nunca com "comprar").
  useEffect(() => {
    if (fase !== 'confirmando') return
    const t = setInterval(() => store.umClique('consultar').then((r) => aplicarConsulta(r, { silencioso: true })), 30000)
    return () => clearInterval(t)
  }, [fase])

  async function pedirCodigo() {
    setAviso(''); setOcupado(true)
    const r = await store.umClique('pedir_codigo')
    if (!vivo.current) return
    setOcupado(false)
    if (r.ok === true && r.confirmado) return store.umClique('consultar').then(aplicarConsulta)
    if (r.ok === true && r.enviado) { setEmailCodigo(r.email || emailCodigo); setCodigo(''); return setFase('codigo') }
    setAviso(ERROS_CODIGO[r.erro] || ERROS_CODIGO.envio)
  }

  async function confirmarCodigo(e) {
    e?.preventDefault()
    if (codigo.length !== 6) return
    setAviso(''); setOcupado(true)
    const r = await store.umClique('confirmar_codigo', { codigo })
    if (!vivo.current) return
    if (r.ok === true && r.confirmado) {
      const consulta = await store.umClique('consultar')
      setOcupado(false)
      return aplicarConsulta(consulta)
    }
    setOcupado(false)
    setAviso(ERROS_CODIGO[r.erro] || ERROS_CODIGO.incorreto)
  }

  async function comprar() {
    if (fase === 'confirmar') return pedirCodigo()
    if (fase !== 'elegivel') return setAviso('El enlace de compra todavía no está disponible. Inténtalo de nuevo más tarde.')
    setAviso(''); setFase('processando')
    const r = await store.umClique('comprar', { chave_unica: chaveUnica.current })
    if (!vivo.current) return
    if (r.ok === true && r.status === 'aprovado') { setFase('sucesso'); return aoComprar?.() }
    if (r.status === 'recusado') { setFase('elegivel'); return setAviso('Tu tarjeta fue rechazada. Intenta más tarde o escríbenos a soporte.') }
    if (r.status === 'indefinido' || r.status === 'em_andamento' || r.motivo === 'em_verificacao') return setFase('confirmando')
    if (r.status === 'nao_elegivel') {
      if (r.motivo === 'ja_comprou') { setFase('sucesso'); return aoComprar?.() }
      if (r.motivo === 'confirmar_email') return setFase('confirmar')
      return setFase('oculta')
    }
    setFase('elegivel'); setAviso(NO_AHORA) // erro, kn_indisponivel, limite, teto_diario: só repete com um novo toque (mesma chave)
  }

  if (fase === 'sucesso') {
    return (
      <div className="space-y-6 pb-16">
        <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}>
          <ChevronLeft size={18} /> Volver
        </button>
        <div className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-7 text-center text-white shadow-card">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-ouro-500 bg-azul-900 text-ouro-300">
            <Crown size={30} />
          </div>
          <h1 className="mt-4 font-serif text-2xl font-bold leading-tight">¡Listo! Ya eres parte del Club Secreto.</h1>
          <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-white/80">Tu acceso Premium ya está activo.</p>
        </div>
        <div className="space-y-2.5">
          <Link to="/asistente" className="btn-ouro w-full"><Stethoscope size={18} /> Habla con la Dra.</Link>
          <Link to="/protocolos" className="btn-linha w-full"><LifeBuoy size={18} className="text-ouro-600" /> Protocolos</Link>
          <Link to="/evolucao" className="btn-linha w-full"><LineChart size={18} className="text-ouro-600" /> Mi Evolución</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-16">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}>
        <ChevronLeft size={18} /> Volver
      </button>

      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-ouro-500 bg-azul-900 text-ouro-300 shadow-card">
          <MessageCircle size={30} />
        </div>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-azul-900">{c.titulo}</h1>
        <p className="mx-auto mt-2.5 max-w-[320px] text-sm leading-relaxed text-azul-800">{c.subtitulo}</p>
      </div>

      <div>
        <div className="overflow-hidden rounded-2xl border border-ouro-500/50 bg-azul-950 shadow-card">
          <iframe
            src={c.vslUrl}
            title="Video"
            className="aspect-video w-full border-0"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          />
        </div>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-azul-700">
          <Volume2 size={15} className="text-ouro-600" /> {c.avisoVideo}
        </p>
      </div>

      <div className="space-y-2.5">
        {c.beneficios.map((b, i) => {
          const Icone = iconesBeneficios[i] || Sparkles
          return (
            <div key={b.titulo} className="card flex items-center gap-3.5 p-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ouro-500/15 text-ouro-600">
                <Icone size={22} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight text-azul-900">{b.titulo}</p>
                <p className="mt-0.5 text-xs text-azul-700">{b.descricao}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-6 text-center text-white shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ouro-300">{c.acessoRotulo}</p>
        <p className="mt-1 font-serif text-4xl font-bold leading-none">{c.preco}</p>
        <p className="mt-1 text-xs text-white/80">{c.pagamentoRotulo}</p>
        <p className="mx-auto mt-3 max-w-[280px] text-xs leading-relaxed text-white/80">{c.resumo}</p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-ouro-300">
          <ShieldCheck size={16} /> {c.garantia}
        </div>
      </div>

      <ul className="space-y-2">
        {c.itens.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-azul-900">
            <Check size={16} className="shrink-0 text-ouro-600" strokeWidth={2.6} /> {item}
          </li>
        ))}
      </ul>

      {fase === 'elegivel' && cartao && (
        <div className="rounded-2xl border border-ouro-500/50 bg-white p-4 text-center shadow-card">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-azul-900">
            <ShieldCheck size={18} className="shrink-0 text-ouro-600" /> Pago con tu tarjeta {cartao.bandeira} •••• {cartao.final}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-azul-700">
            Al tocar «{c.botao}» autorizas un cobro único de US$ 67 en esta tarjeta.
          </p>
        </div>
      )}

      {fase === 'codigo' && (
        <form onSubmit={confirmarCodigo} className="card space-y-3 p-4 text-center">
          <p className="text-sm font-semibold text-azul-900">Confirma que eres tú</p>
          <p className="text-xs leading-relaxed text-azul-700">
            Enviamos un código de 6 dígitos a <b>{emailCodigo || 'tu correo de compra'}</b>. Revisa también la carpeta de spam.
          </p>
          <input
            className="campo text-center text-xl font-bold tracking-[0.4em]"
            inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="••••••" aria-label="Código de 6 dígitos"
            value={codigo} onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
          />
          <button type="submit" className="btn-ouro w-full" disabled={ocupado || codigo.length !== 6}>
            {ocupado ? 'Verificando…' : 'Confirmar código'}
          </button>
          <button type="button" className="text-xs font-medium text-azul-700 underline" disabled={ocupado} onClick={pedirCodigo}>
            Enviar un código nuevo
          </button>
        </form>
      )}

      {fase === 'confirmando' && (
        <p role="status" className="rounded-2xl border border-ouro-500/50 bg-white px-4 py-4 text-center text-sm font-semibold text-azul-900 shadow-card">
          Estamos confirmando tu compra…
        </p>
      )}

      {fase === 'oculta' && (
        <p className="rounded-xl bg-azul-100 px-4 py-3 text-center text-sm text-azul-800">
          Esta oferta no está disponible para tu cuenta en este momento. Si necesitas ayuda, escríbenos a soporte.
        </p>
      )}

      {['carregando', 'simples', 'confirmar', 'elegivel', 'processando'].includes(fase) && (
        <button
          type="button"
          onClick={comprar}
          disabled={fase === 'processando' || fase === 'carregando' || ocupado}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-ouro-500 bg-gradient-to-r from-ouro-300 to-ouro-500 px-4 py-4 text-sm font-bold text-azul-950 shadow-card transition active:scale-[0.99] disabled:opacity-70"
        >
          <MessageCircle size={20} className="shrink-0" />
          <span>{fase === 'processando' ? 'Procesando…' : ocupado ? 'Enviando código…' : c.botao}</span>
        </button>
      )}
      {aviso && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">{aviso}</p>}
    </div>
  )
}

// ------------------------------------------------------------------ Início
function Inicio({ plano }) {
  const premium = plano !== 'padrao'
  return (
    <div className="relative flex min-h-full flex-col justify-between py-2 text-center">
      <Link
        to="/perfil"
        aria-label="Mi cuenta"
        className="absolute right-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-ouro-500/35 bg-white/80 text-azul-900 shadow-sm transition active:scale-95"
      >
        <Settings size={20} strokeWidth={1.7} />
      </Link>

      <div className="flex flex-col items-center pt-1">
        <div className="grid h-[58px] w-[58px] place-items-center rounded-full border-[1.5px] border-ouro-500 bg-white/80 font-serif text-[20px] font-bold tracking-wider text-ouro-600 shadow-sm">
          {iniciais}
        </div>
        <p className="mt-3 font-serif text-[16px] font-semibold uppercase tracking-[0.22em] text-azul-900">
          CLUB <span className="text-ouro-600">DEL</span> SECRETO
        </p>
        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-ouro-500/70" />
          <span className="text-[10px] leading-none text-ouro-600">✦</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-ouro-500/70" />
        </div>
      </div>

      {premium ? (
        <div className="my-auto py-8">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-2 border-ouro-500 bg-azul-900 text-ouro-300 shadow-card">
            <Crown size={36} strokeWidth={1.6} />
          </div>
          <p className="font-serif text-[13px] font-semibold uppercase tracking-[0.22em] text-ouro-600">
            ERES PARTE DEL
          </p>
          <h1 className="mt-1 font-serif text-[38px] font-bold leading-tight text-azul-900">
            {APP.plano}
          </h1>
          <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-relaxed text-azul-800">
            Y tienes acceso a la <strong className="font-semibold text-azul-900">Dra. del Secreto</strong> para acompañarte cada día.
          </p>

          <Link
            to="/jornada"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border-[1.5px] border-ouro-500 bg-azul-900 px-6 py-4 text-[14px] font-bold uppercase tracking-[0.12em] text-white shadow-card transition active:scale-[0.99]"
          >
            <Crown size={18} className="text-ouro-300" strokeWidth={1.8} />
            <span>ACCEDER A MI CLUB</span>
            <ChevronRight size={18} className="text-ouro-300" strokeWidth={2.2} />
          </Link>
          <Link to="/asistente" className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-ouro-500/60 bg-white/70 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-azul-900 transition active:scale-[0.99]">
            <Stethoscope size={17} className="text-ouro-600" /> Habla con la Dra.
          </Link>
        </div>
      ) : (
        <div className="my-auto py-6 text-left">
          <p className="mb-3 ml-1 font-serif text-xs font-semibold uppercase tracking-[0.22em] text-ouro-600">
            Mis accesos
          </p>
          <Link
            to="/jornada"
            className="card flex w-full items-center gap-4 p-4 transition active:scale-[0.99]"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ouro-500 bg-azul-900 text-ouro-300">
              <Sparkles size={26} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold uppercase tracking-wider text-azul-900">Secreto de la Insulina</span>
              <span className="mt-0.5 block text-sm text-azul-700">Mi rutina</span>
            </span>
            <ChevronRight size={22} className="shrink-0 text-azul-700" />
          </Link>

          <Link
            to="/clube"
            className="mt-6 flex w-full flex-col items-center rounded-3xl border border-ouro-600 bg-gradient-to-br from-ouro-300 to-ouro-500 px-6 py-7 text-center text-azul-950 shadow-card transition active:scale-[0.99]"
          >
            <span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-azul-900 text-ouro-300">
              <Crown size={26} />
            </span>
            <span className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-azul-950">Acceso</span>
            <span className="my-1 font-serif text-3xl font-bold leading-none text-azul-950">Club Secreto Premium</span>
            <span className="mb-3 mt-1 flex w-28 items-center gap-2 opacity-60">
              <span className="h-px flex-1 bg-azul-950" />
              <span className="text-[10px]">✦</span>
              <span className="h-px flex-1 bg-azul-950" />
            </span>
            <span className="text-sm font-medium leading-snug text-azul-900">
              {OFERTAS.clube.subtitulo}
            </span>
            <span className="mt-4 grid h-10 w-10 place-items-center rounded-full bg-azul-900 text-ouro-300 shadow-sm">
              <ChevronRight size={18} strokeWidth={2.4} />
            </span>
          </Link>
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}

// ------------------------------------------------------------------ Jornada
function Jornada({ feitos, plano }) {
  const hoje = DIAS.find((d) => !feitos.includes(d.dia))?.dia
  const pct = Math.round((feitos.length / DIAS.length) * 100)
  return (
    <div className="space-y-6">
      <div>
        <p className="sobretitulo">Tu camino</p>
        <h1 className="titulo">{DIAS.length} días para tu resultado</h1>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ouro-500/20">
            <div className="h-full rounded-full bg-gradient-to-r from-ouro-300 to-ouro-500 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="shrink-0 text-xs font-semibold text-azul-700">{feitos.length} de {DIAS.length}</span>
        </div>
      </div>

      {hoje ? (
        <Link to={`/jornada/${hoje}`} className="btn-ouro w-full">
          Continuar en el Día {hoje} <ChevronRight size={18} />
        </Link>
      ) : (
        <p className="card p-4 text-center text-sm font-semibold">Completaste los {DIAS.length} días. ¡Felicitaciones!</p>
      )}

      <BlocoSegredos abertoInicial={false} />

      <div className="space-y-3">
        <Link to="/compras" className="card flex items-center gap-4 p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300"><ShoppingBasket size={22} /></div>
          <div className="flex-1">
            <p className="font-semibold">Lista de compras de los 21 días</p>
            <p className="text-sm text-azul-700">Todo lo que necesitas comprar para el programa</p>
          </div>
          <ChevronRight size={18} className="text-azul-700" />
        </Link>

        {/* A oferta da Ensalada (OfertaSalada) volta aqui quando o link de compra estiver pronto. */}
        <CartaoPremium plano={plano} />

        <Link to="/receitas" className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-ouro-300 to-ouro-500 p-4 text-azul-950 shadow-card">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/40"><ChefHat size={22} /></div>
          <div className="flex-1">
            <p className="font-semibold">Recetas Poderosas</p>
            <p className="text-sm">{RECEITAS.length} tés, shots, aguas y bebidas funcionales</p>
          </div>
          <ChevronRight size={18} />
        </Link>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/protocolos" className="card flex items-center gap-3 p-3.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300"><LifeBuoy size={18} /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Protocolos</p>
              <p className="truncate text-xs text-azul-700">10 guías SOS</p>
            </div>
          </Link>
          <Link to="/rituais" className="card flex items-center gap-3 p-3.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300"><Flame size={18} /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Rituales 7 min</p>
              <p className="truncate text-xs text-azul-700">5 secuencias</p>
            </div>
          </Link>
        </div>
      </div>
      {SEMANAS.map((s) => (
        <section key={s.numero}>
          <h2 className="mb-3 text-sm font-semibold text-azul-700">{s.titulo}</h2>
          <div className="grid grid-cols-3 gap-3">
            {DIAS.filter((d) => d.dia >= s.dias[0] && d.dia <= s.dias[1]).map((d) => {
              const feito = feitos.includes(d.dia)
              return (
                <Link key={d.dia} to={`/jornada/${d.dia}`} aria-label={`Día ${d.dia}${feito ? ', completado' : ''}`}
                  className={`relative flex min-h-[88px] flex-col items-center justify-center rounded-2xl border p-3 text-center shadow-card transition active:scale-95 ${feito ? 'border-azul-900 bg-azul-900 text-white' : d.dia === hoje ? 'border-2 border-ouro-500 bg-white' : 'border-azul-100 bg-white'}`}>
                  {d.dia === hoje && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-ouro-300 to-ouro-500 px-2.5 py-0.5 text-[10px] font-bold text-azul-950 shadow-sm">
                      Hoy
                    </span>
                  )}
                  <span className={`block text-xs font-medium ${feito ? 'text-ouro-300' : 'text-azul-700/70'}`}>Día</span>
                  <span className="block font-serif text-3xl font-bold leading-tight">{d.dia}</span>
                  {feito && (
                    <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-ouro-500 text-azul-950">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

function Dia({ feitos, aoMarcar }) {
  const { n } = useParams()
  const navegar = useNavigate()
  const [erro, setErro] = useState('')
  const dia = DIAS.find((d) => d.dia === Number(n))
  if (!dia) return <Navigate to="/jornada" replace />
  const feito = feitos.includes(dia.dia)
  const receita = RECEITAS.find((r) => r.id === RECEITA_DO_DIA[dia.dia])

  async function alternar() {
    setErro('')
    try { await aoMarcar(dia.dia, !feito) } catch (e) { setErro(e.message) }
  }

  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar('/jornada')}><ChevronLeft size={18} /> Camino</button>
      <div>
        <p className="sobretitulo">Día {dia.dia}</p>
        <h1 className="titulo">{dia.titulo}</h1>
        <p className="mt-2 text-sm text-azul-700">{dia.resumo}</p>
      </div>

      <BlocoSegredos abertoInicial={true} />

      {dia.blocos.map((b) => (
        <section key={b.titulo} className="card p-5">
          <h2 className="font-semibold text-azul-900">{b.titulo}</h2>
          <ul className="mt-3 space-y-2.5">
            {b.itens.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ouro-500" /><span>{item}</span></li>
            ))}
          </ul>
        </section>
      ))}
      {receita && (
        <Link to={`/receitas/${receita.id}`} className="card flex items-center gap-4 p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ouro-300 to-ouro-500 text-azul-950"><ChefHat size={22} /></div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-ouro-600">Receta sugerida del día</p>
            <p className="font-semibold">{receita.titulo}</p>
          </div>
          <ChevronRight size={18} className="text-azul-700" />
        </Link>
      )}
      <Erro>{erro}</Erro>
      <button className={feito ? 'btn-linha w-full' : 'btn-azul w-full'} onClick={alternar}>
        <Check size={18} /> {feito ? 'Completado (toca para deshacer)' : 'Marcar el día como completado'}
      </button>
      <div className="flex justify-between text-sm font-medium text-azul-700">
        {dia.dia > 1 ? <Link to={`/jornada/${dia.dia - 1}`} className="flex items-center gap-1"><ChevronLeft size={16} /> Día {dia.dia - 1}</Link> : <span />}
        {dia.dia < DIAS.length && <Link to={`/jornada/${dia.dia + 1}`} className="flex items-center gap-1">Día {dia.dia + 1} <ChevronRight size={16} /></Link>}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Receitas
function Receitas() {
  const navegar = useNavigate()
  return (
    <div className="space-y-6">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Volver</button>
      <div>
        <p className="sobretitulo">Recetas Poderosas</p>
        <h1 className="titulo">Tés, shots, aguas y bebidas</h1>
        <p className="mt-1 text-sm text-azul-700">14 recetas naturales con ingredientes simples que encuentras en cualquier mercado.</p>
      </div>
      {CATEGORIAS.map((c) => {
        const itens = RECEITAS.filter((r) => r.categoria === c)
        if (itens.length === 0) return null
        return (
          <section key={c}>
            <h2 className="mb-2 text-sm font-semibold text-azul-700">{c}</h2>
            <ul className="card divide-y divide-azul-100">
              {itens.map((r) => (
                <li key={r.id}>
                  <Link to={`/receitas/${r.id}`} className="flex items-center gap-3.5 px-4 py-3.5">
                    {r.imagem && (
                      <img src={r.imagem} alt={r.titulo} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-azul-900">{r.titulo}</p>
                      <p className="truncate text-xs text-azul-700">{r.tag || `${r.tempo} · ${r.rende}`}</p>
                    </div>
                    <ChevronRight size={18} className="shrink-0 text-azul-700" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

function Receita() {
  const { id } = useParams()
  const navegar = useNavigate()
  const r = RECEITAS.find((x) => x.id === id)
  if (!r) return <Navigate to="/receitas" replace />
  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Volver</button>

      {r.imagem ? (
        <div className="relative h-60 overflow-hidden rounded-2xl bg-azul-950 shadow-card">
          <img src={r.imagem} alt={r.titulo} className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-azul-950 via-azul-950/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="inline-block rounded-full border border-ouro-300/40 bg-ouro-500/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ouro-100">
              {r.tag || r.categoria}
            </span>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white">{r.titulo}</h1>
            {r.descricao && <p className="mt-1.5 text-xs leading-relaxed text-white/90">{r.descricao}</p>}
          </div>
        </div>
      ) : (
        <div>
          <p className="sobretitulo">{r.tag || r.categoria}</p>
          <h1 className="titulo">{r.titulo}</h1>
          {r.descricao && <p className="mt-2 text-sm leading-relaxed text-azul-800">{r.descricao}</p>}
        </div>
      )}

      {r.quandoTomar && (
        <section className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-4 text-white shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ouro-300">⏰ Cuándo tomar</p>
          <p className="mt-1 font-semibold">{r.quandoTomar}</p>
          {r.quandoDica && <p className="mt-1 text-xs text-azul-200">{r.quandoDica}</p>}
        </section>
      )}

      {r.beneficios && r.beneficios.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="text-sm font-semibold text-azul-700">Lo que esta receta hace por tu cuerpo</h2>
          {r.beneficios.map((b, i) => (
            <div key={i} className="card flex items-start gap-3 p-4">
              <span className="text-xl">{b.icone}</span>
              <div className="text-sm leading-relaxed">
                <p className="font-semibold text-azul-900">{b.titulo}</p>
                <p className="text-xs text-azul-700">{b.texto}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="card p-5">
        <h2 className="font-semibold">Ingredientes</h2>
        <ul className="mt-3 space-y-2">
          {r.ingredientes.map((i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ouro-500" />{i}</li>
          ))}
        </ul>
      </section>
      <section className="card p-5">
        <h2 className="font-semibold">Preparación</h2>
        <ol className="mt-3 space-y-3">
          {r.preparo.map((passo, n) => (
            <li key={n} className="flex gap-3 text-sm leading-relaxed">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-azul-900 text-xs font-semibold text-ouro-300">{n + 1}</span>{passo}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

// ------------------------------------------------------------------ Protocolos de Imprevistos
function Protocolos() {
  const navegar = useNavigate()
  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Volver</button>
      <div>
        <p className="sobretitulo">Guía de Bolsillo · SOS</p>
        <h1 className="titulo">Protocolos para Imprevistos</h1>
        <p className="mt-1 text-sm text-azul-700">La vida real tiene prisas, fiestas, viajes y días difíciles. Mira exactamente qué hacer en cada situación sin perder tu progreso.</p>
      </div>
      <ul className="space-y-3">
        {PROTOCOLOS.map((p) => (
          <li key={p.id}>
            <Link to={`/protocolos/${p.id}`} className="card flex items-center gap-4 p-4">
              {p.imagem ? (
                <img src={p.imagem} alt={p.titulo} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              ) : (
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300">
                  <LifeBuoy size={20} />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-ouro-600">{p.tag}</p>
                <p className="font-semibold text-azul-900">{p.titulo}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-azul-700">{p.descricao}</p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-azul-700" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Protocolo() {
  const { id } = useParams()
  const navegar = useNavigate()
  const vitrine = PROTOCOLOS.find((x) => x.id === id)
  const [conteudo, setConteudo] = useState(null)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)
  useEffect(() => {
    if (!vitrine) return
    setErro('')
    store.protocoloCompleto(id).then(setConteudo).catch((e) => setErro(e.message))
  }, [id, tentativa])
  if (!vitrine) return <Navigate to="/protocolos" replace />
  if (!conteudo) {
    return (
      <div className="space-y-5">
        <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Volver</button>
        <h1 className="titulo">{vitrine.titulo}</h1>
        {erro ? (
          <div className="space-y-3">
            <Erro>{erro}</Erro>
            <button className="btn-azul w-full" onClick={() => setTentativa((n) => n + 1)}>Intentar de nuevo</button>
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-azul-700">Cargando…</p>
        )}
      </div>
    )
  }
  const p = { ...vitrine, ...conteudo }
  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Volver</button>

      {p.imagem ? (
        <div className="relative h-60 overflow-hidden rounded-2xl bg-azul-950 shadow-card">
          <img src={p.imagem} alt={p.titulo} className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-azul-950 via-azul-950/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="inline-block rounded-full border border-ouro-300/40 bg-ouro-500/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ouro-100">
              {p.tag}
            </span>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white">{p.titulo}</h1>
            <p className="mt-1.5 text-xs leading-relaxed text-white/90">{p.descricao}</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="sobretitulo">{p.tag}</p>
          <h1 className="titulo">{p.titulo}</h1>
          <p className="mt-2 text-sm leading-relaxed text-azul-800">{p.descricao}</p>
        </div>
      )}

      <section className="card space-y-2 p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-ouro-700">Lo que suele pasar</p>
        <p className="text-sm leading-relaxed text-azul-800">{p.acontece}</p>
        {p.solucao && <p className="pt-1 text-sm font-semibold text-azul-900">{p.solucao}</p>}
      </section>

      {p.frase && (
        <div className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-5 text-center font-serif text-lg italic text-ouro-200 shadow-card">
          "{p.frase}"
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-azul-700">Qué hacer — paso a paso</h2>
        {p.passos.map((passo, i) => (
          <div key={i} className="card space-y-2 p-5">
            <div className="flex items-center gap-2">
              <span className="text-xl">{passo.icone}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-ouro-600">{passo.numero}</span>
            </div>
            <h3 className="font-semibold text-azul-900">{passo.titulo}</h3>
            <p className="text-sm leading-relaxed text-azul-800">{passo.texto}</p>
            {passo.dica && (
              <div className="rounded-xl bg-ouro-100/70 p-3 text-xs leading-relaxed text-azul-900">
                💡 {passo.dica}
              </div>
            )}
          </div>
        ))}
      </section>

      {p.evitar && p.evitar.length > 0 && (
        <section className="card p-5">
          <h2 className="font-semibold text-red-700">Lo que debes evitar en esta situación</h2>
          <ul className="mt-3 space-y-2">
            {p.evitar.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-azul-800">
                <span className="font-bold text-red-600">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.lembre && (
        <section className="rounded-2xl border border-ouro-500/40 bg-ouro-100/50 p-4 text-sm leading-relaxed text-azul-900">
          <p className="font-semibold text-ouro-700">Recuerda siempre</p>
          <p className="mt-1">{p.lembre}</p>
        </section>
      )}
    </div>
  )
}

// ------------------------------------------------------------------ Rituais de 7 Minutos
function Rituais() {
  const navegar = useNavigate()
  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Volver</button>
      <div>
        <p className="sobretitulo">Movimiento Suave · 7 Minutos</p>
        <h1 className="titulo">Rituales de Activación</h1>
        <p className="mt-1 text-sm text-azul-700">5 secuencias cortas para hacer en la sala o en la habitación, sin equipo y sin impacto, que ayudan a los músculos a tomar el azúcar de la sangre.</p>
      </div>
      <ul className="space-y-3">
        {RITUAIS.map((r) => (
          <li key={r.id}>
            <Link to={`/rituais/${r.id}`} className="card flex items-center gap-4 p-4">
              {r.imagem ? (
                <img src={r.imagem} alt={r.titulo} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              ) : (
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ouro-300 to-ouro-500 text-azul-950">
                  <Flame size={20} />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-ouro-600">{r.tag}</p>
                <p className="font-semibold text-azul-900">{r.titulo}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-azul-700">{r.descricao}</p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-azul-700" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Ritual() {
  const { id } = useParams()
  const navegar = useNavigate()
  const r = RITUAIS.find((x) => x.id === id)
  if (!r) return <Navigate to="/rituais" replace />
  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Volver</button>

      {r.imagem ? (
        <div className="relative h-60 overflow-hidden rounded-2xl bg-azul-950 shadow-card">
          <img src={r.imagem} alt={r.titulo} className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-azul-950 via-azul-950/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="inline-block rounded-full border border-ouro-300/40 bg-ouro-500/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ouro-100">
              {r.tag}
            </span>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white">{r.titulo}</h1>
            <p className="mt-1.5 text-xs leading-relaxed text-white/90">{r.descricao}</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="sobretitulo">{r.tag}</p>
          <h1 className="titulo">{r.titulo}</h1>
          <p className="mt-2 text-sm leading-relaxed text-azul-800">{r.descricao}</p>
        </div>
      )}

      {r.quandoFazer && (
        <section className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-4 text-white shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ouro-300">⏰ Cuándo hacerlo</p>
          <p className="mt-1 font-semibold">{r.quandoFazer}</p>
          {r.quandoDica && <p className="mt-1 text-xs text-azul-200">{r.quandoDica}</p>}
        </section>
      )}

      {r.introEditorial && (
        <section className="card space-y-2 p-5">
          <p className="font-serif text-lg font-semibold italic text-azul-900">"{r.introEditorial}"</p>
          {r.introTexto && <p className="text-sm leading-relaxed text-azul-700">{r.introTexto}</p>}
        </section>
      )}

      {r.beneficios && r.beneficios.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="text-sm font-semibold text-azul-700">Lo que esta secuencia hace por tu cuerpo</h2>
          {r.beneficios.map((b, i) => (
            <div key={i} className="card flex items-start gap-3 p-4">
              <span className="text-xl">{b.icone}</span>
              <div className="text-sm leading-relaxed">
                <p className="font-semibold text-azul-900">{b.titulo}</p>
                <p className="text-xs text-azul-700">{b.texto}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-azul-700">Los 4 Ejercicios</h2>
        {r.exercicios.map((ex, i) => (
          <div key={i} className="card space-y-2.5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ouro-600">{ex.icone} {ex.numero}</span>
              <span className="rounded-full bg-azul-900 px-3 py-0.5 text-xs font-medium text-ouro-300">{ex.series}</span>
            </div>
            <h3 className="font-semibold text-azul-900">{ex.nome}</h3>
            {ex.comoFazer && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-azul-700">Cómo hacerlo</p>
                <p className="mt-0.5 text-sm leading-relaxed text-azul-800">{ex.comoFazer}</p>
              </div>
            )}
            {ex.porQueFunciona && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-azul-700">Por qué funciona</p>
                <p className="mt-0.5 text-xs leading-relaxed text-azul-700">{ex.porQueFunciona}</p>
              </div>
            )}
            {ex.dica && (
              <div className="rounded-xl bg-ouro-100/70 p-3 text-xs leading-relaxed text-azul-900">
                💡 {ex.dica}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}

// ------------------------------------------------------------------ Lista de compras
function Compras() {
  const navegar = useNavigate()
  const [marcados, setMarcados] = useState(() => store.guardado.get('clube.compras', []))
  const total = LISTA_COMPRAS.reduce((n, g) => n + g.itens.length, 0)

  function alternar(item) {
    const novo = marcados.includes(item) ? marcados.filter((i) => i !== item) : [...marcados, item]
    setMarcados(novo)
    store.guardado.set('clube.compras', novo)
  }

  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar('/jornada')}><ChevronLeft size={18} /> Camino</button>
      <div>
        <p className="sobretitulo">Secreto de la Insulina · Lista de compras</p>
        <h1 className="titulo">Lista de Compras de los 21 Días</h1>
        <p className="mt-2 text-sm leading-relaxed text-azul-800">
          Todo lo que necesitas para hacer los 21 días completos. Compra una vez los secos (duran todo el programa) y repón las frutas y hierbas frescas por semana.
        </p>
        <p className="mt-2 text-xs text-azul-700">{marcados.length} de {total} artículos marcados. Las marcas quedan guardadas en este dispositivo.</p>
      </div>
      <div className="card p-4 text-sm leading-relaxed text-azul-800">
        El programa es un protocolo de <strong className="text-azul-900">bebidas</strong> — los 3 Secretos de la Insulina, el shot al despertar, el agua con vinagre o limón antes de las comidas y el té calmante por la noche — sumado a una buena <strong className="text-azul-900">fuente de proteína</strong> en las comidas. Ve marcando cada artículo a medida que lo pongas en el carrito. ✅
      </div>
      {LISTA_COMPRAS.map((g) => (
        <section key={g.grupo} className="card p-5">
          <h2 className="font-semibold">{g.grupo}</h2>
          <ul className="mt-3 space-y-1">
            {g.itens.map((item) => (
              <li key={item}>
                <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
                  <input type="checkbox" className="h-5 w-5 accent-azul-900" checked={marcados.includes(item)} onChange={() => alternar(item)} />
                  <span className={marcados.includes(item) ? 'text-azul-700/60 line-through' : ''}>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-5 text-white shadow-card">
        <p className="text-[10px] font-bold uppercase tracking-widest text-ouro-300">Lo que no puede faltar</p>
        <p className="mt-1.5 text-sm leading-relaxed text-azul-100">
          <strong className="text-ouro-300">Chía, psyllium, cacao 100%, linaza dorada, vinagre de manzana, canela, cúrcuma, jengibre, limón</strong> y el líquido de tu preferencia. Con eso ya haces el protocolo completo de los 21 días.
        </p>
      </section>
      {marcados.length > 0 && <button className="btn-linha w-full" onClick={() => { setMarcados([]); store.guardado.set('clube.compras', []) }}>Desmarcar todo</button>}
    </div>
  )
}

// ------------------------------------------------------------------ Presentes
function GrupoMateriais({ rotulo, total, aberto, aoAlternar, icone, itens, rotaBase }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ouro-500/30 bg-white shadow-card">
      <button
        type="button"
        onClick={aoAlternar}
        className="flex w-full items-center gap-3.5 p-4 text-left transition active:bg-creme"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ouro-500/15 text-ouro-600">
          {icone}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-tight text-azul-900">{rotulo}</span>
          <span className="mt-0.5 block text-xs text-azul-700">{total} materiales · toca para ver</span>
        </span>
        <ChevronDown size={20} className={`shrink-0 text-azul-700 transition-transform ${aberto ? 'rotate-180' : ''}`} />
      </button>
      {aberto && (
        <div className="border-t border-ouro-500/15 px-3 pb-3 pt-1">
          {itens.map((item) => (
            <Link
              key={item.id}
              to={`${rotaBase}/${item.id}`}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-creme active:bg-creme"
            >
              {item.imagem ? (
                <img src={item.imagem} alt={item.titulo} className="h-9 w-9 shrink-0 rounded-full border border-ouro-500/40 object-cover" />
              ) : (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ouro-300 to-ouro-500 text-azul-950">
                  <ChevronRight size={15} strokeWidth={2.4} />
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-azul-900">{item.titulo}</span>
              <ExternalLink size={15} className="shrink-0 text-ouro-600" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function Presentes() {
  const [erro, setErro] = useState('')
  const [abrindo, setAbrindo] = useState('')
  const [clubeAberto, setClubeAberto] = useState(true)
  const [protAberto, setProtAberto] = useState(false)
  const [recAberto, setRecAberto] = useState(false)
  const [ritAberto, setRitAberto] = useState(false)

  // Os PDFs ficam protegidos no Supabase: cada clique gera um link temporário para quem está logada.
  async function abrir(p) {
    setErro('')
    setAbrindo(p.titulo)
    const aba = window.open('', '_blank') // se abre ya en el clic para que el navegador no la bloquee
    try {
      const url = await store.linkPresente(p.arquivo)
      if (aba) { aba.opener = null; aba.location.href = url } else window.location.href = url
    } catch (e) {
      if (aba) aba.close()
      setErro(e.message)
    } finally {
      setAbrindo('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="sobretitulo">Regalos</p>
        <h1 className="titulo">Regalos</h1>
        <p className="mt-1 text-sm text-azul-700">Tus bonos para descargar y usar cuando quieras.</p>
      </div>

      <section className="space-y-3">
        <p className="font-serif text-xs font-semibold uppercase tracking-[0.18em] text-ouro-600">Para descargar</p>
        <Erro>{erro}</Erro>
        <ul className="space-y-3">
          {PRESENTES.map((p) => {
            const corpo = (
              <>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ouro-300 to-ouro-500 text-azul-950 shadow-sm">
                  <FileText size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-azul-900">{p.titulo}</p>
                  <p className="text-xs text-azul-700">{p.arquivo ? p.descricao : 'Próximamente'}</p>
                </div>
                {p.arquivo && <ExternalLink size={18} className="shrink-0 text-ouro-600" />}
              </>
            )
            return (
              <li key={p.titulo}>
                {p.arquivo
                  ? <button type="button" className="card flex w-full items-center gap-4 p-4 text-left transition active:scale-[0.99]" disabled={abrindo === p.titulo} onClick={() => abrir(p)}>{corpo}</button>
                  : <div className="card flex items-center gap-4 p-4 opacity-70">{corpo}</div>}
              </li>
            )
          })}
        </ul>
      </section>

      <section className="pt-2">
        <button
          type="button"
          onClick={() => setClubeAberto((v) => !v)}
          className="flex w-full items-center gap-3.5 rounded-2xl border border-ouro-500/40 bg-gradient-to-br from-azul-800 to-azul-950 p-4 text-left shadow-card transition active:scale-[0.99]"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ouro-300 to-ouro-500 text-azul-950">
            <Crown size={24} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5 text-[15px] font-semibold leading-tight text-white">
              <Sparkles size={16} className="text-ouro-300" /> Materiales exclusivos del Club
            </span>
            <span className="mt-0.5 block text-xs text-ouro-300">
              {clubeAberto ? 'Toca para ocultar' : 'Toca aquí para ver'}
            </span>
          </span>
          <ChevronDown size={20} className={`shrink-0 text-ouro-300 transition-transform ${clubeAberto ? 'rotate-180' : ''}`} />
        </button>

        {clubeAberto && (
          <div className="mt-3 space-y-3">
            <GrupoMateriais
              rotulo="Protocolos para imprevistos"
              total={PROTOCOLOS.length}
              aberto={protAberto}
              aoAlternar={() => setProtAberto((v) => !v)}
              icone={<LifeBuoy size={22} />}
              itens={PROTOCOLOS}
              rotaBase="/protocolos"
            />
            <GrupoMateriais
              rotulo="Recetas exclusivas Poderosas"
              total={RECEITAS.length}
              aberto={recAberto}
              aoAlternar={() => setRecAberto((v) => !v)}
              icone={<ChefHat size={22} />}
              itens={RECEITAS}
              rotaBase="/receitas"
            />
            <GrupoMateriais
              rotulo="Rituales de 7 minutos"
              total={RITUAIS.length}
              aberto={ritAberto}
              aoAlternar={() => setRitAberto((v) => !v)}
              icone={<Flame size={22} />}
              itens={RITUAIS}
              rotaBase="/rituais"
            />
          </div>
        )}
      </section>
    </div>
  )
}

// ------------------------------------------------------------------ Perfil
function Perfil({ usuario, plano, aoMudarPlano, aoAtualizar, aoSair }) {
  const [nome, setNome] = useState(usuario.nome)
  const [aviso, setAviso] = useState('')
  const [erro, setErro] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [avisoSenha, setAvisoSenha] = useState('')
  const [erroSenha, setErroSenha] = useState('')
  const premium = plano !== 'padrao'

  async function salvar(e) {
    e.preventDefault()
    setErro(''); setAviso('')
    try { aoAtualizar(await store.salvarNome(usuario, nome)); setAviso('Nombre guardado.') } catch (err) { setErro(err.message) }
  }

  async function mudarSenha(e) {
    e.preventDefault()
    setErroSenha(''); setAvisoSenha('')
    try {
      await store.alterarSenha(novaSenha, confirmaSenha)
      setNovaSenha(''); setConfirmaSenha('')
      setAvisoSenha('¡Contraseña cambiada con éxito!')
    } catch (err) { setErroSenha(err.message) }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="sobretitulo">Mi cuenta</p>
        <h1 className="titulo">{usuario.nome || 'Miembro'}</h1>
        <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${premium ? 'border-ouro-500/40 bg-ouro-500/15 text-ouro-600' : 'border-azul-200 bg-azul-900/10 text-azul-900'}`}>
          {premium && <Crown size={14} />}
          {premium ? 'Miembro del Club' : 'Acceso estándar'}
        </span>
      </div>
      <form onSubmit={salvar} className="card space-y-3 p-5">
        <label className="block text-sm font-medium">Nombre
          <input className="campo mt-1" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        {(usuario.telefone || usuario.email) && <p className="text-sm text-azul-700">{usuario.telefone ? `Teléfono: ${usuario.telefone}` : `Correo: ${usuario.email}`}</p>}
        <Erro>{erro}</Erro>
        {aviso && <p className="text-sm font-medium text-azul-700">{aviso}</p>}
        <button className="btn-azul w-full">Guardar</button>
      </form>
      <form onSubmit={mudarSenha} className="card space-y-3 p-5">
        <h2 className="font-semibold text-azul-900">Cambiar mi contraseña</h2>
        <input className="campo" type="password" placeholder="Nueva contraseña (mínimo 6 caracteres)" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
        <input className="campo" type="password" placeholder="Confirmar nueva contraseña" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
        <Erro>{erroSenha}</Erro>
        {avisoSenha && <p className="text-sm font-medium text-azul-700">{avisoSenha}</p>}
        <button className="btn-azul w-full">Guardar nueva contraseña</button>
      </form>

      {(store.DEMO || usuario.admin) && (
        <div className="rounded-2xl border border-dashed border-ouro-500/60 bg-ouro-100/40 p-4 space-y-3">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ouro-700">
            <Sparkles size={15} /> Modo de prueba — ver como…
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => aoMudarPlano('padrao')}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${!premium ? 'bg-azul-900 text-white shadow-sm' : 'border border-ouro-500/40 bg-white text-azul-900'}`}
            >
              Acceso Estándar
            </button>
            <button
              type="button"
              onClick={() => aoMudarPlano('clube')}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${premium ? 'bg-gradient-to-r from-ouro-300 to-ouro-500 text-azul-950 shadow-sm' : 'border border-ouro-500/40 bg-white text-azul-900'}`}
            >
              Premium
            </button>
          </div>
          <Link to="/clube" className="btn-linha w-full text-xs">
            <MessageCircle size={16} className="text-ouro-600" /> Ver página de oferta del Club (/clube)
          </Link>
        </div>
      )}

      {usuario.admin && <Link to="/admin" className="btn-linha w-full"><ShieldCheck size={18} className="text-ouro-600" /> Administración</Link>}
      <button className="btn-linha w-full" onClick={aoSair}><LogOut size={18} /> Cerrar sesión</button>
    </div>
  )
}

// ------------------------------------------------------------------ Administração
function Admin({ usuario }) {
  const navegar = useNavigate()
  const [lista, setLista] = useState([])
  const [pessoas, setPessoas] = useState([])
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')

  const [aviso, setAviso] = useState('')
  const [senhaDe, setSenhaDe] = useState(null) // id da cliente com o campo de senha aberto
  const [novaSenha, setNovaSenha] = useState('')

  async function carregar() {
    try {
      const [a, m] = await Promise.all([store.acessos(), store.membros()])
      setLista(a); setPessoas(m)
    } catch (e) { setErro(e.message) }
  }
  useEffect(() => { carregar() }, [])

  if (!usuario.admin) return <Navigate to="/" replace />

  async function liberar(e) {
    e.preventDefault()
    setErro('')
    try { await store.liberarAcesso({ email, telefone, nome }); setTelefone(''); setEmail(''); setNome(''); await carregar() } catch (err) { setErro(err.message) }
  }

  async function remover(id) {
    setErro('')
    try { await store.removerAcesso(id); await carregar() } catch (err) { setErro(err.message) }
  }

  async function mudarPlanoAcesso(a) {
    setErro('')
    try { await store.planoAcesso(a.id, a.plano === 'clube' ? 'padrao' : 'clube'); setAviso('Plan actualizado.'); await carregar() } catch (err) { setErro(err.message) }
  }

  async function ativar(a) {
    setErro('')
    try { await store.ativarAcesso(a.id, a.ativo === false); await carregar() } catch (err) { setErro(err.message) }
  }

  async function alternarPlano(p) {
    setErro(''); setAviso('')
    try { await store.definirPlano(p.id, p.plano === 'clube' ? 'padrao' : 'clube'); setAviso('Plan actualizado.'); await carregar() } catch (err) { setErro(err.message) }
  }

  async function salvarSenha(p) {
    setErro(''); setAviso('')
    try { await store.redefinirSenha(p.id, novaSenha); setSenhaDe(null); setNovaSenha(''); setAviso('Contraseña restablecida. Avísale a la clienta.') } catch (err) { setErro(err.message) }
  }

  const concluiram = pessoas.filter((p) => p.dias >= DIAS.length).length
  const numeros = [['Accesos activos', lista.filter((a) => a.ativo !== false).length], ['Cuentas creadas', pessoas.length], ['Completaron', concluiram]]

  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar('/perfil')}><ChevronLeft size={18} /> Perfil</button>
      <div>
        <p className="sobretitulo">Administración</p>
        <h1 className="titulo">Panel del club</h1>
        {store.DEMO && <p className="mt-2 text-xs text-azul-700">Modo demostración: los datos de abajo son solo de este navegador.</p>}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {numeros.map(([rotulo, valor]) => (
          <div key={rotulo} className="card p-3 text-center">
            <p className="font-serif text-3xl font-bold">{valor}</p>
            <p className="text-[11px] leading-tight text-azul-700">{rotulo}</p>
          </div>
        ))}
      </div>

      <form onSubmit={liberar} className="card space-y-3 p-5">
        <h2 className="font-semibold">Habilitar acceso</h2>
        <p className="text-sm text-azul-700">Solo quien está en esta lista (activa) puede crear una cuenta. Las compras aprobadas entran aquí automáticamente.</p>
        <input className="campo" type="email" placeholder="Correo (opcional)" value={email} onChange={(e) => setEmail(e.target.value)} autoCapitalize="off" />
        <input className="campo" type="tel" inputMode="numeric" placeholder="Teléfono con código de país (solo números)" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <input className="campo" placeholder="Nombre (opcional)" value={nome} onChange={(e) => setNome(e.target.value)} />
        <Erro>{erro}</Erro>
        {aviso && <p className="text-sm font-medium text-azul-700">{aviso}</p>}
        <button className="btn-azul w-full">Habilitar</button>
      </form>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-azul-700">Accesos habilitados</h2>
        {lista.length === 0 ? <p className="card p-5 text-sm text-azul-700">Aún no hay accesos.</p> : (
          <ul className="card divide-y divide-azul-100">
            {lista.map((a) => (
              <li key={a.id || a.telefone} className="flex items-center gap-3 px-5 py-3 text-sm">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{a.email || a.telefone}</p>
                  {a.email && a.telefone && <p className="text-azul-700">{a.telefone}</p>}
                  <p className="text-azul-700">{a.nome || 'Sin nombre'} · {new Date(a.liberado_em).toLocaleDateString('es-419')}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] font-semibold">
                    <span className={`rounded-full px-2 py-0.5 ${a.ativo === false ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{a.ativo === false ? 'Bloqueado' : 'Activo'}{a.status && a.status !== 'manual' && a.status !== 'aprovada' ? ` · ${a.status}` : ''}</span>
                    <span className="rounded-full bg-azul-100 px-2 py-0.5 text-azul-800">{a.origem === 'checkout' ? 'Compra' : 'Manual'}</span>
                    {a.plano === 'clube' && <span className="rounded-full bg-ouro-100 px-2 py-0.5 text-ouro-700">Premium</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button className="rounded-lg border border-ouro-500/60 px-3 py-1.5 text-xs font-medium text-ouro-700 hover:bg-ouro-100" onClick={() => mudarPlanoAcesso(a)}>{a.plano === 'clube' ? 'Quitar Premium' : 'Dar Premium'}</button>
                  <button className="rounded-lg border border-azul-200 px-3 py-1.5 text-xs font-medium hover:bg-ouro-100" onClick={() => ativar(a)}>{a.ativo === false ? 'Reactivar' : 'Bloquear'}</button>
                  <button className="rounded-lg border border-azul-200 px-3 py-1.5 text-xs font-medium hover:bg-red-50 hover:text-red-700" onClick={() => remover(a.id)}>Quitar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-azul-700">Miembros</h2>
        {pessoas.length === 0 ? <p className="card p-5 text-sm text-azul-700">Aún no hay cuentas creadas.</p> : (
          <ul className="card divide-y divide-azul-100">
            {pessoas.map((p) => (
              <li key={p.id} className="px-5 py-3 text-sm">
                <div className="flex justify-between gap-3">
                  <p className="font-semibold">{p.nome || 'Sin nombre'}</p>
                  <p className="text-azul-700">{p.dias} de {DIAS.length} días</p>
                </div>
                <p className="text-azul-700">{[p.email, p.telefone].filter(Boolean).join(' · ')}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.plano === 'clube' ? 'bg-ouro-100 text-ouro-700' : 'bg-azul-100 text-azul-800'}`}>
                    {p.plano === 'clube' ? 'Premium' : 'Estándar'}{p.admin ? ' · Admin' : ''}
                  </span>
                  <button type="button" className="rounded-lg border border-azul-200 px-2.5 py-1 text-xs font-medium hover:bg-ouro-100" onClick={() => alternarPlano(p)}>
                    {p.plano === 'clube' ? 'Volver a Estándar' : 'Habilitar Premium'}
                  </button>
                  <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-azul-200 px-2.5 py-1 text-xs font-medium hover:bg-azul-100" onClick={() => { setSenhaDe(senhaDe === p.id ? null : p.id); setNovaSenha('') }}>
                    <KeyRound size={13} /> Restablecer contraseña
                  </button>
                </div>
                {senhaDe === p.id && (
                  <div className="mt-2 flex gap-2">
                    <input className="campo py-2 text-sm" type="text" autoComplete="off" placeholder="Nueva contraseña (mínimo 6)" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
                    <button type="button" className="btn-azul shrink-0 px-3 py-2 text-xs" onClick={() => salvarSenha(p)}>Guardar contraseña</button>
                  </div>
                )}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-azul-100"><div className="h-full rounded-full bg-ouro-500" style={{ width: `${(p.dias / DIAS.length) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

// ------------------------------------------------------------------ Conteúdo exclusivo do Premium
// Telas envolvidas por <SoPremium> nas rotas (hoje: Protocolos e Evolução). Para liberar uma tela para todas,
// basta tirar o <SoPremium> da rota correspondente lá embaixo, no App.
function SoPremium({ plano, children }) {
  if (plano !== 'padrao') return children
  return (
    <div className="space-y-5 py-6 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-ouro-500 bg-azul-900 text-ouro-300 shadow-card">
        <Lock size={32} strokeWidth={1.7} />
      </div>
      <p className="sobretitulo">Exclusivo del Club Premium</p>
      <h1 className="titulo text-2xl">Este contenido es del acceso Premium</h1>
      <p className="mx-auto max-w-[300px] text-sm leading-relaxed text-azul-800">Forma parte del Club Premium: Habla con la Dra., protocolos para imprevistos y tu evolución.</p>
      <Link to="/clube" className="btn-ouro w-full"><Crown size={18} /> Conocer el Club</Link>
      <Link to="/jornada" className="block text-sm font-medium text-azul-700 underline">Volver al camino</Link>
    </div>
  )
}

// ------------------------------------------------------------------ App
export default function App() {
  const [usuario, setUsuario] = useState(undefined) // undefined = carregando
  const [tokenReset, setTokenReset] = useState(tokenDoLink)
  const [tokenConvite, setTokenConvite] = useState(conviteDoLink)
  const [feitos, setFeitos] = useState([])
  // O plano real vem do banco (o admin libera no painel). Admins podem simular o outro plano no Perfil (modo de teste).
  const [planoTeste, setPlanoTeste] = useState(() => store.guardado.get('clube.plano.teste', null))
  const plano = (usuario?.admin || store.DEMO) && planoTeste ? planoTeste : (usuario?.plano || 'padrao')

  function mudarPlano(novo) {
    setPlanoTeste(novo)
    store.guardado.set('clube.plano.teste', novo)
  }

  useEffect(() => { store.sessao().then(setUsuario).catch(() => setUsuario(null)) }, [])
  function limparConvite() {
    try { window.history.replaceState(null, '', window.location.pathname + '#/') } catch { window.location.hash = '#/' }
    setTokenConvite(null)
  }
  useEffect(() => { if (tokenConvite && usuario) limparConvite() }, [tokenConvite, usuario])
  useEffect(() => {
    if (usuario) store.progresso(usuario).then(setFeitos).catch(() => setFeitos([]))
    else setFeitos([])
  }, [usuario])

  async function marcar(dia, concluido) {
    await store.marcarDia(usuario, dia, concluido)
    setFeitos((atual) => (concluido ? [...new Set([...atual, dia])] : atual.filter((d) => d !== dia)))
  }

  async function sair() {
    await store.sair()
    setUsuario(null)
  }

  if (tokenReset) {
    return <NovaSenha token={tokenReset} aoTerminar={async () => {
      try { window.history.replaceState(null, '', window.location.pathname + '#/') } catch { window.location.hash = '#/' }
      await store.sair().catch(() => {})
      setUsuario(null)
      setTokenReset(null)
    }} />
  }
  if (usuario === undefined) return <div className="grid h-full place-items-center bg-azul-900"><Marca /></div>
  // Link pessoal de acesso: sem sessão aberta, a cliente cria a senha; com sessão, entra direto (o efeito acima limpa o link).
  if (tokenConvite && !usuario) return <NovaConta token={tokenConvite} aoEntrar={(u) => { limparConvite(); setUsuario(u) }} aoSair={limparConvite} />
  if (!usuario) return <Entrada aoEntrar={setUsuario} />

  return (
    <HashRouter>
      <RolarParaTopo />
      <Routes>
        <Route element={<Moldura plano={plano} />}>
          <Route path="/" element={<Inicio usuario={usuario} feitos={feitos} plano={plano} />} />
          <Route path="/jornada" element={<Jornada feitos={feitos} plano={plano} />} />
          <Route path="/jornada/:n" element={<Dia feitos={feitos} aoMarcar={marcar} />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/receitas/:id" element={<Receita />} />
          <Route path="/protocolos" element={<SoPremium plano={plano}><Protocolos /></SoPremium>} />
          <Route path="/protocolos/:id" element={<SoPremium plano={plano}><Protocolo /></SoPremium>} />
          <Route path="/rituais" element={<Rituais />} />
          <Route path="/rituais/:id" element={<Ritual />} />
          <Route path="/clube" element={<ClubeOferta plano={plano} aoComprar={() => store.sessao().then((u) => u && setUsuario(u)).catch(() => {})} />} />
          <Route path="/asistente" element={<SoPremium plano={plano}><Assistente usuario={usuario} /></SoPremium>} />
          <Route path="/admin" element={<Admin usuario={usuario} />} />
          <Route path="/evolucao" element={<SoPremium plano={plano}><Evolucao usuario={usuario} total={DIAS.length} nomeApp={APP.nome} /></SoPremium>} />
          <Route path="/presentes" element={<Presentes />} />
          <Route path="/perfil" element={<Perfil usuario={usuario} plano={plano} aoMudarPlano={mudarPlano} aoAtualizar={setUsuario} aoSair={sair} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
