export const newsQuote = {
  name: 'Apple',
  code: 'AAPL',
  price: '315.334',
  change: '−0.28%',
} as const

export const newsVerdict = {
  label: 'Mixed',
  tone: 'mute' as const,
  sub: '5 stories · 1D',
} as const

export const newsMix = {
  pos: 2,
  neu: 1,
  neg: 2,
} as const

export const newsWatch = [
  { title: 'iPhone 17 delayed', source: 'BBG', when: '2h', tone: 'Neg' },
  { title: 'On-device AI this fall', source: 'CNBC', when: '1d', tone: 'Pos' },
] as const

export const newsTape = [
  { title: 'Services hits record', source: 'WSJ', when: '5h', tone: 'Pos' },
  { title: 'EU fine review paused', source: 'RT', when: '8h', tone: 'Neu' },
  { title: 'China hours cut', source: 'FT', when: '1d', tone: 'Neg' },
] as const

export const newsReadout = 'Split tape. Fade the delay. AI still bids.'
export const newsNote = 'From [News] · AAPL · 1D.'
