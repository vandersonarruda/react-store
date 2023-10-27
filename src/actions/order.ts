'use server'

import { prismaClient } from '@/lib/prisma'
import { CartProduct } from '@/providers/cart'

export const createOrder = async (
  cartProducts: CartProduct[],
  userId: string,
) => {
  // Primeiro temos que criar uma order e depois passar quais são os produtos desse pedido,
  // mas como estamos no Prisma, podemos passar tudo na mesma chamada (ex.: orderProduct)
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: 'WAITING_FOR_PAYMENT',
      orderProduct: {
        // createMany: informando o Prisma que iremos criar vários registros
        createMany: {
          // data: listando todos dos produtos com os parâmetros esperados
          data: cartProducts.map((product) => ({
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    },
  })

  return order
}
