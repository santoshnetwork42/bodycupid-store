import { searchProductsBasic } from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";

const { STORE_ENV } = process.env;

export default async function Revalidate(req, res) {
  try {
    const response = await fetchData(searchProductsBasic, {
      filter: {
        status: { eq: "ENABLED" },
        storeId: { eq: STORE_ID },
      },
    });

    const { items } = response.searchProducts;
    const productUrls = items.map((product) => ({
      loc: `https://bodycupid.com/product/${product.slug}`,
      lastmod: product.updatedAt, 
      changefreq: 'weekly',
    }));

    const siteMapLinks = [
      {
        loc: "https://bodycupid.com/sitemap_products_1.xml",
      },
      {
        loc: "https://bodycupid.com/sitemap_pages_1.xml",
      },
      {
        loc: "https://bodycupid.com/sitemap_collections_1.xml",
      },
      {
        loc: "https://bodycupid.com/sitemap_blogs_1.xml",
      },
      ...productUrls,
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
  <!--  This is the parent sitemap linking to additional sitemaps for products, collections and pages as shown below. The sitemap can not be edited manually, but is kept up to date in real time.  -->
 \n${content}</sitemapindex>`;
};
