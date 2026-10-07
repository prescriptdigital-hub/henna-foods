'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import KenBurnsShowcase from '@/components/KenBurnsShowcase'
import { GALLERY, GALLERY_TAGS, type GalleryTag } from '@/lib/gallery'

export default function GalleryView() {
  const [filter, setFilter] = useState<GalleryTag | 'all'>('all')
  const [open, setOpen] = useState<number | null>(null)

  const images = useMemo(() => (filter === 'all' ? GALLERY : GALLERY.filter(g => g.tag === filter)), [filter])

  // Lightbox: keyboard controls and no page scroll behind it
  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen(i => (i === null ? i : (i + 1) % images.length))
      if (e.key === 'ArrowLeft') setOpen(i => (i === null ? i : (i - 1 + images.length) % images.length))
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, images.length])

  const active = open === null ? null : images[open]

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter photos">
        {GALLERY_TAGS.map(t => (
          <button
            key={t.tag}
            type="button"
            onClick={() => setFilter(t.tag)}
            aria-pressed={filter === t.tag}
            className={`font-body text-sm rounded-pill px-4 py-2 border transition-colors ${
              filter === t.tag ? 'bg-chocolate text-ivory border-chocolate' : 'border-gold/40 text-chocolate hover:bg-gold/10'
            }`}
          >
            {t.label}
            <span className="ml-1.5 text-xs opacity-60">
              {t.tag === 'all' ? GALLERY.length : GALLERY.filter(g => g.tag === t.tag).length}
            </span>
          </button>
        ))}
      </div>

      <KenBurnsShowcase images={images} />

      <div className="mt-16 mb-8 flex items-end justify-between gap-4">
        <h2 className="section-title">Every angle</h2>
        <p className="font-body text-sm text-chocolate/50">Tap a photo to see it up close</p>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {images.map((im, i) => (
          <button
            key={im.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block w-full mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gold/20 bg-cream shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Open photo: ${im.caption}`}
          >
            <Image
              src={im.src}
              alt={im.alt}
              width={im.width}
              height={im.height}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 p-3 text-left font-heading italic text-sm text-ivory bg-gradient-to-t from-chocolate/80 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              {im.caption}
            </span>
          </button>
        ))}
      </div>

      {active && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-[60] bg-chocolate/95 backdrop-blur-sm flex flex-col animate-fade-in"
          onClick={() => setOpen(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-ivory">
            <span className="font-body text-xs tabular-nums text-ivory/60">
              {open + 1} / {images.length}
            </span>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-chocolate transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>

          <div className="relative flex-1 mx-4 sm:mx-16" onClick={e => e.stopPropagation()}>
            <Image key={active.src} src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain animate-fade-in" />
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-5" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen((open - 1 + images.length) % images.length)}
              aria-label="Previous photo"
              className="w-11 h-11 shrink-0 rounded-full border border-gold/40 text-ivory flex items-center justify-center hover:bg-gold hover:text-chocolate transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <p className="font-heading italic text-ivory text-lg sm:text-2xl text-center">{active.caption}</p>
            <button
              type="button"
              onClick={() => setOpen((open + 1) % images.length)}
              aria-label="Next photo"
              className="w-11 h-11 shrink-0 rounded-full border border-gold/40 text-ivory flex items-center justify-center hover:bg-gold hover:text-chocolate transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
