const ALLOWED_AIRPORT = /^[A-ZÆØÅa-zæøå0-9 .()/-]{2,80}$/;

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function postToWebhook(webhookUrl, signup) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signup)
  });

  if (!response.ok) throw new Error(`Webhook svarte med ${response.status}.`);
}

async function sendResendNotification(signup) {
  const apiKey = String(process.env.RESEND_API_KEY || "").trim();
  const to = String(process.env.PRICE_ALERT_TO || process.env.DEAL_ALERT_TO || "").trim();
  if (!apiKey || !to) return false;

  const from = String(process.env.PRICE_ALERT_FROM || process.env.DEAL_ALERT_FROM || "Billig Reiser <reisevarsel@billig-reiser.no>").trim();
  const subject = `Nytt prisvarsel: ${signup.from} til ${signup.to}`;
  const text = [
    "Nytt prisvarsel fra Billig-reiser.no",
    "",
    `E-post: ${signup.email}`,
    `Fra: ${signup.from}`,
    `Til: ${signup.to}`,
    `Makspris: ${signup.targetPrice || "ikke satt"}`,
    `Avreise: ${signup.depart || "ikke satt"}`,
    `Retur: ${signup.returnDate || "ikke satt"}`,
    `Push: ${signup.pushSubscription ? "ja" : "nei"}`,
    `Side: ${signup.page}`,
    `Tid: ${signup.createdAt}`
  ].join("\n");

  const html = `
    <h2>Nytt prisvarsel</h2>
    <p><strong>E-post:</strong> ${escapeHtml(signup.email)}</p>
    <p><strong>Fra:</strong> ${escapeHtml(signup.from)}</p>
    <p><strong>Til:</strong> ${escapeHtml(signup.to)}</p>
    <p><strong>Makspris:</strong> ${escapeHtml(signup.targetPrice || "ikke satt")}</p>
    <p><strong>Avreise:</strong> ${escapeHtml(signup.depart || "ikke satt")}</p>
    <p><strong>Retur:</strong> ${escapeHtml(signup.returnDate || "ikke satt")}</p>
    <p><strong>Push:</strong> ${signup.pushSubscription ? "ja" : "nei"}</p>
    <p><strong>Side:</strong> ${escapeHtml(signup.page)}</p>
    <p><strong>Tid:</strong> ${escapeHtml(signup.createdAt)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from, to: [to], subject, text, html })
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) throw new Error(data?.message || "Resend kunne ikke sende prisvarsel.");
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const body = await readBody(req);
    if (String(body.website || "").trim()) return res.status(200).json({ success: true, skipped: true });

    const email = String(body.email || "").trim().toLowerCase();
    const from = String(body.from || "OSL").trim().slice(0, 80);
    const to = String(body.to || "").trim().slice(0, 80);
    const targetPrice = Number(body.targetPrice || 0);

    if (!isEmail(email)) {
      return res.status(400).json({ success: false, message: "Skriv inn en gyldig e-postadresse." });
    }
    if (!ALLOWED_AIRPORT.test(from) || !ALLOWED_AIRPORT.test(to)) {
      return res.status(400).json({ success: false, message: "Skriv inn gyldig fra- og til-felt." });
    }
    if (targetPrice && (targetPrice < 100 || targetPrice > 250000)) {
      return res.status(400).json({ success: false, message: "Makspris må være mellom 100 og 250 000 kr." });
    }

    const signup = {
      email,
      from,
      to,
      targetPrice: targetPrice || "",
      depart: String(body.depart || "").slice(0, 30),
      returnDate: String(body.returnDate || "").slice(0, 30),
      page: String(body.page || "").slice(0, 500),
      appVersion: String(body.appVersion || "").slice(0, 80),
      pushSubscription: body.pushSubscription && typeof body.pushSubscription === "object" ? body.pushSubscription : null,
      createdAt: new Date().toISOString(),
      userAgent: String(req.headers["user-agent"] || "").slice(0, 240),
      ip: String(req.headers["x-forwarded-for"] || "").split(",")[0].trim().slice(0, 80)
    };

    const webhookUrl = String(process.env.PRICE_ALERT_WEBHOOK_URL || process.env.DEAL_ALERT_WEBHOOK_URL || "").trim();
    const deliveredTo = [];

    if (webhookUrl) {
      await postToWebhook(webhookUrl, signup);
      deliveredTo.push("webhook");
    }

    if (await sendResendNotification(signup)) deliveredTo.push("resend");

    if (!deliveredTo.length) {
      return res.status(503).json({
        success: false,
        message: "Prisvarsler er ikke koblet til ennå. Legg inn PRICE_ALERT_WEBHOOK_URL eller RESEND_API_KEY i Vercel."
      });
    }

    return res.status(200).json({ success: true, deliveredTo });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Kunne ikke lagre prisvarselet akkurat nå."
    });
  }
}
