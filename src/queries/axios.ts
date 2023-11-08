import axios from "axios";

const axiosQuery = axios.create({
  baseURL: "https://muffinfunction.azurewebsites.net/api/",
  headers: {
    "x-functions-key":
      "nw7phMvGe08_TmVh6DClQF8kytMiHLOQ8ta-hxXQOq9mAzFujxiSbA==",
    Authorization:
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6",
  },
});

export default axiosQuery;
