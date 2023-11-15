import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export default function middleware(req:NextRequest) {
  let loggedInToken = req.cookies.get("credentials");
  let pathname = req.nextUrl.pathname;
  const baseUrl = "https://xploy-test-kquo.vercel.app" ; //!IN PRODUCTION CHANGE TO https://xploy.vercel.app INSTEAD OF localhost:3000

  if (!loggedInToken && pathname.includes("/home")) {
    return NextResponse.redirect(`${baseUrl}/auth`);
  }

  if (loggedInToken && pathname === "/auth") {
    return NextResponse.redirect(`${baseUrl}/home`);
  }

  if(pathname === "/" || pathname === ""){
    return NextResponse.redirect(`${baseUrl}/auth`);
  }
}