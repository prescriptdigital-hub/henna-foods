'use client'

import Link from 'next/link'
import Badge from './Badge'
import { useCart } from '@/context/CartContext'

type ProductCardProps = {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  weight: string
  href: string
  badge?: string
  rating?: number
  reviewCount?: number
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
  id,
  name,
  tagline,
  description,
  price,
  weight,
  href,
  badge,
  rating = 4.9,
  reviewCount = 128,
  variant = 'cookies',
}: ProductCardProps) {
  const { addItem } = useCart()

  const gradients = {
    cookies: 'from-[#FBE6C4] via-[#D4A574] to-[#A65F2B]',
    chinchin: 'from-[#FFF3D8] via-[#F4C430] to-[#E8A735]',
  }

  return (
    <div className="product-card group flex flex-col h-full">
      <Link href={href} className="block overflow-hidden rounded-t-[24px]">
        <div
          className={`relative h-64 bg-gradient-to-br ${gradients[variant]} overflow-hidden`}
        >
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="bestseller">{badge}</Badge>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            {variant === 'cookies' ? (
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="38" stroke="#3B1F10" strokeWidth="2" fill="rgba(59,31,16,0.1)"/>
                <circle cx="35" cy="42" r="5" fill="#3B1F10" opacity="0.6"/>
                <circle cx="57" cy="38" r="4" fill="#3B1F10" opacity="0.5"/>
                <circle cx="48" cy="58" r="6" fill="#3B1F10" opacity="0.7"/>
                <circle cx="64" cy="55" r="3.5" fill="#3B1F10" opacity="0.5"/>
                <circle cx="40" cy="62" r="4" fill="#3B1F10" opacity="0.6"/>
              </svg>
            ) : (
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <rect x="20" y="35" width="14" height="14" rx="3" fill="#3B1F10" opacity="0.3" transform="rotate(15 27 42)"/>
                <rect x="38" y="28" width="12" height="12" rx="2.5" fill="#3B1F10" opacity="0.25" transform="rotate(-10 44 34)"/>
                <rect x="55" y="38" width="13" height="13" rx="3" fill="#3B1F10" opacity="0.3" transform="rotate(20 61.5 44.5)"/>
                <rect x="30" y="52" width="11" height="11" rx="2.5" fill="#3B1F10" opacity="0.25" transform="rotate(-5 35.5 57.5)"/>
                <rect x="48" y="55" width="14" height="14" rx="3" fill="#3B1F10" opacity="0.3" transform="rotate(10 55 62)"/>
                <rect x="65" y="50" width="11" height="11" rx="2.5" fill="#3B1F10" opacity="0.25" transform="rotate(-15 70.5 55.5)"/>
              </svg>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
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
          <span className="font-body text-xs text-chocolate/50 bg-gold/10 border border-gold/25 rounded-pill px-2 py-0.5 whitespace-nowrap shrink-0">
            {weight}
          </span>
        </div>

        <StarRating rating={rating} count={reviewCount} />

        <p className="font-body text-sm text-chocolate/65 leading-relaxed mt-3 flex-1">
          {description}
        </p>

        <div className="mt-5 pt-4 border-t border-gold/20 flex items-center justify-between gap-3">
          <div>
            <span className="font-heading text-2xl font-semibold text-chocolate">
              £{price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => addItem({ id, name, price })}
            className="btn-primary text-xs px-5 py-2.5"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
