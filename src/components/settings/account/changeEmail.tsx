import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

type FormDataType = {
  newEmail: string;
  pin: string;
};

const ChangeEmail = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const { user } = useUserStore();
  const [t, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showChangePassDialog, setShowChangePassDialog] = useState(false);

  const initialValues = {
    newEmail: "",
    pin: "",
  };
  const validationSchema1 = Yup.object({
    newEmail: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
  });
  const validationSchema2 = Yup.object({
    newEmail: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    pin: Yup.string().required(t("validation.pinRequired")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: stepIndex == 0 ? validationSchema1 : validationSchema2,
    onSubmit: (values: FormDataType) => {
      stepIndex == 0 ? handleSendPin(values) :
        handlePinVerification(values);
    },
  });

  console.log(formik);

  const handleSendPin = async (values: FormDataType) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append(
        "auth",
        "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
      );
      formData.append("lang", i18n.language);
      formData.append("member", user!.member_id!.toString());
      formData.append("email", values.newEmail);

      const res = await axiosQuery.post(
        "https://muffinapi.azurewebsites.net/generate_pin.php",
        formData
      );

      if (res.data && res.data[0].authorized) {
        toast({
          title: t("alerts.pinGenerated"),
          description: `${t("alerts.pinSent")} ${res.data[0].email_address}`,
          variant: "success",
        });
        setStepIndex(1);
      } else {
        toast({
          title: t("alerts.somethingWentWrong"),
          description: t("alerts.tryAgain"),
          variant: "destructive",
        });
      }
    } catch (err: unknown) {
      toast({
        title: t("alerts.somethingWentWrong"),
        description: t("alerts.tryAgain"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinVerification = async (values: FormDataType) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append(
        "auth",
        "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
      );
      formData.append("lang", i18n.language);
      formData.append("email", values.newEmail);
      formData.append("member", user!.member_id!.toString());
      formData.append("pin", values.pin);
      const res = await axiosQuery.post(
        "https://muffinapi.azurewebsites.net/change_email.php",
        formData
      );
      if (res.data) {
        if (res.data[0].email_changed) {
          toast({
            title: "Email Updated",
            description: t("alerts.successful"),
            variant: "success",
          });
        } else {
          toast({
            title: t("alerts.invalidPin"),
            variant: "destructive",
          });
        }
        setShowChangePassDialog(false);
        setIsLoading(false);
        setStepIndex(1);
        formik.resetForm();
      }
    } catch (err: unknown) {
      setIsLoading(false);
      toast({
        title: t("alerts.somethingWentWrong"),
        description: t("alerts.tryAgain"),
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={showChangePassDialog} onOpenChange={setShowChangePassDialog}>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col space-y-2">
            <p className="font-medium">{t("settings.changeEmail")}</p>
          </div>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                formik.resetForm();
              }}
              type="button"
              variant={"outline"}
              className={cn(
                "hover:text-[#727272] rounded-full text-[#727272] h-10 text-sm border-[#DDDDDD] bg-white py-2 w-24 dark:bg-[#1b1d1e] dark:hover:text-white"
              )}
            >
              {t("settings.change")}
            </Button>
          </DialogTrigger>
          <DialogContent
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            className="sm:max-w-[425px] p-0 left-[50%] top-[50%] sm:top-[50%]  w-80 sm:w-full"
          >
            <DialogHeader className="m-0 p-0">
              <DialogTitle
                className={cn(
                  "font-normal p-4 m-0 bg-primary rounded-t-lg text-white",
                  i18n.language === "ar" && "flex justify-start w-full"
                )}
              >
                {t("settings.changeEmail")}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={formik.handleSubmit}
              className="w-full p-4 space-y-2"
            >
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="newEmail" className="text-[#727272] font-medium text-sm">
                  {t("settings.newEmail")}
                </label>
                <div>
                  <Input
                    type="email"
                    className="rounded-lg"
                    placeholder={t("signIn.emailAddress")}
                    {...formik.getFieldProps("newEmail")}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.newEmail && formik.errors.newEmail && (
                    <div className="error text-xs text-red-500 pt-2">
                      {formik.errors.newEmail}
                    </div>
                  )}
                </div>
              </div>

              {stepIndex === 1 && (
                <div className="flex flex-col w-full space-y-2 pt-5">
                  <label htmlFor="pin" className="font-medium text-sm text-[#727272]">
                    {t("settings.pin")}
                  </label>
                  <div>
                    <Input
                      type="text"
                      className="rounded-lg"
                      placeholder={t("settings.pin")}
                      {...formik.getFieldProps("pin")}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.pin && formik.errors.pin && (
                      <div className="error text-xs text-red-500 pt-2">
                        {formik.errors.pin}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end w-full">
                <Button
                  disabled={isLoading}
                  className={cn(
                    "text-white mt-8 h-10 text-sm rounded-full py-2 hover:bg-[#FF599B]/90 w-32 dark:bg-[#ae2e51]",
                    isLoading ? "bg-[#FF8AB3]" : "bg-primary"
                  )}
                >
                  {stepIndex == 0 ? "Continue" : t("settings.change")}
                  {isLoading && (
                    <span>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default ChangeEmail;
