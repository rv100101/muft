// import { useState } from "react";
import logo from "@/assets/logo.svg";
import fbLogo from "@/assets/auth/facebook-logo.png";
import googleLogo from "@/assets/auth/google-logo.png";
import helpIcon from "@/assets/auth/help-icon.png";
import { UserIcon } from "lucide-react";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { InfoIcon } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUpPage = () => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Firstname is required"),
      lastname: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      // Form submission logic here
      console.log("Form submitted successfully:", values);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("this form is triggered");
    e.preventDefault();
    formik.setTouched(
      { firstname: true, lastname: true, email: true, password: true },
      true
    );
    if (formik.isValid) {
      formik.handleSubmit(e);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-full mt-10 my-[150px]">
        <div className="card flex flex-col justify-center items-center shadow-lg rounded-lg p-5 w-[450px] space-y-5">
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
            onSubmit={handleSubmit}
            className="space-y-5 w-full p-2"
          >
            <div className="flex flex-col  space-y-1">
              <label
                htmlFor="firstname"
                className="text-sm text-semibold ml-5 mb-2"
              >
                First name
              </label>
              <div
                className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                  formik.touched.firstname && formik.errors.firstname
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full "
                  placeholder="First Name"
                  {...formik.getFieldProps("firstname")}
                />
                <InfoIcon
                  color="#D92D20"
                  size={20}
                  className={`mt-1 ${
                    formik.touched.firstname && formik.errors.firstname
                      ? "visible"
                      : "hidden"
                  }`}
                />
              </div>
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="error text-red-500 ml-5 pt-2">
                  {formik.errors.firstname}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="firstname"
                className="text-sm text-semibold  ml-5 mb-2"
              >
                Last name
              </label>

              <div
                className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                  formik.touched.lastname && formik.errors.lastname
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastname")}
                />
                <InfoIcon
                  color="#D92D20"
                  size={20}
                  className={`mt-1 ${
                    formik.touched.lastname && formik.errors.lastname
                      ? "visible"
                      : "hidden"
                  }`}
                />
              </div>
              {formik.touched.lastname && formik.errors.lastname ? (
                <div className="error text-red-500 ml-5 pt-2">
                  {formik.errors.lastname}
                </div>
              ) : null}
            </div>

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
              className="bg-[#FF599B] text-white w-full rounded-full py-2"
            >
              Sign Up
            </button>
          </form>

          {/* or */}
          <div className="flex w-full item-center">
            <div className="border-b border-black mt-3 h-[1px] w-full"></div>
            <div className="mx-2 text-black font-bold">or</div>
            <div className="border-b border-black mt-3 h-[1px] w-full"></div>
          </div>

          {/* social icons */}
          <div className="flex flex-row space-x-5">
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
          </div>
          <a href="/auth/signin" className="text-sm hover:underline">
            Already have an account
          </a>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default SignUpPage;
