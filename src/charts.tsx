import { useMemo } from 'react'
import { spark, trend } from './data'

export function Spark({ values = spark }: { values?: number[] }) {
  const d = useMemo(() => {
    const max = Math.max(...values)
    const min = Math.min(...values)
    const w = 360
    const h = 56
    return values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * w
        const y = h - ((v - min) / (max - min)) * (h - 8) - 4
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      })
      .join(' ')
  }, [values])
  return (
    <svg className="spark" viewBox="0 0 360 56" aria-hidden>
      <path d={`${d} L360,56 L0,56 Z`} className="spark-fill" />
      <path d={d} className="spark-line" />
    </svg>
  )
}

export function TrendChart() {
  const w = 720
  const h = 160
  const toPath = (arr: number[], min: number, max: number) =>
    arr
      .map((v, i) => {
        const x = (i / (arr.length - 1)) * w
        const y = h - 16 - ((v - min) / (max - min)) * (h - 28)
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      })
      .join(' ')
  const flowMin = 40
  const flowMax = 150
  const rev = toPath(trend.rev, flowMin, flowMax)
  const gross = toPath(trend.gross, flowMin, flowMax)
  const eps = toPath(
    trend.eps.map((n) => n * 40),
    flowMin,
    flowMax,
  )
  return (
    <svg className="chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="收入与盈利趋势">
      <path d={`${rev} L${w},${h} L0,${h} Z`} className="chart-rev-fill" />
      <path d={rev} className="chart-rev" />
      <path d={`${gross} L${w},${h} L0,${h} Z`} className="chart-gross-fill" />
      <path d={gross} className="chart-gross" />
      <path d={eps} className="chart-eps" />
    </svg>
  )
}
