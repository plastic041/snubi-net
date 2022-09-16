import "../styles/global.css";
import { AppProps } from "next/app";
import type { ReactElement } from "react";

/**
 * Next.js App function
 * @param {AppProps} appProps props
 * @return {ReactNode} App
 */
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
