import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  name?: string;
  contact?: string;
  message?: string;
  consent?: boolean;
};

function getIp(req: NextApiRequest) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") return forwarded.split(",")[0]?.trim() || "";
  if (Array.isArray(forwarded)) return forwarded[0]?.trim() || "";

  return req.socket.remoteAddress || "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const { name, contact, message, consent }: Body = (req.body || {}) as Body;
  if (!name || !contact) return res.status(400).json({ ok: false, error: "Missing fields" });
  if (!consent) return res.status(400).json({ ok: false, error: "Consent required" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(500).json({ ok: false, error: "Telegram env not set" });

  const now = new Date().toLocaleString("ru-RU");
  const ip = getIp(req) || "-";
  const userAgent = req.headers["user-agent"] || "-";
  const referer = req.headers.referer || req.headers.referrer || "-";

  const text =
    `Новая заявка ШИЗИ САУНД\n` +
    `Имя: ${name}\n` +
    `Контакт: ${contact}\n` +
    `Запрос: ${message || "-"}\n` +
    `\n` +
    `Согласие на обработку ПДн: да\n` +
    `Дата и время согласия: ${now}\n` +
    `IP: ${ip}\n` +
    `User-Agent: ${userAgent}\n` +
    `Referer: ${referer}\n` +
    `Поля формы: name, contact, message`;

  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const r = await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(500).json({ ok: false, error: errText });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "Unknown error" });
  }
}
