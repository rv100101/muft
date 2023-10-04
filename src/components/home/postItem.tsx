import postImage from "@/assets/home/sample-post-image.png";

import { Codepen, Heart } from "lucide-react";
import { useState } from "react";

const PostItem = () => {
  const [isLike, setLike] = useState(false);
  return (
    <>
      <div className="relative flex flex-col items-center justify-end h-full w-full p-5">
        <div className="flex flex-col h-full justify-center items-center py-5 px-10">
          <img src={postImage} alt="post-img" width={600} className="filter " />
          <div className="absolute bottom-[350px]">
            <div className="flex flex-row w-full justify-center space-x-5">
              <div className="flex flex-col">
                <p className="text-white text-3xl mb-3">John, 28</p>
                <p className="text-white text-md">
                  Creative Director at Pheonix Inc.
                </p>
                <p className="text-white text-md">
                  University of California, Berkeley
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Heart
                  color="#FF599B"
                  fill={isLike ? "#FF599B" : "white"}
                  size={60}
                  onClick={() => setLike((prev) => !prev)}
                  className="mt-1 hover:cursor-pointer transition duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>
          {/* bio */}
          <div className="flex flex-col justify-center items-center p-5">
            <p className="text-[#727272] p-5 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              nesciunt quos. Eius deserunt velit, assumenda debitis blanditiis
              odit fugit asperiores, dolore architecto quia odio vel ratione,
              aliquid qui culpa reprehenderit.
            </p>
          </div>
          <div className="flex flex-row justify-start space-x-3">
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
