"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import CaseCard from "./cases/CaseCard";
import {caseCatalog} from "./services/data";
import SiteFooter from "./SiteFooter";
import {trackVkGoal} from "./VkPixel";

const services = [
  {title:"Учёт, расчёты и отчётность",tech:"Google Таблицы и Apps Script",icon:"▦",accent:"green",description:"Автоматизация учёта, расчётов, документов и регулярной отчётности.",tasks:["расчёт выплат и комиссий","контроль продаж и остатков","автоматическое формирование отчётов"],intro:"Автоматизирую процессы, которые сейчас ведутся вручную в таблицах, блокнотах, чатах или нескольких несвязанных файлах.",solve:["управленческий и финансовый учёт","расчёт зарплат, процентов, комиссий и взаиморасчётов","учёт продаж, расходов, товаров и остатков","автоматическое формирование ежедневных и ежемесячных отчётов","сбор данных через удобные веб-формы","загрузка данных из маркетплейсов, банков и других систем","автоматическая проверка ошибок и расхождений","отправка уведомлений и готовых отчётов"],examples:["отчёт руководителя с основными показателями","расчёт выплат сотрудникам или исполнителям","складской учёт и контроль остатков","сверка банковских поступлений с продажами","автоматическая обработка реестров","мобильная форма для внесения данных сотрудниками"],result:["меньше ручного заполнения","снижение количества ошибок","единые и актуальные данные","быстрый контроль бизнеса","экономия времени сотрудников","понятная система вместо множества файлов"],price:"Небольшие доработки — от 1 000 ₽. Простая автоматизация — от 2 000 ₽"},
  {title:"Интеграция сервисов и процессов",tech:"Автоматизация в n8n",icon:"⌁",accent:"violet",description:"Связываю используемые сервисы и выстраиваю автоматический обмен данными между ними.",tasks:["передача заявок между сервисами","автоматические уведомления","обработка данных по заданному сценарию"],intro:"Настраиваю автоматический обмен данными между таблицами, формами, CRM, мессенджерами, почтой и другими сервисами.",solve:["передача заявок из форм и мессенджеров в рабочую систему","синхронизация данных между разными сервисами","запуск действий по событию или расписанию","автоматическая отправка уведомлений и отчётов","обработка входящих писем, файлов и данных","построение многоэтапных бизнес-процессов","контроль ошибок и повторный запуск операций"],examples:["заявка с сайта автоматически попадает в таблицу или CRM","после новой заявки менеджер получает уведомление","данные из нескольких источников собираются в единый отчёт","документы автоматически сохраняются и передаются ответственному","регулярный процесс запускается без участия сотрудника"],result:["меньше ручного копирования данных","сервисы работают как единая система","сокращается время обработки заявок","снижается риск пропущенных действий","процесс легче контролировать и масштабировать"],price:"Простая автоматизация — от 2 000 ₽"},
  {title:"Боты для клиентов и сотрудников",tech:"Telegram- и VK-боты",icon:"◉",accent:"blue",description:"Создаю ботов для приёма заявок, консультаций, сбора данных и внутренних задач.",tasks:["приём и распределение заявок","ответы на частые вопросы","формы и уведомления для сотрудников"],intro:"Создаю Telegram- и VK-ботов, которые помогают принимать обращения, собирать данные, выдавать информацию и автоматизировать повторяющиеся действия.",solve:["приём заявок и первичная квалификация клиента","ответы на частые вопросы","сбор данных через последовательный диалог","запись на услугу или консультацию","уведомления о статусе заявки","выдача инструкций, документов и материалов","внутренние запросы и отчёты для сотрудников","передача информации менеджеру или в рабочую систему"],examples:["бот принимает заявку и передаёт её ответственному","клиент самостоятельно получает нужную информацию","сотрудник вносит рабочие данные через бот","руководитель запрашивает краткий отчёт","бот напоминает о задаче или изменении статуса"],result:["обращения принимаются круглосуточно","сотрудники меньше отвлекаются на типовые вопросы","данные собираются в едином формате","заявки быстрее передаются в работу","клиент получает более быстрый ответ"],price:"Разработка бота — от 5 000 ₽"},
  {title:"Обработка информации с помощью ИИ",tech:"ИИ-боты и ИИ-агенты",icon:"✦",accent:"orange",description:"Внедряю ИИ для анализа документов, обработки обращений и подготовки информации.",tasks:["разбор документов и сообщений","подготовка ответов и материалов","поиск и структурирование информации"],intro:"Использую ИИ там, где нужно понимать текст, документы и обращения, находить нужную информацию или готовить результат по заданным правилам.",solve:["анализ и классификация входящих сообщений","извлечение данных из документов","подготовка черновиков ответов","поиск информации в базе знаний","краткое изложение больших документов","сравнение данных и выявление расхождений","распределение обращений по темам","создание ИИ-помощников для сотрудников"],examples:["ИИ разбирает обращение и определяет его тему","из документа извлекаются нужные реквизиты","сотрудник получает ответ на основе внутренней базы знаний","длинный отчёт преобразуется в краткую сводку","обращения автоматически сортируются и передаются ответственным"],result:["быстрее обрабатываются большие объёмы информации","сокращается количество однотипной ручной работы","сотрудникам проще находить нужные сведения","ускоряется подготовка ответов и документов","сохраняется единый подход к обработке данных"],price:"ИИ-решения — от 5 000 ₽"},
];
const industries = [
  {
    title:"Страховые агентства",
    href:"/cases?category=insurance",
    problems:["ручной расчёт комиссий и выплат","разрозненные реестры и отчёты","сложно проверить цепочку расчёта"],
    result:"Единая система взаиморасчётов, правил и контроля.",
  },
  {
    title:"Финансы и управленческий учёт",
    href:"/cases?category=finance",
    problems:["нет единой картины по проектам","данные учёта и управления разделены","много ручных сверок и отчётов"],
    result:"Актуальный финансовый результат по бизнесу и направлениям.",
  },
  {
    title:"Маркетплейсы",
    href:"/cases?category=marketplaces",
    problems:["данные находятся в разных таблицах","формулы замедляют рабочие файлы","решения по ценам и поставкам запаздывают"],
    result:"Быстрая аналитика продаж, прибыли, рекламы и остатков.",
  },
  {
    title:"Малый бизнес и частная практика",
    href:"/cases?category=small-business",
    problems:["операции и документы хранятся в разных местах","не виден фактический финансовый результат","легко пропустить чек, налог или лимит"],
    result:"Простой ежедневный учёт и понятный контроль денег.",
  },
];
const steps = [
  {
    title:"Знакомство и диагностика",
    description:"Вы рассказываете о задаче и обо всём, что хотели бы автоматизировать, даже если пока кажется, что это невозможно. Я изучаю текущие процессы, таблицы и источники данных, оцениваю возможности и предлагаю варианты решения.",
    label:"Первичная диагностика бесплатно",
  },
  {
    title:"Проектирование решения",
    description:"Определяем, что и как будет автоматизировано. Согласовываем логику, состав работ, ожидаемый результат, сроки и стоимость. При необходимости я самостоятельно составляю техническое задание на основе нашей беседы.",
    label:"Всё согласовано до начала разработки",
  },
  {
    title:"Разработка",
    description:"Создаю решение поэтапно и показываю промежуточные версии. Вы видите, как формируется система, и можете внести уточнения ещё до завершения работы.",
    label:"Промежуточные результаты",
  },
  {
    title:"Проверка и запуск",
    description:"Проверяем систему на реальных рабочих сценариях, устраняем замечания и переносим готовое решение в рабочую среду.",
    label:"Проверка перед внедрением",
  },
  {
    title:"Передача и поддержка",
    description:"Передаю инструкции, объясняю порядок работы и остаюсь на связи после запуска. Дальнейшая поддержка и развитие системы обсуждаются отдельно.",
    label:"Не остаётесь один на один с системой",
  },
];

const concerns = [
  {
    title:"Я боюсь потерять контроль",
    answer:<><span>При переходе от формул к скриптам </span><strong>контроль не исчезает</strong><span>. В системе можно предусмотреть </span><strong>журналы действий, статусы, сверки и уведомления</strong><span>. Вы видите, что было сделано, какие данные использованы и где возникло отклонение.</span></>,
    label:"Все действия можно проверить",
  },
  {
    title:"Я не знаю, что можно автоматизировать",
    answer:<><span>Вам не нужно разбираться в технологиях или </span><strong>самостоятельно придумывать решение</strong><span>. Расскажите, </span><strong>что отнимает время</strong><span> и как должен выглядеть идеальный процесс. Я найду возможные точки автоматизации и предложу варианты.</span></>,
    label:"Идею решения беру на себя",
  },
  {
    title:"У нас и так уже многое автоматизировано",
    answer:<><span>Формулы часто автоматизируют </span><strong>только отдельные расчёты</strong><span>. Дополнительно можно настроить </span><strong>сбор и проверку данных</strong><span>, формирование отчётов, уведомления, поиск ошибок и обмен информацией между системами.</span></>,
    label:"Автоматизировать можно больше",
  },
  {
    title:"Вдруг новая система окажется слишком сложной",
    answer:<><span>Решение создаётся </span><strong>под привычный порядок работы</strong><span> и внедряется поэтапно. Мы проверяем его </span><strong>на реальных данных</strong><span>, вносим уточнения, а после запуска я передаю инструкции и остаюсь на связи.</span></>,
    label:"Понятное внедрение без резких изменений",
  },
];

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [activeService,setActiveService]=useState<number|null>(null);
  const lastTrigger=useRef<HTMLElement|null>(null);
  const processRef=useRef<HTMLElement|null>(null);
  const concernsRef=useRef<HTMLElement|null>(null);
  const [state,setState]=useState<"idle"|"sending"|"sent"|"error">("idle");
  useEffect(()=>{
    const section=processRef.current;
    if(!section||!("IntersectionObserver" in window)) return;
    section.classList.add("processMotion");
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting) return;
      section.classList.add("processVisible");
      observer.disconnect();
    },{threshold:.16});
    observer.observe(section);
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    const section=concernsRef.current;
    if(!section||!("IntersectionObserver" in window)) return;
    section.classList.add("concernsMotion");
    const items=Array.from(section.querySelectorAll<HTMLElement>(".concernReveal"));
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("concernVisible");
        observer.unobserve(entry.target);
      });
    },{threshold:.01,rootMargin:"120px 0px"});
    items.forEach(item=>observer.observe(item));
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(activeService===null) return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const close=(e:globalThis.KeyboardEvent)=>{if(e.key==="Escape") setActiveService(null)};
    window.addEventListener("keydown",close);
    return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",close);lastTrigger.current?.focus()};
  },[activeService]);
  function openService(index:number,trigger:HTMLElement){lastTrigger.current=trigger;setActiveService(index)}
  function cardKey(e:KeyboardEvent<HTMLElement>,index:number){if(e.key==="Enter"||e.key===" "){e.preventDefault();openService(index,e.currentTarget)}}
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setState("sending"); const form=e.currentTarget;
    try{
      const r=await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))});
      if(!r.ok) throw new Error(); trackVkGoal("lead_submit_success"); form.reset(); setState("sent");
    }catch{setState("error")}
  }
  return <main>
    <header><div className="container header">
      <a className="brand" href="#top"><Image src="/favicon.svg" width={42} height={42} alt="Логотип автоматизации бизнес-процессов" unoptimized/><span><b>Автоматизация</b><small>бизнес-процессов</small></span></a>
      <button className="menu" onClick={()=>setMenu(!menu)} aria-label="Меню">☰</button>
      <nav className={menu?"open":""}><a href="#services">Услуги</a><a href="#solutions">Решения</a><Link href="/free-solutions">Бесплатные решения</Link><Link href="/cases">Кейсы</Link><a href="#about">Обо мне</a><a className="navCta" href="#contact">Обсудить задачу</a></nav>
    </div></header>

    <section className="hero" id="top"><div className="container heroGrid">
      <div className="heroCopy"><p className="eyebrow">● Современная автоматизация без лишней сложности</p><h1>Освобождаю бизнес от <span>ручной работы</span></h1><p className="lead">Создаю системы учёта и аналитики, интеграции в n8n, Telegram- и VK-ботов, решения с искусственным интеллектом.</p><div className="actions"><a className="btn primary" href="#contact">Обсудить задачу ↗</a><a className="btn ghost" href="#solutions">Посмотреть решения</a></div><div className="trust"><span>✓ Бесплатный аудит</span><span>✓ Понятная документация</span><span>✓ Поддержка после запуска</span></div></div>
      <div className="visual"><Image src="/automation-cube.webp" width={1080} height={1080} alt="Google Таблицы, n8n и бот в единой системе" priority unoptimized/><div className="orbit"><i className="chip c1">● Google Таблицы</i><i className="chip c2">● n8n</i><i className="chip c3">● Боты</i><i className="chip c4">● ИИ-агенты</i></div></div>
    </div><div className="container stack">Google Sheets <i/> Apps Script <i/> n8n <i/> Telegram <i/> VK <i/> AI</div></section>

    <section className="section" id="services"><div className="container">
      <div className="sectionHead"><div><p className="kicker">Возможности</p><h2>Автоматизация под задачу,<br/>а не ради технологии</h2></div><p>Сначала разбираю процесс, затем выбираю инструменты, которые дадут понятный и измеримый результат.</p></div>
      <div className="serviceGrid">{services.map((service,i)=><article className={`service ${service.accent}`} key={service.title} role="button" tabIndex={0} aria-haspopup="dialog" onClick={e=>openService(i,e.currentTarget)} onKeyDown={e=>cardKey(e,i)}>
        <div className="serviceTop"><span className="serviceIcon" aria-hidden="true">{service.icon}</span><small>0{i+1}</small></div>
        <h3>{service.title}</h3><h4>{service.tech}</h4><p>{service.description}</p>
        <ul>{service.tasks.map(task=><li key={task}>{task}</li>)}</ul>
        <span className="servicePrice">Стоимость рассчитывается по задаче</span><span className="serviceMore">Подробнее <b>→</b></span>
      </article>)}</div>
      <div className="audit"><span>◎</span><div><small>Не знаете, с чего начать?</small><b>Проведу бесплатный аудит процесса</b></div><a href="#contact">Записаться на аудит →</a></div>
    </div></section>
    {activeService!==null&&<div className="modalBackdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setActiveService(null)}}>
      <section className={`serviceModal ${services[activeService].accent}`} role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
        <button className="modalClose" type="button" aria-label="Закрыть окно" onClick={()=>setActiveService(null)}>×</button>
        <div className="modalHeading"><span className="serviceIcon" aria-hidden="true">{services[activeService].icon}</span><div><small>{services[activeService].tech}</small><h2 id="service-modal-title">{services[activeService].title}</h2></div></div>
        <p className="modalIntro">{services[activeService].intro}</p>
        <div className="modalColumns">
          <div><h3>Какие задачи можно решить</h3><ul>{services[activeService].solve.map(x=><li key={x}>{x}</li>)}</ul></div>
          <div><h3>Примеры решений</h3><ul>{services[activeService].examples.map(x=><li key={x}>{x}</li>)}</ul></div>
        </div>
        <div className="modalResult"><h3>Какой результат получает клиент</h3><ul>{services[activeService].result.map(x=><li key={x}>{x}</li>)}</ul></div>
        <div className="modalPrice"><small>Стоимость</small><strong>{services[activeService].price}</strong><p>Точная стоимость определяется после краткого обсуждения задачи.</p></div>
        <div className="modalActions"><a className="btn primary" href="#contact" onClick={()=>setActiveService(null)}>Обсудить задачу ↗</a><a className="btn modalGhost" href="/cases" onClick={()=>setActiveService(null)}>Посмотреть примеры работ</a></div>
      </section>
    </div>}

    <section className="section dark" id="solutions"><div className="container"><p className="kicker">Отраслевые решения</p><h2>Задачи бизнеса,<br/><span>которые я уже помог решить</span></h2><div className="industryGrid">{industries.map((item,i)=><a href={item.href} className="industryCard" key={item.title}><div className="industryNumber">0{i+1}</div><div><h3>{item.title}</h3><ul>{item.problems.map(problem=><li key={problem}>{problem}</li>)}</ul><p><strong>Результат:</strong> {item.result}</p><span>Смотреть кейсы <b>→</b></span></div></a>)}</div><div className="allCasesAction"><a className="btn outlineLight" href="/cases">Смотреть все кейсы →</a></div></div></section>

    <section className="section catalog" id="free"><div className="container catalogGrid">
      <div className="catalogIntro"><p className="kicker">Каталог</p><h2>Начните с готового решения</h2><p>Бесплатные таблицы, инструкции и готовые продукты, которые можно адаптировать под ваш бизнес.</p><a href="#contact">Подобрать решение →</a></div>
      <Link className="product free" href="/free-solutions"><small>Бесплатно</small><span>▦</span><h3>Бесплатные решения</h3><p>Таблицы, чек-листы, инструкции и полезные инструменты.</p><b>Открыть каталог →</b></Link>
      <article className="product paid"><small>С настройкой</small><span>⌁</span><h3>Готовые продукты</h3><p>Проверенные системы, которые можно быстро адаптировать.</p><b>Подбор под вашу задачу</b></article>
    </div></section>

    <section className="section process" ref={processRef} aria-labelledby="process-title"><div className="container">
      <div className="processHead"><p className="kicker">Как проходит работа</p><h2 id="process-title">От задачи — к понятной и работающей системе</h2><p>Поэтапно согласовываем решение, проверяем его на реальных данных и только после этого запускаем в работу.</p></div>
      <div className="steps">{steps.map((step,i)=><article className="processCard" key={step.title} style={{"--step-delay":`${i*125}ms`} as React.CSSProperties}>
        <div className="processSequence" aria-hidden="true"><span>0{i+1}</span><i/></div>
        <h3>{step.title}</h3><p>{step.description}</p><strong>{step.label}</strong>
      </article>)}</div>
      <div className="processAction"><a className="btn primary" href="#contact">Обсудить мою задачу</a></div>
    </div></section>

    <section className="section concerns" id="cases" ref={concernsRef} aria-labelledby="concerns-title"><div className="container">
      <div className="concernsGrid">
        <div className="concernsIntro concernReveal" style={{"--concern-delay":"0ms"} as React.CSSProperties}>
          <p className="kicker">Автоматизация без потери контроля</p>
          <h2 id="concerns-title">Автоматизация не скрывает процессы — она делает их понятнее</h2>
          <p>Я создаю системы, в которых можно видеть результаты, проверять данные, отслеживать ошибки и понимать, как работает каждый важный процесс.</p>
          <a className="btn primary" href="#contact">Рассказать о своей задаче</a>
        </div>
        <div className="concernCards">{concerns.map((item,i)=><article className="concernCard concernReveal" key={item.title} style={{"--concern-delay":`${(i+1)*135}ms`} as React.CSSProperties}>
          <div className="concernTop"><span aria-hidden="true">0{i+1}</span><small>Сомнение клиента</small></div>
          <h3>«{item.title}»</h3>
          <p>{item.answer}</p>
          <strong className="concernLabel">{item.label}</strong>
        </article>)}</div>
      </div>
      <aside className="concernsNote concernReveal" style={{"--concern-delay":"675ms"} as React.CSSProperties}>Расскажите не только о текущих проблемах, но и <strong>обо всём, что хотелось бы автоматизировать</strong>. Даже если кажется, что это невозможно, — современные технологии позволяют реализовать гораздо больше, чем многие предполагают.</aside>
      <div className="projectsHead"><p className="kicker">Реализованные проекты</p><h2>Посмотрите, как эти принципы работают на практике.</h2></div>
      <div className="featuredCases">{caseCatalog.filter(item=>item.featured).map((item,i)=><CaseCard item={item} className="concernReveal featuredCase" delay={`${i*135}ms`} key={item.id}/>)}</div>
      <div className="allCasesAction lightAction"><a className="btn ghostBlue" href="/cases">Смотреть все кейсы →</a></div>
    </div></section>

    <section className="section dark" id="about"><div className="container aboutGrid"><div className="aboutVisual"><Image src="/automation-cube.webp" width={1080} height={1080} alt="Автоматизация бизнес-процессов" unoptimized/></div><div className="aboutCopy"><h2>Василий — автоматизация с пониманием бизнеса</h2><p>Вам не нужно заранее составлять техническое задание или продумывать готовое решение. Достаточно рассказать, <strong>как сейчас устроена работа, что мешает и какой результат вы хотите получить</strong>. Я быстро погружаюсь в задачу, уточняю важные детали и перевожу ваши пожелания в понятную логику будущей системы.</p><p>Создаю не отдельные скрипты ради автоматизации, а <strong>целостные рабочие системы под реальные процессы бизнеса</strong>. Они собирают и проверяют данные, выполняют нужные операции, показывают отклонения и сохраняют контроль. В результате решение упрощает работу, <strong>устраняет конкретные проблемы и даёт понятный, проверяемый результат</strong>.</p><div className="badges"><span>Системный подход</span><span>Реальные данные</span><span>Поддержка после запуска</span></div></div></div></section>

    <section className="section contact" id="contact"><div className="container contactGrid"><div><p className="kicker">Обсудим задачу</p><h2>Какой процесс отнимает больше всего времени?</h2><p>Опишите ситуацию — я предложу подходящие варианты автоматизации.</p><div className="social"><a href="https://t.me/VasiliyPF" target="_blank" rel="noreferrer"><b>➤</b><span><small>Написать в</small>Telegram</span>↗</a><a href="https://vk.com/autobizvb" target="_blank" rel="noreferrer"><b>VK</b><span><small>Написать во</small>ВКонтакте</span>↗</a></div></div>
      <form onSubmit={submit}><div className="formRow"><label>Ваше имя<input name="name" placeholder="Как к вам обращаться" required/></label><label>Компания или сфера<input name="company" placeholder="Например, страхование"/></label></div><div className="formRow"><label>Способ связи<select name="contactMethod"><option>Telegram</option><option>ВКонтакте</option><option>Телефон</option><option>Email</option></select></label><label>Контакт<input name="contact" placeholder="@username или телефон" required/></label></div><label>Услуга<select name="service"><option>Бесплатный аудит</option><option>Google Таблицы и Apps Script</option><option>Автоматизация в n8n</option><option>Telegram- или VK-бот</option><option>ИИ-бот или ИИ-агент</option><option>Сопровождение — от 3 000 ₽/месяц</option></select></label><label>Кратко опишите задачу<textarea name="message" rows={5} placeholder="Что делается вручную и какой результат нужен?" required/></label><label className="consent"><input type="checkbox" name="consent" required/><span>Я даю <Link href="/personal-data-consent" target="_blank">согласие на обработку персональных данных</Link> и ознакомлен с <Link href="/privacy-policy" target="_blank">политикой обработки персональных данных</Link>.</span></label><button className="btn primary" disabled={state==="sending"}>{state==="sending"?"Отправляем…":"Отправить заявку ↗"}</button>{state==="sent"&&<p className="success">Заявка отправлена. Я свяжусь с вами.</p>}{state==="error"&&<p className="error">Не удалось отправить. Напишите в <a href="https://t.me/VasiliyPF">Telegram</a>.</p>}</form>
    </div></section>
    <SiteFooter/>
  </main>
}
