import axiosQuery from "./axios";

const signIn = async (email: string, password: string) => {
  return await axiosQuery.post("/Signin", {
    email,
    password,
  });
};

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

const authQuery = {
  signIn,
  getProfilePhoto,
  getCountry
};

export default authQuery;
