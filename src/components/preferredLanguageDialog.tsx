import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import languageQuery from "@/queries/language";

import { usePreferredLanguageStore } from "@/zustand/auth/preferred_language";
import { useUserStore } from "@/zustand/auth/user";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const PreferredLanguageDialog = ({
  showTrigger = false,
  triggerTitle,
  triggerVariant = "default",
}: {
  showTrigger: boolean;
  triggerTitle?: null | string;
  triggerVariant: string;
}) => {
  const [t, i18n] = useTranslation();
  const { preferred, setPreferredLanguage } = usePreferredLanguageStore();
  const [changePreferredLanguage, setChangePreferredLanguage] = useState(false);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  return (
    <Dialog open={preferred == null || changePreferredLanguage}>
      {showTrigger && (
        <div className="flex justify-between items-center">
          {user && user.profile_completed && (
            <p className="font-medium pt-5">
              {triggerTitle
                ? triggerTitle
                : t("settings.changePreferredLanguage")}
            </p>
          )}
          <DialogTrigger className="flex">
            <Button
              type="button"
              variant={
                triggerVariant as
                | "default"
                | "destructive"
                | "outline"
                | "secondary"
                | "ghost"
                | "link"
                | null
                | undefined
              }
              className={cn(
                "text-white h-10 text-sm rounded-lf py-2 hover:bg-[#FF599B]/90 w-24 dark:bg-[#1b1d1e] dark:hover:bg-red-700/90"
              )}
              onClick={() => setChangePreferredLanguage(true)}
            >
              {triggerTitle ? triggerTitle : t("settings.change")}
            </Button>
          </DialogTrigger>
        </div>
      )}
      <DialogContent className="w-72 sm:w-full">
        <DialogHeader dir={i18n.language == 'ar' ? "rtl" : "ltr"} className="mb-2 w-full flex justify-end">
          <div className="flex">
            <DialogTitle className="text-sm sm:text-base flex w-full items-center">{t("general.chooseYourPreferredLanguage")}
            </DialogTitle>
            <DialogClose >
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 mt-2">
          <p
            onClick={async () => {
              setPreferredLanguage("en");
              setChangePreferredLanguage(false);
              if (user !== null && i18n.language !== 'en') {
                await languageQuery.updateLanguagePreference(
                  "en",
                  user.member_id
                );
                queryClient.invalidateQueries({ queryKey: ["home-members"] });
              }
            }}
            className="text-center font-semibold cursor-pointer"
          >
            <span className="flex w-full justify-center mb-1">
              <img
                className="mr-2 h-24"
                src="https://muffin0.blob.core.windows.net/flags/us.png"
                alt="english-flag"
              />
            </span>
            English
          </p>
          <p
            onClick={async () => {
              setPreferredLanguage("ar");
              setChangePreferredLanguage(false);
              if (user !== null && i18n.language !== 'ar') {
                await languageQuery.updateLanguagePreference(
                  "ar",
                  user.member_id
                );
                queryClient.invalidateQueries({ queryKey: ["home-members"] });
              }
            }}
            className="text-center font-semibold cursor-pointer"
          >
            <span className="flex w-full justify-center mb-1">
              <img
                className="mr-2 h-24"
                src="https://muffin0.blob.core.windows.net/flags/ae.png"
                alt="arabic-flag"
              />
            </span>
            العربية
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferredLanguageDialog;
