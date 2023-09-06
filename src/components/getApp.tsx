import GooglePlay from "@/assets/google-play-logo.png";
import Apple from "@/assets/apple-logo.png";
import { useState } from "react";
const GetApp = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-full relative justify-end md:flex hidden">
      <button
        onPointerEnter={() => {
          setIsHovered(true);
        }}
        onPointerLeave={() => {
          setIsHovered(false);
        }}
        className="overflow-hidden hover:transition-all delay-50 duration-200 h-12 hover:h-28 hover:space-y-4 group hover:flex-col w-32 fixed bottom-8 bg-white py-2 px-2 hover:space-x-0 flex justify-around items-center border-black border border-r-0 rounded-l-lg"
      >
        <p className="font-bold text-xs text-[#1B2950] mr-2">GET APP</p>
        <div className="flex group-hover:flex-col space-x-2 group-hover:space-x-0 group-hover:space-y-1 hover:space-y-1 text-xs text-black font-semibold">
          <a
            className="hover:transition delay-100 w-full hover:bg-black hover:text-white group-hover:p-2 group-hover:py-1 border-black flex items-center justify-between group-hover:border-2 rounded-md"
            href="/"
          >
            <img className="w-4 h-4" src={GooglePlay} alt="google play logo" />
            {isHovered && <p>Google Play</p>}
          </a>
          <a
            className="hover:transition delay-100 w-full hover:bg-slate-200 hover:text-black group-hover:p-2 group-hover:py-1 border-black flex items-center justify-between group-hover:border-2 rounded-md"
            href="/"
          >
            <img className="w-4 " src={Apple} alt="apple logo" />
            {isHovered && <p>App Store</p>}
          </a>
        </div>
      </button>
    </div>
  );
};

export default GetApp;
