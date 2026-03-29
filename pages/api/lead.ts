import type { NextApiRequest, NextApiResponse } from "next";

type Body = { name?: string; contact?: string; message?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const { name, contact, message }: Body = (req.body || {}) as Body;
  if (!name || !contact) return res.status(400).json({ ok: false, error: "Missing fields" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(500).json({ ok: false, error: "Telegram env not set" });

  const text =
    `🟣 Новая заявка ШИЗИ САУНД\n` +
    `👤 Имя: ${name}\n` +
    `📲 Контакт: ${contact}\n` +
    `📝 Запрос: ${message || "-"}\n` +
    `🕒 ${new Date().toLocaleString("ru-RU")}`;

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
