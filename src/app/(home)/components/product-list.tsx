import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Product } from '@prisma/client'

interface ProductListProps {
  products: Product[]
  title?: string
}

const ProductList = ({ products, title }: ProductListProps) => {
  return (
    <>
      <p className="mb-3 pl-5 font-bold uppercase">{title}</p>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </>
  )
}

export default ProductList
