import { Suspense } from 'react'
import HennaLogo from '@/components/HennaLogo'
import OrderStatus from './OrderStatus'
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

        <Suspense fallback={null}>
          <OrderStatus />
        </Suspense>

        <p className="font-body text-xs text-chocolate/35 italic mt-12">
          Elegance and joy in every bite.
        </p>
      </div>
    </section>
  )
}
