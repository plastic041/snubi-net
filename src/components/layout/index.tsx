import Header from "./header";
import Head from "next/head";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};
const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="flex w-full flex-col gap-8">
        <Header />
        <main className="container mx-auto flex-1 xl:px-40">{children}</main>
      </div>
    </>
  );
};

export default Layout;
