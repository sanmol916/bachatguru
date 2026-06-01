// Reusable, lightweight SVG illustrations for a bold, modern fintech look.
// No external images = instant load, never breaks, always crisp, works in dark mode.

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 360" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="210" cy="180" r="160" fill="rgba(255,255,255,0.08)" />
      <circle cx="210" cy="180" r="110" fill="rgba(255,255,255,0.06)" />

      {/* growth chart card */}
      <rect x="70" y="120" width="190" height="150" rx="16" fill="#ffffff" />
      {/* bars */}
      <rect x="92" y="210" width="22" height="42" rx="4" fill="#818cf8" />
      <rect x="124" y="186" width="22" height="66" rx="4" fill="#6366f1" />
      <rect x="156" y="160" width="22" height="92" rx="4" fill="#7c3aed" />
      <rect x="188" y="138" width="22" height="114" rx="4" fill="#f59e0b" />
      {/* rising line */}
      <path d="M92 200 L135 176 L168 150 L210 128" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="210" cy="128" r="6" fill="#f59e0b" />

      {/* rupee coin */}
      <circle cx="300" cy="120" r="44" fill="#f59e0b" className="animate-float" />
      <circle cx="300" cy="120" r="44" fill="#fbbf24" opacity="0.5" />
      <text x="300" y="138" textAnchor="middle" fontSize="48" fontWeight="bold" fill="#92400e">₹</text>

      {/* coin stack */}
      <ellipse cx="120" cy="292" rx="40" ry="12" fill="#6366f1" />
      <ellipse cx="120" cy="284" rx="40" ry="12" fill="#818cf8" />
      <ellipse cx="120" cy="276" rx="40" ry="12" fill="#6366f1" />
    </svg>
  );
}

export function CompareIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#e0e7ff" />
      <path d="M22 40V28M32 40V20M42 40V32" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 44h32" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function BulbIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#fef3c7" />
      <path d="M32 16a12 12 0 0 0-7 21.7c1.2.9 2 2.3 2 3.8V44h10v-2.5c0-1.5.8-2.9 2-3.8A12 12 0 0 0 32 16Z" fill="#f59e0b" />
      <path d="M27 48h10M29 52h6" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#dbeafe" />
      <rect x="20" y="30" width="24" height="18" rx="4" fill="#2563eb" />
      <path d="M25 30v-4a7 7 0 0 1 14 0v4" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="38" r="3" fill="#dbeafe" />
    </svg>
  );
}

export function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#ede9fe" />
      <path d="M32 16l13 5v9c0 8-5.5 13.5-13 16-7.5-2.5-13-8-13-16v-9l13-5Z" fill="#7c3aed" />
      <path d="M27 33l4 4 7-8" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PiggyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#e0e7ff" />
      <ellipse cx="31" cy="36" rx="17" ry="13" fill="#6366f1" />
      <circle cx="38" cy="33" r="2.5" fill="#fff" />
      <rect x="28" y="20" width="10" height="5" rx="2.5" fill="#4f46e5" />
      <path d="M18 40l-3 5M44 40l3 5M22 47v3M40 47v3" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#fee2e2" />
      <circle cx="32" cy="32" r="16" fill="#ef4444" />
      <path d="M32 24v8l5 4" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
