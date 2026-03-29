import type { ReactNode } from "react";

export type NavItem = {
  id: string;
  label: string;
};

export type ServiceItem = {
  title: string;
  price: string;
  note: string;
  icon: ReactNode;
  isHot?: boolean;
};

export type PackageItem = {
  tag: string;
  price: string;
  badge: string;
  accent: "violet" | "pink" | "gold";
  subtitle: string;
  bullets: string[];
  cta: string;
};

export type PersonItem = {
  name: string;
  role: string;
  photo: string;
  text: string;
  bullets: string[];
};

export type EquipmentItem = {
  title: string;
  subtitle: string;
  photo: string;
  icon: string;
};

export type CaseItem = {
  title: string;
  subtitle: string;
  image: string;
  note: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export const YCLIENTS_URL = "https://w885653.yclients.com";
export const YANDEX_MAPS_URL =
  "https://yandex.ru/maps/org/shizi_saund/30833351260/?ll=39.041186%2C45.052213&z=17";
export const YANDEX_REVIEWS_WIDGET_URL =
  "https://yandex.ru/maps-reviews-widget/30833351260?comments";
export const YANDEX_MAP_WIDGET_URL =
  "https://yandex.ru/map-widget/v1/org/shizi_saund/30833351260/?ll=39.041186%2C45.052213&z=17";
export const VK_URL = "https://vk.com/sheesysound";
export const TELEGRAM_URL = "https://t.me/sheesyrecords";
export const TELEGRAM_HANDLE = "@sheesyrecords";

export const NAV: NavItem[] = [
  { id: "services", label: "Услуги" },
  { id: "packages", label: "Тарифы" },
  { id: "gallery", label: "Галерея" },
  { id: "cases", label: "Портфолио" },
  { id: "contacts", label: "Контакты" },
];

export const SERVICES: ServiceItem[] = [
  {
    title: "Запись вокала / голоса",
    price: "1500 ₽ / час",
    note: "Премиум-тракт, полная изоляция и продюсерский контроль. Записываем вокал, подкасты, медитации и дикторские озвучки.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
    ),
  },
  {
    title: "Сведение + коррекция вокала",
    price: "6490 ₽",
    isHot: true,
    note: "Глубокий, плотный и конкурентный звук. Детальная эквализация, динамическая обработка и тюнинг вокала. Звучи как на радио.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" /></svg>
    ),
  },
  {
    title: "Подкасты / Дикторская озвучка",
    price: "2000 ₽ / час",
    note: "Профессиональная запись речи для подкастов, YouTube или озвучки видео. Чистый звук и полная тишина.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8" /><path d="M4 16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-4H4v4z" /><path d="M12 18v4" /><path d="M8 22h8" /></svg>
    ),
  },
  {
    title: "Бит / инструментал под заказ",
    price: "от 8000 ₽",
    note: "Инструментал, который качает. Уникальный саунд-дизайн под твой стиль и референсы. От трэпа до поп-рока.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
    ),
  },
  {
    title: "Песня в подарок",
    price: "6490 ₽",
    note: "Подари эмоции! Запись песни в студии — даже без опыта. Полное сопровождение и магия тюнинга.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v10H4V12" /><path d="M2 7h20v5H2z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
    ),
  },
  {
    title: "Песня под ключ",
    price: "от 29 990 ₽",
    note: "От идеи до релиза. Инструментал, текст, запись и топ-сведение. Готовый хит под ключ.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
    ),
  },
];

export const PACKAGES: PackageItem[] = [
  {
    tag: "Стандарт",
    price: "9 490 ₽",
    badge: "",
    accent: "violet",
    subtitle: "Запись + сведение: быстрый и красивый результат.",
    bullets: ["2 часа записи", "Сведение", "Мастеринг", "Базовая коррекция вокала"],
    cta: "Забронировать",
  },
  {
    tag: "Про",
    price: "18 990 ₽",
    badge: "Лучший выбор",
    accent: "pink",
    subtitle: "Инструментал под ключ + мощная обработка вокала.",
    bullets: [
      "2 часа записи",
      "Индивидуальный инструментал под заказ (включён)",
      "Расширенная обработка вокала",
      "Детальное сведение",
      "Мастеринг",
    ],
    cta: "Выбрать Про",
  },
  {
    tag: "Под ключ",
    price: "от 29 990 ₽",
    badge: "Люкс",
    accent: "gold",
    subtitle: "Максимальный уровень: трек под ключ без лишней суеты.",
    bullets: ["Бит / аранжировка", "Текст (по необходимости)", "Демо", "Запись", "Сведение", "Мастеринг", "Экспорт под релиз"],
    cta: "Обсудить проект",
  },
];

export const PEOPLE: PersonItem[] = [
  {
    name: "Александр",
    role: "звукорежиссёр / продюсер",
    photo: "/photos/photo_alexander_new.jpg",
    text:
      "Мой приоритет — безупречный баланс и плотность микса. Используя математическую точность в сведении и соответствие мировым стандартам индустрии, я превращаю сырой материал в породистый, готовый к ротации продукт.",
    bullets: ["Сведение", "Мастеринг", "Тюнинг вокала", "Качество"],
  },
  {
    name: "Михаил",
    role: "продюсер / инженер записи",
    photo: "/photos/photo_2025-12-29_19-44-12.jpg",
    text:
      "Я верю, что музыка — это прежде всего движение, и в студии мы ловим этот поток. Помогаю артисту найти свой истинный звук через профессиональный контроль записи и продюсирование, где каждая деталь работает на общую энергию трека.",
    bullets: ["Запись вокала", "Вайб-контроль", "Аранжировки", "Продакшн"],
  },
];

export const EQUIPMENT: EquipmentItem[] = [
  {
    title: "Союз 017",
    subtitle: "Тёплый, плотный, детальный звук для вокала любого жанра.",
    photo: "/photos/photo_2023-08-09_20-18-36.jpg",
    icon: "🎙️",
  },
  {
    title: "Sony MDR-MV1",
    subtitle: "Честные наушники для контроля деталей и баланса на записи.",
    photo: "/photos/gear_sony_mdr_mv1.png",
    icon: "🎧",
  },
  {
    title: "Beyerdynamic DT 770 Pro",
    subtitle: "Классика студийного мониторинга: честный звук, детали и комфорт.",
    photo: "/photos/gear_beyerdynamic_new.jpg",
    icon: "🎧",
  },
  {
    title: "Adam Audio T5V",
    subtitle: "Студийные мониторы для точного микса и правильной сцены.",
    photo: "/photos/gear_adam_t5v_v3.jpg",
    icon: "🔊",
  },
];

export const GALLERY = [
  "/photos/studio_couch_neon.jpg",
  "/photos/studio_recording_vibe.jpg",
  "/photos/studio_mic_detail.jpg",
  "/photos/studio_artist_girl.jpg",
  "/photos/studio_engineer_work.jpg",
  "/photos/photo_2023-06-08_16-57-26.jpg",
  "/photos/photo_2024-02-12_17-12-37.jpg",
  "/photos/photo_2024-07-18_13-34-49.jpg",
  "/photos/photo_2024-08-28_13-58-36.jpg",
  "/photos/photo_2024-10-24_13-18-21.jpg",
  "/photos/photo_2025-04-04_17-58-40 (2).jpg",
  "/photos/photo_2026-02-11_00-02-36.jpg",
];

export const CASES: CaseItem[] = [
  { title: "Saluki", subtitle: "Продакшн", image: "/cases/saluki.jpg", note: "Продакшн и финальное звучание." },
  { title: "TRUWER", subtitle: "Продакшн", image: "/cases/truewer.jpg", note: "Продакшн и работа над стилем." },
  { title: "Gunnr", subtitle: "Продакшн", image: "/cases/gunnr.jpg", note: "Продакшн и контроль вокальной обработки." },
  { title: "Friendly Thugg 52 NGG", subtitle: "Продакшн", image: "/cases/friendly.jpg", note: "Продакшн под стиль и вайб." },
  { title: "Katekey • Johny Core", subtitle: "Продакшн", image: "/cases/katekey_johnycore.jpg", note: "Совместные проекты и звук." },
  { title: "Taxi B", subtitle: "Продакшн", image: "/cases/taxib.jpg", note: "Продакшн и финальная подача." },
];

export const FAQ: FaqItem[] = [
  { q: "Сколько времени занимает запись?", a: "В среднем 2 часа — этого достаточно, чтобы записать полноценный трек." },
  { q: "Сколько делается сведение?", a: "До 7 дней. При срочности — обсудим и ускорим." },
  { q: "Можно без опыта?", a: "Да. Поможем раскрыть голос и объясним процесс по шагам." },
  { q: "Можно срочно?", a: "Да, но сначала нужно обсудить детали и дедлайн." },
  { q: "Как оплатить?", a: "Оплата по СБП." },
  { q: "Есть подарочные сертификаты?", a: "Да, на любую сумму и услугу." },
];

export const SITE_META = {
  title: "Студия звукозаписи в Краснодаре — Шизи Саунд | Запись, Сведение, Бит",
  desc:
    "Профессиональная студия звукозаписи в Краснодаре. Запись вокала, сведение, мастеринг, аранжировки и биты под ключ. Топовое оборудование (Союз 017), полная шумоизоляция и уютная атмосфера. Твой звук — наша работа.",
  url: "https://sheesysound.ru/",
} as const;
