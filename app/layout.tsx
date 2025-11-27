import type { Metadata } from "next";
import { Geist, Lobster_Two } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontSofia = Lobster_Two({
  variable: "--font-sofia",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
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
    url: "https://zendt.site",
    title: "Zendt | The AI Writer for B2B SaaS",
    description:
      "Generate B2B content that sounds like you, not a robot. Try it for free.",
    siteName: "Zendt",
    images: [
      {
        url: "/og-image.jpg", // We will create this next
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
    images: ["/og-image.jpg"], // Same image
    creator: "@yourhandle",
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
        className={`${geistSans.variable} ${fontSofia.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
