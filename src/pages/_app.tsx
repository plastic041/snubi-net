import { AppProps } from "next/app";
import type { ReactElement } from "react";
import "../styles/global.css";

/**
 * Next.js App function
 * @param {AppProps} appProps props
 * @return {ReactNode} App
 */
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
