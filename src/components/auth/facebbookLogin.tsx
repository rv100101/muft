// src/components/FacebookLoginButton.tsx
import React from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import fbLogo from "@/assets/auth/facebook-logo.png";

interface FacebookLoginButtonProps {
  onLogin: (accessToken: string) => void;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
}) => {
  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    console.log(response);
    if (response.accessToken) {
      onLogin(response.accessToken);
    }
  };

  return (
    <div>
      <FacebookLogin
        appId="460172250155750" // Replace with your Facebook App ID
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="hidden" // Hide the default button
      />
      <button
        onClick={() =>
          (window as any).FB.login(responseFacebook, {
            scope: "public_profile,email",
          })
        }
        className="hover:cursor-pointer"
      >
        <img src={fbLogo} alt="facebook-logo" />
      </button>
    </div>
  );
};

export default FacebookLoginButton;
