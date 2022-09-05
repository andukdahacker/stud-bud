import Head from "next/head";
import React, { PropsWithChildren } from "react";
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
      <div className="flex justify-center w-full h-full bg-white font-lexend">
        <div className="w-[calc(100%_-_3rem)] h-full min-h-screen bg-white border border-black flex flex-col">
          <NavBar />
          <main className="w-full h-full ">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
