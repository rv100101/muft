import { PublicClientApplication, Configuration } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "a2323e5d-88fb-4813-a495-1cc76f2b3779",
    authority: "https://login.microsoftonline.com/5114fef8-001b-462f-861c-67e57a1beea4",
    redirectUri: "http://https://muft-ovx2.vercel.app/", // Adjust as needed
  },


};
const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
