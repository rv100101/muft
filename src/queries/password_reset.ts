import axiosQuery from "./axios";

const getPasswordPin = async ({email}: {email: string}) => {
  return await axiosQuery.post("/ForgotPassword", { email });
};

const verifyPasswordPin = async ({email, pin}: {email: string, pin: string}) => {
  return await axiosQuery.post("/VerifyPasswordPin", { email, pin });
};

const changePassword = async (email: string, password: string) => {
  return await axiosQuery.post("/ChangePassword", { email, password });
};

const passwordResetQuery = {
  getPasswordPin,
  verifyPasswordPin,
  changePassword,
};

export default passwordResetQuery;
