import "../styles/global.css";
import { MotionConfig } from "framer-motion";
import { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";
import favicon from "~/public/favicon.ico";

/**
 * Next.js App function
 * @param {AppProps} appProps prop
 * @return {ReactNode} App
 */
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <MotionConfig reducedMotion="user">
      <Head>
        <link rel="icon" type="image/x-icon" href={favicon.src} />
      </Head>
      <Component {...pageProps} />
    </MotionConfig>
  );
}

export default MyApp;
