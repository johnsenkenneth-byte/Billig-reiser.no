export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const publicKey = String(process.env.VAPID_PUBLIC_KEY || "").trim();
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    success: true,
    enabled: Boolean(publicKey),
    publicKey
  });
}
