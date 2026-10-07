import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import LiveChat from '@/components/LiveChat'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSummary from '@/components/CartSummary'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Henna Foods | Elegant Taste. Joyful Moments.',
    template: '%s | Henna Foods',
  },
  description:
    "Premium cookies and crunchy chinchin crafted with love, quality ingredients, and unforgettable flavour. Bukkie's Premium Cookies and Richie Premium Chinchin.",
  keywords: ["Henna Foods", "Bukkie's Premium Cookies", "Richie Premium Chinchin", "premium food", "cookies", "chinchin"],
  openGraph: {
    title: 'Henna Foods | Elegant Taste. Joyful Moments.',
    description: 'Premium treats crafted to bring joy, love, and elegance to everyday moments.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="bg-cream font-body text-chocolate antialiased">
        <CurrencyProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main>{children}</main>
            <Footer />
            <CartSummary />
            <LiveChat />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}
