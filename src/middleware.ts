import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("textpaper-jwt")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: "/app/:path",
};
