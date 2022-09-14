import '../styles/globals.css';
import type {AppProps} from 'next/app';

/**
 * Next.js App function
 * @param {AppProps} appProps props
 * @return {JSX.Element} App
 */
function MyApp({Component, pageProps}: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
