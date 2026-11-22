// Painel "Funil do quiz" (Admin): retenção por tela do quiz, como a retenção de uma VSL.
// Os dados vêm de quiz_funil (Supabase). Uma visita = uma abertura do quiz; não há respostas, nome nem e-mail aqui.
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'
import * as store from './store'

const TELAS = {
  home: 'Abriu o quiz (1ª tela)', age: 'Idade (iniciou o quiz)', body: 'Tipo de corpo', areas: 'Áreas do corpo', alone: '"No estás sola"',
  news: 'Reportagem', name: 'Nome', email: 'E-mail (tela)', motivation: 'O que incomoda (passou do e-mail)', attempts: 'Tentativas anteriores',
  biology: '"Tu cuerpo aprendió a resistirse"', barriers: 'O que impede', comparison: 'Comparação com Ozempic', goals: 'Objetivos',
  bloating: 'Inchaço', mechanism: 'Como o produto age', weight: 'Peso atual', height: 'Altura', target: 'Peso desejado', routine: 'Rotina',
  sleep: 'Sono', projection: 'Projeção de resultado', commitment: 'Compromisso', firstResult: 'Primeiro resultado', analysis: 'Analisando…',
  report: 'Análise pronta', testimonials: 'Depoimentos', generating: 'Gerando o plano…', sales: 'OFERTA (pitch)', preco: 'Viu o preço', cta: 'Clicou em "Quiero empezar"',
}
const NOMES_CHAVE = {
  v: 'Versão da 1ª tela (v)',
  utm_campaign: 'Campanha (utm_campaign)', utm_content: 'Anúncio (utm_content)', utm_source: 'Fonte (utm_source)', utm_medium: 'Mídia (utm_medium)',
  utm_term: 'Posicionamento (utm_term)', sub1: 'sub1', sub2: 'sub2', sub3: 'sub3', sub4: 'sub4', sub5: 'sub5', sub6: 'sub6', sub7: 'sub7', sub8: 'sub8',
}
const hojeFortaleza = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Fortaleza' }).format(new Date())
const somarDias = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10) }
const pct = (a, b) => (b > 0 ? (a / b) * 100 : 0)
const fmtPct = (v) => (v >= 10 || v === 0 ? v.toFixed(0) : v.toFixed(1)).replace('.', ',') + '%'
const fmtSeg = (s) => (s == null ? '—' : s < 60 ? `${Math.round(s)} s` : `${Math.floor(s / 60)} min ${String(Math.round(s % 60)).padStart(2, '0')} s`)
const brData = (iso) => iso.slice(8, 10) + '/' + iso.slice(5, 7)

const PERIODOS = [['Hoje', 0, 0], ['Ontem', -1, -1], ['7 dias', -6, 0], ['30 dias', -29, 0]]

export default function FunilQuiz({ usuario }) {
  const hoje = hojeFortaleza()
  const [de, setDe] = useState(somarDias(hoje, -6))
  const [ate, setAte] = useState(hoje)
  const [chave, setChave] = useState('utm_campaign')
  const [filtro, setFiltro] = useState(null) // { chave, valor }
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (!usuario?.admin) return
    let vivo = true
    setCarregando(true); setErro('')
    store.funilQuiz(de, ate, filtro?.chave || null, filtro?.valor || null)
      .then((d) => { if (vivo) setDados(d) })
      .catch((e) => { if (vivo) setErro(e.message) })
      .finally(() => { if (vivo) setCarregando(false) })
    return () => { vivo = false }
  }, [de, ate, filtro, usuario?.admin])

  const n = useMemo(() => Object.fromEntries((dados?.passos || []).map((p) => [p.passo, p])), [dados])
  const chaves = useMemo(() => [...new Set((dados?.origens || []).map((o) => o.chave))], [dados])
  const chaveAtiva = chaves.includes(chave) ? chave : chaves[0]
  const linhasOrigem = (dados?.origens || []).filter((o) => o.chave === chaveAtiva)

  if (!usuario?.admin) return null
  const visitas = dados?.sessoes || 0
  const q = (p) => n[p]?.n || 0
  // maiores quedas entre telas seguidas (só telas com gente suficiente para a queda não ser acaso)
  const quedas = (dados?.passos || []).map((p, i, l) => (i === 0 ? null : { passo: p.passo, perda: pct(l[i - 1].n - p.n, l[i - 1].n), base: l[i - 1].n }))
    .filter((x) => x && x.base >= 30 && x.passo !== 'preco' && x.passo !== 'cta')
  const piores = new Set([...quedas].sort((a, b) => b.perda - a.perda).slice(0, 3).filter((x) => x.perda >= 5).map((x) => x.passo))
  const periodoAtivo = (ini, fim) => de === somarDias(hoje, ini) && ate === somarDias(hoje, fim)

  const Cartao = ({ titulo, valor, sub }) => (
    <div className="card p-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-azul-700">{titulo}</p>
      <p className="mt-0.5 font-serif text-2xl font-bold leading-tight text-azul-900">{valor}</p>
      {sub && <p className="text-[11px] text-azul-700">{sub}</p>}
    </div>
  )

  return (
    <div className="space-y-5 pb-10">
      <Link to="/admin" className="flex items-center gap-1 text-sm font-medium text-azul-700"><ChevronLeft size={18} /> Administración</Link>
      <div>
        <p className="sobretitulo">Quiz · ritualmetabolico.com</p>
        <h1 className="titulo">Funil do quiz</h1>
        <p className="mt-1 text-xs leading-relaxed text-azul-700">Quantas visitas chegam a cada tela, como a retenção de uma VSL. Dias no horário de Fortaleza.</p>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {PERIODOS.map(([rotulo, ini, fim]) => (
            <button key={rotulo} type="button" onClick={() => { setDe(somarDias(hoje, ini)); setAte(somarDias(hoje, fim)) }}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${periodoAtivo(ini, fim) ? 'border-azul-900 bg-azul-900 text-white' : 'border-azul-200 bg-white text-azul-900'}`}>{rotulo}</button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-azul-800">
          <input type="date" className="campo !w-auto !px-2 !py-1.5 text-xs" value={de} max={ate} onChange={(e) => e.target.value && setDe(e.target.value)} aria-label="De" />
          <span>até</span>
          <input type="date" className="campo !w-auto !px-2 !py-1.5 text-xs" value={ate} min={de} max={hoje} onChange={(e) => e.target.value && setAte(e.target.value)} aria-label="Até" />
        </div>
        {filtro && (
          <button type="button" onClick={() => setFiltro(null)} className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-ouro-100 px-3 py-1.5 text-xs font-semibold text-ouro-700">
            <span className="truncate">{NOMES_CHAVE[filtro.chave] || filtro.chave}: {filtro.valor}</span> <X size={14} className="shrink-0" />
          </button>
        )}
      </div>

      {erro && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{erro}</p>}
      {carregando && !dados && <p className="text-sm text-azul-700">Carregando…</p>}

      {dados && (
        <>
          {visitas === 0 ? (
            <p className="card p-4 text-sm text-azul-800">Nenhuma visita registrada neste período. O registro começa quando a nova versão do quiz é publicada.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <Cartao titulo="Visitas" valor={visitas.toLocaleString('pt-BR')} sub={`${fmtPct(pct(dados.celular || 0, visitas))} no celular`} />
                <Cartao titulo="Iniciaram o quiz" valor={fmtPct(pct(q('age'), visitas))} sub={`${q('age').toLocaleString('pt-BR')} visitas`} />
                <Cartao titulo="Passaram do e-mail" valor={fmtPct(pct(q('motivation'), visitas))} sub={`${fmtPct(pct(q('motivation'), q('email')))} de quem viu a tela`} />
                <Cartao titulo="Chegaram à oferta" valor={fmtPct(pct(q('sales'), visitas))} sub={`${q('sales').toLocaleString('pt-BR')} · mediana ${fmtSeg(n.sales?.mediana)}`} />
                <Cartao titulo="Viram o preço" valor={fmtPct(pct(q('preco'), q('sales')))} sub="de quem chegou à oferta" />
                <Cartao titulo="Clicaram no CTA" valor={fmtPct(pct(q('cta'), q('sales')))} sub={`${fmtPct(pct(q('cta'), visitas))} das visitas · ${q('cta').toLocaleString('pt-BR')}`} />
              </div>
              {visitas < 200 && <p className="rounded-xl bg-azul-100 px-3 py-2 text-xs leading-relaxed text-azul-800">Amostra pequena ({visitas} visitas): diferenças de poucos pontos entre telas ou campanhas podem ser acaso.</p>}

              <section>
                <h2 className="mb-2 text-sm font-bold text-azul-900">Retenção por tela</h2>
                <div className="card divide-y divide-azul-100">
                  {dados.passos.map((p, i) => {
                    const ret = pct(p.n, visitas), ant = i > 0 ? dados.passos[i - 1].n : p.n, perda = i > 0 ? pct(ant - p.n, ant) : 0
                    const marco = p.passo === 'sales' || p.passo === 'cta'
                    return (
                      <div key={p.passo} className={`px-3.5 py-2 ${marco ? 'bg-ouro-100/50' : ''}`}>
                        <div className="flex items-baseline justify-between gap-2">
                          <p className={`min-w-0 truncate text-xs ${marco ? 'font-bold' : 'font-medium'} text-azul-900`}><span className="mr-1.5 text-azul-700/70">{i + 1}</span>{TELAS[p.passo] || p.passo}</p>
                          <p className="shrink-0 text-xs font-bold tabular-nums text-azul-900">{fmtPct(ret)} <span className="font-normal text-azul-700">· {p.n.toLocaleString('pt-BR')}</span></p>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-azul-100"><div className={`h-full rounded-full ${marco ? 'bg-ouro-500' : 'bg-azul-800'}`} style={{ width: `${Math.max(ret, 0.5)}%` }} /></div>
                        <p className="mt-0.5 flex justify-between text-[11px] text-azul-700">
                          <span>{i === 0 ? 'entrada' : <span className={piores.has(p.passo) ? 'font-bold text-red-700' : ''}>−{fmtPct(perda)} vs. tela anterior</span>}</span>
                          <span>{p.n > 0 && i > 0 ? `chega em ${fmtSeg(p.mediana)}` : ''}</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-azul-700">Em vermelho: as 3 maiores quedas entre telas seguidas. "Chega em" é a mediana do tempo desde a abertura do quiz.</p>
              </section>

              {chaves.length > 0 && (
                <section>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h2 className="text-sm font-bold text-azul-900">Por origem</h2>
                    <select className="campo !w-auto !px-2 !py-1.5 text-xs" value={chaveAtiva} onChange={(e) => setChave(e.target.value)} aria-label="Agrupar por">
                      {chaves.map((k) => <option key={k} value={k}>{NOMES_CHAVE[k] || k}</option>)}
                    </select>
                  </div>
                  <div className="card overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead><tr className="text-[11px] uppercase tracking-wide text-azul-700">
                        <th className="px-3 py-2 font-semibold">Valor</th><th className="px-2 py-2 text-right font-semibold">Visitas</th><th className="px-2 py-2 text-right font-semibold">Início</th><th className="px-2 py-2 text-right font-semibold">Oferta</th><th className="px-3 py-2 text-right font-semibold">CTA</th>
                      </tr></thead>
                      <tbody className="divide-y divide-azul-100">
                        {linhasOrigem.map((o) => (
                          <tr key={o.valor} className="cursor-pointer hover:bg-ouro-100/40" onClick={() => setFiltro({ chave: chaveAtiva, valor: o.valor })}>
                            <td className="max-w-[150px] truncate px-3 py-2 font-medium text-azul-900" title={o.valor}>{o.valor}</td>
                            <td className="px-2 py-2 text-right tabular-nums">{o.sessoes.toLocaleString('pt-BR')}</td>
                            <td className="px-2 py-2 text-right tabular-nums">{fmtPct(pct(o.inicio, o.sessoes))}</td>
                            <td className="px-2 py-2 text-right tabular-nums">{fmtPct(pct(o.oferta, o.sessoes))}</td>
                            <td className="px-3 py-2 text-right tabular-nums">{fmtPct(pct(o.cta, o.sessoes))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-azul-700">Percentuais sobre as visitas de cada linha. Toque numa linha para ver o funil só dela. A tabela mostra o período todo, sem o filtro.</p>
                </section>
              )}

              {dados.dias.length > 1 && (
                <section>
                  <h2 className="mb-2 text-sm font-bold text-azul-900">Por dia</h2>
                  <div className="card overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead><tr className="text-[11px] uppercase tracking-wide text-azul-700">
                        <th className="px-3 py-2 font-semibold">Dia</th><th className="px-2 py-2 text-right font-semibold">Visitas</th><th className="px-2 py-2 text-right font-semibold">Início</th><th className="px-2 py-2 text-right font-semibold">Oferta</th><th className="px-3 py-2 text-right font-semibold">CTA</th>
                      </tr></thead>
                      <tbody className="divide-y divide-azul-100">
                        {dados.dias.map((d) => (
                          <tr key={d.dia}>
                            <td className="px-3 py-2 font-medium text-azul-900">{brData(d.dia)}</td>
                            <td className="px-2 py-2 text-right tabular-nums">{d.sessoes.toLocaleString('pt-BR')}</td>
                            <td className="px-2 py-2 text-right tabular-nums">{fmtPct(pct(d.inicio, d.sessoes))}</td>
                            <td className="px-2 py-2 text-right tabular-nums">{fmtPct(pct(d.oferta, d.sessoes))}</td>
                            <td className="px-3 py-2 text-right tabular-nums">{fmtPct(pct(d.cta, d.sessoes))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </>
          )}
          <p className="text-[11px] leading-relaxed text-azul-700">
            Como ler: uma visita é uma abertura do quiz numa aba (recarregar a página não conta de novo). Quem usa bloqueador pode não ser contado.
            Compras não aparecem aqui: use a Konnektive e o RedTrack para vendas. Respostas, nome e e-mail não são gravados.
          </p>
        </>
      )}
    </div>
  )
}
