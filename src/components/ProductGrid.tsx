import ProductCard from './ProductCard'
import type { ProductDoc } from '@/lib/catalog'

// Two products sit side by side; three or more flow into a wider grid
export default function ProductGrid({ products, center = true }: { products: ProductDoc[]; center?: boolean }) {
  const wide = products.length > 2
  return (
    <div className={`grid md:grid-cols-2 gap-8 ${wide ? 'lg:grid-cols-3 max-w-6xl' : 'max-w-4xl'} ${center ? 'mx-auto' : ''}`}>
      {products.map(p => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  )
}
