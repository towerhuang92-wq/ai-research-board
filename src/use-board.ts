import { useState } from 'react'
import { citeAnswer, type Answer, type Field } from './ask'
import { periods } from './data'

export function useBoard() {
  const [period, setPeriod] = useState<(typeof periods)[number]['id']>('1Y')
  const [ask, setAsk] = useState('')
  const [thread, setThread] = useState<Answer[]>([])
  const [toast, setToast] = useState('')
  const [lit, setLit] = useState<Field | null>(null)

  const send = (text: string) => {
    const q = text.trim()
    if (!q) return
    const ans = citeAnswer(q)
    setThread((t) => [...t, ans])
    setLit(ans.field)
    setAsk('')
  }

  const notice = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  return { period, setPeriod, ask, setAsk, thread, send, toast, notice, lit }
}
