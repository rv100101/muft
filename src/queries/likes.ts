import axiosQuery from "./axios";

const getLikes = async (memberId: number, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/likes.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const likesQuery = {
  getLikes,
};

export default likesQuery;
