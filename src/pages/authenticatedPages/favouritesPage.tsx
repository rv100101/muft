import AuthenticatedLayout from "./layout";
import { MoreHorizontal, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import likesQuery from "@/queries/likes";
import { useQuery } from "@tanstack/react-query";
import { Like } from "@/types/like";
import { getImagePath } from "@/lib/images";
import { useState } from "react";
import favouritesQuery from "@/queries/favourites";
import { useUserCountry } from "@/zustand/auth/country";
import SkeletonLoading from "@/components/likesAndFavourites/skeletonLoading";
import { useUserStore } from "@/zustand/auth/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";
import FavoritesMobileNav from "@/components/likesAndFavourites/favoritesMobileNav";
import { Helmet } from "react-helmet-async";
const FavouritesPage = () => {
  const [, setLocation] = useLocation();
  const [tab] = useState<"LIKES" | "FAVOURITES">("FAVOURITES");
  const [filter] = useState<"ALL" | "CURRENT-COUNTRY">("ALL");
  const [search, setSearch] = useState<string>("");
  const { user } = useUserStore();
  const getMemberLikes = likesQuery.getLikes(user!.member_id);
  const getMemberFavourites = favouritesQuery.getFavourites(user!.member_id);
  const userCountry = useUserCountry((state) => state.country);

  const likesQueryResults = useQuery({
    queryKey: ["member-likes"],
    queryFn: () => getMemberLikes,
  });

  const favouritesQueryResults = useQuery({
    queryKey: ["member-favourites"],
    queryFn: () => getMemberFavourites,
  });

  const handleFilter = (like: Like) => {
    let match = false;
    if (search.length === 0 && filter === "ALL") {
      return true;
    }
    if (search.length !== 0) {
      match = like.nickname.toLowerCase().includes(search.toLowerCase());
    }

    if (filter === "CURRENT-COUNTRY") {
      match = like.country_name.toLowerCase() === userCountry?.toLowerCase();
    }

    return match;
  };

  const handleMap = (like: Like, index: number) => {
    return (
      <div
        onClick={() => {
          setLocation(`/members/${like.member_id}`);
        }}
        key={index}
        className="hover:ring-2 transition-all ring-primary hover:cursor-pointer w-full p-8 flex justify-between items-center h-48 border rounded-lg"
      >
        <Helmet>
          <title>Favorite</title>
        </Helmet>
        <div className="flex space-x-2 items-center">
          <div className="border-4 border-primary w-24 h-24 border-pink p-1 rounded-full">
            <img
              className="w-full object-cover h-full rounded-full"
              src={getImagePath(
                like.gallery_uuid,
                like.gender,
                like.member_uuid
              )}
              alt="user"
            />
          </div>
          <div>
            <p className="font-semibold text-xl">
              {like.nickname}, <span className="text-2xl">{like.age}</span>
            </p>
            <p className="text-sm">{like.country_name}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="h-min ">
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuItem>
              <Button
                onClick={() => {
                  setLocation(`/members/${like.member_id}`);
                }}
                className="hover:bg-[#FF8AB3]"
              >
                View Profile
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const likes = likesQueryResults.data?.filter(handleFilter).map(handleMap);

  const favourites = favouritesQueryResults.data
    ?.filter(handleFilter)
    .map(handleMap);

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col w-full h-full space-y-4">
        <FavoritesMobileNav />
        <div className="lg:pt-4">
          <div className="w-full h-full flex lg:items-center px-10 justify-between hidden lg:flex">
            <h1 className="font-semibold text-lg">FAVORITES</h1>
          </div>
          <div></div>
        </div>{" "}
        <div className="w-full flex h-max">
          {/* <Button
            onClick={() => {
              setTab("LIKES");
            }}
            className={cn(
              "w-full rounded-0 bg-transparent text-black border-r border-t rounded-none border-b p-8 text-[#727272] text-lg",
              tab == "LIKES" && "border-b-4 border-b-[#404040]"
            )}
          >
            LIKES
          </Button>{" "} */}
          {/* <Button
            onClick={() => {
              setTab("FAVOURITES");
            }}
            className={cn(
              "w-full rounded-0 bg-transparent text-black border-r border-t rounded-none border-b text-[#727272] text-lg p-8",
              tab == "FAVOURITES" && "border-b-4 border-b-[#404040]"
            )}
          >
            FAVOURITES
          </Button> */}
        </div>
        <div className="flex lg:justify-end justify-center h-max items-center px-8 ">
          <div>
            {/* <Button
              onClick={() => {
                setFilter("ALL");
              }}
              variant={"ghost"}
              className={cn("rounded-none", filter === "ALL" && "border-b")}
            >
              All
            </Button>
            <Button
              onClick={() => {
                setFilter("CURRENT-COUNTRY");
              }}
              variant={"ghost"}
              className={cn(
                "rounded-none",
                filter === "CURRENT-COUNTRY" && "border-b"
              )}
            >
              Current Country
            </Button> */}
          </div>
          <div className="w-max border py-4 px-6  space-x-2 rounded-xl flex items-center">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="h-4 border-0 focus:outline-0 w-full dark:text-white dark:bg-[#020817]"
              placeholder="Search"
            />
            <SearchIcon color="gray" />
          </div>
        </div>
        <div className="grid gap-4 py-2 lg:px-8 px-3 grid overflow-y-auto lg:grid-cols-2 rows-auto">
          {likesQueryResults.isLoading && <SkeletonLoading />}
          {favouritesQueryResults.isLoading && <SkeletonLoading />}
          {tab == "LIKES" && likes}
          {!likesQueryResults.isLoading &&
            likes.length == 0 &&
            tab == "LIKES" && <p>No likes</p>}
          {!favouritesQueryResults.isLoading &&
            favourites.length == 0 &&
            tab == "FAVOURITES" && <p>No favourites</p>}
          {tab == "FAVOURITES" && favourites}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default FavouritesPage;
