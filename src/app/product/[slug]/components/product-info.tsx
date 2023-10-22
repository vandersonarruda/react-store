'use client'

import { Button } from '@/components/ui/button'
import DiscountBadge from '@/components/ui/discount-badge'
import { ProductWithTotalPrice } from '@/helpers/product'
import { CartContext } from '@/providers/cart'
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from 'lucide-react'

import { useContext, useState } from 'react'

interface ProductInfoProps {
  // refatorando porque precisamos de todas as informações do produto
  // product: Pick<
  //   ProductWithTotalPrice,
  //   'name' | 'basePrice' | 'description' | 'discountPercentage' | 'totalPrice'
  // >
  product: ProductWithTotalPrice
}

// const ProductInfo = ({
// product: { name, basePrice, totalPrice, description, discountPercentage },

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1)

  const { addProductToCart } = useContext(CartContext)

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
  }

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleAddToCartClick = () => {
    addProductToCart({ ...product, quantity })
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      {/* Price */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">
          R$ {product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      {/* Decrease and Increase button */}
      <div className="mt-4 flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span className="flex w-4 items-center justify-center">{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold uppercase">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddToCartClick}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />

          <div>
            <p className="text-xs">
              Entrega via <span className="font-bold">Correios</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para todos <span className="font-bold">Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  )
}

export default ProductInfo
