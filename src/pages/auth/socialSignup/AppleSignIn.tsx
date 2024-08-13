import React from "react";
import AppleSignin from "react-apple-signin-auth";

const AppleLoginButton: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleSuccess = (response: any) => {
    console.log("Apple Sign-In Success:", response);
    // Process the response, usually send it to your backend server for verification
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleError = (error: any) => {
    console.error("Apple Sign-In Error:", error);
  };

  return (
    <AppleSignin
      authOptions={{
        clientId: "com.example.yourappid", //  Service ID
        redirectURI: "https://your.domain/redirect", // Your redirect URL
        scope: "email name", // Comma-separated list of scope
        state: "state", // Provide any state you want to persist
        nonce: "nonce", // Provide any nonce you want to persist
        usePopup: true, // or false if you want to redirect
      }}
      onSuccess={handleSuccess}
      onError={handleError}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      /* eslint-disable @typescript-eslint/no-explicit-any */
      render={(props: any) => (
        <button onClick={props.onClick} style={props.style} type="button">
          Sign in with Apple
        </button>
      )}
      uiType={"light"}
    />
  );
};

export default AppleLoginButton;
