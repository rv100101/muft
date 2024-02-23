import PostHeader from "./postHeader";
import { Skeleton } from "../ui/skeleton";
import { MemberData } from "@/types/home";
import MemberList from "./list";

const Posts = ({
  isLoading,
  memberList,
}: {
  isLoading: boolean;
  memberList: MemberData[];
}) => {
  return (
    <div
      className="col-span-4 w-full h-max"
    >
      <PostHeader />
      {isLoading ? (
        <div className="no-scrollbar flex flex-col items-center lg:p-5 px-0 lg:w-[468px] w-screen h-screen sm:w-full rounded-b-xl space-y-4 border-x border-[#E0E0E0] dark:border-[#131d2d] lg:h-min overflow-y-auto">
          {/* <div className="flex flex-col justify-center space-x-4 w-full ml-5 mt-10 border w-full"> */}
          <div className="flex flex-col items-center space-y-2 py-4 px-10 lg:border-x bg-white m-5 lg:w-[500px] w-[350px] dark:bg-[#334155]">
            <Skeleton className="h-[500px] w-full" />
          </div>
          <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 lg:w-[500px] w-[350px] dark:bg-[#334155]">
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 lg:w-[500px] w-[350px] dark:bg-[#334155]">
            <Skeleton className="h-[300px] w-full" />
          </div>
          {/* </div> */}
        </div>
      ) : (
        <div className="w-full h-max lg:pt-8 border-x">
          <MemberList isLoading={isLoading} memberList={memberList} />
        </div>
      )}
    </div>
  );
};

export default Posts;
