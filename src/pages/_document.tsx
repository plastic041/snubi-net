import { Html, Head, Main, NextScript } from "next/document";
import type { ReactNode } from "react";

/**
 * Next.js Document Component
 * @return {ReactNode} Document
 */
export default function Document(): ReactNode {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-jp-dynamic-subset.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="overflow-y-scroll bg-white dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
