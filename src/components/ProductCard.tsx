'use client'

import Image from 'next/image'
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

  const photos = {
    cookies: { src: '/images/products/cookies-label.jpg', alt: "Bukkie's Premium Cookies jar with gold ribbon" },
    chinchin: { src: '/images/products/chinchin-label.jpg', alt: 'Richie Premium Chinchin jar with gold ribbon' },
  }

  return (
    <div className="product-card group flex flex-col h-full">
      <Link href={href} className="block overflow-hidden rounded-t-[24px]">
        <div className="relative h-64 bg-cream overflow-hidden">
          <Image
            src={photos[variant].src}
            alt={photos[variant].alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="bestseller">{badge}</Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
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
