"use client";

import { formatINR, type ComparisonResult } from "@/lib/tax";
import type { Recommendation } from "@/lib/recommendations";

interface Props {
  result: ComparisonResult;
  recs: { recommendations: Recommendation[]; totalPotentialSaving: number };
}

const categoryLinks: Record<string, string> = {
  // Replace these with your real affiliate links to start earning.
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
  const otherObj = recommended === "old" ? newRegime : oldRegime;

  return (
    <div className="mt-8 space-y-6">
      {/* Headline result */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 md:p-8 text-white text-center shadow-xl">
        <p className="text-emerald-100 text-sm uppercase tracking-wide mb-2">
          Recommended for you
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          Choose the {recommended === "old" ? "Old" : "New"} Tax Regime
        </h2>
        <p className="text-emerald-50">
          You pay <span className="font-bold">{formatINR(recObj.totalTax)}</span> in tax
          {savingsByChoosingRecommended > 0 && (
            <>
              {" "}— that&apos;s <span className="font-bold underline">{formatINR(savingsByChoosingRecommended)}</span> less
              than the {recommended === "old" ? "New" : "Old"} regime!
            </>
          )}
        </p>
      </div>

      {/* Regime comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RegimeCard
          title="Old Regime"
          subtitle="With deductions (80C, 80D, HRA...)"
          data={oldRegime}
          isRecommended={recommended === "old"}
        />
        <RegimeCard
          title="New Regime"
          subtitle="Lower slabs, minimal deductions"
          data={newRegime}
          isRecommended={recommended === "new"}
        />
      </div>

      {/* Recommendations */}
      {recs.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
            <h3 className="text-xl font-bold text-gray-800">
              💡 How You Can Save More Tax
            </h3>
            {recs.totalPotentialSaving > 0 && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                Save up to {formatINR(recs.totalPotentialSaving)} more
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-5">
            These deductions apply under the <strong>Old Regime</strong>. Investing in them reduces your taxable income.
          </p>

          <div className="space-y-3">
            {recs.recommendations.map((rec) => (
              <div
                key={rec.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          rec.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : rec.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {rec.priority === "high" ? "High impact" : rec.priority === "medium" ? "Worth doing" : "Optional"}
                      </span>
                      <span className="text-xs text-gray-400">Section {rec.section}</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{rec.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {rec.taxSaved > 0 && (
                      <p className="text-emerald-600 font-bold text-lg">
                        Save {formatINR(rec.taxSaved)}
                      </p>
                    )}
                    <a
                      href={categoryLinks[rec.category] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      {rec.ctaLabel} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-5">
            * Estimated savings based on your marginal tax rate. Actual savings depend on your final taxable income.
            This is a guidance tool, not professional tax advice. Consult a CA for filing.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Note:</strong> Calculations use FY 2025-26 / FY 2026-27 tax rules (Budget 2026, no slab changes).
        Surcharge for very high incomes (above ₹50L) is not included. Always verify with a qualified tax professional before filing.
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
        isRecommended ? "border-emerald-500 bg-emerald-50/50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        {isRecommended && (
          <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
            ✓ Best
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <Row label="Gross Income" value={formatINR(data.grossIncome)} />
        <Row label="Total Deductions" value={"− " + formatINR(data.totalDeductions)} />
        <Row label="Taxable Income" value={formatINR(data.taxableIncome)} bold />
        {data.rebate87A > 0 && (
          <Row label="Tax Rebate (87A)" value={"− " + formatINR(data.rebate87A)} green />
        )}
        <Row label="Health & Edu Cess (4%)" value={formatINR(data.cess)} />
        <div className="border-t border-gray-200 my-2" />
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
      <span className="text-gray-500">{label}</span>
      <span
        className={`${bold ? "font-bold" : "font-medium"} ${
          large ? "text-lg" : ""
        } ${green ? "text-emerald-600" : "text-gray-800"}`}
      >
        {value}
      </span>
    </div>
  );
}
