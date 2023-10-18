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

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'mouses',
      },
    },
  })

  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        src="/banner-home-01.png"
        alt="até 55% de desconto esse mês"
      />

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <ProductList products={deals} title="Ofertas" />
      </div>

      <PromoBanner
        src="/banner-home-02.png"
        alt="até 55% de desconto em mouses!"
      />

      <div>
        <ProductList products={keyboards} title="Teclados" />
      </div>

      <PromoBanner
        src="/banner-home-03.png"
        alt="até 20% de desconto em Fones!"
      />

      <div>
        <ProductList products={mouses} title="Mouses" />
      </div>
    </div>
  )
}
