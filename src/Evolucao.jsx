// Tela "Evolução": registro dia a dia (peso, foto e como a pessoa está se sentindo).
// É usada pelos dois idiomas; os textos ficam em PT e ES logo abaixo.
import { useEffect, useRef, useState } from 'react'
import { Camera, Plus, Pencil, Share2, Trash2, X } from 'lucide-react'
import * as store from './store'

const PT = {
  sobretitulo: 'Minha evolução',
  titulo: 'Acompanhe seu progresso',
  diasRegistrados: (n, total) => `${n} de ${total} dias registrados`,
  semPeso: 'Registre seu peso em pelo menos dois dias para ver o gráfico.',
  inicial: 'Peso inicial',
  atual: 'Peso atual',
  diferenca: 'Diferença',
  compartilhar: 'Compartilhar minha evolução',
  diaADia: 'Dia a dia',
  toque: 'Toque para registrar ou editar',
  dia: 'Dia',
  naoRegistrado: 'Ainda não registrado',
  registrar: 'Registrar',
  editar: 'Editar',
  registrarDia: (n) => `Registrar dia ${n}`,
  preencha: 'Preencha o que quiser e toque em salvar.',
  peso: 'Peso',
  fotoDoDia: 'Foto do dia',
  adicionarFoto: 'Adicionar foto',
  trocarFoto: 'Trocar foto',
  removerFoto: 'Remover foto',
  sentindo: 'Como estou me sentindo',
  humores: { mal: 'Mal', normal: 'Normal', bem: 'Bem' },
  salvar: 'Salvar',
  salvando: 'Salvando…',
  apagar: 'Apagar este registro',
  fechar: 'Fechar',
  comFoto: 'com foto',
  vazio: 'Preencha pelo menos um campo.',
  pesoInvalido: 'Informe um peso válido.',
  graficoAlt: (a, b) => `Peso de ${a} kg para ${b} kg`,
  textoCompartilhar: ({ app, n, total, inicial, atual, dif }) =>
    `Minha evolução no ${app}: ${n} de ${total} dias registrados.` +
    (inicial && atual && inicial !== atual ? ` Peso: ${inicial} kg → ${atual} kg (${dif} kg).` : atual ? ` Peso atual: ${atual} kg.` : ''),
  copiado: 'Texto copiado. Cole onde quiser compartilhar.',
}

const ES = {
  sobretitulo: 'Mi evolución',
  titulo: 'Sigue tu progreso',
  diasRegistrados: (n, total) => `${n} de ${total} días registrados`,
  semPeso: 'Registra tu peso en al menos dos días para ver el gráfico.',
  inicial: 'Peso inicial',
  atual: 'Peso actual',
  diferenca: 'Diferencia',
  compartilhar: 'Compartir mi evolución',
  diaADia: 'Día a día',
  toque: 'Toca para registrar o editar',
  dia: 'Día',
  naoRegistrado: 'Aún sin registrar',
  registrar: 'Registrar',
  editar: 'Editar',
  registrarDia: (n) => `Registrar el día ${n}`,
  preencha: 'Completa lo que quieras y toca guardar.',
  peso: 'Peso',
  fotoDoDia: 'Foto del día',
  adicionarFoto: 'Agregar foto',
  trocarFoto: 'Cambiar foto',
  removerFoto: 'Quitar foto',
  sentindo: 'Cómo me siento',
  humores: { mal: 'Mal', normal: 'Normal', bem: 'Bien' },
  salvar: 'Guardar',
  salvando: 'Guardando…',
  apagar: 'Borrar este registro',
  fechar: 'Cerrar',
  comFoto: 'con foto',
  vazio: 'Completa al menos un campo.',
  pesoInvalido: 'Ingresa un peso válido.',
  graficoAlt: (a, b) => `Peso de ${a} kg a ${b} kg`,
  textoCompartilhar: ({ app, n, total, inicial, atual, dif }) =>
    `Mi evolución en ${app}: ${n} de ${total} días registrados.` +
    (inicial && atual && inicial !== atual ? ` Peso: ${inicial} kg → ${atual} kg (${dif} kg).` : atual ? ` Peso actual: ${atual} kg.` : ''),
  copiado: 'Texto copiado. Pégalo donde quieras compartirlo.',
}

const T = import.meta.env.VITE_IDIOMA === 'es' ? ES : PT
const EMOJI = { mal: '😞', normal: '😐', bem: '😄' }
const kg = (v) => String(Number(v).toFixed(1)).replace('.', ',')

// Reduz a foto antes de enviar (lado maior com até 1280 px, JPEG), para abrir rápido e ocupar pouco espaço.
async function reduzirFoto(arquivo, lado = 1280) {
  const url = URL.createObjectURL(arquivo)
  try {
    const img = await new Promise((ok, falha) => {
      const i = new Image()
      i.onload = () => ok(i)
      i.onerror = falha
      i.src = url
    })
    const escala = Math.min(1, lado / Math.max(img.width, img.height))
    const tela = document.createElement('canvas')
    tela.width = Math.round(img.width * escala)
    tela.height = Math.round(img.height * escala)
    tela.getContext('2d').drawImage(img, 0, 0, tela.width, tela.height)
    return await new Promise((ok) => tela.toBlob(ok, 'image/jpeg', 0.82))
  } finally {
    URL.revokeObjectURL(url)
  }
}

function Grafico({ pontos }) {
  if (pontos.length < 2) return <p className="py-3 text-center text-xs text-azul-200">{T.semPeso}</p>
  const L = 320, A = 120, m = 14
  const pesos = pontos.map((p) => Number(p.peso))
  const min = Math.min(...pesos), max = Math.max(...pesos), faixa = max - min || 1
  const xy = pesos.map((p, i) => [m + (i * (L - 2 * m)) / (pesos.length - 1), A - m - ((p - min) * (A - 2 * m)) / faixa])
  return (
    <svg viewBox={`0 0 ${L} ${A}`} className="w-full" role="img" aria-label={T.graficoAlt(kg(pesos[0]), kg(pesos.at(-1)))}>
      <polyline fill="none" stroke="#e7cf8f" strokeWidth="2.5" strokeLinejoin="round" points={xy.map((p) => p.join(',')).join(' ')} />
      {xy.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#c9a24d" stroke="#fff" strokeWidth="1.5" />)}
    </svg>
  )
}

function Registrar({ usuario, dia, registro, aoFechar, aoSalvar }) {
  const [peso, setPeso] = useState(registro?.peso != null ? kg(registro.peso) : '')
  const [humor, setHumor] = useState(registro?.humor || '')
  const [previa, setPrevia] = useState(registro?.fotoUrl || '')
  const [arquivo, setArquivo] = useState(null) // nova foto escolhida
  const [removerFoto, setRemoverFoto] = useState(false)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const campoFoto = useRef(null)

  async function escolherFoto(e) {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    try {
      const blob = await reduzirFoto(f)
      setArquivo(blob)
      setRemoverFoto(false)
      setPrevia(URL.createObjectURL(blob))
    } catch { setErro(T.vazio) }
  }

  function tirarFoto() {
    setArquivo(null)
    setPrevia('')
    setRemoverFoto(true)
  }

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    const texto = String(peso).replace(',', '.').trim()
    const numero = texto === '' ? null : Number(texto)
    if (numero !== null && !(numero > 0 && numero < 500)) return setErro(T.pesoInvalido)
    const temFoto = arquivo || (registro?.foto && !removerFoto)
    if (numero === null && !humor && !temFoto) return setErro(T.vazio)
    setEnviando(true)
    try {
      await store.salvarDiario(usuario, dia, { peso: numero, humor: humor || null, arquivo, removerFoto })
      await aoSalvar()
      aoFechar()
    } catch (err) { setErro(err.message) } finally { setEnviando(false) }
  }

  async function apagar() {
    setEnviando(true)
    try { await store.apagarDiario(usuario, dia); await aoSalvar(); aoFechar() } catch (err) { setErro(err.message) } finally { setEnviando(false) }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-azul-950/60 sm:items-center" onClick={aoFechar}>
      <form onSubmit={salvar} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-md space-y-5 overflow-y-auto rounded-t-3xl bg-creme p-6 shadow-card sm:rounded-3xl">
        <div className="relative text-center">
          <button type="button" aria-label={T.fechar} className="absolute -right-2 -top-2 p-2 text-azul-700" onClick={aoFechar}><X size={20} /></button>
          <h2 className="font-serif text-2xl font-bold text-azul-900">{T.registrarDia(dia)}</h2>
          <p className="mt-1 text-sm text-azul-700">{T.preencha}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="evo-peso">{T.peso}</label>
          <div className="relative">
            <input id="evo-peso" className="campo py-4 pr-14 text-2xl font-semibold" inputMode="decimal" placeholder="00,0" value={peso} onChange={(e) => setPeso(e.target.value)} />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-azul-700">kg</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">{T.fotoDoDia}</p>
          <input ref={campoFoto} type="file" accept="image/*" className="hidden" onChange={escolherFoto} />
          {previa && <img src={previa} alt={T.fotoDoDia} className="mb-3 max-h-64 w-full rounded-2xl object-cover" />}
          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-ouro-500 bg-white px-4 py-4 font-semibold text-ouro-700" onClick={() => campoFoto.current?.click()}>
            <Camera size={18} /> {previa ? T.trocarFoto : T.adicionarFoto}
          </button>
          {previa && <button type="button" className="mt-2 w-full text-center text-sm text-azul-700 underline" onClick={tirarFoto}>{T.removerFoto}</button>}
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">{T.sentindo}</p>
          <div className="grid grid-cols-3 gap-3">
            {Object.keys(EMOJI).map((h) => (
              <button key={h} type="button" aria-pressed={humor === h} onClick={() => setHumor(humor === h ? '' : h)}
                className={`rounded-2xl border px-2 py-3 text-center transition ${humor === h ? 'border-ouro-500 bg-ouro-100 ring-2 ring-ouro-300' : 'border-azul-200 bg-white'}`}>
                <span className="block text-2xl">{EMOJI[h]}</span>
                <span className="mt-1 block text-sm font-semibold">{T.humores[h]}</span>
              </button>
            ))}
          </div>
        </div>

        {erro && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{erro}</p>}
        <button className="btn-azul w-full" disabled={enviando}>{enviando ? T.salvando : T.salvar}</button>
        {registro && (
          <button type="button" className="flex w-full items-center justify-center gap-2 text-sm text-azul-700 hover:text-red-600" disabled={enviando} onClick={apagar}>
            <Trash2 size={15} /> {T.apagar}
          </button>
        )}
      </form>
    </div>
  )
}

export default function Evolucao({ usuario, total, nomeApp }) {
  const [lista, setLista] = useState([])
  const [aberto, setAberto] = useState(null) // número do dia em edição
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')

  const carregar = () => store.diario(usuario).then(setLista).catch((e) => setErro(e.message))
  useEffect(() => { carregar() }, [])

  const porDia = Object.fromEntries(lista.map((r) => [r.dia, r]))
  const comPeso = lista.filter((r) => r.peso != null).sort((a, b) => a.dia - b.dia)
  const inicial = comPeso[0]?.peso, atual = comPeso.at(-1)?.peso
  const dif = comPeso.length > 1 ? Number(atual) - Number(inicial) : null
  const difTexto = dif === null ? '—' : `${dif > 0 ? '+' : ''}${kg(dif)}`

  async function compartilhar() {
    setAviso('')
    const text = T.textoCompartilhar({
      app: nomeApp, n: lista.length, total,
      inicial: inicial != null ? kg(inicial) : '', atual: atual != null ? kg(atual) : '', dif: difTexto,
    })
    try {
      if (navigator.share) await navigator.share({ text })
      else { await navigator.clipboard.writeText(text); setAviso(T.copiado) }
    } catch { /* a pessoa cancelou o compartilhamento */ }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="sobretitulo">{T.sobretitulo}</p>
        <h1 className="titulo">{T.titulo}</h1>
      </div>

      <section className="rounded-3xl border border-ouro-500 bg-gradient-to-br from-azul-800 to-azul-950 p-5 text-white shadow-card">
        <p className="text-center text-sm font-semibold text-ouro-300">{T.diasRegistrados(lista.length, total)}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-ouro-500" style={{ width: `${(lista.length / total) * 100}%` }} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[[T.inicial, inicial != null ? `${kg(inicial)} kg` : '—'], [T.atual, atual != null ? `${kg(atual)} kg` : '—'], [T.diferenca, dif === null ? '—' : `${difTexto} kg`]].map(([rotulo, valor]) => (
            <div key={rotulo}>
              <p className="text-[10px] uppercase tracking-widest text-azul-200">{rotulo}</p>
              <p className="mt-1 font-serif text-xl font-bold">{valor}</p>
            </div>
          ))}
        </div>
        <div className="mt-3"><Grafico pontos={comPeso} /></div>
      </section>

      <button type="button" className="btn-ouro w-full" onClick={compartilhar}><Share2 size={18} /> {T.compartilhar}</button>
      {aviso && <p className="text-center text-sm text-azul-700">{aviso}</p>}
      {erro && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{erro}</p>}

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-semibold">{T.diaADia}</h2>
          <p className="text-xs text-azul-700">{T.toque}</p>
        </div>
        <ul className="space-y-3">
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
            const r = porDia[n]
            const resumo = r ? [r.peso != null && `${kg(r.peso)} kg`, r.humor && `${EMOJI[r.humor]} ${T.humores[r.humor]}`, r.foto && !r.fotoUrl && T.comFoto].filter(Boolean).join(' · ') : T.naoRegistrado
            return (
              <li key={n}>
                <button type="button" onClick={() => setAberto(n)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left ${r ? 'border-azul-100 bg-white shadow-card' : 'border-dashed border-ouro-500/50 bg-white/50'}`}>
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border text-center ${r ? 'border-azul-900 bg-azul-900 text-white' : 'border-ouro-500/50 text-azul-700'}`}>
                    <span>
                      <span className={`block text-[8px] font-semibold uppercase tracking-widest ${r ? 'text-ouro-300' : ''}`}>{T.dia}</span>
                      <span className="block font-serif text-lg font-bold leading-none">{n}</span>
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{T.dia} {n}</span>
                    <span className="block truncate text-sm text-azul-700">{resumo || T.comFoto}</span>
                  </span>
                  {r?.fotoUrl && <img src={r.fotoUrl} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />}
                  <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold ${r ? 'border border-azul-200 text-azul-900' : 'bg-gradient-to-br from-ouro-300 to-ouro-500 text-azul-950'}`}>
                    {r ? <Pencil size={14} /> : <Plus size={15} />} {r ? T.editar : T.registrar}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {aberto && <Registrar usuario={usuario} dia={aberto} registro={porDia[aberto]} aoFechar={() => setAberto(null)} aoSalvar={carregar} />}
    </div>
  )
}
