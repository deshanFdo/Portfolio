import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import NightShift from "../../../components/NightShift";

const racing = Barlow_Condensed({
  subsets: ["latin"], weight: ["500", "600", "700", "800"], style: ["normal", "italic"], variable: "--font-racing",
});
const title = "Night Shift | Deshan Fernando’s Red Bull–inspired pit wall";
const description = "Call car 31 into the box, then explore Deshan Fernando’s software projects and engineering background on the garage monitors.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/Portfolio/redbull" },
  openGraph: { title, description, url: "/Portfolio/redbull", images: ["/Portfolio/images/redbull/night-grid.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/Portfolio/images/redbull/night-grid.webp"] },
};
export default function RedBullPage() {
  return <div className={racing.variable}><NightShift /></div>;
}
