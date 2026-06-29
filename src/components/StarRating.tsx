import { Star } from 'lucide-react'

// Read-only star display, or interactive picker when onChange is supplied.
export default function StarRating({
  value,
  onChange,
  size = 16,
  showNumber = false,
}: {
  value: number
  onChange?: (v: number) => void
  size?: number
  showNumber?: boolean
}) {
  const interactive = typeof onChange === 'function'

  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex">
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = value >= n - 0.25
          const star = (
            <Star
              size={size}
              className={filled ? 'fill-accent-400 text-accent-400' : 'fill-slate-200 text-slate-200'}
            />
          )
          return interactive ? (
            <button
              key={n}
              type="button"
              onClick={() => onChange?.(n)}
              className="cursor-pointer p-0.5"
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
            >
              {star}
            </button>
          ) : (
            <span key={n}>{star}</span>
          )
        })}
      </div>
      {showNumber && <span className="text-sm font-medium text-slate-600">{value.toFixed(1)}</span>}
    </div>
  )
}
