import type {MetadataRoute} from "next";
import {freeSolutions} from "./free-solutions/data";
import {serviceDirections} from "./services/data";

const origin="https://autobiz-vb.github.io";

export const dynamic="force-static";

export default function sitemap():MetadataRoute.Sitemap{
  const now=new Date();
  return [
    {url:`${origin}/`,lastModified:now,changeFrequency:"monthly",priority:1},
    {url:`${origin}/cases/`,lastModified:now,changeFrequency:"monthly",priority:.9},
    {url:`${origin}/free-solutions/`,lastModified:now,changeFrequency:"monthly",priority:.8},
    ...serviceDirections.map(direction=>({
      url:`${origin}/services/${direction.slug}/`,
      lastModified:now,
      changeFrequency:"monthly" as const,
      priority:.8,
    })),
    ...freeSolutions.map(solution=>({
      url:`${origin}/free-solutions/${solution.slug}/`,
      lastModified:now,
      changeFrequency:"monthly" as const,
      priority:.7,
    })),
  ];
}
