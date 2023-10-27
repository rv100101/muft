// HomePage.js
import { useEffect, useRef } from "react";
import PostHeader from "@/components/home/postHeader";
import AuthenticatedLayout from "./authenticatedPages/layout";
import Suggestions from "@/components/suggestions";
import PostItem from "@/components/home/postItem";
import { getImagePath } from "@/lib/images";
import { useQuery } from "@tanstack/react-query";
import membersQuery from "@/queries/home";

type Member = {
  nickname: string;
  age: number;
  countryName: string;
  member_uuid: string;
  gallery_uuid: string;
  gender: string;
};

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getMembers = membersQuery.getMembers(69);

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
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthenticatedLayout>
      <div className="grid grid-cols-6 gap4">
        <div className="col-span-1"></div>
        <div className="col-span-2 overflow-auto no-scrollbar">
          <PostHeader />
          {/* post container */}
          {isLoading ? (
            <>Loading...</>
          ) : (
            <div
              className="no-scrollbar rounded-xl border border-[#E0E0E0] h-full overflow-y-auto scroll-smooth"
              ref={containerRef}
            >
              {members.map((post: Member, index: number) => {
                const imagePath = getImagePath(
                  post.gallery_uuid,
                  post.gender,
                  post.member_uuid
                );
                return (
                  // <h1 className="bg-red-500">{post.nickname}</h1>
                  <PostItem
                    key={index}
                    nickname={post.nickname}
                    countryName={post.countryName}
                    age={post.age}
                    image={imagePath}
                  />
                );
              })}
            </div>
          )}
        </div>{" "}
        <div className="col-span-2 overflow-auto">
          <Suggestions memberPost={members} />
        </div>
        <div className="col-span-1"></div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
