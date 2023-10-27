import { ShoppingCartIcon } from 'lucide-react'
import { Badge } from './badge'
import { useContext } from 'react'
import { CartContext } from '@/providers/cart'
import CartItem from './cart-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Separator } from './separator'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import { createCheckout } from '@/actions/checkout'
import { loadStripe } from '@stripe/stripe-js'
import { createOrder } from '@/actions/order'
import { useSession } from 'next-auth/react'

const Cart = () => {
  const { data } = useSession()

  const { products, total, subtotal, totalDiscount } = useContext(CartContext)

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      // TODO: redirect to login page
      return
    }

    // create order on db
    const order = await createOrder(products, (data?.user as any).id)

    const checkout = await createCheckout(products)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className=" px3 w-fit gap-1 border-2 border-primary py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        <p>Carrinho</p>
      </Badge>

      {/* Produtos */}
      <ScrollArea className="h-full pr-3">
        <div className="flex h-full flex-col gap-5">
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem
                product={computeProductTotalPrice(product) as any}
                key={product.id}
              />
            ))
          ) : (
            <p className="text-center font-semibold">Carrinho vazio!</p>
          )}
        </div>
      </ScrollArea>

      {/* Valores da Compra */}
      {products.length > 0 && (
        <div>
          <div className="flex flex-col gap-3">
            <Separator />

            <div className="flex items-center justify-between text-xs">
              <p>Subtotal</p>
              <p>R$ {subtotal.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <p>Entrega</p>
              <p>GRÁTIS</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <p>Descontos</p>
              <p>- R$ {totalDiscount.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm font-bold">
              <p>Total</p>
              <p>R$ {total.toFixed(2)}</p>
            </div>
          </div>

          <Button
            className="mt-7 w-full font-bold uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar Compra
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart
