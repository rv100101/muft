import { useEffect, useState } from "react";
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
import { usePreferredLanguageStore } from "@/zustand/auth/preferred_language";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";
import { useLocation } from "wouter";

const HomePage = () => {
  const [t, i18n] = useTranslation();
  const [location] = useLocation();
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [filtersTriggered, setFiltersTriggered] = useState(false);
  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId
  );
  const user = useUserStore((state) => state.user);
  const setMemberList = useHomepageViewStore(
    (state) => state.setModifiedMemberList
  );
  const setIsLoading = useHomepageViewStore((state) => state.setIsLoading);
  const likes = useHomepageViewStore((state) => state.likes);
  const favorites = useHomepageViewStore((state) => state.favorites);
  const preferredLang = usePreferredLanguageStore((state) => state.preferred);
  const setLikes = useHomepageViewStore((state) => state.setLikes);
  const setFavorites = useHomepageViewStore((state) => state.setFavorites);
  const memberList = useHomepageViewStore((state) => state.modifiedMemberList);
  const getMembers = membersQuery.getMembers(
    user!.member_id,
    preferredLang ?? "en"
  );
  const getMemberLikes = membersQuery.getMemberLikes(
    user!.member_id,
    i18n.language
  );
  const filters = useFilterStore((state) => state.filters);

  const getMemberFavorites = membersQuery.getMemberFavorites(
    user!.member_id,
    i18n.language
  );
  const { data: members, isLoading: retrievingMemberData } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["home-members", preferredLang, user?.gender],
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
  }, [memberLikes, memberList]);

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
  }, [setSelectedProfileId]);

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
        <div className="flex xl:justify-center w-full lg:w-full justify-start lg:grid-cols-9 grid-cols-1 gap-4">
          <div className="hidden lg:block w-32"></div>
          <div className="w-full lg:w-max">
            <Posts
              isLoading={retrievingMemberData || likesLoading || favoritesLoading}
              memberList={memberList}
            />
          </div>
          <div className="xl:col-span-3 col-span-0 hidden xl:flex sm:flex-col overflow-auto no-scrollbar ml-10">
            <div className="relative justify-center items-center xl:w-[380px] h-5/6 pt-4 px-5 lg:p-4 sm:flex flex-col hidden ">
              <div className="absolute top-4 h-full">
                <HomepageSearchInput />
              </div>
              {/* filter */}
              <HomeFilters isLoading={retrievingMemberData} members={members} />
            </div>
          </div>
          <div className="lg:flex hidden xl:hidden w-full">
            {/* search */}
            <Dialog
              open={searchTriggered}
              onOpenChange={(val) => setSearchTriggered(val)}
            >
              <DialogContent className="sm:max-w-md opacity-100 w-4/5 left-[50%] top-[18%]">
                <p>Search user</p>
                <HomepageSearchInput />
              </DialogContent>
            </Dialog>
            {/* filters */}
            <Dialog
              open={filtersTriggered}
              onOpenChange={(val) => setFiltersTriggered(val)}
            >
              {location === "/" && (
                <DialogContent className="flex flex-col sm:max-w-md opacity-100 w-4/5">
                  <HomeFilters isLoading={false} members={null} />
                </DialogContent>
              )}
            </Dialog>
            <div
              className={cn(
                "hidden md:flex md:flex-col xl:hidden lg:items-center space-y-2 w-full h-full md:items-start lg:justify-center xl:justify-center",
                i18n.language == "ar" && "space-x-reverse"
              )}
            >
              <div
                onClick={() => {
                  setFiltersTriggered(true);
                }}
                className={cn("flex items-center space-x-2 w-min bg-primary py-2 px-4 cursor-pointer rounded-lg text-white hover:bg-[#FF599B]/90 dark:bg-[#ae2e51]",
                  i18n.language == "ar" && "space-x-reverse"
                )}>
                <SlidersHorizontal
                  size={20}
                  className="w-min h-min"
                />
                <p>
                  {t("filter.filter")}
                </p>
              </div>
              <div onClick={() => { setSearchTriggered(true); }}
                className={cn("flex items-center space-x-2 w-min bg-primary py-2 px-4 cursor-pointer rounded-lg text-white hover:bg-[#FF599B]/90 dark:bg-[#ae2e51]",
                  i18n.language == "ar" && "space-x-reverse")}
              >
                <Search
                  size={20}
                  className="w-min h-min"
                />
                <p>
                  {t("search.search")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  );
};

export default HomePage;
