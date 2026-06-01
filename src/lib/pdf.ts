import type { PersonalizedPlan } from "./recommendations";

// jsPDF's built-in fonts don't include the ₹ glyph, so we use "Rs." in the PDF.
const rs = (n: number) => "Rs. " + Math.round(n).toLocaleString("en-IN");

export async function downloadPlanPdf(plan: PersonalizedPlan) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentW = pageW - margin * 2;
  let y = 0;

  // Header band
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, pageW, 70, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("BachatGuru", margin, 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Your Personalized Tax-Saving Plan", margin, 52);
  doc.setFontSize(9);
  doc.text(
    new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
    pageW - margin,
    52,
    { align: "right" }
  );
  y = 95;

  const ensure = (h: number) => {
    if (y + h > pageH - 50) {
      doc.addPage();
      y = margin;
    }
  };

  // Summary box
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Summary", margin, y);
  y += 16;

  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentW, 64, 8, 8, "FD");
  const colW = contentW / 4;
  const sx = margin + 12;
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  ["Tax now", "After plan", "You save", "You invest"].forEach((t, i) =>
    doc.text(t, sx + colW * i, y + 22)
  );
  doc.setFontSize(13);
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  [plan.baselineTax, plan.optimizedTax, plan.totalTaxSaved, plan.totalToInvest].forEach((v, i) =>
    doc.text(rs(v), sx + colW * i, y + 44)
  );
  y += 82;

  // Recommended regime note
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  const note =
    "Recommended regime: " +
    (plan.recommendedRegime === "old" ? "Old Regime" : "New Regime") +
    ". " +
    plan.regimeNote;
  const noteLines = doc.splitTextToSize(note, contentW);
  ensure(noteLines.length * 13 + 10);
  doc.text(noteLines, margin, y);
  y += noteLines.length * 13 + 14;

  // Action plan
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(17, 24, 39);
  ensure(20);
  doc.text("Your Action Plan", margin, y);
  y += 18;

  plan.steps.forEach((step, i) => {
    const whyLines = doc.splitTextToSize(step.why, contentW);
    const bdLines = step.breakdown
      ? step.breakdown.filter((b) => b.amount > 0).map((b) => `   - ${rs(b.amount)} in ${b.product}`)
      : [];
    ensure(26 + whyLines.length * 12 + bdLines.length * 12 + 14);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(79, 70, 229);
    doc.text(`${i + 1}. ${step.title}`, margin, y);
    if (!step.advisoryOnly && step.taxSaved > 0) {
      doc.setTextColor(5, 150, 105);
      doc.text("Save " + rs(step.taxSaved), pageW - margin, y, { align: "right" });
    }
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 130);
    doc.text(`Section ${step.section}`, margin, y);
    y += 13;

    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(whyLines, margin, y);
    y += whyLines.length * 12;

    if (bdLines.length) {
      doc.setTextColor(30, 41, 59);
      doc.text(bdLines, margin, y);
      y += bdLines.length * 12;
    }
    y += 12;
  });

  // Disclaimer
  ensure(70);
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageW - margin, y);
  y += 14;
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const disc = doc.splitTextToSize(
    "Disclaimer: BachatGuru is a free guidance tool, not professional tax advice. Calculations are estimates based on FY 2025-26 / 2026-27 rules. Surcharge for incomes above Rs. 50L is not included. Consult a qualified Chartered Accountant before filing. Generated at bachatguru.in",
    contentW
  );
  doc.text(disc, margin, y);

  doc.save("BachatGuru-Tax-Plan.pdf");
}
