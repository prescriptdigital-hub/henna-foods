'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_CURRENCY, formatMoney, isCurrency, type Currency } from '@/lib/catalog'

const STORAGE_KEY = 'henna-currency'

type CurrencyContextType = {
  currency: Currency
  setCurrency: (c: Currency) => void
  format: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (isCurrency(saved)) setCurrencyState(saved)
    } catch {}
  }, [])

  const setCurrency = (c: Currency) => {
    setCurrencyState(c)
    try {
      localStorage.setItem(STORAGE_KEY, c)
    } catch {}
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format: amount => formatMoney(amount, currency) }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
