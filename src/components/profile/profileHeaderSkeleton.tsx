import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const ProfileHeaderSkeleton = () => {
  const [, i18n] = useTranslation();
  return (
    <div className="flex justify-start space-x-4 w-screen lg:w-full ml-5 mt-10 bg-red">
      <div className={cn("flex flex-row space-x-5", i18n.language == 'ar' && "space-x-reverse")}>
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex w-52 flex-col space-y-2 ">
          <Skeleton className="h-6 w-full lg:w-[200px]" />
          <Skeleton className="h-6 w-full lg:w-[375px]" />
          <Skeleton className="h-6 w-full lg:w-[350px]" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
