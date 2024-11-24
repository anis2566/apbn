import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { Role } from "@prisma/client";

const protectedRoutes = ["/dashboard", "/apply", "/scout"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isScoutRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith("/scout")
  );

  const isAdminRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith("/dashboard")
  );

  const isScout =
    session?.user.role === Role.Scout ||
    session?.user.role === Role.ScoutLeader;

  const isAdmin =
    session?.user.role === Role.Admin || session?.user.role === Role.Moderator;

  if (!session && isProtected) {
    const signInUrl = new URL("/auth/sign-in", request.nextUrl);
    signInUrl.searchParams.set("callback", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  } else {
    if (isScoutRoute && !isScout) {
      return NextResponse.redirect(new URL("/apply", request.nextUrl));
    }

    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
