import "./global.css";
import localFont from "@next/font/local";

const pretendardVariable = localFont({ src: "./PretendardVariable.woff2" });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body
        className={`overflow-y-scroll bg-white dark:bg-gray-800 ${pretendardVariable.className}`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
