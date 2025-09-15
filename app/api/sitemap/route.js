import { NextResponse } from "next/server";
export const runtime = 'edge';
import { searchProductsForSitemap, searchCollectionTypesForSitemap } from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { STORE_ID, STORE_ENV } from "~/config";

const { NEXT_PUBLIC_SITE_URL } = process.env;

export async function GET() {
  try {
    const productSitemapEntries = [];
    const collSitemapEntries = [];

    const fetchProductData = async (token) => {
      const response = await fetchData(searchProductsForSitemap, {
        filter: { status: { eq: "ENABLED" }, storeId: { eq: STORE_ID } },
        nextToken: token,
      });
      const { items, nextToken: newToken } = response.searchProducts;
      const filteredItems = items?.filter((p) => !p?.metadata?.noIndex && !p?.metadata?.canonical);
      productSitemapEntries.push(
        ...filteredItems.map((p) => ({
          loc: `${NEXT_PUBLIC_SITE_URL}/products/${p.slug}`,
          lastmod: p.updatedAt,
          changefreq: "weekly",
        }))
      );
      if (newToken) await fetchProductData(newToken);
    };

    const fetchCollectionData = async (token) => {
      const response = await fetchData(searchCollectionTypesForSitemap, {
        filter: { storeId: { eq: STORE_ID } },
        nextToken: token,
      });
      const { items, nextToken: newToken } = response.searchCollectionTypes;
      const filteredItems = items?.filter((c) => !c?.metadata?.noIndex && !c?.metadata?.canonical);
      collSitemapEntries.push(
        ...filteredItems.map((c) => ({
          loc: `${NEXT_PUBLIC_SITE_URL}/collections/${c.slug}`,
          lastmod: c.updatedAt,
          changefreq: "weekly",
        }))
      );
      if (newToken) await fetchCollectionData(newToken);
    };

    if (STORE_ENV === "production") {
      await Promise.all([fetchProductData(), fetchCollectionData()]);
    }

    const siteMapLinks = [{ loc: `${NEXT_PUBLIC_SITE_URL}` }, ...productSitemapEntries, ...collSitemapEntries];
    const sitemapContent = buildSitemapXml(siteMapLinks);
    return new NextResponse(sitemapContent, { headers: { "Content-Type": "application/xml" } });
  } catch (error) {
    return new NextResponse("Error fetching data", { status: 500 });
  }
}

const buildSitemapXml = (fields) => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData)
        .map(([key, value]) => (value ? `<${key}>${value}</${key}>` : ""))
        .join("");
      return `<url>${field}</url>\n`;
    })
    .join("");
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${content}</urlset>`;
};
