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
    console.log('listening to pub changes');
    console.log(
      event?.current?.optedIn
    );
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
    <div className="flex flex-col border-b w-full justify-center text-[#727272] space-y-5 px-5 py-10">
      <p className="font-semibold text-lg">{t("settings.notifications")}</p>
      {/* <p className="font-medium text-md">Push Notifications</p> */}
      <div className="flex flex-row w-full  justify-between items-center">
        <p className="font-normal text-md">
          {t("settings.enablePushNotifications")}
        </p>
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
