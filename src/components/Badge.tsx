type BadgeVariant = 'default' | 'gold' | 'rose' | 'bestseller' | 'new'

type BadgeProps = {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'border-gold/60 text-chocolate bg-cream',
    gold: 'border-gold bg-gold/10 text-chocolate',
    rose: 'border-rose-red/60 text-rose-red bg-rose-red/5',
    bestseller: 'border-gold bg-gold text-chocolate',
    new: 'border-henna-green/60 text-henna-green bg-henna-green/5',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold font-body tracking-wide border rounded-pill px-3 py-1 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
