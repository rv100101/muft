import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import fbLogo from "@/assets/auth/facebook-logo.png";
import { useTranslation } from "react-i18next";
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
  const [t] = useTranslation();
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
        appId="460172250155750" 
        autoLoad={false}
        fields="name,email,picture"
        scope="email"
        onSuccess={handleResponse}
        onFail={handleResponse} 
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="bg-blue-600  text-white text-xs px-3 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src={fbLogo}
              alt="Facebook logo"
              className="w-6 h-6 inline mr-2"
            />
            {t("signUp.withFacebook")}
          </button>
        )}
      />
    </div>
  );
};

export default FacebookLoginButton;
