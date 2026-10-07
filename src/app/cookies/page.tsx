'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LineIcon from '@/components/LineIcon'
import Badge from '@/components/Badge'
import Newsletter from '@/components/Newsletter'
import { useCart } from '@/context/CartContext'

const benefits = [
  { icon: 'leaf', text: 'Made with fine, natural ingredients' },
  { icon: 'star', text: 'Rich butter goodness in every bite' },
  { icon: 'heart', text: 'Baked to golden, warm perfection' },
  { icon: 'gift', text: 'Perfect for gifting and sharing' },
]

const BenefitIcon = ({ type }: { type: string }) => {
  if (type === 'star') return <svg width="16" height="16" viewBox="0 0 24 24" fill="#D6A62F"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  if (type === 'heart') return <svg width="16" height="16" viewBox="0 0 24 24" fill="#C41E3A"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  if (type === 'gift') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.75" strokeLinecap="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F9B3A" strokeWidth="1.75" strokeLinecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M4 22c-0.5-4.5 1-9 6-13C14 5.5 19 5 21 2c0 0 0 9-4 12S7 21 4 22z"/></svg>
}

export default function CookiesPage() {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart()

  const images = [
    { src: '/images/products/cookies-label.jpg', label: "Bukkie's jar with gold ribbon and label" },
    { src: '/images/products/cookies-trio.jpg', label: "Three jars of Bukkie's cookies" },
    { src: '/images/products/cookies-stack.jpg', label: "Stacked jars of Bukkie's cookies" },
    { src: '/images/products/cookies-multipack.jpg', label: "Bukkie's gift multipack" },
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
            <span className="text-chocolate">Bukkie&apos;s Premium Cookies</span>
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
                <Badge variant="bestseller">Best Seller</Badge>
                <Badge variant="gold">In Stock</Badge>
              </div>

              <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-chocolate leading-tight mb-2">
                Bukkie&apos;s Premium Cookies
              </h1>
              <p className="font-heading text-lg font-medium italic mb-6" style={{ color: '#A65F2B' }}>
                Rich. Buttery. Unforgettable.
              </p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="#D6A62F"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                </div>
                <span className="font-body text-sm text-chocolate/50">4.9 (214 reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-heading text-4xl font-semibold text-chocolate">£12.99</span>
                <span className="font-body text-sm text-chocolate/40 line-through">£15.99</span>
                <Badge variant="rose">Save 19%</Badge>
              </div>

              <p className="font-body text-base text-chocolate/70 leading-relaxed mb-8">
                Golden-baked cookies with delicious chocolate chips, crafted with premium ingredients for a warm, joyful treat. Perfect for gifting, sharing, or those quiet moments when you deserve something beautiful.
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
                  <span className="font-body text-xs text-chocolate/40">950g per jar</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => addItem({ id: 'bukkies-cookies', name: "Bukkie's Premium Cookies", price: 12.99 }, quantity)}
                    className="btn-primary flex-1 justify-center"
                  >
                    Add joy to your cart
                  </button>
                  <Link href="/checkout" className="btn-accent flex-1 justify-center text-center">
                    Buy Now
                  </Link>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-heading text-base font-semibold text-chocolate">Why you&apos;ll love it</h3>
                {benefits.map(b => (
                  <div key={b.text} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <BenefitIcon type={b.icon} />
                    </div>
                    <span className="font-body text-sm text-chocolate/70">{b.text}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-5 border border-gold/20 bg-cream">
                <h3 className="font-heading text-sm font-semibold text-chocolate mb-3">Ingredients</h3>
                <p className="font-body text-xs text-chocolate/60 leading-relaxed">
                  Premium butter, fine wheat flour, free-range eggs, cane sugar, chocolate chips, vanilla extract, baking powder, sea salt. Made in a facility that handles nuts and dairy.
                </p>
              </div>

              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gold/20">
                {[
                  { icon: 'truck' as const, label: 'Shipping', detail: '2-3 business days' },
                  { icon: 'return' as const, label: 'Returns', detail: '7-day return policy' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <LineIcon name={item.icon} size={18} />
                    <div>
                      <div className="font-body text-xs font-semibold text-chocolate">{item.label}</div>
                      <div className="font-body text-xs text-chocolate/45">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  )
}
