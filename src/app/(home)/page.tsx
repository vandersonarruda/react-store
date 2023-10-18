import Image from 'next/image'
import Categories from './components/categories'
import ProductList from './components/product-list'
import { prismaClient } from '@/lib/prisma'

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
      <Image
        src="/banner-home-01.png"
        alt="até 55% de desconto esse mês"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <ProductList products={deals} title="Ofertas" />
      </div>

      <Image
        src="/banner-home-02.png"
        alt="até 55% de desconto em mouses!"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
      />

      <div className="mt-8">
        <ProductList products={keyboards} title="Teclados" />
      </div>
    </div>
  )
}
