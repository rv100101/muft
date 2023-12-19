import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "./layout";
import { useState } from "react";
import DisplayContent from "@/components/settings/display/displayContent";
import PushNotifcationContent from "@/components/settings/notification/pushNotifcationContent";
import DeactivateAccountContent from "@/components/settings/account/deactivateAccountContent";
import MyAccountContent from "@/components/settings/account/myAccountContent";
import SubscriptionContent from "@/components/settings/subscription/subscriptionContent";

const SettingsPage = () => {
  const [activeTabs, setActiveTabs] = useState([
    false,
    false,
    true,
    false,
    false,
    false,
  ]);
  const toggleTab = (index: number) => {
    const newActiveTabs = activeTabs.map((_, i) => i === index);
    setActiveTabs(newActiveTabs);
  };
  return (
    <AuthenticatedLayout>
      <div className="w-full flex flex-col items-center justify-start">
        <div className="flex flex-row w-3/4 border justify-between lg:p-5 py-2 lg:border-b">
          <p className="select-none font-semibold w-full h-max">SETTINGS</p>
        </div>
        <div className="flex w-3/4 h-full border-r">
          <div className="flex flex-col border-x h-full px-3 py-5 justify-start">
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${
                activeTabs[1] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
              }`}
              onClick={() => toggleTab(1)}
            >
              My Subscription
            </p>
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${
                activeTabs[2] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
              }`}
              onClick={() => toggleTab(2)}
            >
              My Account
            </p>
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${
                activeTabs[3] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
              }`}
              onClick={() => toggleTab(3)}
            >
              Display Setting
            </p>
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${
                activeTabs[4] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
              }`}
              onClick={() => toggleTab(4)}
            >
              Push Notification
            </p>
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${
                activeTabs[5] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
              }`}
              onClick={() => toggleTab(5)}
            >
              Deactivate your Account
            </p>
          </div>
          <div className="flex h-max flex-col lg:w-full lg:mt-0 mt-5">
            {/* basic info */}
            {activeTabs[1] && <SubscriptionContent />}

            {/* Work and Education */}
            {activeTabs[2] && <MyAccountContent />}

            {/* Details */}
            {activeTabs[3] && <DisplayContent />}

            {/* Location */}
            {activeTabs[4] && <PushNotifcationContent />}

            {/* Addition Information */}
            {activeTabs[5] && <DeactivateAccountContent />}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SettingsPage;
