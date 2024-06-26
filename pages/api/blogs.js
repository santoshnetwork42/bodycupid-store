import { WORDPRESS_AUTH, WORDPRESS_URL } from "~/config";

// pages/api/blogs.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const response = await fetch(WORDPRESS_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: WORDPRESS_AUTH,
      },
      method: "POST",
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching data" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
