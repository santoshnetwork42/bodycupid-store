import {
  searchProductsBasic,
  searchCollectionTypes,
  getHomePageBlogs,
} from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";

const { STORE_ENV } = process.env;

export default async function Revalidate(req, res) {
  try {
    let nextToken = null;
    let sitemapEntries = [];

    const fetchProductData = async (token) => {
      const response = await fetchData(searchProductsBasic, {
        filter: {
          status: { eq: "ENABLED" },
          storeId: { eq: STORE_ID },
        },
        nextToken: token,
      });

      const { items, nextToken: newToken } = response.searchProducts;
      sitemapEntries.push(
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

    const fetchCollectionData = async (token) => {
      const response = await fetchData(searchCollectionTypes, {
        filter: {
          storeId: { eq: STORE_ID },
        },
        nextToken: token,
      });

      const { items, nextToken: newToken } = response.searchCollectionTypes;
      sitemapEntries.push(
        ...items.map((collection) => ({
          loc: `https://bodycupid.com/collection/${collection.slug}`,
          lastmod: collection.updatedAt,
          changefreq: "weekly",
        }))
      );

      if (newToken) {
        await fetchCollectionData(newToken);
      }
    };

    const fetchBlogData = async (token) => {
      const response = await fetchData(getHomePageBlogs, {
        filter: {
          storeId: { eq: STORE_ID },
        },
        nextToken: token,
      });

      const { items, nextToken: newToken } = response.searchBlogs;
      sitemapEntries.push(
        ...items.map((blog) => ({
          loc: blog.title,
          lastmod: blog.updatedAt,
          changefreq: "weekly",
        }))
      );

      if (newToken) {
        await fetchBlogData(newToken);
      }
    };

    await Promise.all([
      fetchProductData(),
      fetchCollectionData(),
      fetchBlogData(),
    ]);

    const siteMapLinks = [
      {
        loc: "https://bodycupid.com/sitemap.xml",
      },
      ...sitemapEntries,
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
