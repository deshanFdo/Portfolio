import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deshanfdo.github.io"),
  alternates: { canonical: "/Portfolio/" },
  title: "Deshan Fernando — Silverworks / Software Engineer",
  description:
    "Explore Deshan Fernando's interactive engineering paddock. Full-stack applications, APIs, AI experiments, and a Mercedes-inspired creative experience. Open to Associate and Junior Software Engineer roles.",
  openGraph: {
    title: "Deshan Fernando | Software Engineer Portfolio",
    description:
      "Software Engineer portfolio -- Full-stack development, RESTful APIs, and data-driven applications.",
    type: "website",
    locale: "en_US",
    siteName: "Deshan Fernando",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deshan Fernando | Software Engineer Portfolio",
    description:
      "Software Engineer portfolio -- Full-stack development, RESTful APIs, and data-driven applications.",
  },
  icons: {
    icon: "/Portfolio/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
