import { prismaClient } from '@/lib/prisma'
import ProductImages from './components/product-images'
import ProductInfo from './components/product-info'
import { computeProductTotalPrice } from '@/helpers/product'
import ProductList from '@/components/ui/product-list'

interface ProductDetailsPageProps {
  params: {
    slug: string
  }
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  })

  if (!product) return null

  return (
    <div className="flex flex-col gap-8 pb-5">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)} />
      <ProductList
        products={product.category.products}
        title="Produtos Recomendados"
      />
    </div>
  )
}

export default ProductDetailsPage
