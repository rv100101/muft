import axios from "axios";

const axiosQuery = axios.create({
  baseURL: "https://muffinfunction.azurewebsites.net/api/",
  timeout: 1000,
  headers: { "x-functions-key": import.meta.env.VITE_AZURE_FUNCTIONS_KEY },
});

export default axiosQuery;
