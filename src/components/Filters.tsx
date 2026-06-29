import { useState } from 'react'
import { SlidersHorizontal, ChevronDown, BadgeCheck } from 'lucide-react'
import type { Mode } from '../lib/db'
import { CITIES, SUBJECTS, AGE_GROUPS, LANGUAGES, MODES } from '../lib/constants'

export interface FilterState {
  subject: string
  city: string
  mode: '' | Mode
  maxPrice: number
  minRating: number
  verifiedOnly: boolean
  level: string
  language: string
}

export const PRICE_MAX = 60

export const emptyFilters: FilterState = {
  subject: '',
  city: '',
  mode: '',
  maxPrice: PRICE_MAX,
  minRating: 0,
  verifiedOnly: false,
  level: '',
  language: '',
}

const select =
  'rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
const labelCls = 'mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400'

// A big, tappable pill used for single-select chip groups.
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? 'bg-ink text-white shadow-soft' : 'bg-slate-100 text-ink-soft hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  )
}

export default function Filters({
  value,
  onChange,
  onReset,
}: {
  value: FilterState
  onChange: (patch: Partial<FilterState>) => void
  onReset: () => void
}) {
  const [open, setOpen] = useState(false)

  const advancedCount =
    (value.maxPrice < PRICE_MAX ? 1 : 0) +
    (value.minRating > 0 ? 1 : 0) +
    (value.verifiedOnly ? 1 : 0) +
    (value.level ? 1 : 0) +
    (value.language ? 1 : 0)

  const anyActive =
    advancedCount > 0 || value.subject !== '' || value.city !== '' || value.mode !== ''

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-soft sm:p-5">
      {/* Primary controls — always visible */}
      <div className="flex flex-wrap items-center gap-2.5">
        <select
          className={select}
          value={value.subject}
          onChange={(e) => onChange({ subject: e.target.value })}
          aria-label="Subject"
        >
          <option value="">Any subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          className={select}
          value={value.city}
          onChange={(e) => onChange({ city: e.target.value })}
          aria-label="City"
        >
          <option value="">Any city</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="flex items-center gap-1.5">
          <Chip active={value.mode === ''} onClick={() => onChange({ mode: '' })}>
            Any mode
          </Chip>
          {MODES.map((m) => (
            <Chip key={m.value} active={value.mode === m.value} onClick={() => onChange({ mode: m.value })}>
              {m.label}
            </Chip>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="ml-auto flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand-300 hover:bg-brand-50"
        >
          <SlidersHorizontal size={16} /> More filters
          {advancedCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-xs text-white">
              {advancedCount}
            </span>
          )}
          <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
        </button>

        {anyActive && (
          <button
            type="button"
            onClick={onReset}
            className="rounded-full px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:text-rose-500"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Advanced controls — behind the expander */}
      {open && (
        <div className="mt-5 grid gap-6 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className={labelCls}>Max price · €{value.maxPrice}/hour</label>
            <input
              type="range"
              min={10}
              max={PRICE_MAX}
              step={5}
              value={value.maxPrice}
              onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
              className="mt-1 w-full accent-brand-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Level / age group</label>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={value.level === ''} onClick={() => onChange({ level: '' })}>
                Any
              </Chip>
              {AGE_GROUPS.map((a) => (
                <Chip key={a} active={value.level === a} onClick={() => onChange({ level: a })}>
                  {a}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Language</label>
            <select
              className={`${select} w-full`}
              value={value.language}
              onChange={(e) => onChange({ language: e.target.value })}
            >
              <option value="">Any language</option>
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Minimum rating</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { v: 0, label: 'Any' },
                { v: 4, label: '4.0+' },
                { v: 4.5, label: '4.5+' },
                { v: 4.8, label: '4.8+' },
              ].map((r) => (
                <Chip key={r.v} active={value.minRating === r.v} onClick={() => onChange({ minRating: r.v })}>
                  {r.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => onChange({ verifiedOnly: !value.verifiedOnly })}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                value.verifiedOnly
                  ? 'bg-brand-500 text-white shadow-soft'
                  : 'bg-slate-100 text-ink-soft hover:bg-slate-200'
              }`}
            >
              <BadgeCheck size={16} /> Verified only
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
