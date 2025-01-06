export default function handler(req, res) {
  try {
    const forwarded = req?.headers["x-forwarded-for"];
    const ip = forwarded ? forwarded.split(",")[0] : req?.socket?.remoteAddress;

    res.status(200).json({ ip });
  } catch (err) {
    res.status(500).json({ error: "Failed to get IP address" });
  }
}
