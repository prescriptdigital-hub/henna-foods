import Link from 'next/link'
import HennaLogo from '@/components/HennaLogo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Thank you for your Henna Foods order.',
}

export default function ThankYouPage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center py-20"
      style={{ background: 'linear-gradient(135deg, #FFF4E1 0%, #FBE6C4 50%, #FFF4E1 100%)' }}
    >
      <div className="container-henna max-w-xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <HennaLogo size="lg" />
        </div>

        <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-chocolate leading-tight mb-4">
          Order Confirmed.
        </h1>
        <p className="font-heading text-xl font-medium italic mb-6" style={{ color: '#A65F2B' }}>
          Thank you for choosing Henna Foods.
        </p>
        <p className="font-body text-base text-chocolate/65 leading-relaxed mb-4 max-w-md mx-auto">
          Your order was made with love. We are preparing your treats with the same care that goes into every Henna Foods product.
        </p>
        <p className="font-body text-sm text-chocolate/50 mb-10">
          You will receive a confirmation email shortly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/shop" className="btn-primary">
            Shop Again
          </Link>
          <Link href="/" className="btn-secondary">
            Return Home
          </Link>
        </div>

        <p className="font-body text-xs text-chocolate/35 italic mt-12">
          Elegance and joy in every bite.
        </p>
      </div>
    </section>
  )
}
