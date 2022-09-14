import type { AppProps } from "next/app";
import "../styles/global.css";

/**
 * Next.js App function
 * @param {AppProps} appProps props
 * @return {JSX.Element} App
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
