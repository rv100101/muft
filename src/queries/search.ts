import axiosQuery from "./axios";

const search = async (text: string, member: number, lang: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("lang", lang);
  formData.append("member", member.toString());
  formData.append("text", text);
  return await axiosQuery.post(
    "https://muffinapi.azurewebsites.net/search.php",
    formData
  );
};

const searchQuery = {
  search,
};

export default searchQuery;
