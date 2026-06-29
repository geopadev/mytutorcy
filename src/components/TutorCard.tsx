import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart, MapPin, BadgeCheck, ArrowRight,
  Calculator, Atom, FlaskConical, Leaf, BookOpen, Languages, GraduationCap, Code, Landmark,
} from 'lucide-react'
import type { Tutor } from '../lib/db'
import { isFavourite, toggleFavourite } from '../lib/db'
import { useAuth } from '../context/AuthContext'
import { modeLabel } from '../lib/constants'
import Avatar from './Avatar'
import StarRating from './StarRating'

// Friendly per-subject glyphs so each card leads with a visual, not just text.
const SUBJECT_ICONS: Record<string, typeof BookOpen> = {
  Maths: Calculator,
  Physics: Atom,
  Chemistry: FlaskConical,
  Biology: Leaf,
  English: BookOpen,
  Greek: Languages,
  IELTS: GraduationCap,
  'Computer Science': Code,
  History: Landmark,
  French: Languages,
}

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

  const SubjectIcon = SUBJECT_ICONS[tutor.subjects[0]] ?? BookOpen
  const shownSubjects = tutor.subjects.slice(0, 3)
  const moreSubjects = tutor.subjects.length - shownSubjects.length

  return (
    <Link
      to={`/tutor/${tutor.id}`}
      className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      {isParent && (
        <button
          type="button"
          onClick={onToggleFav}
          aria-label={fav ? 'Remove from favourites' : 'Save to favourites'}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-slate-400 backdrop-blur transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Heart size={18} className={fav ? 'fill-rose-500 text-rose-500' : ''} />
        </button>
      )}

      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <Avatar name={tutor.fullName} photoUrl={tutor.photoUrl} />
          <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white ring-2 ring-white">
            <SubjectIcon size={14} />
          </span>
        </div>
        <div className="min-w-0 pr-6">
          <h3 className="flex items-center gap-1.5 font-display font-semibold text-ink">
            <span className="truncate">{tutor.fullName}</span>
            {tutor.verified && (
              <BadgeCheck size={16} className="shrink-0 text-brand-500" aria-label="Verified" />
            )}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-ink-soft">{tutor.headline}</p>
          <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-500">
            <StarRating value={tutor.rating} size={14} showNumber />
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} /> {tutor.city}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {shownSubjects.map((s) => (
          <span key={s} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {s}
          </span>
        ))}
        {moreSubjects > 0 && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
            +{moreSubjects}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
        <div>
          <span className="inline-flex items-baseline gap-1 rounded-full bg-accent-50 px-3 py-1 font-display text-lg font-bold text-ink">
            €{tutor.hourlyPriceEur}
            <span className="text-xs font-medium text-slate-500">/hr</span>
          </span>
          <p className="mt-1.5 text-xs text-slate-500">
            {modeLabel(tutor.mode)} · {tutor.experienceYears} yrs exp
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-brand-600">
          View profile <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
