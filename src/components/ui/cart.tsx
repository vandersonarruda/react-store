import { ShoppingCartIcon } from 'lucide-react'
import { Badge } from './badge'
import { useContext } from 'react'
import { CartContext } from '@/providers/cart'
import CartItem from './cart-item'
import { computeProductTotalPrice } from '@/helpers/product'

const Cart = () => {
  const { products } = useContext(CartContext)

  return (
    <div className="flex flex-col gap-8">
      <Badge
        className=" px3 w-fit gap-1 border-2 border-primary py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        <p>Catálogo</p>
      </Badge>

      {/* Produtos */}
      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <CartItem
            product={computeProductTotalPrice(product) as any}
            key={product.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Cart
