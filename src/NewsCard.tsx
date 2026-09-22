import {
  newsMix,
  newsNote,
  newsQuote,
  newsReadout,
  newsTape,
  newsVerdict,
  newsWatch,
} from './news'

function toneClass(tone: string) {
  if (tone === 'Pos') return 'up'
  if (tone === 'Neg') return 'down'
  return 'mute'
}

function Story({
  title,
  source,
  when,
  tone,
}: {
  title: string
  source: string
  when: string
  tone: string
}) {
  return (
    <div className="news-item">
      <p className="news-title">{title}</p>
      <p className="news-meta">
        <span className={toneClass(tone)}>{tone}</span>
        {` · ${source} · ${when}`}
      </p>
    </div>
  )
}

export default function NewsCard() {
  return (
    <article className="tile rating news">
      <header className="band band-id">
        <div className="identity">
          <p className="who">
            <span className="kicker">News</span>
            {newsQuote.name} · {newsQuote.code}
          </p>
          <p className="quote">
            <span className="num px">{newsQuote.price}</span>
            <span className="num chg down">{newsQuote.change}</span>
          </p>
        </div>
      </header>

      <section className="band band-verdict">
        <div className="an-head">
          <p className={`gauge-verdict ${newsVerdict.tone}`}>{newsVerdict.label}</p>
          <p className="gauge-sub">{newsVerdict.sub}</p>
        </div>
        <div className="compose" aria-label="News mix">
          <ul className="counts">
            <li>
              <b>Pos</b> <span className="num up">{newsMix.pos}</span>
            </li>
            <li>
              <b>Neu</b> <span className="num">{newsMix.neu}</span>
            </li>
            <li>
              <b>Neg</b> <span className="num down">{newsMix.neg}</span>
            </li>
          </ul>
          <div className="mix" aria-hidden="true">
            <i className="mix-buy" style={{ flex: newsMix.pos }} />
            <i className="mix-mid" style={{ flex: newsMix.neu }} />
            <i className="mix-sell" style={{ flex: newsMix.neg }} />
          </div>
        </div>
      </section>

      <section className="band band-proof">
        <div className="cluster">
          <div className="lead">
            <p className="lead-name">Watch</p>
          </div>
          <div className="news-list">
            {newsWatch.map((r) => (
              <Story key={r.title} {...r} />
            ))}
          </div>
        </div>
        <div className="cluster">
          <div className="news-list">
            {newsTape.map((r) => (
              <Story key={r.title} {...r} />
            ))}
          </div>
        </div>
      </section>

      <footer className="band band-read close">
        <p className="readout">{newsReadout}</p>
        <p className="note">{newsNote}</p>
      </footer>
    </article>
  )
}
