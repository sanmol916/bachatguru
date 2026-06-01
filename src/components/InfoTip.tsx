"use client";

import { useState } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

/**
 * A small "What is this?" helper. Tap the info icon to reveal a
 * plain-English explanation. Works on mobile + desktop, light + dark.
 */
export default function InfoTip({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block align-middle">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`What is ${title}?`}
        className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition-colors align-middle"
      >
        ?
      </button>
      {open && (
        <>
          <span className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <span className="absolute left-0 top-7 z-50 block w-72 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs leading-relaxed p-3.5 shadow-2xl ring-1 ring-white/10">
            <span className="block font-semibold text-indigo-300 mb-1">{title}</span>
            <span className="block text-slate-200">{children}</span>
          </span>
        </>
      )}
    </span>
  );
}
