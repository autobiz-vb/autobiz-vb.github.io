export type ProjectStatus = "live" | "prototype" | "own" | "free";

export type ProjectSolution = {
  id: string;
  title: string;
  status: ProjectStatus;
  statusLabel: string;
  intro: string;
  problemTitle: string;
  problems: string[];
  automation: string[];
  implementation: string;
  result: string;
  metrics?: string[];
  note?: string;
  screenshots: {src:string; alt:string; caption:string}[];
  cta?: {label:string; href:string};
};

export type ServiceDirection = {
  slug: string;
  category: CaseCategory;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  solutions: ProjectSolution[];
};

export type CaseCategory = "insurance" | "finance" | "marketplaces" | "small-business" | "personal";

export type CaseCatalogItem = {
  id: string;
  title: string;
  category: CaseCategory;
  categoryLabel: string;
  task: string;
  automation: string;
  result: string;
  image: {src:string; alt:string};
  url: string;
  featured: boolean;
  order: number;
};

export const caseCategoryLabels: Record<CaseCategory,string> = {
  insurance:"Страхование",
  finance:"Финансы и управленческий учёт",
  marketplaces:"Маркетплейсы",
  "small-business":"Малый бизнес",
  personal:"Личные инструменты",
};

const insuranceScreens = [
  ["insurance-01-agent-report.png","Отчёт агента","Отчёт агента с начислениями и результатами"],
  ["insurance-02-registry.png","Рабочий реестр","Единый реестр страховых операций"],
  ["insurance-03-commission-rules.png","Правила комиссий","Справочник правил расчёта комиссий"],
  ["insurance-04-report-form.png","Форма отчёта","Формирование отчётности по выбранному периоду"],
  ["insurance-05-policy-calculation-check.png","Проверка расчёта полиса","Проверка применённых правил и цепочки расчёта"],
  ["insurance-06-event-log.png","Журнал событий","Журнал запусков, изменений и ошибок"],
] as const;

const stroyScreens = [
  ["stroyfinansy-01-forma-vvoda.png","Форма ввода","Ввод финансовой операции и данных первичного документа"],
  ["stroyfinansy-02-obshchiy-otchet.png","Общий отчёт","Общий финансовый отчёт компании"],
  ["stroyfinansy-03-otchet-po-proektu.png","Отчёт по проекту","Доходы, расходы и результат отдельного проекта"],
  ["stroyfinansy-04-otchet-po-napravleniyam.png","Отчёт по направлениям","Сравнение финансового результата по направлениям бизнеса"],
] as const;

const wbScreens = [
  ["wb-rnp-01-dinamicheskaya-vitrina.png","Динамическая витрина","Единая динамическая витрина по товарам"],
  ["wb-rnp-02-svod-po-artikulam.png","Свод по артикулам","Сводные показатели продаж, рекламы и остатков"],
  ["wb-rnp-03-plan-zakazov.png","План заказов","Контроль дефицита и планирование поставок"],
  ["wb-rnp-04-unit-ekonomika.png","Юнит-экономика","Прибыль и рентабельность по каждому артикулу"],
] as const;

const cabinetScreens = [
  ["financial-cabinet-01-pravila-raspredeleniya.png","Правила распределения","Настраиваемые правила распределения операций"],
  ["financial-cabinet-02-spisok-operatsiy.png","Список операций","Единый список поступлений и расходов"],
  ["financial-cabinet-03-google-sheets-operatsii.png","Операции в Google Таблице","Рабочий лист с классифицированными операциями"],
  ["financial-cabinet-04-mobile-operations.png","Мобильный ввод","Работа с операциями со смартфона"],
  ["financial-cabinet-05-web-dashboard.png","Веб-кабинет","Ключевые финансовые показатели в веб-интерфейсе"],
  ["financial-cabinet-06-google-sheets-dashboard.png","Дашборд в таблице","Финансовая панель в Google Таблице"],
  ["financial-cabinet-07-budget-limits.png","Бюджеты и лимиты","Контроль бюджета и установленных лимитов"],
] as const;

export const selfEmployedScreens = [
  ["self-employed-01-dashboard.png","Панель самозанятого","Доход, налог, лимит и ближайшие действия"],
  ["self-employed-02-clients.png","Клиенты и заказы","Справочник клиентов и контроль заказов"],
  ["self-employed-03-taxes-limits.png","Налоги и лимиты","Расчёт НПД и контроль годового лимита"],
  ["self-employed-04-income-receipts.png","Доходы и чеки","Учёт доходов и ручная фиксация чеков"],
  ["self-employed-05-instructions.png","Инструкция","Пошаговая инструкция по работе с таблицей"],
  ["self-employed-06-useful-services.png","Полезные сервисы","Подборка полезных официальных сервисов"],
  ["self-employed-07-checklist.png","Чек-лист","Регулярные действия самозанятого"],
] as const;

const images = (rows: readonly (readonly [string,string,string])[]) =>
  rows.map(([file,caption,alt])=>({src:`/cases/${file}`,caption,alt}));

export const serviceDirections: ServiceDirection[] = [
  {
    slug:"insurance-automation",
    category:"insurance",
    eyebrow:"Страховые агентства",
    title:"Автоматизация комиссий, взаиморасчётов и отчётности",
    description:"Система объединяет реестры, правила расчёта, выплаты исполнителям и контроль операций — без ручного пересчёта десятков файлов.",
    accent:"blue",
    solutions:[{
      id:"insurance",
      title:"Автоматизация работы страхового агентства",
      status:"live",
      statusLabel:"Реальное внедрение · используется клиентом",
      intro:"Рабочая система для страхового агентства: от загрузки реестров и определения правил до расчёта комиссии, взаиморасчётов с агентами и итоговой отчётности.",
      problemTitle:"Что было сложно контролировать",
      problems:["реестры и расчёты находились в разных файлах","комиссии зависели от множества условий и правил","проверка спорного полиса занимала много времени","отчётность и выплаты требовали ручной сверки"],
      automation:["загрузка и обработка страховых реестров","автоматическое применение правил комиссий","расчёт выплат агентам и исполнителям","точечная проверка цепочки расчёта полиса","формирование отчётов и журналирование событий"],
      implementation:"Решение внедрено в действующем страховом агентстве. В системе работают данные по 45 агентам и 1 739 операциям. На странице используются обезличенные рабочие экраны.",
      result:"Расчёты стали воспроизводимыми и проверяемыми, а руководитель получил единый источник данных вместо множества ручных файлов.",
      metrics:["45 агентов","1 739 операций","более 20 часов в месяц экономии"],
      screenshots:images(insuranceScreens),
    }],
  },
  {
    slug:"financial-management",
    category:"finance",
    eyebrow:"Финансы и управленческий учёт",
    title:"Фактический финансовый результат по проектам и направлениям",
    description:"Автоматизация помогает объединить первичные операции, управленческие данные и отчёты, чтобы видеть реальную картину бизнеса.",
    accent:"green",
    solutions:[{
      id:"stroyfinansy",
      title:"«СтройФинансы»",
      status:"prototype",
      statusLabel:"Демонстрационный прототип",
      intro:"Прототип финансовой системы для компании, которая занимается дизайном, ремонтом и продажей материалов.",
      problemTitle:"Почему стандартного учёта было недостаточно",
      problems:["1С отражала бухгалтерские данные, но не давала нужной детализации для управления","нужно было считать результат отдельно по проектам и направлениям","первичные документы и операции приходилось переносить вручную","руководителю не хватало единого понятного отчёта"],
      automation:["ввод и классификация финансовых операций","распознавание чеков с помощью OpenAI","разделение данных по проектам и направлениям","формирование общего отчёта и отчётов по проектам","учёт операций, отражённых в бухгалтерском учёте, и внутренних управленческих операций, необходимых для расчёта фактического финансового результата"],
      implementation:"Подготовлен демонстрационный прототип под процессы клиента. Он показывает будущую логику системы и структуру отчётности, но не выдаётся за завершённое внедрение.",
      result:"Руководитель сможет видеть фактический результат каждого проекта и направления на основе единого набора данных.",
      screenshots:images(stroyScreens),
    }],
  },
  {
    slug:"marketplace-analytics",
    category:"marketplaces",
    eyebrow:"Маркетплейсы",
    title:"Аналитика продаж, рекламы, остатков и прибыли",
    description:"API-данные собираются в одну систему, чтобы быстрее принимать решения по ценам, рекламе, ассортименту и поставкам.",
    accent:"violet",
    solutions:[{
      id:"wb-rnp",
      title:"Аналитика Wildberries «РНП»",
      status:"live",
      statusLabel:"Реальное внедрение · используется клиентом",
      intro:"Система объединяет через API продажи, рекламу, остатки и финансовые показатели Wildberries в одной динамической витрине.",
      problemTitle:"Типичные проблемы",
      problems:["показатели находились в нескольких таблицах","большое количество формул замедляло рабочие файлы","данные были разнесены по разным источникам","нужные отклонения приходилось искать вручную","решения по ценам и поставкам принимались с задержкой"],
      automation:["автоматическая загрузка данных по API","расчёт продаж, рекламы, остатков и финансовых показателей","прибыль и рентабельность по артикулам","дневная, недельная и месячная динамика","единая динамическая витрина вместо тяжёлых таблиц","контроль дефицита и планирование поставок","фиксация рекомендаций и выполненных действий"],
      implementation:"Клиент перешёл от нескольких зависающих таблиц к одной динамической витрине. Масштаб системы вырос примерно с 40 до 80 артикулов без возврата к прежней тяжёлой структуре.",
      result:"Таблица сохраняет скорость работы, аналитика обновляется регулярно, а решения по поставкам и ассортименту принимаются быстрее.",
      metrics:["около 80 артикулов","единая динамическая витрина","контроль дефицита и поставок"],
      screenshots:images(wbScreens),
    }],
  },
  {
    slug:"small-business",
    category:"small-business",
    eyebrow:"Малый бизнес и частная практика",
    title:"Понятный учёт денег и ежедневных операций",
    description:"Два решения разного масштаба: развиваемый финансовый кабинет для бизнеса и бесплатная таблица для самозанятых.",
    accent:"orange",
    solutions:[
      {
        id:"financial-cabinet",
        title:"«Финансовый кабинет»",
        status:"own",
        statusLabel:"Собственный развиваемый проект",
        intro:"Однопользовательская система для сбора, классификации и анализа финансовых операций малого бизнеса.",
        problemTitle:"Что решает кабинет",
        problems:["операции поступают из разных каналов","категории и назначения приходится разбирать вручную","нет единой картины движения денег","сложно контролировать бюджеты и лимиты"],
        automation:["загрузка операций Альфа-Банка через веб-интерфейс, электронную почту или вручную","распределение операций по редактируемым правилам","настраиваемые категории управленческого учёта","дашборды в веб-интерфейсе и Google Таблице","контроль бюджета и лимитов"],
        implementation:"Это собственный развиваемый проект, который используется как основа для услуги: его логика адаптируется под счета, категории и процессы конкретного бизнеса.",
        result:"Операции собираются в одном месте, распределяются по понятным правилам и превращаются в актуальную управленческую картину.",
        screenshots:images(cabinetScreens),
      },
      {
        id:"self-employed",
        title:"«Учёт самозанятого»",
        status:"free",
        statusLabel:"Бесплатное готовое решение",
        intro:"Универсальная Google Таблица для самозанятых: клиенты, заказы, доходы, чеки, налог, лимит и регулярные действия в одном файле.",
        problemTitle:"Что помогает не пропустить",
        problems:["забытые чеки и неподтверждённые доходы","ошибки в расчёте налога","приближение к годовому лимиту","потерянные заказы и договорённости"],
        automation:["расчёт НПД по ставкам 4% и 6%","контроль лимита и понятные предупреждения","учёт клиентов, заказов, доходов и расходов","напоминания с помощью Apps Script","ручная фиксация создания чека","инструкция и чек-лист регулярных действий"],
        implementation:"Бесплатный готовый шаблон рассчитан на самостоятельное использование. Таблица не интегрируется с сервисом «Мой налог» и не создаёт чеки автоматически.",
        result:"Самозанятый получает одну рабочую систему вместо разрозненных записей и видит, что нужно сделать дальше.",
        note:"Чеки создаются пользователем в официальном сервисе, а в таблице вручную отмечается факт создания.",
        screenshots:images(selfEmployedScreens),
        cta:{label:"Посмотреть бесплатное решение",href:"/free-solutions/uchet-samozanyatogo"},
      },
    ],
  },
];

export const getServiceDirection = (slug:string) =>
  serviceDirections.find(direction=>direction.slug===slug);

const featuredDirections = new Set(["insurance-automation","marketplace-analytics","small-business"]);

export const caseCatalog: CaseCatalogItem[] = serviceDirections.map((direction,order)=>{
  const solution=direction.solutions[0];
  return {
    id:solution.id,
    title:solution.title,
    category:direction.category,
    categoryLabel:caseCategoryLabels[direction.category],
    task:solution.problems[0],
    automation:solution.automation[0],
    result:solution.result,
    image:{src:solution.screenshots[0].src,alt:solution.screenshots[0].alt},
    url:`/services/${direction.slug}#${solution.id}`,
    featured:featuredDirections.has(direction.slug),
    order,
  };
}).sort((a,b)=>a.order-b.order);
