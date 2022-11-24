import "../styles/global.css";
import "../styles/shiki.css";
import { AppProps } from "next/app";
import type { ReactElement } from "react";

/**
 * Next.js App function
 * @param {AppProps} appProps prop
 * @return {ReactNode} App
 */
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
