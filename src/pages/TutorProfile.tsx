import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  BadgeCheck, MapPin, Heart, Send, Flag, CheckCircle2, Globe, Clock, Award,
  GraduationCap, BookOpen, Users, Sparkles,
} from 'lucide-react'
import type { Review, Tutor } from '../lib/db'
import {
  getTutor, getReviews, addReview, isFavourite, toggleFavourite, sendEnquiry,
} from '../lib/db'
import { useAuth } from '../context/AuthContext'
import { modeLabel } from '../lib/constants'
import Avatar from '../components/Avatar'
import StarRating from '../components/StarRating'
import ReviewList from '../components/ReviewList'

function DetailRow({ icon: Icon, label, children }: { icon: typeof Award; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm text-slate-700">{children}</p>
      </div>
    </div>
  )
}

export default function TutorProfile() {
  const { id = '' } = useParams()
  const { user } = useAuth()
  const isParent = user?.role === 'parent'
  const isOwner = user?.id === id

  const [tutor, setTutor] = useState<Tutor | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [fav, setFav] = useState(false)

  const [message, setMessage] = useState('')
  const [enquirySent, setEnquirySent] = useState(false)
  const [sending, setSending] = useState(false)

  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  const [reported, setReported] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.all([getTutor(id), getReviews(id)]).then(([t, r]) => {
      if (!active) return
      setTutor(t)
      setReviews(r)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [id])

  useEffect(() => {
    if (isParent && user) isFavourite(user.id, id).then(setFav)
  }, [isParent, user, id])

  async function onToggleFav() {
    if (!user) return
    setFav(await toggleFavourite(user.id, id))
  }

  async function onEnquire(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !tutor) return
    setSending(true)
    await sendEnquiry({ parentId: user.id, parentName: user.fullName, tutorId: tutor.id, message })
    setSending(false)
    setEnquirySent(true)
    setMessage('')
  }

  async function onReview(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !tutor) return
    setSubmittingReview(true)
    await addReview({
      tutorId: tutor.id,
      parentId: user.id,
      parentName: user.fullName,
      rating: reviewRating,
      comment: reviewComment,
    })
    setReviews(await getReviews(tutor.id))
    setReviewComment('')
    setReviewRating(5)
    setSubmittingReview(false)
  }

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-20 text-center text-slate-400">Loading profile…</div>
  }

  if (!tutor) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-blue-900">Tutor not found</h1>
        <Link to="/find" className="mt-3 inline-block font-semibold text-cyan-600 hover:underline">
          ← Back to search
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar name={tutor.fullName} photoUrl={tutor.photoUrl} size="lg" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-blue-900">{tutor.fullName}</h1>
              {tutor.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cyan-700">
                  <BadgeCheck size={14} /> Verified
                </span>
              )}
            </div>
            <p className="mt-1 text-slate-600">{tutor.headline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {tutor.city}
              </span>
              <span className="flex items-center gap-1">
                <Globe size={14} /> {modeLabel(tutor.mode)}
              </span>
              <StarRating value={tutor.rating} size={15} showNumber />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tutor.subjects.map((s) => (
                <span key={s} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-2xl font-bold text-blue-900">
              From €{tutor.hourlyPriceEur}
              <span className="text-sm font-normal text-slate-500">/hour</span>
            </p>
            {!isOwner && (
              <div className="mt-3 flex gap-2 sm:justify-end">
                <a
                  href="#enquire"
                  className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
                >
                  Enquire
                </a>
                {isParent && (
                  <button
                    type="button"
                    onClick={onToggleFav}
                    aria-label={fav ? 'Remove from favourites' : 'Save to favourites'}
                    className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:border-rose-200 hover:text-rose-500"
                  >
                    <Heart size={18} className={fav ? 'fill-rose-500 text-rose-500' : ''} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {isOwner && (
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <Sparkles size={16} /> This is your public profile. Manage enquiries from your{' '}
            <Link to="/account" className="font-semibold underline">
              account
            </Link>
            .
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left: about + details + reviews */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-blue-900">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{tutor.bio}</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <DetailRow icon={Award} label="Experience">
                {tutor.experienceYears} years
              </DetailRow>
              <DetailRow icon={GraduationCap} label="Qualifications">
                {tutor.qualifications}
              </DetailRow>
              <DetailRow icon={Users} label="Age groups">
                {tutor.ageGroups.join(', ')}
              </DetailRow>
              <DetailRow icon={BookOpen} label="Languages">
                {tutor.languages.join(', ')}
              </DetailRow>
              <DetailRow icon={Clock} label="Availability">
                {tutor.availability}
              </DetailRow>
              <DetailRow icon={Globe} label="Lesson mode">
                {modeLabel(tutor.mode)}
              </DetailRow>
            </div>
          </section>

          {/* Family bundles (display only) */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-blue-900">Family bundle options</h2>
            <p className="mt-2 text-sm text-slate-600">
              This tutor offers sibling discounts and monthly packages. Ask about bundles when you enquire.
            </p>
            <Link to="/family-bundles" className="mt-2 inline-block text-sm font-semibold text-cyan-600 hover:underline">
              Learn about family bundles →
            </Link>
          </section>

          {/* Reviews */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-blue-900">
              Reviews {reviews.length > 0 && <span className="text-slate-400">({reviews.length})</span>}
            </h2>
            <div className="mt-4">
              <ReviewList reviews={reviews} />
            </div>

            {isParent && !isOwner && (
              <form onSubmit={onReview} className="mt-6 border-t border-slate-100 pt-5">
                <p className="mb-2 text-sm font-medium text-slate-700">Leave a review</p>
                <StarRating value={reviewRating} onChange={setReviewRating} size={22} />
                <textarea
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience with this tutor…"
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="mt-2 rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
                >
                  {submittingReview ? 'Posting…' : 'Post review'}
                </button>
              </form>
            )}
            {!user && (
              <p className="mt-4 text-sm text-slate-500">
                <Link to="/signin" className="font-semibold text-cyan-600 hover:underline">
                  Sign in
                </Link>{' '}
                as a parent to leave a review.
              </p>
            )}
          </section>
        </div>

        {/* Right: enquire + report */}
        <aside className="space-y-6">
          <section id="enquire" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-20">
            <h2 className="font-semibold text-blue-900">Contact {tutor.fullName.split(' ')[0]}</h2>

            {isOwner ? (
              <p className="mt-2 text-sm text-slate-500">You can't enquire to your own profile.</p>
            ) : !user ? (
              <p className="mt-2 text-sm text-slate-500">
                <Link to="/signin" className="font-semibold text-cyan-600 hover:underline">
                  Sign in
                </Link>{' '}
                to send an enquiry.
              </p>
            ) : enquirySent ? (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-800">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>Enquiry sent! The tutor will see it on their account.</span>
              </div>
            ) : (
              <form onSubmit={onEnquire} className="mt-3">
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi ${tutor.fullName.split(' ')[0]}, I'm looking for help with…`}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-60"
                >
                  <Send size={16} /> {sending ? 'Sending…' : 'Send enquiry'}
                </button>
              </form>
            )}

            <div className="mt-4 border-t border-slate-100 pt-4">
              {reported ? (
                <p className="text-xs text-slate-500">Thanks — our team will review this profile.</p>
              ) : (
                <button
                  type="button"
                  onClick={() => setReported(true)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-rose-500"
                >
                  <Flag size={13} /> Report this profile
                </button>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
