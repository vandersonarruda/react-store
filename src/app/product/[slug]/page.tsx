import { prismaClient } from '@/lib/prisma'
import ProductImages from './components/product-images'

interface ProductDetailsPageProps {
  params: {
    slug: string
  }
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: params.slug,
    },
  })

  if (!product) return null

  return (
    <div>
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
    </div>
  )
}

export default ProductDetailsPage
