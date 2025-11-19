import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const path = req.nextUrl.pathname;

  // Not logged in?
  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin has full access
  if (role === "admin") {
    return NextResponse.next();
  }

  // Recorder-only section
  if (path.startsWith("/recorder") && role !== "recorder") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // Archer-only section
  if (path.startsWith("/archer") && role !== "archer") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/recorder/:path*", "/archer/:path*"],
};
