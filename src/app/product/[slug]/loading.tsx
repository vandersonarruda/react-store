import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="flex flex-col gap-8 pb-5">
      <div>
        <Skeleton className="h-[380px] w-full rounded-lg" />
        <div className="mt-4 flex flex-row gap-4 px-4">
          <Skeleton className="h-[100px] w-[100px] rounded-lg" />
          <Skeleton className="h-[100px] w-[100px] rounded-lg" />
          <Skeleton className="h-[100px] w-[100px] rounded-lg" />
          <Skeleton className="h-[100px] w-[100px] rounded-lg" />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-5">
        <div>
          <Skeleton className="h-5 w-[250px]" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-[200px]" />
        </div>

        <div>
          <Skeleton className="h-5 w-[150px]" />
        </div>
        <div className="mt-4 flex items-center gap-3"></div>
        <div className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  )
}

export default Loading
