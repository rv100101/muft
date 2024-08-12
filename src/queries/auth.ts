import { SignUpDataType } from "@/pages/auth/signUpPage";
import axiosQuery from "./axios";

const signIn = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("email", email);
  formData.append("password", password);
  try {
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/signin.php",
      formData
    );
    if (response.data.length !== 0) {
      return response.data[0];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const signUp = async (values: SignUpDataType) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("lang", values.lang);
  formData.append("first_name", values.first_name);
  formData.append("last_name", values.last_name);
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("email_service", values.email_service);
  formData.append("referral_code", "");

  
  interface FormDataObject {
    [key: string]: FormDataEntryValue;
  }
 const formDataObject: FormDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  console.log("FormData being sent:", formDataObject);

  console.log("FormData being sent:", formDataObject);
  return await axiosQuery.post(
    "https://muffinapi.azurewebsites.net/signup.php",
    formData
  );
};

// const signUpGoogle = async (values: SignUpDataType) => {
//   const formData = new FormData();
//   formData.append(
//     "auth",
//     "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
//   );
//   formData.append("lang", values.lang);
//   formData.append("first_name", values.first_name);
//   formData.append("last_name", values.last_name);
//   formData.append("email", values.email);
//   formData.append("password", values.password);
//   formData.append("email_service", "1");
//   formData.append("referral_code", "");
//   return await axiosQuery.post(
//     "https://muffinapi.azurewebsites.net/signup.php",
//     formData
//   );
// };

const getProfilePhoto = async (memberId: number) => {
  return await axiosQuery.post("/GetProfilePhoto", {
    member: memberId,
  });
};

const getCountry = async (memberId: number) => {
  return await axiosQuery.post("/GetCountry", {
    member: memberId,
  });
};

const getNickname = async (memberId: number) => {
  return await axiosQuery.post("/GetNickname", {
    member: memberId,
  });
};

const isProfileCompleted = async (memberId: number) => {
  return await axiosQuery.post("/IsProfileCompleted", {
    member: memberId,
  });
};

const authQuery = {
  signIn,
  signUp,
  getProfilePhoto,
  getCountry,
  isProfileCompleted,
  getNickname,
};

export default authQuery;
