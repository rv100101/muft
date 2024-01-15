import { cn, scrollToTop } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

const FooterLinks = () => {
  const [t, i18n] = useTranslation();
  return (
    <ul
      className={cn(
        "flex justify-center list-none space-x-4 text-xs md:text-md",
        i18n.language == "ar" && "space-x-reverse"
      )}
    >
      <li>
        <Link onClick={scrollToTop} href="/privacy">
          <a className="text-white underline font-light hover:text-slate-400">
            {t("landingPage.privacyPolicy")}
          </a>
        </Link>
      </li>
      <li>
        <Link onClick={scrollToTop} href="/terms">
          <a className="text-white underline font-light hover:text-slate-400">
            {t("landingPage.termsAndConditions")}
          </a>
        </Link>
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
