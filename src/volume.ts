export type VpZone = 'out' | 'va' | 'poc'

export const volumeQuote = {
  name: 'AAPL',
  code: 'AAPL',
  price: '229.35',
  priceNum: 229.35,
} as const

export const volumeVerdict = {
  label: 'Above value area',
  tone: 'up' as const,
} as const

export const volumeStats = [
  { id: 'poc', name: 'POC', value: '220.00' },
  { id: 'dist', name: 'vs POC', value: '−4.1%' },
  { id: 'va', name: 'VA', value: '213–227' },
  { id: 'width', name: 'Width', value: '6.1%' },
] as const

export const volumeLevels: {
  price: number
  vol: number
  zone: VpZone
}[] = [
  { price: 236, vol: 8, zone: 'out' },
  { price: 232, vol: 8, zone: 'out' },
  { price: 228, vol: 18, zone: 'out' },
  { price: 224, vol: 62, zone: 'va' },
  { price: 220, vol: 100, zone: 'poc' },
  { price: 216, vol: 64, zone: 'va' },
  { price: 212, vol: 28, zone: 'out' },
  { price: 208, vol: 10, zone: 'out' },
]

export const volumeRow = 16
export const volumeGap = 8
export const volumeStride = volumeRow + volumeGap
export const volumeHi = volumeLevels[0].price
export const volumeStep = volumeLevels[0].price - volumeLevels[1].price
export const volumePxTop =
  ((volumeHi - volumeQuote.priceNum) / volumeStep) * volumeStride + volumeRow / 2

export const volumeReadout = 'Accepted higher. Above 180-day VA.'
export const volumeNote = 'From [Volume] · 180D.'
