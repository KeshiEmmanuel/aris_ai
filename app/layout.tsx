import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

const CabinetGrotesk = localFont({
  src: [
    {
      path: "./fonts/CabinetGrotesk-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-grotesk",
});
const Aktura = localFont({
  src: [
    {
      path: "./fonts/Aktura-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aktura",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://zendt.site"),

  title: "ZENDT",
  description:
    "Stop prompting ChatGPT. Zendt generates product updates, changelogs, and landing pages that actually sound like your brand. No robot voice.",
  keywords: [
    "best design agency for architecture studios",
    "",
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
    <html>
      <body
        className={`${CabinetGrotesk.variable} ${satoshi.variable} ${Aktura.variable} antialiased bg-background text-foreground font-satoshi`}
      >
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
