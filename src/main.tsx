import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import * as Sentry from "@sentry/react";
import { HelmetProvider } from "react-helmet-async";

import global_en from "@/locales/en/global.json";
import global_ar from "@/locales/ar/global.json";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";

// const userAgent = navigator.userAgent;

// Getting screen dimensions
// const screenWidth = window.screen.width;
// const screenHeight = window.screen.height;

// Getting viewport dimensions
// const viewportWidth = document.documentElement.clientWidth;
// const viewportHeight = document.documentElement.clientHeight;

// Getting device type based on width (simple example)
// const deviceType = screenWidth < 768 ? 'Mobile' : screenWidth < 1024 ? 'Tablet' : 'Desktop';

// Getting network information (modern browsers)
// const connectionType = navigator?.connection.effectiveType;
// console.log(connectionType);


// Getting browser language
// const browserLanguage = navigator.language;

// Getting number of processor cores
// const processorCores = navigator.hardwareConcurrency;

// Create an object with the gathered data
// const deviceInfo = {
//   userAgent: userAgent,
//   screen: screenWidth + 'x' + screenHeight,
//   viewport: viewportWidth + 'x' + viewportHeight,
//   deviceType: deviceType,
//   connectionType: connectionType,
//   browserLanguage: browserLanguage,
//   processorCores: processorCores
// };

// Convert the object to JSON and log it
// console.log(JSON.stringify(deviceInfo, null, 2));

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: global_en,
      },
      ar: {
        translation: global_ar,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });


Sentry.init({
  dsn: "https://fd6a643efc57d33d656c0a08f965cbbf@o1300880.ingest.sentry.io/4506415538765824",
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Toaster />
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </React.StrictMode>
);
