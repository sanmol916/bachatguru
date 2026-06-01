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
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative w-12 h-7 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors flex items-center px-1 shrink-0"
    >
      <span
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-white dark:bg-slate-900 shadow-md text-[11px] transform transition-transform ${
          mounted && dark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {mounted && dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
