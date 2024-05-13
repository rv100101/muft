import PreferredLanguageDialog from "@/components/preferredLanguageDialog";
import { useTranslation } from "react-i18next";
// import ChangeEmail from "./changeEmail";
import SettingsChangePassword from "./changePassword";

const MyAccountContent = () => {
  const [t] = useTranslation();

  return (
    <div className="flex overflow-clip flex-col border border-primary  w-full rounded-[16px] border-b justify-center text-[#727272] space-y-2">
      <div className="flex w-full bg-primary ">
        <p className="text-lg py-[12px] pl-4 text-white">{t("settings.myAccount")}</p>
      </div>
      <div className="px-4 pb-8">
        <PreferredLanguageDialog showTrigger={true} triggerVariant={"outline"} />
        {/* <ChangeEmail /> */}
        <SettingsChangePassword />
      </div>
    </div>
  );
};

export default MyAccountContent;
