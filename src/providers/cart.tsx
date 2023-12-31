/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import { ProductWithTotalPrice } from '@/helpers/product'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  total: number
  subtotal: number
  totalDiscount: number
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem('@react-store/cart-products') || '[]'),
    )
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        '@react-store/cart-products',
        JSON.stringify(products),
      )
    }
  }, [products, isLoaded])

  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice * product.quantity
    }, 0)
  }, [products])

  const totalDiscount = subtotal - total

  const addProductToCart = (product: CartProduct) => {
    // se o produto já estiver no carrinho, apenas aumente a sua quantidade
    const productIsAlreadyOnCart = products.some(
      (item) => item.id === product.id,
    )

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            }
          }

          return cartProduct
        }),
      )

      return
    }

    // se não, adicione o produto
    setProducts((prev) => [...prev, product])
  }

  const decreaseProductQuantity = (productId: string) => {
    // map -> passando por cada item, se for igual ao ID, retira um da quantidade
    // filter -> para ocultar os produtos que a quantidade é 0
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            }
          }

          return cartProduct
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    )
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          }
        }

        return cartProduct
      }),
    )
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId))
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        total,
        subtotal,
        totalDiscount,
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
