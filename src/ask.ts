export type Field = 'sum' | 'quote' | 'score' | 'valu' | 'targets' | 'div' | 'trend'

export type Answer = {
  q: string
  cite: string
  a: string
  field: Field
}

export function citeAnswer(q: string): Answer {
  if (q.includes('杠杆') || q.includes('负债') || q.includes('记分卡')) {
    return {
      q,
      cite: '引自 基本面记分卡 · FCF / EPS，摘要 · 资产负债',
      a: '记分卡 FCF 136.7B（+42.1%）、EPS 8.72（+32.6%），负债滑块偏 more debt。摘要 D/E 0.78 vs 0.45。利润增速快于营收，杠杆式成长。',
      field: 'score',
    }
  }
  if (q.includes('近端') || q.includes('1M') || q.includes('一年')) {
    return {
      q,
      cite: '引自 股票概览 · 区间',
      a: '1M +8.58%，6M +34.05%，1Y +40.15%。近端弱于半年与一年。',
      field: 'quote',
    }
  }
  return {
    q,
    cite: '引自 摘要 · 目标价差距，估值倍数 · Fwd P/E',
    a: '现价 332.41 vs 平均目标 337.26，仅 +1.5%。Fwd P/E 35.9 vs 行业中位 23.6（+52%）。目标价空间不够覆盖溢价。',
    field: 'valu',
  }
}
