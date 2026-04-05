import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  name?: string;
  contact?: string;
  message?: string;
  consent?: boolean;
};

type RelayPayload = {
  name: string;
  contact: string;
  message: string;
  consent: true;
  consentAt: string;
  ip: string;
  userAgent: string;
  referer: string;
  fields: string[];
  source: string;
};

function getIp(req: NextApiRequest) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") return forwarded.split(",")[0]?.trim() || "";
  if (Array.isArray(forwarded)) return forwarded[0]?.trim() || "";

  return req.socket.remoteAddress || "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, contact, message, consent }: Body = (req.body || {}) as Body;
  if (!name || !contact) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  if (!consent) {
    return res.status(400).json({ ok: false, error: "Consent required" });
  }

  const relayUrl = process.env.RELAY_URL;
  const relaySecret = process.env.RELAY_SHARED_SECRET;

  if (!relayUrl || !relaySecret) {
    return res.status(500).json({ ok: false, error: "Relay env not set" });
  }

  const payload: RelayPayload = {
    name,
    contact,
    message: message || "",
    consent: true,
    consentAt: new Date().toLocaleString("ru-RU"),
    ip: getIp(req) || "-",
    userAgent: String(req.headers["user-agent"] || "-"),
    referer: String(req.headers.referer || req.headers.referrer || "-"),
    fields: ["name", "contact", "message"],
    source: "sheesysound.ru",
  };

  try {
    const response = await fetch(relayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${relaySecret}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "Unknown error" });
  }
}
