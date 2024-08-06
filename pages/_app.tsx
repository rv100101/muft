import { AppProps } from "next/app";
import React from "react";
import "../i18n";
import "../styles/globals.css";
import "@/index.css";
import "@/styles.css";
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
