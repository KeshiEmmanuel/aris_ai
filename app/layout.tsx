import "./globals.css";
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";

// ─── Fonts ────────────────────────────────────────────────────────────────────
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

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://zendt.site"),

  title: {
    default: "Zendt Studio | Data Engineering for Growing Businesses",
    template: "%s | Zendt Studio",
  },

  description:
    "Zendt turns scattered spreadsheets and software into one reliable source of truth. Data engineering, automated reporting, and dashboards for distributors, clinics, schools, retailers, and hospitality groups.",

  keywords: [
    // Core service
    "data engineering for small business",
    "data engineering studio",
    "data engineering for non-tech companies",
    "data consulting for SMEs",
    "single source of truth for business data",
    "business data consolidation",

    // Problem-led searches (what buyers actually type)
    "automate excel reports",
    "stop using spreadsheets for reporting",
    "automated management reports",
    "dashboard for business owners",
    "connect POS and accounting data",
    "reconcile sales and inventory data",
    "move off spreadsheets",

    // Services
    "data audit for business",
    "data warehouse setup for small business",
    "ETL pipeline for SMEs",
    "BigQuery setup for business",
    "dbt consulting",
    "Power BI dashboard development",
    "Looker Studio dashboards",
    "Metabase setup",

    // Industries
    "data analytics for distributors",
    "data dashboard for wholesalers",
    "clinic management reporting dashboard",
    "school fees and attendance reporting",
    "restaurant sales and food cost dashboard",
    "multi-branch retail reporting",
    "logistics and fleet data reporting",

    // Location
    "data engineering studio Canada",
    "data consulting Toronto",
    "business intelligence consultant Vancouver",
    "data engineering UAE",
    "data analytics consulting Dubai",
    "business intelligence Abu Dhabi",
    "data engineering Australia",
    "data consulting Sydney",
    "business intelligence consultant Melbourne",

    // Brand
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
    title: "Zendt Studio | Data Engineering for Growing Businesses",
    description:
      "Stop asking “which number is right?” One reliable source of truth, with reports that update themselves.",
    images: [
      {
        url: "/og-image.png", // 1200×630px — add to /public
        width: 1200,
        height: 630,
        alt: "Zendt Studio — Data Engineering for Growing Businesses",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@zendtstudio", // update when you have the handle
    creator: "@zendtstudio",
    title: "Zendt Studio | Data Engineering for Growing Businesses",
    description:
      "Scattered spreadsheets in. One source of truth out. Automated reporting for growing businesses.",
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

// ─── Structured data (helps Google understand what you offer) ────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Zendt Studio",
  url: "https://zendt.site",
  description:
    "Data engineering studio helping non-tech businesses consolidate their data, automate reporting, and build dashboards.",
  areaServed: ["Canada", "United Arab Emirates", "Australia"],
  serviceType: [
    "Data audit",
    "Data warehouse setup",
    "Data pipeline development",
    "Dashboards and automated reporting",
    "Ongoing data support",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
