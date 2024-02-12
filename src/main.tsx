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
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],

  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Toaster />
        <App />
      </HelmetProvider>
    </QueryClientProvider>
  </I18nextProvider>
  // </React.StrictMode>
);
