import type {Metadata} from "next";
import CasesPageClient from "./CasesPageClient";

const canonical="https://autobiz-vb.github.io/cases/";

export const metadata:Metadata={
  title:"Кейсы автоматизации бизнеса",
  description:"Реальные проекты автоматизации учёта, финансовой отчётности, страховых расчётов и аналитики маркетплейсов.",
  alternates:{canonical},
  openGraph:{
    title:"Кейсы автоматизации бизнеса — Василий",
    description:"Задачи, решения и результаты внедрения систем для учёта, аналитики и управления бизнес-процессами.",
    url:canonical,
    type:"website",
    locale:"ru_RU",
  },
};

export default function CasesPage(){return <CasesPageClient/>}
