const { REVALIDATE_SECRET = "secret" } = process.env;

export default async function Revalidate(req, res) {
  if (req.query.secret !== REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (req.method !== "POST") {
    return res.status(404).json({ message: "POST /api/revalidate not found" });
  }

  if (!req.body.path) {
    return res.status(400).json({ message: "Please provide path in body" });
  }

  try {
    await res.revalidate(req.body.path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};
