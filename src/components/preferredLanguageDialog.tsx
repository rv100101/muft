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
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
const PreferredLanguageDialog = ({
  showTrigger = false,
  triggerTitle = null,
  triggerVariant = "default",
  isLandingPage = false
}: {
  showTrigger: boolean;
  triggerTitle?: null | string;
  triggerVariant: string;
  isLandingPage: boolean;
}) => {
  const { setProfileData } = profileAboutContentStore();
  const [t, i18n] = useTranslation();
  const { preferred, setPreferredLanguage } = usePreferredLanguageStore();
  const [changePreferredLanguage, setChangePreferredLanguage] = useState(false);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const [location] = useLocation()
  return (
    <Dialog open={preferred == null && !location.startsWith('/places/') || changePreferredLanguage}>
      {showTrigger && (
        <div className="flex justify-between items-center h-max">
          {user && user.profile_completed && (
            <div className="flex flex-col justify-center h-full items-center">
              <p className="font-medium">
                {t("settings.changePreferredLanguage")}
              </p>
              {/* <p className="text-xs">
                Choose your language to be used
              </p> */}
            </div>
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
                "hover:text-[#727272] rounded-full text-[#727272] h-10 text-sm border-[#DDDDDD] bg-white py-2 w-max dark:bg-[#1b1d1e] dark:hover:text-white", isLandingPage && "bg-primary text-white hover:bg-[#ff599b]/90 hover:text-white "
              )}
              onClick={() => setChangePreferredLanguage(true)}
            >
              <span
                className={cn("w-4", i18n.language == "en" && isLandingPage ? 'mr-1' : "mx-1")}>
                {
                  isLandingPage && triggerTitle &&
                    i18n.language == 'en' ?
                    <img
                      className="object-fit rounded-full"
                      src="https://muffin0.blob.core.windows.net/flags/ae.png"
                      alt="ae-flag"
                    />
                    :
                    <img
                      className="object-fit rounded-full"
                      src="https://muffin0.blob.core.windows.net/flags/us.png"
                      alt="english-flag"
                    />
                }
                {/* {
                  !isLandingPage &&
                    i18n.language == 'en' ?
                    <img
                      className="object-fit rounded-full"
                      src="https://muffin0.blob.core.windows.net/flags/us.png"
                      alt="english-flag"
                    /> :
                    <img
                      className="object-fit rounded-full"
                      src="https://muffin0.blob.core.windows.net/flags/ae.png"
                      alt="ae-flag"
                    />
                } */}
              </span> {triggerTitle ? triggerTitle : i18n.language == 'en' ? 'English' : "العربية"}
            </Button>
          </DialogTrigger>
        </div>
      )}
      <DialogContent
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
        className="p-0 m-0 gap-0 w-72 sm:w-full">
        <DialogHeader
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
          className="w-full bg-primary p-2 m-0 text-white rounded-t-lg flex justify-end"
        >
          <div className="flex">
            <DialogTitle className="text-sm m-0 font-medium sm:text-base flex w-full items-center">
              {t("general.chooseYourPreferredLanguage")}
            </DialogTitle>
            <DialogClose></DialogClose>
          </div>
        </DialogHeader>
        <div className="flex flex-col justify-start m-0 w-full">
          <div
            onClick={async () => {
              setPreferredLanguage("en");
              setChangePreferredLanguage(false);
              if (user !== null && i18n.language !== "en") {
                await languageQuery.updateLanguagePreference(
                  "en",
                  user.member_id
                );
                // queryClient.invalidateQueries({ queryKey: ["home-members"] });
                // queryClient.invalidateQueries({ queryKey: ["profileContent"] });
              }
              queryClient.invalidateQueries();
              setProfileData(null);
            }}
            className={cn("hover:cursor-pointer flex space-x-2 items-center border-b p-4", i18n.language == "ar" ? "space-x-reverse" : "bg-[#F6F6F6]")}>
            <img
              className="h-8 rounded-full"
              src="https://muffin0.blob.core.windows.net/flags/us.png"
              alt="english-flag"
            />
            <p
              className="text-center font-semibold cursor-pointer"
            >
              English
            </p>
          </div>
          <div
            onClick={async () => {
              setPreferredLanguage("ar");
              setChangePreferredLanguage(false);
              if (user !== null && i18n.language !== "ar") {
                await languageQuery.updateLanguagePreference(
                  "ar",
                  user.member_id
                );
              }
              queryClient.invalidateQueries();
              setProfileData(null);
            }}
            className={cn("flex hover:cursor-pointer space-x-2 items-center border-b p-4", i18n.language == "ar" && "space-x-reverse bg-[#F6F6F6]")}>
            <img
              className="h-8 rounded-full"
              src="https://muffin0.blob.core.windows.net/flags/ae.png"
              alt="arabic-flag"
            />
            <p
              className="text-center font-semibold cursor-pointer"
            >
              العربية
            </p>
          </div>
        </div>
        <div className="flex mt-3 mb-2 justify-end w-full px-3">
          <Button onClick={() => {
            setChangePreferredLanguage(false);
          }
          } variant={"outline"} className="rounded-full  text-[#727272]">
            {t("onboarding.back")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferredLanguageDialog;
