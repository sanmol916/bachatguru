import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 mt-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₹</span>
              </div>
              <span className="text-xl font-bold text-white">BachatGuru</span>
            </Link>
            <p className="text-sm text-slate-400">
              India&apos;s smartest free income tax calculator. Compare old vs new regime and get
              personalized tax-saving recommendations for FY 2025-26 &amp; 2026-27.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#calculator" className="hover:text-indigo-400 transition-colors">Income Tax Calculator</Link></li>
              <li><Link href="/guide" className="hover:text-indigo-400 transition-colors">Tax Saving Guide</Link></li>
              <li><Link href="/#calculator" className="hover:text-indigo-400 transition-colors">Old vs New Regime</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Popular Topics</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guide#80c" className="hover:text-indigo-400 transition-colors">Section 80C Investments</Link></li>
              <li><Link href="/guide#80d" className="hover:text-indigo-400 transition-colors">Health Insurance 80D</Link></li>
              <li><Link href="/guide#nps" className="hover:text-indigo-400 transition-colors">NPS Tax Benefits</Link></li>
              <li><Link href="/guide#homeloan" className="hover:text-indigo-400 transition-colors">Home Loan Tax Benefits</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500 space-y-2">
          <p>
            <strong>Disclaimer:</strong> BachatGuru is a free guidance tool, not a substitute for professional tax advice.
            Calculations are estimates based on FY 2025-26 / 2026-27 rules. Consult a qualified Chartered Accountant before filing.
          </p>
          <p>&copy; {new Date().getFullYear()} BachatGuru. Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
