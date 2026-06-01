import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About BachatGuru - Free Personalized Tax-Saving Planner",
  description:
    "BachatGuru helps salaried Indians legally pay the least tax with a personalized investment plan and an instant old vs new regime comparison. Learn about our mission.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">About BachatGuru</h1>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>BachatGuru</strong> is a free tool that helps salaried Indians understand and reduce their income
            tax. Most calculators only tell you how much tax you owe — BachatGuru goes further by building a
            <strong> personalized tax-saving plan</strong> based on your income, family situation, home and risk appetite,
            and showing the exact investment mix to legally minimize your tax.
          </p>
          <p>
            We also instantly compare the <strong>old vs new tax regime</strong> for your exact numbers, so you never
            overpay by choosing the wrong one.
          </p>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8">Our mission</h2>
          <p>
            Taxes feel complicated and intimidating. Our mission is to make tax-saving simple, transparent and
            accessible to every Indian — in plain language, with zero jargon, completely free.
          </p>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8">How it works</h2>
          <p>
            All calculations run entirely inside your browser using publicly available tax rules for FY 2025-26 and
            FY 2026-27. We never store or transmit your financial information. You get an instant plan you can download
            as a PDF and act on.
          </p>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8">A note on accuracy</h2>
          <p>
            BachatGuru is a guidance tool, not a substitute for professional advice. Tax laws are complex and change
            over time. Always consult a qualified Chartered Accountant before making investment or filing decisions.
            See our <Link href="/disclaimer" className="text-indigo-600 dark:text-indigo-400 underline">disclaimer</Link>.
          </p>
          <p>
            Questions or feedback? <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 underline">Contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
