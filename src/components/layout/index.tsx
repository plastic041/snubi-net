import Header from "./header";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="container mx-auto flex-1 xl:px-40">{children}</main>
      </div>
    </>
  );
};

export default Layout;
