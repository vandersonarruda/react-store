import { prismaClient } from '@/lib/prisma'
import Categories from './components/categories'
import ProductList from './components/product-list'
import PromoBanner from './components/promo-banner'

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards',
      },
    },
  })

  return (
    <div className="">
      <PromoBanner
        src="/banner-home-01.png"
        alt="até 55% de desconto esse mês"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <ProductList products={deals} title="Ofertas" />
      </div>

      <PromoBanner
        src="/banner-home-02.png"
        alt="até 55% de desconto em mouses!"
      />

      <div className="mt-8">
        <ProductList products={keyboards} title="Teclados" />
      </div>
    </div>
  )
}
