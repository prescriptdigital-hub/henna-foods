'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { convertFromNaira, DEFAULT_CURRENCY, formatMoney, isCurrency, type Currency, type Rates } from '@/lib/catalog'

const STORAGE_KEY = 'henna-currency'

type CurrencyContextType = {
  // The currency the visitor chose
  selected: Currency
  // The currency prices are actually shown in (naira until live rates arrive)
  currency: Currency
  setCurrency: (c: Currency) => void
  ratesReady: boolean
  ratesUpdated: string | null
  // Formats a naira amount in the shown currency
  format: (naira: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Currency>(DEFAULT_CURRENCY)
  const [rates, setRates] = useState<Rates | null>(null)
  const [ratesUpdated, setRatesUpdated] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (isCurrency(saved)) setSelected(saved)
    } catch {}

    let cancelled = false
    fetch('/api/rates')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (cancelled || !data?.rates) return
        setRates(data.rates)
        setRatesUpdated(data.updated ?? null)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const setCurrency = (c: Currency) => {
    setSelected(c)
    try {
      localStorage.setItem(STORAGE_KEY, c)
    } catch {}
  }

  // Without live rates, show naira rather than a guessed conversion
  const currency: Currency = rates ? selected : 'NGN'
  const format = (naira: number) => formatMoney(rates ? convertFromNaira(naira, currency, rates) : naira, currency)

  return (
    <CurrencyContext.Provider value={{ selected, currency, setCurrency, ratesReady: Boolean(rates), ratesUpdated, format }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
