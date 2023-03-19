import Header from "./header";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="5PXIoBe2lYSYORu-zYYU2u4qP7Gwl3LwgxWS3Gjjc3I"
      />
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
