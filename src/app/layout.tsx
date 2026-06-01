import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bachatguru.in"),
  title: {
    default: "BachatGuru - Personalized Tax-Saving Plan & Income Tax Calculator India FY 2025-26",
    template: "%s | BachatGuru",
  },
  description:
    "Get your personalized tax-saving plan for India FY 2025-26 & 2026-27. Based on your income, family & goals, we show the exact investment mix (80C, 80D, NPS, home loan) to legally minimize tax — plus an instant old vs new regime comparison.",
  keywords: [
    "income tax calculator",
    "tax calculator india",
    "old vs new tax regime",
    "income tax calculator 2025-26",
    "how to save tax india",
    "80C investment options",
    "tax saving calculator",
    "new tax regime calculator",
    "income tax slab 2025-26",
    "section 80C 80D deduction",
    "NPS tax benefit",
    "salary tax calculator india",
  ],
  authors: [{ name: "BachatGuru" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "BachatGuru",
    title: "BachatGuru - Free Income Tax Calculator India (Old vs New Regime)",
    description:
      "Calculate your income tax in seconds. Compare regimes and discover exactly how to save more tax. Free, private, instant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BachatGuru - Income Tax Calculator India",
    description: "Compare old vs new tax regime and save more tax. Free & instant.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const themeScript = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="IN" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
