import { ProductWithTotalPrice } from '@/helpers/product'
import Image from 'next/image'
import Link from 'next/link'
import DiscountBadge from './discount-badge'

interface ProductItemProps {
  product: ProductWithTotalPrice
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{
              objectFit: 'contain',
            }}
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3 gap-1">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="truncate text-sm">{product.name}</p>

          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
              <>
                <p className="font-semibold">
                  R$ {product.totalPrice.toFixed(2)}
                </p>
                <p className="text-xs line-through opacity-75">
                  R$ {Number(product.basePrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="font-semibold">R$ {product.basePrice.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
