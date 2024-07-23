import academyHeader from "@/assets/academy-header.png";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useEffect } from "react";
const MuffinAcademyHeader = ({ lang }: { lang: string }) => {
  const [t, i18n] = useTranslation();
  const [location] = useLocation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n])

  return (
    <>
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
      <div dir={i18n.language == "ar" ? "rtl" : "ltr"} className="w-full h-full relative">
        <div className="w-full h-full z-30 absolute flex justify-center items-center text-white flex-col">
          <h1 className="text-3xl sm:text-6xl font-semibold">{t("academy.headerTitle")}</h1>
          {/* <p className="mt-4">
            <span className="font-light">{t("academy.home")}</span> / {t("academy.headerTitle")}
          </p> */}
          {location.includes("/post") && (
            <Link
              href="/academy"
              className={cn("hidden absolute z-100 top-4 sm:flex text-sm items-center sm:px-2 py-2 ",
                i18n.language == "ar" ? "right-4 sm:right-12" : "left-4 sm:left-12"
              )
              }
            >
              <Button variant={"ghost"} className="hover:bg-transparent hover:text-white/80">
                {i18n.language == "ar" ? <ArrowRight className="sm:ml-1 h-4" /> : <ArrowLeft className="sm:mr-1 h-4" />} <span>{t("academy.back")}</span>
              </Button>
            </Link>
          )}
        </div>
        <img className="h-24 z-20 object-cover sm:h-full" src={academyHeader} alt="academy-header" />
      </div>
    </>
  );
}

export default MuffinAcademyHeader;
