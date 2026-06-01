import Link from "next/link";
import TaxCalculator from "@/components/TaxCalculator";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <div className="inline-block bg-white/15 backdrop-blur px-4 py-1 rounded-full text-sm font-medium mb-4">
            ✅ Updated for FY 2025-26 &amp; FY 2026-27
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Calculate Your Income Tax &amp;<br className="hidden md:block" />
            <span className="text-yellow-300"> Discover How to Save More</span>
          </h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto mb-8">
            Free instant calculator. Compare the old vs new tax regime, see which one saves you money,
            and get personalized tips to legally reduce your tax.
          </p>
          <Link
            href="#calculator"
            className="inline-block bg-white text-emerald-700 font-bold py-3.5 px-8 rounded-xl hover:bg-emerald-50 transition-all shadow-xl text-lg"
          >
            Calculate My Tax Free →
          </Link>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-emerald-100 flex-wrap">
            <span>🔒 100% Private</span>
            <span>⚡ Instant Results</span>
            <span>🆓 Always Free</span>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Income Tax Calculator
            </h2>
            <p className="text-gray-500">Enter your details below — takes 30 seconds</p>
          </div>
          <TaxCalculator />
        </div>
      </section>

      {/* How it helps */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">
            Why Use BachatGuru?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon="⚖️"
              title="Old vs New Regime"
              desc="Instantly see which tax regime saves you more money based on YOUR actual numbers."
            />
            <Feature
              icon="💡"
              title="Personalized Tips"
              desc="Don't just calculate — learn exactly which investments cut your tax and by how much."
            />
            <Feature
              icon="🔒"
              title="Completely Private"
              desc="Everything runs in your browser. We never store or see your financial data."
            />
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            How to Save Income Tax in India (FY 2025-26 &amp; 2026-27)
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Every salaried Indian wants to legally reduce their income tax. The challenge is that
              tax rules are complex, and most calculators only tell you HOW MUCH tax you owe — not
              HOW to reduce it. BachatGuru does both.
            </p>
            <p>
              In the <strong>new tax regime</strong> (the default from FY 2025-26), income up to
              ₹12 lakh is effectively tax-free thanks to the Section 87A rebate. For salaried people,
              with the ₹75,000 standard deduction, you can earn up to ₹12.75 lakh and pay zero tax.
              However, the new regime does not allow most deductions like 80C or HRA.
            </p>
            <p>
              The <strong>old tax regime</strong> has higher slab rates but lets you claim deductions:
              Section 80C (up to ₹1.5 lakh for PPF, ELSS, EPF, life insurance), Section 80D (health
              insurance), Section 80CCD(1B) (extra ₹50,000 in NPS), Section 24(b) (home loan interest
              up to ₹2 lakh), HRA, and more.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Which regime should you pick?</h3>
            <p>
              It depends entirely on your deductions. If you invest heavily (home loan + full 80C +
              NPS + health insurance), the old regime often wins. If you have few deductions, the new
              regime usually saves more. Our calculator compares both for you instantly — no guesswork.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Top tax-saving investments</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>ELSS Mutual Funds:</strong> 80C, 3-year lock-in, equity returns</li>
              <li><strong>PPF:</strong> 80C, safe, 15-year, tax-free returns</li>
              <li><strong>NPS:</strong> Extra ₹50,000 deduction under 80CCD(1B)</li>
              <li><strong>Health Insurance:</strong> 80D, protects savings + cuts tax</li>
              <li><strong>Home Loan:</strong> Interest deductible up to ₹2 lakh under 24(b)</li>
              <li><strong>Term Insurance:</strong> 80C + essential financial protection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ with structured data */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="bg-gray-50 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-emerald-600 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}

const faqs = [
  {
    q: "Is this income tax calculator free?",
    a: "Yes, BachatGuru is 100% free with no signup required. Calculate your tax and get savings recommendations instantly.",
  },
  {
    q: "Which tax regime is better — old or new?",
    a: "It depends on your deductions. If you have significant 80C investments, home loan, and HRA, the old regime often saves more. With few deductions, the new regime usually wins. Our calculator compares both for your exact situation.",
  },
  {
    q: "What is the income tax slab for FY 2025-26?",
    a: "Under the new regime: 0-4L is nil, 4-8L is 5%, 8-12L is 10%, 12-16L is 15%, 16-20L is 20%, 20-24L is 25%, and above 24L is 30%. Income up to ₹12 lakh is effectively tax-free due to the 87A rebate.",
  },
  {
    q: "Is my financial data safe?",
    a: "Absolutely. All calculations happen entirely in your browser. We never store, send, or see any of your financial information.",
  },
  {
    q: "How much tax can I save with 80C?",
    a: "Section 80C allows deductions up to ₹1.5 lakh. If you're in the 30% tax bracket, fully using 80C can save you up to ₹46,800 (including cess) per year.",
  },
];
