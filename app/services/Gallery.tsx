"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

type Shot = {src:string; alt:string; caption:string};

export default function Gallery({shots}:{shots:Shot[]}) {
  const [active,setActive]=useState<number|null>(null);

  useEffect(()=>{
    if(active===null) return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const keydown=(event:KeyboardEvent)=>{
      if(event.key==="Escape") setActive(null);
      if(event.key==="ArrowRight") setActive(index=>(index===null?0:(index+1)%shots.length));
      if(event.key==="ArrowLeft") setActive(index=>(index===null?0:(index-1+shots.length)%shots.length));
    };
    window.addEventListener("keydown",keydown);
    return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",keydown)};
  },[active,shots.length]);

  const move=(step:number)=>setActive(index=>index===null?0:(index+step+shots.length)%shots.length);

  return <>
    <div className="caseGallery">
      {shots.map((shot,index)=><button type="button" className="caseShot" key={shot.src} onClick={()=>setActive(index)} aria-label={`Открыть скриншот: ${shot.caption}`}>
        <Image src={shot.src} width={1200} height={760} alt={shot.alt} unoptimized/>
        <span><b>{shot.caption}</b><small>Открыть крупнее ↗</small></span>
      </button>)}
    </div>
    {active!==null&&<div className="galleryModal" role="dialog" aria-modal="true" aria-label="Просмотр скриншотов" onMouseDown={event=>{if(event.target===event.currentTarget)setActive(null)}}>
      <button className="galleryClose" type="button" onClick={()=>setActive(null)} aria-label="Закрыть">×</button>
      <button className="galleryArrow prev" type="button" onClick={()=>move(-1)} aria-label="Предыдущий скриншот">←</button>
      <figure>
        <Image src={shots[active].src} width={1800} height={1200} alt={shots[active].alt} unoptimized priority/>
        <figcaption>{shots[active].caption}<small>{active+1} из {shots.length}</small></figcaption>
      </figure>
      <button className="galleryArrow next" type="button" onClick={()=>move(1)} aria-label="Следующий скриншот">→</button>
    </div>}
  </>;
}
