'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Badge from './Badge'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { PRODUCT_LINES, PRODUCTS, type ProductId } from '@/lib/catalog'
import SizePicker from './SizePicker'
import { REVIEWS } from '@/lib/site'

type ProductCardProps = {
  name: string
  tagline: string
  description: string
  href: string
  badge?: string
  variant?: 'cookies' | 'chinchin'
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <svg key={star} width="13" height="13" viewBox="0 0 24 24" fill={star <= Math.round(rating) ? '#D6A62F' : 'none'} stroke="#D6A62F" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      <span className="font-body text-xs text-chocolate/50">({count})</span>
    </div>
  )
}

export default function ProductCard({
  name,
  tagline,
  description,
  href,
  badge,
  variant = 'cookies',
}: ProductCardProps) {
  const { addItem } = useCart()
  const { format } = useCurrency()
  const [sku, setSku] = useState<ProductId>(PRODUCT_LINES[variant][0])
  const product = PRODUCTS[sku]
  const reviews = REVIEWS[variant]

  const photos = {
    cookies: {
      src: '/images/products/cookies-jar-cutout.png',
      alt: "Bukkie's Premium Cookies jar with gold ribbon",
      bg: 'radial-gradient(circle at 50% 42%, #FFF9EF 0%, #FBE6C4 48%, rgba(196,30,58,0.28) 100%)',
    },
    chinchin: {
      src: '/images/products/chinchin-jar-cutout.png',
      alt: 'Richie Premium Chinchin jar with gold ribbon',
      bg: 'radial-gradient(circle at 50% 42%, #FFF9EF 0%, #FFE7A8 50%, rgba(242,138,46,0.45) 100%)',
    },
  }

  return (
    <div className="product-card group flex flex-col h-full">
      <Link href={href} className="block overflow-hidden rounded-t-[24px]">
        <div className="relative h-72 overflow-hidden" style={{ background: photos[variant].bg }}>
          <Image
            src={photos[variant].src}
            alt={photos[variant].alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain px-10 pt-6 pb-10 drop-shadow-[0_18px_22px_rgba(59,31,16,0.28)] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2"
          />
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="bestseller">{badge}</Badge>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-chocolate/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="font-heading text-white/90 text-sm font-medium italic drop-shadow">
              {tagline}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={href}>
            <h3 className="font-heading text-xl font-semibold text-chocolate leading-snug hover:text-cookie-brown transition-colors">
              {name}
            </h3>
          </Link>
        </div>

        {reviews && <StarRating rating={reviews.rating} count={reviews.count} />}

        <p className="font-body text-sm text-chocolate/65 leading-relaxed mt-3 flex-1">
          {description}
        </p>

        <div className="mt-4">
          <SizePicker line={variant} value={sku} onChange={setSku} compact />
        </div>

        <div className="mt-5 pt-4 border-t border-gold/20 flex items-center justify-between gap-3">
          <div>
            <span className="font-heading text-2xl font-semibold text-chocolate">
              {format(product.price)}
            </span>
          </div>
          <button
            onClick={() => addItem(sku)}
            className="btn-primary text-xs px-5 py-2.5"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
