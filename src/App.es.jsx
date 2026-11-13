import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate, NavLink, Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { Crown, Map, Gift, LineChart, User, Check, ChevronLeft, ChevronRight, ChevronDown, MessageCircle, LogOut, FileText, Trash2, ShoppingBasket, ShieldCheck, ChefHat, Clock, Sparkles, Flame, LifeBuoy } from 'lucide-react'
import { APP, DIAS, SEMANAS, SEGREDOS, PRESENTES, LISTA_COMPRAS, RECEITAS, CATEGORIAS, RITUAIS, PROTOCOLOS, RECEITA_DO_DIA } from './content.es'
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

        <form onSubmit={enviar} className="card mt-8 space-y-4 p-6">
          <div>
            <h2 className="titulo text-2xl">{criando ? 'Crea tu cuenta' : 'Bienvenida de nuevo'}</h2>
            {store.DEMO && <p className="mt-1 text-xs text-azul-700">Modo demostración: cualquier teléfono entra, y los datos quedan solo en este navegador.</p>}
          </div>
          {criando && (
            <input className="campo" placeholder="Tu nombre" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />
          )}
          <input className="campo" type="tel" inputMode="numeric" placeholder="Teléfono con código de país (solo números)" value={telefone} onChange={(e) => setTelefone(e.target.value)} autoComplete="tel" />
          <input className="campo" type="password" placeholder="Tu contraseña" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete={criando ? 'new-password' : 'current-password'} />
          <Erro>{erro}</Erro>
          <button className="btn-azul w-full" disabled={enviando}>{enviando ? 'Espera…' : criando ? 'Crear cuenta' : 'Entrar'}</button>
          <p className="text-center text-sm text-azul-700">
            {criando ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
            <button type="button" className="font-semibold text-ouro-700 underline" onClick={() => { setCriando(!criando); setErro('') }}>
              {criando ? 'Entrar' : 'Crear ahora'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Moldura
const abas = [
  { para: '/', rotulo: 'Inicio', Icone: Crown, fim: true },
  { para: '/jornada', rotulo: 'Camino', Icone: Map },
  { para: '/evolucao', rotulo: 'Evolución', Icone: LineChart },
  { para: '/presentes', rotulo: 'Regalos', Icone: Gift },
  { para: '/perfil', rotulo: 'Perfil', Icone: User },
]

function Moldura() {
  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col">
      <header className="flex items-center gap-3 bg-azul-900 px-5 py-4">
        <Marca tamanho="h-10 w-10 text-base" />
        <span className="font-serif text-xl font-bold tracking-wide text-white">{APP.nome}</span>
      </header>
      <main className="flex-1 px-5 pb-28 pt-6"><Outlet /></main>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-azul-100 bg-white">
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

// ------------------------------------------------------------------ Início
function Inicio({ usuario, feitos }) {
  const proximo = DIAS.find((d) => !feitos.includes(d.dia))
  const pct = Math.round((feitos.length / DIAS.length) * 100)
  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-gradient-to-br from-azul-800 to-azul-950 p-6 text-center text-white shadow-card">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-ouro-500 bg-azul-900"><Crown className="text-ouro-300" size={30} /></div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[.2em] text-ouro-300">{usuario.nome ? `Hola, ${usuario.nome.split(' ')[0]}` : 'Eres parte del'}</p>
        <h1 className="mt-1 font-serif text-4xl font-bold">{APP.plano}</h1>
        <p className="mt-1 text-xs text-ouro-200">{APP.frase}</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-ouro-500" style={{ width: `${pct}%` }} /></div>
        <p className="mt-2 text-sm text-azul-200">{feitos.length} de {DIAS.length} días completados</p>
      </section>

      {proximo ? (
        <Link to={`/jornada/${proximo.dia}`} className="btn-ouro w-full">Continuar en el día {proximo.dia} <ChevronRight size={18} /></Link>
      ) : (
        <p className="card p-5 text-center font-semibold">Completaste los {DIAS.length} días. ¡Felicitaciones!</p>
      )}

      <BlocoSegredos abertoInicial={false} />

      <div className="grid grid-cols-2 gap-3">
        <Link to="/protocolos" className="card flex flex-col justify-between p-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-azul-900 text-ouro-300"><LifeBuoy size={20} /></div>
          <div className="mt-3">
            <p className="font-semibold text-azul-900">Imprevistos</p>
            <p className="text-xs text-azul-700">10 protocolos prácticos</p>
          </div>
        </Link>
        <Link to="/rituais" className="card flex flex-col justify-between p-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-azul-900 text-ouro-300"><Flame size={20} /></div>
          <div className="mt-3">
            <p className="font-semibold text-azul-900">Rituales 7 min</p>
            <p className="text-xs text-azul-700">5 rutinas ligeras en casa</p>
          </div>
        </Link>
      </div>

      {APP.whatsapp && (
        <a className="btn-linha w-full" href={`https://wa.me/${APP.whatsapp}?text=${encodeURIComponent('Necesito ayuda')}`} target="_blank" rel="noreferrer">
          <MessageCircle size={18} className="text-ouro-600" /> {APP.whatsappRotulo}
        </a>
      )}
    </div>
  )
}

// ------------------------------------------------------------------ Jornada
function Jornada({ feitos }) {
  const hoje = DIAS.find((d) => !feitos.includes(d.dia))?.dia
  return (
    <div className="space-y-6">
      <div>
        <p className="sobretitulo">Tu camino</p>
        <h1 className="titulo">{DIAS.length} días, uno a la vez</h1>
      </div>
      <div className="space-y-3">
        <Link to="/compras" className="card flex items-center gap-4 p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300"><ShoppingBasket size={22} /></div>
          <div className="flex-1">
            <p className="font-semibold">Lista de compras de los 21 días</p>
            <p className="text-sm text-azul-700">Lo que debes tener en casa para todo el camino</p>
          </div>
          <ChevronRight size={18} className="text-azul-700" />
        </Link>
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
          <div className="grid grid-cols-4 gap-3">
            {DIAS.filter((d) => d.dia >= s.dias[0] && d.dia <= s.dias[1]).map((d) => {
              const feito = feitos.includes(d.dia)
              return (
                <Link key={d.dia} to={`/jornada/${d.dia}`} aria-label={`Día ${d.dia}${feito ? ', completado' : ''}`}
                  className={`relative grid aspect-square place-items-center rounded-2xl border text-center shadow-card transition active:scale-95 ${feito ? 'border-azul-900 bg-azul-900 text-white' : d.dia === hoje ? 'border-2 border-ouro-500 bg-white' : 'border-azul-100 bg-white'}`}>
                  <span>
                    <span className={`block text-[10px] uppercase tracking-widest ${feito ? 'text-ouro-300' : 'text-azul-700/70'}`}>{d.dia === hoje ? 'Hoy' : 'Día'}</span>
                    <span className="block font-serif text-2xl font-bold">{d.dia}</span>
                  </span>
                  {feito && <Check size={14} className="absolute right-2 top-2 text-ouro-300" />}
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
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar('/jornada')}><ChevronLeft size={18} /> Camino</button>
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
                  <Link to={`/receitas/${r.id}`} className="flex items-center gap-3 px-5 py-3.5">
                    <div className="flex-1">
                      <p className="font-semibold">{r.titulo}</p>
                      <p className="text-xs text-azul-700">{r.tag || `${r.tempo} · ${r.rende}`}</p>
                    </div>
                    <ChevronRight size={18} className="text-azul-700" />
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
      <div>
        <p className="sobretitulo">{r.tag || r.categoria}</p>
        <h1 className="titulo">{r.titulo}</h1>
        {r.descricao && <p className="mt-2 text-sm leading-relaxed text-azul-800">{r.descricao}</p>}
        <p className="mt-2 flex items-center gap-2 text-xs font-medium text-azul-700"><Clock size={15} className="text-ouro-600" /> {r.tempo} · {r.quandoTomar || r.rende}</p>
      </div>

      {r.quandoTomar && (
        <section className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-4 text-white shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ouro-300">Mejor horario</p>
          <p className="mt-1 font-semibold">{r.quandoTomar}</p>
          {r.quandoDica && <p className="mt-1 text-xs text-azul-200">{r.quandoDica}</p>}
        </section>
      )}

      {r.beneficios && r.beneficios.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="text-sm font-semibold text-azul-700">Lo que esta receta hace en tu cuerpo</h2>
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
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300">
                <LifeBuoy size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ouro-600">{p.tag}</p>
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
  const p = PROTOCOLOS.find((x) => x.id === id)
  if (!p) return <Navigate to="/protocolos" replace />
  return (
    <div className="space-y-5">
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Protocolos</button>
      <div>
        <p className="sobretitulo">{p.tag}</p>
        <h1 className="titulo">{p.titulo}</h1>
        <p className="mt-2 text-sm leading-relaxed text-azul-800">{p.descricao}</p>
      </div>

      <section className="card space-y-2 p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-ouro-700">Lo que pasa</p>
        <p className="text-sm leading-relaxed text-azul-800">{p.acontece}</p>
        {p.solucao && <p className="pt-1 text-sm font-semibold text-azul-900">{p.solucao}</p>}
      </section>

      {p.frase && (
        <div className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-5 text-center font-serif text-lg italic text-ouro-200 shadow-card">
          "{p.frase}"
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-azul-700">Qué hacer paso a paso</h2>
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
          <h2 className="font-semibold text-red-700">Lo que no debes hacer</h2>
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
          <p className="font-semibold text-ouro-700">Recuerda</p>
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
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ouro-300 to-ouro-500 text-azul-950">
                <Flame size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ouro-600">{r.tag}</p>
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
      <button className="flex items-center gap-1 text-sm font-medium text-azul-700" onClick={() => navegar(-1)}><ChevronLeft size={18} /> Rituales</button>
      <div>
        <p className="sobretitulo">{r.tag}</p>
        <h1 className="titulo">{r.titulo}</h1>
        <p className="mt-2 text-sm leading-relaxed text-azul-800">{r.descricao}</p>
      </div>

      {r.quandoFazer && (
        <section className="rounded-2xl bg-gradient-to-br from-azul-900 to-azul-950 p-4 text-white shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ouro-300">Cuándo hacerlo</p>
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
          <h2 className="text-sm font-semibold text-azul-700">Beneficios de este ritual</h2>
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
        <h2 className="text-sm font-semibold text-azul-700">Los 4 movimientos (7 minutos)</h2>
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
        <p className="sobretitulo">Lista de compras</p>
        <h1 className="titulo">Lo que debes tener en casa</h1>
        <p className="mt-2 text-sm text-azul-700">{marcados.length} de {total} artículos marcados. Las marcas quedan guardadas en este dispositivo.</p>
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
      {marcados.length > 0 && <button className="btn-linha w-full" onClick={() => { setMarcados([]); store.guardado.set('clube.compras', []) }}>Desmarcar todo</button>}
    </div>
  )
}

// ------------------------------------------------------------------ Presentes
function Presentes() {
  const [erro, setErro] = useState('')
  const [abrindo, setAbrindo] = useState('')

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
        <p className="sobretitulo">Regalos exclusivos</p>
        <h1 className="titulo">Materiales para ti</h1>
        <p className="mt-1 text-sm text-azul-700">Guías prácticas y e-books completos incluidos en tu acceso.</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-azul-700">Guías Interactivas del Club</h2>
        <Link to="/protocolos" className="card flex items-center gap-4 p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300"><LifeBuoy size={22} /></div>
          <div className="flex-1">
            <p className="font-semibold">10 Protocolos para Imprevistos</p>
            <p className="text-sm text-azul-700">Qué hacer cuando la rutina se sale del plan</p>
          </div>
          <ChevronRight size={18} className="text-azul-700" />
        </Link>
        <Link to="/receitas" className="card flex items-center gap-4 p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300"><ChefHat size={22} /></div>
          <div className="flex-1">
            <p className="font-semibold">14 Recetas Poderosas</p>
            <p className="text-sm text-azul-700">Tés, shots, aguas y bebidas funcionales</p>
          </div>
          <ChevronRight size={18} className="text-azul-700" />
        </Link>
        <Link to="/rituais" className="card flex items-center gap-4 p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-azul-900 text-ouro-300"><Flame size={22} /></div>
          <div className="flex-1">
            <p className="font-semibold">5 Rituales de 7 Minutos</p>
            <p className="text-sm text-azul-700">Movimientos ligeros en casa para destrabar la quema de grasa</p>
          </div>
          <ChevronRight size={18} className="text-azul-700" />
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-azul-700">E-books en PDF para descargar</h2>
        <Erro>{erro}</Erro>
        <ul className="space-y-3">
          {PRESENTES.map((p) => {
            const corpo = (
              <>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ouro-300 to-ouro-500 text-azul-950"><FileText size={22} /></div>
                <div className="flex-1">
                  <p className="font-semibold">{p.titulo}</p>
                  <p className="text-sm text-azul-700">{p.arquivo ? p.descricao : 'Próximamente'}</p>
                </div>
                {p.arquivo && <ChevronRight size={18} className="text-azul-700" />}
              </>
            )
            return (
              <li key={p.titulo}>
                {p.arquivo
                  ? <button type="button" className="card flex w-full items-center gap-4 p-4 text-left" disabled={abrindo === p.titulo} onClick={() => abrir(p)}>{corpo}</button>
                  : <div className="card flex items-center gap-4 p-4 opacity-70">{corpo}</div>}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

// ------------------------------------------------------------------ Perfil
function Perfil({ usuario, aoAtualizar, aoSair }) {
  const [nome, setNome] = useState(usuario.nome)
  const [aviso, setAviso] = useState('')
  const [erro, setErro] = useState('')

  async function salvar(e) {
    e.preventDefault()
    setErro(''); setAviso('')
    try { aoAtualizar(await store.salvarNome(usuario, nome)); setAviso('Nombre guardado.') } catch (err) { setErro(err.message) }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="sobretitulo">Mi cuenta</p>
        <h1 className="titulo">Perfil</h1>
      </div>
      <form onSubmit={salvar} className="card space-y-3 p-5">
        <label className="block text-sm font-medium">Nombre
          <input className="campo mt-1" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <p className="text-sm text-azul-700">Teléfono: {usuario.telefone}</p>
        <Erro>{erro}</Erro>
        {aviso && <p className="text-sm font-medium text-azul-700">{aviso}</p>}
        <button className="btn-azul w-full">Guardar</button>
      </form>
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
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')

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
    try { await store.liberarAcesso(telefone, nome); setTelefone(''); setNome(''); await carregar() } catch (err) { setErro(err.message) }
  }

  async function remover(tel) {
    setErro('')
    try { await store.removerAcesso(tel); await carregar() } catch (err) { setErro(err.message) }
  }

  const concluiram = pessoas.filter((p) => p.dias >= DIAS.length).length
  const numeros = [['Accesos habilitados', lista.length], ['Cuentas creadas', pessoas.length], ['Completaron', concluiram]]

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
        <p className="text-sm text-azul-700">Solo quien está en esta lista puede crear una cuenta con el teléfono indicado.</p>
        <input className="campo" type="tel" inputMode="numeric" placeholder="Teléfono con código de país (solo números)" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <input className="campo" placeholder="Nombre (opcional)" value={nome} onChange={(e) => setNome(e.target.value)} />
        <Erro>{erro}</Erro>
        <button className="btn-azul w-full">Habilitar</button>
      </form>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-azul-700">Accesos habilitados</h2>
        {lista.length === 0 ? <p className="card p-5 text-sm text-azul-700">Aún no hay teléfonos habilitados.</p> : (
          <ul className="card divide-y divide-azul-100">
            {lista.map((a) => (
              <li key={a.telefone} className="flex items-center gap-3 px-5 py-3 text-sm">
                <div className="flex-1">
                  <p className="font-semibold">{a.telefone}</p>
                  <p className="text-azul-700">{a.nome || 'Sin nombre'} · {new Date(a.liberado_em).toLocaleDateString('es-419')}</p>
                </div>
                <button className="rounded-lg border border-azul-200 px-3 py-1.5 text-xs font-medium hover:bg-red-50 hover:text-red-700" onClick={() => remover(a.telefone)}>Quitar</button>
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
                <p className="text-azul-700">{p.telefone}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-azul-100"><div className="h-full rounded-full bg-ouro-500" style={{ width: `${(p.dias / DIAS.length) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

// ------------------------------------------------------------------ App
export default function App() {
  const [usuario, setUsuario] = useState(undefined) // undefined = carregando
  const [feitos, setFeitos] = useState([])

  useEffect(() => { store.sessao().then(setUsuario).catch(() => setUsuario(null)) }, [])
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

  if (usuario === undefined) return <div className="grid h-full place-items-center bg-azul-900"><Marca /></div>
  if (!usuario) return <Entrada aoEntrar={setUsuario} />

  return (
    <HashRouter>
      <Routes>
        <Route element={<Moldura />}>
          <Route path="/" element={<Inicio usuario={usuario} feitos={feitos} />} />
          <Route path="/jornada" element={<Jornada feitos={feitos} />} />
          <Route path="/jornada/:n" element={<Dia feitos={feitos} aoMarcar={marcar} />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/receitas/:id" element={<Receita />} />
          <Route path="/protocolos" element={<Protocolos />} />
          <Route path="/protocolos/:id" element={<Protocolo />} />
          <Route path="/rituais" element={<Rituais />} />
          <Route path="/rituais/:id" element={<Ritual />} />
          <Route path="/admin" element={<Admin usuario={usuario} />} />
          <Route path="/evolucao" element={<Evolucao usuario={usuario} total={DIAS.length} nomeApp={APP.nome} />} />
          <Route path="/presentes" element={<Presentes />} />
          <Route path="/perfil" element={<Perfil usuario={usuario} aoAtualizar={setUsuario} aoSair={sair} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
