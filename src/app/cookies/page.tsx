import { ProductPage, productMetadata } from '@/lib/product-page'

export const generateMetadata = () => productMetadata('cookies')

export default function Page() {
  return <ProductPage slug="cookies" />
}
