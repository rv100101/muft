import useHomePageScrollPosition from "@/zustand/home/scrollPosition";
import { useEffect, useRef, useState } from "react";
import PostItem from "./postItem";
import { MemberData } from "@/types/home";
import NextLoadingIndicator from "./nextLoadingIndicator";
import { useFilterStore } from "@/zustand/home/filter";

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

  const filterValues = useFilterStore((state) => state.filters);

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.onscrollend = () => {
        setScrollPosition(containerRef.current!.scrollTop);
      }
    }
  }, [containerRef, setScrollPosition])


  useEffect(() => {
    if (!isLoading && scrollPosition && containerRef.current && !isScrollPosUpdated) {
      containerRef.current.scrollTop = +scrollPosition;
      setIsScrollPosUpdated(true);
    }
  }, [isLoading, scrollPosition, isScrollPosUpdated, setScrollPosition]);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar pt-8 py-4 flex flex-col items-center lg:p-8 px-0  w-full h-screen rounded-b-xl space-y-4 border-[#E0E0E0] dark:border-[#131d2d] overflow-y-scroll overflow-x-clip">
      {memberList.length > 0 ? (
        [...memberList.
          filter(
            (member: MemberData) =>
              member.age >= filterValues!.min_age &&
              member.age <= filterValues!.max_age
          )
          .map((post, index: number) => (
            <PostItem key={index} memberData={post} />
          )),
        <div key={"loading"} className="h-96">
          <NextLoadingIndicator key={'loading-skel'} />
        </div>
        ]
      ) : (
        <div className="rounded-t-md lg:w-[460px] w-[350px] object-cover h-screen">
          No Members Found
        </div>
      )}
    </div>
  );
};

export default MemberList;
