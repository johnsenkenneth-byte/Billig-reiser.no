async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function isValidSubscription(subscription) {
  return subscription
    && typeof subscription === "object"
    && typeof subscription.endpoint === "string"
    && subscription.endpoint.startsWith("https://")
    && subscription.keys
    && typeof subscription.keys.p256dh === "string"
    && typeof subscription.keys.auth === "string";
}

function authorized(req, body) {
  const token = String(process.env.PUSH_SEND_TOKEN || "").trim();
  if (!token) return false;
  const header = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "").trim();
  return header === token || String(body.token || "").trim() === token;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const body = await readBody(req);
    if (!authorized(req, body)) {
      return res.status(401).json({ success: false, message: "Mangler gyldig PUSH_SEND_TOKEN." });
    }

    const publicKey = String(process.env.VAPID_PUBLIC_KEY || "").trim();
    const privateKey = String(process.env.VAPID_PRIVATE_KEY || "").trim();
    const subject = String(process.env.VAPID_SUBJECT || "mailto:post@billig-reiser.no").trim();
    if (!publicKey || !privateKey) {
      return res.status(503).json({ success: false, message: "Legg inn VAPID_PUBLIC_KEY og VAPID_PRIVATE_KEY i Vercel." });
    }

    const subscription = body.subscription;
    if (!isValidSubscription(subscription)) {
      return res.status(400).json({ success: false, message: "Ugyldig push-abonnement." });
    }

    const notification = {
      title: String(body.title || "Billig Reiser").slice(0, 80),
      body: String(body.body || "Nytt reisevarsel er klart.").slice(0, 220),
      url: String(body.url || "/#reisevarsel").slice(0, 500),
      tag: String(body.tag || "billig-reiser-alert").slice(0, 80),
      icon: String(body.icon || "/assets/app-icon-192.png").slice(0, 500),
      badge: String(body.badge || "/favicon-96x96.png").slice(0, 500)
    };

    const mod = await import("web-push");
    const webPush = mod.default || mod;
    webPush.setVapidDetails(subject, publicKey, privateKey);
    const result = await webPush.sendNotification(subscription, JSON.stringify(notification), {
      TTL: Number(body.ttl || 3600)
    });

    return res.status(200).json({ success: true, statusCode: result.statusCode });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Kunne ikke sende push-varsel."
    });
  }
}
