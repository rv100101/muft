import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import * as Sentry from "@sentry/react";

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
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
