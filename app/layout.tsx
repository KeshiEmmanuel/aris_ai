import type { Metadata } from "next";

import { Geist, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zendt.site"),

  title: "Zendt | AI writer for B2B SaaS",
  description:
    "Stop prompting ChatGPT. Zendt generates product updates, changelogs, and landing pages that actually sound like your brand. No robot voice.",
  keywords: [
    "AI writer",
    "B2B SaaS",
    "Changelog generator",
    "Product updates",
    "Brand voice AI",
    "Copywriting tool",
  ],
  authors: [{ name: "Keshi", url: "https://x.com/_rudosurebec" }],
  creator: "Keshi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/", // You can change this to relative now, or keep absolute.
    title: "Zendt | The AI Writer for B2B SaaS",
    description:
      "Generate B2B content that sounds like you, not a robot. Try it for free.",
    siteName: "Zendt",
    images: [
      {
        url: "/og-image.jpg", // This will now correctly resolve to https://zendt.site/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Zendt Interface Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zendt | The AI Writer for B2B SaaS",
    description:
      "Stop sounding generic. AI content trained on your brand voice.",
    images: ["/og-image.jpg"],
    creator: "@_rudosurebec", // Updated from "@yourhandle" to match your author URL
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${mono.variable} ${interSans.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
