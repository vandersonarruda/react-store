import Image from 'next/image'
import { CartContext, CartProduct } from '@/providers/cart'
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from 'lucide-react'
import { Button } from './button'
import { useContext } from 'react'

interface CartItemProps {
  product: CartProduct
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext)

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id)
  }

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id)
  }

  const handleRemoveProductFromCartClick = () => {
    removeProductFromCart(product.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Image & Desc */}
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="aspect-auto max-h-[80%] w-full max-w-[80%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="mt-1 flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={12} />
            </Button>

            <span className="flex w-4 items-center justify-center text-xs">
              {product.quantity}
            </span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={12} />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete button */}
      <div>
        <Button
          size="icon"
          variant="outline"
          onClick={handleRemoveProductFromCartClick}
        >
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  )
}

export default CartItem
