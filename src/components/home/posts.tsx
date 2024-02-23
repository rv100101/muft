import PostHeader from "./postHeader";
import { Skeleton } from "../ui/skeleton";
import { MemberData } from "@/types/home";
import MemberList from "./list";
import { useEffect, useRef, useState } from "react";
import useHomePageScrollPosition from "@/zustand/home/scrollPosition";
import { useDebounce } from "@uidotdev/usehooks";

const Posts = ({
  isLoading,
  memberList,
}: {
  isLoading: boolean;
  memberList: MemberData[];
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollPosition, value: scrollPosition } =
    useHomePageScrollPosition();
  const [value, setValue] = useState<number>(scrollPosition);
  const debouncedScrollPositionValue = useDebounce<number>(value, 500);
  useEffect(() => {
    if (!isLoading && scrollPosition && containerRef.current) {
      containerRef.current.scrollTop = +scrollPosition;
    }
  }, [isLoading, scrollPosition]);

  useEffect(() => {
    setScrollPosition(debouncedScrollPositionValue);
  }, [debouncedScrollPositionValue, setScrollPosition]);

  return (
    <div
      onScroll={(e) => {
        setValue(e.currentTarget.scrollTop);
      }}
      ref={containerRef}
      className="col-span-4 overflow-y-scroll w-full h-full no-scrollbar"
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
        <div className="w-full lg:pt-8 border-x">
          <MemberList isLoading={isLoading} memberList={memberList} />
        </div>
      )}
    </div>
  );
};

export default Posts;
