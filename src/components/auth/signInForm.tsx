import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ForgotPassword from "@/components/auth/forgotPassword";
import { Link, useLocation } from "wouter";
import { cn, scrollToTop } from "@/lib/utils";
import { Ban, Eye, EyeOff, Loader2, MailIcon, X } from "lucide-react";
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
import { useQueryClient } from "@tanstack/react-query";
import { useUserNickname } from "@/zustand/auth/username";
import { useTranslation } from "react-i18next";
import { usePreferredLanguageStore } from "@/zustand/auth/preferred_language";
import profileAboutContentStore, {
  initialState,
} from "@/zustand/profile/profileAboutStore";
import useReadConversationsStateStore from "@/zustand/messaging/readConversations";
import { DialogClose } from "@radix-ui/react-dialog";

type FormDataType = {
  email: string;
  password: string;
};
const SignInForm = () => {
  const {
    id,
    setId,
    updateRead: setReadList,
  } = useReadConversationsStateStore();
  const setData = profileAboutContentStore((state) => state.setData);
  const [t, i18n] = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [blockedModal, showBlockedModal] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const setPreferredLanguage = usePreferredLanguageStore(
    (state) => state.setPreferredLanguage
  );
  const updateUser = useUserStore((state) => state.updateUser);
  const updateUserAvatar = useUserAvatar((state) => state.setAvatar);
  const updateUserNickname = useUserNickname((state) => state.setNickname);
  const updateUserCountry = useUserCountry((state) => state.setCountry);
  const changePasswordResetState = usePasswordResetState(
    (state) => state.changeState
  );
  const queryClient = useQueryClient();
  const isModalOpen = usePasswordResetState((state) => state.isModalOpen);
  const setIsModalOpen = usePasswordResetState((state) => state.setIsModalOpen);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          t("validation.invalidEmail")
        )
        .email(t("validation.invalidEmail"))
        .required(t("validation.emailRequired")),
      password: Yup.string()
        .required(t("validation.passwordRequired"))
        .min(10, t("validation.passwordLength")),
    }),
    onSubmit: (values: FormDataType) => handleSignIn(values),
  });

  const handleSignIn = async (values: FormDataType) => {
    try {
      setData(initialState);
      setIsLoading(true);
      const signInData = await authQuery.signIn(values.email, values.password);
      if (!signInData) {
        setIsLoading(false);
        formik.values.password = "";
        formik.setFieldError("email", t("validation.invalidCredentials"));
        formik.setFieldError("password", t("validation.invalidCredentials"));
        toast({
          variant: "destructive",
          title: t("alerts.invalidUsernameOrPassword"),
          description: t("alerts.checkCredentialsAndTryAgain"),
        });
        return;
      }
      if (id == null) {
        setId(signInData.member_id);
        setReadList({});
      }
      const profilePhotoData = await authQuery.getProfilePhoto(
        signInData.member_id
      );
      const username = await authQuery.getNickname(signInData.member_id);
      const countryData: {
        data: {
          country_name: string;
        }[];
      } = await authQuery.getCountry(signInData.member_id);

      if (countryData.data.length !== 0) {
        updateUserCountry(countryData.data[0].country_name);
      }
      updateUserAvatar(profilePhotoData.data.gallery_uuid);
      updateUserNickname(username.data[0].nickname);
      setIsLoading(false);
      const data: User | null = signInData;
      if (data && data!.is_blocked) {
        showBlockedModal(true);
        formik.resetForm();
        return;
      }
      setPreferredLanguage(signInData.communication_language);
      if (data && data!.authorized) {
        queryClient.invalidateQueries();
        updateUser(data);
        navigate("/", { replace: true });
      } else {
        return toast({
          variant: "destructive",
          title: "Invalid credentials",
          description: "Make sure your email and password is correct.",
          color: "#FF7AAF",
        });
      }
    } catch (err: unknown) {
      // throw new Error(err);
      return;
    }
  };

  return (
    <div className="flex h-max sm:w-96 flex-col items-center lg:shadow-xl rounded-lg p-8 lg:border space-y-2">
      <Dialog open={blockedModal}>
        <DialogContent
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
          className="sm:max-w-[425px] flex flex-col items-center"
        >
          <div className="w-full flex justify-end">
            <DialogClose className="flex justify-end">
              <X
                className="hover:cursor-pointer"
                onClick={() => showBlockedModal(false)}
              />
            </DialogClose>
          </div>
          <DialogHeader className="flex flex-row space-x-3 w-full">
            <DialogTitle className="mt-3 dark:text-white flex flex-row space-x-1 text-center w-full justify-center ">
              {t("blockedModal.title")}
            </DialogTitle>
          </DialogHeader>
          <div className="block">
            <Ban size={100} color="#ff77ae" />
          </div>
          <div className="dark:block hidden">
            <Ban size={100} color="#ae2e51" />
          </div>
          <div className="flex flex-col space-y-5 items-center text-center mt-3">
            <p>{t("blockedModal.description1")}</p>
            <p>{t("blockedModal.description2")}</p>
          </div>
        </DialogContent>
      </Dialog>
      {/* <div className="flex w-full justify-end">
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
      </div> */}
      <form
        action="post"
        onSubmit={formik.handleSubmit}
        className="space-y-3 w-full p-2"
      >
        <div className="flex flex-col space-y-1 pt-3">
          {/* <label htmlFor="email" className="text-sm text-semibold mb-2">
            Email
          </label> */}
          <div
            className={`flex items-center flex-row border rounded-full h-max py-1 px-5 ${formik.touched.email && formik.errors.email
              ? "border-rose-500 p-0"
              : ""
              }`}
          >
            <MailIcon color="#98A2B3" size={20} className="mt-1" />
            <Input
              autoComplete="off"
              type="text"
              className={cn(
                "rtl:mr-3 autofill:bg-yellow-200 mx-2 text-sm focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-3 text-normal w-full",
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
              size={30}
              className={`mt-1 ${formik.touched.email && formik.errors.email
                ? "visible"
                : "hidden"
                }`}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div
              dir={i18n.language == "ar" ? "rtl" : "ltr"}
              className="error text-xs text-red-500 ml-5 pt-2"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-center space-y-1 pt-3">
          {/* <label htmlFor="password" className="text-xs text-semibold mb-2">
            Password
          </label> */}
          <div
            className={`flex h-max flex-row border items-center rounded-full py-1 px-5 ${formik.touched.password && formik.errors.password
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
              dir={i18n.language == "ar" ? "rtl" : "ltr"}
              className="error text-red-500 ml-5 text-xs pt-2"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div>
          <Button
            disabled={isLoading}
            type="submit"
            className={cn(
              "text-white h-10 w-full text-sm rounded-full py-2 hover:bg-[#FF599B]/90 mt-5 dark:bg-[#ae2e51]",
              isLoading ? "bg-[#FF8AB3]" : "bg-primary"
            )}
          >
            {isLoading ? (
              <Loader2 className="ml-2 h-full w-full animate-spin" />
            ) : (
              t("signIn.signIn")
            )}
          </Button>
        </div>
        <div className="w-full">
          <Dialog
            open={isModalOpen}
            onOpenChange={(val) => {
              if (isModalOpen) {
                setIsModalOpen(false);
              }
              if (!val) {
                changePasswordResetState("SEND");
              }
            }}
          >
            <DialogTrigger
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="dark:text-white dark:hover:text-white/80 flex w-full justify-center underline text-[#4635E2] hover:text-[#FF8AB3] text-xs mt-2"
            >
              {t("signIn.forgotPassword")}
            </DialogTrigger>
            <DialogContent className="w-72 md:w-full">
              <ForgotPassword />
            </DialogContent>
          </Dialog>
        </div>
      </form>
      <div
        className={cn(
          "flex flex-row space-x-2",
          i18n.language == "ar" && "flex-row-reverse space-x-reverse"
        )}
      >
        <p className="text-xs mt-4">{t("signIn.dontHaveAccount")}</p>
        <Link
          href="/auth/signup"
          onClick={scrollToTop}
          className="dark:text-white dark:hover:text-white/80 text-xs underline text-[#4635E2] mt-4 hover:text-[#FF8AB3]"
        >
          {t("signIn.signUpHere")}
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
