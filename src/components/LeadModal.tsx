"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  context: {
    grossIncome: number;
    potentialSaving: number;
    recommendedRegime: string;
  };
}

export default function LeadModal({ open, onClose, context }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [helpWith, setHelpWith] = useState("Both");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, city, helpWith, ...context }),
      });
      const data = await res.json();
      if (data.success) setDone(true);
      else setError(data.error || "Something went wrong");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/30 outline-none text-slate-800 dark:text-slate-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {done ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✅
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">You&apos;re all set!</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              A verified tax expert will reach out within 24 hours to help you implement your plan and maximize savings.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                🧑‍💼
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Get Free Expert Help</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                A verified tax expert will help you implement this plan and file correctly. Free 15-min consultation.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <input className={inputCls} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input className={inputCls} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-slate-100 dark:bg-slate-700 border border-r-0 border-slate-300 dark:border-slate-700 rounded-l-lg text-slate-600 dark:text-slate-300 text-sm">
                  +91
                </span>
                <input
                  className={inputCls + " rounded-l-none"}
                  type="tel"
                  placeholder="10-digit mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  maxLength={10}
                  required
                />
              </div>
              <input className={inputCls} placeholder="City (optional)" value={city} onChange={(e) => setCity(e.target.value)} />
              <select className={inputCls} value={helpWith} onChange={(e) => setHelpWith(e.target.value)}>
                <option>I need help with: Both filing & investing</option>
                <option>Tax filing (ITR)</option>
                <option>Investment / tax-saving planning</option>
              </select>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3 rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Request Free Callback"}
              </button>
              <button type="button" onClick={onClose} className="w-full text-slate-400 text-sm hover:text-slate-600 py-1">
                Maybe later
              </button>
            </form>
            <p className="text-xs text-slate-400 text-center mt-3">🔒 Your details are safe and shared only with a verified advisor.</p>
          </>
        )}
      </div>
    </div>
  );
}
