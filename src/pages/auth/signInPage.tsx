import { useState } from "react";
import logo from "@/assets/logo.svg";
import helpIcon from "@/assets/auth/help-icon.png";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { InfoIcon } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ForgotPassword from "@/components/auth/forgotPassword";
import { Link } from "wouter";
import { scrollToTop } from "@/lib/utils";

type FormDataType = {
  code: string;
  email: string;
  password: string;
};

const SignInPage = () => {
  const headers = {
    Authorization: `Bearer 0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6`, // Include the token in the 'Authorization' header
    "Content-Type": "application/json", // You can include other headers as needed
  };

  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      code: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values: FormDataType) => handleSignUp(values),
  });

  const handleSignUp = async (values: FormDataType) => {
    try {
      setIsLoading(true);
      values["code"] =
        "pEDhx3zADTfpNlQkndonKnl0ucPGi0QVLqbWe0Y-6NMSAzFuE-Mhvg=="; //code for auth
      console.log("values: ", values);
      const response = await axios.post(
        "https://muffinfunction.azurewebsites.net/api/Signup",
        values,
        {
          headers: headers,
        }
      );
      console.log("response: ", response);
      const data = await response.data;
      if (data) {
        setIsLoading(false);
        console.log("response: ", data);
        return data;
      }
    } catch (err: unknown) {
      // throw new Error(err);
      console.log("err", err);
    }
  };

  return (
    <>
      <Dialog>
        <div className="flex justify-center items-center h-full mt-10 my-[150px]">
          {/* Dialog here */}
          <ForgotPassword />
          <div className="card flex flex-col justify-center items-center shadow-lg rounded-lg p-5 w-[450px] space-y-5">
            <div className="flex w-full justify-end">
              <img
                src={helpIcon}
                alt="help icon"
                className="w-8 md:w-8 hover:cursor-pointer"
              />
            </div>
            <div className="flex flex-col text-center items-center space-y-3">
              <img className="w-24 md:w-36 " src={logo} alt="muffin-logo" />
              <p className="text-[#1B2950] font-bold text-center">
                Enter your E-Mail and Password
              </p>
            </div>
            {/* form */}
            <form
              action="post"
              onSubmit={formik.handleSubmit}
              className="space-y-5 w-full p-2"
            >
              {/* email */}
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm text-semibold  ml-5 mb-2"
                >
                  Email
                </label>
                <div
                  className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                    formik.touched.email && formik.errors.email
                      ? "border-rose-500"
                      : ""
                  }`}
                >
                  <MailIcon color="#98A2B3" size={20} className="mt-1" />
                  <input
                    type="text"
                    className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                    placeholder="example@email.com"
                    {...formik.getFieldProps("email")}
                    onChange={formik.handleChange}
                    name="email"
                    onBlur={formik.handleBlur}
                  />
                  <InfoIcon
                    color="#D92D20"
                    size={20}
                    className={`mt-1 ${
                      formik.touched.email && formik.errors.email
                        ? "visible"
                        : "hidden"
                    }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="error text-red-500 ml-5 pt-2">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* password */}
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="password"
                  className="text-sm text-semibold  ml-5 mb-2"
                >
                  Password
                </label>
                <div
                  className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                    formik.touched.password && formik.errors.password
                      ? "border-rose-500"
                      : ""
                  }`}
                >
                  <LockIcon color="#98A2B3" size={20} className="mt-1" />
                  <input
                    type="password"
                    className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InfoIcon
                    color="#D92D20"
                    size={20}
                    className={`mt-1 ${
                      formik.touched.password && formik.errors.password
                        ? "visible"
                        : "hidden"
                    }`}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="error text-red-500 ml-5 pt-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              {/* button */}
              <button
                type="submit"
                className={` text-white w-full rounded-full py-2 ${
                  isLoading ? "bg-[#FF8AB3]" : "bg-primary"
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* or */}
            {/* <div className="flex w-full item-center">
            <div className="border-b border-black mt-3 h-[1px] w-full"></div>
            <div className="mx-2 text-black font-bold">or</div>
            <div className="border-b border-black mt-3 h-[1px] w-full"></div>
          </div> */}

            {/* social icons */}
            {/* <div className="flex flex-row space-x-5">
            <img
              src={fbLogo}
              alt="facebook-logo"
              className="hover:cursor-pointer"
            />
            <img
              src={googleLogo}
              alt="google-logo"
              className="hover:cursor-pointer"
            />
          </div> */}
            <div className="w-full px-5 mb-5">
              <DialogTrigger className="float-right">
                <a className="text-sm hover:underline hover:text-blue-500">
                  Forgot Password?
                </a>
              </DialogTrigger>
            </div>
            <div className="py-10 flex flex-row space-x-3">
              <p>Don't have an Account?</p>
              <Link
                href="/auth/signup"
                onClick={scrollToTop}
                className="text-sm hover:underline hover:text-blue-500"
              >
                Sign up here
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </Dialog>
    </>
  );
};

export default SignInPage;
