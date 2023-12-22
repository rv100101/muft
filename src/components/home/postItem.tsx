import { CalendarClock, Heart, Ribbon, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import { useEffect, useState } from "react";
import useHomepageViewStore from "@/zustand/home/homepageView";
type PostItemProps = {
  nickname: string;
  country: string;
  state: string;
  age: number;
  image: string;
  member_id: number;
  isLiked: boolean;
  isFavorite: boolean;
  status: string;
  nationality: string;
  nationalityCode: string;
};

const PostItem = ({
  nickname,
  age,
  image,
  member_id,
  isLiked,
  isFavorite,
  state,
  country,
  nationalityCode,
  status,
  nationality,
}: PostItemProps) => {
  const [, setLocation] = useLocation();
  const toggleIsLiked = useHomepageViewStore((state) => state.toggleIsLiked);

  const toggleIsFavored = useHomepageViewStore(
    (state) => state.toggleIsFavored
  );

  useEffect(() => {
    toggleIsFavored(isFavorite);
    toggleIsLiked(isLiked);
  }, [toggleIsFavored, toggleIsLiked, isFavorite, isLiked]);

  const [likeTriggered, toggleLikeIcon] = useState(false);
  const [favoriteTriggered, toggleFavoriteIcon] = useState(false);
  const user = useUserStore((state) => state.user);
  const toggleLike = useMutation({
    mutationFn: async ({
      member,
      liked,
    }: {
      member: number;
      liked: number;
    }) => {
      toggleLikeIcon((prev) => !prev);

      const res = await axiosQuery.post("/Like", {
        member: member,
        liked: liked,
      });
      return res.data;
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
      toggleFavoriteIcon((prev) => !prev);

      const res = await axiosQuery.post("/Favorite", {
        member: member,
        favored: favored,
      });
      return res.data;
    },
  });

  const handlePostItemClick = () => {
    setLocation(`/members/${member_id}`);
  };

  return (
    <div className="transition ease-in duration-300 transform border rounded-xl">
      <div className="flex flex-col items-center justify-end h-full">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="relative w-max rounded-t-md  hover:cursor-pointer">
            <img
              src={image}
              alt="post-img"
              className="rounded-t-xl lg:w-[460px] w-[350px] h-[554px] xl:h-[454px] xl:w-[400px] object-cover"
              onClick={() => handlePostItemClick()}
            />
            <div className="absolute bottom-0 w-full">
              <div className="flex flex-row w-full justify-between ">
                <div
                  onClick={() => handlePostItemClick()}
                  className="flex flex-col p-8 hover:underline hover:cursor-pointer"
                >
                  <p className="text-white text-2xl 2xl:text-3xl mb-3  select-none">
                    {nickname}
                  </p>
                  {/* <p className="text-white text-sm">{countryName}</p> */}
                  <p className="text-white text-sm 2xl:text-xl">
                    {`${country}, ${state}`}
                  </p>
                </div>
                <TooltipProvider>
                  <div className="flex items-center space-x-2 justify-center mb-5">
                    <Tooltip>
                      <TooltipTrigger>
                        <Heart
                          color="#FF599B"
                          fill={
                            isLiked && !likeTriggered
                              ? "#FF599B"
                              : !isLiked && likeTriggered
                              ? "#FF599B"
                              : "white"
                          }
                          strokeWidth={1.5}
                          stroke={!isLiked ? "#FF599B" : "white"}
                          size={50}
                          onClick={() =>
                            toggleLike.mutate({
                              member: user!.member_id,
                              liked: member_id,
                            })
                          }
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
                            isFavorite && !favoriteTriggered
                              ? "#FF599B"
                              : !isFavorite && favoriteTriggered
                              ? "#FF599B"
                              : "white"
                          }
                          // stroke={!isFavorite ? "#FF599B" : "white"}
                          size={50}
                          strokeWidth={1.5}
                          onClick={() =>
                            toggleFavorite.mutate({
                              member: user!.member_id,
                              favored: member_id,
                            })
                          }
                          className="mt-1 hover:cursor-pointer transition duration-300 ease-in-out mr-4"
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
            <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
              <CalendarClock
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p className="text-[#FF599B] mt-1 text-sm lg:inline hidden">
                {age} years
              </p>
              <p className="text-[#FF599B] mt-2 text-xs lg:hidden">{age} yrs</p>
            </div>
            <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
              <Ribbon
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p
                className={`text-[#FF599B] mt-1 ${
                  status === "Prefer not to say" ? "text-sm" : ""
                }`}
              >
                {status}
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-row rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 dark:bg-[#3b0117] text=[#ff588e]">
                    <img
                      alt={nationality}
                      height={20}
                      width={30}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${nationalityCode}.svg`}
                    />

                    {/* <p className="text-[#FF599B] mt-1 text-sm ">
                      {nationalityCode}
                    </p> */}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{nationality}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {/* <div className="h-[500px]"></div> */}
      </div>
    </div>
  );
};

export default PostItem;
