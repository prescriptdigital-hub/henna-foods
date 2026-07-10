type QualityIconCardProps = {
  icon: 'heart' | 'star' | 'leaf' | 'gift'
  title: string
  description: string
}

const icons = {
  heart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  star: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  leaf: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 22"/>
      <path d="M4 22c-0.5-4.5 1-9 6-13C14 5.5 19 5 21 2c0 0 0 9-4 12S7 21 4 22z"/>
    </svg>
  ),
  gift: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"/>
      <rect x="2" y="7" width="20" height="5"/>
      <line x1="12" y1="22" x2="12" y2="7"/>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
    </svg>
  ),
}

export default function QualityIconCard({ icon, title, description }: QualityIconCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-ivory rounded-2xl border border-gold/20 shadow-card group hover:-translate-y-1 transition-all duration-300">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
        style={{ color: '#D6A62F', backgroundColor: 'rgba(214, 166, 47, 0.1)' }}
      >
        {icons[icon]}
      </div>
      <h3 className="font-heading text-lg font-semibold text-chocolate mb-2">{title}</h3>
      <p className="font-body text-sm text-chocolate/60 leading-relaxed">{description}</p>
    </div>
  )
}
