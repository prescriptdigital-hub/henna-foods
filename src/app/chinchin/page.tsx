import { ProductPage, productMetadata } from '@/lib/product-page'

export const generateMetadata = () => productMetadata('chinchin')

export default function Page() {
  return <ProductPage slug="chinchin" />
}
