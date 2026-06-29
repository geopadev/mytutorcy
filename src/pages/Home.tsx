import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, ArrowRight, BadgeCheck, Star, Wallet, ShieldCheck, FileCheck2, MessageCircle,
  Backpack, School, GraduationCap, Trophy, BookOpenCheck, Award, Languages, Music,
  Dumbbell, HeartHandshake, Globe,
} from 'lucide-react'
import type { Tutor } from '../lib/db'
import { getTutors } from '../lib/db'
import { CATEGORIES } from '../lib/constants'
import SearchBar from '../components/SearchBar'
import TutorCard from '../components/TutorCard'
import { HeroIllustration, StepSearch, StepCompare, StepConnect } from '../components/Illustrations'

const CATEGORY_ICONS: Record<string, typeof Backpack> = {
  Backpack, School, GraduationCap, Trophy, BookOpenCheck, Award, Languages, Music,
  Dumbbell, HeartHandshake, Globe,
}

// Soft colour themes cycled across the category tiles to keep them lively.
const TILE_THEMES = [
  'bg-brand-50 text-brand-600',
  'bg-accent-50 text-accent-600',
  'bg-sky-50 text-sky-600',
  'bg-violet-50 text-violet-600',
  'bg-rose-50 text-rose-600',
  'bg-teal-50 text-teal-600',
]

const steps = [
  { Illu: StepSearch, title: 'Search', text: 'Tell us the subject, level and where — online or in your city.' },
  { Illu: StepCompare, title: 'Compare', text: 'See prices, qualifications and real reviews side by side.' },
  { Illu: StepConnect, title: 'Connect', text: 'Message a tutor and arrange lessons that fit your family.' },
]

const trustStrip = [
  { icon: BadgeCheck, label: 'Verified profiles' },
  { icon: Star, label: 'Real reviews' },
  { icon: Wallet, label: 'Clear pricing' },
]

const trustPoints = [
  { icon: BadgeCheck, title: 'Verified profiles', text: 'Look for the verified badge on trusted tutors.' },
  { icon: FileCheck2, title: 'Real qualifications', text: 'Tutors list their degrees and teaching experience.' },
  { icon: Star, title: 'Honest reviews', text: 'Read real feedback from other Cyprus families.' },
  { icon: ShieldCheck, title: 'Clear & private', text: 'Transparent pricing and private enquiries.' },
]

export default function Home() {
  const [tutors, setTutors] = useState<Tutor[]>([])

  useEffect(() => {
    getTutors().then((list) => setTutors(list.slice(0, 3)))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-100/60 blur-2xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-accent-100/50 blur-2xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 sm:pt-16">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-soft ring-1 ring-brand-100">
                <Sparkles size={14} /> Cyprus tutoring marketplace
              </span>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
                Find a tutor who fits — <span className="text-brand-500">across Cyprus</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-ink-soft">
                Verified tutors, real reviews, and clear prices. Search by subject, location,
                level and budget — online or near you.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/find"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent-600"
                >
                  Find a Tutor <ArrowRight size={18} />
                </Link>
                <Link
                  to="/become-a-tutor"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-ink shadow-soft ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-300"
                >
                  Become a Tutor
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <HeroIllustration className="h-auto w-full" />
            </div>
          </div>

          {/* Prominent search */}
          <div className="mt-10">
            <SearchBar />
          </div>

          {/* Light trust strip */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-medium text-ink-soft">
            {trustStrip.map((t) => (
              <span key={t.label} className="inline-flex items-center gap-2">
                <t.icon size={16} className="text-brand-500" /> {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-ink">How it works</h2>
          <p className="mt-2 text-ink-soft">Three simple steps to find the right tutor.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-soft"
            >
              <s.Illu className="mx-auto h-28 w-28" />
              <h3 className="mt-3 font-display text-lg font-bold text-ink">
                {i + 1}. {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-ink-soft">
          Are you a tutor?{' '}
          <Link to="/become-a-tutor" className="font-semibold text-brand-600 hover:underline">
            Create a free profile and start receiving enquiries →
          </Link>
        </p>
      </section>

      {/* Categories */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink">Browse by category</h2>
            <p className="mt-2 text-ink-soft">From primary school to Pancyprian exams and beyond.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c, i) => {
              const Icon = CATEGORY_ICONS[c.icon] ?? GraduationCap
              const params = new URLSearchParams(c.params).toString()
              return (
                <Link
                  key={c.label}
                  to={`/find${params ? `?${params}` : ''}`}
                  className="group flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-surface-muted p-6 text-center shadow-soft transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-soft-lg"
                >
                  <span className={`grid h-16 w-16 place-items-center rounded-2xl transition group-hover:scale-105 ${TILE_THEMES[i % TILE_THEMES.length]}`}>
                    <Icon size={30} />
                  </span>
                  <span className="text-sm font-semibold text-ink">{c.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular tutors */}
      {tutors.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">Popular tutors</h2>
              <p className="mt-2 text-ink-soft">A few of the tutors families are contacting.</p>
            </div>
            <Link to="/find" className="hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:underline sm:flex">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((t) => (
              <TutorCard key={t.id} tutor={t} />
            ))}
          </div>
        </section>
      )}

      {/* Why families trust us — softened, light panel */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-[2rem] bg-gradient-to-br from-brand-50 to-accent-50/60 p-8 ring-1 ring-brand-100/70 sm:p-12">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-ink">Why families choose with confidence</h2>
              <p className="mt-2 text-ink-soft">Friendly to use, easy to trust.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trustPoints.map((t) => (
                <div key={t.title} className="rounded-2xl bg-white p-6 shadow-soft">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <t.icon size={22} />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-ink">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{t.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-ink-soft">
              <MessageCircle size={13} /> Identity checks and qualification verification are coming soon — this is an early prototype.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
