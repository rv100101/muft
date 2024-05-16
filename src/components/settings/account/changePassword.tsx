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
// import profileQuery from "@/queries/profile/profileHeader";
import { useUserStore } from "@/zustand/auth/user";
import { DialogTrigger } from "@radix-ui/react-dialog";
// import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import ChangePasswordAlert from "./changePasswordAlert";

type FormDataType = {
  newPassword: string;
  rePassword: string;
};



const SettingsChangePassword = () => {
  const { user } = useUserStore();
  const [t, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showChangePassDialog, setShowChangePassDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const passwordInitialValues = {
    newPassword: "",
    rePassword: "",
  };

  const passwordValidator = Yup.object({
    newPassword: Yup.string()
      .required(t("validation.passwordRequired"))
      .min(10, t("validation.passwordLength")),
    rePassword: Yup.string()
      .required(t("validation.fieldRequired"))
      .oneOf([Yup.ref("newPassword"), ""], t("validation.passwordsMustMatch")),
  });

  const formik = useFormik({
    initialValues: passwordInitialValues,
    validationSchema: passwordValidator,
    onSubmit: (values: FormDataType) => handleSignIn(values),
  });

  const handleSignIn = async (values: FormDataType) => {
    try {
      setIsLoading(true);
      // const res = await axiosQuery.post("/SaveNickname", {
      //   nickname: values.username,
      //   member: user!.member_id,
      // });
      const formData = new FormData();
      formData.append(
        "auth",
        "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
      );
      formData.append("lang", i18n.language);
      formData.append("email", user!.email_address);
      formData.append("password", values.newPassword);
      const res = await axiosQuery.post("https://muffinapi.azurewebsites.net/change_password.php",
        formData
      );
      if (res.data) {
        if (res.data[0].password_changed) {
          toast({
            title: t("alerts.passwordUpdated"),
            description: t("alerts.changesTakeAwhile"),
            variant: "success",
          });
        } else {
          toast({
            title: "Sorry we are Unable to change your Password.",
            variant: "destructive",
          });
        }
        setShowChangePassDialog(false);
        setShowAlertDialog(false);
        setIsLoading(false);
        formik.resetForm()
      }
    } catch (err: unknown) {
      return;
    }
  };

  return (
    <>
      <ChangePasswordAlert onCancel={() => {
        formik.setValues({ newPassword: "", rePassword: "" });
      }} open={showAlertDialog} setShowAlertDialog={setShowAlertDialog} isLoading={isLoading} onSubmit={() => {
        formik.submitForm();
      }} />
      <Dialog open={showChangePassDialog} onOpenChange={(val) => setShowChangePassDialog(val)} >
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col space-y-2">
            <p className="font-medium">{t("settings.changePassword")}</p>
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
            dir={i18n.language == "ar" ? "rtl" : "ltr"}
            className="sm:max-w-[425px] p-0 left-[50%] top-[50%] sm:top-[50%]  w-80 sm:w-full"
          >
            <DialogHeader className="m-0 p-0">
              <DialogTitle
                className={cn(
                  "font-normal p-4 m-0 bg-primary rounded-t-lg text-white",
                  i18n.language == "ar" && "flex justify-start w-full"
                )}
              >
                {t("changePassword.changePassword")}
              </DialogTitle>
            </DialogHeader>
            <form
              action="post"
              onSubmit={formik.handleSubmit}
              className="w-full p-4 space-y-2"
            >
              <div className="flex flex-col w-full justify-between space-y-2">
                <label htmlFor="" className="text-[#727272] font-medium text-sm">
                  {t("changePassword.newPassword")}
                </label>
                <div>
                  <Input
                    type="password"
                    className="rounded-lg "
                    // className="autofill:bg-yellow-200 mx-2 text-sm h-8 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-5 text-normal w-full"
                    placeholder={t("changePassword.password")}
                    {...formik.getFieldProps("newPassword")}
                    onChange={formik.handleChange}
                    name="newPassword"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="error text-xs text-red-500 pt-2">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col w-full justify-between space-y-2 pt-5">
                <label htmlFor="" className="font-medium text-sm text-[#727272]">
                  {t("changePassword.reTypePassword")}
                </label>
                <div>
                  <Input
                    type="password"
                    className="rounded-lg"
                    // className="autofill:bg-yellow-200 mx-2 text-sm h-8 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-5 text-normal w-full"
                    placeholder={t("changePassword.password")}
                    {...formik.getFieldProps("rePassword")}
                    onChange={formik.handleChange}
                    name="rePassword"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.rePassword && formik.errors.rePassword ? (
                    <div className="error text-xs text-red-500 pt-2">
                      {formik.errors.rePassword}
                    </div>
                  )
                    : null}
                </div>
              </div>
              <div className="flex justify-end w-full">
                <Button
                  onClick={() => {
                    if (Object.keys(formik.errors).length == 0 &&
                      formik.touched
                    ) {
                      setShowAlertDialog(true);
                    }
                  }
                  }
                  disabled={isLoading}
                  type="button"
                  className={cn(
                    "text-white h-10 text-sm rounded-full py-2 hover:bg-[#FF599B]/90 w-24 dark:bg-[#ae2e51]",
                    isLoading ? "bg-[#FF8AB3]" : "bg-primary"
                  )}
                >
                  {
                    t("settings.update")
                  }
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

export default SettingsChangePassword;
