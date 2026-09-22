export const cotQuote = {
  name: 'Gold',
  code: 'GOLD',
} as const

export const cotVerdict = {
  label: '+187K',
  tone: 'up' as const,
  sub: '86th · −8K w/w',
} as const

export const cotRange = {
  low: '−166K',
  high: '241K',
  mark: ((187 - -166) / (241 - -166)) * 100,
} as const

export const cotRows = [
  { name: 'Commercials', net: '−215K', chg: '+7K', netTone: 'down' as const, chgTone: 'up' as const },
  { name: 'Nonreportable', net: '+28K', chg: '+950', netTone: 'up' as const, chgTone: 'up' as const },
]

export const cotStats = [
  { id: 'oi', name: 'OI', value: '384K', hint: '+12K' },
  { id: 'long', name: 'Long', value: '227K' },
  { id: 'short', name: 'Short', value: '41K' },
] as const

export const cotHistory = [
  -72, -68, -70, -88, -80, -118, -74, -62, -48, -22,
  12, 28, 40, 52, 64, 78, 92, 108, 122, 138,
  150, 162, 170, 182, 172, 187,
]

export const cotHistMax = Math.max(...cotHistory.map((v) => Math.abs(v)))

export const cotReadout = 'Large specs long, trimmed this week.'
export const cotNote = 'From [COT] · Gold · W.'
