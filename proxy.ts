import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { IRole } from "./lib/type";
import { decodeToken } from "./public/utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];

const ROUTE_ROLES: Record<string, IRole[]> = {
  "/dashboard": ["ADMIN", "LANDLORD", "TENANT"],
  "/admin": ["ADMIN"],
  "/owner": ["ADMIN", "LANDLORD"],
};

/**
 * The route itself or something nested under it - "/admin" and "/admin/users",
 * but not "/administrator". A bare startsWith would swallow that too, and send
 * anyone visiting a typo'd URL to the login page instead of a 404.
 */
const matches = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const goTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  // The role comes off the token rather than a /users/me call: this runs on
  // every request, including prefetches, so a fetch here would cost an API
  // round-trip per navigation.
  const role = decodeToken(request.cookies.get("accessToken")?.value)?.role;

  // Signed-in users have no reason to see the login page
  if (AUTH_ROUTES.includes(pathname)) {
    return role ? goTo("/dashboard") : NextResponse.next();
  }

  const allowedRoles = Object.entries(ROUTE_ROLES).find(([route]) =>
    matches(pathname, route),
  )?.[1];

  if (!allowedRoles) return NextResponse.next();

  // Signed out -> login, and remember where they were headed
  if (!role) {
    const loginUrl = new URL("/login", request.url);

    return NextResponse.redirect(loginUrl);
  }

  // Signed in but wrong role
  if (!allowedRoles.includes(role)) return goTo("/not-found");

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
