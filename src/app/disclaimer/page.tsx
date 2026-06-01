import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - BachatGuru",
  description: "BachatGuru is a free guidance tool, not professional tax advice. Always consult a qualified Chartered Accountant before filing.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Disclaimer</h1>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
          <p>
            The information and calculations provided by <strong>BachatGuru</strong> are for general informational and
            educational purposes only. They are <strong>estimates</strong> based on publicly available income tax rules
            for FY 2025-26 / FY 2026-27 and the inputs you provide.
          </p>
          <p>
            BachatGuru is <strong>not</strong> a substitute for professional tax, legal, financial or investment advice.
            We are not a registered tax practitioner, financial advisor, or SEBI-registered entity. Nothing on this site
            constitutes a recommendation to buy any specific financial product.
          </p>
          <p>
            Tax laws are complex, contain exceptions, and change over time. Our calculations may not account for every
            situation (for example, surcharge on incomes above ₹50 lakh, capital gains, or special-rate income).
            <strong> Always verify your numbers with a qualified Chartered Accountant before making any investment or
            filing your return.</strong>
          </p>
          <p>
            We make no warranty as to the accuracy or completeness of any information on this site and accept no
            liability for any loss arising from reliance on it. Use this tool at your own discretion.
          </p>
          <p>
            Any third-party products or services mentioned are not endorsements; please do your own due diligence.
          </p>
        </div>
      </div>
    </div>
  );
}
