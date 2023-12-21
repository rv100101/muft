import AuthenticatedLayout from "./layout";
// import { useState } from "react";
import DisplayContent from "@/components/settings/display/displayContent";
import PushNotifcationContent from "@/components/settings/notification/pushNotifcationContent";
import DeactivateAccountContent from "@/components/settings/account/deactivateAccountContent";
import MyAccountContent from "@/components/settings/account/myAccountContent";
import MobileTopbar from "@/components/settings/mobileTopbar";

const SettingsPage = () => {
  // const [activeTabs, setActiveTabs] = useState([
  //   false,
  //   false,
  //   true,
  //   false,
  //   false,
  //   false,
  // ]);
  // const toggleTab = (index: number) => {
  //   const newActiveTabs = activeTabs.map((_, i) => i === index);
  //   setActiveTabs(newActiveTabs);
  // };
  return (
    <AuthenticatedLayout>
      <div className="w-full flex flex-col h-full lg:items-center justify-start border">
        <MobileTopbar />
        <div className="lg:flex hidden flex flex-row lg:w-3/4 w-full border justify-between lg:p-5 py-2 items-center lg:border-b">
          <p className="select-none font-semibold w-full ">SETTINGS</p>
        </div>
        <div className="flex overflow-y-scroll items-start lg:w-3/4 w-full h-full border">
          {/* <div className="flex flex-col border-x h-full px-3 py-5 justify-start">
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${activeTabs[1] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
                }`}
              onClick={() => toggleTab(1)}
            >
              My Subscription
            </p>
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${activeTabs[2] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
                }`}
              onClick={() => toggleTab(2)}
            >
              My Account
            </p>
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${activeTabs[3] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
                }`}
              onClick={() => toggleTab(3)}
            >
              Display Setting
            </p>
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${activeTabs[4] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
                }`}
              onClick={() => toggleTab(4)}
            >
              Push Notification
            </p>
            <p
              className={`select-none w-full text-[#727272] px-3 py-2 text-sm  hover:cursor-pointer ${activeTabs[5] ? "bg-[#FFDEEB] text-[#FF599B]  rounded-md" : ""
                }`}
              onClick={() => toggleTab(5)}
            >
              Deactivate your Account
            </p>
          </div> */}
          <div className="w-full lg:mt-0 mt-5 h-full">
            {/* basic info */}
            {/* {activeTabs[1] && <SubscriptionContent />} */}

            {/* Work and Education */}
            {/* {activeTabs[2] && <MyAccountContent />} */}

            {/* Details */}
            {/* {activeTabs[3] && <DisplayContent />} */}

            {/* Location */}
            {/* {activeTabs[4] && <PushNotifcationContent />} */}

            {/* Addition Information */}
            {/* {activeTabs[5] && <DeactivateAccountContent />} */}

            {/* <SubscriptionContent /> */}
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
