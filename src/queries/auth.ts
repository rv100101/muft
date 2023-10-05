import axiosQuery from "./axios";

const signIn = async (email: string, password: string) => {
  return await axiosQuery.post("/Signin", {
    email,
    password,
  });
};

const authQuery = {
  signIn,
};

export default authQuery;
