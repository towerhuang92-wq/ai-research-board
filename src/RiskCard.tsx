import {
  riskBets,
  riskFacts,
  riskHoldings,
  riskLossMax,
  riskNote,
  riskQuote,
  riskReadout,
  riskVerdict,
} from './risk'

export default function RiskCard() {
  return (
    <article className="tile rating risk">
      <header className="band band-id">
        <div className="identity">
          <p className="who">
            <span className="kicker">Risk</span>
            {riskQuote.name}
          </p>
        </div>
      </header>

      <section className="band band-verdict">
        <div className="an-head">
          <p className={`gauge-verdict ${riskVerdict.tone}`}>{riskVerdict.label}</p>
          <p className="gauge-sub">{riskVerdict.sub}</p>
        </div>
        <div className="cluster">
          <div className="lead">
            <p className="lead-name">{riskBets.label}</p>
            <p className="lead-verdict">{riskBets.value}</p>
          </div>
          <div className="lead-bar" aria-hidden="true">
            <i className="fill-chart" style={{ flex: riskBets.fill }} />
            <i className="fill-rest" style={{ flex: riskBets.rest }} />
          </div>
        </div>
      </section>

      <section className="band band-proof">
        <div
          className="risk-book"
          role="img"
          aria-label="Loss share vs equal weight. Tick is weight."
        >
          {riskHoldings.map((r) => (
            <div key={r.name} className="risk-row">
              <div className="risk-id">
                <b>{r.name}</b>
                <span className={`num ${r.hot ? 'down' : ''}`}>{r.loss}%</span>
              </div>
              <div className="risk-track">
                <i className="risk-rail" />
                <i
                  className={`risk-fill ${r.hot ? 'hot' : 'cool'}`}
                  style={{ width: `${(r.loss / riskLossMax) * 100}%` }}
                />
                <i className="risk-wt" style={{ left: `${(r.wt / riskLossMax) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <ul className="risk-facts">
          {riskFacts.map((f) => (
            <li key={f.name}>
              <b>{f.name}</b>
              <span className={`num ${f.tone}`}>{f.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="band band-read close">
        <p className="readout">{riskReadout}</p>
        <p className="note">{riskNote}</p>
      </footer>
    </article>
  )
}
