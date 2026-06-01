import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              BachatGuru
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/#calculator" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Tax Calculator
            </Link>
            <Link href="/guide" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Tax Saving Guide
            </Link>
            <Link
              href="/#calculator"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md"
            >
              Calculate Tax
            </Link>
          </div>

          <div className="md:hidden">
            <Link href="/#calculator" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Calculate
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
