import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import Gallery from "../Gallery";
import {getServiceDirection, serviceDirections} from "../data";

export function generateStaticParams(){return serviceDirections.map(item=>({slug:item.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const direction=getServiceDirection(slug);
  if(!direction) return {};
  const canonical=`https://autobiz-vb.github.io/services/${direction.slug}/`;
  return {
    title:direction.title,
    description:direction.description,
    alternates:{canonical},
    openGraph:{
      title:direction.title,
      description:direction.description,
      url:canonical,
      type:"website",
      locale:"ru_RU",
    },
  };
}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const direction=getServiceDirection(slug);
  if(!direction) notFound();

  return <main className={`innerPage directionPage ${direction.accent}`}>
    <header className="innerHeader"><div className="container header">
      <Link className="brand" href="/"><Image src="/automation-cube.png" width={42} height={42} alt="" unoptimized/><span><b>Автоматизация</b><small>бизнес-процессов</small></span></Link>
      <nav><Link href="/">Главная</Link><Link href="/#services">Услуги</Link><Link className="mobileCaseLink" href="/cases">Кейсы</Link><Link href="/free-solutions">Бесплатные решения</Link><Link className="navCta" href="/#contact">Обсудить задачу</Link></nav>
    </div></header>

    <section className="directionHero"><div className="container">
      <Link className="backLink" href="/cases">← Все кейсы</Link>
      <p className="kicker">{direction.eyebrow}</p>
      <h1>{direction.title}</h1>
      <p>{direction.description}</p>
      <a className="btn primary" href="#projects">Посмотреть решения ↓</a>
    </div></section>

    <div id="projects">
      {direction.solutions.map((solution,index)=><article className="projectCase" id={solution.id} key={solution.id}>
        <div className="container">
          {direction.solutions.length>1&&<p className="caseSequence">Решение {index+1} из {direction.solutions.length}</p>}
          <div className="caseTitleRow">
            <div><span className={`statusBadge ${solution.status}`}>{solution.statusLabel}</span><h2>{solution.title}</h2><p>{solution.intro}</p></div>
            {solution.metrics&&<div className="caseMetrics">{solution.metrics.map(metric=><strong key={metric}>{metric}</strong>)}</div>}
          </div>

          <div className="caseContentGrid">
            <section><h3>{solution.problemTitle}</h3><ul>{solution.problems.map(item=><li key={item}>{item}</li>)}</ul></section>
            <section><h3>Что автоматизировано</h3><ul>{solution.automation.map(item=><li key={item}>{item}</li>)}</ul></section>
          </div>

          <div className="implementationNote"><div><small>Пример решения</small><p>{solution.implementation}</p></div><div><small>Результат</small><p>{solution.result}</p></div></div>
          {solution.note&&<p className="truthNote">{solution.note}</p>}

          <div className="galleryHeading"><div><p className="kicker">Рабочие экраны</p><h3>Как выглядит решение</h3></div><span>{solution.screenshots.length} скриншотов</span></div>
          <Gallery shots={solution.screenshots}/>

          <div className="caseCta">
            <div><h3>{solution.cta?"Получите готовый шаблон":"Хотите похожую систему для своего бизнеса?"}</h3><p>{solution.cta?"Посмотрите подробное описание бесплатного решения и все условия использования.":"Проведу бесплатный аудит процесса и предложу подходящую структуру решения."}</p></div>
            <a className="btn primary" href={solution.cta?.href||"/#contact"}>{solution.cta?.label||"Обсудить задачу"} ↗</a>
          </div>
        </div>
      </article>)}
    </div>

    <footer><div className="container"><div>© 2026 Автоматизация бизнес-процессов</div><div><a href="https://t.me/VasiliyPF" target="_blank" rel="noreferrer">Telegram</a><a href="https://vk.com/autobizvb" target="_blank" rel="noreferrer">ВКонтакте</a></div></div></footer>
  </main>
}
