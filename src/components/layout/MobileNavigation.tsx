"use client";

import Link from "next/link";

type Props={isOpen:boolean;onClose:()=>void};
const links=[{href:"/",label:"Home"},{href:"/services",label:"Services"},{href:"/portfolio",label:"Portfolio"},{href:"/about",label:"About"},{href:"/contact",label:"Contact"}];

export default function MobileNavigation({isOpen,onClose}:Props){
 if(!isOpen) return null;
 return (<div className="fixed inset-0 z-50 bg-surface md:hidden"><div className="flex items-center justify-between p-6"><span className="font-semibold">SYNCra</span><button onClick={onClose} aria-label="Close">✕</button></div><nav className="flex flex-col gap-4 p-6">{links.map(l=><Link key={l.href} href={l.href} onClick={onClose} className="text-lg">{l.label}</Link>)}</nav></div>);
}