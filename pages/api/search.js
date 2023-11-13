const { TTM_CLIENT, TTM_API_KEY } = process.env;

export default async function Search(req, res) {
  if (!req.query.search) {
    return res.status(401).json({ message: "Search term is required" });
  }

  if (req.method !== "GET") {
    return res.status(404).json({ message: "POST /api/search not found" });
  }

  const response = await fetch(
    `https://dev.devxtechnology.com/${TTM_CLIENT}/search?query=${req.query.search}&threshold=0.687`,
    {
      headers: {
        Authorization: `Bearer ${TTM_API_KEY}`,
      },
    }
  ).then((resp) => resp.json());
  res.json(response);
}
