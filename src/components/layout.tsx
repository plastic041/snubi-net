import React from "react";
import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
  children: React.ReactElement;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container mx-auto flex h-screen w-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
