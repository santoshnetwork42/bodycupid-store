const { STORE_ENV } = process.env;

export default async function Revalidate(req, res) {
  if (STORE_ENV !== "production") {
    const content = ["User-agent: *", "Disallow: /"].join("\n");
    res.send(content);
  } else {
    const content = ["User-agent: *", "Allow: /"].join("\n");
    res.send(content);
  }
};
