import Image from "next/image";
import Link from "next/link";
import SiteFooter from "./SiteFooter";

export default function LegalPage({title,updated,children}:{title:string;updated:string;children:React.ReactNode}){
  return <main className="innerPage legalPage">
    <header className="innerHeader"><div className="container header">
      <Link className="brand" href="/"><Image src="/favicon.svg" width={42} height={42} alt="" unoptimized/><span><b>Автоматизация</b><small>бизнес-процессов</small></span></Link>
      <nav><Link href="/">Главная</Link><Link href="/cases">Кейсы</Link><Link href="/free-solutions">Бесплатные решения</Link><Link className="navCta" href="/#contact">Обсудить задачу</Link></nav>
    </div></header>
    <section className="legalHero"><div className="container"><Link className="backLink" href="/">← На главную</Link><p className="kicker">Правовая информация</p><h1>{title}</h1><p>Редакция от {updated}</p></div></section>
    <article className="legalContent container">{children}</article>
    <SiteFooter/>
  </main>;
}
