import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: "c5ca18a9-5d6b-479c-8f1b-71ddc4ab5694",
    safari_web_id: "web.onesignal.auto.27d2eba6-7621-43e8-b8d4-d2a9de3b8fea",
    notifyButton: {
      enable: true,
    },
  });
  OneSignal.Slidedown.promptPush();
}
