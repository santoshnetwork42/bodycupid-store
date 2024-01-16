const { STORE_ENV } = process.env;

export default async function Revalidate(req, res) {
  if (STORE_ENV !== "production") {
    const content = ["User-agent: *", "Disallow: /"].join("\n");
    res.send(content);
  } else {
    const content = [
      "User-agent: *",
      "Disallow: /admin",
      "Disallow: /cart",
      "Disallow: /orders",
      "Disallow: /orders/",
      "Disallow: /checkout",
      "Disallow: /account",
      "Disallow: /addresses",
      "Disallow: /account-details",
      "Disallow: /addresses",
      "Sitemap: https://www.bodycupid.com/sitemap.xml",
    ].join("\n");
    res.send(content);
  }
}
