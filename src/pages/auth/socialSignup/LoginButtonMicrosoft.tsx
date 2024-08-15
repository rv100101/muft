import React, { useEffect } from "react";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import micrologo from "@/assets/auth/microsoftlgo.png";
import { useTranslation } from "react-i18next";


interface SignUpButtonProps {
  onSuccess: (userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    email_service: string;
  }) => void;
}

const AuthButtons: React.FC<SignUpButtonProps> = ({ onSuccess }) => {
  const { instance, accounts } = useMsal();
    const [t] = useTranslation();
  const handleLogin = async () => {
    await instance.loginRedirect({
      scopes: ["User.Read"],
    });

    try {
      const result = await instance.handleRedirectPromise();
      const account = result?.account || accounts[0];

      if (account && account.name) {
        const email = account.username || ""; 
        const personName = account.name || "";
        const [firstName = "", lastName = ""] = personName.split(" ");
        const email_service = "1"; 

        onSuccess({
          email,
          firstName,
          lastName,
          email_service,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "https://muft-ovx2.vercel.app/auth/signup",
    });
  };

  useEffect(() => {
    if (accounts[0]?.username) {
      const email = accounts[0]?.username || "";
      const personName = accounts[0]?.name || "";
      const [firstName = "", lastName = ""] = personName.split(" ");
      const email_service = "1"; 

      onSuccess({
        email,
        firstName,
        lastName,
        email_service,
      });
    }

  }, []);

  return (
    <div>
      <AuthenticatedTemplate>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white text-xs px-2 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img src={micrologo} alt="Logout" className="w-6 h-6 inline mr-2" />
          Logout
        </button>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white text-xs px-2 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img src={micrologo} alt="Login" className="w-6 h-6 inline mr-2" />
          {t("signUp.withMicrosoft")}
        </button>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default AuthButtons;