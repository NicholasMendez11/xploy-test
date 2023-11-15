"use client";
import { Avatar } from "@material-tailwind/react";
import React from "react";
import NICHOLAS from "@/assets/logos/nicholas.jpeg";
import Link from "next/link";
function Footer() {
  return (
    <div className="flex items-center gap-2">
      <Avatar src={NICHOLAS.src} alt="Nicholas Avatar" />
      <Link href={"https://nicmendez.site/"} target="_blank">
        <p className="text-center font-semibold text-xl hover:text-[#338FC7] cursor-pointer transition-all duration-200">
          Nicholas Mendez
        </p>
      </Link>
    </div>
  );
}

export default Footer;
