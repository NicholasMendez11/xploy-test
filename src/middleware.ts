import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export default function middleware(req:NextRequest) {
  let loggedInToken = req.cookies.get("credentials");
  let pathname = req.nextUrl.pathname;
  const baseUrl = process.env.BASE_URL;

  if (!loggedInToken && pathname === "/home") {
    return NextResponse.redirect(`${baseUrl}/auth`);
  }

  if (loggedInToken && pathname === "/auth") {
    return NextResponse.redirect(`${baseUrl}/home`);
  }

  if(pathname === "/" || pathname === ""){
    return NextResponse.redirect(`${baseUrl}/auth`);
  }
}