import { CalendarClock, Heart, MapPin, Ribbon, Star, HeartHandshake } from "lucide-react";
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
import likesQuery from "@/queries/likes";
import moment from "moment-with-locales-es6";
const PostItem = ({ memberData }: { memberData: MemberData }) => {

  const lastActiveMoment = moment(memberData.last_active_date, "YYYY-MM-DD HH:mm:ss.SSSSSSS");

  // Get the current time
  const currentMoment = moment();

  // Calculate the difference in minutes
  const minutesDifference = currentMoment.diff(lastActiveMoment, 'minutes');
  console.log(minutesDifference);


  const [imageLoaded, setImageLoaded] = useState(true);
  const [t, i18n] = useTranslation();
  const [, setLocation] = useLocation();
  const { likes, favorites, setFavorites, setLikes } = useHomepageViewStore();
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const toggleLike = useMutation({
    mutationFn: async ({
      liker,
      liked,
    }: {
      liker: number;
      liked: number;
    }) => {
      return likesQuery.likeUser(liker, liked, i18n.language);
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
    <div className="transition w-max ease-in duration-300 transform border rounded-xl">
      <div className="flex flex-col w-full items-center justify-end h-full">
        <div className="flex flex-col w-max h-full justify-center items-center">
          <div className="relative lg:w-[460px] w-[350px] h-[554px] xl:h-[454px] xl:w-[400px] hover:cursor-pointer">
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
              className="rounded-xl lg:w-[460px] w-[350px] h-[554px] xl:h-[454px] xl:w-[400px] object-cover"
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
            {
              memberData.is_new == "1" ?
                <div className="absolute left-3 top-4">
                  <p className="text-[#FF599B]/90 border border-[#FF599B]/90 max-w-max px-2 py-1 rounded-lg bg-white text-sm mb-3 select-none">{memberData.is_new == "1" ? "New Member" : ""}</p>
                </div>
                :
                <></>
            }
            {/* {parseInt(memberData.match_percentage) > 10 &&
            
            } */}
            {
              memberData.match_percentage !== "0" ?
                <div className="absolute right-0 top-4">
                  {/* <p className="text-[#FF599B]/90 border-t-2 border-l-2 border-b-2 border-[#FF599B]/90 max-w-max
                  px-2 py-1 rounded-l-lg bg-white text-xs mb-3 select-none">
                    {memberData.is_new == "1" ? "New Member" : ""}
                  </p> */}
                  < TooltipProvider >
                    <Tooltip>
                      <TooltipTrigger className="text-[#FF599B]/90 border-t border-l-2 border-b-2 border-[#FF599B]/90 max-w-max
                  px-2 py-1 rounded-l-lg bg-white text-sm mb-3 select-none">
                        <div className="flex space-x-2 items-center justify-center">
                          <HeartHandshake />
                          <p
                            className={`text-[#FF599B] ${memberData.marital_status === "Prefer not to say"
                              ? "text-sm"
                              : ""
                              }`}
                          >
                            {memberData.match_percentage}%
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="mr-4">
                        <p>Matched</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                :
                <></>
            }
            <div className="absolute translate-y-1/2 h-full top-0 w-full">
              <div
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
                className="flex flex-row w-full justify-between ">
                <TooltipProvider>
                  <div
                    dir={i18n.language == "ar" ? "rtl" : "ltr"}
                    className={cn(
                      "flex flex-col items-center pr-2  absolute right-0 justify-center",
                      i18n.language == "ar" && "space-x-reverse"
                    )}
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <Heart
                          color="#FF599B"
                          strokeWidth={1.5}
                          stroke={
                            !likes[memberData.member_id.toString()]
                              ? "#FF599B"
                              : "white"
                          }
                          size={42}
                          onClick={() => {
                            toggleLike.mutate({
                              liker: user!.member_id,
                              liked: memberData.member_id,
                            });
                            const updatedLikes = { ...likes };
                            updatedLikes[memberData.member_id.toString()] =
                              !likes[memberData.member_id.toString()];
                            setLikes(updatedLikes);
                          }}
                          className={cn("mt-1 hover:cursor-pointer transition duration-300 ease-in-out fill-white/70", likes[memberData.member_id.toString()]
                            ? "fill-[#FF599B]"
                            : "fill-white/70")}
                        />
                      </TooltipTrigger>
                      <TooltipContent >
                        <p className="text-xs">Add to Likes</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Star
                          color="#FF599B"
                          stroke={
                            !favorites[memberData.member_id.toString()]
                              ? "#FF599B"
                              : "white"
                          }
                          size={42}
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
                          className={cn("mt-1 hover:cursor-pointer transition duration-300 ease-in-out fill-white/70", favorites[memberData.member_id.toString()]
                            ? "fill-[#FF599B]"
                            : "fill-white/70")}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
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
          <div className="absolute bottom-0 left-0 ml-2">
            <div
              onClick={() => handlePostItemClick()}
              className="flex flex-col w-full hover:cursor-pointer"
            >
              {
                minutesDifference <= 5 &&
                <div className="flex  justify-start space-x-1 items-center">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <p className=" drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] text-green-400">
                    Online
                  </p>
                </div>
              }
              <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white text-left  max-w-max rounded-lg border-white text-4xl font-bold select-none">
                {memberData.nickname}
              </p>
              {/* <p className="text-white text-sm">{countryName}</p> */}
              <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white text-sm lg:text-lg 2xl:text-lg">
                {`${memberData.state_name ?? 'Unknown'}, ${memberData.country_name}`}
              </p>
            </div>
            <div className="flex flex-row justify-start space-x-3 mt-4 pb-5 lg:px-0 px-2">
              {
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {
                        imageLoaded ?
                          <div className="rounded-full bg-[#FFF2F7]/70 font-semibold flex flex-row justify-center items-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
                            <LazyLoadImage
                              onError={() => {
                                setImageLoaded(false);
                              }}
                              effect="opacity"
                              alt={"post country flag"}
                              width={imageLoaded ? 30 : 0}
                              height={imageLoaded ? 30 : 0}
                              src={`https://muffin0.blob.core.windows.net/flags/${memberData.nationality_flag.toLocaleLowerCase()}.png`}
                            />
                          </div>
                          :
                          <div className="rounded-full bg-[#FFF2F7]/70 flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
                            <MapPin
                              color="#FF599B"
                              size={25}
                              className="mt-1 hover:cursor-pointer"
                            />
                            <p
                              className={`text-[#FF599B] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-1 ${memberData.marital_status === "Prefer not to say"
                                ? "text-sm"
                                : ""
                                }`}
                            >
                              {memberData.nationality_flag}
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
              <div className="rounded-full bg-[#FFF2F7]/70 font-semibold flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
                <Ribbon
                  color="#FF599B"
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
              <div
                className={cn(
                  "rounded-full bg-[#FFF2F7]/70  font-semibold items-center flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]",
                  i18n.language == "ar" && "space-x-reverse"
                )}
              >
                <CalendarClock
                  color="#FF599B"
                  size={20}
                  className="mt-1 hover:cursor-pointer hidden sm:block"
                />
                <p className="text-[#FF599B] mt-1 text-md">
                  {memberData.age} {t("memberDetails.years")}
                </p>
              </div>
            </div>
          </div>
        </div>
        {
          minutesDifference <= 5 &&
          <div className="absolute right-3 bottom-4">
            <iframe className="w-12 h-12 self-end" src="https://lottie.host/embed/be18e60d-93ed-4339-8a59-6b0874f44441/eCFPKstK2T.json"></iframe>
          </div>
        }
      </div>
    </div >
  );
};

export default PostItem;
