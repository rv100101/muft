import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: "342c9d50-db50-4134-8291-3a90c311cd30",
    notifyButton: {
      enable: true,
    },
    allowLocalhostAsSecureOrigin: true,
    serviceWorkerPath: "/public/OneSignalSDKWorker.js",
  });
  OneSignal.Slidedown.promptPush();
}
