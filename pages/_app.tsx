import "../styles/globals.css";
import type { AppProps } from "next/app";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ConfigProvider from "../components/ConfigProvider";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);

  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
