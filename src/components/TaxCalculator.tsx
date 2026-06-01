"use client";

import { useState } from "react";
import {
  compareRegimes,
  type TaxInput,
  type AgeGroup,
} from "@/lib/tax";
import { getRecommendations, type Recommendation } from "@/lib/recommendations";
import ResultsPanel from "./ResultsPanel";
import InfoTip from "./InfoTip";

const emptyInput: TaxInput = {
  grossSalary: 0,
  otherIncome: 0,
  ageGroup: "below60",
  section80C: 0,
  section80D: 0,
  section80CCD1B: 0,
  homeLoanInterest: 0,
  hraExemption: 0,
  otherDeductions: 0,
};

export default function TaxCalculator() {
  const [form, setForm] = useState({
    grossSalary: "",
    otherIncome: "",
    ageGroup: "below60" as AgeGroup,
    section80C: "",
    section80D: "",
    section80CCD1B: "",
    homeLoanInterest: "",
    hraExemption: "",
    otherDeductions: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof compareRegimes> | null>(null);
  const [recs, setRecs] = useState<{
    recommendations: Recommendation[];
    totalPotentialSaving: number;
  } | null>(null);
  const [error, setError] = useState("");

  const num = (v: string) => (v === "" ? 0 : Math.max(0, parseFloat(v) || 0));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.grossSalary || num(form.grossSalary) <= 0) {
      setError("Please enter your annual salary to calculate your tax.");
      return;
    }

    const input: TaxInput = {
      ...emptyInput,
      grossSalary: num(form.grossSalary),
      otherIncome: num(form.otherIncome),
      ageGroup: form.ageGroup,
      section80C: num(form.section80C),
      section80D: num(form.section80D),
      section80CCD1B: num(form.section80CCD1B),
      homeLoanInterest: num(form.homeLoanInterest),
      hraExemption: num(form.hraExemption),
      otherDeductions: num(form.otherDeductions),
    };

    setResult(compareRegimes(input));
    setRecs(getRecommendations(input));
    setShowResults(true);

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const field = (
    label: string,
    key: keyof typeof form,
    placeholder: string,
    tip: { title: string; text: string }
  ) => (
    <div>
      <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        <InfoTip title={tip.title}>{tip.text}</InfoTip>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
        <input
          type="number"
          min="0"
          inputMode="numeric"
          value={form[key] as string}
          onChange={update(key)}
          placeholder={placeholder}
          className="w-full pl-7 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 font-medium"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form
        onSubmit={handleCalculate}
        className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden"
      >
        {/* Income header band */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 md:px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white text-xl font-bold">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Your Income</h3>
              <p className="text-sm text-emerald-50">Enter annual figures (per year, not monthly)</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {field("Annual Salary (CTC)", "grossSalary", "e.g. 1200000", {
              title: "Annual Salary / CTC",
              text: "Your total yearly salary income before deductions. A rough figure from your offer letter or Form 16 is perfectly fine.",
            })}
            {field("Other Income", "otherIncome", "e.g. 50000", {
              title: "Other Income",
              text: "Any income apart from salary — bank or fixed-deposit interest, rent received, freelance or business earnings, etc.",
            })}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Age Group</label>
              <select
                value={form.ageGroup}
                onChange={update("ageGroup")}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 font-medium"
              >
                <option value="below60">Below 60 years</option>
                <option value="senior">Senior Citizen (60-80)</option>
                <option value="supersenior">Super Senior (80+)</option>
              </select>
            </div>
          </div>

          {/* Deductions header */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Your Investments &amp; Deductions</h3>
              <p className="text-sm text-gray-500">
                Don&apos;t know these? Tap the <span className="font-bold text-emerald-600">?</span> icons — we explain each one in simple words.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 my-4 text-sm text-amber-800">
            💡 New to taxes? Leave these blank and just enter your salary. We&apos;ll still calculate your tax AND show you what to invest in to save more.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {field("Section 80C", "section80C", "e.g. 100000", {
              title: "Section 80C (max ₹1.5 lakh)",
              text: "The most popular tax-saver. Reduces your taxable income by up to ₹1.5 lakh/year. Counts: PPF, ELSS mutual funds, EPF (cut from your salary), life insurance premiums, 5-year tax-saver FDs, and your children's school tuition fees.",
            })}
            {field("NPS — Section 80CCD(1B)", "section80CCD1B", "e.g. 0", {
              title: "NPS — Section 80CCD(1B) (max ₹50,000)",
              text: "The National Pension System. Investing here gives you an EXTRA ₹50,000 deduction — over and above the ₹1.5 lakh 80C limit. It's a low-cost retirement scheme. Total possible: ₹2 lakh (80C + NPS).",
            })}
            {field("Health Insurance — 80D", "section80D", "e.g. 25000", {
              title: "Section 80D — Health Insurance",
              text: "Premiums you pay for health/medical insurance. Claim up to ₹25,000 for yourself & family (₹50,000 if you're a senior citizen), PLUS up to ₹50,000 more for insuring senior-citizen parents.",
            })}
            {field("Home Loan Interest — 24(b)", "homeLoanInterest", "e.g. 0", {
              title: "Section 24(b) — Home Loan Interest",
              text: "If you pay EMIs on a home loan, the INTEREST part (not the principal) is deductible up to ₹2 lakh/year for a house you live in. The principal repayment is counted separately under 80C.",
            })}
            {field("HRA Exemption", "hraExemption", "e.g. 0", {
              title: "HRA — House Rent Allowance",
              text: "If you live in a rented home and get HRA in your salary, part of it is tax-free. Roughly the lowest of: actual HRA received, 50% of basic salary (metro)/40% (non-metro), or rent paid minus 10% of basic. Keep your rent receipts.",
            })}
            {field("Other Deductions", "otherDeductions", "e.g. 0", {
              title: "Other Deductions",
              text: "Other useful sections: 80E (education loan interest), 80G (donations to charity), 80TTA (up to ₹10,000 savings-account interest), 80EEB (electric vehicle loan interest). Add the total here if any apply.",
            })}
          </div>

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-7 w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl text-lg active:scale-[0.99]"
          >
            Calculate My Tax &amp; Show Savings →
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            🔒 100% private. All maths runs in your browser. We never store or see your data.
          </p>
        </div>
      </form>

      {showResults && result && recs && (
        <div id="results" className="animate-fade-up">
          <ResultsPanel result={result} recs={recs} />
        </div>
      )}
    </div>
  );
}
