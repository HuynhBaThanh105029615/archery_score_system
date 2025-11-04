/*middleware.ts */

//Not used now.

// import { NextRequest, NextResponse } from "next/server";
// import { decrypt } from "./_lib/session";

// const protectedRoutes = ["/Profile"];
// const publicRoutes = ["/Login"];

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path);

//   const cookie = req.cookies.get("session")?.value;
//   const session = await decrypt(cookie);

//   // 🚪 Case 1: No session but trying to access protected route
//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL("/Login", req.url));
//   }

//   // 🚪 Case 2: Logged in but trying to access public route (like /Login)
//   if (isPublicRoute && session?.userId) {
//     return NextResponse.redirect(new URL("/Profile", req.url));
//   }

//   // ✅ Case 3: All other routes (allowed)
//   return NextResponse.next();
// }
