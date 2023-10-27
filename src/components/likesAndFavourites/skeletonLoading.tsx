import { Skeleton } from "../ui/skeleton"


const SkeletonLoading = () => {
  return [...Array(10)].map(
    (_, index) => {
     return <Skeleton key={index} className="w-full p-8 flex justify-between h-48 border rounded-lg"  />
    }
  )
}

export default SkeletonLoading;
