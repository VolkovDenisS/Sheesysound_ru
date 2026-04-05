import http from "node:http";

const PORT = Number(process.env.PORT || 8787);
const RELAY_SHARED_SECRET = process.env.RELAY_SHARED_SECRET || "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

function buildTelegramText(payload) {
  return (
    `Новая заявка ШИЗИ САУНД\n` +
    `Имя: ${payload.name}\n` +
    `Контакт: ${payload.contact}\n` +
    `Запрос: ${payload.message || "-"}\n` +
    `\n` +
    `Согласие на обработку ПДн: да\n` +
    `Дата и время согласия: ${payload.consentAt || "-"}\n` +
    `IP: ${payload.ip || "-"}\n` +
    `User-Agent: ${payload.userAgent || "-"}\n` +
    `Referer: ${payload.referer || "-"}\n` +
    `Поля формы: ${Array.isArray(payload.fields) ? payload.fields.join(", ") : "name, contact, message"}\n` +
    `Источник: ${payload.source || "sheesysound.ru"}`
  );
}

async function sendToTelegram(payload) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram relay env not set");
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: buildTelegramText(payload),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method !== "POST" || req.url !== "/notify") {
    return sendJson(res, 404, { ok: false, error: "Not found" });
  }

  if (!RELAY_SHARED_SECRET || getBearerToken(req) !== RELAY_SHARED_SECRET) {
    return sendJson(res, 401, { ok: false, error: "Unauthorized" });
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > 64 * 1024) {
      req.destroy();
    }
  });

  req.on("end", async () => {
    try {
      const payload = JSON.parse(body || "{}");

      if (!payload.name || !payload.contact || payload.consent !== true) {
        return sendJson(res, 400, { ok: false, error: "Invalid payload" });
      }

      await sendToTelegram(payload);
      return sendJson(res, 200, { ok: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return sendJson(res, 500, { ok: false, error: message });
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Relay listening on port ${PORT}`);
});
