import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-center text-xs md:text-sm py-2 px-4 font-medium">
        🎉 100% Free · Updated for FY 2025-26 &amp; FY 2026-27 tax rules
      </div>

      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/30">
                <span className="text-white font-extrabold text-xl">₹</span>
              </div>
              <div className="leading-tight">
                <span className="block text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  BachatGuru
                </span>
                <span className="block text-[10px] text-slate-400 font-medium -mt-0.5">
                  Smart Tax Calculator
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4 md:gap-7">
              <Link
                href="/#calculator"
                className="hidden md:inline text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
              >
                Calculator
              </Link>
              <Link
                href="/guide"
                className="hidden md:inline text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
              >
                Tax Guide
              </Link>
              <ThemeToggle />
              <Link
                href="/#calculator"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 md:px-5 py-2.5 rounded-xl font-bold hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md shadow-indigo-500/30 text-sm md:text-base"
              >
                Calculate
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
