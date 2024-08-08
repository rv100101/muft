

import React from "react";
import fbLogo from "@/assets/auth/facebook-logo.png";
import googleLogo from "@/assets/auth/google-logo.png";
import mircosoftlogo from "@/assets/auth/microsoftlgo.png";
import apppleLogo from "@/assets/auth/appleLogov2.png";
import FacebookLoginButton from "./facebbookLogin"; // Adjust the import path as necessary
import GoogleLoginButton from "./googleLogin";

const SocialLogin = () => {
  const handleFacebookLogin = (accessToken: string) => {
    // Handle the Facebook login process
    console.log("Facebook Access Token:", accessToken);
    // You can send the access token to your backend server for further processing
  };

  const handleGoogleLogin = (token: string) => {
    // Handle the Google login process
    console.log("Google Token:", token);
    // You can send the token to your backend server for further processing
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full">
        <div className="border-b border-black mt-3 h-[1px] w-full"></div>
        <div className="mx-2 text-black font-bold">or</div>
        <div className="border-b border-black mt-3 h-[1px] w-full"></div>
      </div>

      <div className="flex flex-row space-x-5 mt-3 justify-center">
        <div className="flex flex-col items-center">
          <FacebookLoginButton onLogin={handleFacebookLogin} />
        </div>
        <GoogleLoginButton onLogin={handleGoogleLogin} />
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
