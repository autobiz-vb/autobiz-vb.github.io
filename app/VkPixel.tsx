"use client";

import {usePathname} from "next/navigation";
import {useEffect, useRef} from "react";
import {VK_PIXEL_ID} from "./analytics";

type VkPixelCommand={
  id:number;
  type:"pageView"|"reachGoal";
  goal?:string;
  start?:number;
  url?:string;
};

declare global{
  interface Window{
    _tmr?:VkPixelCommand[];
  }
}

function pushVkCommand(command:VkPixelCommand){
  window._tmr=window._tmr||[];
  window._tmr.push(command);
}

export function trackVkGoal(goal:"lead_submit_success"|"contact_telegram"|"contact_vk"){
  if(typeof window==="undefined") return;
  pushVkCommand({id:VK_PIXEL_ID,type:"reachGoal",goal});
}

export default function VkPixel(){
  const pathname=usePathname();
  const initialPath=useRef(true);

  useEffect(()=>{
    if(initialPath.current){
      initialPath.current=false;
      return;
    }
    pushVkCommand({id:VK_PIXEL_ID,type:"pageView",start:Date.now(),url:window.location.href});
  },[pathname]);

  useEffect(()=>{
    const trackContactClick=(event:MouseEvent)=>{
      const target=event.target;
      if(!(target instanceof Element)) return;
      const link=target.closest<HTMLAnchorElement>("a[href]");
      if(!link) return;

      try{
        const hostname=new URL(link.href,window.location.href).hostname.toLowerCase();
        if(hostname==="t.me"||hostname.endsWith(".t.me")) trackVkGoal("contact_telegram");
        if(hostname==="vk.com"||hostname.endsWith(".vk.com")) trackVkGoal("contact_vk");
      }catch{
        // Некорректная ссылка не должна влиять на навигацию пользователя.
      }
    };

    document.addEventListener("click",trackContactClick);
    return()=>document.removeEventListener("click",trackContactClick);
  },[]);

  return null;
}
