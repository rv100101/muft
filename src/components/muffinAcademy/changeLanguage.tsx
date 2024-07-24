import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { usePreferredLanguageStore } from "@/zustand/auth/preferred_language";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

const AcademyChangeLanguage = ({ lang, buttonSize }: { lang: string, buttonSize: string }) => {
  const [t] = useTranslation();
  const { preferred } = usePreferredLanguageStore();
  const [changePreferredLanguage, setChangePreferredLanguage] = useState(false);
  const [location, navigate] = useLocation();

  const handleChangeLanguage = (lang: string) => {
    if (location.startsWith('/academy')) {
      const stripped = location.split('/');
      if (stripped.length >= 3) {
        stripped[2] = lang;
      }
      const url = stripped.join('/');
      navigate(url);
      setChangePreferredLanguage(false);
    }
  };

  return (
    <Dialog
      open={(preferred == null && !location.startsWith('/places/')) || changePreferredLanguage}
    >
      <div className="flex justify-between items-center h-max">
        <DialogTrigger className={cn("flex", buttonSize)} >
          <Button
            type="button"
            variant="default"
            className={cn(
              "hover:text-white/80 rounded-full h-10 text-sm border-[#DDDDDD] bg-white py-2 w-full dark:bg-[#1b1d1e] dark:hover:text-white bg-primary text-white hover:bg-[#ff599b]/90",
              "fixed bottom-4 right-4 sm:relative sm:bottom-auto sm:right-auto",
              buttonSize
            )}
            onClick={() => setChangePreferredLanguage(true)}
          >
            <span className={cn("w-4", lang === "en" ? 'mr-1' : "mx-1")}>
              {lang !== 'en' ? (
                <img
                  className="object-fit rounded-full"
                  src="https://muffin0.blob.core.windows.net/flags/ae.png"
                  alt="ae-flag"
                />
              ) : (
                <img
                  className="object-fit rounded-full"
                  src="https://muffin0.blob.core.windows.net/flags/us.png"
                  alt="english-flag"
                />
              )}
            </span>
            <span className="hidden sm:inline">{lang === 'en' ? 'English' : "العربية"}</span>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="p-0 m-0 gap-0 w-72 sm:w-full"
      >
        <DialogHeader
          dir={lang === "ar" ? "rtl" : "ltr"}
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
            onClick={() => handleChangeLanguage('en')}
            className={cn("hover:cursor-pointer flex space-x-2 items-center border-b p-4", lang === "ar" ? "space-x-reverse" : "bg-[#F6F6F6]")}
          >
            <img
              className="h-8 rounded-full"
              src="https://muffin0.blob.core.windows.net/flags/us.png"
              alt="english-flag"
            />
            <p className="text-center font-semibold cursor-pointer">English</p>
          </div>
          <div
            onClick={() => handleChangeLanguage('ar')}
            className={cn("flex hover:cursor-pointer space-x-2 items-center border-b p-4", lang === "ar" && "space-x-reverse bg-[#F6F6F6]")}
          >
            <img
              className="h-8 rounded-full"
              src="https://muffin0.blob.core.windows.net/flags/ae.png"
              alt="arabic-flag"
            />
            <p className="text-center font-semibold cursor-pointer">العربية</p>
          </div>
        </div>
        <div className="flex mt-3 mb-2 justify-end w-full px-3">
          <Button
            onClick={() => setChangePreferredLanguage(false)}
            variant="outline"
            className="rounded-full text-[#727272]"
          >
            {t("onboarding.back")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcademyChangeLanguage;
