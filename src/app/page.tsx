import Link from "next/link";
import TaxCalculator from "@/components/TaxCalculator";
import {
  HeroIllustration,
  CompareIcon,
  BulbIcon,
  LockIcon,
  PiggyIcon,
  ShieldIcon,
  ClockIcon,
} from "@/components/Illustrations";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <section className="relative bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                Updated for FY 2025-26 &amp; FY 2026-27
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5">
                Pay Less Tax.
                <br />
                <span className="text-yellow-300">Keep More Money.</span>
              </h1>
              <p className="text-lg text-emerald-50 mb-8 max-w-lg">
                India&apos;s smartest free tax calculator. Compare the old vs new regime,
                find out which saves you more, and get a personalized plan to legally cut your tax — in 30 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#calculator"
                  className="inline-flex items-center justify-center bg-white text-emerald-700 font-bold py-4 px-8 rounded-2xl hover:bg-emerald-50 transition-all shadow-xl text-lg active:scale-95"
                >
                  Calculate My Tax — Free →
                </Link>
                <Link
                  href="/guide"
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur border border-white/30 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all text-lg"
                >
                  Read Tax Guide
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-emerald-100 flex-wrap">
                <span className="flex items-center gap-1.5">⚡ Instant results</span>
                <span className="flex items-center gap-1.5">🔒 100% private</span>
                <span className="flex items-center gap-1.5">🆓 Always free</span>
              </div>
            </div>

            <div className="hidden md:block">
              <HeroIllustration className="w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>

        {/* wave divider */}
        <div className="relative">
          <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none">
            <path d="M0 80V40c240-40 480-40 720 0s480 40 720 0v40Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ===== STATS BAND ===== */}
      <section className="bg-gray-50 -mt-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "₹46,800", l: "Max savings via 80C" },
              { v: "₹12.75L", l: "Tax-free income (new regime)" },
              { v: "2 regimes", l: "Compared instantly" },
              { v: "30 sec", l: "To your result" },
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                <p className="text-xl md:text-2xl font-extrabold text-emerald-700">{s.v}</p>
                <p className="text-xs text-gray-500 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CALCULATOR ===== */}
      <section id="calculator" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Free Income Tax Calculator
            </h2>
            <p className="text-gray-500 text-lg">
              Confused by tax terms? Every field has a simple explanation. Just tap the{" "}
              <span className="font-bold text-emerald-600">?</span>
            </p>
          </div>
          <TaxCalculator />
        </div>
      </section>

      {/* ===== FEATURES BANNER ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">Why BachatGuru</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Not just a calculator — your tax coach
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<CompareIcon className="w-16 h-16" />}
              title="Old vs New Regime"
              desc="Stop guessing. We calculate both regimes with YOUR numbers and tell you exactly which one keeps more money in your pocket."
            />
            <FeatureCard
              icon={<BulbIcon className="w-16 h-16" />}
              title="Personalized Savings Plan"
              desc="See exactly which investments cut your tax and by how much — in rupees. No jargon, just clear next steps."
            />
            <FeatureCard
              icon={<LockIcon className="w-16 h-16" />}
              title="Completely Private"
              desc="Everything runs inside your browser. Your salary and savings never leave your device. Nothing is stored, ever."
            />
          </div>
        </div>
      </section>

      {/* ===== TAX-SAVING OPTIONS BANNER ===== */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Where smart Indians save tax
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              These are the most powerful, beginner-friendly ways to legally reduce your tax. Our calculator tells you how much each can save YOU.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SaveCard icon={<PiggyIcon className="w-14 h-14" />} tag="Section 80C" title="ELSS &amp; PPF" desc="Up to ₹1.5L deduction. ELSS = equity growth + tax saving." />
            <SaveCard icon={<ShieldIcon className="w-14 h-14" />} tag="Section 80D" title="Health Insurance" desc="Protect your family AND claim up to ₹1L in deductions." />
            <SaveCard icon={<ClockIcon className="w-14 h-14" />} tag="Section 80CCD(1B)" title="NPS Retirement" desc="An EXTRA ₹50,000 deduction on top of 80C." />
            <SaveCard icon={<BulbIcon className="w-14 h-14" />} tag="Section 24(b)" title="Home Loan" desc="Interest deductible up to ₹2L per year." />
          </div>
          <div className="text-center mt-10">
            <Link
              href="#calculator"
              className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3.5 px-8 rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg text-lg"
            >
              See How Much I Can Save →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SEO CONTENT ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
            How to Save Income Tax in India (FY 2025-26 &amp; 2026-27)
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Every salaried Indian wants to legally reduce their income tax. The challenge: tax rules
              are complex, and most calculators only tell you HOW MUCH tax you owe — not HOW to reduce it.
              BachatGuru does both, in plain language.
            </p>
            <p>
              In the <strong>new tax regime</strong> (the default from FY 2025-26), income up to ₹12 lakh is
              effectively tax-free thanks to the Section 87A rebate. For salaried people, with the ₹75,000
              standard deduction, you can earn up to ₹12.75 lakh and pay zero tax — but the new regime does
              not allow most deductions like 80C or HRA.
            </p>
            <p>
              The <strong>old tax regime</strong> has higher slab rates but lets you claim deductions:
              Section 80C (up to ₹1.5 lakh), Section 80D (health insurance), Section 80CCD(1B) (extra ₹50,000
              in NPS), Section 24(b) (home loan interest up to ₹2 lakh), HRA, and more. Which regime wins
              depends entirely on your deductions — and our calculator compares both for you instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="bg-white rounded-2xl p-5 group border border-gray-100 shadow-sm">
                <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-emerald-600 text-2xl leading-none group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">{f.a}</p>
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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-gray-50 rounded-3xl p-7 border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function SaveCard({
  icon,
  tag,
  title,
  desc,
}: {
  icon: React.ReactNode;
  tag: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="mb-3">{icon}</div>
      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{tag}</span>
      <h3 className="text-lg font-bold text-gray-900 mt-1" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{desc}</p>
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
    a: "It depends on your deductions. If you have significant 80C investments, a home loan, and HRA, the old regime often saves more. With few deductions, the new regime usually wins. Our calculator compares both for your exact situation.",
  },
  {
    q: "What is the income tax slab for FY 2025-26?",
    a: "Under the new regime: 0-4L is nil, 4-8L is 5%, 8-12L is 10%, 12-16L is 15%, 16-20L is 20%, 20-24L is 25%, and above 24L is 30%. Income up to ₹12 lakh is effectively tax-free due to the 87A rebate.",
  },
  {
    q: "What does Section 80C mean?",
    a: "Section 80C is a part of the Income Tax Act that lets you reduce your taxable income by up to ₹1.5 lakh per year by investing in things like PPF, ELSS mutual funds, EPF, life insurance, and paying children's tuition fees.",
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
