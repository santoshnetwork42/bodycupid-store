// pages/_middleware.js
import { NextResponse } from "next/server";
import { VERCEL_CHECKOUT_AB_FLAG } from "~/config";

export function middleware(req) {
  // Early return for excluded paths
  if (
    req.nextUrl.pathname.match(
      /^\/(_next|static|images|sitemap|api|favicon\.ico)/
    )
  ) {
    return NextResponse.next();
  }

  const THRESHOLD = 0.5;
  const response = NextResponse.next();

  // Check existing cookie
  const currentCookie = req.cookies[VERCEL_CHECKOUT_AB_FLAG];

  if (!currentCookie) {
    const variant = Math.random() < THRESHOLD ? "gokwik-ab-bc" : "bw_checkout";

    // Set cookie using headers
    response.headers.set(
      "Set-Cookie",
      `${VERCEL_CHECKOUT_AB_FLAG}=${variant}; Path=/; Max-Age=${
        60 * 60 * 24 * 7
      }`
    );
  }

  return response;
}
