import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleSignUpButton from "./socialSignup/googleSignup";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/zustand/auth/user";
import { Helmet } from "react-helmet-async";
import authQuery from "@/queries/auth";
import profileAboutContentStore, {
  initialState,
} from "@/zustand/profile/profileAboutStore";
import { useMutation } from "@tanstack/react-query";

export type SignUpDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  lang: string;
};

const SignUpPage = () => {
  const [t, ] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleData, setGoogleData] = useState<{
    email: string;
    firstName: string;
    lastName: string;
  } | null>(null);
  const updateUser = useUserStore((state) => state.updateUser);
  const setData = profileAboutContentStore((state) => state.setData);

  const formik = useFormik({
    initialValues: {
      first_name: googleData?.firstName || "",
      last_name: googleData?.lastName || "",
      email: googleData?.email || "",
      password: "",
      lang: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(t("validation.firstNameRequired")),
      last_name: Yup.string().required(t("validation.lastNameRequired")),
      email: Yup.string()
        .email(t("validation.invalidEmail"))
        .required(t("validation.emailRequired")),
      password: Yup.string()
        .required(t("validation.passwordRequired"))
        .min(10, t("validation.passwordLength")),
      lang: Yup.string().required(t("validation.pickLanguage")),
    }),
    onSubmit: (values: SignUpDataType) => signUp.mutate(values),
  });

  useEffect(() => {
    if (googleData) {
      formik.setValues({
        ...formik.values,
        first_name: googleData.firstName,
        last_name: googleData.lastName,
        email: googleData.email,
      });
    }
  }, [googleData]);

  const handleGoogleSuccess = (data: {
    email: string;
    firstName: string;
    lastName: string;
  }) => {
    setGoogleData(data);
  };

  const handleSignUp = async (values: SignUpDataType) => {
    try {
      setIsLoading(true);
      const response = await authQuery.signUp(values);
      setIsLoading(false);
      if (response.data.length !== 0) {
        const data = response.data[0];
        setData(initialState);
        toast({
          variant: "success",
          title: t("alerts.accountSuccessfullyCreated"),
        });
        updateUser({
          ...data,
          profile_completed: false,
          first_time: true,
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: t("alerts.somethingWentWrongUhOh"),
      });
    }
  };

  const signUp = useMutation({
    mutationFn: handleSignUp,
    onSuccess: () => {},
  });

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta
          name="description"
          content="Join our world love knows no borders."
        />
      </Helmet>
      <div className="py-16 justify-center min-h-[calc(100vh-105px)] sm:min-h-[calc(100vh-88px)] flex lg:gap-4 w-full lg:px-32 border-t">
        <div className="flex h-min w-[460px] flex-col items-center md:shadow-xl rounded-lg p-4 md:border">
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 w-full flex-1 h-full"
          >
            {/* first_name */}
            <div className="flex flex-col space-y-1 px-5">
              <div
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${formik.touched.first_name && formik.errors.first_name ? "border-rose-500" : ""}`}
              >
                <Input
                  autoComplete="off"
                  className="appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
                  placeholder={t("signUp.firstName")}
                  {...formik.getFieldProps("first_name")}
                />
              </div>
              {formik.touched.first_name && formik.errors.first_name ? (
                <div className="error text-red-500 ml-5 text-xs pt-2">
                  {formik.errors.first_name}
                </div>
              ) : null}
            </div>
            {/* last_name */}
            <div className="flex flex-col space-y-1 px-5">
              <div
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${formik.touched.last_name && formik.errors.last_name ? "border-rose-500" : ""}`}
              >
                <Input
                  autoComplete="off"
                  className="appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
                  placeholder={t("signUp.lastName")}
                  {...formik.getFieldProps("last_name")}
                />
              </div>
              {formik.touched.last_name && formik.errors.last_name ? (
                <div className="error text-red-500 ml-5 text-xs pt-2">
                  {formik.errors.last_name}
                </div>
              ) : null}
            </div>
            {/* email */}
            <div className="flex flex-col space-y-1 px-5">
              <div
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${formik.touched.email && formik.errors.email ? "border-rose-500" : ""}`}
              >
                <Input
                  type="text"
                  autoComplete="off"
                  className="appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
                  placeholder={t("signIn.emailAddress")}
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="error text-red-500 ml-5 text-xs pt-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            {/* password */}
            <div className="flex flex-col space-y-1 px-5">
              <div
                className={`flex items-center h-max flex-row border rounded-full px-5 mx-3 ${formik.touched.password && formik.errors.password ? "border-rose-500" : ""}`}
              >
                <Input
                  className="appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
                  placeholder={t("signUp.password")}
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error text-red-500 ml-5 text-xs pt-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            {/* Sign Up Button */}
            <div className="flex flex-col space-y-1 px-5 py-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {t("signUp.signUp")}
              </Button>
            </div>
            {/* Google Sign Up Button */}
            <div className="flex flex-col space-y-1 px-5 py-2">
              <GoogleSignUpButton onSuccess={handleGoogleSuccess} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
