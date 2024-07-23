import { useUserStore } from "@/zustand/auth/user";
import logo from "@/assets/logo.svg";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export interface Post {
  authorized: boolean;
  ip_address: string;
  post_id: string;
  post_uuid: string;
  post_title: string;
  post_text: string;
  post_language: string;
}

const SidePanel = () => {
  const { t, i18n } = useTranslation();
  const isAuthenticated = useUserStore(state => state.user)
  return (
    <div className="hidden sm:flex sticky ml-8 mt-12 top-8 h-full w-64 bg-white shadow-md p-4 flex-col justify-between">
      <div>
        <Link href={"/"}>
          <img
            src={logo}
            alt={"logo"}
            className="mb-6"
          />
        </Link>
      </div>
      <div className="space-y-4 flex flex-col w-full justify-start items-center">
        <a
          href="https://support.muffin.ae" target="_blank" className={"w-full"}>
          <Button variant="ghost" className={cn("w-full text-right flex", i18n.language == "ar" ? "justify-end" : "justify-start")}>
            {t("menu.helpCenter")}
          </Button>
        </a>
        <a target="_blank" href="https://support.muffin.ae/en-US/kb/article/12/privacy-policy" className="w-full">
          <Button variant="ghost" className={cn("w-full text-right flex", i18n.language == "ar" ? "justify-end" : "justify-start")}>
            {t("menu.privacyPolicy")}
          </Button>
        </a>
        <a target="_blank" href="https://support.muffin.ae/en-US/kb/article/13/terms-and-conditions" className="w-full">
          <Button variant="ghost" className={cn("w-full text-right flex", i18n.language == "ar" ? "justify-end" : "justify-start")}>
            {t("menu.termsAndConditions")}
          </Button>
        </a>
        {
          !isAuthenticated &&
          <Link href="/auth/signin" className={"w-full"}>
            <Button className="w-full text-left hover:bg-[#ff599b]/90">
              {t("landingPage.signIn")}
            </Button>
          </Link>
        }
      </div>
    </div>
  );
};

export default SidePanel;
