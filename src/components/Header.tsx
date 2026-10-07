'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import HennaLogo from './HennaLogo'
import CurrencySwitcher from './CurrencySwitcher'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Chinchin', href: '/chinchin' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const { totalItems, toggleCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-soft' : ''
      }`}
      style={{
        backgroundColor: '#FFF9EF',
        borderBottom: '1px solid rgba(214, 166, 47, 0.35)',
      }}
    >
      <div className="container-henna">
        <div className="flex items-center justify-between h-18 lg:h-20">
          <HennaLogo size="md" />

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-chocolate hover:text-gold transition-colors duration-150 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <CurrencySwitcher className="hidden sm:inline-flex" />
            <button
              onClick={toggleCart}
              aria-label={`Cart, ${totalItems} items`}
              className="relative p-2 rounded-full hover:bg-gold/10 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B1F10" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold font-body"
                  style={{ backgroundColor: '#C41E3A' }}
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-full hover:bg-gold/10 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B1F10" strokeWidth="1.75" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B1F10" strokeWidth="1.75" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden border-t border-gold/20 py-4"
          style={{ backgroundColor: '#FFF9EF' }}
        >
          <nav className="container-henna flex flex-col gap-1">
            <div className="sm:hidden px-3 pb-3 mb-1 border-b border-gold/15 flex items-center justify-between">
              <span className="font-body text-xs text-chocolate/50">Currency</span>
              <CurrencySwitcher />
            </div>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-sm font-medium text-chocolate hover:text-gold hover:bg-gold/5 rounded-md px-3 py-2.5 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
