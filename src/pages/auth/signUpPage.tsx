import { useState } from "react";
import { Eye, EyeOff, Loader2, UserIcon } from "lucide-react";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { InfoIcon } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation } from "wouter";
import { cn, scrollToTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axiosQuery from "@/queries/axios";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/zustand/auth/user";
import { Helmet } from "react-helmet-async";

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, navigate] = useLocation();
  const updateUser = useUserStore((state) => state.updateUser);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Password must only contain letters A-Z")
        .matches(/^[^\s\d][^\d]*$/, "Invalid name")
        .max(12, "Name is too long")
        .required("First name is required"),
      last_name: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Password must only contain letters A-Z")
        .matches(/^[^\s\d][^\d]*$/, "Invalid name")
        .max(12, "Name is too long")
        .required("Last name is required"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(10, "Password must be at least 10 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z0-9\W_]{10,25}$/,
          "Password must contain alphanumeric and special characters"
        ),
    }),
    onSubmit: (values: FormDataType) => signUp.mutate(values),
  });

  const handleSignUp = async (values: FormDataType) => {
    try {
      setIsLoading(true);
      const response = await axiosQuery.post("/Signup", values);
      const data = await response.data;
      if (data) {
        setIsLoading(false);
        return data;
      }
    } catch (err: unknown) {
      console.log("err", err);
    }
  };

  const signUp = useMutation({
    mutationFn: handleSignUp,
    onSuccess: async (data) => {
      if (data.member_exists) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "User already exists",
        });
      } else {
        toast({
          variant: "success",
          title: "Account successfuly created!",
        });

        updateUser(data);
        navigate("/", { replace: true });
      }
    },
    onError: (e) => {
      console.log("failed to sign up");
      console.log(e);
    },
  });

  return (
    <>
      <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-88px)] justify-center items-center flex lg:gap-4 w-full lg:px-32 border-t">
        <Helmet>
          <title>Sign up</title>
          <meta
            name="description"
            content="Join our world love knows no borders."
          />
        </Helmet>
        <div className="flex h-min w-[460px] flex-col items-center md:shadow-xl rounded-lg p-4 md:border">
          <div className="flex w-full justify-end py-2">
            {/* <img
              src={helpIcon}
              alt="help icon"
              className="w-8 md:w-8 hover:cursor-pointer"
            />
          </div>
          <div className="flex flex-col text-center items-center">
            <img className="w-36" src={logo} alt="muffin-logo" />
            <p className="text-[#1B2950] text-md mt-4 mb-4 font-bold">
              Welcome!
            </p> */}
          </div>
          {/* form */}
          <form
            action="post"
            onSubmit={formik.handleSubmit}
            className="space-y-4 w-full"
          >
            {/* first_name */}
            <div className="flex flex-col space-y-1 px-5">
              {/* <label
                htmlFor="first_name"
                className="text-sm text-semibold ml-5 mb-2"
              >
                First name
              </label> */}
              <div
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${
                  formik.touched.first_name && formik.errors.first_name
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="ml-2 border-0 rounded-full py-2 px-4 text-normal focus:outline-0 w-full"
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
                <div className="error text-red-500 text-sm ml-5 pt-2">
                  {formik.errors.first_name}
                </div>
              ) : null}
            </div>

            {/* last_name */}
            <div className="flex flex-col space-y-1 px-5">
              {/* <label
                htmlFor="last_name"
                className="text-sm text-semibold  ml-5 mb-2"
              >
                Last name
              </label> */}

              <div
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${
                  formik.touched.last_name && formik.errors.last_name
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="ml-2 border-0 w-full rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
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
                <div className="error text-red-500 text-sm ml-5 pt-2">
                  {formik.errors.last_name}
                </div>
              ) : null}
            </div>
            {/* email */}
            <div className="flex flex-col space-y-1 px-5">
              {/* <label
                htmlFor="email"
                className="text-sm text-semibold  ml-5 mb-2"
              >
                Email
              </label> */}
              <div
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${
                  formik.touched.email && formik.errors.email
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <MailIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  autoComplete="off"
                  className="ml-2 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
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
                <div className="error text-red-500 ml-5 text-sm pt-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            {/* password */}
            <div className="flex flex-col space-y-1 px-5">
              {/* <label
                htmlFor="password"
                className="text-sm text-semibold ml-5 mb-2"
              >
                Password
              </label> */}
              <div
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${
                  formik.touched.password && formik.errors.password
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <LockIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  className="appearance-none border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  className={`mt-1 ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "ml-2 text-[#D92D20]"
                  }`}
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error text-red-500 ml-5 text-sm pt-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            {/* button */}
            <div className="px-8">
              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "text-white w-full rounded-full hover:bg-[#FF599B]/90",
                  isLoading ? "bg-[#FF8AB3]" : "bg-primary"
                )}
              >
                {isLoading ? (
                  <Loader2 className="ml-2 h-full w-full animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
          <Link
            onClick={scrollToTop}
            href="/auth/signin"
            className="mt-8 underline text-[#4635E2] text-sm"
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
