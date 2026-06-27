import type { Review } from '../lib/db'
import StarRating from './StarRating'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-slate-500">No reviews yet. Be the first to leave one.</p>
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <li key={r.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-blue-900">{r.parentName}</span>
            <span className="text-xs text-slate-400">{formatDate(r.createdAt)}</span>
          </div>
          <div className="mt-1">
            <StarRating value={r.rating} size={14} />
          </div>
          <p className="mt-2 text-sm text-slate-600">{r.comment}</p>
        </li>
      ))}
    </ul>
  )
}
