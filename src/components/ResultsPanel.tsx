"use client";

import { useState } from "react";
import { formatINR, type ComparisonResult } from "@/lib/tax";
import type { Recommendation } from "@/lib/recommendations";
import CountUp from "./CountUp";

interface Props {
  result: ComparisonResult;
  recs: { recommendations: Recommendation[]; totalPotentialSaving: number };
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

export default function ResultsPanel({ result, recs }: Props) {
  const { oldRegime, newRegime, recommended, savingsByChoosingRecommended } = result;
  const recObj = recommended === "old" ? oldRegime : newRegime;
  const [copied, setCopied] = useState(false);

  const maxTax = Math.max(oldRegime.totalTax, newRegime.totalTax, 1);

  const handleShare = async () => {
    const text = `I used BachatGuru to compare my income tax. Recommended: ${
      recommended === "old" ? "Old" : "New"
    } regime — tax payable ${formatINR(recObj.totalTax)}. Try it free!`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "BachatGuru Tax Result", text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Headline result */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white text-center shadow-xl shadow-indigo-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative">
          <p className="text-indigo-100 text-sm uppercase tracking-wider mb-2">Recommended for you</p>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Choose the {recommended === "old" ? "Old" : "New"} Tax Regime
          </h2>
          <p className="text-indigo-50 text-lg">
            You pay{" "}
            <CountUp value={recObj.totalTax} className="font-extrabold text-yellow-300" /> in tax
            {savingsByChoosingRecommended > 0 && (
              <>
                {" "}— that&apos;s{" "}
                <span className="font-extrabold underline decoration-yellow-300">
                  {formatINR(savingsByChoosingRecommended)}
                </span>{" "}
                less than the {recommended === "old" ? "New" : "Old"} regime!
              </>
            )}
          </p>
          <button
            onClick={handleShare}
            className="mt-4 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            {copied ? "✓ Copied!" : "↗ Share my result"}
          </button>
        </div>
      </div>

      {/* Visual comparison bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Tax Comparison</h3>
        <CompareBar label="Old Regime" tax={oldRegime.totalTax} maxTax={maxTax} best={recommended === "old"} />
        <div className="h-3" />
        <CompareBar label="New Regime" tax={newRegime.totalTax} maxTax={maxTax} best={recommended === "new"} />
      </div>

      {/* Regime detail cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RegimeCard title="Old Regime" subtitle="With deductions (80C, 80D, HRA...)" data={oldRegime} isRecommended={recommended === "old"} />
        <RegimeCard title="New Regime" subtitle="Lower slabs, minimal deductions" data={newRegime} isRecommended={recommended === "new"} />
      </div>

      {/* Recommendations */}
      {recs.recommendations.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">💡 How You Can Save More Tax</h3>
            {recs.totalPotentialSaving > 0 && (
              <span className="bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold">
                Save up to {formatINR(recs.totalPotentialSaving)} more
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            These deductions apply under the <strong>Old Regime</strong>. Investing in them reduces your taxable income.
          </p>

          <div className="space-y-3">
            {recs.recommendations.map((rec) => (
              <div
                key={rec.id}
                className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          rec.priority === "high"
                            ? "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-300"
                            : rec.priority === "medium"
                            ? "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {rec.priority === "high" ? "High impact" : rec.priority === "medium" ? "Worth doing" : "Optional"}
                      </span>
                      <span className="text-xs text-slate-400">Section {rec.section}</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{rec.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{rec.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {rec.taxSaved > 0 && (
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">Save {formatINR(rec.taxSaved)}</p>
                    )}
                    <a
                      href={categoryLinks[rec.category] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/15 px-4 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/25 transition-colors"
                    >
                      {rec.ctaLabel} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 mt-5">
            * Estimated savings based on your marginal tax rate. Actual savings depend on your final taxable income.
            This is a guidance tool, not professional tax advice. Consult a CA for filing.
          </p>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300">
        <strong>Note:</strong> Calculations use FY 2025-26 / FY 2026-27 tax rules (Budget 2026, no slab changes).
        Surcharge for very high incomes (above ₹50L) is not included. Always verify with a qualified tax professional before filing.
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
        {isRecommended && (
          <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold">✓ Best</span>
        )}
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
