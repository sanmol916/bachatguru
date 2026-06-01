"use client";

import { useState } from "react";
import { formatINR, type ComparisonResult } from "@/lib/tax";
import type { PersonalizedPlan } from "@/lib/recommendations";
import CountUp from "./CountUp";

interface Props {
  result: ComparisonResult;
  plan: PersonalizedPlan;
}

// Replace these "#" with your real affiliate links to start earning.
const categoryLinks: Record<string, string> = {
  elss: "#",
  insurance: "#",
  nps: "#",
  ppf: "#",
  homeloan: "#",
  health: "#",
  other: "#",
};

export default function ResultsPanel({ result, plan }: Props) {
  const { oldRegime, newRegime, recommended } = result;
  const [copied, setCopied] = useState(false);
  const maxTax = Math.max(oldRegime.totalTax, newRegime.totalTax, 1);

  const handleShare = async () => {
    const text = `My personalized tax plan on BachatGuru: invest ₹${plan.totalToInvest.toLocaleString(
      "en-IN"
    )} and cut my tax from ${formatINR(plan.baselineTax)} to ${formatINR(
      plan.optimizedTax
    )} — saving ${formatINR(plan.totalTaxSaved)}/year. Build yours free!`;
    try {
      if (navigator.share) await navigator.share({ title: "My BachatGuru Tax Plan", text });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="mt-8 space-y-6">
      {/* ===== PERSONALIZED PLAN HEADLINE ===== */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative">
          <p className="text-indigo-100 text-sm uppercase tracking-wider mb-1">Your Personalized Tax-Saving Plan</p>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-5">
            {plan.totalTaxSaved > 0 ? (
              <>You can save <span className="text-yellow-300"><CountUp value={plan.totalTaxSaved} /></span> in tax this year</>
            ) : (
              <>You&apos;re already tax-optimized 🎉</>
            )}
          </h2>

          {/* before -> after */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 bg-white/10 backdrop-blur rounded-2xl p-4">
            <div className="text-center">
              <p className="text-xs text-indigo-100 mb-1">Tax now</p>
              <p className="text-lg md:text-2xl font-extrabold">{formatINR(plan.baselineTax)}</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="text-xs text-indigo-100 mb-1">After plan</p>
              <p className="text-lg md:text-2xl font-extrabold text-yellow-300">
                <CountUp value={plan.optimizedTax} />
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-indigo-100 mb-1">You invest</p>
              <p className="text-lg md:text-2xl font-extrabold">{formatINR(plan.totalToInvest)}</p>
            </div>
          </div>

          <p className="text-sm text-indigo-50 mt-4">{plan.regimeNote}</p>

          <button
            onClick={handleShare}
            className="mt-4 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            {copied ? "✓ Copied!" : "↗ Share my plan"}
          </button>
        </div>
      </div>

      {/* ===== ACTION STEPS ===== */}
      {plan.steps.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
            Your action plan — do these in order
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            Tailored to your situation. Each step shows exactly how much to invest and the tax it saves.
          </p>

          <ol className="space-y-3">
            {plan.steps.map((step, i) => (
              <li
                key={step.id}
                className="relative border border-slate-200 dark:border-slate-700 rounded-xl p-4 pl-14 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all"
              >
                <span className="absolute left-4 top-4 w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-slate-400">Section {step.section}</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{step.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{step.why}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {step.advisoryOnly ? (
                      <p className="text-indigo-500 dark:text-indigo-400 font-semibold text-sm">Check eligibility</p>
                    ) : step.taxSaved > 0 ? (
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">Save {formatINR(step.taxSaved)}</p>
                    ) : (
                      <p className="text-slate-400 text-sm">Wealth-building</p>
                    )}
                    <a
                      href={categoryLinks[step.category] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/15 px-4 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/25 transition-colors"
                    >
                      {step.ctaLabel} →
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <p className="text-xs text-slate-400 mt-5">
            * Savings are estimates based on your inputs and FY 2025-26 / 2026-27 rules. This is guidance, not professional tax advice — consult a CA before filing.
          </p>
        </div>
      )}

      {/* ===== REGIME COMPARISON ===== */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Old vs New Regime (your current numbers)</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Recommended right now: <strong className="text-indigo-600 dark:text-indigo-400">{recommended === "old" ? "Old" : "New"} Regime</strong>
        </p>
        <CompareBar label="Old Regime" tax={oldRegime.totalTax} maxTax={maxTax} best={recommended === "old"} />
        <div className="h-3" />
        <CompareBar label="New Regime" tax={newRegime.totalTax} maxTax={maxTax} best={recommended === "new"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RegimeCard title="Old Regime" subtitle="With deductions (80C, 80D, HRA...)" data={oldRegime} isRecommended={recommended === "old"} />
        <RegimeCard title="New Regime" subtitle="Lower slabs, minimal deductions" data={newRegime} isRecommended={recommended === "new"} />
      </div>

      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300">
        <strong>Note:</strong> Calculations use FY 2025-26 / FY 2026-27 tax rules (Budget 2026, no slab changes).
        Surcharge for incomes above ₹50L is not included. Always verify with a qualified tax professional before filing.
      </div>
    </div>
  );
}

function CompareBar({ label, tax, maxTax, best }: { label: string; tax: number; maxTax: number; best: boolean }) {
  const pct = Math.max(4, Math.round((tax / maxTax) * 100));
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {label} {best && <span className="text-emerald-600 dark:text-emerald-400">· Best</span>}
        </span>
        <span className="font-bold text-slate-800 dark:text-slate-100">{formatINR(tax)}</span>
      </div>
      <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            best ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-indigo-500 to-violet-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function RegimeCard({
  title,
  subtitle,
  data,
  isRecommended,
}: {
  title: string;
  subtitle: string;
  data: ComparisonResult["oldRegime"];
  isRecommended: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border-2 ${
        isRecommended
          ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        {isRecommended && <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold">✓ Best</span>}
      </div>

      <div className="space-y-2 text-sm">
        <Row label="Gross Income" value={formatINR(data.grossIncome)} />
        <Row label="Total Deductions" value={"− " + formatINR(data.totalDeductions)} />
        <Row label="Taxable Income" value={formatINR(data.taxableIncome)} bold />
        {data.rebate87A > 0 && <Row label="Tax Rebate (87A)" value={"− " + formatINR(data.rebate87A)} green />}
        <Row label="Health & Edu Cess (4%)" value={formatINR(data.cess)} />
        <div className="border-t border-slate-200 dark:border-slate-700 my-2" />
        <Row label="Total Tax Payable" value={formatINR(data.totalTax)} bold large />
        <Row label="Take Home (approx)" value={formatINR(data.takeHome)} green />
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  large,
  green,
}: {
  label: string;
  value: string;
  bold?: boolean;
  large?: boolean;
  green?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span
        className={`${bold ? "font-bold" : "font-medium"} ${large ? "text-lg" : ""} ${
          green ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-100"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
