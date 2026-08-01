"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect,useState} from "react";
import CaseCard from "./CaseCard";
import {caseCatalog,caseCategoryLabels,type CaseCategory} from "../services/data";

type SelectedCategory = "all" | CaseCategory;

const filters: {value:SelectedCategory;label:string}[] = [
  {value:"all",label:"Все кейсы"},
  {value:"insurance",label:caseCategoryLabels.insurance},
  {value:"finance",label:caseCategoryLabels.finance},
  {value:"marketplaces",label:caseCategoryLabels.marketplaces},
  {value:"small-business",label:caseCategoryLabels["small-business"]},
  {value:"personal",label:caseCategoryLabels.personal},
];

const isCategory=(value:string|null):value is CaseCategory=>
  value!==null&&filters.some(filter=>filter.value===value&&filter.value!=="all");

function categoryFromLocation():SelectedCategory{
  if(typeof window==="undefined") return "all";
  const value=new URLSearchParams(window.location.search).get("category");
  return isCategory(value)?value:"all";
}

export default function CasesPageClient(){
  const [menu,setMenu]=useState(false);
  const [category,setCategory]=useState<SelectedCategory>("all");

  useEffect(()=>{
    const sync=()=>setCategory(categoryFromLocation());
    sync();
    window.addEventListener("popstate",sync);
    return()=>window.removeEventListener("popstate",sync);
  },[]);

  function selectCategory(next:SelectedCategory){
    setCategory(next);
    const url=next==="all"?"/cases":`/cases?category=${next}`;
    window.history.pushState({},"",url);
  }

  const visible=category==="all"?caseCatalog:caseCatalog.filter(item=>item.category===category);

  return <main className="innerPage casesPage">
    <header className="innerHeader"><div className="container header">
      <Link className="brand" href="/" aria-label="На главную"><Image src="/automation-cube.png" width={42} height={42} alt="" unoptimized/><span><b>Автоматизация</b><small>бизнес-процессов</small></span></Link>
      <button className="menu" type="button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Открыть меню">☰</button>
      <nav className={menu?"open":""} aria-label="Основная навигация"><Link href="/">Главная</Link><Link href="/#services">Услуги</Link><Link className="active" href="/cases" aria-current="page">Кейсы</Link><Link href="/free-solutions">Бесплатные решения</Link><Link className="navCta" href="/#contact">Обсудить задачу</Link></nav>
    </div></header>

    <section className="casesHero"><div className="container">
      <Link className="backLink" href="/">← На главную</Link>
      <p className="kicker">Кейсы</p>
      <h1>Реальные проекты автоматизации</h1>
      <p>Задачи, решения и результаты внедрения систем для учёта, аналитики и управления бизнес-процессами.</p>
    </div></section>

    <section className="section casesCatalog" aria-labelledby="cases-list-title"><div className="container">
      <h2 className="visuallyHidden" id="cases-list-title">Каталог кейсов</h2>
      <nav className="caseFilters" aria-label="Фильтр кейсов">
        {filters.map(filter=>{
          const href=filter.value==="all"?"/cases":`/cases?category=${filter.value}`;
          const active=category===filter.value;
          return <Link key={filter.value} href={href} className={active?"active":""} aria-current={active?"page":undefined} onClick={event=>{event.preventDefault();selectCategory(filter.value)}}>{filter.label}</Link>;
        })}
      </nav>
      {visible.length?<div className="casesGrid">{visible.map(item=><CaseCard item={item} key={item.id}/>)}</div>:<div className="casesEmpty"><span aria-hidden="true">＋</span><h2>В этой категории кейсы скоро появятся</h2><p>Новые проекты будут добавлены без изменения структуры каталога.</p></div>}
    </div></section>

    <section className="catalogCta"><div className="container"><div><p className="kicker">Есть похожая задача?</p><h2>Разберём процесс и подберём подходящее решение</h2></div><Link className="btn primary" href="/#contact">Обсудить задачу ↗</Link></div></section>
    <footer><div className="container"><div>© 2026 Автоматизация бизнес-процессов</div><div><a href="https://t.me/VasiliyPF" target="_blank" rel="noreferrer">Telegram</a><a href="https://vk.com/autobizvb" target="_blank" rel="noreferrer">ВКонтакте</a></div></div></footer>
  </main>;
}
