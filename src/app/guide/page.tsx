import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Complete Tax Saving Guide India 2025-26 - 80C, 80D, NPS, Home Loan",
  description:
    "Complete guide to saving income tax in India for FY 2025-26 & 2026-27. Learn about Section 80C, 80D, NPS, home loan benefits, HRA, and the best tax-saving investments.",
  keywords: [
    "tax saving guide india",
    "how to save income tax",
    "section 80C explained",
    "80D health insurance deduction",
    "NPS tax benefit 80CCD",
    "home loan tax benefit",
    "HRA exemption calculation",
  ],
};

const sections = [
  {
    id: "80c",
    title: "Section 80C — Up to ₹1.5 Lakh Deduction",
    body: "The most popular tax-saving section. You can claim up to ₹1.5 lakh per year by investing in: ELSS mutual funds (best for growth, 3-year lock-in), PPF (safe, 15-year, tax-free), EPF (auto-deducted from salary), life insurance premiums, NSC, tax-saving FDs (5-year), Sukanya Samriddhi (for daughters), home loan principal repayment, and children's tuition fees. In the 30% bracket, fully using 80C saves up to ₹46,800 including cess.",
  },
  {
    id: "nps",
    title: "Section 80CCD(1B) — Extra ₹50,000 via NPS",
    body: "The National Pension System (NPS) gives you an ADDITIONAL ₹50,000 deduction over and above the ₹1.5 lakh 80C limit. This is the only way to claim a total of ₹2 lakh in retirement-linked deductions. NPS is the lowest-cost pension product in India with market-linked returns. Ideal for long-term retirement planning.",
  },
  {
    id: "80d",
    title: "Section 80D — Health Insurance Premium",
    body: "Premiums paid for health insurance are deductible: up to ₹25,000 for yourself, spouse, and children (₹50,000 if you're a senior citizen), PLUS up to ₹50,000 for your parents if they're senior citizens. This means a total possible deduction of ₹75,000-₹1,00,000. Health insurance protects your savings from medical emergencies AND cuts your tax — a double benefit.",
  },
  {
    id: "homeloan",
    title: "Section 24(b) — Home Loan Interest",
    body: "If you have a home loan on a self-occupied property, the interest you pay is deductible up to ₹2 lakh per year under Section 24(b). The principal repayment counts separately under 80C. For a let-out (rented) property, there's no upper limit on interest deduction (subject to loss set-off rules). This makes home ownership significantly more tax-efficient.",
  },
  {
    id: "hra",
    title: "HRA — House Rent Allowance Exemption",
    body: "If you live in a rented house and receive HRA as part of your salary, you can claim an exemption. The exempt amount is the LEAST of: (1) actual HRA received, (2) 50% of basic salary (metro) or 40% (non-metro), or (3) rent paid minus 10% of basic salary. Keep rent receipts and your landlord's PAN (if rent exceeds ₹1 lakh/year).",
  },
  {
    id: "others",
    title: "Other Useful Deductions",
    body: "Section 80E: full interest on education loans (no upper limit, for 8 years). Section 80G: donations to approved charities (50-100% deductible). Section 80TTA: up to ₹10,000 on savings account interest. Section 80TTB: up to ₹50,000 interest for senior citizens. Section 80EEB: up to ₹1.5 lakh interest on electric vehicle loans.",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-700 to-teal-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Complete Tax Saving Guide (FY 2025-26)
          </h1>
          <p className="text-emerald-50">
            Everything you need to know to legally minimize your income tax in India.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8 text-center">
          <p className="text-emerald-800 font-medium mb-3">
            Want to know exactly how much YOU can save?
          </p>
          <Link
            href="/#calculator"
            className="inline-block bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Use the Free Calculator →
          </Link>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="bg-white rounded-xl p-6 border border-gray-200 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-800 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-8 text-sm text-blue-800">
          <strong>Disclaimer:</strong> This guide is for educational purposes and reflects FY 2025-26 / 2026-27
          rules. Tax laws are complex and change over time. Always consult a qualified Chartered Accountant
          before making investment or filing decisions.
        </div>
      </div>
    </div>
  );
}
