import {
  searchProductsForSitemap,
  searchCollectionTypesForSitemap,
} from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";

const { STORE_ENV, NEXT_PUBLIC_SITE_URL } = process.env;

export default async function Revalidate(req, res) {
  try {
    const productSitemapEntries = [];
    const collSitemapEntries = [];

    const fetchProductData = async (token) => {
      const response = await fetchData(searchProductsForSitemap, {
        filter: {
          status: { eq: "ENABLED" },
          storeId: { eq: STORE_ID },
        },
        nextToken: token,
      });

      const { items, nextToken: newToken } = response.searchProducts;
      productSitemapEntries.push(
        ...items.map((product) => ({
          loc: `${NEXT_PUBLIC_SITE_URL}/products/${product.slug}`,
          lastmod: product.updatedAt,
          changefreq: "weekly",
        }))
      );

      if (newToken) {
        await fetchProductData(newToken);
      }
    };

    const fetchCollectionData = async (token) => {
      const response = await fetchData(searchCollectionTypesForSitemap, {
        filter: {
          storeId: { eq: STORE_ID },
        },
        nextToken: token,
      });

      const { items, nextToken: newToken } = response.searchCollectionTypes;
      collSitemapEntries.push(
        ...items.map((collection) => ({
          loc: `${NEXT_PUBLIC_SITE_URL}/collections/${collection.slug}`,
          lastmod: collection.updatedAt,
          changefreq: "weekly",
        }))
      );

      if (newToken) {
        await fetchCollectionData(newToken);
      }
    };

    if (STORE_ENV === "production") {
      await Promise.all([fetchProductData(), fetchCollectionData()]);
    }

    const siteMapLinks = [
      {
        loc: `${NEXT_PUBLIC_SITE_URL}`,
      },
      ...productSitemapEntries,
      ...collSitemapEntries,
    ];

    const sitemapContent = buildSitemapXml(siteMapLinks);
    res.setHeader("Content-Type", "application/xml");
    res.write(sitemapContent);
    res.end();
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
}

const buildSitemapXml = (fields) => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(([key, value]) => {
        if (!value) return "";
        return `<${key}>${value}</${key}>`;
      });

      return `<url>${field.join("")}</url>\n`;
    })
    .join("");

  return withXMLTemplate(content);
};

const withXMLTemplate = (content) => {
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- This is the parent sitemap containing all entries. -->
 \n${content}</urlset>`;
};
