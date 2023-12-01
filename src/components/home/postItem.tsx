import { CalendarClock, Heart, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import axiosQuery from "@/queries/axios";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useUserStore } from "@/zustand/auth/user";
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

  const likeTriggered = useHomepageViewStore((state) => state.isLiked);
  const favoriteTriggered = useHomepageViewStore((state) => state.isFavored);
  const toggleLikeIcon = useHomepageViewStore((state) => state.toggleIsLiked);
  const user = useUserStore((state) => state.user);
  const toggleFavoriteIcon = useHomepageViewStore(
    (state) => state.toggleIsFavored
  );
  const toggleLike = useMutation({
    mutationFn: async ({
      member,
      liked,
    }: {
      member: number;
      liked: number;
    }) => {
      toggleLikeIcon();
      console.log("like toggle triggered");
      console.log(isLiked);
      console.log(isFavorite);
      console.log(favoriteTriggered);
      console.log("--- end ----");
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
      toggleFavoriteIcon();
      console.log("favorite toggle triggered");
      console.log(isLiked);
      console.log(isFavorite);
      console.log(favoriteTriggered);
      console.log("--- end ----");

      const res = await axiosQuery.post("/Favorite", {
        member: member,
        favored: favored,
      });
      return res.data;
    },
  });

  const handlePostItemClick = () => {
    setLocation(`/users/${member_id}`);
  };

  // console.log("🧨: ", favoriteTriggered);
  return (
    <div className="transition ease-in duration-300 transform border rounded-xl">
      <div className="flex flex-col items-center justify-end h-full">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="relative w-max rounded-t-md  hover:cursor-pointer">
            <img
              src={image}
              alt="post-img"
              // width={520}
              className="rounded-t-xl lg:w-[460px] w-[350px] h-[554px] 2xl:h-[654px] 2xl:w-[570px] object-cover"
              onClick={() => handlePostItemClick()}
              // height={1000}
              // className="h-2/4 "
            />
            <div className="absolute bottom-0 w-full">
              <div className="flex flex-row w-full justify-between ">
                <div className="flex flex-col p-8 hover:underline hover:cursor-pointer">
                  <p
                    className="text-white text-2xl 2xl:text-3xl mb-3  select-none"
                    onClick={() => handlePostItemClick()}
                  >
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
          <div className="flex flex-row justify-start space-x-3 mt-5 pb-5">
            <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 ">
              <CalendarClock
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p className="text-[#FF599B] mt-2 text-sm">{age} years</p>
            </div>
            <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 ">
              <Heart
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p className="text-[#FF599B] mt-1">{status}</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-row rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 ">
                    <img
                      alt={nationality}
                      height={20}
                      width={30}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${nationalityCode}.svg`}
                    />

                    <p className="text-[#FF599B] mt-1 text-sm ">
                      {nationalityCode}
                    </p>
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
