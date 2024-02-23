import LogoWhite from "@/assets/logo-white.svg";
import { Mail } from "lucide-react";

import FooterLinks from "./footerLinks";
import { useLocation } from "wouter";
import SmallFooter from "./smallFooter";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const Footer = () => {
  const [location] = useLocation();
  const [t, i18n] = useTranslation();

  if (location.includes("/auth/")) {
    return (
      <div className="w-full hidden lg:flex h-max">
        <SmallFooter />
      </div>
    );
  }

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className="mx-8 h-max lg:mx-36 py-8 md:py-32 space-y-4 "
    >
      <nav className="flex flex-row md:space-y-0 md:flex-row justify-between">
        <div className="flex justify-center md:justify-start">
          <img
            className="w-28 md:w-max"
            src={LogoWhite}
            alt="white muffin logo"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center space-x-2 md:space-x-4 hover",
            i18n.language == "ar" && "space-x-reverse"
          )}
        >
          <a
            className={cn(
              "flex space-x-2 hover:bg-transparent hover:text-slate-400 p-0 font-light text-white",
              i18n.language == "ar" && "space-x-reverse"
            )}
            href="https://support.softnames.com/"
            target="_blank"
          >
            <p>{t("landingPage.contactUs")}</p>
            <Mail />
          </a>
        </div>
      </nav>
      <hr />
      <div className="flex flex-col items-center md:flex-row justify-between text-white">
        <p dir="ltr" className="text-xs my-2">
          &copy; 2024 Softnames. All Rights Reserved.
        </p>
        <FooterLinks />
        {/* <p dir="ltr" className="text-white text-xs text-center md:hidden block">
          &copy; 2024 Softnames. All Rights Reserved.
        </p> */}
      </div>
    </div>
  );
};

export default Footer;
