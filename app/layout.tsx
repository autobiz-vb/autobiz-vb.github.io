import type { Metadata } from "next";
import "@n8n/chat/style.css";\nimport "./globals.css";\nimport ChatWidget from "./ChatWidget";

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
      <body>\n        {children}\n        <ChatWidget />\n      </body>
    </html>
  );
}
