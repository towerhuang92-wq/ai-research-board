import { periods, scoreRows, suggestions, valuRows, headline } from '../data'
import { Spark, TrendChart } from '../charts'
import { useBoard } from '../use-board'
import './stage.css'

export function Stage() {
  const b = useBoard()
  const lit = (id: typeof b.lit) => (b.lit === id ? ' layer is-lit' : ' layer')

  return (
    <div className="stage">
      <section className="prompter" aria-label="问答舞台">
        <div>
          <p className="eyebrow">舞台</p>
          <h1>先问，再亮数据。</h1>
          <p className="lede">
            {headline}
            场灯默认熄灭。被引用的栏才获得亮度。不下单。
          </p>
        </div>
        <div className="thread">
          {b.thread.length === 0 &&
            suggestions.map((s) => (
              <button key={s} className="suggest" type="button" onClick={() => b.send(s)}>
                {s}
              </button>
            ))}
          {b.thread.map((item) => (
            <article className="cite" key={item.q + item.a}>
              <p className="src">{item.cite}</p>
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
            placeholder="点名看板上的一列"
            aria-label="提问"
          />
          <button className="send" type="submit">
            上场
          </button>
        </form>
      </section>

      <div className="field" aria-label="数据场">
        <article className={lit('sum')}>
          <h2>摘要</h2>
          <p>Neutral · Medium · Position · 失效 236.65</p>
          <p>Fwd P/E 35.9 vs 23.6（+52%）。目标 332.41 vs 337.26（+1.5%）。FCF 136.68B（+42.1%）。财报 10-29。</p>
        </article>
        <article className={lit('quote')}>
          <h2>AAPL · Apple Inc. · NASDAQ · Buy</h2>
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
          <p>4.9T · 36M · Beta 0.83 · MICRO–MEGA / LOW–HIGH / STEADY–VOLATILE</p>
        </article>
        <article className={lit('targets')}>
          <h2>目标价 12M</h2>
          <p>
            均价 <span className="num">337.26</span>　<span className="up">+1.5%</span>　245–405　Buy 指针　Sell 5 / Neu 13 / Buy 28
          </p>
        </article>
        <article className={lit('score')}>
          <h2>记分卡 · Leveraged grower</h2>
          <table>
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
          <p>盈利 richer 28¢ · 负债 more debt 0.78</p>
        </article>
        <article className={lit('valu')}>
          <h2>估值 · Expensive</h2>
          <table>
            <tbody>
              {valuRows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td className="num">{row[1]}</td>
                  <td className="down num">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className={lit('div')}>
          <h2>股息</h2>
          <p>
            0.32% · Safe payout · 派息 12% · 13 年 · 覆盖 6.3x
          </p>
          <button className="add" type="button" onClick={() => b.notice('方向稿：加一层，不编造')}>
            + 加一层
          </button>
        </article>
        <article className={lit('trend')}>
          <h2>趋势 · Accelerating · 季度</h2>
          <TrendChart />
          <p>营收 +4.0% → +16.4%。CapEx 无历史 TTM 10.0B。DPS 无逐点源。</p>
        </article>
      </div>
      {b.toast ? <div className="toast">{b.toast}</div> : null}
    </div>
  )
}
