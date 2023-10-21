'use client'

import { Product } from '@prisma/client'
import { ReactNode, createContext } from 'react'

interface CartProduct extends Product {
  quantity: number
}

interface ICartContext {
  product: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
}

const CartContext = createContext<ICartContext>({
  product: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider
      value={{
        product: [],
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
