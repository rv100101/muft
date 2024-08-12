import React from "react";
import mircosoftlogo from "@/assets/auth/microsoftlgo.png";
import apppleLogo from "@/assets/auth/appleLogov2.png";

import GoogleLoginButton from "./googleLogin";

const SocialLogin = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full">
        <div className="border-b border-black mt-3 h-[1px] w-full"></div>
        <div className="mx-2 text-black font-bold">or</div>
        <div className="border-b border-black mt-3 h-[1px] w-full"></div>
      </div>

      <div className="flex flex-row space-x-5 mt-3 justify-center">
        <GoogleLoginButton />
        <img
          src={mircosoftlogo}
          alt="microsoft-logo"
          className="hover:cursor-pointer"
        />
        <img
          src={apppleLogo}
          alt="apple-logo"
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SocialLogin;
