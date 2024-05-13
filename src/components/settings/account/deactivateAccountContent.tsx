import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
// import useReadConversationsStateStore from "@/zustand/messaging/readConversations";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import { CheckedState } from "@radix-ui/react-checkbox";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import OneSignal from "react-onesignal";

const DeactivateAccountContent = () => {
  const [t, i18n] = useTranslation();
  const signOut = useUserStore((state) => state.reset);
  // const { updateRead: setReadList } = useReadConversationsStateStore();
  const [showDialog, setShowDialog] = useState(false);
  const { setProfileData } = profileAboutContentStore();
  const { setProfileHeaderValues } = profileHeaderStore();
  const { user, updateUser } = useUserStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [checked, setChecked] = useState<CheckedState>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const queryClient = useQueryClient();
  const deactivateAccount = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append(
        "auth",
        "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
      );
      formData.append("lang", i18n.language);
      formData.append("member", user!.member_id.toString());
      const res = await axiosQuery.post(
        "https://muffinapi.azurewebsites.net/deactivate_account.php",
        formData
      );
      if (res.data) {
        toast({
          title: t("alerts.accountDeactivated"),
          description: t("alerts.changesTakeAwhile"),
          // variant: "success",
        });
        updateUser({ ...user!, temporarily_deactivated: true });
        setIsLoading(false);
        setChecked(false);
      }
    } catch (error) {
      return;
    }
    setShowDialog(false);
  };

  const reactivateAccount = async () => {
    try {
      setIsLoading(true);
      const res = await axiosQuery.post("/ReactivateAccount", {
        member: user!.member_id,
      });
      if (res.data) {
        toast({
          title: t("alerts.accountReactivated"),
          description: t("alerts.changesTakeAwhile"),
          variant: "success",
        });
        updateUser({ ...user!, temporarily_deactivated: false });
        setIsLoading(false);
      }
    } catch (error) {
      return;
    }
    setShowDialog(false);
  };

  const deleteAccount = async () => {
    try {
      setDeleteLoading(true);
      // const formData = new FormData();
      // formData.append(
      //   "auth",
      //   "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
      // );
      // formData.append("lang", i18n.language);
      // formData.append("member", user!.member_id.toString());
      // const res = await axiosQuery.post("https://muffinapi.azurewebsites.net/delete_account.php",formData);
      // if (res.data) {
      toast({
        title: t("alerts.accountDeleted"),
        description: t("alerts.changesTakeAwhile"),
        // variant: "success",
      });
      setDeleteLoading(false);
      queryClient.clear();
      signOut();
      // setReadList({});
      setProfileData(null);
      setProfileHeaderValues(null);
      await OneSignal.logout();
      // }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    setChecked(false);
  }, []);
  return (
    <div className="flex overflow-clip flex-col border border-primary w-full rounded-[16px] border-b justify-center items-center text-[#727272] space-y-2">
      <div className="flex w-full p-4 bg-primary">
        <p className="text-white text-lg">
          {user?.temporarily_deactivated
            ? t("settings.reactivateAccount")
            : t("settings.deactivateAccount")}
        </p>
      </div>
      {/* <p className="font-medium">Deactivate</p> */}
      <Dialog open={showDialog} onOpenChange={(val) => setShowDialog(val)}>
        <div className="flex p-4 flex-row w-full justify-between items-center">
          <div className="flex flex-col justify-start">
            <p className="font-semibold">
              {user?.temporarily_deactivated
                ? t("settings.reactivate")
                : t("settings.deactivate")}

            </p>
            {
              !user?.temporarily_deactivated
              &&
              <p className="mr-8">
                Your profile, photos, and messages will be hidden, and you will not appear in any search results.
              </p>
            }
          </div>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "hover:text-[#727272] rounded-full text-[#727272] h-10 text-sm border-[#DDDDDD] bg-white py-2 w-24 dark:bg-[#1b1d1e] "
              )}
            >
              {user?.temporarily_deactivated
                ? t("settings.reactivate")
                : t("settings.deactivate")}
            </Button>
          </DialogTrigger>

          <DialogContent
            dir={i18n.language == "ar" ? "rtl" : "ltr"}
            className="sm:max-w-[425px] p-0 left-[50%] top-[50%] sm:top-[50%]  w-80 sm:w-full"
          >
            <DialogHeader className="m-0 bg-primary p-0 rounded-t-lg">
              <div className="flex flex-row p-4 justify-between items-start ">
                <DialogTitle className="rounded-t-lg text-white font-medium m-0 p-0">
                  {user?.temporarily_deactivated
                    ? t("settings.reactivate")
                    : t("settings.deactivate")}
                </DialogTitle>
                <DialogClose>
                  <X className="hover:cursor-pointer text-white" size={20} />
                </DialogClose>
              </div>
            </DialogHeader>
            {!user?.temporarily_deactivated ? (
              <DialogDescription className={cn("px-4 pb-5", i18n.language == 'ar' ? "text-right" : "text-left")}>
                {t("deactivateProfile.deactivateMessage")}
              </DialogDescription>
            ) : (
              <DialogDescription
                className={cn(
                  "px-4 pb-5",
                  i18n.language == "ar" ? "text-right" : "text-left"
                )}
              >
                {t("alerts.reactivateDescription")}
              </DialogDescription>
            )}
            {!user?.temporarily_deactivated && (
              <div
                className={cn(
                  "flex items-center space-x-2 mx-4",
                  i18n.language == "ar" && "space-x-reverse"
                )}
              >
                <Checkbox
                  id="terms"
                  // checked={checked}
                  onCheckedChange={(state) => setChecked(state)}
                />
                <label
                  htmlFor="terms"
                  className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("deactivateProfile.proceed")}
                </label>
              </div>
            )}
            <div className="flex flex-row justify-center px-4 pb-4">
              <div
                className={cn(
                  "flex flex-row space-x-4",
                  i18n.language == "ar" && "space-x-reverse"
                )}
              >
                <Button
                  disabled={
                    (!user!.temporarily_deactivated && (!checked as boolean)) ||
                    isLoading
                  }
                  className={cn(
                    "text-white h-10 text-sm rounded-lf py-2  mt-5 w-24",
                    user?.temporarily_deactivated
                      ? "bg-primary hover:bg-[#FF599B]/90"
                      : "bg-orange-400 hover:bg-orange-400/90"
                  )}
                  onClick={() => {
                    if (user?.temporarily_deactivated) {
                      reactivateAccount();
                    } else {
                      deactivateAccount();
                    }
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="ml-2 h-full w-full animate-spin" />
                  ) : user?.temporarily_deactivated ? (
                    t("settings.reactivate")
                  ) : (
                    t("settings.deactivate")
                  )}
                </Button>
                {!user?.temporarily_deactivated && (
                  <Button
                    disabled={(!checked as boolean) || isLoading}
                    className={cn(
                      "text-white bg-red-500 h-10  text-sm rounded-lf py-2 hover:bg-red-500/90 mt-5 w-24"
                    )}
                    // onClick={() => deleteAccount}
                    onClick={() => setDeleteModal(true)}
                  >
                    {t("deactivateProfile.delete")}
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
      {/* delete modal */}
      <Dialog
        open={deleteModal}
        onOpenChange={(state) => {
          setDeleteModal(state);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader dir={i18n.language == "ar" ? "rtl" : "ltr"}>
            <DialogTitle
              className={cn(i18n.language == "ar" ? "text-right" : "text-left")}
            >
              {t("deactivateProfile.importantNotice")}
            </DialogTitle>
            <DialogDescription
              className={cn(i18n.language == "ar" ? "text-right" : "text-left")}
            >
              {t("deactivateProfile.noticeDescription")}
            </DialogDescription>
            <DialogDescription
              className={cn(
                i18n.language == "ar" ? "text-right" : "text-left",
                "pt-5"
              )}
            >
              {t("deactivateProfile.cannotBeUndone")}
            </DialogDescription>
          </DialogHeader>
          <div
            dir={i18n.language == "ar" ? "rtl" : "ltr"}
            className={cn(
              "flex flex-row space-x-4",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Button
              // disabled={(!checked as boolean) || deleteLoading}
              className={cn(
                "text-white bg-red-500 h-10 w-3/4 text-sm rounded-lf py-3 hover:bg-red-500/90 mt-5 "
              )}
              onClick={() => deleteAccount()}
            >
              {deleteLoading ? (
                <Loader2 className="ml-2 h-full w-full animate-spin" />
              ) : (
                t("deactivateProfile.permanentlyDelete")
              )}
            </Button>
            <DialogClose>
              <Button
                // disabled={(!checked as boolean) || isLoading}
                className={cn(
                  "text-white bg-slate-500 h-10 w-full text-sm rounded-lf py-3 hover:bg-slate-500/90 mt-5 "
                )}
              // onClick={() => deleteAccount}
              >
                {t("deactivateProfile.no")}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeactivateAccountContent;
