import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "../auth";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin"];
const publicRoutes = ["/", "/login", "/register", "/blog", "/pages"];

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const path = nextUrl.pathname;

  // 2. Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    path.startsWith(route)
  );

  // 3. Redirect unauthenticated users to login page
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 4. Redirect authenticated users away from login/register
  if (
    isPublicRoute &&
    isAuthenticated &&
    (path === "/login" || path === "/register")
  ) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
});

// 5. Configure which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
