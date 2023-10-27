import { useState } from "react";
import logo from "@/assets/logo.svg";
import helpIcon from "@/assets/auth/help-icon.png";
import { UserIcon } from "lucide-react";
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

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      first_name: Yup.string().required("Firstname is required"),
      last_name: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values: FormDataType) => signUp.mutate(values),
  });

  const handleSignUp = async (values: FormDataType) => {
    try {
      setIsLoading(true);
      const response = await axiosQuery.post("/Signup", values);
      console.log("response: ", response);
      const data = await response.data;
      if (data) {
        setIsLoading(false);
        console.log("response: ", data);
        return data;
      }
    } catch (err: unknown) {
      console.log("err", err);
    }
  };

  const signUp = useMutation({
    mutationFn: handleSignUp,
    onSuccess: async (data) => {
      console.log("invalidated");
      console.log(data);
      if (data.member_exists) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "User already exists",
        });
      } else {
        toast({
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
      <div className="flex justify-center lg:items-center min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-120px)] lg:p-8">
        <div className="flex h-max w-[500px] flex-col items-center md:shadow-xl rounded-lg p-4 md:border space-y-5">
          <div className="flex w-full justify-end">
            <img
              src={helpIcon}
              alt="help icon"
              className="w-8 md:w-8 hover:cursor-pointer"
            />
          </div>
          <div className="flex flex-col text-center items-center">
            <img className="w-36 md:w-48" src={logo} alt="muffin-logo" />
            <p className="text-[#1B2950] text-xl mt-4 mb-4 font-bold">
              Welcome!
            </p>
          </div>
          {/* form */}
          <form
            action="post"
            onSubmit={formik.handleSubmit}
            className="space-y-5 w-full"
          >
            <div className="flex">
              {/* first_name */}
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="first_name"
                  className="text-sm text-semibold ml-5 mb-2"
                >
                  First name
                </label>
                <div
                  className={`flex items-center flex-row border rounded-full py-1 px-5 m-3 ${
                    formik.touched.first_name && formik.errors.first_name
                      ? "border-rose-500"
                      : ""
                  }`}
                >
                  <UserIcon color="#98A2B3" size={20} className="mt-1" />
                  <input
                    type="text"
                    className="ml-2 border-0 rounded-full py-1 px-4 text-normal focus:outline-0 w-full"
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
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="last_name"
                  className="text-sm text-semibold  ml-5 mb-2"
                >
                  Last name
                </label>

                <div
                  className={`flex items-center border rounded-full py-1 px-5 m-3 ${
                    formik.touched.last_name && formik.errors.last_name
                      ? "border-rose-500"
                      : ""
                  }`}
                >
                  <UserIcon color="#98A2B3" size={20} className="mt-1" />
                  <input
                    type="text"
                    className="ml-2 border-0 w-full rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
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
                className={`flex justify-center items-center flex-row border rounded-full py-1 px-5 m-3 ${
                  formik.touched.email && formik.errors.email
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <MailIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="ml-2 border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
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
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-sm text-semibold ml-5 mb-2"
              >
                Password
              </label>
              <div
                className={`flex items-center flex-row border rounded-full py-1 px-5 m-3 ${
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
                <div className="error text-red-500 ml-5 text-sm pt-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            {/* button */}
            <div className="px-3">
              <Button
                type="submit"
                className={cn(
                  "text-white w-full rounded-full hover:bg-[#FF599B]/90",
                  isLoading ? "bg-[#FF8AB3]" : "bg-primary"
                )}
              >
                {isLoading ? "Creating user..." : "Sign Up"}
              </Button>
            </div>
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
