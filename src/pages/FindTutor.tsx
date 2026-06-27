import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, SearchX } from 'lucide-react'
import type { Tutor } from '../lib/db'
import { getTutors } from '../lib/db'
import Filters, { PRICE_MAX, type FilterState } from '../components/Filters'
import TutorCard from '../components/TutorCard'

function fromParams(sp: URLSearchParams): FilterState {
  return {
    subject: sp.get('subject') ?? '',
    city: sp.get('city') ?? '',
    mode: (sp.get('mode') as FilterState['mode']) || '',
    maxPrice: sp.get('maxPrice') ? Number(sp.get('maxPrice')) : PRICE_MAX,
    minRating: sp.get('minRating') ? Number(sp.get('minRating')) : 0,
    verifiedOnly: sp.get('verified') === '1',
    level: sp.get('level') ?? '',
    language: sp.get('language') ?? '',
  }
}

function toParams(f: FilterState): URLSearchParams {
  const p = new URLSearchParams()
  if (f.subject) p.set('subject', f.subject)
  if (f.city) p.set('city', f.city)
  if (f.mode) p.set('mode', f.mode)
  if (f.maxPrice < PRICE_MAX) p.set('maxPrice', String(f.maxPrice))
  if (f.minRating > 0) p.set('minRating', String(f.minRating))
  if (f.verifiedOnly) p.set('verified', '1')
  if (f.level) p.set('level', f.level)
  if (f.language) p.set('language', f.language)
  return p
}

export default function FindTutor() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = fromParams(searchParams)
  const [results, setResults] = useState<Tutor[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  function update(patch: Partial<FilterState>) {
    setSearchParams(toParams({ ...filters, ...patch }), { replace: true })
  }
  function reset() {
    setSearchParams(new URLSearchParams(), { replace: true })
  }

  useEffect(() => {
    let active = true
    setLoading(true)
    getTutors({
      subject: filters.subject || undefined,
      city: filters.city || undefined,
      mode: filters.mode || undefined,
      maxPrice: filters.maxPrice < PRICE_MAX ? filters.maxPrice : undefined,
      minRating: filters.minRating || undefined,
      verifiedOnly: filters.verifiedOnly || undefined,
    }).then((list) => {
      if (!active) return
      let res = list
      if (filters.level) res = res.filter((t) => t.ageGroups.includes(filters.level))
      if (filters.language) res = res.filter((t) => t.languages.includes(filters.language))
      setResults(res)
      setLoading(false)
    })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.subject, filters.city, filters.mode, filters.maxPrice,
    filters.minRating, filters.verifiedOnly, filters.level, filters.language,
  ])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">Find a tutor</h1>
        <p className="mt-1 text-slate-500">Browse tutors across Cyprus and online.</p>
      </div>

      <button
        type="button"
        onClick={() => setShowFilters((s) => !s)}
        className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 lg:hidden"
      >
        <SlidersHorizontal size={16} /> {showFilters ? 'Hide' : 'Show'} filters
      </button>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="lg:sticky lg:top-20">
            <Filters value={filters} onChange={update} onReset={reset} />
          </div>
        </aside>

        <div>
          <p className="mb-4 text-sm text-slate-500">
            {loading ? 'Searching…' : `${results.length} tutor${results.length === 1 ? '' : 's'} found`}
          </p>

          {!loading && results.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <SearchX size={40} className="text-slate-300" />
              <p className="mt-3 font-medium text-slate-600">No tutors match your filters</p>
              <button type="button" onClick={reset} className="mt-2 text-sm font-semibold text-cyan-600 hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((t) => (
                <TutorCard key={t.id} tutor={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
