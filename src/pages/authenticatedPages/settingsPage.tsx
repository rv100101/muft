import AuthenticatedLayout from "./layout";
// import { useState } from "react";
import DisplayContent from "@/components/settings/display/displayContent";
import PushNotifcationContent from "@/components/settings/notification/pushNotifcationContent";
import DeactivateAccountContent from "@/components/settings/account/deactivateAccountContent";
import MyAccountContent from "@/components/settings/account/myAccountContent";
import MobileTopbar from "@/components/settings/mobileTopbar";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const [t] = useTranslation();
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Settings</title>
        <link
          rel="canonical"
          href={`https://${window.location.hostname}/settings`}
        />
      </Helmet>
      <div className="w-full flex flex-col h-full lg:items-center justify-start border">
        <MobileTopbar />
        <div className="lg:flex hidden flex-row lg:w-3/4 w-full border justify-between lg:p-5 py-2 items-center lg:border-b">
          <p className="select-none font-semibold w-full ">
            {t("settings.settings")}
          </p>
        </div>
        <div className="flex overflow-y-auto items-start lg:w-3/4 w-full h-full border border-t-0 p-8">
          <div className="w-full lg:mt-0 space-y-4 h-full">
            <MyAccountContent />
            <DisplayContent />
            <PushNotifcationContent />
            <DeactivateAccountContent />
            <div className="h-8" />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SettingsPage;
