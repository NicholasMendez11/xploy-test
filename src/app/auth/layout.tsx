import type { Metadata } from "next";
import XPLOYLOGO from "@/assets/logos/xploy-logo.svg";
import Image from "next/image";
import Footer from "@/shared/components/layout/Footer";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen p-5 overscroll-x-none bg-white">
      <Image src={XPLOYLOGO} alt="XPLOY LOGO" className="w-32 h-32 mb-12" />
      <div className="w-full flex h-full items-start justify-center">
        <section>{children}</section>
      </div>
      <footer className="h-full flex items-center justify-center mt-10">
        <Footer />
      </footer>
    </div>
  );
}
