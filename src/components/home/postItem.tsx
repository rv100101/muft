import { Codepen, Heart } from "lucide-react";
import { useState } from "react";

type PostItemProps = {
  nickname: string;
  countryName: string;
  age: number;
  image: string;
};

const PostItem = ({ nickname, age, image }: PostItemProps) => {
  const [isLike, setLike] = useState(false);
  return (
    <div className="transition ease-in duration-300 transform">
      <div className="relative flex flex-col items-center justify-end h-full w-full p-10 border-b">
        <div className="flex flex-col h-full justify-center items-center">
          <img
            src={image}
            alt="post-img"
            width={520}
            className="rounded-md w-[420px]  h-[554px] object-cover"
            // height={1000}
            // className="h-2/4 "
          />
          <div className="absolute bottom-[220px] ">
            <div className="flex flex-row w-full justify-center space-x-10">
              <div className="flex flex-col">
                <p className="text-white text-2xl mb-3">
                  {`${nickname}, ${age}`}
                </p>
                {/* <p className="text-white text-sm">{countryName}</p> */}
                <p className="text-white text-sm">
                  University of California, Berkeley
                </p>
              </div>
              <div className="flex items-center justify-center mb-5">
                <Heart
                  color="#FF599B"
                  fill={isLike ? "#FF599B" : "white"}
                  size={50}
                  onClick={() => setLike((prev) => !prev)}
                  className="mt-1 hover:cursor-pointer transition duration-300 ease-in-out"
                />
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
