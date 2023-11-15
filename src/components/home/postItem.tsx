import { Codepen, Heart, Star } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import axiosQuery from "@/queries/axios";
type PostItemProps = {
  nickname: string;
  countryName: string;
  age: number;
  image: string;
  member_id: number;
  isLiked: boolean;
};

const PostItem = ({
  nickname,
  age,
  image,
  member_id,
  isLiked,
}: PostItemProps) => {
  const [, setLocation] = useLocation();
  // const [isLike, setLike] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // const getMemberLikes = membersQuery.toggleLikeButton(69, member_id);

  const toggleLike = useMutation({
    mutationFn: async ({ member, liked }) => {
      const res = await axiosQuery.post("/Like", {
        member: member,
        liked: liked,
      });
      return res.data;
    },
    // Add an onSuccess callback to handle successful mutations
    onSuccess: (data) => {
      // Handle success if needed
      console.log("Mutation was successful", data);
    },
  });

  const handlePostItemClick = () => {
    setLocation(`/users/${member_id}`);
  };

  return (
    <div className="transition ease-in duration-300 transform border rounded-md">
      <div className="flex flex-col items-center justify-end h-full">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="relative w-max rounded-t-md">
            <img
              src={image}
              alt="post-img"
              width={520}
              className="rounded-t-md w-[460px] h-[554px] object-cover"
              // height={1000}
              // className="h-2/4 "
            />
            <div className="absolute bottom-0 w-full">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col p-8">
                  <p
                    className="text-white text-2xl mb-3 hover:underline hover:cursor-pointer select-none"
                    onClick={() => handlePostItemClick()}
                  >
                    {`${nickname}, ${age}`}
                  </p>
                  {/* <p className="text-white text-sm">{countryName}</p> */}
                  <p className="text-white text-sm">
                    University of California, Berkeley
                  </p>
                </div>
                <TooltipProvider>
                  <div className="flex items-center space-x-2 justify-center mb-5">
                    <Tooltip>
                      <TooltipTrigger>
                        <Heart
                          color="#FF599B"
                          fill={isLiked ? "#FF599B" : "white"}
                          strokeWidth={1.5}
                          stroke={!isLiked ? "#FF599B" : "white"}
                          size={50}
                          onClick={() =>
                            toggleLike.mutate({
                              member: 69,
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
                          fill={isFavorite ? "#FF599B" : "white"}
                          stroke={!isFavorite ? "#FF599B" : "white"}
                          size={50}
                          strokeWidth={1.5}
                          onClick={() => setIsFavorite((prev) => !prev)}
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
          <div className="flex flex-col justify-center items-center">
            <p className="text-[#727272] pt-5 px-5 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className="flex flex-row justify-start space-x-3 mt-5 pb-5">
            <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 ">
              <Codepen
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p className="text-[#FF599B] mt-1">6'2</p>
            </div>
            <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 ">
              <Codepen
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p className="text-[#FF599B] mt-1">Single</p>
            </div>
            <div className="rounded-full bg-[#FFF2F7] flex flex-row justify-center align-center space-x-2 py-2 px-4 ">
              <Codepen
                color="#FF599B"
                fill="white"
                size={25}
                className="mt-1 hover:cursor-pointer"
              />
              <p className="text-[#FF599B] mt-1">Talented</p>
            </div>
          </div>
        </div>
        {/* <div className="h-[500px]"></div> */}
      </div>
    </div>
  );
};

export default PostItem;
