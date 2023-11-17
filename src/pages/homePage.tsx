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
  age: number;
  authorized: boolean;
  country_code: string;
  country_name: string;
  gallery_uuid: string;
  gender: string;
  imagePath: string;
  ip_address: string;
  isLiked: boolean;
  isFavorite: boolean;
  last_active: string;
  member_id: number;
  member_uuid: string;
  nationality: string;
  nickname: string;
  state_name: string;
  countryName: string;
};

const HomePage = () => {
  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId
  );
  const setMemberList = useHomepageViewStore(
    (state) => state.setModifiedMemberList
  );
  const memberList = useHomepageViewStore((state) => state.modifiedMemberList);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const getMembers = membersQuery.getMembers(69);
  const getMemberLikes = membersQuery.getMemberLikes(69);
  const getMemberFavorites = membersQuery.getMemberFavorites(69);

  const { data: members, isLoading } = useQuery({
    queryKey: ["home-members"],
    queryFn: () => getMembers,
  });

  // likes
  const { data: memberLikes, isLoading: likesLoading } = useQuery({
    queryKey: ["home-members-likes"],
    queryFn: () => getMemberLikes,
  });

  // favorites
  const { data: memberFavorites, isLoading: favoritesLoading } = useQuery({
    queryKey: ["home-members-favs"],
    queryFn: () => getMemberFavorites,
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

  useEffect(() => {
    if (memberLikes && members) {
      const updatedMemberList = members.map((member: Member) => {
        const memberHasLikes = memberLikes.find(
          (likes: Member) => member.member_id === likes.member_id
        );

        const memberHasFavorites = memberFavorites?.find(
          (favs: Member) => member.member_id === favs.member_id
        );

        // If a match is found, update the object in the first array
        if (memberHasLikes && memberHasFavorites) {
          return {
            ...member,
            isLiked: true,
            isFavorite: true,
          };
        } else if (!memberHasLikes && memberHasFavorites) {
          return {
            ...member,
            isLiked: false,
            isFavorite: true,
          };
        } else if (memberHasLikes && !memberHasFavorites) {
          return {
            ...member,
            isLiked: true,
            isFavorite: false,
          };
        } else {
          return {
            ...member,
            isLiked: false,
            isFavorite: false,
          };
        }
      });
      // Update state with the modified array
      setMemberList(updatedMemberList);
    }
  }, [memberLikes, memberFavorites, members, setMemberList]);

  if (likesLoading || favoritesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthenticatedLayout>
      <div className="flex justify-center lg:grid-cols-9 grid-cols-1 gap-4">
        <div className="hidden lg:block w-32"></div>
        <div className="col-span-4 w-min overflow-auto no-scrollbar">
          {isLoading && !memberList ? (
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
                {memberList.map((post, index: number) => {
                  return (
                    // <h1 className="bg-red-500">{post.nickname}</h1>
                    <PostItem
                      key={index}
                      nickname={post.nickname}
                      countryName={post.countryName}
                      age={post.age}
                      image={post.imagePath}
                      member_id={post.member_id}
                      isLiked={post.isLiked}
                      isFavorite={post.isFavorite}
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
