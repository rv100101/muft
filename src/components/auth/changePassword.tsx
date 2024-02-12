import passwordResetQuery from "@/queries/password_reset";
import { usePasswordResetState } from "@/zustand/auth/passwordReset";
import { useFormik } from "formik";
import { Eye, EyeOff, InfoIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

type FormDataType = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [t, i18n] = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const changePasswordResetState = usePasswordResetState(
    (state) => state.changeState
  );
  const email = usePasswordResetState((state) => state.email);
  const setIsModalOpen = usePasswordResetState((state) => state.setIsModalOpen);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required(t("validation.passwordRequired"))
        .min(10, t("validation.passwordLength"))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z0-9\W_]{10,25}$/,
          t("validation.passwordComplexity")
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        t("validation.passwordsMustMatch")
      ),
    }),
    onSubmit: async (values: FormDataType) => {
      setIsLoading(true);
      setIsModalOpen(false);
      try {
        await passwordResetQuery.changePassword(email, values.password);
        toast({
          title: t("alerts.successful"),
          description: t("alerts.passwordSuccessfullyChanged"),
          variant: "success",
        });
        changePasswordResetState("SEND");
      } catch (error) {
        toast({
          title: t("alerts.somethingWentWrong"),
          description: t("alerts.tryAgainLater"),
          variant: "destructive",
        });
        console.log(error);
      }
      setIsLoading(false);
    },
  });

  return (
    <div
      dir={i18n.language == 'ar' ? "rtl" : "ltr"}
      className="space-y-2">
      <p className="mb-2 text-xl font-semibold">
        {t("changePassword.changePassword")}
      </p>
      <form
        action="post"
        onSubmit={formik.handleSubmit}
        className="space-y-2 w-full"
      >
        <div className="flex flex-col items-start justify-start">
          <div
            className={`flex items-center flex-row border rounded-full py-1 px-5w w-full px-4 ${formik.touched.password && formik.errors.password
              ? "border-rose-500"
              : ""
              }`}
          >
            <LockIcon color="#98A2B3" size={20} className="mt-1" />

            <input
              className="appearance-none border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
              placeholder={t("signUp.password")}
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
            <div className="error text-red-500 ml-5 text-sm pt-2">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col items-start justify-start space-y-1">
          <div
            className={`flex items-center flex-row border rounded-full py-1 px-5w w-full px-4 ${formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border-rose-500"
              : ""
              }`}
          >
            <LockIcon color="#98A2B3" size={20} className="mt-1" />
            <input
              type="password"
              className="border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
              placeholder={t("changePassword.reTypePassword")}
              {...formik.getFieldProps("confirmPassword")}
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoIcon
              color="#D92D20"
              size={20}
              className={`mt-1 ${formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "visible"
                : "hidden"
                }`}
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error text-red-500 ml-5 text-xs pt-2">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <div className="flex">
          <Button
            disabled={isLoading}
            className="hover:bg-primary"
            type="submit"
          >
            {t("general.save")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
