import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ForgotPassword from "@/components/auth/forgotPassword";
import { Link, useLocation } from "wouter";
import { cn, scrollToTop } from "@/lib/utils";
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
import { Button } from "../ui/button";
import { usePasswordResetState } from "@/zustand/auth/passwordReset";

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
  const changePasswordResetState = usePasswordResetState((state) =>
    state.changeState
  );
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
      console.log(signInData);
      if (typeof signInData.data == "string") {
        setIsLoading(false);
        formik.setFieldError("email", "Invalid credentials");
        formik.setFieldError("password", "Invalid credentials");
        return;
      }
      const profilePhotoData = await authQuery.getProfilePhoto(
        signInData.data.member_id,
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
    <div className="flex h-max sm:w-max flex-col items-center lg:shadow-xl rounded-lg p-8 lg:border space-y-2">
      <div className="flex w-full justify-end">
        <img
          src={helpIcon}
          alt="help icon"
          className="w-4 md:w-6 hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col text-center items-center space-y-2">
        <img className="w-36 md:w-32 " src={logo} alt="muffin-logo" />
        <p className="text-[#1B2950] text-xs font-bold text-center">
          Enter your E-Mail and Password
        </p>
      </div>
      {/* form */}
      <form
        action="post"
        onSubmit={formik.handleSubmit}
        className="space-y-2 w-full p-2"
      >
        {/* email */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-xs text-sm text-semibold mb-2">
            Email
          </label>
          <div
            className={`flex items-center flex-row border rounded-full h-max py-1 px-5 ${
              formik.touched.email && formik.errors.email
                ? "border-rose-500"
                : ""
            }`}
          >
            <MailIcon color="#98A2B3" size={20} className="mt-1" />
            <Input
              type="text"
              className="autofill:bg-yellow-200 mx-2 text-xs h-8 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-5 text-normal w-full"
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
          {formik.touched.email && formik.errors.email
            ? (
              <div className="error text-sm text-red-500 ml-5 pt-2">
                {formik.errors.email}
              </div>
            )
            : null}
        </div>

        {/* password */}
        <div className="flex flex-col justify-center space-y-1">
          <label
            htmlFor="password"
            className="text-xs text-semibold mb-2"
          >
            Password
          </label>
          <div
            className={`flex h-max flex-row border items-center rounded-full py-1 px-5 ${
              formik.touched.password && formik.errors.password
                ? "border-rose-500"
                : ""
            }`}
          >
            <LockIcon color="#98A2B3" size={20} className="mt-1" />
            <Input
              type="password"
              className="mx-2 h-8 focus-visible:ring-offset-0 focus-visible:ring-0  border-0 rounded-full py-1 px-5 text-normal focus-visble:outline-0 focus:ring-0 focus-visble:ring-none active:bg-transparent w-full"
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
          {formik.touched.password && formik.errors.password
            ? (
              <div className="error text-red-500 text-sm ml-5 pt-2">
                {formik.errors.password}
              </div>
            )
            : null}
        </div>
        {/* button */}
        <div>
          <Button
            disabled={isLoading}
            type="submit"
            className={cn(
              "text-white mt-4 h-10 w-full rounded-full py-2 hover:bg-[#FF599B]/90",
              isLoading ? "bg-[#FF8AB3]" : "bg-primary",
            )}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </div>
        <div className="w-full">
          <Dialog
            onOpenChange={(val) => {
              if (!val) {
                changePasswordResetState("SEND");
              }
            }}
          >
            {/* Dialog here */}
            <DialogTrigger className="float-right underline text-[#4635E2] text-xs">
              Forgot Password?
            </DialogTrigger>
            <DialogContent className="w-72 md:w-full">
              <ForgotPassword />
            </DialogContent>
          </Dialog>
        </div>
      </form>
      <div className="flex flex-row space-x-2">
        <p className="text-xs mt-4">Don't have an Account?</p>
        <Link
          href="/auth/signup"
          onClick={scrollToTop}
          className="text-xs underline text-[#4635E2] mt-4"
        >
          Sign up here
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
