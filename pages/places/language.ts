import axiosQuery from "../../src/queries/axios";

const updateLanguagePreference = async (language: string, memberId: number) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("member", memberId.toString());
  formData.append("lang", language);
  return await axiosQuery.post(
    "https://muffinapi.azurewebsites.net/update_communication_language.php",
    formData
  );
};

const getLanguagePreference = async (memberId: number, lang: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("member", memberId.toString());
  formData.append("lang", lang);
  return await axiosQuery.post(
    "https://muffinapi.azurewebsites.net/get_communication_language.php",
    formData
  );
};

const languageQuery = {
  updateLanguagePreference,
  getLanguagePreference,
};

export default languageQuery;
