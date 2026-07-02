function isValidSubscription(subscription) {
  return subscription
    && typeof subscription === "object"
    && typeof subscription.endpoint === "string"
    && subscription.endpoint.startsWith("https://")
    && subscription.keys
    && typeof subscription.keys.p256dh === "string"
    && typeof subscription.keys.auth === "string";
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function postToWebhook(webhookUrl, payload) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error(`Webhook svarte med ${response.status}.`);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const body = await readBody(req);
    const subscription = body.subscription;
    if (!isValidSubscription(subscription)) {
      return res.status(400).json({ success: false, message: "Ugyldig push-abonnement." });
    }

    const payload = {
      subscription,
      page: String(body.page || "").slice(0, 500),
      appVersion: String(body.appVersion || "").slice(0, 80),
      createdAt: new Date().toISOString(),
      userAgent: String(req.headers["user-agent"] || "").slice(0, 240),
      ip: String(req.headers["x-forwarded-for"] || "").split(",")[0].trim().slice(0, 80)
    };

    const webhookUrl = String(
      process.env.PUSH_SUBSCRIBE_WEBHOOK_URL
      || process.env.PRICE_ALERT_WEBHOOK_URL
      || process.env.DEAL_ALERT_WEBHOOK_URL
      || ""
    ).trim();

    if (webhookUrl) {
      await postToWebhook(webhookUrl, payload);
      return res.status(200).json({ success: true, stored: "webhook" });
    }

    return res.status(200).json({
      success: true,
      stored: false,
      message: "Push er aktivert på enheten, men serverlagring krever PUSH_SUBSCRIBE_WEBHOOK_URL."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Kunne ikke lagre push-abonnement."
    });
  }
}
