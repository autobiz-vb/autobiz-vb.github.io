import Image from "next/image";
import Link from "next/link";

export default function SiteFooter(){
  return <footer className="siteFooter"><div className="container footerGrid">
    <div className="brand"><Image src="/favicon.svg" width={42} height={42} alt="" unoptimized/><span><b>Автоматизация</b><small>бизнес-процессов</small></span></div>
    <div className="footerInfo"><p>Google Таблицы · Apps Script · n8n · Боты · ИИ</p><small>© 2026 Автоматизация бизнес-процессов</small></div>
    <nav className="footerLinks" aria-label="Ссылки в подвале сайта">
      <div><a href="https://t.me/VasiliyPF" target="_blank" rel="noreferrer">Telegram</a><a href="https://vk.com/autobizvb" target="_blank" rel="noreferrer">ВКонтакте</a></div>
      <div className="legalLinks"><Link href="/personal-data-consent">Согласие на обработку персональных данных</Link><Link href="/privacy-policy">Политика в отношении обработки персональных данных</Link></div>
    </nav>
  </div></footer>;
}
