import { Member } from "@/zustand/home/homepageView.ts";
import PostItem from "./postItem";
import PostHeader from "./postHeader";
import { Skeleton } from "../ui/skeleton";
import useHomePageScrollPosition from "@/zustand/home/scrollPosition";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Posts = ({
  isLoading,
  memberList,
}: {
  isLoading: boolean;
  memberList: Member[];
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollPosition, value: scrollPosition } =
    useHomePageScrollPosition();
  const [value, setValue] = useState<number>(scrollPosition);
  const debouncedScrollPositionValue = useDebounce<number>(value, 500);
  // Set the initial scroll position when the component mounts
  useEffect(() => {
    if (scrollPosition && containerRef.current) {
      containerRef.current.scrollTop = +scrollPosition;
    }
  }, [isLoading]);

  useEffect(() => {
    setScrollPosition(debouncedScrollPositionValue);
  }, [debouncedScrollPositionValue]);

  return (
    <div
      onScroll={(e) => {
        setValue(e.currentTarget.scrollTop);
      }}
      ref={containerRef}
      className="col-span-4 w-min overflow-y-auto no-scrollbar 2xl:w-1/2"
    >
      {isLoading ? (
        <>
          {/* <div className="flex flex-col justify-center space-x-4 w-full ml-5 mt-10 border w-full"> */}
          <div className="flex flex-col items-start space-y-2 p-5 border bg-white m-5 w-[470px]">
            <Skeleton className="h-[50px] w-full" />
          </div>

          <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
            <Skeleton className="h-[500px] w-full" />
          </div>
          <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
            <Skeleton className="h-[300px] w-full" />
          </div>
          {/* </div> */}
        </>
      ) : (
        <>
          <PostHeader />
          <div className=" lg:block hidden">
            <div className="flex flex-row w-full justify-between lg:p-5 lg:border-l lg:border-r">
              <p className="uppercase font-semibold"></p>
            </div>
          </div>
          <div className="no-scrollbar lg:p-8 px-0 lg:w-full h-screen w-screen rounded-b-xl space-y-4 border border-[#E0E0E0] dark:border-[#131d2d] lg:h-min overflow-y-auto scroll-smooth">
            {memberList.length > 0 ? (
              memberList.map((post, index: number) => (
                <PostItem
                  key={index}
                  nickname={post.nickname}
                  country={post.country_name}
                  nationalityCode={post.nationality_code}
                  state={post.state_name}
                  age={post.age}
                  image={post.imagePath}
                  member_id={post.member_id}
                  isLiked={post.isLiked}
                  isFavorite={post.isFavorite}
                  status={post.status}
                  nationality={post.nationality}
                />
              ))
            ) : (
              <div className="rounded-t-md lg:w-[460px] w-[350px] h-[554px] object-cover h-screen">
                No Members Found.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
