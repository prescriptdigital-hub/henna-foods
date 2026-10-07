'use client'

import Link from 'next/link'
import HennaLogo from './HennaLogo'

const shopLinks = [
  { label: "Bukkie's Cookies", href: '/cookies' },
  { label: 'Richie Chinchin', href: '/chinchin' },
  { label: 'All Products', href: '/shop' },
  { label: 'Bulk & Wholesale', href: '/wholesale' },
]

const aboutLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Quality Promise', href: '/about#quality' },
  { label: 'Contact Us', href: '/contact' },
]

const careLinks = [
  { label: 'Shipping Info', href: '/contact#shipping' },
  { label: 'Returns', href: '/contact#returns' },
  { label: 'Cart', href: '/cart' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#3B1F10', color: '#FFF4E1' }}>
      <div className="container-henna py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <HennaLogo size="md" />
            </div>
            <p className="font-body text-sm leading-relaxed opacity-70 max-w-56 mt-4">
              Premium treats crafted to bring joy, love, and elegance to everyday moments.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'Twitter/X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              ].map(social => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all duration-150"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#D6A62F">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-5" style={{ color: '#D6A62F' }}>
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm opacity-70 hover:opacity-100 hover:text-gold transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-5" style={{ color: '#D6A62F' }}>
              About Henna Foods
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm opacity-70 hover:opacity-100 hover:text-gold transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-5" style={{ color: '#D6A62F' }}>
              Customer Care
            </h4>
            <ul className="space-y-3">
              {careLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm opacity-70 hover:opacity-100 hover:text-gold transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="font-heading text-base font-semibold mb-3" style={{ color: '#D6A62F' }}>
                Newsletter
              </h4>
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 bg-white/10 border border-gold/30 rounded-lg px-3 py-2 text-xs font-body placeholder:text-white/40 focus:outline-none focus:border-gold text-white"
                />
                <button
                  type="submit"
                  className="bg-gold text-chocolate text-xs font-semibold font-body px-3 py-2 rounded-lg hover:bg-golden-yellow transition-colors duration-150 whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs opacity-50">
            &copy; {new Date().getFullYear()} Henna Foods. All rights reserved.
          </p>
          <p className="font-body text-xs opacity-50 italic">
            Elegant Taste. Joyful Moments.
          </p>
        </div>
      </div>
    </footer>
  )
}
