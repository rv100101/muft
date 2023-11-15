import { Skeleton } from "@/components/ui/skeleton";

const ContentLoadingSkeleton = () => {
  return (
    <div className="flex flex-row justify-start items-start space-x-4 w-full ml-2">
      <div className="flex-col space-y-2">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
      <div className="flex-col space-y-2">
        <Skeleton className="h-6 w-[480px]" />
        <Skeleton className="h-6 w-[460px]" />
        <Skeleton className="h-6 w-[440px]" />
        <Skeleton className="h-6 w-[430px]" />
      </div>
    </div>
  );
};

export default ContentLoadingSkeleton;
