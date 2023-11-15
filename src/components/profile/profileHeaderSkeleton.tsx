import { Skeleton } from '../ui/skeleton';

const ProfileHeaderSkeleton = () => {
    return (
      <div className="flex justify-start space-x-4 w-full ml-5 mt-10 bg-red">
        <div className="flex flex-row space-x-5">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex flex-col space-y-2 ">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-6 w-[375px]" />
            <Skeleton className="h-6 w-[350px]" />
          </div>
        </div>
      </div>
    );
}

export default ProfileHeaderSkeleton
