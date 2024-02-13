import AuthenticatedLayout from "./layout";
import { MoreHorizontal, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import likesQuery from "@/queries/likes";
import { useQuery } from "@tanstack/react-query";
import { Like } from "@/types/like";
import { getImagePath } from "@/lib/images";
import { useState } from "react";
import SkeletonLoading from "@/components/likesAndFavourites/skeletonLoading";
import { useUserStore } from "@/zustand/auth/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";
import LikesMobileNav from "@/components/likesAndFavourites/likesMobileNav";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
const LikesPage = () => {
  const [t, i18n] = useTranslation();
  const [tab] = useState<"LIKES" | "FAVOURITES">("LIKES");
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState<string>("");
  const { user } = useUserStore();
  const getMemberLikes = likesQuery.getLikes(user!.member_id, i18n.language);

  const likesQueryResults = useQuery({
    queryKey: ["member-likes"],
    queryFn: () => getMemberLikes,
  });

  const handleFilter = (like: Like) => {
    let match = true;
    if (search.length !== 0) {
      match = like.nickname.toLowerCase().includes(search.toLowerCase());
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
        className="hover:ring-2 transition-all ring-primary hover:cursor-pointer  w-full p-8 flex justify-between items-center h-48 border rounded-lg"
      >
        <Helmet>
          <title>Likes</title>
          <link
            rel="canonical"
            href={`https://${window.location.hostname}/likes`}
          />
        </Helmet>
        <div
          className={cn(
            "flex space-x-2 items-center",
            i18n.language == "ar" && "space-x-reverse"
          )}
        >
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
                {t("likes.viewProfile")}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const likes = likesQueryResults.data?.filter(handleFilter).map(handleMap);

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col w-full h-full space-y-2 md:space-y-4">
        <LikesMobileNav />
        <div className="lg:pt-4">
          <div className="w-full h-full items-center justify-between px-10 hidden lg:flex">
            <h1 className="font-semibold  text-lg">{t("likes.likes")}</h1>
          </div>
        </div>{" "}
        <div className="w-full md:flex h-max hidden"></div>
        {
          <div className="flex lg:justify-end justify-center md:h-max items-center px-8">
            <div className="w-max border py-4 px-6 space-x-2 rounded-xl flex items-center">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="h-4 border-0 focus:outline-0 w-full dark:text-white dark:bg-[#020817]"
                placeholder={t("search.search")}
              />
              <SearchIcon color="gray" />
            </div>
          </div>
        }
        <div className="gap-4 py-2 lg:px-8 px-3 grid overflow-y-auto lg:grid-cols-2 rows-auto">
          {likesQueryResults.isLoading && <SkeletonLoading />}
          {tab == "LIKES" && likes}
          {!likesQueryResults.isLoading &&
            likes.length == 0 &&
            tab == "LIKES" && <p>No likes</p>}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default LikesPage;
