/*
 * In-house flat vector illustrations. Hand-authored SVG (no external set), so
 * there's nothing to license — see README. Flat geometric style on purpose:
 * friendly and app-like for students, objects-not-mascots so it still reads
 * credible to a parent. Colours mirror the design tokens in index.css.
 */
type Props = { className?: string }

const ink = '#0f2742'
const teal = '#14b8a6'
const tealDark = '#0d9488'
const tealSoft = '#ccfbf1'
const amber = '#f59e0b'
const amberSoft = '#fef3c7'

/* Hero: a "lesson in progress" scene — profile card, rising progress, a
   verified star, and floating subjects. Balanced warmth + credibility. */
export function HeroIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 560 460" fill="none" className={className} role="img"
      aria-label="A tutor profile with rising progress, a verified badge and subject tiles">
      {/* soft background shapes */}
      <circle cx="430" cy="120" r="120" fill={tealSoft} />
      <circle cx="110" cy="350" r="80" fill={amberSoft} />
      <circle cx="486" cy="300" r="10" fill={amber} />
      <circle cx="70" cy="150" r="7" fill={teal} />
      <circle cx="520" cy="220" r="6" fill={tealDark} />

      {/* main lesson card */}
      <g>
        <rect x="120" y="78" width="300" height="244" rx="28" fill="#ffffff"
          stroke="#e2e8f0" strokeWidth="2" />
        {/* tutor header */}
        <circle cx="166" cy="126" r="22" fill={tealSoft} />
        <circle cx="166" cy="126" r="22" stroke={teal} strokeWidth="2" />
        <path d="M158 128c0-5 16-5 16 0" stroke={tealDark} strokeWidth="3" strokeLinecap="round" />
        <circle cx="166" cy="119" r="5" fill={tealDark} />
        <rect x="200" y="112" width="120" height="11" rx="5.5" fill={ink} />
        <rect x="200" y="132" width="86" height="9" rx="4.5" fill="#cbd5e1" />

        {/* rising progress bars */}
        <rect x="160" y="250" width="34" height="34" rx="8" fill={tealSoft} />
        <rect x="206" y="228" width="34" height="56" rx="8" fill={teal} />
        <rect x="252" y="204" width="34" height="80" rx="8" fill={tealDark} />
        <rect x="298" y="178" width="34" height="106" rx="8" fill={amber} />
        {/* trend line */}
        <path d="M176 244 L222 220 L268 196 L316 168" stroke={ink} strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="316" cy="168" r="6" fill="#ffffff" stroke={ink} strokeWidth="3" />
      </g>

      {/* verified star badge */}
      <g transform="translate(372 92)">
        <circle cx="0" cy="0" r="34" fill={amber} />
        <circle cx="0" cy="0" r="34" stroke="#ffffff" strokeWidth="4" />
        <path d="M-14 1 l9 9 l19 -20" stroke="#ffffff" strokeWidth="6"
          strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* floating subject tiles */}
      <g>
        <rect x="64" y="226" width="74" height="62" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
        <text x="101" y="266" textAnchor="middle" fontFamily="Poppins, sans-serif"
          fontSize="26" fontWeight="700" fill={tealDark}>A+</text>

        <rect x="406" y="252" width="74" height="62" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
        <text x="443" y="293" textAnchor="middle" fontFamily="Poppins, sans-serif"
          fontSize="30" fontWeight="700" fill={amber}>π</text>
      </g>

      {/* graduation cap */}
      <g transform="translate(96 70) rotate(-8)">
        <path d="M0 16 L40 0 L80 16 L40 32 Z" fill={ink} />
        <path d="M16 24 v18 c0 8 48 8 48 0 v-18" fill={teal} />
        <line x1="80" y1="16" x2="80" y2="40" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="44" r="5" fill={amber} />
      </g>
    </svg>
  )
}

/* Step 1 — search: a magnifier over a result list. */
export function StepSearch({ className }: Props) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} aria-hidden="true">
      <rect x="20" y="22" width="74" height="74" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
      <rect x="34" y="40" width="34" height="7" rx="3.5" fill={ink} />
      <rect x="34" y="56" width="46" height="6" rx="3" fill="#cbd5e1" />
      <rect x="34" y="70" width="40" height="6" rx="3" fill="#cbd5e1" />
      <circle cx="86" cy="84" r="22" fill={tealSoft} stroke={teal} strokeWidth="4" />
      <line x1="102" y1="100" x2="114" y2="112" stroke={tealDark} strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}

/* Step 2 — compare: two profile cards with a star. */
export function StepCompare({ className }: Props) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} aria-hidden="true">
      <rect x="16" y="34" width="48" height="62" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
      <circle cx="40" cy="52" r="9" fill={tealSoft} stroke={teal} strokeWidth="2.5" />
      <rect x="26" y="68" width="28" height="6" rx="3" fill={ink} />
      <rect x="26" y="80" width="20" height="5" rx="2.5" fill="#cbd5e1" />
      <rect x="68" y="26" width="48" height="62" rx="12" fill="#ffffff" stroke={teal} strokeWidth="3" />
      <circle cx="92" cy="44" r="9" fill={amberSoft} stroke={amber} strokeWidth="2.5" />
      <rect x="78" y="60" width="28" height="6" rx="3" fill={ink} />
      <rect x="78" y="72" width="20" height="5" rx="2.5" fill="#cbd5e1" />
      <path d="M92 92 l5 10 l11 1 l-8 8 l2 11 l-10 -5 l-10 5 l2 -11 l-8 -8 l11 -1 z" fill={amber} />
    </svg>
  )
}

/* Step 3 — connect: a chat bubble with a check. */
export function StepConnect({ className }: Props) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} aria-hidden="true">
      <path d="M24 30 h64 a14 14 0 0 1 14 14 v30 a14 14 0 0 1 -14 14 H54 l-18 16 v-16 h-12 a14 14 0 0 1 -14 -14 V44 a14 14 0 0 1 14 -14 z"
        fill={tealSoft} stroke={teal} strokeWidth="3.5" />
      <path d="M40 58 l11 11 l24 -26" stroke={tealDark} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/* Empty state — friendly "nothing found" magnifier. */
export function EmptyStateIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 160 140" fill="none" className={className} aria-hidden="true">
      <circle cx="70" cy="62" r="42" fill={tealSoft} />
      <circle cx="70" cy="62" r="42" stroke={teal} strokeWidth="5" />
      <line x1="100" y1="92" x2="128" y2="120" stroke={tealDark} strokeWidth="10" strokeLinecap="round" />
      <line x1="56" y1="62" x2="84" y2="62" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="36" cy="26" r="5" fill={amber} />
      <circle cx="132" cy="44" r="6" fill={amberSoft} />
    </svg>
  )
}
