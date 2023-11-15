//!ESTO TIENE QUE PASAR LA AUNQUE NO SE USE EL REMEMBER
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'


export default function middleware(req:NextRequest) {
  let loggedInToken = req.cookies.get("credentials");
  console.log("middleware", loggedInToken)
  let url = req.url;

  if (!loggedInToken && url.includes("/home")) {
    return NextResponse.redirect("http://localhost:3000/auth");
  }

  if (loggedInToken && url.includes("/auth")) {
    return NextResponse.redirect("http://localhost:3000/home");
  }

  if(req.url =="http://localhost:3000" || req.url =="http://localhost:3000/"){
    return NextResponse.redirect("http://localhost:3000/auth");
  }
}