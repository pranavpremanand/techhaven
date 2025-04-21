import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Access cookies using request.cookies
  const token = request.cookies.get("token")?.value;

  // Auth routes
  if (["/signin", "/signup"].includes(pathname)) {
    if (token) {
      // If the user is logged in and tries to access auth routes, redirect to home
      // console.log("Redirecting to home from auth route");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protected routes
  if (["/cart", "/profile", "/checkout"].includes(pathname)) {
    if (!token) {
      // If the user is not logged in and tries to access protected routes, redirect to signin
      // console.log("Redirecting to signin from protected route");
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Allow access to public routes and protected routes (if token exists)
  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/cart", "/profile", "/checkout"],
};