import { Badge } from '@/components/ui/badge'
import { ShapesIcon } from 'lucide-react'
import CategoryItem from './components/category-item'
import { prismaClient } from '@/lib/prisma'

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({})

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className=" px3 w-fit gap-1 border-2 border-primary py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        <p>Catálogo</p>
      </Badge>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  )
}

export default CatalogPage
