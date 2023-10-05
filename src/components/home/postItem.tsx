import postImage from "@/assets/home/sample-post-image.png";

import { Codepen, Heart } from "lucide-react";
import { useState } from "react";

const PostItem = () => {
  const [isLike, setLike] = useState(false);
  return (
    <>
      <div className="relative flex flex-col items-center justify-end h-full w-full p-3">
        <div className="flex flex-col h-full justify-center items-center py-5 px-10">
          <img
            src={postImage}
            alt="post-img"
            width={520}
            className="rounded-md w-full"
            // height={1000}
            // className="h-2/4 "
          />
          <div className="absolute bottom-[180px]">
            <div className="flex flex-row w-full justify-center space-x-20">
              <div className="flex flex-col">
                <p className="text-white text-2xl mb-3">John, 28</p>
                <p className="text-white text-sm">
                  Creative Director at Pheonix Inc.
                </p>
                <p className="text-white text-sm">
                  University of California, Berkeley
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Heart
                  color="#FF599B"
                  fill={isLike ? "#FF599B" : "white"}
                  size={40}
                  onClick={() => setLike((prev) => !prev)}
                  className="mt-1 hover:cursor-pointer transition duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>
          {/* bio */}
          <div className="flex flex-col justify-center items-center">
            <p className="text-[#727272] pt-5 px-0 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className="flex flex-row justify-start space-x-3 mt-5">
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
    </>
  );
};

export default PostItem;
