import {
  analystBinMax,
  analystBins,
  analystNote,
  analystPos,
  analystQuote,
  analystReadout,
  analystStats,
  analystTarget,
  analystTotal,
  analystVerdict,
} from './analyst'

export default function AnalystCard() {
  return (
    <article className="tile rating analyst">
      <header className="band band-id">
        <div className="identity">
          <p className="who">
            <span className="kicker">Analyst · 12M</span>
            {analystQuote.name} · {analystQuote.code}
          </p>
          <p className="quote">
            <span className="num px">{analystQuote.price}</span>
            <span className="num chg down">{analystQuote.change}</span>
          </p>
        </div>
      </header>

      <section className="band band-verdict">
        <div className="an-head">
          <p className={`gauge-verdict ${analystVerdict.tone}`}>{analystVerdict.label}</p>
          <p className="gauge-sub">
            {analystVerdict.buy}/{analystTotal}
          </p>
        </div>
        <div className="compose" aria-label="Analyst mix">
          <ul className="counts">
            <li>
              <b>Sell</b> <span className="num down">{analystVerdict.sell}</span>
            </li>
            <li>
              <b>Neu</b> <span className="num">{analystVerdict.neutral}</span>
            </li>
            <li>
              <b>Buy</b> <span className="num up">{analystVerdict.buy}</span>
            </li>
          </ul>
          <div className="mix" aria-hidden="true">
            <i className="mix-sell" style={{ flex: analystVerdict.sell }} />
            <i className="mix-mid" style={{ flex: analystVerdict.neutral }} />
            <i className="mix-buy" style={{ flex: analystVerdict.buy }} />
          </div>
        </div>
        <ul className="stats">
          {analystStats.map((s) => (
            <li key={s.id}>
              <b>{s.name}</b>
              <span className={`num ${s.id === 'up' ? 'up' : ''}`}>{s.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band band-targets">
        <div
          className="dist"
          role="img"
          aria-label={`12M targets from ${analystTarget.low} to ${analystTarget.high}. Mean ${analystTarget.mean}. Price ${analystQuote.priceNum}.`}
        >
          <div className="dist-plot">
            {analystBins.map((b) => (
              <i
                key={b.px}
                className="dist-col"
                style={{ height: `${(b.n / analystBinMax) * 48}px` }}
              />
            ))}
            <span
              className="dist-mark dist-px"
              style={{ left: `${analystPos(analystQuote.priceNum)}%` }}
            />
            <span
              className="dist-mark dist-mean"
              style={{ left: `${analystPos(analystTarget.mean)}%` }}
            />
          </div>
          <div className="dist-axis">
            <span className="num">{analystTarget.low}</span>
            <span className="num">{analystTarget.high}</span>
          </div>
        </div>
      </section>

      <footer className="band band-read close">
        <p className="readout">{analystReadout}</p>
        <p className="note">{analystNote}</p>
      </footer>
    </article>
  )
}
