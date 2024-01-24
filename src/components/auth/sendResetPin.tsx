import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import passwordResetQuery from "@/queries/password_reset";
import { toast } from "../ui/use-toast";
import { usePasswordResetState } from "@/zustand/auth/passwordReset";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
const SendResetPin = () => {
  const [t, i18n] = useTranslation();
  const changePasswordResetState = usePasswordResetState(
    (state) => state.changeState
  );
  const setEmail = usePasswordResetState((state) => state.setEmail);
  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("validation.invalidEmail"))
        .required(t("validation.emailRequired")),
    }),
    onSubmit(values: { email: string }) {
      sendResetPinMutation.mutate(values);
    },
  });

  const sendResetPinMutation = useMutation({
    mutationFn: passwordResetQuery.getPasswordPin,
    onSuccess: (res) => {
      if (typeof res.data == "string") {
        toast({
          variant: "destructive",
          title: t("alerts.tryAgainLater"),
          description: t("alerts.invalidEmail"),
        });
        return;
      } else {
        if (res.data !== "") {
          changePasswordResetState("VERIFY");
          setEmail(res.data.email_address);
          toast({
            title: t("alerts.passwordResetPinSent"),
            description: t("alerts.checkEmailForPin"),
          });
        }
      }
    },
  });
  return (
    <form onSubmit={emailForm.handleSubmit}>
      <div
        className={cn(
          "space-y-4",
          i18n.language == "ar" && "text-right w-full"
        )}
      >
        <h1 className={cn("font-bold lg:text-2xl")}>
          {t("forgotPassword.resetPassword")}
        </h1>
        <hr />
        <p>{t("forgotPassword.pleaseEnterEmail")}</p>
        <div className="flex items-center space-x-2 justify-around border-2 px-4 rounded-full">
          {/* <label htmlFor="email">Email</label>
          <MailIcon /> */}
          <Input
            autoComplete="off"
            {...emailForm.getFieldProps("email")}
            id="email"
            name="email"
            type="text"
            placeholder={t("forgotPassword.emailAddress")}
            className={cn(
              "border-none focus-visible:ring-offset-0 focus-visible:ring-0",
              i18n.language == "ar" && "text-right"
            )}
          />
        </div>
        {emailForm.errors.email && (
          <div className="error text-red-500 text-sm ml-2">
            {emailForm.errors.email}
          </div>
        )}
        <hr />
        <div className="flex space-x-2 justify-end">
          <DialogClose className="hover: border border-primary rounded-md px-2 py-1 text-sm">
            {t("forgotPassword.cancel")}
          </DialogClose>
          <Button
            disabled={sendResetPinMutation.isLoading}
            className={cn("text-white w-max rounded-md hover:bg-[#FF599B]/90")}
            type="submit"
          >
            {t("forgotPassword.reset")}
            {sendResetPinMutation.isLoading && (
              <span>
                <Loader2 className="ml-2 h-min w-min animate-spin" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SendResetPin;
