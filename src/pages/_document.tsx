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
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard-dynamic-subset.css"
        />
      </Head>
      <body className="overflow-y-scroll bg-white dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
