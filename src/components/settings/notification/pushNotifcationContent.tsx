import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import OneSignal from "react-onesignal";

const PushNotifcationContent = () => {
  const [t, i18n] = useTranslation();
  const [notificationEnabled, setNotificationEnabled] = useState(
    OneSignal.User.PushSubscription.optedIn
  );

  function pushSubscriptionChangeListener(event: any) {
    setNotificationEnabled(
      event?.current?.optedIn
    )
  }
  useEffect(() => {
    setNotificationEnabled(
      OneSignal.User.PushSubscription.optedIn
    )
    OneSignal.User.PushSubscription.addEventListener("change", pushSubscriptionChangeListener);
  }, []);

  return (
    <div className="flex overflow-clip flex-col border border-primary w-full rounded-[16px] border-b justify-center items-center text-[#727272] space-y-2">
      <div className="flex w-full p-4 bg-primary">
        <p className="text-white text-lg">{t("settings.notifications")}</p>
      </div>
      {/* <p className="font-medium text-md">Push Notifications</p> */}
      <div className="flex flex-row w-full  p-4 justify-between items-center">
        <div className="flex flex-col justify-start">
          <p className="font-medium self-start">Push Notifications</p>
          <p className="font-normal text-md">
            {t("settings.enablePushNotifications")}
          </p>
        </div>
        <Switch
          dir="ltr"
          className={cn(i18n.language == "ar" && "rotate-180")}
          id="airplane-mode"
          checked={notificationEnabled}
          onCheckedChange={(checked) => {
            checked
              ? OneSignal.User.PushSubscription.optIn()
              : OneSignal.User.PushSubscription.optOut();
          }}
        />
      </div>
    </div>
  );
};

export default PushNotifcationContent;
