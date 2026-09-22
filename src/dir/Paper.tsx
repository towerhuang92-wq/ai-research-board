import { periods, scoreRows, suggestions, trend, headline } from '../data'
import { Spark, TrendChart } from '../charts'
import { useBoard } from '../use-board'
import './paper.css'

export function Paper() {
  const b = useBoard()
  const cut = (id: typeof b.lit) => (b.lit === id ? ' col is-cut' : ' col')

  return (
    <div className="paper">
      <header className="mast">
        <div className="kicker">
          <span>AAPL · NASDAQ · 2026-09-18</span>
          <span>失效价位 236.65 USD · Not investment advice</span>
        </div>
        <h1>APPLE 判断纸</h1>
        <p className="deck">
          {headline}　现价 <span className="num">332.41</span>
          <span className="up"> +1.07（+0.32%）</span>
          　Buy　Neutral / Medium / Position
        </p>
      </header>

      <div className="folio">
        <section className={cut('sum')} aria-label="摘要">
          <h2>社论</h2>
          <p>
            Fwd P/E 35.9 vs 行业 23.6（+52%）；P/S 10.4 vs 4.1（+158%）；PEG 1.2 vs 0.8。
            营收 +14.2%，EPS +32.6%，净利 +29.9%，季度营收从 +4.0% 加速至 +16.4%。
          </p>
          <p className="note">
            净利率 27.6% vs 10.5%；ROE 148.8%；ROA 36.1%。D/E 0.78 vs 0.45；流动比 1.0033。
            现价 332.41 vs 目标 337.26（+1.5%）。46 人：28 买 / 13 持有 / 5 卖。
          </p>
          <p className="note">
            优势 FCF 136.68B（+42.1%），13 年增息，派息率 12%。风险：35.9x 依赖中双位数增长。
            财报 2026-10-29（42 天）。
          </p>
        </section>

        <section className={cut('quote')} aria-label="股票概览">
          <h2>市况</h2>
          <div className="price num">332.41</div>
          <p className="up">+1.07（+0.32%）</p>
          <Spark />
          <div className="tabs" role="tablist">
            {periods.map((p) => (
              <button
                key={p.id}
                className="tab"
                type="button"
                role="tab"
                aria-selected={b.period === p.id}
                onClick={() => b.setPeriod(p.id)}
              >
                {p.label} {p.pct}
              </button>
            ))}
          </div>
          <p className="note">市值 4.9T · 量 36M · Beta 0.83</p>
          <p>MICRO—MEGA　LOW—HIGH　STEADY—VOLATILE</p>
          <p className="note">1M +8.58%，6M +34.05%，1Y +40.15%。近端弱于半年与一年。</p>
        </section>

        <section className={cut('targets')} aria-label="分析师目标价">
          <h2>目标</h2>
          <div className="price num">337.26</div>
          <p className="up">上行 +1.5%</p>
          <p>245.00 — 405.00</p>
          <p className="note">Current 332.41（+2.3%）· Average 337.26（+3.8%）</p>
          <div className="tags">
            <span className="tag">Sell 5</span>
            <span className="tag">Neu 13</span>
            <span className="tag">Buy 28</span>
          </div>
          <p className="note">买入 28/46（61%）。目标溢价不够覆盖 35.9x 回撤。</p>
        </section>

        <section
          className={b.lit === 'score' || b.lit === 'valu' || b.lit === 'div' ? 'col is-cut' : 'col'}
          aria-label="记分卡与估值"
        >
          <h2>记分 · 估值</h2>
          <p>Leveraged grower</p>
          <table>
            <thead>
              <tr>
                <th>科目</th>
                <th>TTM</th>
                <th>同比</th>
              </tr>
            </thead>
            <tbody>
              {scoreRows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td className="num">{row[1]}</td>
                  <td className={row[2].startsWith('+') ? 'up num' : 'num'}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note">盈利 28¢ / 美元营收 · 负债 0.78 D/E</p>
          <p>
            Expensive　Fwd P/E 35.9（+52%）　P/S 10.4（+158%）　P/E 38.1（+4%）
          </p>
          <p className="note">溢价主因远期 PE 与 P/S。</p>
          <p>
            股息 0.32%　Safe payout　派息率 12%　增息 13 年　覆盖 6.3x
          </p>
          <button className="add" type="button" onClick={() => b.notice('方向稿：加栏，不编造模块')}>
            + 加一栏
          </button>
        </section>

        <aside className="col ask-col" aria-label="问讯">
          <h2>问讯</h2>
          <p className="mute">只切纸上已有的栏</p>
          <div className="thread">
            {b.thread.length === 0 &&
              suggestions.map((s) => (
                <button key={s} className="suggest" type="button" onClick={() => b.send(s)}>
                  {s}
                </button>
              ))}
            {b.thread.map((item) => (
              <article className="cite" key={item.q + item.a}>
                <p className="mute">{item.cite}</p>
                <p>
                  <strong>问</strong> {item.q}
                </p>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
          <form
            className="composer"
            onSubmit={(e) => {
              e.preventDefault()
              b.send(b.ask)
            }}
          >
            <input
              value={b.ask}
              onChange={(e) => b.setAsk(e.target.value)}
              placeholder="在纸上提问"
              aria-label="提问"
            />
            <button className="send" type="submit">
              付印
            </button>
          </form>
        </aside>
      </div>

      <section className={b.lit === 'trend' ? 'plate is-cut' : 'plate'} aria-label="收入与盈利趋势">
        <div>
          <h2>趋势 · Accelerating</h2>
          <p className="note">
            季度 {trend.labels[0]}–{trend.labels.at(-1)}　左 FLOWS　右 EPS
          </p>
          <p className="note">营收同比 +4.0% → +16.4%。CapEx 无历史；TTM 10.0B。DPS 柱无逐点源。</p>
        </div>
        <TrendChart />
      </section>
      {b.toast ? <div className="toast">{b.toast}</div> : null}
    </div>
  )
}
