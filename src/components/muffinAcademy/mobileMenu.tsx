import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useUserStore } from "@/zustand/auth/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AcademyChangeLanguage from "./changeLanguage";

const AcademyMobileMenu = ({ lang }: { lang: string }) => {
  const [t, i18n] = useTranslation();
  const isAuthenticated = useUserStore(state => state.user);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div>
      <Helmet>
        <title>Muffin Academy</title>
        {i18n.language === 'en' ? (
          <>
            <meta name="description" content="Discover expert dating advice and tips at Muffin Academy. Navigate relationships and find love with our insightful articles." />
          </>
        ) : (
          <>
            <meta name="description" content="اكتشف نصائح وخبرات المواعدة في أكاديمية مافن. اقرأ مقالات تساعدك على فهم العلاقات والعثور على الحب." />
          </>
        )}
      </Helmet>
      <DropdownMenu dir={lang == "ar" ? "rtl" : "ltr"}>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="m-0 p-0"><Menu /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>{t("menu.navigation")}</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
          <DropdownMenuItem asChild>
            <Link href="/">{t("menu.home")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://support.muffin.ae" target="_blank">{t("menu.helpCenter")}</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://support.muffin.ae/en-US/kb/article/12/privacy-policy" target="_blank">{t("menu.privacyPolicy")}</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://support.muffin.ae/en-US/kb/article/13/terms-and-conditions" target="_blank">{t("menu.termsAndConditions")}</a>
          </DropdownMenuItem>
          {!isAuthenticated && (
            <DropdownMenuItem asChild>
              <Link href="/auth/signin">{t("landingPage.signIn")}</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <AcademyChangeLanguage lang={lang} buttonSize="w-full" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div >
  );
}

export default AcademyMobileMenu;
