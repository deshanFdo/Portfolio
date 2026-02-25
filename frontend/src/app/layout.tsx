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
  title: "Deshan Fernando | Software Engineer Portfolio",
  description:
    "Software Engineer portfolio — Full-stack development, RESTful APIs, and data-driven applications.",
  openGraph: {
    title: "Deshan Fernando | Software Engineer Portfolio",
    description:
      "Software Engineer portfolio — Full-stack development, RESTful APIs, and data-driven applications.",
    type: "website",
    locale: "en_US",
    siteName: "Deshan Fernando",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deshan Fernando | Software Engineer Portfolio",
    description:
      "Software Engineer portfolio — Full-stack development, RESTful APIs, and data-driven applications.",
  },
  icons: {
    icon: "/favicon.ico",
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
