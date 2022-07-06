import Head from "next/head";
import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface LayoutProps {
  username?: string;
}
const Layout = ({ children, username }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{username ? `${username} | ` : null}StudBud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <main className="w-screen h-full">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
