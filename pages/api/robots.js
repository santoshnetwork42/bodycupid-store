const { NODE_ENV } = process.env;

export default async function Revalidate(req, res) {
  if (NODE_ENV !== "production") {
    const content = ["User-agent: *", "Disallow: /"].join("\n");

    res.send(content);
  } else {
    const content = ["User-agent: *", "Allow: /"].join("\n");
    res.send(content);
  }
};
