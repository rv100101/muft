import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import fbLogo from "@/assets/auth/facebook-logo.png";

interface GoogleSignUpButtonProps {
  onSuccess: (userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    email_service: string;
  }) => void;
}
const FacebookLoginButton: React.FC<GoogleSignUpButtonProps> = ({
  onSuccess,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResponse = (response: any) => {
    if (response.accessToken) {
      console.log("Login successful:", response);

      const { accessToken, userID } = response;
      fetch(
        `https://graph.facebook.com/${userID}?fields=name,email&access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          const { name, email } = data;
          console.log("Fetched name:", name);
          console.log("Fetched email:", email);

          const [firstName, ...lastNameParts] = name.split(" ");
          const lastName = lastNameParts.join(" ");
          const email_service = "1";
          onSuccess({ email, firstName, lastName, email_service });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.error("Login failed:", response);
    }
  };

  return (
    <div>
      <FacebookLogin
        appId="460172250155750" // Replace with your Facebook app ID
        autoLoad={false}
        fields="name,email,picture"
        scope="email"
        onSuccess={handleResponse}
        onFail={handleResponse} // Use the same handler for failures
      />

      <button
        onClick={() =>
          (window as any).FB.login(handleResponse, {
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
