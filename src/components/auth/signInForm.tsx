import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ForgotPassword from "@/components/auth/forgotPassword";
import { Link, useLocation } from "wouter";
import { scrollToTop } from "@/lib/utils";
import logo from "@/assets/logo.svg";
import helpIcon from "@/assets/auth/help-icon.png";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { InfoIcon } from "lucide-react";
import authQuery from "@/queries/auth";
import { User, useUserStore } from "@/zustand/auth/user";
import { useToast } from "@/components/ui/use-toast";
import { useUserAvatar } from "@/zustand/auth/avatar";
import { useUserCountry } from "@/zustand/auth/country";
import { Input } from "@/components/ui/input";

type FormDataType = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = useUserStore((state) => state.updateUser);
  const updateUserAvatar = useUserAvatar((state) => state.setAvatar);
  const updateUserCountry = useUserCountry((state) => state.setCountry);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values: FormDataType) => handleSignIn(values),
  });

  const handleSignIn = async (values: FormDataType) => {
    try {
      setIsLoading(true);
      const signInData = await authQuery.signIn(values.email, values.password);
      const profilePhotoData = await authQuery.getProfilePhoto(
        signInData.data.member_id
      );
      const countryData: {
        data: {
          country_name: string;
        }[];
      } = await authQuery.getCountry(69);

      if (countryData.data.length !== 0) {
        updateUserCountry(countryData.data[0].country_name);
      }
      updateUserAvatar(profilePhotoData.data.gallery_uuid);
      setIsLoading(false);
      const data: User | string = signInData.data;
      if (typeof data != "string" && data!.authorized) {
        updateUser(data);
        navigate("/", { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid credentials",
          description: "Make sure your email and password is correct.",
          color: "#FF7AAF",
        });
      }
    } catch (err: unknown) {
      // throw new Error(err);
      console.log("err", err);
    }
  };

  return (
    <div className="flex h-3/4 w-3/4 flex-col items-center shadow-xl rounded-lg p-4 border space-y-5">
      <div className="flex w-full h-min justify-end">
        <img
          src={helpIcon}
          alt="help icon"
          className="w-4 md:w-6 hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col text-center items-center space-y-3">
        <img className="w-24 md:w-32 " src={logo} alt="muffin-logo" />
        <p className="text-[#1B2950] text-xs font-bold text-center">
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
          <label htmlFor="email" className="text-sm text-semibold  ml-5 mb-2">
            Email
          </label>
          <div
            className={`flex items-center flex-row border rounded-full py-1 px-5 m-3 ${
              formik.touched.email && formik.errors.email
                ? "border-rose-500"
                : ""
            }`}
          >
            <MailIcon color="#98A2B3" size={20} className="mt-1" />
            <Input
              type="text"
              className="autofill:bg-yellow-200 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-5 text-normal w-full"
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
            className={`flex flex-row border items-center rounded-full py-1 px-5 m-3 ${
              formik.touched.password && formik.errors.password
                ? "border-rose-500"
                : ""
            }`}
          >
            <LockIcon color="#98A2B3" size={20} className="mt-1" />
            <Input
              type="password"
              className=" focus-visible:ring-offset-0 focus-visible:ring-0  border-0 rounded-full py-1 px-5 text-normal focus-visble:outline-0 focus:ring-0 focus-visble:ring-none active:bg-transparent w-full"
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
          disabled={isLoading}
          type="submit"
          className={` text-white w-full rounded-full py-2 ${
            isLoading ? "bg-[#FF8AB3]" : "bg-primary"
          }`}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div className="w-full px-5">
        <Dialog>
          {/* Dialog here */}
          <ForgotPassword />
          <DialogTrigger className="float-right">
            <a className="text-xs hover:underline hover:text-blue-500">
              Forgot Password?
            </a>
          </DialogTrigger>
        </Dialog>
      </div>
      <div className="flex flex-row space-x-2">
        <p className="text-xs">Don't have an Account?</p>
        <Link
          href="/auth/signup"
          onClick={scrollToTop}
          className="text-xs hover:underline hover:text-blue-500"
        >
          Sign up here
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
