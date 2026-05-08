import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

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

  title: "ZENDT | The Design Partner for Extraordinary Businesses",
  description:
    "Helping clients build high converting digital presence on the web",
  keywords: [
    "zendt",
    "law firm SEO agent",
    "design agency for businesses",
    "local Business design agency NYC",
    "best design agency for local businesses",
    "design business",
    "creative business",
  ],
  authors: [{ name: "Keshi", url: "https://x.com/_rudosurebec" }],
  creator: "Keshi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/", // You can change this to relative now, or keep absolute.
    title: "Zendt | Your Creative Design Partner",
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
        className={`${CabinetGrotesk.variable} ${satoshi.variable} antialiased bg-background text-foreground`}
      >
        <main>
          {/*<Navbar />*/}
          {children}
        </main>
      </body>
    </html>
  );
}
