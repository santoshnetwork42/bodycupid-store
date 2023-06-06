import {  searchProductsBasic, } from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";

const { STORE_ENV } = process.env;

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
];
export default async function Revalidate(req, res) {
  try {
    const res = await fetchData(searchProductsBasic, {
      filter: {
        status: { eq: "ENABLED" },
        storeId: { eq: STORE_ID },
      },
    });
    const { items } = res.searchProducts;
    console.log("getProducts :>> ", items);

    const data=items.map((i)=>({

    }))
  } catch (e) {
    console.log("e :>> ", e);
  }

  if (STORE_ENV !== "production" && false) {
    const content = ["User-agent: *", "Disallow: /"].join("\n");
    res.send(content);
  } else {
    const sitemapContent = buildSitemapXml(siteMapLinks);
    res.setHeader("Content-Type", "application/xml");
    res.write(sitemapContent);
    res.end();
  }
}

const buildSitemapXml = (fields) => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(([key, value]) => {
        if (!value) return "";
        return `<${key}>${value}</${key}>`;
      });

      return `<sitemap>${field.join("")}</sitemap>\n`;
    })
    .join("");

  return withXMLTemplate(content);
};

const withXMLTemplate = (content) => {
  return `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!--  This is the parent sitemap linking to additional sitemaps for products, collections and pages as shown below. The sitemap can not be edited manually, but is kept up to date in real time.  -->
 \n${content}</sitemapindex>`;
};
