import { useEffect } from "react";
import AuthenticatedLayout from "./authenticatedPages/layout";
import { useQuery } from "@tanstack/react-query";
import membersQuery from "@/queries/home";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useUserStore } from "@/zustand/auth/user";
import HomepageSearchInput from "@/components/homeSearchUsersInput";
import { useUpdateEffect } from "usehooks-ts";
import Posts from "@/components/home/posts";
import { Member, MemberData } from "@/types/home";
import createMap from "@/lib/likesAndFavoritesHomeMap";
import { Helmet } from "react-helmet-async";
import HomeFilters from "@/components/home/filters";
import { useFilterStore } from "@/zustand/home/filter";

const HomePage = () => {
  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId
  );
  const setMemberList = useHomepageViewStore(
    (state) => state.setModifiedMemberList
  );
  const setIsLoading = useHomepageViewStore((state) => state.setIsLoading);
  const { user } = useUserStore();
  const likes = useHomepageViewStore((state) => state.likes);
  const favorites = useHomepageViewStore((state) => state.favorites);
  const setLikes = useHomepageViewStore((state) => state.setLikes);
  const setFavorites = useHomepageViewStore((state) => state.setFavorites);
  const memberList = useHomepageViewStore((state) => state.modifiedMemberList);
  const getMembers = membersQuery.getMembers(user!.member_id);
  const getMemberLikes = membersQuery.getMemberLikes(user!.member_id);
  const filters = useFilterStore((state) => state.filters);

  const getMemberFavorites = membersQuery.getMemberFavorites(user!.member_id);
  const { data: members, isLoading: retrievingMemberData } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["home-members"],
    queryFn: () => getMembers,
  });

  const { data: memberLikes, isLoading: likesLoading } = useQuery({
    enabled: memberList.length === 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["home-members-likes"],
    queryFn: () => getMemberLikes,
  });

  useUpdateEffect(() => {
    if (Object.keys(likes).length !== 0) {
      return;
    }
    if (memberList && memberLikes) {
      const likes = createMap(memberList, memberLikes);
      setLikes(likes);
    }
  }, [memberLikes, memberList, likes]);

  // favorites
  const { data: memberFavorites, isLoading: favoritesLoading } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    queryKey: ["home-members-favs"],
    queryFn: () => getMemberFavorites,
  });

  useUpdateEffect(() => {
    if (Object.keys(favorites).length !== 0) {
      return;
    }
    if (memberList && memberFavorites) {
      const favorites = createMap(memberList, memberFavorites);
      setFavorites(favorites);
    }
  }, [memberFavorites, memberList, likes]);

  useUpdateEffect(() => {
    setIsLoading(retrievingMemberData);
  }, [retrievingMemberData]);

  useEffect(() => {
    if (!retrievingMemberData && memberLikes && memberFavorites && members) {
      const updatedMemberList = members.map((member: MemberData) => {
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

      if (filters == null) {
        console.log("updating");
        setMemberList(updatedMemberList);
      }

      // filteredMemberList.sort((a, b) => a.age - b.age);
      // setMemberList(
      //   debouncedStartFilterVal > 0 ? filteredMemberList : updatedMemberList
      // );
    }
  }, [
    memberLikes,
    memberFavorites,
    members,
    setMemberList,
    filters,
    retrievingMemberData,
  ]);

  useEffect(() => {
    return () => {
      setSelectedProfileId(null);
    };
  });

  return (
    <AuthenticatedLayout>
      <Helmet>
        <meta
          name={"description"}
          content={
            "Explore Love Worldwide with Muffin, your gateway to finding love across continents"
          }
          data-react-helmet="true"
        />
        <title>Muffin | Page</title>
        <link rel="canonical" href={`https://${window.location.hostname}/`} />
      </Helmet>
      <div className="flex 2xl:justify-center w-full">
        <div className="flex 2xl:justify-center w-full lg:w-min justify-start lg:grid-cols-9 grid-cols-1 gap-4">
          <div className="hidden lg:block w-32"></div>
          <Posts
            isLoading={retrievingMemberData || likesLoading || favoritesLoading}
            memberList={memberList}
          />
          <div className="md:col-span-3 col-span-0 hidden lg:flex sm:flex-col overflow-auto no-scrollbar ml-10">
            <div className="w-[380px] h-5/6 pt-4 px-5 lg:p-4 sm:flex flex-col hidden ">
              <HomepageSearchInput />
              {/* filter */}
              <HomeFilters isLoading={retrievingMemberData} members={members} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
