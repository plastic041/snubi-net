import "../styles/global.css";
import { MotionConfig } from "framer-motion";
import { AppProps } from "next/app";
import type { ReactElement } from "react";

/**
 * Next.js App function
 * @param {AppProps} appProps prop
 * @return {ReactNode} App
 */
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <MotionConfig reducedMotion="user">
      <Component {...pageProps} />
    </MotionConfig>
  );
}

export default MyApp;
