import type { Metadata } from "next";
import "@n8n/chat/style.css";
import "./globals.css";
import ChatWidget from "./ChatWidget";

const YANDEX_METRIKA_ID = 111275010;
const YANDEX_METRIKA_CODE = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

export const metadata: Metadata = {
  metadataBase: new URL("https://autobiz-vb.github.io"),
  title: {
    default: "Автоматизация бизнес-процессов — Google Таблицы, n8n, боты и ИИ",
    template: "%s | Василий",
  },
  description: "Автоматизация бизнес-процессов: Google Таблицы, Apps Script, n8n, Telegram- и VK-боты, ИИ-агенты. Бесплатный аудит.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Автоматизация бизнес-процессов — Google Таблицы, n8n, боты и ИИ",
    description: "Автоматизация учёта, отчётности и рабочих процессов: Google Таблицы, Apps Script, n8n, боты и ИИ.",
    url: "/",
    siteName: "Автоматизация бизнес-процессов",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Автоматизация бизнес-процессов — Google Таблицы, n8n, боты и ИИ",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Автоматизация бизнес-процессов — Google Таблицы, n8n, боты и ИИ",
    description: "Автоматизация учёта, отчётности и рабочих процессов: Google Таблицы, Apps Script, n8n, боты и ИИ.",
    images: ["/og-preview.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          id="yandex-metrika"
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: YANDEX_METRIKA_CODE }}
        />
      </head>
      <body>
        {children}
        <ChatWidget />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
