import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FacebookLoginButton: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResponse = (response: any) => {
    if (response.accessToken) {
      console.log("Login successful:", response);

      // You can use the accessToken to fetch the profile
      const { accessToken, userID } = response;
      fetch(
        `https://graph.facebook.com/${userID}?fields=name,email&access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          const { name, email } = data;
          console.log("Fetched name:", name);
          console.log("Fetched email:", email);
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
      onFail={handleResponse} // Use the same handler for failures
    />
  );
};

export default FacebookLoginButton;
