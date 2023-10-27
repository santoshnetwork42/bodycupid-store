import { searchProductsBasic } from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";

const { STORE_ENV } = process.env;

export default async function Revalidate(req, res) {
  try {
    let nextToken = null;
    let productUrls = [];

    const fetchProductData = async (token) => {
      const response = await fetchData(searchProductsBasic, {
        filter: {
          status: { eq: "ENABLED" },
          storeId: { eq: STORE_ID },
        },
        nextToken: token,
      });

      const { items, nextToken: newToken } = response.searchProducts;
      productUrls.push(
        ...items.map((product) => ({
          loc: `https://bodycupid.com/product/${product.slug}`,
          lastmod: product.updatedAt,
          changefreq: "weekly",
        }))
      );

      if (newToken) {
        await fetchProductData(newToken);
      }
    };

    await fetchProductData(nextToken);

    const siteMapLinks = [
      {
        loc: "https://bodycupid.com/sitemap_products.xml",
      },
      {
        loc: "https://bodycupid.com/sitemap_pages.xml",
      },
      {
        loc: "https://bodycupid.com/sitemap_collections.xml",
      },
      {
        loc: "https://bodycupid.com/sitemap_blogs.xml",
      },
    ];

    if (STORE_ENV !== "production" && false) {
      const content = ["User-agent: *", "Disallow: /"].join("\n");
      res.send(content);
    } else {
      const sitemapContent = buildSitemapXml(siteMapLinks);
      res.setHeader("Content-Type", "application/xml");
      res.write(sitemapContent);
      res.end();
    }
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).send("Error fetching products");
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
  return `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!--  This is the parent sitemap linking to additional sitemaps for products as shown below. The sitemap can not be edited manually, but is kept up to date in real time.  -->
 \n${content}</sitemapindex>`;
};
