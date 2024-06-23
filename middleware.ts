import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/apply",
  "/scout(.*)",
  "/dashboard(.*)"
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const role = auth().sessionClaims?.role;
    if (!auth().userId) {
      auth().protect();
    } else {
      if (req.nextUrl.pathname.startsWith("/scout") && role !== "scout") {
        return NextResponse.redirect(new URL("/apply", req.url));
      }

      // if (req.nextUrl.pathname.startsWith("/dashboard") && role !== "admin") {
      //   return NextResponse.redirect(new URL("/", req.url));
      // }
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};