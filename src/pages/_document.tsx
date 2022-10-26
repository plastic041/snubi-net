import { Html, Head, Main, NextScript } from "next/document";
import type { ReactNode } from "react";

/**
 * Next.js Document Component
 * @return {ReactNode} Document
 */
export default function Document(): ReactNode {
  return (
    <Html lang="ko">
      <body className="overflow-y-scroll bg-white dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
