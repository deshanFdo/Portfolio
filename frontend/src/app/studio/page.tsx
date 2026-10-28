import type { Metadata } from "next";
import StudioPortfolio from "./studio-portfolio";

export const metadata: Metadata = {
  title: "Deshan Fernando — Software, thoughtfully built.",
  description: "Backend and full-stack engineering by Deshan Fernando. Explore selected projects, experience, and an interactive robot companion.",
};

export default function StudioPage() {
  return <StudioPortfolio />;
}
