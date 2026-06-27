import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, Users, MessageCircle, ShieldCheck, BadgeCheck, FileCheck2, Star, Lock,
  Backpack, School, GraduationCap, Trophy, BookOpenCheck, Award, Languages, Music,
  Dumbbell, HeartHandshake, Globe, ArrowRight,
} from 'lucide-react'
import type { Tutor } from '../lib/db'
import { getTutors } from '../lib/db'
import { CATEGORIES } from '../lib/constants'
import SearchBar from '../components/SearchBar'
import TutorCard from '../components/TutorCard'

const CATEGORY_ICONS: Record<string, typeof Backpack> = {
  Backpack, School, GraduationCap, Trophy, BookOpenCheck, Award, Languages, Music,
  Dumbbell, HeartHandshake, Globe,
}

const parentSteps = [
  { icon: Search, title: 'Search', text: 'Search by subject and location to see tutors near you or online.' },
  { icon: Users, title: 'Compare', text: 'Compare profiles, prices and real parent reviews side by side.' },
  { icon: MessageCircle, title: 'Contact', text: 'Send an enquiry and arrange the right support for your child.' },
]

const trustItems = [
  { icon: BadgeCheck, title: 'Verified profiles', text: 'Look for the verified badge on trusted tutors.' },
  { icon: FileCheck2, title: 'Qualifications', text: 'Tutors list their degrees and teaching experience.' },
  { icon: Star, title: 'Real reviews', text: 'Read honest feedback from other Cyprus parents.' },
  { icon: Lock, title: 'Clear & secure', text: 'Transparent pricing and private enquiries.' },
]

export default function Home() {
  const [tutors, setTutors] = useState<Tutor[]>([])

  useEffect(() => {
    getTutors().then((list) => setTutors(list.slice(0, 3)))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cyan-200">
              <ShieldCheck size={14} /> Cyprus tutoring marketplace
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Find trusted tutors for your child in Cyprus
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100 sm:text-lg">
              Search by subject, location, level, price, and availability. Compare tutors,
              read profiles, and find the right support for your child.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/find"
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400"
              >
                Find a Tutor
              </Link>
              <Link
                to="/become-a-tutor"
                className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/20"
              >
                Become a Tutor
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">How it works</h2>
          <p className="mt-2 text-slate-500">Three simple steps to find the right tutor.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {parentSteps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
                <s.icon size={24} />
              </div>
              <h3 className="mt-4 font-semibold text-blue-900">
                {i + 1}. {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Are you a tutor?{' '}
          <Link to="/become-a-tutor" className="font-semibold text-cyan-600 hover:underline">
            Create a profile and start receiving enquiries →
          </Link>
        </p>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">Browse by category</h2>
            <p className="mt-2 text-slate-500">From primary school to Pancyprian exams and beyond.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c.icon] ?? GraduationCap
              const params = new URLSearchParams(c.params).toString()
              return (
                <Link
                  key={c.label}
                  to={`/find${params ? `?${params}` : ''}`}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-300 hover:bg-cyan-50/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-cyan-100 group-hover:text-cyan-700">
                    <Icon size={20} />
                  </span>
                  <span className="text-sm font-medium text-slate-700">{c.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular tutors */}
      {tutors.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">Popular tutors</h2>
              <p className="mt-2 text-slate-500">A few of the tutors families are contacting.</p>
            </div>
            <Link to="/find" className="hidden items-center gap-1 text-sm font-semibold text-cyan-600 hover:underline sm:flex">
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

      {/* Trust & safety */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Trust & safety</h2>
            <p className="mt-2 text-blue-100">We help you choose with confidence.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((t) => (
              <div key={t.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300">
                  <t.icon size={22} />
                </div>
                <h3 className="mt-4 font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-blue-100">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-blue-200">
            Identity checks and qualification verification are coming soon — this is an early prototype.
          </p>
        </div>
      </section>
    </div>
  )
}
