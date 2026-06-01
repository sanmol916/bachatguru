"use client";

import { useState } from "react";
import { compareRegimes, type TaxInput, type AgeGroup } from "@/lib/tax";
import { getPersonalizedPlan, type PersonalContext, type PersonalizedPlan } from "@/lib/recommendations";
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

const salaryPresets = [
  { label: "₹5L", value: "500000" },
  { label: "₹10L", value: "1000000" },
  { label: "₹15L", value: "1500000" },
  { label: "₹20L", value: "2000000" },
  { label: "₹30L", value: "3000000" },
];

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

  // Personal context — what makes the plan PERSONALIZED
  const [ctx, setCtx] = useState<PersonalContext>({
    maritalStatus: "single",
    dependentSeniorParents: false,
    housing: "rented",
    schoolKids: false,
    riskAppetite: "medium",
  });

  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof compareRegimes> | null>(null);
  const [plan, setPlan] = useState<PersonalizedPlan | null>(null);
  const [error, setError] = useState("");

  const num = (v: string) => (v === "" ? 0 : Math.max(0, parseFloat(v) || 0));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.grossSalary || num(form.grossSalary) <= 0) {
      setError("Please enter your annual salary to build your plan.");
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
    setPlan(getPersonalizedPlan(input, ctx));
    setShowResults(true);

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const inputClass =
    "w-full pl-7 pr-3 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 outline-none transition-all text-slate-800 dark:text-slate-100 font-medium";

  const field = (
    label: string,
    key: keyof typeof form,
    placeholder: string,
    tip: { title: string; text: string }
  ) => (
    <div>
      <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
        <InfoTip title={tip.title}>{tip.text}</InfoTip>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
        <input
          type="number"
          min="0"
          inputMode="numeric"
          value={form[key] as string}
          onChange={update(key)}
          placeholder={placeholder}
          className={inputClass}
        />
      </div>
    </div>
  );

  // Chip selector for personal context
  function ChipGroup<T extends string>({
    label,
    value,
    options,
    onChange,
  }: {
    label: string;
    value: T;
    options: { label: string; value: T }[];
    onChange: (v: T) => void;
  }) {
    return (
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
        <div className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                value === o.value
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form
        onSubmit={handleCalculate}
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-indigo-500/5 border border-slate-100 dark:border-slate-800 overflow-hidden"
      >
        {/* Step 1: Income */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 md:px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white text-xl font-bold">1</div>
            <div>
              <h3 className="text-lg font-bold text-white">Your Income</h3>
              <p className="text-sm text-indigo-100">Enter annual figures (per year, not monthly)</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-5">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Quick pick your salary:</p>
            <div className="flex flex-wrap gap-2">
              {salaryPresets.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setForm({ ...form, grossSalary: p.value })}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
                    form.grossSalary === p.value
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

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
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Age Group</label>
              <select
                value={form.ageGroup}
                onChange={update("ageGroup")}
                className="w-full px-3 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 outline-none transition-all text-slate-800 dark:text-slate-100 font-medium"
              >
                <option value="below60">Below 60 years</option>
                <option value="senior">Senior Citizen (60-80)</option>
                <option value="supersenior">Super Senior (80+)</option>
              </select>
            </div>
          </div>

          {/* Step 2: About you (personalization) */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xl font-bold">2</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">About You</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">This is what makes your plan personal — not generic.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <ChipGroup
              label="Marital status"
              value={ctx.maritalStatus}
              onChange={(v) => setCtx({ ...ctx, maritalStatus: v })}
              options={[
                { label: "Single", value: "single" },
                { label: "Married", value: "married" },
              ]}
            />
            <ChipGroup
              label="Dependent senior-citizen parents?"
              value={ctx.dependentSeniorParents ? "yes" : "no"}
              onChange={(v) => setCtx({ ...ctx, dependentSeniorParents: v === "yes" })}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
            <ChipGroup
              label="Your home"
              value={ctx.housing}
              onChange={(v) => setCtx({ ...ctx, housing: v })}
              options={[
                { label: "Own (with loan)", value: "own_loan" },
                { label: "Own (no loan)", value: "own_noloan" },
                { label: "Rented", value: "rented" },
                { label: "With family", value: "family" },
              ]}
            />
            <ChipGroup
              label="Children in school?"
              value={ctx.schoolKids ? "yes" : "no"}
              onChange={(v) => setCtx({ ...ctx, schoolKids: v === "yes" })}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
            <div className="md:col-span-2">
              <ChipGroup
                label="Your investment risk appetite"
                value={ctx.riskAppetite}
                onChange={(v) => setCtx({ ...ctx, riskAppetite: v })}
                options={[
                  { label: "Low (safe)", value: "low" },
                  { label: "Medium (balanced)", value: "medium" },
                  { label: "High (growth)", value: "high" },
                ]}
              />
            </div>
          </div>

          {/* Step 3: Current deductions */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-xl font-bold">3</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">What You Already Invest</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t know these? Tap the <span className="font-bold text-indigo-600 dark:text-indigo-400">?</span> — and leave blank if none.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl px-4 py-3 my-4 text-sm text-amber-800 dark:text-amber-300">
            💡 New to taxes? Leave these blank. We&apos;ll build your plan from scratch and tell you exactly what to invest in.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {field("Section 80C", "section80C", "e.g. 100000", {
              title: "Section 80C (max ₹1.5 lakh)",
              text: "The most popular tax-saver. Reduces taxable income by up to ₹1.5 lakh/year. Counts: PPF, ELSS mutual funds, EPF, life insurance premiums, 5-year tax-saver FDs, and children's school tuition fees.",
            })}
            {field("NPS — Section 80CCD(1B)", "section80CCD1B", "e.g. 0", {
              title: "NPS — Section 80CCD(1B) (max ₹50,000)",
              text: "The National Pension System gives an EXTRA ₹50,000 deduction over and above the ₹1.5 lakh 80C limit. Total possible: ₹2 lakh.",
            })}
            {field("Health Insurance — 80D", "section80D", "e.g. 25000", {
              title: "Section 80D — Health Insurance",
              text: "Premiums for health insurance. Up to ₹25,000 for you & family (₹50,000 if senior), PLUS up to ₹50,000 for senior-citizen parents.",
            })}
            {field("Home Loan Interest — 24(b)", "homeLoanInterest", "e.g. 0", {
              title: "Section 24(b) — Home Loan Interest",
              text: "The INTEREST part of your home-loan EMIs (not principal) is deductible up to ₹2 lakh/year for a house you live in.",
            })}
            {field("HRA Exemption", "hraExemption", "e.g. 0", {
              title: "HRA — House Rent Allowance",
              text: "If you rent and get HRA, part of it is tax-free: the lowest of actual HRA, 50%/40% of basic, or rent minus 10% of basic.",
            })}
            {field("Other Deductions", "otherDeductions", "e.g. 0", {
              title: "Other Deductions",
              text: "80E (education loan interest), 80G (donations), 80TTA (savings interest up to ₹10,000), 80EEB (EV loan interest).",
            })}
          </div>

          {error && (
            <div className="mt-5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 text-red-700 dark:text-red-400 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-7 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-4 rounded-2xl hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-500/30 text-lg active:scale-[0.99]"
          >
            Build My Personalized Tax-Saving Plan →
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            🔒 100% private. All maths runs in your browser. We never store or see your data.
          </p>
        </div>
      </form>

      {showResults && result && plan && (
        <div id="results" className="animate-fade-up">
          <ResultsPanel result={result} plan={plan} />
        </div>
      )}
    </div>
  );
}
