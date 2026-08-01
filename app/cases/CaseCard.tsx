import Image from "next/image";
import Link from "next/link";
import type {CaseCatalogItem} from "../services/data";

export default function CaseCard({item,className="",delay}: {item:CaseCatalogItem;className?:string;delay?:string}){
  return <Link
    className={`caseCatalogCard ${className}`.trim()}
    href={item.url}
    style={delay?{"--concern-delay":delay} as React.CSSProperties:undefined}
    aria-label={`Посмотреть кейс: ${item.title}`}
  >
    <div className="caseCardMedia">
      <Image src={item.image.src} width={1200} height={760} alt={item.image.alt} unoptimized/>
      <span>{item.categoryLabel}</span>
    </div>
    <div className="caseCardBody">
      <h3>{item.title}</h3>
      <dl>
        <div><dt>Задача</dt><dd>{item.task}</dd></div>
        <div><dt>Автоматизировано</dt><dd>{item.automation}</dd></div>
      </dl>
      <p><strong>Результат:</strong> {item.result}</p>
      <span className="caseCardLink">Посмотреть кейс <b aria-hidden="true">→</b></span>
    </div>
  </Link>;
}
