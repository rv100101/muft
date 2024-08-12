import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface GoogleSignUpButtonProps {
  onSuccess: (userInfo: {
    email: string;
    firstName: string;
    lastName: string;
  }) => void;
}

const GoogleSignUpButton: React.FC<GoogleSignUpButtonProps> = ({
  onSuccess,
}) => {
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credentialResponse.credential}`
        );
        const userInfo = await response.json();

        const { name, email } = userInfo;
        const [firstName, ...lastNameParts] = name.split(" ");
        const lastName = lastNameParts.join(" ");

        onSuccess({ email, firstName, lastName }); // Pass data to SignUpPage
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  const handleError = () => {
    console.error("Google login error");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleSignUpButton;
