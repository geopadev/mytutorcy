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
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100'
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500'

export default function Filters({
  value,
  onChange,
  onReset,
}: {
  value: FilterState
  onChange: (patch: Partial<FilterState>) => void
  onReset: () => void
}) {
  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-blue-900">Filters</h2>
        <button type="button" onClick={onReset} className="text-xs font-medium text-cyan-600 hover:underline">
          Clear all
        </button>
      </div>

      <div>
        <label className={labelCls}>Subject</label>
        <select className={select} value={value.subject} onChange={(e) => onChange({ subject: e.target.value })}>
          <option value="">Any subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>City</label>
        <select className={select} value={value.city} onChange={(e) => onChange({ city: e.target.value })}>
          <option value="">Any city</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>Max price · €{value.maxPrice}/hour</label>
        <input
          type="range"
          min={10}
          max={PRICE_MAX}
          step={5}
          value={value.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-cyan-500"
        />
      </div>

      <div>
        <label className={labelCls}>Mode</label>
        <select
          className={select}
          value={value.mode}
          onChange={(e) => onChange({ mode: e.target.value as FilterState['mode'] })}
        >
          <option value="">Online or in-person</option>
          {MODES.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>Level / age group</label>
        <select className={select} value={value.level} onChange={(e) => onChange({ level: e.target.value })}>
          <option value="">Any level</option>
          {AGE_GROUPS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>Language</label>
        <select className={select} value={value.language} onChange={(e) => onChange({ language: e.target.value })}>
          <option value="">Any language</option>
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>Minimum rating</label>
        <select
          className={select}
          value={value.minRating}
          onChange={(e) => onChange({ minRating: Number(e.target.value) })}
        >
          <option value={0}>Any rating</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
          <option value={4.8}>4.8+</option>
        </select>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={value.verifiedOnly}
          onChange={(e) => onChange({ verifiedOnly: e.target.checked })}
          className="h-4 w-4 rounded accent-cyan-500"
        />
        Verified tutors only
      </label>
    </div>
  )
}
