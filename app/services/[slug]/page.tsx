import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import Gallery from "../Gallery";
import {getServiceDirection, serviceDirections} from "../data";
import SiteFooter from "../../SiteFooter";

export function generateStaticParams(){return serviceDirections.map(item=>({slug:item.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const direction=getServiceDirection(slug);
  if(!direction) return {};
  const canonical=`/services/${direction.slug}`;
  const seo=direction.seo;
  const cover=direction.solutions[0]?.screenshots[0];
  return {
    title:seo?.title||`${direction.title} — Автоматизация бизнес-процессов`,
    description:seo?.description||direction.description,
    alternates:{canonical},
    openGraph:{
      title:seo?.openGraphTitle||direction.title,
      description:seo?.openGraphDescription||direction.description,
      url:canonical,
      type:"article",
      locale:"ru_RU",
      images:cover?[{url:cover.src,width:1600,height:900,alt:cover.alt}]:undefined,
    },
    twitter:{
      card:"summary_large_image",
      title:seo?.openGraphTitle||direction.title,
      description:seo?.openGraphDescription||direction.description,
      images:cover?[cover.src]:undefined,
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

          {solution.details&&<div className="caseStory" aria-label="Как работает система">
            {solution.details.map((detail,index)=><section className="caseStorySection" key={detail.title}>
              <div className="caseStoryNumber" aria-hidden="true">0{index+1}</div>
              <div className="caseStoryBody">
                <p className="kicker">{detail.eyebrow}</p>
                <h3>{detail.title}</h3>
                {detail.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
                {detail.points&&<ul>{detail.points.map(point=><li key={point}>{point}</li>)}</ul>}
              </div>
            </section>)}
          </div>}

          {solution.architecture&&<section className="caseArchitecture" aria-labelledby={`${solution.id}-architecture`}>
            <div className="architectureIntro">
              <p className="kicker">Архитектура решения</p>
              <h3 id={`${solution.id}-architecture`}>{solution.architecture.title}</h3>
              <p>{solution.architecture.description}</p>
              <div className="technologyChips" aria-label="Технологии">{solution.architecture.technologies.map(item=><span key={item}>{item}</span>)}</div>
            </div>
            <ol className="architectureModules">{solution.architecture.modules.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span>{item}</li>)}</ol>
          </section>}

          <div className="galleryHeading"><div><p className="kicker">Рабочие экраны</p><h3>Как выглядит решение</h3></div><span>{solution.screenshots.length} скриншотов</span></div>
          <Gallery shots={solution.screenshots}/>

          <div className="caseCta">
            <div><h3>{solution.cta?.title||(solution.cta?"Получите готовый шаблон":"Хотите похожую систему для своего бизнеса?")}</h3><p>{solution.cta?.text||(solution.cta?"Посмотрите подробное описание бесплатного решения и все условия использования.":"Проведу бесплатный аудит процесса и предложу подходящую структуру решения.")}</p></div>
            <a className="btn primary" href={solution.cta?.href||"/#contact"}>{solution.cta?.label||"Обсудить задачу"} ↗</a>
          </div>
        </div>
      </article>)}
    </div>

    <SiteFooter/>
  </main>
}
