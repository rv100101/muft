import { useTranslation } from "react-i18next";
import TopBar2 from "../topBar2";

const MobileTopbar = () => {
  const [t] = useTranslation();
  return (
    <div className="pl-1 lg:hidden">
      <TopBar2>
        <div className="flex flex-row w-full justify-between lg:p-5 lg:border-l lg:border-r">
          <p className="uppercase font-semibold">{t("menu.settings")}</p>
        </div>
      </TopBar2>
    </div>
  );
};

export default MobileTopbar;
