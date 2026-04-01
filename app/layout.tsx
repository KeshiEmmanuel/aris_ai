import "./globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
// import Navbar from "./components/Navbar";

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
export const metadata: Metadata = {
  metadataBase: new URL("https://zendt.site"),

  title: "ZENDT",
  description: "Helping clients build Architecture firms on the web",
  keywords: [
    "zendt",
    "best design agency for architecture studios",
    "design agency for architecture",
    "architecture design agency",
    "best design agency for architecture",
    "design architecture",
    "creative architecture",
  ],
  authors: [{ name: "Keshi", url: "https://x.com/_rudosurebec" }],
  creator: "Keshi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/", // You can change this to relative now, or keep absolute.
    title:
      "Zendt | Your Design Partner Specifically for Architecture firms & Interior Design studios",
    description:
      "Translate your physcial work into digital presence that is meant for you only.",
    siteName: "Zendt",
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
        className={`${CabinetGrotesk.variable} ${satoshi.variable} antialiased bg-background text-foreground font-satoshi`}
      >
        <main>
          {/*<Navbar />*/}
          {children}
        </main>
      </body>
    </html>
  );
}
