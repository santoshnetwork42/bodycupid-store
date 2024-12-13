import { NextResponse } from "next/server";
import { VERCEL_CHECKOUT_AB_FLAG } from "~/config";

export const config = {
  matcher: ["/((?!_next|static|images|sitemap|api|favicon.ico).*)"],
};

export default function middleware(req) {
  // Early return for excluded paths
  const excludedPaths = ["/_next", "/static", "/images", "/sitemap", "/api"];
  if (
    excludedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) ||
    req.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const THRESHOLD = 0.5;

  // Get cookie in Next.js 12 way
  const variant = req.cookies[VERCEL_CHECKOUT_AB_FLAG];
  const url = req.nextUrl.clone();
  const res = NextResponse.rewrite(url);

  // Set cookie if not exists
  if (!variant) {
    const nextVariant =
      Math.random() < THRESHOLD ? "gokwik-ab-bc" : "bw_checkout";

    // Next.js 12 cookie setting
    res.cookie(VERCEL_CHECKOUT_AB_FLAG, nextVariant, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }

  return res;
}
