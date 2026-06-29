import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Tutor } from '../lib/db'
import { getTutors } from '../lib/db'
import Filters, { PRICE_MAX, type FilterState } from '../components/Filters'
import TutorCard from '../components/TutorCard'
import { EmptyStateIllustration } from '../components/Illustrations'

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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-ink">Find a tutor</h1>
        <p className="mt-1 text-ink-soft">Browse tutors across Cyprus and online.</p>
      </div>

      <Filters value={filters} onChange={update} onReset={reset} />

      <p className="mb-5 mt-6 text-sm font-medium text-ink-soft">
        {loading ? 'Searching…' : `${results.length} tutor${results.length === 1 ? '' : 's'} found`}
      </p>

      {!loading && results.length === 0 ? (
        <div className="grid place-items-center rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <EmptyStateIllustration className="h-28 w-32" />
          <p className="mt-3 font-display font-bold text-ink">No tutors match your filters</p>
          <p className="mt-1 text-sm text-ink-soft">Try widening your search or clearing a filter.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => (
            <TutorCard key={t.id} tutor={t} />
          ))}
        </div>
      )}
    </div>
  )
}
