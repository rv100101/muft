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
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MsalProvider } from "@azure/msal-react";
import msalInstance from "./pages/auth/socialSignup/authConfig";

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
  dsn: "502902386423-p18lo2n307k1489042hrk3fojccdpk6v.apps.googleusercontent.com",
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1,
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <GoogleOAuthProvider clientId="502902386423-orobhrhr1qajm44pm6b9rjc4dqihp5tt.apps.googleusercontent.com">
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <Toaster />
              <App />
            </HelmetProvider>
          </QueryClientProvider>
        </I18nextProvider>
      </GoogleOAuthProvider>
    </MsalProvider>
  </React.StrictMode>
);
