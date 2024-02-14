import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: getAppId(),
    safari_web_id: getSafariId(),
    notifyButton: {
      enable: true,
    },
  });
  OneSignal.Slidedown.promptPush();
}

const getAppId: () => string = () => {
  const base_url = window.location.origin;
  if (base_url == "https://www.muffin.ph") {
    return "c5ca18a9-5d6b-479c-8f1b-71ddc4ab5694";
  } else if (base_url == "https://www.muffin.ae") {
    return "0014a853-58bd-41a5-894b-67e8d95863f5";
  } else {
    return "";
  }
};

const getSafariId: () => string = () => {
  const base_url = window.location.origin;
  if (base_url == "https://www.muffin.ph") {
    return "web.onesignal.auto.27d2eba6-7621-43e8-b8d4-d2a9de3b8fea";
  } else if (base_url == "https://www.muffin.ae") {
    return "web.onesignal.auto.0a199198-d5df-41c5-963c-72a0258657aa";
  } else {
    return "";
  }
};
