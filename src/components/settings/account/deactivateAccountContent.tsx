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
import useReadConversationsStateStore from "@/zustand/messaging/readConversations";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import { CheckedState } from "@radix-ui/react-checkbox";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DeactivateAccountContent = () => {
  const [t, i18n] = useTranslation();
  const signOut = useUserStore((state) => state.reset);
  const { updateRead: setReadList } = useReadConversationsStateStore();
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
      const res = await axiosQuery.post("/DeactivateAccount", {
        member: user!.member_id,
      });
      if (res.data) {
        toast({
          title: "Account has been deactivated",
          description: t("alerts.changesTakeAwhile"),
          // variant: "success",
        });
        updateUser({ ...user!, temporarily_deactivated: true });
        setIsLoading(false);
        setChecked(false);
      }
    } catch (error) {
      console.log(error);
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
          title: "Your account has been reactivated!",
          description: t("alerts.changesTakeAwhile"),
          variant: "success",
        });
        updateUser({ ...user!, temporarily_deactivated: false });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setShowDialog(false);
  };

  const deleteAccount = async () => {
    try {
      console.log("this is triggered");
      setDeleteLoading(true);
      // const res = await axiosQuery.post("/DeleteAccount", {
      //   member: user!.member_id,
      // });
      // if (res.data) {
      toast({
        title: "Account has been deleted",
        description: t("alerts.changesTakeAwhile"),
        // variant: "success",
      });
      setDeleteLoading(false);
      queryClient.clear();
      signOut();
      setReadList({});
      setProfileData(null);
      setProfileHeaderValues(null);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setChecked(false);
  }, []);
  return (
    <div className="flex flex-col  w-full justify-center text-[#727272] space-y-2 px-5 py-10">
      <p className="font-semibold pb-1 text-lg">
        {user?.temporarily_deactivated
          ? t("settings.reactivateAccount")
          : t("settings.deactivateAccount")}
      </p>
      {/* <p className="font-medium">Deactivate</p> */}
      <Dialog open={showDialog} onOpenChange={(val) => setShowDialog(val)}>
        <div className="flex flex-row w-full justify-between items-center">
          <p>
            {user?.temporarily_deactivated
              ? t("settings.reactivate")
              : t("settings.deactivate")}
          </p>
          <DialogTrigger asChild>
            <Button
              className={cn(
                "text-white  h-10  text-sm rounded-lf py-2 hover:bg-[#FF599B]/90 w-24 dark:bg-[#1b1d1e] dark:hover:bg-red-700/90"
              )}
            >
              {user?.temporarily_deactivated
                ? t("settings.reactivate")
                : t("settings.deactivate")}
            </Button>
          </DialogTrigger>

          <DialogContent dir={i18n.language == 'ar' ? 'rtl' : "ltr"} className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex flex-row justify-between items-start  pb-5">
                <DialogTitle className="font-medium">
                  {user?.temporarily_deactivated
                    ? t("settings.reactivate")
                    : t("settings.deactivate")}
                </DialogTitle>
                <DialogClose>
                  <X className="hover:cursor-pointer" size={20} />
                </DialogClose>
              </div>
              {!user?.temporarily_deactivated ? (
                <DialogDescription className="pb-5">
                  {t("deactivateProfile.deactivateMessage")}
                </DialogDescription>
              ) : (
                <DialogDescription className="pb-5">
                  By choosing reactivating your account, you'll make your
                  profile visible to other users on Muffin.{" "}
                </DialogDescription>
              )}
            </DialogHeader>
            {!user?.temporarily_deactivated && (
              <div className={cn("flex items-center space-x-2", i18n.language == 'ar' && 'space-x-reverse')}>
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
            <div className="flex flex-row justify-center">
              <div className={cn("flex flex-row space-x-4", i18n.language == 'ar' && 'space-x-reverse')}>
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
          <DialogHeader>
            <DialogTitle>{t("deactivateProfile.importantNotice")}</DialogTitle>
            <DialogDescription>
              {t("deactivateProfile.noticeDescription")}
            </DialogDescription>
            <DialogDescription className="pt-5">
              {t("deactivateProfile.cannotBeUndone")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row space-x-4">
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
