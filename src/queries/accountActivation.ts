import axiosQuery from "./axios";

const resendPin = async (email: string) =>
  await axiosQuery.post("/ResendActivationPin", { email });

const activate = async (email: string, pin: number) =>
  await axiosQuery.post("/Activate", {
    email,
    pin,
  });

const accountActivationQuery = {
  resendPin,
  activate,
};

export default accountActivationQuery;
