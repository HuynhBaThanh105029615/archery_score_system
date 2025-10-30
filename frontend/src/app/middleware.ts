import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./_lib/session";

const protectedRoutes = ["/Dashboard"];
const publicRoutes = ['/Login'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = req.cookies.get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/Login", req.url));
    }

    if (isProtectedRoute && session?.userId) {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
    }

    return NextResponse.next();
}