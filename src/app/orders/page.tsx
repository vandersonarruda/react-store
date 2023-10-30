import { Badge } from '@/components/ui/badge'
import { authOptions } from '@/lib/auth'
import { prismaClient } from '@/lib/prisma'
import { PackageSearchIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import OrderItem from './components/order-item'

const OrderPage = async () => {
  const user = getServerSession(authOptions)

  if (!user) {
    return <p>Access denied</p>
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProduct: true,
    },
  })

  return (
    <div className="p-5">
      <Badge
        className=" px3 w-fit gap-1 border-2 border-primary py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearchIcon size={16} />
        <p>Meus Pedidos</p>
      </Badge>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default OrderPage