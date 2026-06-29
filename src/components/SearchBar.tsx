import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CITIES, SUBJECTS, AGE_GROUPS, MODES } from '../lib/constants'

// Hero search bar — deep-links into /find with query params.
export default function SearchBar() {
  const navigate = useNavigate()
  const [subject, setSubject] = useState('')
  const [city, setCity] = useState('')
  const [level, setLevel] = useState('')
  const [mode, setMode] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (subject) params.set('subject', subject)
    if (city) params.set('city', city)
    if (level) params.set('level', level)
    if (mode) params.set('mode', mode)
    navigate(`/find?${params.toString()}`)
  }

  const field =
    'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 gap-2 rounded-3xl bg-white p-3 shadow-soft-lg ring-1 ring-slate-100 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
    >
      <select value={subject} onChange={(e) => setSubject(e.target.value)} className={field} aria-label="Subject">
        <option value="">Subject / lesson</option>
        {SUBJECTS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select value={city} onChange={(e) => setCity(e.target.value)} className={field} aria-label="Location">
        <option value="">Location</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select value={level} onChange={(e) => setLevel(e.target.value)} className={field} aria-label="Level">
        <option value="">Level / age</option>
        {AGE_GROUPS.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      <select value={mode} onChange={(e) => setMode(e.target.value)} className={field} aria-label="Online or in-person">
        <option value="">Online or in-person</option>
        {MODES.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-7 py-3 font-semibold text-white transition hover:bg-brand-600"
      >
        <Search size={18} /> Search
      </button>
    </form>
  )
}
