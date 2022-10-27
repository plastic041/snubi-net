import "./global.css";
import Header from "./header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>snubi net</title>
        <meta name="title" content="snubi" />
        <meta name="description" content="snubi site" />
        <meta name="copyright" content="snubi" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="snubi.net" />
        <meta property="og:title" content="snubi site" />
        <meta property="og:description" content="snubi.net" />
        <meta property="og:image" content="snubi.net image" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="snubi.net" />
        <meta property="twitter:title" content="snubi" />
        <meta property="twitter:description" content="snubi site" />
        <meta property="twitter:image" content="snubi.net image" />
      </head>
      <body className="overflow-y-scroll bg-white dark:bg-gray-800">
        <div className="relative flex w-full flex-col">
          <Header />
          <main className="container mx-auto flex-1 xl:px-40">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
