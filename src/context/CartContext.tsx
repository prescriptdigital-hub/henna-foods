'use client'

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { cartTotals, isProductId, PRODUCTS, type Product, type ProductId } from '@/lib/catalog'
import { useCurrency } from './CurrencyContext'

export type CartItem = {
  id: ProductId
  quantity: number
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; id: ProductId; quantity: number }
  | { type: 'REMOVE_ITEM'; payload: ProductId }
  | { type: 'UPDATE_QUANTITY'; payload: { id: ProductId; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
          isOpen: true,
        }
      }
      return {
        ...state,
        items: [...state.items, { id: action.id, quantity: action.quantity }],
        isOpen: true,
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'HYDRATE':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

export type CartLine = CartItem & { product: Product; unitPrice: number; lineTotal: number }

type CartContextType = {
  state: CartState
  lines: CartLine[]
  addItem: (id: ProductId, quantity?: number) => void
  removeItem: (id: ProductId) => void
  updateQuantity: (id: ProductId, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  totalItems: number
  subtotal: number
  discount: number
  discountRate: number
  totalPrice: number
}

const STORAGE_KEY = 'henna-cart'

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { currency } = useCurrency()
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })
  const [loaded, setLoaded] = useState(false)

  // Restore the basket saved from a previous visit
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (Array.isArray(saved)) {
        const items = saved
          .filter(i => isProductId(i?.id) && Number.isInteger(i?.quantity) && i.quantity > 0)
          .map(i => ({ id: i.id as ProductId, quantity: i.quantity as number }))
        dispatch({ type: 'HYDRATE', payload: items })
      }
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {}
  }, [loaded, state.items])

  const addItem = (id: ProductId, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', id, quantity })
  const removeItem = (id: ProductId) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id: ProductId, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  const lines = state.items.map(item => {
    const product = PRODUCTS[item.id]
    const unitPrice = product.prices[currency]
    return { ...item, product, unitPrice, lineTotal: unitPrice * item.quantity }
  })
  const totals = cartTotals(state.items, currency)

  return (
    <CartContext.Provider
      value={{
        state,
        lines,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        totalItems: totals.jars,
        subtotal: totals.subtotal,
        discount: totals.discount,
        discountRate: totals.tier?.discount ?? 0,
        totalPrice: totals.total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
