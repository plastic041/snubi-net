import "./global.css";
import Header from "./header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className="overflow-y-scroll bg-white dark:bg-gray-800">
        <div className="relative flex w-full flex-col">
          {/* <Header /> */}
          <main className="container mx-auto flex-1 xl:px-40">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
