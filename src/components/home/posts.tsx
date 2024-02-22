import PostItem from "./postItem";
import PostHeader from "./postHeader";
import { Skeleton } from "../ui/skeleton";
import useHomePageScrollPosition from "@/zustand/home/scrollPosition";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { MemberData } from "@/types/home";

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
  // Set the initial scroll position when the component mounts
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
      className="col-span-4 overflow-y-auto w-full h-full lg:w-full no-scrollbar 2xl:w-1/2"
    >
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
        <div className="w-full">
          <PostHeader />
          <div className="w-full lg:block hidden">
            <div className="flex flex-row w-full justify-between lg:p-5 lg:border-l lg:border-r">
              <p className="uppercase font-semibold"></p>
            </div>
          </div>
          <div className="no-scrollbar py-4 lg:py-0 border-x flex flex-col items-center lg:p-8 px-0 md:w-full w-screen h-screen sm:w-full rounded-b-xl space-y-4 border-[#E0E0E0] dark:border-[#131d2d] lg:h-min overflow-y-auto scroll-smooth">
            {memberList.length > 0 ? (
              memberList.map((post, index: number) => (
                <PostItem key={index} memberData={post} />
              ))
            ) : (
              <div className="rounded-t-md lg:w-[460px] w-[350px] object-cover h-screen">
                No Members Found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
