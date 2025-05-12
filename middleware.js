import { NextResponse } from "next/server";
import { STORE_ID, VERCEL_CHECKOUT_AB_FLAG } from "~/config";
import fetchData from "./utils/fetchData";
import { getRedirects } from "./graphql/api";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - images (image files)
     * - favicon.ico (favicon file)
     * - sitemap
     * - api
     */
    "/((?!_next|static|images|sitemap|api|favicon.ico).*)",
  ],
};

const THRESHOLD = 0.5; // initial threshold for the new variant (100%)

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/static") ||
    req.nextUrl.pathname.startsWith("/images") ||
    req.nextUrl.pathname.startsWith("/sitemap") ||
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  } else if (
    req.nextUrl.pathname.startsWith("/products") ||
    req.nextUrl.pathname.startsWith("/collections") ||
    req.nextUrl.pathname.startsWith("/pages") ||
    req.nextUrl.pathname.startsWith("/policies")
  ) {
    const path = req.nextUrl.pathname;

    const { redirect: redirectTo } =
      (await fetchData(getRedirects, {
        slug: path,
        storeId: STORE_ID,
      }).then((resp) => resp.getRedirects)) || {};

    if (!!redirectTo)
      return NextResponse.redirect(new URL(redirectTo, req.url), {
        status: 301,
      });
  }

  // get the variant from the cookie
  // if not found, randomly set a variant based on threshold
  const variant = req.cookies.get(VERCEL_CHECKOUT_AB_FLAG);
  const url = req.nextUrl.clone();
  const res = NextResponse.rewrite(url);

  // set the variant in the cookie if not already set
  if (!variant) {
    const nextVariant =
      Math.random() < THRESHOLD ? "gokwik-ab-bc" : "bw_checkout";
    res.cookies.set(VERCEL_CHECKOUT_AB_FLAG, nextVariant);
  }

  return res;
}
