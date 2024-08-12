// src/components/FacebookLoginButton.tsx
import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FacebookLoginButton: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleResponse = (response: any) => {
    if (response.status === "connected") {
      // Extract user information from the response
      const { name, email, picture } = response;
      const [firstName, lastName] = name.split(" ");

      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Email:", email);
      console.log("Picture:", picture?.data?.url);
    } else {
      console.error("Login failed:", response);
    }
  };

  return (
    <FacebookLogin
      appId="460172250155750" // Replace with your Facebook app ID
      autoLoad={false}
      fields="name,email,picture"
      scope="email"
      onSuccess={handleResponse} // Adjust based on correct prop name
      // onFailure={handleResponse} // If applicable
    />
  );
};

export default FacebookLoginButton;
