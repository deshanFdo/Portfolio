"use client";
import { Barlow_Condensed } from "next/font/google";
import ErrorBoundary from "../../components/ErrorBoundary";
import RaceExperience from "../../components/RaceExperience";
const racing = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700", "800"], style: ["normal", "italic"], variable: "--font-racing" });
export default function Home() { return <div className={racing.variable}><ErrorBoundary><RaceExperience /></ErrorBoundary></div>; }
