'use client'

import { createContext, useContext, useMemo } from 'react'
import { buildCatalog, type Catalog, type StoreData } from '@/lib/catalog'

const CatalogContext = createContext<Catalog | null>(null)

// The server reads the saved shop once per page and hands it to the browser here
export function CatalogProvider({ data, children }: { data: StoreData; children: React.ReactNode }) {
  const catalog = useMemo(() => buildCatalog(data), [data])
  return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}
