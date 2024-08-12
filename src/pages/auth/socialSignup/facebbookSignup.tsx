import React from "react";
import FacebookLogin, {
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";
import fbLogo from "@/assets/auth/facebook-logo.png";

interface FacebookLoginButtonProps {
  onLogin: (accessToken: string) => void;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
}) => {
  const handleSuccess = (response: ProfileSuccessResponse) => {
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

  const handleProfileSuccess = (profile: ProfileSuccessResponse) => {
    console.log("Profile data:", profile.email);
    console.log("Profile data:", profile.name);
    if (profile.name) {
      const [firstName, ...lastName] = profile.name.split(" ");
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName.join(" "));
    }
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
