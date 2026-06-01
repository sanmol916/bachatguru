"use client";

import { useState } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

/**
 * A small "What is this?" helper. Shows an info icon next to a label.
 * Tap/click to reveal a plain-English explanation. Works on mobile + desktop.
 */
export default function InfoTip({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block align-middle">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`What is ${title}?`}
        className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold hover:bg-emerald-200 transition-colors align-middle"
      >
        ?
      </button>
      {open && (
        <>
          {/* click-away backdrop */}
          <span
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <span className="absolute left-0 top-7 z-50 block w-72 rounded-xl bg-gray-900 text-white text-xs leading-relaxed p-3.5 shadow-2xl">
            <span className="block font-semibold text-emerald-300 mb-1">{title}</span>
            <span className="block text-gray-200">{children}</span>
          </span>
        </>
      )}
    </span>
  );
}
