import { CalendarClock, Heart, MapPin, Ribbon, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useLocation } from "wouter";
import { getImagePath } from "@/lib/images";
import { MemberData } from "@/types/home";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useState } from "react";
const PostItem = ({ memberData }: { memberData: MemberData }) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [t, i18n] = useTranslation();
  const [, setLocation] = useLocation();
  const { likes, favorites, setFavorites, setLikes } = useHomepageViewStore();
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const toggleLike = useMutation({
    mutationFn: async ({
      member,
      liked,
    }: {
      member: number;
      liked: number;
    }) => {
      const res = await axiosQuery.post("/Like", {
        member: member,
        liked: liked,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["home-members-likes"]);
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({
      member,
      favored,
    }: {
      member: number;
      favored: number;
    }) => {
      const res = await axiosQuery.post("/Favorite", {
        member: member,
        favored: favored,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["home-members-favs"]);
    },
  });

  const handlePostItemClick = () => {
    queryClient.invalidateQueries(["profileContent"]);
    setLocation(`/members/${memberData.member_id}`);
  };

  return (
    <div className="transition ease-in duration-300 transform border rounded-xl">
      <div className="flex flex-col items-center justify-end h-full">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="relative w-max rounded-t-md hover:cursor-pointer">
            {/* vignette */}
            <LazyLoadImage
              onClick={() => handlePostItemClick()}
              placeholder={<Skeleton className="h-full w-full" />}
              effect="opacity"
              alt={"post image"}
              delayTime={100}
              wrapperClassName="relative lg:w-[460px] w-[350px] h-[554px] xl:h-[454px] xl:w-[400px]"
              src={getImagePath(
                memberData.gallery_uuid,
                memberData.gender,
                memberData.member_uuid
              )} // use normal <img> attributes as props
              className="rounded-t-xl lg:w-[460px] w-[350px] h-[554px] xl:h-[454px] xl:w-[400px] object-cover"
            />
            {/* <img
              src={getImagePath(
                memberData.gallery_uuid,
                memberData.gender,
                memberData.member_uuid
              )}
              alt="post-img"
              className="rounded-t-xl lg:w-[460px] w-[350px] h-[554px] xl:h-[454px] xl:w-[400px] object-cover"
            /> */}
            <div className="absolute bottom-0 w-full">
              <div
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
                className="flex flex-row w-full justify-between ">
                <div
                  onClick={() => handlePostItemClick()}
                  className="flex flex-col p-8 hover:cursor-pointer"
                >
                  <p className="text-white border bg-[#FF599B]/90 max-w-max px-5 py-2 rounded-lg border-white text-xl mb-3 select-none">
                    {memberData.nickname}
                  </p>
                  {/* <p className="text-white text-sm">{countryName}</p> */}
                  <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white text-sm lg:text-lg 2xl:text-lg">
                    {`${memberData.state_name}, ${memberData.country_name}`}
                  </p>
                </div>
                <TooltipProvider>
                  <div
                    dir={i18n.language == "ar" ? "rtl" : "ltr"}
                    className={cn(
                      "flex items-center space-x-2 px-2 justify-center mb-5",
                      i18n.language == "ar" && "space-x-reverse"
                    )}
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <Heart
                          color="#FF599B"
                          fill={
                            likes[memberData.member_id.toString()]
                              ? "#FF599B"
                              : "white"
                          }
                          strokeWidth={1.5}
                          stroke={
                            !likes[memberData.member_id.toString()]
                              ? "#FF599B"
                              : "white"
                          }
                          size={50}
                          onClick={() => {
                            toggleLike.mutate({
                              member: user!.member_id,
                              liked: memberData.member_id,
                            });
                            const updatedLikes = { ...likes };
                            updatedLikes[memberData.member_id.toString()] =
                              !likes[memberData.member_id.toString()];
                            setLikes(updatedLikes);
                          }}
                          className="mt-1 hover:cursor-pointer transition duration-300 ease-in-out"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="mr-4">
                        <p className="text-xs">Add to Likes</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Star
                          color="#FF599B"
                          fill={
                            favorites[memberData.member_id.toString()]
                              ? "#FF599B"
                              : "white"
                          }
                          stroke={
                            !favorites[memberData.member_id.toString()]
                              ? "#FF599B"
                              : "white"
                          }
                          size={50}
                          strokeWidth={1.5}
                          onClick={() => {
                            toggleFavorite.mutate({
                              member: user!.member_id,
                              favored: memberData.member_id,
                            });
                            const updatedFavorites = { ...favorites };
                            updatedFavorites[memberData.member_id.toString()] =
                              !favorites[memberData.member_id.toString()];
                            setFavorites(updatedFavorites);
                          }}
                          className={cn("mt-1 hover:cursor-pointer transition duration-300 ease-in-out", i18n.language != 'ar' ? "mr-4" : "ml-4")}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="mr-8">
                        <p className="text-xs w-16 text-center">
                          Add to Favourites
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </div>
          {/* bio */}
          <div className="flex flex-col justify-center items-center"></div>
          <div className="flex flex-row justify-start space-x-3 mt-5 pb-5 lg:px-0 px-2">
            <div
              className={cn(
                "rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]",
                i18n.language == "ar" && "space-x-reverse"
              )}
            >
              <CalendarClock
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p className="text-[#FF599B] mt-1 text-sm ">
                {memberData.age} {t("memberDetails.years")}
              </p>
            </div>
            <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
              <Ribbon
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p
                className={`text-[#FF599B] mt-1 ${memberData.marital_status === "Prefer not to say"
                  ? "text-sm"
                  : ""
                  }`}
              >
                {memberData.marital_status}
              </p>
            </div>
            {
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {
                      imageLoaded ?
                        <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center items-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
                          <LazyLoadImage
                            onError={() => {
                              setImageLoaded(false);
                            }}
                            effect="opacity"
                            alt={"post country flag"}
                            width={imageLoaded ? 30 : 0}
                            height={imageLoaded ? 30 : 0}
                            src={`https://muffin0.blob.core.windows.net/flags/${memberData.country_code.toLocaleLowerCase()}.png`}
                          />
                        </div>
                        :
                        <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
                          <MapPin
                            color="#FF599B"
                            fill="white"
                            size={25}
                            className="mt-1 hover:cursor-pointer"
                          />
                          <p
                            className={`text-[#FF599B] mt-1 ${memberData.marital_status === "Prefer not to say"
                              ? "text-sm"
                              : ""
                              }`}
                          >
                            {memberData.country_code}
                          </p>
                        </div>
                    }
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{memberData.nationality}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
          </div>
        </div>
        {/* <div className="h-[500px]"></div> */}
      </div>
    </div>
  );
};

export default PostItem;
