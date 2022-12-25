import Head from "next/head";
import React, { PropsWithChildren } from "react";
import NavBar from "../Navbar/NavBar";

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

      <div className="flex flex-col md:mx-5 md:border-x md:border-b md:border-black">
        <NavBar />
        <main className="w-full h-full">{children}</main>
      </div>
    </>
  );
};

export default Layout;
