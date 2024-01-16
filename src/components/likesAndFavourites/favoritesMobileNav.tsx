import TopBar2 from "../topBar2";
import { useTranslation } from "react-i18next";

const FavoritesMobileNav = () => {
  const [t] = useTranslation();
  return (
    <div className="lg:hidden">
      <TopBar2>
        <div className="w-full h-full flex lg:items-center justify-between">
          <h1 className="font-semibold">
            {t("favorites.favorites")}
          </h1>
        </div>
      </TopBar2>
    </div>
  );
};

export default FavoritesMobileNav;
