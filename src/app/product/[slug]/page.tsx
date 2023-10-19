import { prismaClient } from '@/lib/prisma'

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

  return <div>{product.name}</div>
}

export default ProductDetailsPage
