import Image from "next/image";
import Link from "next/link";
import type {Metadata} from "next";
import { freeSolutions } from "./data";

const canonical="https://autobiz-vb.github.io/free-solutions/";

export const metadata:Metadata={
  title:"Бесплатные решения для бизнеса",
  description:"Бесплатные Google Таблицы, шаблоны и инструкции для учёта, контроля задач и повседневных бизнес-процессов.",
  alternates:{canonical},
  openGraph:{
    title:"Бесплатные решения для бизнеса",
    description:"Готовые таблицы, шаблоны и инструкции, которые можно использовать самостоятельно или адаптировать под свой процесс.",
    url:canonical,
    type:"website",
    locale:"ru_RU",
  },
};

export default function Page(){return <main className="innerPage">
  <header className="innerHeader"><div className="container header"><Link className="brand" href="/"><Image src="/automation-cube.png" width={42} height={42} alt="" unoptimized/><span><b>Автоматизация</b><small>бизнес-процессов</small></span></Link><nav><Link href="/">Главная</Link><Link href="/#services">Услуги</Link><Link className="mobileCaseLink" href="/cases">Кейсы</Link><Link className="active" href="/free-solutions">Бесплатные решения</Link><Link className="navCta" href="/#contact">Обсудить задачу</Link></nav></div></header>
  <section className="catalogHero"><div className="container"><Link className="backLink" href="/">← На главную</Link><p className="kicker">Полезные инструменты</p><h1>Бесплатные решения</h1><p>Готовые таблицы и шаблоны для повседневных бизнес-задач. Откройте карточку, чтобы посмотреть описание и примеры экранов.</p></div></section>
  <section className="section solutionCatalog"><div className="container"><div className="filterRow"><span className="selected">Все решения</span><span>Google Таблицы</span><span>Учёт</span><span>Маркетинг</span></div><div className="solutionCards">{freeSolutions.map((x,i)=><a className="solutionCard" href={`/free-solutions/${x.slug}`} key={x.slug}><div className={`sheetPreview preview${i+1}`}><div className="sheetBar"><i/><i/><i/></div><b>{x.title}</b><div className="sheetRows">{[1,2,3,4].map(n=><span key={n}/>)}</div></div><div className="solutionCardBody"><small>{x.category} · Бесплатно</small><h2>{x.title}</h2><p>{x.short}</p><b>Подробнее о решении →</b></div></a>)}</div></div></section>
  <section className="catalogCta"><div className="container"><div><p className="kicker">Нужна доработка?</p><h2>Адаптирую бесплатное решение под ваш процесс</h2></div><Link className="btn primary" href="/#contact">Обсудить настройку ↗</Link></div></section>
</main>}
