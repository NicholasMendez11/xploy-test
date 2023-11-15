import type { Metadata } from "next";
import XPLOYLOGO from "@/assets/logos/xploy-logo.svg";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { CustomspeedDial, Header, SideBar } from "@/shared/components";
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to your dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" px-5 w-full h-full">
      <Header />
      <section className=" h-screen ">{children}</section>
    </div>
  );
}
