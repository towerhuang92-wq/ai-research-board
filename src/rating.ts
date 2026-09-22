export type Tone = 'up' | 'down' | 'mute'

export type PeriodId = '15m' | '1h' | '4h' | '1D' | '1W' | '1M'

export const quote = {
  name: 'Apple',
  code: 'AAPL',
  price: '315.334',
  change: '-0.28%',
  delayed: false,
  priceNum: 315.334,
} as const

export const verdict = {
  label: 'Neutral',
  tone: 'mute' as Tone,
  sell: 7,
  neutral: 10,
  buy: 9,
} as const

export const totalSignals = verdict.sell + verdict.neutral + verdict.buy
export const consensusShare = Math.round((verdict.neutral / totalSignals) * 100)
export const consensus = consensusShare < 50 ? 'Weak' : 'Firm'

export const mas = {
  sma50: 316.477,
  sma200: 284.355,
} as const

export const vs50 = ((quote.priceNum - mas.sma50) / mas.sma50) * 100
export const vs200 = ((quote.priceNum - mas.sma200) / mas.sma200) * 100
export const maSpan = mas.sma50 - mas.sma200
export const priceOnMa = ((quote.priceNum - mas.sma200) / maSpan) * 100

const oscItems = [
  { name: 'RSI (14)', value: '49.335', hint: 'Mid', label: 'Neu', tone: 'mute' as Tone },
  { name: 'MACD (12,26)', value: '-1.80', hint: 'Hist+', label: 'Buy', tone: 'up' as Tone },
]

const maItems = [
  { name: 'SMA (50)', value: '316.477', hint: `${vs50.toFixed(2)}%`, label: 'Sell', tone: 'down' as Tone },
  { name: 'SMA (200)', value: '284.355', hint: `+${vs200.toFixed(1)}%`, label: 'Buy', tone: 'up' as Tone },
]

export const proof = [
  {
    id: 'osc',
    title: 'Oscillators',
    tone: 'mute' as Tone,
    label: 'Neutral',
    bar: { rest: 2, fill: 1 },
    items: oscItems,
  },
  {
    id: 'ma',
    title: 'Moving averages',
    tone: 'up' as Tone,
    label: 'Buy',
    bar: { rest: 1, fill: 2 },
    items: maItems,
  },
] as const

export const periods: {
  id: PeriodId
  label: string
  dir: 'up' | 'down' | 'flat'
}[] = [
  { id: '15m', label: '15m', dir: 'flat' },
  { id: '1h', label: '1H', dir: 'down' },
  { id: '4h', label: '4H', dir: 'flat' },
  { id: '1D', label: '1D', dir: 'flat' },
  { id: '1W', label: '1W', dir: 'up' },
  { id: '1M', label: '1M', dir: 'up' },
]

export const readout = 'Trend up, mom flat. Near 50, above 200.'

export const note = 'Neu 10 · Buy 9 · Sell 7. ADX 13.5.'
