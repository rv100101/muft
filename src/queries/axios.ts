import axios from "axios";

const axiosQuery = axios.create({
  baseURL: "https://muffinfunction.azurewebsites.net/api/",
  headers: {
    "x-functions-key": import.meta.env.VITE_AZURE_FUNCTIONS_KEY,
    Authorization: import.meta.env.VITE_TEMP_AUTHORIZATION_TOKEN,
  },
});

export default axiosQuery;
