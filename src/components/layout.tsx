import Header from "./header";
import Head from "next/head";
import React from "react";

type LayoutProps = {
  children: React.ReactElement;
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
        <main className="flex-1 container mx-auto xl:px-40">{children}</main>
      </div>
    </>
  );
};

export default Layout;
