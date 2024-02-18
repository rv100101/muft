import { useTranslation } from "react-i18next";
import FooterLinks from "./footerLinks";
import { cn } from "@/lib/utils";

const SmallFooter = () => {
  const [, i18n] = useTranslation();
  return (
    <div
      className={cn(
        "flex w-full px-8 lg:px-36 p-2 h-max items-center justify-between"
      )}
    >
      <p dir="ltr" className="text-white text-[9px] sm:text-xs md:text-center">
        &copy; 2024 Softnames. All Rights Reserved.
      </p>
      <div
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
        className="flex justify-between text-white"
      >
        <FooterLinks />
      </div>
    </div>
  );
};

export default SmallFooter;
