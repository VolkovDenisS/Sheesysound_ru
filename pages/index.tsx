import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GooeyText } from "../components/ui/gooey-text-morphing";
import { WordRotate } from "../components/ui/word-rotate";
import { GlowingEffect } from "../components/ui/glowing-effect";
import { BorderBeam } from "../components/ui/border-beam";
import { Meteors } from "../components/ui/meteors";
import { Particles } from "../components/ui/particles";
import { EtherealShadow } from "../components/ui/etheral-shadow";
import ShinyText from "../components/ui/ShinyText";
import MagicBento from "../components/ui/MagicBento";
import {
  type EquipmentItem,
  type FaqItem,
  type NavItem,
  type PackageItem,
  type PersonItem,
  type ServiceItem,
} from "../lib/site-data";
import { useIsMobile } from "../lib/use-is-mobile";

declare global {
  interface Window {
    yclients?: { open: () => void };
  }
}

const STAGGER_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const FADE_IN_UP_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const YCLIENTS_URL = "https://w885653.yclients.com";
const YANDEX_MAPS_URL =
  "https://yandex.ru/maps/org/shizi_saund/30833351260/?ll=39.041186%2C45.052213&z=17";
const YANDEX_REVIEWS_WIDGET_URL = "https://yandex.ru/maps-reviews-widget/30833351260?comments";
const YANDEX_MAP_WIDGET_URL =
  "https://yandex.ru/map-widget/v1/org/shizi_saund/30833351260/?ll=39.041186%2C45.052213&z=17";
const VK_URL = "https://vk.com/sheesysound";
const TELEGRAM_URL = "https://t.me/sheesyrecords";
const TELEGRAM_HANDLE = "@sheesyrecords";

const NAV: NavItem[] = [
  { id: "services", label: "Услуги" },
  { id: "packages", label: "Тарифы" },
  { id: "gallery", label: "Галерея" },
  { id: "cases", label: "Портфолио" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES: ServiceItem[] = [
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

const PACKAGES: PackageItem[] = [
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

const PEOPLE: PersonItem[] = [
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

const EQUIPMENT: EquipmentItem[] = [
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

const GALLERY = [
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

const CASES = [
  { title: "Saluki", subtitle: "Продакшн", image: "/cases/saluki.jpg", note: "Продакшн и финальное звучание." },
  { title: "TRUWER", subtitle: "Продакшн", image: "/cases/truewer.jpg", note: "Продакшн и работа над стилем.", objectPosition: "50% 16%" },
  { title: "Gunnr", subtitle: "Продакшн", image: "/cases/gunnr.jpg", note: "Продакшн и контроль вокальной обработки." },
  { title: "Friendly Thugg 52 NGG", subtitle: "Продакшн", image: "/cases/friendly.jpg", note: "Продакшн под стиль и вайб." },
  { title: "Katekey • Johny Core", subtitle: "Продакшн", image: "/cases/katekey_johnycore.jpg", note: "Совместные проекты и звук." },
  { title: "Taxi B", subtitle: "Продакшн", image: "/cases/taxib.jpg", note: "Продакшн и финальная подача." },
];

const FAQ = [
  { q: "Сколько времени занимает запись?", a: "В среднем 2 часа — этого достаточно, чтобы записать полноценный трек." },
  { q: "Сколько делается сведение?", a: "До 7 дней. При срочности — обсудим и ускорим." },
  { q: "Можно без опыта?", a: "Да. Поможем раскрыть голос и объясним процесс по шагам." },
  { q: "Можно срочно?", a: "Да, но сначала нужно обсудить детали и дедлайн." },
  { q: "Как оплатить?", a: "Оплата по СБП." },
  { q: "Есть подарочные сертификаты?", a: "Да, на любую сумму и услугу." },
];

export default function Home() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const isMobile = useIsMobile();

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { scrollYProgress } = useScroll();
  const heroShift = useTransform(scrollYProgress, [0, 0.25], [0, 60]);

  const meta = useMemo(
    () => ({
      title: "Студия звукозаписи в Краснодаре — Шизи Саунд | Запись, Сведение, Бит",
      desc:
        "Профессиональная студия звукозаписи в Краснодаре. Запись вокала, сведение, мастеринг, аранжировки и биты под ключ. Топовое оборудование (Союз 017), полная шумоизоляция и уютная атмосфера. Твой звук — наша работа.",
      url: "https://sheesysound.ru/",
    }),
    []
  );

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Шизи Саунд",
      image: [
        `${meta.url}noroot.png`,
        `${meta.url}photos/hero_purple_room.jpg`
      ],
      "@id": meta.url,
      url: meta.url,
      telephone: "+79604904977",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Героя Сарабеева 9/1",
        addressLocality: "Краснодар",
        postalCode: "350901",
        addressCountry: "RU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 45.052213,
        longitude: 39.041186,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
      priceRange: "1500 - 30000 RUB",
      sameAs: [
        TELEGRAM_URL,
        VK_URL,
        YANDEX_MAPS_URL
      ],
    }),
    [meta.url]
  );

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <meta name="keywords" content="студия звукозаписи краснодар, запись песни краснодар, сведение трека, мастеринг, битмейкер краснодар, запись вокала, аренда студии звукозаписи, звукорежиссер краснодар, песня под ключ" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={meta.url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.desc} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={`${meta.url}noroot.png`} />
        <meta property="business:contact_data:street_address" content="ул. Героя Сарабеева 9/1" />
        <meta property="business:contact_data:locality" content="Краснодар" />
        <meta property="business:contact_data:country_name" content="Russia" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.desc} />
        <meta name="twitter:image" content={`${meta.url}noroot.png`} />

        {/* Geo Tags */}
        <meta name="geo.position" content="45.052213;39.041186" />
        <meta name="geo.placename" content="Краснодар, Россия" />
        <meta name="geo.region" content="RU-KDA" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0F" />
        <link rel="icon" href="/noroot.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-violet-500/30 selection:text-white">
        <BackgroundFX />
        <Header onBook={openBooking} onShowPackages={() => scrollToSection("packages")} />

        <main className="relative">
          <h1 className="sr-only">Студия звукозаписи в Краснодаре — Шизи Саунд</h1>
          <section className="relative pt-28 md:pt-32 pb-14 overflow-hidden">
            <Starfield />
            <div className="mx-auto max-w-6xl px-4 relative">
              <motion.div style={{ y: heroShift }} className="grid gap-10 md:grid-cols-12 items-center">
                <div className="md:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                    <Sparkle />
                    Краснодар • ул. Героя Сарабеева 9/1
                  </div>

                  <div className="mt-5">
                    <div className="h-[84px] md:h-[120px] flex items-center">
                      {isMobile ? (
                        <WordRotate
                          words={["Ты", "Звук", "Искусство"]}
                          duration={2200}
                          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white m-0"
                        />
                      ) : (
                        <GooeyText
                          texts={["Ты", "Звук", "Искусство"]}
                          morphTime={1.2}
                          cooldownTime={0.3}
                          className="font-semibold tracking-tight"
                          textClassName="text-3xl sm:text-4xl md:text-7xl"
                        />
                      )}
                    </div>
                  </div>

                  <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
                    Каждый голос уникален. Наша задача — сделать так, чтобы он звучал дорого, чисто и уверенно.
                    Полная звукоизоляция и специальная акустика, чтобы ты записывался в тишине, комфорте и без лишних взглядов.
                  </p>

                  <div className="mt-7 flex flex-col items-start gap-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <MagneticButton onClick={openBooking} variant="primary">
                        Забронировать онлайн
                      </MagneticButton>
                      <MagneticButton onClick={() => scrollToSection("packages")} variant="ghost">
                        Смотреть цены
                      </MagneticButton>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: "⭐ 5.0", label: "оценка клиентов" },
                        { val: "🔥 60+", label: "проектов/мес" },
                        { val: "💎 TOP", label: "качество звука" }
                      ].map((btn) => (
                        <div key={btn.label} className="flex flex-col items-start justify-center rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 min-w-[130px] backdrop-blur-sm">
                          <div className="text-base md:text-lg font-bold text-white tracking-tight leading-none">{btn.val}</div>
                          <div className="mt-1.5 text-[8px] md:text-[9px] text-white/40 font-semibold uppercase tracking-widest leading-none">{btn.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3 text-white/60 hover:text-white/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    <span className="text-sm tracking-wide font-medium">+7 (960) 490‑49‑77</span>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <HeroCard onBook={openBooking} />
                </div>
              </motion.div>
            </div>
          </section>

          <Section id="services" eyebrow="Услуги" title="Запись • Сведение • Продакшн" subtitle="Профессиональный и детальный подход к каждой секунде звука, подкрепленный искренним вниманием и теплотой к вашему творчеству.">
            <MagicBento
              cardData={SERVICES}
              enableTilt={true}
              enableMagnetism={true}
              enableStars={true}
              glowColor="139, 92, 246" // violet-500 in RGB
              renderCard={(s: ServiceItem, i, cardProps) => (
                <motion.div
                  key={s.title}
                  variants={FADE_IN_UP_VARIANTS}
                  whileHover={{ scale: 1.03 }}
                  {...cardProps}
                  className={`${cardProps.className} relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/40 transition-colors duration-300 flex flex-col`}
                >
                  <div className="flex items-start justify-between gap-4 relative z-10 w-full">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 text-white/50">{s.icon}</div>
                      <div>
                        <div className="text-lg font-medium leading-snug">{s.title}</div>
                        <div className="mt-1 text-sm text-white/60">{s.note}</div>
                      </div>
                    </div>
                    <div className="relative shrink-0">
                      <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85">
                        {s.price}
                      </div>
                      {s.isHot && (
                        <div className="absolute -top-2 -right-2 z-20 flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] badge-hot">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white">
                            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 1.1-.35 3-1.5 3-4 0 1.38 1.5 2 1.5 2s.5-1 .5-2c0-1.38 1.5-2 1.5-2s1 1 1 2.5c0 2.5-3 5-3 8a2.5 2.5 0 0 0 5 0c0-1.5-.5-2.5-1-3.5 1.5 1 3 3 3 5a6 6 0 0 1-12 0c0-1.38.5-2.5 2-4.5.5 1 1 1.5 1 2.5z" />
                          </svg>
                          Хит
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            />

            <div className="mt-7 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 p-5">
              <div className="text-white/75">
                <div className="font-medium text-white">Комфорт и приватность.</div>
                <div className="text-sm">Полная звукоизоляция + акустика под запись и продюсирование.</div>
              </div>
              <MagneticButton onClick={openBooking} variant="primary">
                Открыть бронирование
              </MagneticButton>
            </div>
          </Section>

          <Section id="about" eyebrow="О нас" title="Специалисты" subtitle="Звукорежиссёры, которые доводят до результата.">
            <motion.div
              variants={STAGGER_VARIANTS}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-6 md:grid-cols-2"
            >
              {PEOPLE.map((p) => (
                <motion.div
                  key={p.name}
                  variants={FADE_IN_UP_VARIANTS}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-2/5 aspect-[3/4] sm:aspect-auto sm:min-h-[320px] shrink-0">
                      <Image
                        src={p.photo}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                        quality={68}
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
                      <div className="absolute left-5 bottom-5 sm:hidden">
                        <div className="text-xl font-semibold">{p.name}</div>
                        <div className="text-sm text-white/70">{p.role}</div>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="hidden sm:block mb-3">
                        <div className="text-xl font-semibold">{p.name}</div>
                        <div className="text-sm text-white/70">{p.role}</div>
                      </div>
                      <p className="text-white/70 leading-relaxed text-sm">{p.text}</p>
                      <div className="mt-auto pt-4 flex flex-wrap gap-2">
                        {p.bullets.map((b) => (
                          <span
                            key={b}
                            className="flex h-8 items-center px-4 rounded-full border border-white/10 bg-white/[0.06] text-xs font-medium text-white/80 whitespace-nowrap"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          <Section id="production" eyebrow="Подход" title="Продакшн-подход" subtitle="Вместо «просто записали».">
            <div className="grid gap-8 md:grid-cols-12 items-center">
              <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] h-80 md:h-96 group">
                <Image src="/photos/production_atmosphere.jpg" alt="Production Atmosphere" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 42vw" quality={68} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="md:col-span-7">
                <p className="text-lg md:text-xl leading-relaxed text-white/90">
                  Мы слышим трек целиком: где усилить эмоцию, где убрать лишнее, где сделать плотнее.
                </p>
                <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/90">
                  Сессия проходит комфортно — без давления, но с чётким курсом на конкурентное звучание.
                  Всегда максимально пытаемся помочь при записи, расположить к атмосфере студии, чтобы студия стала вторым домом.
                </p>
                <div className="mt-8 flex gap-4">
                  <MagneticButton onClick={openBooking} variant="primary">
                    Начать работу
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Section>

          <Section id="packages" eyebrow="Тарифы" title="Пакеты услуг" subtitle="Выбирай формат — от быстрого старта до люкса под ключ.">
            <motion.div
              variants={STAGGER_VARIANTS}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 md:grid-cols-3"
            >
              {PACKAGES.map((p) => (
                <PackageCard key={p.tag} p={p} onBook={openBooking} />
              ))}
            </motion.div>
          </Section>

          <Section
            id="gift"
            eyebrow="Подарочный сертификат"
            title="Подарок, который звучит"
            subtitle="Красивое оформление, понятные варианты и вау-эффект."
          >
            <div className="grid gap-6 md:grid-cols-12 items-start">
              <div className="md:col-span-7 space-y-4">
                {[
                  {
                    title: "Сертификат на сумму",
                    price: "Любая сумма",
                    desc: "Выбираешь сумму — мы упакуем в стильный сертификат."
                  },
                  {
                    title: "Сертификат на услугу",
                    price: "от 3000 ₽",
                    desc: "Для тех, кто хочет конкретный результат — без лишних вопросов."
                  }
                ].map((g) => (
                  <motion.div
                    key={g.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">{g.title}</div>
                        <div className="mt-1 text-sm text-white/70">{g.desc}</div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-2xl font-semibold tracking-tight">{g.price}</div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <MagneticButton onClick={openBooking} variant="primary">
                        Забронировать
                      </MagneticButton>
                    </div>

                    <div className="mt-3 text-xs text-white/55">
                      Можно оформить на любую дату и подписать имя получателя.
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="md:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src="/giftcard.jpg" alt="Подарочный сертификат Sheesy Sound" fill className="object-cover" sizes="(max-width: 768px) 100vw, 36vw" quality={68} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </div>
                  <div className="mt-3 text-sm text-white/70">
                    Подарочный сертификат — красиво упакован и готов к вручению.
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="equipment" eyebrow="Оборудование" title="То, чем мы делаем звук" subtitle="Премиум-сборка + точный контроль.">
            <div className="grid gap-4 md:grid-cols-3">
              {EQUIPMENT.map((e) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55 }}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group hover:border-white/30 transition-colors duration-500"
                >
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                  <div className="relative h-60">
                    <Image
                      src={e.photo}
                      alt={e.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 30vw"
                      quality={65}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                    <div className="absolute left-5 bottom-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-2xl filter drop-shadow-md grayscale group-hover:grayscale-0 transition duration-300">{e.icon}</span>
                        <div className="text-lg font-bold tracking-tight text-white">{e.title}</div>
                      </div>
                      <div className="text-sm text-white/70 max-w-[28ch] leading-snug">{e.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 text-sm text-white/60">
              Полная звукоизоляция и специальная акустика: никто не услышит запись — только комфорт и результат.
            </div>
          </Section>

          <Section id="gallery" eyebrow="Фото" title="Атмосфера студии" subtitle="Открывай фото и листай как альбом.">
            <Gallery images={GALLERY} />
          </Section>

          <div id="cases" className="relative w-full overflow-hidden">
            <EtherealShadow
              color="#7c3aed"
              animation={{ scale: 100, speed: 50 }}
              noise={{ opacity: 0.2, scale: 1 }}
              sizing="fill"
              className="px-4 py-14 md:py-16 w-full h-full"
            >
              <div className="mx-auto max-w-6xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.55 }}
                  className="mb-8"
                >
                  <div className="text-xs uppercase tracking-widest text-white/55">Портфолио</div>
                  <h2 className="mt-2 text-2xl md:text-4xl font-semibold tracking-tight">
                    Работали более чем с 200 артистами по всему миру
                  </h2>
                </motion.div>

                <div className="grid gap-4 md:grid-cols-3">
                  {CASES.map((c) => (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.55 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col backdrop-blur-sm"
                    >
                      <div className="relative h-44">
                        <Image
                          src={c.image}
                          alt={c.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                          style={c.objectPosition ? { objectPosition: c.objectPosition } : undefined}
                          sizes="(max-width: 768px) 100vw, 30vw"
                          quality={60}
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/0" />
                        <div className="absolute left-5 bottom-4">
                          <div className="text-base font-semibold">{c.title}</div>
                          <div className="text-sm text-white/70">{c.subtitle}</div>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="text-sm text-white/70">{c.note}</div>
                        <div className="mt-auto pt-4">
                          <MagneticButton onClick={openBooking} variant="soft">
                            Хочу так же
                          </MagneticButton>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-sm text-white/60">
                  А также: Captown, Lustova, Josodo, Блинк, Лялька, Back Prooff, Рома Риччи, Неизвестный — и
                  другими.
                </div>
              </div>
            </EtherealShadow>
          </div>

          <Section id="reviews" eyebrow="Отзывы" title="Отзывы и карта" subtitle="Посмотреть отзывы и построить маршрут — в пару кликов.">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="h-[420px] md:h-[520px] relative">
                  <iframe title="Yandex Map" className="w-full h-full border-0" src={YANDEX_MAP_WIDGET_URL} loading="lazy" />
                  <a
                    href="https://yandex.ru/maps/org/shizi_saund/30833351260/?utm_medium=mapframe&utm_source=maps"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-2 left-2 rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 hover:bg-black/55 transition"
                  >
                    Открыть карту
                  </a>
                </div>
              </div>

              <div className="md:col-span-7 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="h-[420px] md:h-[520px] overflow-hidden relative">
                  <iframe title="Yandex Reviews" className="w-full h-full border-0" src={YANDEX_REVIEWS_WIDGET_URL} loading="lazy" />
                  <a
                    href="https://yandex.ru/maps/org/shizi_saund/30833351260/"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-2 left-0 w-full text-center text-[10px] text-white/40 hover:text-white/60 transition px-4 truncate"
                  >
                    Шизи Саунд на карте Краснодара — Яндекс Карты
                  </a>
                </div>
              </div>
            </div>
          </Section>

          <Section id="faq" eyebrow="FAQ" title="Частые вопросы" subtitle="Открывается только один ответ за раз.">
            <FAQList items={FAQ} />
          </Section>

          <Section id="contacts" eyebrow="Контакты" title="Готов записать трек?" subtitle="Бронирование — в один клик. Остальное сделаем мы.">

            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm text-white/70">Связаться с нами</div>
              <div className="mt-4 flex flex-col gap-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div className="text-lg font-semibold">+7 (960) 490‑49‑77</div>
                </div>

                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </div>
                  <div className="text-white/80 group-hover:text-white transition">
                    Telegram: <span className="font-semibold">{TELEGRAM_HANDLE}</span>
                  </div>
                </a>

                <a href={VK_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition px-[9px]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M13.162 18.994c-6.098 0-9.57-4.172-9.714-11.109h3.047c.101 5.088 2.343 7.243 4.12 7.687V7.885H13.5v4.387c1.714-.184 3.56-2.19 4.167-4.387h2.87c-.456 2.67-2.423 4.673-3.86 5.337 1.437.663 3.692 2.396 4.61 5.772h-3.132c-.716-2.233-2.508-3.95-5.113-4.207v4.207h-1.88z" /></svg>
                  </div>
                  <div className="text-white/80 group-hover:text-white transition">
                    VK: <span className="font-semibold">Шизи Саунд</span>
                  </div>
                </a>
              </div>
              <div className="mt-4">
                <MagneticButton onClick={openBooking} variant="primary">
                  Написать / Забронировать
                </MagneticButton>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-lg font-semibold">Шизи Саунд</div>
                <div className="mt-2 text-sm text-white/65">Краснодар, ул. Героя Сарабеева 9/1</div>
                <div className="mt-5 flex flex-col gap-3">
                  <MagneticButton onClick={openBooking} variant="primary">
                    Забронировать
                  </MagneticButton>
                  <MagneticButton href={YANDEX_MAPS_URL} variant="soft" newTab>
                    Маршрут в Яндекс Картах
                  </MagneticButton>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                  Полная звукоизоляция • Спец. акустика • Оплата по СБП • Сертификаты • Срочные проекты — обсуждаем
                </div>
              </div>

              <ContactCard onBook={openBooking} />
            </div>
          </Section>

          <Footer />
          <BookingModal open={isBookingOpen} onClose={closeBooking} />
        </main>
      </div>
    </>
  );
}

function PackageCard({ p, onBook }: { p: PackageItem; onBook: () => void }) {
  const glow =
    p.accent === "gold"
      ? "border-amber-300/40 bg-gradient-to-b from-amber-300/10 to-yellow-500/10 shadow-[0_0_90px_rgba(255,199,66,0.20)]"
      : p.accent === "pink"
        ? "border-fuchsia-400/40 bg-gradient-to-b from-violet-500/12 to-fuchsia-500/12 shadow-[0_0_70px_rgba(211,75,255,0.18)]"
        : "border-white/10 bg-white/[0.03]";

  const orb =
    p.accent === "gold"
      ? "bg-[radial-gradient(circle_at_30%_30%,rgba(255,210,92,0.28),transparent_55%)]"
      : p.accent === "pink"
        ? "bg-[radial-gradient(circle_at_30%_30%,rgba(211,75,255,0.22),transparent_55%)]"
        : "bg-[radial-gradient(circle_at_30%_30%,rgba(123,63,242,0.16),transparent_55%)]";

  const hoverGlow =
    p.accent === "gold"
      ? "hover:shadow-[0_0_50px_rgba(255,199,66,0.35)]"
      : p.accent === "pink"
        ? "hover:shadow-[0_0_50px_rgba(211,75,255,0.35)]"
        : "hover:shadow-[0_0_50px_rgba(123,63,242,0.30)]";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      whileHover={{ scale: 1.04 }}
      className={["rounded-2xl border p-6 relative overflow-hidden flex flex-col transition-shadow duration-300 cursor-pointer", glow, hoverGlow].join(" ")}
      onClick={onBook}
    >
      <div className={["absolute inset-0 pointer-events-none", orb].join(" ")} />
      {p.accent === "gold" && (
        <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-amber-300/22 blur-3xl" />
      )}

      {p.badge ? (
        <div className="absolute top-4 right-4 z-10">
          <span
            className={[
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-white",
              p.accent === "gold"
                ? "border-amber-300/30 bg-gradient-to-r from-amber-400/20 to-amber-300/10"
                : p.accent === "pink"
                  ? "border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/10"
                  : "border-white/10 bg-white/[0.06] text-white/90",
            ].join(" ")}
          >
            {p.accent === "gold" ? "👑" : "⭐"} {p.badge}
          </span>
        </div>
      ) : null}

      <div className="relative">
        <div className="text-sm text-white/60">{p.tag}</div>
        <div className="mt-1 text-2xl font-semibold">{p.price}</div>
        <div className="mt-2 text-sm text-white/70">{p.subtitle}</div>
      </div>

      <ul className="relative mt-5 space-y-2 text-sm text-white/75">
        {p.bullets.map((b: string) => (
          <li key={b} className="flex items-start gap-2">
            <Check />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-6">
        <MagneticButton
          onClick={onBook}
          variant={p.accent === "gold" ? "gold" : p.accent === "pink" ? "primary" : "soft"}
        >
          {p.cta}
        </MagneticButton>
      </div>
    </motion.div>
  );
}

function FAQList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      }}
      className="grid gap-3 md:grid-cols-2"
    >
      {items.map((x, i) => (
        <FAQItem
          key={x.q}
          q={x.q}
          a={x.a}
          open={openIndex === i}
          onToggle={() => setOpenIndex((v) => (v === i ? null : i))}
        />
      ))}
    </motion.div>
  );
}

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-white/[0.04] transition"
      >
        <span className="font-medium">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.18 }} className="text-white/60">
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-sm text-white/65 leading-relaxed text-left">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Gallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [activeIndex, setActiveIndex] = useState(images.length); // Start in middle segment

  const loopedImages = useMemo(() => [...images, ...images, ...images], [images]);

  const next = () => setActiveIndex((p) => p + 1);
  const prev = () => setActiveIndex((p) => p - 1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const warmup = images.slice(0, 5).map((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });

    const idle = window.setTimeout(() => {
      images.slice(5).forEach((src) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      });
    }, 800);

    return () => {
      window.clearTimeout(idle);
      warmup.length = 0;
    };
  }, [images]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const current = ((activeIndex % images.length) + images.length) % images.length;
    const nearby = [current, (current + 1) % images.length, (current - 1 + images.length) % images.length];

    nearby.forEach((idx) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = images[idx];
    });
  }, [activeIndex, images]);

  // Infinite snapping logic
  useEffect(() => {
    const len = images.length;
    if (activeIndex < len) {
      const t = setTimeout(() => setActiveIndex(activeIndex + len), 300);
      return () => clearTimeout(t);
    }
    if (activeIndex >= len * 2) {
      const t = setTimeout(() => setActiveIndex(activeIndex - len), 300);
      return () => clearTimeout(t);
    }
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="relative w-full h-[650px] flex flex-col items-center justify-center overflow-hidden py-10">
        {/* Main Stack Container - Absolute items inside */}
        <div className="relative w-full h-[450px] flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false}>
            {loopedImages.map((src, i) => {
              const distance = i - activeIndex;
              const absDist = Math.abs(distance);

              // Only render items close to center for performance and stack logic
              if (absDist > 2) return null;

              return (
                <GalleryItem
                  key={`${src}-${i}`}
                  src={src}
                  distance={distance}
                  eager={absDist <= 1}
                  onClick={() => {
                    if (distance === 0) {
                      setModalIdx(i % images.length);
                      setOpen(true);
                    } else {
                      setActiveIndex(i);
                    }
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Circles at Bottom Center */}
        <div className="flex gap-8 mt-16 pb-4">
          <button
            onClick={prev}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 hover:border-white/25 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            onClick={next}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 hover:border-white/25 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[16/10] md:aspect-[4/3] max-h-[80vh]">
                  <Image
                    src={images[modalIdx]}
                    alt="Full view"
                    fill
                    className="object-contain bg-neutral-950"
                    priority
                    quality={72}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    unoptimized
                  />
                </div>
              </div>

              <button
                className="absolute top-4 right-4 md:-top-20 md:-right-4 p-4 rounded-full bg-white/5 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>

              <button className="absolute left-4 top-1/2 -translate-y-1/2 md:-left-32 p-8 rounded-full bg-white/5 hover:bg-white/15 text-white backdrop-blur-sm transition-all hidden sm:block" onClick={() => setModalIdx((v) => (v - 1 + images.length) % images.length)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 md:-right-32 p-8 rounded-full bg-white/5 hover:bg-white/15 text-white backdrop-blur-sm transition-all hidden sm:block" onClick={() => setModalIdx((v) => (v + 1) % images.length)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>

              <div className="mt-12 flex flex-col items-center gap-5">
                <div className="flex gap-3">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setModalIdx(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === modalIdx ? "w-14 bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.6)]" : "w-1.5 bg-white/15 hover:bg-white/30"}`}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-white/20 font-bold tracking-[0.4em] uppercase">
                  {modalIdx + 1} <span className="mx-4 text-white/5">/</span> {images.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GalleryItem({ src, distance, eager, onClick }: { src: string; distance: number; eager: boolean; onClick: () => void }) {
  const absDist = Math.abs(distance);
  const isActive = distance === 0;
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="absolute w-[280px] sm:w-[320px] cursor-pointer origin-center will-change-transform"
      style={{ backfaceVisibility: "hidden" }}
      initial={false}
      animate={{
        x: distance * 180 + (distance > 0 ? 80 : distance < 0 ? -80 : 0),
        scale: isActive ? 1.25 : 0.8,
        zIndex: 100 - absDist * 10,
        opacity: 1 - absDist * 0.35,
        rotateY: distance * -15,
        filter: (!isMobile && absDist > 0) ? `blur(${absDist * 2}px)` : "none",
        z: 0, // Triggers GPU acceleration in Framer Motion
        boxShadow: isActive
          ? "0 60px 120px -30px rgba(0,0,0,0.95), 0 40px 80px -40px rgba(0,0,0,1)"
          : "0 10px 30px rgba(0,0,0,0.4)"
      }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      onClick={onClick}
    >
      <div className={`relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] group/item transition-shadow duration-500`}>
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_45%,transparent_70%)] transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`} />
        <Image
          src={src}
          alt="Studio Photo"
          fill
          className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 640px) 280px, 320px"
          quality={58}
          priority={eager}
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

function ContactCard({ onBook }: { onBook: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [consentChecked, setConsentChecked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="md:col-span-7 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-6"
    >
      <div className="text-xl font-semibold">Быстрая заявка</div>
      <p className="mt-2 text-sm text-white/65">Оставь контакт — мы уточним задачу и предложим лучший формат.</p>

      <form
        className="mt-5 grid gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;

          const fd = new FormData(form);
          const payload = {
            name: String(fd.get("name") || ""),
            contact: String(fd.get("contact") || ""),
            message: String(fd.get("message") || ""),
            consent: fd.get("consent") === "on",
          };

          try {
            setStatus("sending");
            const r = await fetch("/api/lead", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (r.ok) {
              form.reset();
              setConsentChecked(false);
              setStatus("ok");
              setTimeout(() => setStatus("idle"), 2200);
            } else {
              setStatus("err");
              setTimeout(() => setStatus("idle"), 2600);
            }
          } catch {
            setStatus("err");
            setTimeout(() => setStatus("idle"), 2600);
          }
        }}
      >
        <input
          name="name"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-violet-400/40"
          placeholder="Имя"
          required
        />
        <input
          name="contact"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-violet-400/40"
          placeholder="Телефон / Telegram"
          required
        />
        <textarea
          name="message"
          className="w-full min-h-[110px] rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-violet-400/40"
          placeholder="Что нужно? (запись / сведение / под ключ)"
        />

        <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
          <input
            name="consent"
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            onInvalid={(e) =>
              e.currentTarget.setCustomValidity(
                "Чтобы отправить заявку, необходимо согласиться с Политикой конфиденциальности."
              )
            }
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-violet-500"
            required
          />
          <span>
            Я согласен(а) на обработку персональных данных в соответствии с{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-white underline underline-offset-4"
            >
              Политикой конфиденциальности
            </a>
            .
          </span>
        </label>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <MagneticButton onClick={onBook} variant="primary">
            Лучше сразу забронировать
          </MagneticButton>
          <button
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 h-12 text-sm leading-none hover:bg-white/10 transition"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Отправляем..." : status === "ok" ? "Отправлено ✅" : status === "err" ? "Ошибка ❌" : "Отправить заявку"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function Header({ onBook, onShowPackages }: { onBook: () => void; onShowPackages: () => void }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image src="/noroot.png" alt="Шизи Саунд" width={34} height={34} className="opacity-95" />
            <ShinyText
              text="Шизи Саунд"
              disabled={false}
              speed={3}
              className="font-semibold tracking-tight"
            />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="hover:text-white transition">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onBook}
              className="inline-flex items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 px-3 md:px-4 h-9 md:h-10 text-xs md:text-sm leading-none text-white hover:bg-violet-500/20 transition"
            >
              Забронировать
            </button>
            <button
              type="button"
              onClick={onShowPackages}
              className="hidden sm:inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 md:px-4 h-9 md:h-10 text-xs md:text-sm leading-none text-white/80 hover:bg-white/10 transition"
            >
              Цены
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <div className="text-xs uppercase tracking-widest text-white/55">{eyebrow}</div>
          <h2 className="mt-2 text-2xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-3 text-white/65 max-w-2xl">{subtitle}</p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function HeroCard({ onBook }: { onBook: () => void }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[28px] bg-violet-500/10 blur-3xl" />
      <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="relative h-[380px]">
          <Image src="/photos/hero_purple_room.jpg" alt="Studio" fill className="object-cover transition-transform duration-300 group-hover:scale-[1.06]" priority sizes="(max-width: 768px) 100vw, 42vw" quality={78} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/0" />
        </div>

        <div className="p-5">
          <div className="text-sm text-white/70">Профессиональная запись вокала, сведение и продакшн под ключ — от идеи до готового релиза.</div>
          <div className="mt-4 flex gap-3">
            <MagneticButton href="https://t.me/sheesykrd" variant="primary">
              Консультация
            </MagneticButton>
            <MagneticButton href="#equipment" variant="soft">
              Оборудование
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-10 border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-sm text-white/60">© {new Date().getFullYear()} ШИЗИ САУНД • Краснодар, ул. Героя Сарабеева 9/1</div>
        <div className="flex items-center gap-4 text-sm text-white/50">
          <a href="/privacy" className="transition hover:text-white/80">
            Политика конфиденциальности
          </a>
          <span className="text-white/20">•</span>
          <a href="/offer" className="transition hover:text-white/80">
            Публичная оферта
          </a>
        </div>
      </div>
    </motion.footer>
  );
}



function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[min(980px,92vw)] h-[min(760px,86vh)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_60px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="text-sm text-white/80">
            Онлайн‑бронирование
            <span className="ml-2 text-white/45">•</span>
            <span className="ml-2 text-white/60">Sheesy Sound</span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white/80 hover:bg-white/10 transition"
          >
            Закрыть
          </button>
        </div>

        <iframe
          title="YClients booking"
          src={YCLIENTS_URL}
          className="h-[calc(100%-52px)] w-full"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      </div>
    </div>
  );
}


function BackgroundFX() {
  const isMobile = useIsMobile();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(123,63,242,0.22),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(211,75,255,0.16),transparent_42%),radial-gradient(circle_at_60%_90%,rgba(123,63,242,0.14),transparent_45%)]" />
      <motion.div
        className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl"
        animate={{ y: [0, 18, 0], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {!isMobile && (
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.45%22/%3E%3C/svg%3E')]" />
      )}
    </div>
  );
}

function Starfield() {
  const isMobile = useIsMobile();

  const stars = useMemo(() => {
    const n = isMobile ? 12 : 40;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      x: seededUnit(i, n + 1) * 100,
      y: seededUnit(i, n + 2) * 100,
      s: 1 + seededUnit(i, n + 3) * 2.2,
      d: 2 + seededUnit(i, n + 4) * 3.6,
      o: 0.25 + seededUnit(i, n + 5) * 0.65,
    }));
  }, [isMobile]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((st) => (
        <motion.span
          key={st.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, opacity: st.o }}
          animate={isMobile ? {} : { y: [0, -16, 0], opacity: [st.o, Math.min(1, st.o + 0.3), st.o] }}
          transition={{ duration: st.d, repeat: Infinity, ease: "easeInOut", delay: st.id * 0.02 }}
        />
      ))}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.0, 0.10, 0.0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle at 55% 35%, rgba(255,255,255,0.08), transparent 45%)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/40" />
    </div>
  );
}

function MagneticButton({
  href,
  onClick,
  children,
  variant,
  newTab = false,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant: "primary" | "soft" | "ghost" | "gold";
  newTab?: boolean;
  className?: string;
}) {
  const cls =
    variant === "primary"
      ? "border-violet-400/30 bg-violet-600/20 backdrop-blur-md hover:bg-violet-600/30 shadow-[0_0_30px_rgba(139,92,246,0.3)] button-hot-violet button-glass-shine font-semibold"
      : variant === "gold"
        ? "border-amber-300/35 bg-amber-400/10 hover:bg-amber-400/15 shadow-[0_0_70px_rgba(255,199,66,0.22)] button-glass-shine button-glass-shine-gold font-semibold"
        : variant === "soft"
          ? "border-white/10 bg-white/5 hover:bg-white/10 button-glass-shine"
          : "border-white/10 bg-transparent hover:bg-white/5";

  const common = ["inline-flex items-center justify-center rounded-2xl border px-6 h-12 text-sm leading-none whitespace-nowrap transition cursor-pointer", cls, className].join(" ");

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={common}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={common} target={newTab ? "_blank" : undefined} rel={newTab ? "noreferrer" : undefined}>
      {children}
    </a>
  );
}

function Check() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/5">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/80">
      <path
        d="M12 2l1.2 6.2L20 12l-6.8 3.8L12 22l-1.2-6.2L4 12l6.8-3.8L12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function seededUnit(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}
