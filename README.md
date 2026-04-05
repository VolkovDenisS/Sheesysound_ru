# Sheesysound

Лендинг студии звукозаписи на `Next.js 14` с формой заявки, Telegram-уведомлениями, галереей, кейсами и Docker-упаковкой для деплоя на VPS.

## Стек

- `Next.js 14`
- `React 18`
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `Docker`

## Что умеет проект

- лендинг с SEO-мета-тегами
- блоки услуг, тарифов, команды, оборудования, кейсов и FAQ
- форма заявки с отправкой в Telegram
- интеграция с `Yclients`
- готовая production-сборка в Docker

## Требования

- `Node.js 20 LTS` или новее
- `npm`
- для контейнерного запуска: `Docker` и `docker compose` или `docker-compose`

## Переменные окружения

Проект использует Telegram-бота для уведомлений из формы.

Скопируй шаблон:

```bash
cp .env.example .env.local
```

или создай файл вручную:

```env
TELEGRAM_BOT_TOKEN=put_your_token_here
TELEGRAM_CHAT_ID=put_chat_id_here
```

Для Docker на сервере удобнее использовать `.env`.

## Локальный запуск

Установка зависимостей:

```bash
npm install
```

Запуск в dev-режиме:

```bash
npm run dev
```

Сайт будет доступен по адресу:

```text
http://localhost:3000
```

Если `3000` занят, `Next.js` автоматически выберет следующий свободный порт.

## Полезные команды разработки

Проверка production-сборки:

```bash
npm run build
```

Запуск production-режима локально:

```bash
npm run start
```

Линтинг:

```bash
npm run lint
```

## Режим отладки

### Быстрая отладка интерфейса

Используй обычный dev-режим:

```bash
npm run dev
```

Это лучший режим для:

- правки вёрстки
- проверки анимаций
- поиска ошибок в консоли браузера
- быстрой итерации по стилям и секциям

### Проверка production-поведения

Если нужно проверить, как сайт ведёт себя ближе к серверному окружению:

```bash
npm run build
npm run start
```

Это полезно для:

- проверки реальной скорости
- проверки Telegram-формы в production-режиме
- поведения изображений вне dev-сервера

### Что важно помнить

- в `dev` некоторые изображения и страницы могут казаться медленнее, чем в production
- если меняешь `next.config.js`, нужно перезапустить dev-сервер или контейнер
- старый `docker-compose` на некоторых VPS может вести себя нестабильно при `recreate`

## Сборка Docker-образа

Собрать образ вручную:

```bash
docker build -t sheesysound .
```

Запустить контейнер вручную:

```bash
docker run -d \
  --name sheesysound \
  -p 3000:3000 \
  --env-file .env \
  sheesysound
```

После запуска сайт будет доступен по адресу:

```text
http://localhost:3000
```

## Запуск через Docker Compose

В проекте уже есть [docker-compose.yml](./docker-compose.yml).

Запуск:

```bash
docker compose up -d --build
```

Если на машине используется старый синтаксис:

```bash
docker-compose up -d --build
```

Остановка:

```bash
docker compose down
```

или:

```bash
docker-compose down
```

Просмотр логов:

```bash
docker compose logs -f
```

или:

```bash
docker-compose logs -f
```

По умолчанию контейнер публикуется на порт `3000`.

Если нужен другой внешний порт:

```bash
APP_PORT=3004 docker compose up -d --build
```

Для старого `docker-compose` можно заранее записать `APP_PORT` в `.env`.

## Production-деплой на VPS

### 1. Установить зависимости

Например, для Ubuntu:

```bash
sudo apt update
sudo apt install -y git docker.io docker-compose
sudo systemctl enable --now docker
```

### 2. Клонировать репозиторий

```bash
git clone https://github.com/VolkovDenisS/Sheesysound_ru.git
cd Sheesysound_ru
```

### 3. Создать `.env`

```bash
cp .env.example .env
```

Заполни значения:

```env
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 4. Поднять контейнер

```bash
docker-compose up -d --build
```

### 5. Проверить запуск

```bash
docker-compose ps
docker-compose logs -f
curl http://localhost:3000
```

## Обновление проекта на VPS

После новых коммитов:

```bash
git pull
docker-compose up -d --build
```

Если старый `docker-compose` падает на ошибке вроде `KeyError: 'ContainerConfig'`, обычно помогает:

```bash
docker-compose down --remove-orphans
docker ps -a --format '{{.Names}}' | grep sheesysound | xargs -r docker rm -f
docker-compose up -d --build --force-recreate
```

## Telegram-уведомления

Форма отправляет заявки через [pages/api/lead.ts](./pages/api/lead.ts).

Для работы нужны:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Если бот уже светился в публичных логах, переписке или скриншотах, токен лучше перевыпустить через `@BotFather`.

## Relay через FI VPS

Если RU VPS не имеет прямого доступа к `api.telegram.org`, проект поддерживает relay-схему:

- основной сайт отправляет заявку на внешний relay-endpoint
- relay-сервис на FI VPS принимает запрос
- relay уже сам отправляет сообщение в Telegram

Для основного сайта используются переменные:

```env
RELAY_URL=http://89.125.74.178:8787/notify
RELAY_SHARED_SECRET=put_shared_secret_here
```

Под relay в репозитории есть отдельная папка:

- [relay](./relay)

Внутри неё лежат:

- Docker-конфиг
- `.env.example`
- минимальный backend для пересылки заявок в Telegram
- отдельный [README](./relay/README.md) с командами запуска

Типовой сценарий:

1. На FI VPS клонировать репозиторий
2. Перейти в `relay`
3. Создать `.env`
4. Запустить `docker-compose up -d --build`
5. Убедиться, что на FI VPS открыт входящий порт `8787` для RU VPS или для теста из внешней сети
5. На RU VPS прописать `RELAY_URL` и `RELAY_SHARED_SECRET`
6. Пересобрать контейнер основного сайта

Важно: по умолчанию relay публикуется наружу на порт `8787`, чтобы RU VPS мог обратиться к нему по адресу вроде `http://89.125.74.178:8787/notify`. После проверки схемы лучше ограничить доступ firewall-правилом по IP RU VPS или поставить перед relay HTTPS-прокси.

## Структура проекта

- [pages/index.tsx](./pages/index.tsx) — основная страница
- [pages/api/lead.ts](./pages/api/lead.ts) — API для отправки заявок в Telegram
- [pages/_app.tsx](./pages/_app.tsx) — глобальные подключения и виджеты
- [styles/globals.css](./styles/globals.css) — глобальные стили
- [public](./public) — изображения и статические ассеты
- [Dockerfile](./Dockerfile) — production-образ
- [docker-compose.yml](./docker-compose.yml) — запуск контейнера

## Примечания по производительности

- проект не использует `AVIF`, чтобы не нагружать слабые VPS лишней перекодировкой
- проблемные карточки грузятся без тяжёлой серверной image-оптимизации
- часть больших JPEG уже пережата под реальные размеры интерфейса

## Типовой рабочий цикл

Локальная разработка:

```bash
npm install
npm run dev
```

Проверка production:

```bash
npm run build
npm run start
```

Деплой на VPS:

```bash
git pull
docker-compose up -d --build
```
