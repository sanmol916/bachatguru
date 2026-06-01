"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark / light mode"
      className="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-700 ring-1 ring-slate-300 dark:ring-slate-600 transition-colors flex items-center px-1 shrink-0 cursor-pointer"
    >
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md text-xs transform transition-transform duration-300 ${
          mounted && dark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {mounted && dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
