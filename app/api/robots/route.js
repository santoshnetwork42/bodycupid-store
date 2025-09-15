import { NextResponse } from "next/server";
export const runtime = 'edge';
import { STORE_ENV } from "~/config";

export async function GET() {
  let content = "";
  if (STORE_ENV !== "production") {
    content = ["User-agent: *", "Disallow: /"].join("\n");
  } else {
    content = [
      "User-agent: *",
      "Disallow: /admin",
      "Disallow: /cart",
      "Disallow: /orders",
      "Disallow: /orders/",
      "Disallow: /checkout",
      "Disallow: /account",
      "Disallow: /addresses",
      "Disallow: /account-details",
      "Disallow: /rewards",
      "Disallow: /addresses",
      "Sitemap: https://www.bodycupid.com/sitemap.xml",
    ].join("\n");
  }
  return new NextResponse(content, { headers: { "Content-Type": "text/plain" } });
}
