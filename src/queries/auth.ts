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

const authQuery = {
  signIn,
  getProfilePhoto,
};

export default authQuery;
