import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, BadgeCheck } from 'lucide-react'
import type { Tutor } from '../lib/db'
import { isFavourite, toggleFavourite } from '../lib/db'
import { useAuth } from '../context/AuthContext'
import { modeLabel } from '../lib/constants'
import Avatar from './Avatar'
import StarRating from './StarRating'

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  const { user } = useAuth()
  const isParent = user?.role === 'parent'
  const [fav, setFav] = useState(false)

  useEffect(() => {
    if (isParent && user) isFavourite(user.id, tutor.id).then(setFav)
    else setFav(false)
  }, [isParent, user, tutor.id])

  async function onToggleFav(e: React.MouseEvent) {
    e.preventDefault()
    if (!user) return
    setFav(await toggleFavourite(user.id, tutor.id))
  }

  return (
    <Link
      to={`/tutor/${tutor.id}`}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
    >
      {isParent && (
        <button
          type="button"
          onClick={onToggleFav}
          aria-label={fav ? 'Remove from favourites' : 'Save to favourites'}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Heart size={20} className={fav ? 'fill-rose-500 text-rose-500' : ''} />
        </button>
      )}

      <div className="flex items-start gap-4">
        <Avatar name={tutor.fullName} photoUrl={tutor.photoUrl} />
        <div className="min-w-0 pr-6">
          <h3 className="flex items-center gap-1 font-semibold text-blue-900">
            {tutor.fullName}
            {tutor.verified && (
              <BadgeCheck size={16} className="text-cyan-600" aria-label="Verified" />
            )}
          </h3>
          <p className="truncate text-sm text-slate-600">{tutor.headline}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
        <MapPin size={14} /> {tutor.city}
        <span className="text-slate-300">·</span>
        <StarRating value={tutor.rating} size={14} showNumber />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {tutor.subjects.map((s) => (
          <span key={s} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {s}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-500">{tutor.ageGroups.join(' · ')}</p>

      <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
        <div>
          <p className="text-lg font-bold text-blue-900">
            From €{tutor.hourlyPriceEur}
            <span className="text-xs font-normal text-slate-500">/hour</span>
          </p>
          <p className="text-xs text-slate-500">
            {modeLabel(tutor.mode)} · {tutor.experienceYears} yrs
          </p>
        </div>
        <span className="rounded-lg bg-blue-900 px-3 py-1.5 text-sm font-medium text-white transition group-hover:bg-blue-800">
          View Profile
        </span>
      </div>
    </Link>
  )
}
