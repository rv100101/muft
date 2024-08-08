// src/components/GoogleLoginButton.tsx

import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import googleLogo from "@/assets/auth/google-logo.png";

interface GoogleLoginButtonProps {
  onLogin: (token: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLogin }) => {
  const clientId =
    "1095593932135-lomoci342enqi58h33hkl2phqgienkb7.apps.googleusercontent.com";

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      console.log("Google Login Success:", response.profileObj);
      onLogin(response.tokenId);
      // You can send the token to your backend server for further processing
    }
  };

  const onFailure = (response: any) => {
    console.error("Google Login Failed:", response);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <img
          src={googleLogo}
          alt="google-logo"
          onClick={renderProps.onClick}
          className={`hover:cursor-pointer ${renderProps.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      )}
    />
  );
};

export default GoogleLoginButton;
