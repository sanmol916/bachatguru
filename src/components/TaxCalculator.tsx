"use client";

import { useState } from "react";
import {
  compareRegimes,
  formatINR,
  type TaxInput,
  type AgeGroup,
} from "@/lib/tax";
import { getRecommendations, type Recommendation } from "@/lib/recommendations";
import ResultsPanel from "./ResultsPanel";

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
      setError("Please enter your annual salary to calculate tax.");
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

    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const field = (
    label: string,
    key: keyof typeof form,
    placeholder: string,
    hint?: string
  ) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
        <input
          type="number"
          min="0"
          value={form[key] as string}
          onChange={update(key)}
          placeholder={placeholder}
          className="w-full pl-7 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-gray-800"
        />
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form
        onSubmit={handleCalculate}
        className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 md:p-8"
      >
        {/* Income Section */}
        <h3 className="text-lg font-bold text-gray-800 mb-1">Your Income</h3>
        <p className="text-sm text-gray-500 mb-4">Enter your annual figures (per year, not monthly)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {field("Annual Salary (CTC)", "grossSalary", "e.g. 1200000", "Your total yearly salary income")}
          {field("Other Income", "otherIncome", "e.g. 50000", "Interest, rent, freelance, etc.")}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Age Group</label>
            <select
              value={form.ageGroup}
              onChange={update("ageGroup")}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-gray-800"
            >
              <option value="below60">Below 60 years</option>
              <option value="senior">Senior Citizen (60-80)</option>
              <option value="supersenior">Super Senior (80+)</option>
            </select>
          </div>
        </div>

        {/* Deductions Section */}
        <h3 className="text-lg font-bold text-gray-800 mb-1">Your Current Investments &amp; Deductions</h3>
        <p className="text-sm text-gray-500 mb-4">
          What you already invest/claim. Leave blank if none — we&apos;ll suggest how to save more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {field("Section 80C", "section80C", "e.g. 100000", "PPF, ELSS, EPF, LIC, tuition (max ₹1.5L)")}
          {field("NPS - Section 80CCD(1B)", "section80CCD1B", "e.g. 0", "Extra NPS investment (max ₹50K)")}
          {field("Health Insurance - 80D", "section80D", "e.g. 25000", "Medical insurance premium")}
          {field("Home Loan Interest - 24(b)", "homeLoanInterest", "e.g. 0", "Interest paid on home loan (max ₹2L)")}
          {field("HRA Exemption", "hraExemption", "e.g. 0", "House Rent Allowance exemption")}
          {field("Other Deductions", "otherDeductions", "e.g. 0", "80E, 80G, 80TTA, etc.")}
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl text-lg"
        >
          Calculate My Tax &amp; Savings →
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          🔒 100% private. Your data never leaves your browser. Nothing is stored.
        </p>
      </form>

      {showResults && result && recs && (
        <div id="results">
          <ResultsPanel result={result} recs={recs} />
        </div>
      )}
    </div>
  );
}
