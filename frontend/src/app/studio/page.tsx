import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import StudioPortfolio from "./studio-portfolio";

const racing = Barlow_Condensed({
  subsets: ["latin"], weight: "700", style: ["normal", "italic"],
  display: "swap", variable: "--font-racing",
});

export const metadata: Metadata = {
  title: "Deshan Fernando | Software Engineer — The Next Lap",
  description: "Backend and full-stack engineering by Deshan Fernando. An F1-inspired portfolio of selected projects, experience, and an interactive robot companion.",
};

export default function StudioPage() {
  return <div className={racing.variable}><StudioPortfolio /></div>;
}
