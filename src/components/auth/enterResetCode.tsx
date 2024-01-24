import { InfoIcon, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePasswordResetState } from "@/zustand/auth/passwordReset";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import passwordResetQuery from "@/queries/password_reset";
import { toast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";

const EnterResetCode = () => {
  const [t, i18n] = useTranslation();
  const changePasswordResetState = usePasswordResetState(
    (state) => state.changeState
  );
  const email = usePasswordResetState((state) => state.email);

  const pinForm = useFormik({
    initialValues: { pin: "" },
    validationSchema: Yup.object({
      pin: Yup.string()
        .matches(/^[0-9]+$/, t("validation.pinNumbersOnly"))
        .max(6, t("validation.pinLength"))
        .required(t("validation.pinRequired")),
    }),
    onSubmit(values: { pin: string }) {
      verifyPinMutation.mutate({ pin: values.pin, email: email });
    },
  });

  const verifyPinMutation = useMutation({
    mutationFn: passwordResetQuery.verifyPasswordPin,
    onSuccess: (res) => {
      if (!res.data[0].verified) {
        pinForm.setFieldError("pin", t("validation.invalidPin"));
        toast({
          duration: 1500,
          variant: "destructive",
          title: t("alerts.tryAgainLater"),
          description: t("validation.invalidPin"),
        });
        return;
      } else {
        changePasswordResetState("CHANGE");
        toast({
          title: t("alerts.pinVerified"),
          description: t("alerts.enterNewPassword"),
        });
      }
    },
  });

  return (
    <div dir={i18n.language == 'ar' ? 'rtl' : "ltr"}>
      <p className="font-bold text-lg text-[#1B2950] w-full border-b-2 border-[#E0E0E0] pb-5">
        {t("forgotPassword.enterPinNumber")}
      </p>

      <div>
        <form action="post" onSubmit={pinForm.handleSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="pin" className="text-sm text-bold mb-1 ml-5">
              {t("forgotPassword.sentAPinToEmail")}
            </label>
            <div
              className={`flex flex-row border items-center justify-center rounded-full py-1 px-5 ${pinForm.touched.pin && pinForm.errors.pin
                ? "border-rose-500 p-0"
                : ""
                }`}
            >
              <ShieldCheck color="#98A2B3" size={20} className="mt-1" />
              <input
                type="text"
                className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                placeholder={t("forgotPassword.enterPin")}
                {...pinForm.getFieldProps("pin")}
                name="pin"
              // onChange={pinForm.handleChange}
              // onBlur={pinForm.handleBlur}
              />
              <InfoIcon
                color="#D92D20"
                size={20}
                className={`mt-1 ${pinForm.touched.pin && pinForm.errors.pin
                  ? "visible"
                  : "hidden"
                  }`}
              />
            </div>
            {pinForm.errors.pin && (
              <div dir={i18n.language == 'ar' ? 'rtl' : 'ltr'} className="error text-red-500 text-sm ml-2">
                {pinForm.errors.pin}
              </div>
            )}
          </div>
          <div className="w-full border-t-2 mt-4 border-[#E0E0E0] flex flex-row justify-end float-right space-x-3 py-5">
            <Button
              type="submit"
              className={cn(
                "text-white w-max rounded-md hover:bg-[#FF599B]/90"
              )}
            >
              {t("general.verify")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterResetCode;
