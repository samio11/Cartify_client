import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userInfo } from "./services/Auth/auth.service";

export type TRole = keyof typeof roleBasedRoutes;
const authRoutes = ["/login", "/register"];
const roleBasedRoutes = {
  user: [/^\/customer/],
  admin: [/^\/admin/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl || null;
  const userData = await userInfo();
  if (!userData) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }
  if (userData?.role && roleBasedRoutes[userData?.role as TRole]) {
    const routes = roleBasedRoutes[userData?.role as TRole];
    if (routes?.some((x) => pathname.match(x))) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/product",
    "/cart",
    "/customer",
    "/customer/:page",
    "/admin",
    "/admin/:page",
  ],
};
