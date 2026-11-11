import { redirect } from 'next/navigation'
import { ProductPage, productMetadata } from '@/lib/product-page'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return productMetadata((await params).slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  // The original two products keep their short addresses
  if (slug === 'cookies' || slug === 'chinchin') redirect(`/${slug}`)
  return <ProductPage slug={slug} />
}
