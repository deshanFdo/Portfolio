import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import FerrariExperience from "../../../components/FerrariExperience";
import ErrorBoundary from "../../../components/ErrorBoundary";
const racing = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700", "800"], style: ["normal", "italic"], variable: "--font-racing" });
export const metadata: Metadata = { title: "Deshan Fernando — Rosso Works / Ferrari Edition", description: "A Ferrari-inspired portfolio experience. Explore Deshan Fernando's software projects, engineering journey and interactive garage. Open to Associate and Junior Software Engineer roles.", alternates: { canonical: "/Portfolio/ferrari" }, openGraph: { title: "Deshan Fernando — Ferrari Edition", description: "Software. With spirit. A Ferrari-inspired engineering portfolio.", url: "https://deshanfdo.github.io/Portfolio/ferrari" } };
export default function FerrariPage() { return <div className={racing.variable}><ErrorBoundary><FerrariExperience /></ErrorBoundary></div>; }
