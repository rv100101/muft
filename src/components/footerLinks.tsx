import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const FooterLinks = () => {
  const [t, i18n] = useTranslation();
  return (
    <ul
      className={cn(
        "flex justify-center list-none space-x-4 text-xs sm:text-xs md:text-md",
        i18n.language == "ar" && "space-x-reverse"
      )}
    >
      <li>
        <a
          target="_blank" href="https://support.muffin.ae/en-US/kb/article/12/privacy-policy"
          className="text-white underline font-light hover:text-slate-400">
          {t("landingPage.privacyPolicy")}
        </a>
      </li>
      <li>
        <a className="text-white underline font-light hover:text-slate-400" target="_blank" href="https://support.muffin.ae/en-US/kb/article/13/terms-and-conditions">
          {t("landingPage.termsAndConditions")}
        </a>
      </li>
      {/* <li>
        <Link onClick={scrollToTop} href="/release-notes">
          <a className="text-white underline font-light hover:text-slate-400">
            Release Notes
          </a>
        </Link>
      </li> */}
    </ul>
  );
};

export default FooterLinks;
