import axios from "axios";

const axiosQuery = axios.create({
  baseURL: "https://muffinfunction.azurewebsites.net/api/",
  headers: {
    "x-functions-key":
      "nw7phMvGe08_TmVh6DClQF8kytMiHLOQ8ta-hxXQOq9mAzFujxiSbA==",
    Authorization:
      import.meta.env.APPSETTING_VITE_TEMP_AUTHORIZATION_TOKEN ||
      import.meta.env.VITE_TEMP_AUTHORIZATION_TOKEN,
  },
});

export default axiosQuery;
