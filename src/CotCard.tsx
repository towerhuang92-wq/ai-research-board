import {
  cotHistMax,
  cotHistory,
  cotNote,
  cotQuote,
  cotRange,
  cotReadout,
  cotRows,
  cotStats,
  cotVerdict,
} from './cot'

export default function CotCard() {
  return (
    <article className="tile rating cot">
      <header className="band band-id">
        <div className="identity">
          <p className="who">
            <span className="kicker">COT</span>
            {cotQuote.name} · {cotQuote.code}
          </p>
        </div>
      </header>

      <section className="band band-verdict">
        <div className="an-head">
          <p className={`gauge-verdict ${cotVerdict.tone}`}>{cotVerdict.label}</p>
          <p className="gauge-sub">{cotVerdict.sub}</p>
        </div>
        <div className="cot-range" aria-hidden="true">
          <i className="cot-range-track" />
          <i className="cot-range-mark" style={{ left: `${cotRange.mark}%` }} />
        </div>
        <div className="dist-axis">
          <span className="num">{cotRange.low}</span>
          <span className="num">{cotRange.high}</span>
        </div>
      </section>

      <section className="band band-proof">
        <table className="table">
          <caption className="visually-hidden">Other COT categories</caption>
          <colgroup>
            <col className="c-name" />
            <col className="c-val" />
            <col className="c-tone" />
          </colgroup>
          <tbody>
            {cotRows.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td className={`num ${r.netTone}`}>{r.net}</td>
                <td className={`num ${r.chgTone}`}>{r.chg}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="stats cot-stats">
          {cotStats.map((s) => (
            <li key={s.id}>
              <b>{s.name}</b>
              <span className="num">
                {s.value}
                {'hint' in s && s.hint ? <span className="faint"> {s.hint}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band band-targets">
        <div className="cot-hist" role="img" aria-label="Large spec net, 26 weeks">
          {cotHistory.map((v, i) => (
            <span key={i} className="cot-col">
              <i
                className={v >= 0 ? (i === cotHistory.length - 1 ? 'cot-now' : 'cot-up') : 'cot-down'}
                style={{
                  height: `${(Math.abs(v) / cotHistMax) * 40}px`,
                  top: v >= 0 ? `${40 - (Math.abs(v) / cotHistMax) * 40}px` : 40,
                }}
              />
            </span>
          ))}
        </div>
        <div className="dist-axis">
          <span>Jan</span>
          <span>Jul</span>
        </div>
      </section>

      <footer className="band band-read close">
        <p className="readout">{cotReadout}</p>
        <p className="note">{cotNote}</p>
      </footer>
    </article>
  )
}
