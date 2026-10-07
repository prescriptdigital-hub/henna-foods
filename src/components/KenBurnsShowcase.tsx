'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { GALLERY_TAGS, type GalleryImage } from '@/lib/gallery'

type Props = {
  images: GalleryImage[]
  interval?: number
  showThumbnails?: boolean
  className?: string
}

const tagLabel = (tag: GalleryImage['tag']) => GALLERY_TAGS.find(t => t.tag === tag)?.label ?? ''

export default function KenBurnsShowcase({ images, interval = 6000, showThumbnails = true, className = '' }: Props) {
  const [index, setIndex] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [playing, setPlaying] = useState(true)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)
  const count = images.length

  // Start paused for visitors who ask their device for less motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  // Reset when the image set changes (e.g. a gallery filter)
  useEffect(() => {
    setIndex(0)
    setPrev(null)
  }, [images])

  const go = useCallback(
    (next: number) => {
      const target = (next + count) % count
      if (target === index) return
      setPrev(index)
      setIndex(target)
    },
    [count, index]
  )

  useEffect(() => {
    if (!playing || count < 2) return
    const t = setTimeout(() => go(index + 1), interval)
    return () => clearTimeout(t)
  }, [playing, index, interval, count, go])

  // Keep the active thumbnail in view without scrolling the page
  useEffect(() => {
    const strip = thumbsRef.current
    const thumb = strip?.children[index] as HTMLElement | undefined
    if (strip && thumb) {
      strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' })
    }
  }, [index])

  if (count === 0) return null
  const current = images[index]
  // Only the slides on screen or coming next are mounted, so the page stays light
  const mounted = new Set([index, (index + 1) % count, prev ?? index])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(index + 1)
    else if (e.key === 'ArrowLeft') go(index - 1)
    else if (e.key === ' ') {
      e.preventDefault()
      setPlaying(p => !p)
    }
  }

  const btn =
    'w-11 h-11 rounded-full flex items-center justify-center border border-gold/50 bg-chocolate/40 backdrop-blur-sm text-ivory hover:bg-gold hover:text-chocolate hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold'

  return (
    <div className={className}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Henna Foods product showcase"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={e => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={e => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
          touchX.current = null
        }}
        className={`relative overflow-hidden rounded-3xl bg-chocolate border border-gold/30 shadow-soft aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
          playing ? '' : 'kb-paused'
        }`}
      >
        {images.map((im, i) =>
          mounted.has(i) ? (
            <div
              key={im.src}
              className={`kb-slide ${i === index ? 'is-active' : ''} ${i === prev && i !== index ? 'is-prev' : ''}`}
              aria-hidden={i !== index}
            >
              <Image
                src={im.src}
                alt={im.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className={`object-cover kb-img kb-${i % 4}`}
              />
            </div>
          ) : null
        )}

        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-chocolate/85 via-chocolate/10 to-transparent" />

        <div className="absolute z-[4] left-0 right-0 bottom-0 p-5 sm:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div aria-live="polite" className="max-w-xl">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {tagLabel(current.tag)}
            </span>
            <p key={current.src} className="font-heading italic text-ivory text-2xl sm:text-3xl lg:text-4xl leading-tight mt-2 animate-fade-in">
              {current.caption}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-body text-xs text-ivory/70 tabular-nums mr-1">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => go(index - 1)} className={btn} aria-label="Previous photo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button type="button" onClick={() => setPlaying(p => !p)} className={btn} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
              )}
            </button>
            <button type="button" onClick={() => go(index + 1)} className={btn} aria-label="Next photo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        <div className="absolute z-[4] left-0 right-0 bottom-0 h-[3px] bg-ivory/15">
          <div
            key={`${index}-${current.src}`}
            className="kb-progress h-full bg-gold"
            style={{ animationDuration: `${interval}ms`, animationPlayState: playing ? 'running' : 'paused' }}
          />
        </div>
      </div>

      {showThumbnails && count > 1 && (
        <div ref={thumbsRef} className="kb-thumbs mt-4 flex gap-3 overflow-x-auto pb-1 scroll-smooth">
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1}: ${im.caption}`}
              aria-current={i === index}
              className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === index ? 'border-gold shadow-gold' : 'border-transparent opacity-55 hover:opacity-100'
              }`}
            >
              <Image src={im.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
