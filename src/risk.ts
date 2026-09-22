export const riskQuote = {
  name: 'Book',
} as const

export const riskVerdict = {
  label: '−4.0%',
  tone: 'down' as const,
  sub: 'Worst 5% avg · VaR −2.9%',
} as const

export const riskBets = {
  label: 'Effective bets',
  value: '2.6 / 5',
  fill: 2.6,
  rest: 2.4,
} as const

export const riskHoldings = [
  { name: 'NVDA', wt: 20, loss: 33, hot: true },
  { name: 'AAPL', wt: 20, loss: 28, hot: true },
  { name: 'BTCUSDT', wt: 20, loss: 23, hot: true },
  { name: 'MSFT', wt: 20, loss: 14, hot: false },
  { name: 'GOLD', wt: 20, loss: 4, hot: false },
] as const

export const riskLossMax = Math.max(...riskHoldings.map((h) => h.loss))

export const riskFacts = [
  { name: 'Pair', value: 'AAPL–NVDA 0.50 · MSFT–NVDA 0.43', tone: '' },
  { name: 'Worst', value: '27 Jan 25 −6.7%', tone: 'down' },
] as const

export const riskReadout = 'Trim NVDA first. Half the mix is imaginary.'
export const riskNote = 'Equal weight · From [Risk] · 5% tail.'
