import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Heart, Inbox, Mail, Pencil, ExternalLink, UserCircle } from 'lucide-react'
import type { Enquiry, Tutor } from '../lib/db'
import {
  getFavourites, getEnquiriesForParent, getEnquiriesForTutor, getTutor, getTutors,
} from '../lib/db'
import { useAuth } from '../context/AuthContext'
import { modeLabel } from '../lib/constants'
import TutorCard from '../components/TutorCard'
import Avatar from '../components/Avatar'
import StarRating from '../components/StarRating'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const statusStyle: Record<Enquiry['status'], string> = {
  new: 'bg-brand-50 text-brand-700',
  replied: 'bg-green-50 text-green-700',
  closed: 'bg-slate-100 text-slate-500',
}

function EnquiryCard({ enquiry, who }: { enquiry: Enquiry; who: string }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="font-medium text-ink">{who}</span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyle[enquiry.status]}`}>
          {enquiry.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{enquiry.message}</p>
      <p className="mt-2 text-xs text-slate-400">{formatDate(enquiry.createdAt)}</p>
    </li>
  )
}

function ParentAccount({ userId }: { userId: string }) {
  const [favs, setFavs] = useState<Tutor[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [names, setNames] = useState<Record<string, string>>({})

  useEffect(() => {
    getFavourites(userId).then(setFavs)
    getEnquiriesForParent(userId).then(setEnquiries)
    getTutors().then((list) => setNames(Object.fromEntries(list.map((t) => [t.id, t.fullName]))))
  }, [userId])

  return (
    <div className="space-y-10">
      <section>
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Heart size={18} className="text-rose-500" /> Saved tutors
        </h2>
        {favs.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            No favourites yet.{' '}
            <Link to="/find" className="font-semibold text-brand-600 hover:underline">
              Find tutors to save →
            </Link>
          </p>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favs.map((t) => (
              <TutorCard key={t.id} tutor={t} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Mail size={18} className="text-brand-600" /> Your enquiries
        </h2>
        {enquiries.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">You haven't sent any enquiries yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {enquiries.map((e) => (
              <EnquiryCard key={e.id} enquiry={e} who={names[e.tutorId] ?? 'Tutor'} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function TutorAccount({ userId }: { userId: string }) {
  const [tutor, setTutor] = useState<Tutor | null>(null)
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getTutor(userId), getEnquiriesForTutor(userId)]).then(([t, e]) => {
      setTutor(t)
      setEnquiries(e)
      setLoading(false)
    })
  }, [userId])

  if (loading) return <p className="text-sm text-slate-400">Loading…</p>

  return (
    <div className="space-y-10">
      <section>
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <UserCircle size={18} className="text-brand-700" /> Your profile
        </h2>
        {tutor ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar name={tutor.fullName} photoUrl={tutor.photoUrl} />
              <div className="flex-1">
                <p className="font-semibold text-ink">{tutor.fullName}</p>
                <p className="text-sm text-slate-500">{tutor.headline}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                  <span>{tutor.city}</span>
                  <span>·</span>
                  <span>From €{tutor.hourlyPriceEur}/hr</span>
                  <span>·</span>
                  <span>{modeLabel(tutor.mode)}</span>
                  <StarRating value={tutor.rating} size={13} showNumber />
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/become-a-tutor"
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand-300"
                >
                  <Pencil size={15} /> Edit
                </Link>
                <Link
                  to={`/tutor/${tutor.id}`}
                  className="flex items-center gap-1.5 rounded-xl bg-ink px-3 py-2 text-sm font-medium text-white hover:bg-brand-600"
                >
                  <ExternalLink size={15} /> View
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
            <p className="text-sm text-slate-500">You haven't created your tutor profile yet.</p>
            <Link
              to="/become-a-tutor"
              className="mt-3 inline-block rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Create profile
            </Link>
          </div>
        )}
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Inbox size={18} className="text-brand-600" /> Enquiries received
        </h2>
        {enquiries.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No enquiries yet. They'll appear here when parents contact you.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {enquiries.map((e) => (
              <EnquiryCard key={e.id} enquiry={e} who={e.parentName} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default function Account() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-20 text-center text-slate-400">Loading…</div>
  }
  if (!user) return <Navigate to="/signin" replace />

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-brand-600">
          {user.role === 'parent' ? 'Parent account' : 'Tutor account'}
        </p>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Hi, {user.fullName.split(' ')[0]}</h1>
      </div>
      {user.role === 'parent' ? <ParentAccount userId={user.id} /> : <TutorAccount userId={user.id} />}
    </div>
  )
}
