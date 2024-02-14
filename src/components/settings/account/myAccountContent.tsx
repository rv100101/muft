import PreferredLanguageDialog from "@/components/preferredLanguageDialog";
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
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
// import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

type FormDataType = {
  newPassword: string;
  rePassword: string;
};

const MyAccountContent = () => {
  const { user } = useUserStore();
  const [t, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  // const getMembers = profileQuery.getProfileHeader(user!.member_id);

  // const { data: memberInfo, isLoading: retrievingMemberData } = useQuery({
  //   queryKey: ["my-account"],
  //   queryFn: () => getMembers,
  // });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required(t("validation.passwordRequired"))
        .min(10, t("validation.passwordLength")),
      rePassword: Yup.string()
        .required(t("validation.fieldRequired"))
        .oneOf([Yup.ref("newPassword"), ""], t("validation.passwordsMustMatch")),
    }),
    onSubmit: (values: FormDataType) => handleSignIn(values),
  });

  const handleSignIn = async (values: FormDataType) => {
    try {
      setIsLoading(true);
      // const res = await axiosQuery.post("/SaveNickname", {
      //   nickname: values.username,
      //   member: user!.member_id,
      // });
      const res = await axiosQuery.post("/ChangePassword", {
        password: values.newPassword,
        email: user!.email_address,
      });
      if (res.data) {
        toast({
          title: t("alerts.passwordUpdated"),
          description: t("alerts.changesTakeAwhile"),
          variant: "success",
        });
        setIsLoading(false);
      }
    } catch (err: unknown) {
      return;
    }
  };

  // if (retrievingMemberData) {
  //   return <>Loading...</>;
  // }
  return (
    <div className="flex flex-col  w-full  border-b justify-center text-[#727272] space-y-2 p-5">
      <p className="font-semibold text-lg">{t("settings.myAccount")}</p>
      <PreferredLanguageDialog showTrigger={true} triggerVariant={"default"} />
      <Dialog>
        <div className="flex flex-row w-full justify-between items-center">
          <p className="font-medium pt-5">{t("settings.changePassword")}</p>
          <DialogTrigger asChild>
            <Button
              className={cn(
                "text-white h-10 text-sm rounded-lf py-2 hover:bg-[#FF599B]/90 w-24 dark:bg-[#1b1d1e] dark:hover:bg-red-700/90"
              )}
            >
              {t("settings.update")}
            </Button>
          </DialogTrigger>
          <DialogContent
            dir={i18n.language == "ar" ? "rtl" : "ltr"}
            className="sm:max-w-[425px] w-96 left-[50%] top-[25%] sm:top-[50%]"
          >
            <DialogHeader>
              <DialogTitle
                className={cn(
                  "font-medium",
                  i18n.language == "ar" && "flex justify-start w-full"
                )}
              >
                {t("changePassword.changePassword")}
              </DialogTitle>
            </DialogHeader>
            <form
              action="post"
              onSubmit={formik.handleSubmit}
              className="space-y-3 w-full p-2"
            >
              <div className="flex flex-col w-full justify-between space-y-2 pt-5">
                <label htmlFor="" className="font-medium text-sm">
                  {t("changePassword.newPassword")}
                </label>
                <Input
                  type="password"
                  className="rounded rounded-lg"
                  // className="autofill:bg-yellow-200 mx-2 text-sm h-8 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-5 text-normal w-full"
                  placeholder={t("changePassword.password")}
                  {...formik.getFieldProps("newPassword")}
                  onChange={formik.handleChange}
                  name="newPassword"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="error text-xs text-red-500 ml-5 pt-2">
                    {formik.errors.newPassword}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col w-full justify-between space-y-2 pt-5">
                <label htmlFor="" className="font-medium text-sm">
                  {t("changePassword.reTypePassword")}
                </label>
                <Input
                  type="password"
                  className="rounded rounded-lg"
                  // className="autofill:bg-yellow-200 mx-2 text-sm h-8 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-5 text-normal w-full"
                  placeholder={t("changePassword.password")}
                  {...formik.getFieldProps("rePassword")}
                  onChange={formik.handleChange}
                  name="rePassword"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.rePassword && formik.errors.rePassword ? (
                  <div className="error text-xs text-red-500 ml-5 pt-2">
                    {formik.errors.rePassword}
                  </div>
                ) : null}
              </div>
              <DialogClose>
                <div>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className={cn(
                      "text-white h-10 text-sm rounded-full py-2 hover:bg-[#FF599B]/90 w-24 dark:bg-[#ae2e51]",
                      isLoading ? "bg-[#FF8AB3]" : "bg-primary"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="ml-2 h-full w-full animate-spin" />
                    ) : (
                      t("settings.update")
                    )}
                  </Button>
                </div>
              </DialogClose>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default MyAccountContent;
