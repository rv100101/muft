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
  getProfilePhoto,
  getCountry,
  isProfileCompleted,
  getNickname,
};

export default authQuery;
