# Relay Service

Мини-сервис для промежуточного сервера, который принимает заявки от основного сайта и пересылает их в Telegram.

## Что делает

- принимает заявки от основного сайта по `POST /notify`
- проверяет `Authorization: Bearer <secret>`
- отправляет уведомление в Telegram

## Переменные окружения

Скопируй `.env.example` в `.env` и заполни:

```env
PORT=8787
RELAY_SHARED_SECRET=put_shared_secret_here
TELEGRAM_BOT_TOKEN=put_telegram_bot_token_here
TELEGRAM_CHAT_ID=put_telegram_chat_id_here
```

## Локальный запуск

```bash
npm run start
```

## Docker запуск

```bash
cp .env.example .env
docker-compose up -d --build
```

Если relay должен принимать запросы с другого сервера, открой входящий порт `8787` firewall-правилом или поставь перед сервисом `Caddy`/`Nginx`.

## Проверка

```bash
curl http://127.0.0.1:8787/health
```

Тест уведомления:

```bash
curl -X POST http://127.0.0.1:8787/notify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SECRET" \
  -d '{"name":"Тест","contact":"+79999999999","message":"Проверка relay","consent":true,"consentAt":"05.04.2026 20:00:00","ip":"1.2.3.4","userAgent":"curl","referer":"https://sheesysound.ru","fields":["name","contact","message"],"source":"sheesysound.ru"}'
```
