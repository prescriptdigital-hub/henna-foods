'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/Badge'
import Newsletter from '@/components/Newsletter'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { BulkTierTable } from '@/components/BulkSavings'
import { PRODUCTS } from '@/lib/catalog'

const benefits = [
  { icon: 'star', text: 'Perfect crunchy texture every time' },
  { icon: 'heart', text: 'Joyful snack for every moment' },
  { icon: 'gift', text: 'Great for gifting and parties' },
  { icon: 'leaf', text: 'Made with care by Henna Foods' },
]

export default function ChinchinPage() {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart()
  const { currency, format } = useCurrency()
  const product = PRODUCTS['richie-chinchin']

  const images = [
    { src: '/images/products/chinchin-label.jpg', label: 'Richie jar with gold ribbon and label' },
    { src: '/images/products/chinchin-jar.jpg', label: 'A full jar of Richie chinchin' },
    { src: '/images/products/chinchin-stack.jpg', label: 'Stacked jars of Richie chinchin' },
    { src: '/images/products/chinchin-trio.jpg', label: 'Richie party multipack' },
  ]

  return (
    <>
      <div className="bg-ivory border-b border-gold/20 py-3">
        <div className="container-henna">
          <nav className="flex items-center gap-2 font-body text-xs text-chocolate/50">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-chocolate">Richie Premium Chinchin</span>
          </nav>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="container-henna">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-4 shadow-card bg-cream">
                <Image
                  src={images[activeImage].src}
                  alt={images[activeImage].label}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-150 ${activeImage === i ? 'border-gold shadow-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    aria-label={img.label}
                  >
                    <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:pt-4">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <Badge variant="new">New Arrival</Badge>
                <Badge variant="gold">In Stock</Badge>
              </div>

              <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-chocolate leading-tight mb-2">
                Richie Premium Chinchin
              </h1>
              <p className="font-heading text-lg font-medium italic mb-6" style={{ color: '#E8A735' }}>
                Crunchy. Joyful. Delicious.
              </p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill={s <= 5 ? '#D6A62F' : 'none'} stroke="#D6A62F" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                </div>
                <span className="font-body text-sm text-chocolate/50">4.8 (167 reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-heading text-4xl font-semibold text-chocolate">{format(product.prices[currency])}</span>
                <span className="font-body text-sm text-chocolate/40">per jar</span>
              </div>

              <p className="font-body text-base text-chocolate/70 leading-relaxed mb-8">
                A golden crunchy snack made for sharing, celebration, and everyday enjoyment. Richie Chinchin brings that joyful, festive energy to any moment, whether it is a quiet evening or a celebration with friends.
              </p>

              <div className="border-t border-gold/20 pt-6 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-body text-sm font-medium text-chocolate/70 w-20 shrink-0">Quantity</span>
                  <div className="flex items-center border border-gold/40 rounded-pill overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2.5 font-body text-chocolate hover:bg-gold/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2.5 font-body text-sm text-chocolate font-medium min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2.5 font-body text-chocolate hover:bg-gold/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-body text-xs text-chocolate/40">500g per jar</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => addItem('richie-chinchin', quantity)}
                    className="btn-primary flex-1 justify-center"
                  >
                    Add joy to your cart
                  </button>
                  <Link href="/checkout" className="btn-accent flex-1 justify-center text-center">
                    Buy Now
                  </Link>
                </div>
              </div>

              <div className="mb-8">
                <BulkTierTable />
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-heading text-base font-semibold text-chocolate">Why you&apos;ll love it</h3>
                {benefits.map(b => (
                  <div key={b.text} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(244, 196, 48, 0.15)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#E8A735"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>
                    <span className="font-body text-sm text-chocolate/70">{b.text}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-5 border border-gold/20 bg-cream">
                <h3 className="font-heading text-sm font-semibold text-chocolate mb-3">Ingredients</h3>
                <p className="font-body text-xs text-chocolate/60 leading-relaxed">
                  Premium wheat flour, vegetable oil, sugar, eggs, milk, natural flavourings, baking powder, sea salt. Crunchy, golden, and made with care. Free from artificial preservatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  )
}
