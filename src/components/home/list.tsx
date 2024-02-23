import useHomePageScrollPosition from "@/zustand/home/scrollPosition";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import PostItem from "./postItem";
import { MemberData } from "@/types/home";

const MemberList = ({
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
  }, [isLoading, scrollPosition,]);

  useEffect(() => {
    setScrollPosition(debouncedScrollPositionValue);
  }, [debouncedScrollPositionValue, setScrollPosition]);

  return (
    <div
      onScroll={(e) => {
        setValue(e.currentTarget.scrollTop);
      }}
      ref={containerRef}
      className="no-scrollbar py-4 lg:py-0  flex flex-col items-center lg:p-8 px-0 md:w-full w-screen h-screen sm:w-full rounded-b-xl space-y-4 border-[#E0E0E0] dark:border-[#131d2d] overflow-y-scroll scroll-smooth">
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
  )
}

export default MemberList
