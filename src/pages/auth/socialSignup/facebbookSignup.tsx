import React from "react";
import FacebookLogin, {
  SuccessResponse,
} from "@greatsumini/react-facebook-login";
import fbLogo from "@/assets/auth/facebook-logo.png";
interface FacebookLoginButtonProps {
  onLogin: (accessToken: string) => void;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
}) => {
  const handleSuccess = (response: SuccessResponse) => {
    console.log(response);
    if (response.accessToken) {
      onLogin(response.accessToken);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleFailure = (error: any) => {
    console.error("Facebook login failed", error);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleProfileSuccess = (profile: any) => {
    console.log("Profile data:", profile);
  };

  return (
    <div>
      <FacebookLogin
        appId="460172250155750" // Replace with your Facebook App ID
        autoLoad={false}
        fields="name,email,picture"
        onSuccess={handleSuccess}
        onFail={handleFailure}
        onProfileSuccess={handleProfileSuccess}
        // Hide the default button
      />
      <button
        onClick={() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          /* eslint-disable @typescript-eslint/no-explicit-any */
          (window as any).FB.login(handleSuccess, {
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
