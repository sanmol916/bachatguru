import { TaxInput, calculateOldRegime, calculateNewRegime } from "./tax";

// ---- Personal context that makes the plan truly personalized ----
export interface PersonalContext {
  maritalStatus: "single" | "married";
  dependentSeniorParents: boolean; // parents you can insure (senior citizens)
  housing: "own_loan" | "own_noloan" | "rented" | "family";
  schoolKids: boolean;
  riskAppetite: "low" | "medium" | "high";
}

export interface ProductSplit {
  product: string;
  amount: number;
}

export interface PlanStep {
  id: string;
  title: string;
  section: string;
  invest: number; // money you put in (0 for "claim what you already pay" steps)
  taxSaved: number; // tax reduced by this step (old-regime basis)
  why: string;
  category: string; // for affiliate links
  ctaLabel: string;
  advisoryOnly?: boolean; // step where we can't compute exact savings
  breakdown?: ProductSplit[]; // income/risk-based product allocation
}

// Split the 80C amount into specific products based on risk appetite.
function split80C(amount: number, risk: PersonalContext["riskAppetite"]): ProductSplit[] {
  const round = (n: number) => Math.max(0, Math.round(n / 500) * 500);
  let weights: [string, number][];
  if (risk === "high") weights = [["ELSS mutual funds", 0.8], ["PPF", 0.2]];
  else if (risk === "low") weights = [["PPF", 0.7], ["5-year tax-saving FD", 0.3]];
  else weights = [["ELSS mutual funds", 0.5], ["PPF", 0.5]];

  const parts: ProductSplit[] = [];
  let allocated = 0;
  weights.forEach(([product, w], i) => {
    let amt: number;
    if (i === weights.length - 1) amt = Math.max(0, amount - allocated);
    else {
      amt = round(amount * w);
      allocated += amt;
    }
    parts.push({ product, amount: amt });
  });
  return parts;
}

export interface PersonalizedPlan {
  steps: PlanStep[];
  baselineTax: number; // best tax you'd pay TODAY (min of old/new with current inputs)
  optimizedTax: number; // best tax AFTER following the plan
  totalTaxSaved: number;
  totalToInvest: number;
  recommendedRegime: "old" | "new";
  regimeNote: string;
  newRegimeTax: number;
  optimizedOldTax: number;
}

function riskProduct(risk: PersonalContext["riskAppetite"]) {
  if (risk === "high")
    return {
      product: "ELSS mutual funds",
      category: "elss",
      cta: "Explore ELSS Funds",
      note: "ELSS has the shortest lock-in (3 years) of all 80C options and equity-level growth — ideal for your high risk appetite.",
    };
  if (risk === "low")
    return {
      product: "PPF or a 5-year tax-saving FD",
      category: "ppf",
      cta: "Open a PPF Account",
      note: "PPF is government-backed and fully safe with tax-free returns — perfect for a low risk appetite.",
    };
  return {
    product: "a mix of ELSS and PPF",
    category: "elss",
    cta: "Explore ELSS & PPF",
    note: "Splitting between ELSS (growth) and PPF (safe, tax-free) balances risk and return for you.",
  };
}

export function getPersonalizedPlan(
  input: TaxInput,
  ctx: PersonalContext
): PersonalizedPlan {
  const newRegimeTax = calculateNewRegime(input).totalTax;
  const baselineOldTax = calculateOldRegime(input).totalTax;
  const baselineTax = Math.min(newRegimeTax, baselineOldTax);

  const working: TaxInput = { ...input };
  let prevOldTax = baselineOldTax;
  const steps: PlanStep[] = [];

  // helper: apply a field change, recompute old-regime tax, return saving
  const applyAndMeasure = (apply: () => void): number => {
    apply();
    const newTax = calculateOldRegime(working).totalTax;
    const saved = Math.max(0, prevOldTax - newTax);
    prevOldTax = newTax;
    return saved;
  };

  // 1) Section 80C headroom
  const used80C = Math.min(input.section80C, 150000);
  const add80C = 150000 - used80C;
  if (add80C > 0) {
    const rp = riskProduct(ctx.riskAppetite);
    const breakdown = split80C(add80C, ctx.riskAppetite);
    const kidsNote = ctx.schoolKids
      ? " Tip: your children's school tuition fees already count under 80C — count those first, then top up with the split below."
      : "";
    const saved = applyAndMeasure(() => {
      working.section80C = used80C + add80C;
    });
    steps.push({
      id: "80c",
      title: `Invest ₹${add80C.toLocaleString("en-IN")} under Section 80C`,
      section: "80C",
      invest: add80C,
      taxSaved: saved,
      why: `Here is the ideal split for your ${ctx.riskAppetite}-risk profile. ${rp.note}${kidsNote}`,
      category: rp.category,
      ctaLabel: rp.cta,
      breakdown,
    });
  }

  // 2) NPS — extra ₹50,000 under 80CCD(1B)
  const usedNPS = Math.min(input.section80CCD1B, 50000);
  const addNPS = 50000 - usedNPS;
  if (addNPS > 0) {
    const saved = applyAndMeasure(() => {
      working.section80CCD1B = usedNPS + addNPS;
    });
    steps.push({
      id: "nps",
      title: `Invest ₹${addNPS.toLocaleString("en-IN")} in NPS for retirement`,
      section: "80CCD(1B)",
      invest: addNPS,
      taxSaved: saved,
      why: "NPS gives an EXTRA ₹50,000 deduction over and above your ₹1.5 lakh 80C limit — the only way to claim a full ₹2 lakh. It's India's lowest-cost pension scheme.",
      category: "nps",
      ctaLabel: "Open NPS Account",
    });
  }

  // 3) Health insurance — 80D (self + parents if dependent & senior)
  const selfLimit = input.ageGroup === "below60" ? 25000 : 50000;
  const parentAdd = ctx.dependentSeniorParents ? 50000 : 0;
  const recommendedHealth = selfLimit + parentAdd;
  const add80D = Math.max(0, recommendedHealth - input.section80D);
  if (add80D > 0) {
    const familyWord = ctx.maritalStatus === "married" ? "you, your spouse & kids" : "yourself";
    const parentWord = parentAdd > 0 ? " plus a separate policy for your senior-citizen parents (extra ₹50,000 deduction)" : "";
    const saved = applyAndMeasure(() => {
      working.section80D = input.section80D + add80D;
    });
    steps.push({
      id: "80d",
      title: `Buy health insurance worth ₹${add80D.toLocaleString("en-IN")} in premium`,
      section: "80D",
      invest: add80D,
      taxSaved: saved,
      why: `Cover ${familyWord}${parentWord}. It protects your savings from medical emergencies AND cuts tax — a double win.`,
      category: "health",
      ctaLabel: "Compare Health Plans",
    });
  }

  // 4) Home loan interest — only relevant if they own with a loan
  if (ctx.housing === "own_loan") {
    const usedHL = Math.min(input.homeLoanInterest, 200000);
    const addHL = 200000 - usedHL;
    if (addHL > 0) {
      const saved = applyAndMeasure(() => {
        working.homeLoanInterest = usedHL + addHL;
      });
      steps.push({
        id: "homeloan",
        title: `Claim up to ₹${addHL.toLocaleString("en-IN")} more home-loan interest`,
        section: "24(b)",
        invest: 0,
        taxSaved: saved,
        why: "You own a home with a loan — the interest you pay is deductible up to ₹2 lakh/year. Make sure you claim the full amount you're already paying.",
        category: "homeloan",
        ctaLabel: "Check Home Loan Options",
      });
    }
  }

  // 5) HRA advisory — if renting and not yet claiming
  if (ctx.housing === "rented" && input.hraExemption === 0) {
    steps.push({
      id: "hra",
      title: "Claim your HRA (House Rent Allowance)",
      section: "HRA",
      invest: 0,
      taxSaved: 0,
      why: "You live in a rented home — a big chunk of your HRA can be tax-free. Submit rent receipts (and your landlord's PAN if rent exceeds ₹1 lakh/year) to your employer. Re-run this tool with your HRA exemption to see the exact saving.",
      category: "other",
      ctaLabel: "Learn about HRA",
      advisoryOnly: true,
    });
  }

  const optimizedOldTax = prevOldTax;
  const optimizedTax = Math.min(optimizedOldTax, newRegimeTax);
  const totalTaxSaved = Math.max(0, baselineTax - optimizedTax);
  const totalToInvest = steps.reduce((s, st) => s + st.invest, 0);

  const recommendedRegime: "old" | "new" =
    optimizedOldTax <= newRegimeTax ? "old" : "new";

  let regimeNote: string;
  if (recommendedRegime === "old") {
    regimeNote =
      "After following this plan, the Old Regime becomes your cheapest option. The amounts you invest also build your long-term wealth.";
  } else {
    regimeNote =
      "Important: even after maxing out these deductions, the New Regime stays cheaper for your income — so it remains your best choice. The investments below are still excellent for building wealth, but won't reduce your tax further. Pick the New Regime when filing.";
  }

  return {
    steps,
    baselineTax,
    optimizedTax,
    totalTaxSaved,
    totalToInvest,
    recommendedRegime,
    regimeNote,
    newRegimeTax,
    optimizedOldTax,
  };
}
