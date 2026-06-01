// ============================================================
// Indian Income Tax Engine — FY 2025-26 & FY 2026-27 (AY 2026-27 / 2027-28)
// Budget 2026 made NO slab changes, so both years use the same rates.
// All amounts in INR (annual).
// ============================================================

export type AgeGroup = "below60" | "senior" | "supersenior";

export interface TaxInput {
  // Income
  grossSalary: number; // annual CTC salary income (before deductions)
  otherIncome: number; // interest, rent, etc.

  // Personal
  ageGroup: AgeGroup;

  // Old-regime deductions / exemptions (what they ALREADY have)
  section80C: number; // PPF, ELSS, EPF, life insurance, etc. (cap 1.5L)
  section80D: number; // health insurance premium
  section80CCD1B: number; // extra NPS (cap 50k)
  homeLoanInterest: number; // section 24(b), cap 2L for self-occupied
  hraExemption: number; // computed HRA exemption
  otherDeductions: number; // 80E, 80G, 80TTA, etc.
}

export interface SlabBreakup {
  slab: string;
  rate: number;
  tax: number;
}

export interface RegimeResult {
  regime: "old" | "new";
  grossIncome: number;
  standardDeduction: number;
  totalDeductions: number; // standard + chapter VI-A + exemptions used in this regime
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate87A: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  slabBreakup: SlabBreakup[];
  takeHome: number; // gross income minus total tax (rough)
}

const STD_DEDUCTION_NEW = 75000;
const STD_DEDUCTION_OLD = 50000;
const CESS_RATE = 0.04;

// New regime slabs FY 2025-26 / 2026-27
const NEW_REGIME_SLABS = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 0.05 },
  { upTo: 1200000, rate: 0.1 },
  { upTo: 1600000, rate: 0.15 },
  { upTo: 2000000, rate: 0.2 },
  { upTo: 2400000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
];

function oldRegimeSlabs(ageGroup: AgeGroup) {
  // Basic exemption limit changes with age in the OLD regime
  const basicExemption =
    ageGroup === "supersenior" ? 500000 : ageGroup === "senior" ? 300000 : 250000;
  return [
    { upTo: basicExemption, rate: 0 },
    { upTo: 500000, rate: 0.05 },
    { upTo: 1000000, rate: 0.2 },
    { upTo: Infinity, rate: 0.3 },
  ].filter((s, i, arr) => i === 0 || s.upTo > arr[i - 1].upTo); // remove overlaps for seniors
}

function computeSlabTax(
  taxable: number,
  slabs: { upTo: number; rate: number }[]
): { tax: number; breakup: SlabBreakup[] } {
  let tax = 0;
  let lower = 0;
  const breakup: SlabBreakup[] = [];
  for (const slab of slabs) {
    if (taxable > lower) {
      const upper = Math.min(taxable, slab.upTo);
      const amountInSlab = upper - lower;
      const slabTax = amountInSlab * slab.rate;
      tax += slabTax;
      if (slab.rate > 0) {
        breakup.push({
          slab: `${formatINR(lower)} - ${slab.upTo === Infinity ? "above" : formatINR(slab.upTo)}`,
          rate: slab.rate * 100,
          tax: Math.round(slabTax),
        });
      }
      lower = slab.upTo;
    } else {
      break;
    }
  }
  return { tax, breakup };
}

export function formatINR(amount: number): string {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}



// -------- NEW REGIME --------
export function calculateNewRegime(input: TaxInput): RegimeResult {
  const grossIncome = input.grossSalary + input.otherIncome;
  // New regime: only standard deduction allowed (for salaried). No 80C/80D/HRA/etc.
  const standardDeduction = input.grossSalary > 0 ? STD_DEDUCTION_NEW : 0;
  const totalDeductions = standardDeduction;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  const { tax, breakup } = computeSlabTax(taxableIncome, NEW_REGIME_SLABS);
  const taxBeforeRebate = tax;

  // Section 87A rebate (new regime): full rebate if taxable income <= 12,00,000
  let rebate87A = 0;
  if (taxableIncome <= 1200000) {
    rebate87A = Math.min(taxBeforeRebate, 60000);
  }
  let taxAfterRebate = Math.max(0, taxBeforeRebate - rebate87A);

  // Marginal relief near the 12L threshold (so a person just above 12L
  // never pays more tax than the income exceeding 12L).
  if (taxableIncome > 1200000 && taxableIncome <= 1280000) {
    const excess = taxableIncome - 1200000;
    if (taxAfterRebate > excess) {
      taxAfterRebate = excess;
    }
  }

  const cess = taxAfterRebate * CESS_RATE;
  const totalTax = Math.round(taxAfterRebate + cess);

  return {
    regime: "new",
    grossIncome,
    standardDeduction,
    totalDeductions,
    taxableIncome,
    taxBeforeRebate: Math.round(taxBeforeRebate),
    rebate87A: Math.round(rebate87A),
    taxAfterRebate: Math.round(taxAfterRebate),
    cess: Math.round(cess),
    totalTax,
    slabBreakup: breakup,
    takeHome: Math.round(grossIncome - totalTax),
  };
}

// -------- OLD REGIME --------
export function calculateOldRegime(input: TaxInput): RegimeResult {
  const grossIncome = input.grossSalary + input.otherIncome;
  const standardDeduction = input.grossSalary > 0 ? STD_DEDUCTION_OLD : 0;

  const capped80C = Math.min(input.section80C, 150000);
  const capped80CCD1B = Math.min(input.section80CCD1B, 50000);
  const cappedHomeLoan = Math.min(input.homeLoanInterest, 200000);

  const chapterVIA =
    capped80C +
    input.section80D +
    capped80CCD1B +
    input.otherDeductions;

  const totalDeductions =
    standardDeduction + chapterVIA + cappedHomeLoan + input.hraExemption;

  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  const { tax, breakup } = computeSlabTax(taxableIncome, oldRegimeSlabs(input.ageGroup));
  const taxBeforeRebate = tax;

  // Section 87A rebate (old regime): full rebate if taxable income <= 5,00,000
  let rebate87A = 0;
  if (taxableIncome <= 500000) {
    rebate87A = Math.min(taxBeforeRebate, 12500);
  }
  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate87A);

  const cess = taxAfterRebate * CESS_RATE;
  const totalTax = Math.round(taxAfterRebate + cess);

  return {
    regime: "old",
    grossIncome,
    standardDeduction,
    totalDeductions,
    taxableIncome,
    taxBeforeRebate: Math.round(taxBeforeRebate),
    rebate87A: Math.round(rebate87A),
    taxAfterRebate: Math.round(taxAfterRebate),
    cess: Math.round(cess),
    totalTax,
    slabBreakup: breakup,
    takeHome: Math.round(grossIncome - totalTax),
  };
}

export interface ComparisonResult {
  oldRegime: RegimeResult;
  newRegime: RegimeResult;
  recommended: "old" | "new";
  savingsByChoosingRecommended: number;
}

export function compareRegimes(input: TaxInput): ComparisonResult {
  const oldRegime = calculateOldRegime(input);
  const newRegime = calculateNewRegime(input);
  const recommended = oldRegime.totalTax <= newRegime.totalTax ? "old" : "new";
  const savingsByChoosingRecommended = Math.abs(
    oldRegime.totalTax - newRegime.totalTax
  );
  return { oldRegime, newRegime, recommended, savingsByChoosingRecommended };
}
