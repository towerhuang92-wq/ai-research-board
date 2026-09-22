import { useState } from 'react'
import {
  consensus,
  note,
  periods,
  proof,
  quote,
  totalSignals,
  verdict,
  type PeriodId,
} from './rating'
import VolumeCard from './VolumeCard'
import AnalystCard from './AnalystCard'
import CotCard from './CotCard'
import RiskCard from './RiskCard'
import NewsCard from './NewsCard'

function polar(cx: number, cy: number, r: number, a: number) {
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) }
}

function Gauge() {
  const score = (verdict.buy + verdict.neutral * 0.5) / totalSignals
  const n = 31
  const cx = 96
  const cy = 96
  const r = 80
  const k = 0.55228475
  const marks = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    if (i === 0 || i === n - 1 || t > score) return null
    const a = Math.PI * (1 - t)
    const len = i % 5 === 0 ? 2.4 : 1.4
    return {
      i,
      a0: polar(cx, cy, r - len, a),
      a1: polar(cx, cy, r + len, a),
    }
  }).filter((t) => t !== null)
  const semi = (rad: number) => {
    const L = polar(cx, cy, rad, Math.PI)
    const T = polar(cx, cy, rad, Math.PI / 2)
    const R = polar(cx, cy, rad, 0)
    const c = rad * k
    return `M ${L.x} ${L.y} C ${L.x} ${L.y - c}, ${T.x - c} ${T.y}, ${T.x} ${T.y} C ${T.x + c} ${T.y}, ${R.x} ${R.y - c}, ${R.x} ${R.y}`
  }

  return (
    <section className="gauge" aria-label={`Verdict ${verdict.label}, ${consensus}`}>
      <div className="gauge-plot">
        <svg className="gauge-svg" viewBox="0 0 192 100" role="img">
          <title>{`Rating ${verdict.label}, sell ${verdict.sell}, neu ${verdict.neutral}, buy ${verdict.buy}`}</title>
          <defs>
            <linearGradient
              id="gauge-sheen"
              x1={cx}
              y1={cy - r}
              x2={cx}
              y2={cy}
              gradientUnits="userSpaceOnUse"
            >
              <stop className="sheen-top" offset="0" />
              <stop className="sheen-bot" offset="1" />
            </linearGradient>
          </defs>
          <path className="gauge-track" d={semi(r)} pathLength={1} />
          <path
            className="gauge-value"
            d={semi(r)}
            pathLength={1}
            strokeDasharray={`${score} 1`}
          />
          {marks.map((t) => (
            <line key={t.i} x1={t.a0.x} y1={t.a0.y} x2={t.a1.x} y2={t.a1.y} className="tick" />
          ))}
        </svg>
        <div className="gauge-copy">
          <p className="gauge-verdict">{verdict.label}</p>
          <p className="gauge-sub">
            {consensus} · {verdict.neutral}/{totalSignals}
          </p>
        </div>
      </div>
    </section>
  )
}

function Arrow({ dir }: { dir: 'up' | 'down' | 'flat' }) {
  if (dir === 'up') return <span className="up">↑</span>
  if (dir === 'down') return <span className="down">↓</span>
  return <span className="mute">→</span>
}

export default function App() {
  const [period, setPeriod] = useState<PeriodId>('1D')

  return (
    <main className="canvas canvas-single canvas-board">
      <article className="tile rating">
        <header className="band band-id">
          <div className="identity">
            <p className="who">
              <span className="kicker">Rating</span>
              {quote.name} · {quote.code}
            </p>
            <p className="quote">
              <span className="num px">{quote.price}</span>
              <span className="num chg down">{quote.change}</span>
            </p>
          </div>

          <div className="tf" role="tablist" aria-label="Timeframe">
            {periods.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                className={`tf-cell ${p.dir}`}
                aria-selected={period === p.id}
                onClick={() => setPeriod(p.id)}
              >
                <span>{p.label}</span>
                <Arrow dir={p.dir} />
              </button>
            ))}
          </div>
        </header>

        <section className="band band-verdict">
          <Gauge />

          <div className="compose" aria-label="Signal mix">
          <ul className="counts">
            <li>
              <b>Sell</b> <span className="num down">{verdict.sell}</span>
            </li>
            <li>
              <b>Neu</b> <span className="num">{verdict.neutral}</span>
            </li>
            <li>
              <b>Buy</b> <span className="num up">{verdict.buy}</span>
            </li>
          </ul>
          <div className="mix" aria-hidden="true">
            <i className="mix-sell" style={{ flex: verdict.sell }} />
            <i className="mix-mid" style={{ flex: verdict.neutral }} />
            <i className="mix-buy" style={{ flex: verdict.buy }} />
          </div>
          </div>
        </section>

        <section className="band band-proof">
          {proof.map((g) => (
            <div key={g.id} className="cluster">
              <div className="lead">
                <p className="lead-name">{g.title}</p>
                <p
                  className={`lead-verdict ${
                    g.tone === 'mute' ? 'mute' : g.tone === 'up' ? 'up' : 'down'
                  }`}
                >
                  {g.label}
                </p>
              </div>
              <div className="lead-bar" aria-hidden="true">
                <i className={`fill-${g.tone}`} style={{ flex: g.bar.fill }} />
                <i className="fill-rest" style={{ flex: g.bar.rest }} />
              </div>
              <table className="table">
                <caption className="visually-hidden">{g.title}</caption>
                <colgroup>
                  <col className="c-name" />
                  <col className="c-val" />
                  <col className="c-hint" />
                  <col className="c-tone" />
                </colgroup>
                <tbody>
                  {g.items.map((r) => (
                    <tr key={r.name}>
                      <td>{r.name}</td>
                      <td className="num">{r.value}</td>
                      <td className="faint">{r.hint}</td>
                      <td className={r.tone === 'mute' ? 'mute' : r.tone === 'up' ? 'up' : 'down'}>
                        {r.label}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>

        <footer className="band band-read close">
          <p className="readout">Trend up, mom flat. Near 50, above 200.</p>
          <p className="note">
            From [Rating] · {periods.find((p) => p.id === period)?.label}: {note}
          </p>
        </footer>
      </article>
      <VolumeCard />
      <AnalystCard />
      <CotCard />
      <RiskCard />
      <NewsCard />
    </main>
  )
}
