import {
  volumeLevels,
  volumeNote,
  volumePxTop,
  volumeQuote,
  volumeReadout,
  volumeStats,
  volumeVerdict,
} from './volume'

export default function VolumeCard() {
  return (
    <article className="tile rating volume">
      <header className="band band-id">
        <div className="identity">
          <p className="who">
            <span className="kicker">Volume</span>
            {volumeQuote.name}
          </p>
          <p className="quote">
            <span className="num px">{volumeQuote.price}</span>
          </p>
        </div>
      </header>

      <section className="band band-verdict">
        <p className={`gauge-verdict ${volumeVerdict.tone}`}>{volumeVerdict.label}</p>
        <ul className="stats">
          {volumeStats.map((s) => (
            <li key={s.id}>
              <b>{s.name}</b>
              <span className="num">{s.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band band-profile">
        <div
          className="vp"
          role="img"
          aria-label="Volume profile. Price above value area. POC 220."
        >
          {volumeLevels.map((l) => (
            <div key={l.price} className="vp-row">
              <span className="num vp-px">{l.price.toFixed(0)}</span>
              <span className="vp-track">
                <i className={`vp-${l.zone}`} style={{ width: `${l.vol}%` }} />
              </span>
            </div>
          ))}
          <div className="vp-now" style={{ top: volumePxTop }} aria-hidden="true" />
        </div>
      </section>

      <footer className="band band-read close">
        <p className="readout">{volumeReadout}</p>
        <p className="note">{volumeNote}</p>
      </footer>
    </article>
  )
}
