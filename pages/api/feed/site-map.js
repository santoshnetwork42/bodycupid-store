const { STORE_ENV } = process.env;

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

export default async function Revalidate(req, res) {
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
