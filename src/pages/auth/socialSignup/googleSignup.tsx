import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const GoogleSignUpButton = () => {
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credentialResponse.credential}`
        );
        const userInfo = await response.json();

        console.log("Google User Info:", userInfo);

        const { name, email } = userInfo;
        const [firstName, ...lastNameParts] = name.split(" ");
        const lastName = lastNameParts.join(" ");

        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Email:", email);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  const handleError = () => {
    console.error("Google login error");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      // Provide any additional props here if supported
    />
  );
};

export default GoogleSignUpButton;
