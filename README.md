# BachatGuru — Free Income Tax Calculator (India)

A fast, SEO-friendly income tax calculator for India (FY 2025-26 & FY 2026-27).
Compares the old vs new tax regime and gives personalized tax-saving recommendations.

## Features

- **Old vs New Regime comparison** — instantly see which saves you more
- **Accurate tax engine** — FY 2025-26 / 2026-27 slabs, 87A rebate, cess, age-based exemptions
- **Personalized savings tips** — 80C, 80D, NPS, home loan recommendations with estimated savings
- **100% client-side** — no data leaves the browser, no database needed
- **SEO-optimized** — static pages, FAQ structured data, sitemap, robots.txt

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy (Free)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com/new) — one-click deploy, no env vars needed

## Monetization

The "Save more tax" recommendations have CTA buttons. Replace the placeholder links in
`src/components/ResultsPanel.tsx` (the `categoryLinks` object) with your affiliate links
(ELSS platforms like Groww/Zerodha, insurance via PolicyBazaar, NPS, etc.) to start earning.

## Disclaimer

This is a guidance tool, not professional tax advice. Tax calculations are estimates based on
FY 2025-26 / 2026-27 rules. Surcharge for incomes above ₹50L is not included. Consult a CA before filing.
