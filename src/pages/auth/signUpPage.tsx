import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/zustand/auth/user";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import authQuery from "@/queries/auth";
import { usePreferredLanguageStore } from "@/zustand/auth/preferred_language";
import profileAboutContentStore, { initialState } from "@/zustand/profile/profileAboutStore";
import { Input } from "@/components/ui/input";


export type SignUpDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  lang: string;
};

const SignUpPage = () => {
  const setData = profileAboutContentStore(state => state.setData);
  const [t, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setPreferredLanguage = usePreferredLanguageStore(state => state.setPreferredLanguage);
  const [, navigate] = useLocation();
  const updateUser = useUserStore((state) => state.updateUser);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      lang: ""
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Name must only contain letters A-Z")
        .matches(/^[^\s\d][^\d]*$/, "Invalid name")
        .min(3, t("validation.nameIsTooShort"))
        .max(12, t("validation.nameIsTooLong"))
        .required(t("validation.firstNameRequired")),
      last_name: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Name must only contain letters A-Z")
        .matches(/^[^\s\d][^\d]*$/, "Invalid name")
        .min(3, t("validation.nameIsTooShort"))
        .max(12, t("validation.nameIsTooLong"))
        .required(t("validation.lastNameRequired")),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          t("validation.invalidEmail")
        )
        .email(t("validation.invalidEmail"))
        .required(t("validation.emailRequired")),
      password: Yup.string()
        .required(t("validation.passwordRequired"))
        .min(10, t("validation.passwordLength"))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z0-9\W_]{10,25}$/,
          t("validation.passwordComplexity")
        ),
      lang: Yup.string()
        .required(t("validation.pickLanguage"))
    }),
    onSubmit: (values: SignUpDataType) => signUp.mutate(values),
  });

  const handleSignUp = async (values: SignUpDataType) => {
    try {
      setIsLoading(true);
      // const response = await axiosQuery.post("/Signup", {
      //   ...values,
      //   communication_language: preferred ?? "en",
      // });
      // const data = await response.data;
      const response = await authQuery.signUp(values);
      if (response.data.length !== 0) {
        const data = response.data[0];
        setIsLoading(false);
        setPreferredLanguage(values.lang);
        return data;
      }
    } catch (err: unknown) {
      setIsLoading(false);
      console.log("err", err);
    }
  };

  const signUp = useMutation({
    mutationFn: handleSignUp,
    onSuccess: async (data) => {
      setData(initialState);
      if (data.member_exists) {
        toast({
          variant: "destructive",
          title: t("alerts.somethingWentWrongUhOh"),
          description: "User already exists",
        });
      } else {
        toast({
          variant: "success",
          title: t("alerts.accountSuccessfullyCreated"),
        });
        updateUser({
          ...data, profile_completed: false, first_time: true
        });
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
      <div className={cn("h-[calc(100vh-70px)] py-8 justify-center md:h-[calc(100vh-88px)] items-center flex lg:gap-4 w-full lg:px-32 border-t", Object.keys(formik.errors).length > 2 && "md:h-full")}>
        <Helmet>
          <title>Sign Up</title>
          <link
            rel="canonical"
            href={`https://${window.location.hostname}/auth/signup`}
          />
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
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${formik.touched.first_name && formik.errors.first_name
                  ? "border-rose-500"
                  : ""
                  }`}
              >
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <Input
                  className={cn(
                    "appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full",
                    i18n.language == "ar" && "text-right"
                  )}
                  placeholder={t("signUp.firstName")}
                  {...formik.getFieldProps("first_name")}
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InfoIcon
                  color="#D92D20"
                  size={20}
                  className={`mt-1 ${formik.touched.first_name && formik.errors.first_name
                    ? "visible"
                    : "hidden"
                    }`}
                />
              </div>
              {formik.touched.first_name && formik.errors.first_name ? (
                <div
                  dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}
                  className="error text-red-500 ml-5 text-xs pt-2 mr-3">
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
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${formik.touched.last_name && formik.errors.last_name
                  ? "border-rose-500"
                  : ""
                  }`}
              >
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <Input
                  type="text"
                  className={cn(
                    "appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full",
                    i18n.language == "ar" && "text-right"
                  )}
                  placeholder={t("signUp.lastName")}
                  {...formik.getFieldProps("last_name")}
                  name="last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InfoIcon
                  color="#D92D20"
                  size={20}
                  className={`mt-1 ${formik.touched.last_name && formik.errors.last_name
                    ? "visible"
                    : "hidden"
                    }`}
                />
              </div>
              {formik.touched.last_name && formik.errors.last_name ? (
                <div
                  dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}
                  className="error text-red-500 ml-5 text-xs pt-2 mr-3">
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
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${formik.touched.email && formik.errors.email
                  ? "border-rose-500"
                  : ""
                  }`}
              >
                <MailIcon color="#98A2B3" size={20} className="mt-1" />
                <Input
                  type="text"
                  autoComplete="off"
                  className={cn(
                    "appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full",
                    i18n.language == "ar" && "text-right"
                  )}
                  placeholder={t("signIn.emailAddress")}
                  {...formik.getFieldProps("email")}
                  onChange={formik.handleChange}
                  name="email"
                  onBlur={formik.handleBlur}
                />
                <InfoIcon
                  color="#D92D20"
                  size={20}
                  className={`mt-1 ${formik.touched.email && formik.errors.email
                    ? "visible"
                    : "hidden"
                    }`}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div
                  dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}
                  className="error text-red-500 ml-5 text-xs pt-2 mr-3">
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
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${formik.touched.password && formik.errors.password
                  ? "border-rose-500"
                  : ""
                  }`}
              >
                <LockIcon color="#98A2B3" size={20} className="mt-1" />
                <Input
                  className={cn(
                    "appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full",
                    i18n.language == "ar" && "text-right"
                  )}
                  placeholder={t("signIn.password")}
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  className={`mt-1 ${formik.touched.password &&
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
                <div
                  dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}
                  className="error text-red-500 ml-5 text-xs pt-2 mr-3">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div
              className={`flex h-max flex-col rounded-full px-5 mx-3 `}
            >
              <Select
                dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                onValueChange={(val) => {
                  formik.setFieldValue('lang', val);
                }}
              >
                <SelectTrigger name="lang" onBlur={formik.handleBlur} className={` rounded-full ${formik.touched.lang && formik.errors.lang
                  ? "border-rose-500"
                  : ""
                  }
                `}>
                  <SelectValue placeholder={t("general.preferredLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'en'}>English
                  </SelectItem>
                  <SelectItem value={'ar'}>
                    العربية
                  </SelectItem>
                </SelectContent>
              </Select>{" "}
              {formik.touched.lang && formik.errors.lang ? (
                <div
                  dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}
                  className="error text-red-500 ml-2 text-xs pt-2">
                  {formik.errors.lang}
                </div>
              ) : null}
            </div>
            {/* button */}
            <div className="px-8">
              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "text-white h-10 w-full text-sm rounded-full py-2 hover:bg-[#FF599B]/90  dark:bg-[#ae2e51]",
                  isLoading ? "bg-[#FF8AB3]" : "bg-primary"
                )}
              >
                {isLoading ? (
                  <Loader2 className="ml-2 h-full w-full animate-spin" />
                ) : (
                  t("signUp.signUp")
                )}
              </Button>
            </div>
          </form>
          <Link
            onClick={scrollToTop}
            href="/auth/signin"
            className="mt-2 underline text-[#4635E2] text-sm"
          >
            {t("signUp.alreadyHaveAccount")}
          </Link>
        </div >
      </div >
    </>
  );
};

export default SignUpPage;
