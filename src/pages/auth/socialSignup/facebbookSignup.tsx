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
  /* eslint-disable @typescript-eslint/no-explicit-any */
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
    <div className="flex flex-col items-center space-y-4">
      <FacebookLogin
        appId="460172250155750" // Replace with your Facebook app ID
        autoLoad={false}
        fields="name,email,picture"
        scope="email"
        onSuccess={handleResponse}
        onFail={handleResponse} // Use the same handler for failures
        render={(renderProps) => (
          <button onClick={renderProps.onClick}>
            <img
              src={fbLogo}
              alt="Facebook logo"
              className="w-6 h-6 inline mr-2"
            />
          </button>
        )}
      />
    </div>
  );
};

export default FacebookLoginButton;
