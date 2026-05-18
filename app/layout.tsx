import "./globals.css";
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";

// ─── Inter ────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zendt.site"),

  title: {
    default: "Zendt Studio | Web Design for B2B Service Companies",
    template: "%s | Zendt Studio",
  },

  description:
    "Zendt builds high-converting websites for B2B service companies — recruitment agencies, consultancies, logistics firms, and financial advisors. Delivered in 14 days.",

  keywords: [
    "web design for recruitment agencies",
    "website redesign for consulting firms",
    "web design for logistics companies",
    "web design for financial advisory firms",
    "web design for IT managed service providers",
    "web design for staffing companies",
    "web design for professional services firms",
    "B2B service company website design",

    "web design studio 14 day delivery",
    "fast website design for businesses",
    "quick website redesign B2B",

    "B2B web design studio Canada",
    "web design agency for recruitment companies Toronto",
    "professional services website design Vancouver",
    "website redesign for consultants Canada",

    "B2B web design agency Dubai",
    "website design for companies in UAE",
    "web design studio Abu Dhabi B2B",

    "B2B web design Australia",
    "web design agency for service companies Sydney",
    "website redesign Melbourne B2B",

    "hire web design studio for B2B company",
    "website that converts B2B leads",
    "B2B website conversion design",
    "web studio for service businesses",
    "zendt",
    "zendt studio",
  ],

  authors: [{ name: "Zendt Studio", url: "https://zendt.site" }],
  creator: "Zendt Studio",
  publisher: "Zendt Studio",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zendt.site",
    siteName: "Zendt Studio",
    title: "Zendt Studio | Web Design for B2B Service Companies",
    description:
      "High-converting websites for recruitment agencies, consultancies, logistics firms, and financial advisors. Built and delivered in 14 days.",
    images: [
      {
        url: "/og-image.png", // 1200×630px — add to /public
        width: 1200,
        height: 630,
        alt: "Zendt Studio — Web Design for B2B Service Companies",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@zendtstudio", // update when you have the handle
    creator: "@zendtstudio",
    title: "Zendt Studio | Web Design for B2B Service Companies",
    description:
      "High-converting websites for B2B service companies. Delivered in 14 days.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://zendt.site",
  },

  // ── Verification (add when you connect Google Search Console) ─────────────
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${geist.variable}
          antialiased
        `}
      >
        <main className="root">{children}</main>
      </body>
    </html>
  );
}
