export const analystQuote = {
  name: 'NVIDIA',
  code: 'NVDA',
  price: '223.667',
  change: '−0.91%',
  priceNum: 223.667,
} as const

export const analystVerdict = {
  label: 'Strong buy',
  tone: 'up' as const,
  sell: 1,
  neutral: 2,
  buy: 66,
} as const

export const analystTotal =
  analystVerdict.sell + analystVerdict.neutral + analystVerdict.buy

export const analystTarget = {
  mean: 327.9,
  low: 180,
  high: 515,
  upside: '+46.6%',
} as const

export const analystStats = [
  { id: 'mean', name: 'Mean', value: '327.90' },
  { id: 'up', name: 'Upside', value: analystTarget.upside },
] as const

export const analystBins = [
  { px: 180, n: 1 },
  { px: 210, n: 1 },
  { px: 240, n: 2 },
  { px: 270, n: 4 },
  { px: 300, n: 10 },
  { px: 330, n: 18 },
  { px: 360, n: 14 },
  { px: 390, n: 8 },
  { px: 420, n: 5 },
  { px: 450, n: 3 },
  { px: 480, n: 2 },
  { px: 515, n: 1 },
] as const

export const analystBinMax = Math.max(...analystBins.map((b) => b.n))
export const analystSpan = analystTarget.high - analystTarget.low

export function analystPos(px: number) {
  return ((px - analystTarget.low) / analystSpan) * 100
}

export const analystReadout = 'Street packed above px. Mean inside range.'
export const analystNote = `From [Analyst] · 12M.`
