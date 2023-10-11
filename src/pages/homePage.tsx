// HomePage.js
import { useRef, useEffect, useState } from "react";
import PostHeader from "@/components/home/postHeader";
// import LazyPostItem from "@/components/home/lazyPostItem";
import AuthenticatedLayout from "./authenticatedPages/layout";
import Suggestions from "@/components/suggestions";
import axiosQuery from "@/queries/axios";
import PostItem from "@/components/home/postItem";
import { getImagePath } from "@/lib/images";

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
  const [isLoading, setIsLoading] = useState(false);
  const [memberPost, setMemberPost] = useState([]);
  const retrieveMembers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/HomePage",
        { member: 69 }
      );
      const { data } = response;

      if (data) {
        setIsLoading(false);
        setMemberPost(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    retrieveMembers();
  }, []);

  useEffect(() => {
    retrieveMembers();
  }, []);

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
              {memberPost.map((post: Member) => {
                const imagePath = getImagePath(
                  post.gallery_uuid,
                  post.gender,
                  post.member_uuid
                );
                return (
                  // <h1 className="bg-red-500">{post.nickname}</h1>
                  <PostItem
                    nickname={post.nickname}
                    countryName={post.countryName}
                    age={post.age}
                    image={imagePath}
                  />
                );
              })}
              {/* {isLoading ? <>Loading...</> : } */}
            </div>
          )}
        </div>
        <div className="col-span-2 overflow-auto">
          {memberPost ? <Suggestions memberPost={memberPost} /> : <></>}
        </div>
        <div className="col-span-1"></div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
