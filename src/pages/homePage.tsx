import { useEffect, useRef } from "react";
import PostHeader from "@/components/home/postHeader";
import AuthenticatedLayout from "./authenticatedPages/layout";
import Suggestions from "@/components/suggestions";
import PostItem from "@/components/home/postItem";
import { useQuery } from "@tanstack/react-query";
import membersQuery from "@/queries/home";
import { Skeleton } from "@/components/ui/skeleton";
import useHomepageViewStore from "@/zustand/home/homepageView";

type Member = {
  nickname: string;
  age: number;
  countryName: string;
  member_uuid: string;
  gallery_uuid: string;
  gender: string;
  imagePath: string;
  member_id: number;
};

const HomePage = () => {
  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const getMembers = membersQuery.getMembers(403);

  const { data: members, isLoading } = useQuery({
    queryKey: ["home-members"],
    queryFn: () => getMembers,
  });

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Load more PostItems (for example, by adding new instances to state)
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
    return () => {
      setSelectedProfileId(null);
    };
  });

  return (
    <AuthenticatedLayout>
      <div className="flex justify-center lg:grid-cols-9 grid-cols-1 gap-4">
        <div className="hidden lg:block w-32"></div>
        <div className="col-span-4 w-min overflow-auto no-scrollbar">
          {isLoading ? (
            <div className="flex justify-center space-x-4 w-full ml-5 mt-10 bg-red">
              <div className="space-y-2 ">
                <Skeleton className="h-6 w-[400px]" />
                <Skeleton className="h-6 w-[375px]" />
                <Skeleton className="h-6 w-[375px]" />
                <Skeleton className="h-6 w-[350px]" />
                <Skeleton className="h-6 w-[350px]" />
                <Skeleton className="h-6 w-[300px]" />
                <Skeleton className="h-6 w-[300px]" />
              </div>
            </div>
          ) : (
            <>
              <PostHeader />
              <div
                className="no-scrollbar p-8 rounded-b-xl space-y-4 border border-[#E0E0E0] h-min overflow-y-auto scroll-smooth"
                ref={containerRef}
              >
                {members.map((post: Member, index: number) => {
                  console.log(
                    "🚀 ~ file: homePage.tsx:92 ~ {members.map ~ post:",
                    post
                  );
                  return (
                    // <h1 className="bg-red-500">{post.nickname}</h1>
                    <PostItem
                      key={index}
                      nickname={post.nickname}
                      countryName={post.countryName}
                      age={post.age}
                      image={post.imagePath}
                      member_id={post.member_id}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="md:col-span-3 col-span-0 xs:hidden overflow-auto no-scrollbar">
          <Suggestions />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
