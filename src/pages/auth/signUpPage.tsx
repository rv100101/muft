import { useState } from "react";
import logo from "@/assets/logo.svg";
import helpIcon from "@/assets/auth/help-icon.png";
import { UserIcon } from "lucide-react";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { InfoIcon } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "wouter";
import { scrollToTop } from "@/lib/utils";

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const headers = {
    "x-functions-key": import.meta.env.VITE_AZURE_FUNCTIONS_KEY,
    Authorization: `Bearer 0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6`, // Include the token in the 'Authorization' header
    "Content-Type": "application/json", // You can include other headers as needed
  };

  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Firstname is required"),
      last_name: Yup.string().required("Lastname is required"),
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
      <div className="flex justify-center items-center h-[calc(100vh-120px)]">
        <div className="card flex flex-col justify-center h-min items-center shadow-lg rounded-lg p-5 w-max space-y-5">
          <div className="flex w-full justify-end">
            <img
              src={helpIcon}
              alt="help icon"
              className="w-8 md:w-8 hover:cursor-pointer"
            />
          </div>
          <div className="flex flex-col text-center">
            <img className="w-24 md:w-36" src={logo} alt="muffin-logo" />
            <p className="text-[#1B2950] font-bold">Welcome!</p>
          </div>
          {/* form */}
          <form
            action="post"
            onSubmit={formik.handleSubmit}
            className="space-y-5 w-full p-2"
          >
            {/* first_name */}
            <div className="flex flex-col  space-y-1">
              <label
                htmlFor="first_name"
                className="text-sm text-semibold ml-5 mb-2"
              >
                First name
              </label>
              <div
                className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                  formik.touched.first_name && formik.errors.first_name
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                  placeholder="First Name"
                  {...formik.getFieldProps("first_name")}
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InfoIcon
                  color="#D92D20"
                  size={20}
                  className={`mt-1 ${
                    formik.touched.first_name && formik.errors.first_name
                      ? "visible"
                      : "hidden"
                  }`}
                />
              </div>
              {formik.touched.first_name && formik.errors.first_name ? (
                <div className="error text-red-500 ml-5 pt-2">
                  {formik.errors.first_name}
                </div>
              ) : null}
            </div>

            {/* last_name */}
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="first_name"
                className="text-sm text-semibold  ml-5 mb-2"
              >
                Last name
              </label>

              <div
                className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                  formik.touched.last_name && formik.errors.last_name
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                  placeholder="Last Name"
                  {...formik.getFieldProps("last_name")}
                  name="last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InfoIcon
                  color="#D92D20"
                  size={20}
                  className={`mt-1 ${
                    formik.touched.last_name && formik.errors.last_name
                      ? "visible"
                      : "hidden"
                  }`}
                />
              </div>
              {formik.touched.last_name && formik.errors.last_name ? (
                <div className="error text-red-500 ml-5 pt-2">
                  {formik.errors.last_name}
                </div>
              ) : null}
            </div>

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
                isLoading ? "bg-[#FF8AB3]" : "bg-[#FF599B]"
              }`}
            >
              {isLoading ? "Creating user..." : "Sign Up"}
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
          <Link
            onClick={scrollToTop}
            href="/auth/signin"
            className="text-sm hover:underline"
          >
            Already have an account?
          </Link>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default SignUpPage;
