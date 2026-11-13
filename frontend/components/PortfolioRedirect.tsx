"use client";
import { useEffect } from "react";

export default function PortfolioRedirect() {
  const home = `${process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio"}/`;
  useEffect(() => { window.location.replace(home); }, [home]);
  return <main style={{minHeight:"100vh",display:"grid",placeContent:"center",gap:16,padding:24}}><meta httpEquiv="refresh" content={`0;url=${home}`} /><h1>Deshan Fernando</h1><p>The portfolio has one home.</p><a href={home}>Open portfolio ↗</a></main>;
}
