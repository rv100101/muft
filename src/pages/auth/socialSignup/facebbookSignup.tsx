import React, { useState,  } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FacebookLoginButton: React.FC = () => {
  const [, setProfile] = useState<{ name?: string; email?: string }>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResponse = (response: any) => {
    if (response.status === "connected") {
      const { accessToken, userID } = response.authResponse;

      // Fetch the profile using the access token
      fetch(
        `https://graph.facebook.com/${userID}?fields=name,email&access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          const { name, email } = data;
          setProfile({ name, email });

          const [firstName, lastName] = name?.split(" ") || [];

          console.log("First Name:", firstName);
          console.log("Last Name:", lastName);
          console.log("Email:", email);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
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
      onSuccess={handleResponse}
      onFail={handleResponse}
    />
  );
};

export default FacebookLoginButton;
