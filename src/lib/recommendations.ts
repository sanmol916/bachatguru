import { TaxInput, calculateOldRegime, formatINR } from "./tax";

export interface Recommendation {
  id: string;
  title: string;
  section: string;
  description: string;
  investNow: number; // amount they can still invest
  taxSaved: number; // tax they would save
  priority: "high" | "medium" | "low";
  category: "elss" | "insurance" | "nps" | "ppf" | "homeloan" | "health" | "other";
  ctaLabel: string;
}

// Marginal tax rate in OLD regime (used to estimate savings from deductions)
function marginalRateOld(taxableIncome: number, ageGroup: TaxInput["ageGroup"]): number {
  const basicExemption =
    ageGroup === "supersenior" ? 500000 : ageGroup === "senior" ? 300000 : 250000;
  if (taxableIncome <= basicExemption) return 0;
  if (taxableIncome <= 500000) return 0.05;
  if (taxableIncome <= 1000000) return 0.2;
  return 0.3;
}

// Generate personalized tax-saving recommendations.
// These deductions only help in the OLD regime, so we estimate based on it.
export function getRecommendations(input: TaxInput): {
  recommendations: Recommendation[];
  totalPotentialSaving: number;
} {
  const recs: Recommendation[] = [];
  const old = calculateOldRegime(input);
  const rate = marginalRateOld(old.taxableIncome, input.ageGroup);
  const cessMultiplier = 1.04; // include 4% cess in savings

  // 1. Section 80C headroom (cap 1.5L)
  const used80C = Math.min(input.section80C, 150000);
  const headroom80C = 150000 - used80C;
  if (headroom80C > 0 && rate > 0) {
    const saved = headroom80C * rate * cessMultiplier;
    recs.push({
      id: "80c-elss",
      title: `Invest ${formatINR(headroom80C)} more under Section 80C`,
      section: "80C",
      description: `You have ${formatINR(headroom80C)} unused 80C limit. Invest in ELSS mutual funds (3-year lock-in, equity growth), PPF, or pay life insurance premium to claim this deduction.`,
      investNow: headroom80C,
      taxSaved: Math.round(saved),
      priority: "high",
      category: "elss",
      ctaLabel: "Explore ELSS Funds",
    });
  }

  // 2. Section 80CCD(1B) - extra NPS (cap 50k, over and above 80C)
  const used80CCD1B = Math.min(input.section80CCD1B, 50000);
  const headroomNPS = 50000 - used80CCD1B;
  if (headroomNPS > 0 && rate > 0) {
    const saved = headroomNPS * rate * cessMultiplier;
    recs.push({
      id: "80ccd1b-nps",
      title: `Invest ${formatINR(headroomNPS)} in NPS (Section 80CCD-1B)`,
      section: "80CCD(1B)",
      description: `NPS gives an EXTRA ${formatINR(50000)} deduction over and above 80C. Great for retirement, lowest-cost pension product in India.`,
      investNow: headroomNPS,
      taxSaved: Math.round(saved),
      priority: "high",
      category: "nps",
      ctaLabel: "Open NPS Account",
    });
  }

  // 3. Section 80D - health insurance
  const selfLimit = input.ageGroup === "below60" ? 25000 : 50000;
  // Assume parents' cover possible: add a parent bucket (senior parents = 50k)
  const recommendedHealthCover = selfLimit + 50000; // self/family + parents
  const used80D = input.section80D;
  const headroom80D = Math.max(0, recommendedHealthCover - used80D);
  if (headroom80D > 0 && rate > 0) {
    const saved = headroom80D * rate * cessMultiplier;
    recs.push({
      id: "80d-health",
      title: `Buy health insurance — claim up to ${formatINR(headroom80D)} (Section 80D)`,
      section: "80D",
      description: `Health insurance premium for yourself (${formatINR(selfLimit)}) and your parents (up to ${formatINR(50000)} if senior citizens) is deductible. Protects your savings AND cuts tax.`,
      investNow: headroom80D,
      taxSaved: Math.round(saved),
      priority: "medium",
      category: "health",
      ctaLabel: "Compare Health Plans",
    });
  }

  // 4. Home loan interest (Section 24b, cap 2L)
  const usedHomeLoan = Math.min(input.homeLoanInterest, 200000);
  const headroomHomeLoan = 200000 - usedHomeLoan;
  if (usedHomeLoan > 0 && headroomHomeLoan > 0 && rate > 0) {
    const saved = headroomHomeLoan * rate * cessMultiplier;
    recs.push({
      id: "24b-homeloan",
      title: `You can claim ${formatINR(headroomHomeLoan)} more home loan interest`,
      section: "24(b)",
      description: `Self-occupied home loan interest is deductible up to ${formatINR(200000)}/year. You've used ${formatINR(usedHomeLoan)}. Pre-paying or a top-up loan can use the remaining limit.`,
      investNow: 0,
      taxSaved: Math.round(saved),
      priority: "low",
      category: "homeloan",
      ctaLabel: "Check Home Loan Options",
    });
  }

  // 5. Term insurance reminder (counts under 80C but also vital protection)
  if (rate > 0) {
    recs.push({
      id: "term-insurance",
      title: "Get term life insurance (protection + 80C benefit)",
      section: "80C",
      description: `If you have dependents, a term plan is essential. Premiums qualify under 80C. A ₹1 crore cover costs as little as ₹800/month for a healthy 30-year-old.`,
      investNow: 0,
      taxSaved: 0,
      priority: headroom80C > 0 ? "medium" : "low",
      category: "insurance",
      ctaLabel: "Compare Term Plans",
    });
  }

  const totalPotentialSaving = recs.reduce((sum, r) => sum + r.taxSaved, 0);

  // Sort by tax saved (highest first), then priority
  recs.sort((a, b) => b.taxSaved - a.taxSaved);

  return { recommendations: recs, totalPotentialSaving: Math.round(totalPotentialSaving) };
}
