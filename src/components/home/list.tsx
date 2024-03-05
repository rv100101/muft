import useHomePageScrollPosition from "@/zustand/home/scrollPosition";
import { useEffect, useRef, useState } from "react";
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
  const { setScrollPosition, value: scrollPosition } = useHomePageScrollPosition();
  const [isScrollPosUpdated, setIsScrollPosUpdated] = useState(false);
  const [debouncedValue, setValue] = useState(scrollPosition);

  useEffect(() => {
    if (!isLoading && scrollPosition && containerRef.current && !isScrollPosUpdated) {
      containerRef.current.scrollTop = +scrollPosition;
      console.log('updated the scrolltop to ', containerRef.current.scrollTop);
      setIsScrollPosUpdated(true);
    }
    // return () => {
    //   console.log(debouncedValue);
    //   setScrollPosition(debouncedValue);
    // }
  }, [isLoading, scrollPosition, isScrollPosUpdated, setScrollPosition, debouncedValue]);

  useEffect(() => {
    console.log(debouncedValue);
    setScrollPosition(debouncedValue);
  }, [debouncedValue, setScrollPosition])

  const handleScroll = () => {
    if (containerRef.current) {
      setValue(containerRef!.current!.scrollTop);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      ref={containerRef}
      className="no-scrollbar pt-8 py-4 flex flex-col items-center lg:p-8 px-0  w-full h-screen rounded-b-xl space-y-4 border-[#E0E0E0] dark:border-[#131d2d] overflow-y-scroll overflow-x-clip">
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
  );
};

export default MemberList;
