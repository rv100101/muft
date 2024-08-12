import React from "react";

import FacebookLogin, {
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

const FacebookLoginButton: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResponse = (response: ProfileSuccessResponse) => {
    if (response.status === "connected") {
      const { name, email } = response;

      console.log("First Name:", name);
      console.log("Last Name:", name);
      console.log("Email:", email);
    } else {
      console.error("Login failed:", response);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Profile fetched successfully:", response);

    const { name, email } = response;

    console.log("First Name:", name);
    console.log("Last Name:", name);
    console.log("Email:", email);
  };

  return (
    <FacebookLogin
      appId="460172250155750" // Replace with your Facebook app ID
      autoLoad={false}
      fields="name,email,picture"
      scope="email"
      onSuccess={onProfileSuccess}
      onFail={handleResponse} // Use handleResponse for handling errors
    />
  );
};

export default FacebookLoginButton;
