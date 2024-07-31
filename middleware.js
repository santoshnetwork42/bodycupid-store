import { NextResponse } from "next/server";
import { AB_THRESHOLD, STORE_PREFIX, VERCEL_AB_FLAG } from "./config";

// make sure the middleware only runs when
// the requested url starts with `/` all pages
export const config = {
  matcher: ["/"],
};

const THRESHOLD = AB_THRESHOLD; // initial threshold for the new variant (100%)
const COOKIE_NAME = `${STORE_PREFIX}_${VERCEL_AB_FLAG}`; // name of the cookie to store the variant

export function middleware(req) {
  // get the variant from the cookie
  // if not found, randomly set a variant based on threshold
  const variant =
    req.cookies.get(COOKIE_NAME) ||
    (Math.random() < THRESHOLD ? "gk_checkout" : "bw_checkout");

  const url = req.nextUrl.clone();

  const res = NextResponse.rewrite(url);

  // set the variant in the cookie if not already set
  if (!req.cookies.get(COOKIE_NAME)) {
    res.cookies.set(COOKIE_NAME, variant);
  }
  return res;
}
