import { cache } from "react";
import { prisma } from "@/lib/db";

/**
 * DATA SOURCE — Phase 8. The database (Project table + its relations)
 * is now the source of truth. No real project data exists yet, so
 * the fallback is an empty array — never fabricated projects.
 */

export type ProjectMediaType = "IMAGE" | "VIDEO" | "EMBED";
export type ProjectMedia = { type: ProjectMediaType; url: string; thumbnailUrl?: string; alt?: string; caption?: string; order: number; isHero: boolean };
export type ProjectSummary = { id:string; slug:string; title:string; description:string; client?:string; overview?:string; challenge?:string; solution?:string; process?:string; results?:string; liveUrl?:string; featured:boolean; order:number; serviceSlugs:readonly string[]; serviceNames:readonly string[]; technologySlugs:readonly string[]; technologyNames:readonly string[]; media:readonly ProjectMedia[] };
const FALLBACK_PROJECTS: readonly ProjectSummary[]=[];
type ProjectRow = Awaited<ReturnType<typeof fetchPublishedRows>>[number];
async function fetchPublishedRows(){ return prisma.project.findMany({ where:{published:true}, orderBy:{order:"asc"}, include:{services:{include:{service:true}}, technologies:{include:{technology:true}}, media:{orderBy:{order:"asc"}}}})}
function toSummary(row:ProjectRow):ProjectSummary{return{ id:row.id, slug:row.slug,title:row.title,description:row.summary,client:row.client??undefined,overview:row.overview??undefined,challenge:row.challenge??undefined,solution:row.solution??undefined,process:row.process??undefined,results:row.results??undefined,liveUrl:row.liveUrl??undefined,featured:row.featured,order:row.order,serviceSlugs:row.services.map(s=>s.service.slug),serviceNames:row.services.map(s=>s.service.name),technologySlugs:row.technologies.map(t=>t.technology.slug),technologyNames:row.technologies.map(t=>t.technology.name),media:row.media.map(m=>({type:m.type as ProjectMediaType,url:m.url,thumbnailUrl:m.thumbnailUrl??undefined,alt:m.alt??undefined,caption:m.caption??undefined,order:m.order,isHero:m.isHero}))}}
export const getPublishedProjects=cache(async()=>{try{return (await fetchPublishedRows()).map(toSummary)}catch{return FALLBACK_PROJECTS}});
export const getFeaturedProjects=cache(async()=> (await getPublishedProjects()).filter(p=>p.featured));
export const getProjectBySlug=cache(async(slug:string)=>(await getPublishedProjects()).find(p=>p.slug===slug));
export const getProjectsByServiceSlug=cache(async(serviceSlug:string)=>(await getPublishedProjects()).filter(p=>p.serviceSlugs.includes(serviceSlug)));
export function getHeroMedia(project:ProjectSummary){return project.media.find(m=>m.isHero)??[...project.media].sort((a,b)=>a.order-b.order)[0]}
export function getGalleryMedia(project:ProjectSummary){const hero=getHeroMedia(project);return project.media.filter(m=>m!==hero).slice().sort((a,b)=>a.order-b.order)}
export const getTechnologiesInUse=cache(async()=>{const all=await getPublishedProjects();const seen=new Map<string,string>();for(const project of all){project.technologySlugs.forEach((slug,i)=>{const name=project.technologyNames[i];if(name)seen.set(slug,name)})}return [...seen.entries()].map(([slug,name])=>({slug,name}))});
export const getAdjacentProjects=cache(async(slug:string)=>{const published=await getPublishedProjects();const index=published.findIndex(p=>p.slug===slug);if(index===-1||published.length<=1)return{};return{previous:index>0?published[index-1]:undefined,next:index<published.length-1?published[index+1]:undefined}});
