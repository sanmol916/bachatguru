import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gray-900 text-white text-center text-xs md:text-sm py-2 px-4">
        🎉 Free for everyone · Updated for FY 2025-26 &amp; FY 2026-27 tax rules
      </div>

      <header className="bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-xl">₹</span>
              </div>
              <div className="leading-tight">
                <span className="block text-xl font-extrabold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  BachatGuru
                </span>
                <span className="block text-[10px] text-gray-400 font-medium -mt-0.5">
                  Smart Tax Calculator
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-7">
              <Link href="/#calculator" className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors">
                Calculator
              </Link>
              <Link href="/guide" className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors">
                Tax Guide
              </Link>
              <Link
                href="/#calculator"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md"
              >
                Calculate Tax
              </Link>
            </div>

            <div className="md:hidden">
              <Link href="/#calculator" className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold">
                Calculate
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
