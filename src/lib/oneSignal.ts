import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: "c5ca18a9-5d6b-479c-8f1b-71ddc4ab5694",
    notifyButton: {
      enable: true,
    },
    serviceWorkerPath: "/public/OneSignalSDKWorker.js",
  });
  OneSignal.Slidedown.promptPush();
}
