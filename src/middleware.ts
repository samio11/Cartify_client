import { NextRequest, NextResponse } from "next/server";
import { userInfo } from "./services/Auth";

const authRoutes = ["/login", "/register"];

// type Role = keyof typeof roleBasedRoutes;
type Role = "user" | "admin";
// Role to go=> (/^\) must + route (/user/)
const roleBasedRoutes = {
  user: [/^\/user/, /^\/about/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const retriveUser = await userInfo();
  if (!retriveUser) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (retriveUser?.role && roleBasedRoutes[retriveUser?.role as Role]) {
    const routes = roleBasedRoutes[retriveUser?.role as Role];
    if (routes?.some((x) => pathname.match(x))) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
};

// Protected Route[No Login No Go]
export const config = {
  matcher: [
    "/login",
    "/about",
    "/user",
    "/user/:page",
    "/admin",
    "/admin/:page",
  ],
};
