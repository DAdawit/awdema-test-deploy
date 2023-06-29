import { NextRequest, NextResponse } from "next/server";

export default function middleware(req) {
  let auth = ""; // Use let or const instead of var
  let url = req.url;
  if (typeof window !== "undefined") {
    auth = localStorage.getItem("token");
  }

  // if (!auth && url.includes("/auth/signup")) {
  //   return NextResponse.redirect(new URL("/auth/login", url));
  // }
  // if (auth && url.includes("/auth/signup")) {
  //   return NextResponse.redirect(new URL("/auth/login", url));
  // }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/auth/:path*",
    "/admin/:path*",
    "/user/:path*",
    "/vendor/:path*",
    "/delivery/:path*",
  ],
};
