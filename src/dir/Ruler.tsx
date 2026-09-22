import { periods, suggestions, trend, headline } from '../data'
import { TrendChart } from '../charts'
import { useBoard } from '../use-board'
import './ruler.css'

function pct(value: number, min: number, max: number) {
  return `${((value - min) / (max - min)) * 100}%`
}

function Scale({
  name,
  min,
  max,
  current,
  currentLabel,
  refValue,
  refLabel,
  active,
}: {
  name: string
  min: number
  max: number
  current: number
  currentLabel: string
  refValue?: number
  refLabel?: string
  active?: boolean
}) {
  const ticks = [0, 25, 50, 75, 100]
  return (
    <section className="scale" data-active={active ? 'true' : 'false'} aria-label={name}>
      <div className="scale-head">
        <span>{name}</span>
        <span>
          {min} — {max}
        </span>
      </div>
      <div className="track">
        {ticks.map((t) => (
          <i key={t} className={t === 0 || t === 100 ? 'tick major' : 'tick'} style={{ left: `${t}%` }} />
        ))}
        {refValue != null ? (
          <b className="ref" style={{ left: pct(refValue, min, max) }} title={refLabel} />
        ) : null}
        <b className="needle" style={{ left: pct(current, min, max) }} />
        <span className="label" style={{ left: pct(current, min, max) }}>
          {currentLabel}
        </span>
      </div>
    </section>
  )
}

export function Ruler() {
  const b = useBoard()

  return (
    <div className="ruler">
      <header className="title">
        <div>
          <h1>AAPL 判断尺</h1>
          <p className="row-note">{headline}</p>
        </div>
        <div>
          <span className="price num">332.41</span>
          <span className="up"> +1.07（+0.32%）</span>
          <span> · Buy · Neutral / Medium / Position · 失效 236.65</span>
        </div>
      </header>

      <div className="body">
        <div className="scales">
          <Scale
            name="目标价 12M USD"
            min={245}
            max={405}
            current={332.41}
            currentLabel="现价 332.41"
            refValue={337.26}
            refLabel="均价 337.26"
            active={b.lit === 'targets' || b.lit === 'sum'}
          />
          <p className="row-note">上行 +1.5% · Current +2.3% vs 中位 · Average +3.8% · Sell 5 / Neu 13 / Buy 28</p>

          <Scale
            name="Fwd P/E vs 行业"
            min={10}
            max={50}
            current={35.9}
            currentLabel="35.9 现价倍数"
            refValue={23.6}
            refLabel="行业 23.6"
            active={b.lit === 'valu'}
          />
          <p className="row-note">Expensive +52% · P/S 10.4 vs 4.1（+158%）· P/E 38.1（+4%）· PEG 1.2 · P/B 66.6</p>

          <Scale
            name="盈利能力 ¢ / $ 营收"
            min={0}
            max={40}
            current={28}
            currentLabel="28¢ richer"
            active={b.lit === 'score'}
          />
          <Scale
            name="财务健康 D/E"
            min={0}
            max={1.2}
            current={0.78}
            currentLabel="0.78 more debt"
            refValue={0.45}
            refLabel="行业 0.45"
            active={b.lit === 'score'}
          />
          <p className="row-note">
            Leveraged grower · 营收 466.8B +14.2% · FCF 136.7B +42.1% · EPS 8.72 +32.6% · 净利 +29.9%
          </p>

          <Scale
            name="派息率"
            min={0}
            max={100}
            current={12}
            currentLabel="12% Safe"
            active={b.lit === 'div'}
          />
          <p className="row-note">股息率 0.32% · 增息 13 年 · 覆盖 6.3x · 2019–2025 DPS 无逐点源</p>

          <div>
            <div className="scale-head">
              <span>近端收益</span>
              <span>市值 4.9T · 量 36M · Beta 0.83</span>
            </div>
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
          </div>

          <section aria-label="收入与盈利趋势">
            <div className="scale-head">
              <span>趋势 Accelerating · 季度</span>
              <span>
                {trend.labels[0]}–{trend.labels.at(-1)} · CapEx TTM 10.0B
              </span>
            </div>
            <TrendChart />
            <p className="row-note">营收 +4.0% → +16.4%。MICRO–MEGA / LOW–HIGH / STEADY–VOLATILE</p>
            <button className="add" type="button" onClick={() => b.notice('方向稿：加一条尺')}>
              + 加一条尺
            </button>
          </section>
        </div>

        <aside className="callout" aria-label="读数">
          <h2>读数窗</h2>
          <div className="thread">
            {b.thread.length === 0 &&
              suggestions.map((s) => (
                <button key={s} className="suggest" type="button" onClick={() => b.send(s)}>
                  {s}
                </button>
              ))}
            {b.thread.map((item) => (
              <article key={item.q + item.a}>
                <p className="row-note">{item.cite}</p>
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
              placeholder="对准刻度提问"
              aria-label="提问"
            />
            <button className="send" type="submit">
              读数
            </button>
          </form>
        </aside>
      </div>
      {b.toast ? <div className="toast">{b.toast}</div> : null}
    </div>
  )
}
