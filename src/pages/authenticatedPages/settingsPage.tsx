import AuthenticatedLayout from "./layout";
// import { useState } from "react";
import DisplayContent from "@/components/settings/display/displayContent";
import PushNotifcationContent from "@/components/settings/notification/pushNotifcationContent";
import DeactivateAccountContent from "@/components/settings/account/deactivateAccountContent";
import MyAccountContent from "@/components/settings/account/myAccountContent";
import MobileTopbar from "@/components/settings/mobileTopbar";

const SettingsPage = () => {
  return (
    <AuthenticatedLayout>
      <div className="w-full flex flex-col h-full lg:items-center justify-start border">
        <MobileTopbar />
        <div className="lg:flex hidden flex flex-row lg:w-3/4 w-full border justify-between lg:p-5 py-2 items-center lg:border-b">
          <p className="select-none font-semibold w-full ">SETTINGS</p>
        </div>
        <div className="flex overflow-y-scroll items-start lg:w-3/4 w-full h-full border">
          <div className="w-full lg:mt-0 mt-5 h-full">
            <MyAccountContent />
            <DisplayContent />
            <PushNotifcationContent />
            <DeactivateAccountContent />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SettingsPage;
