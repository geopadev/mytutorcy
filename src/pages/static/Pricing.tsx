import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import PageShell from '../../components/PageShell'

const tiers = [
  {
    name: 'Free',
    price: '€0',
    tagline: 'Everything you need to get started.',
    features: ['Public tutor profile', 'Appear in search', 'Receive enquiries', 'Collect reviews'],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 'Soon',
    tagline: 'Stand out from the crowd.',
    features: ['Everything in Free', 'Priority in search results', 'Highlighted profile', 'Profile analytics'],
    highlighted: false,
  },
  {
    name: 'Featured',
    price: 'Soon',
    tagline: 'Maximum visibility.',
    features: ['Everything in Premium', 'Homepage placement', 'Featured badge', 'Category spotlights'],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <PageShell title="Pricing" subtitle="Simple and transparent. Every profile is free at launch.">
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
              t.highlighted ? 'border-cyan-400 ring-2 ring-cyan-100' : 'border-slate-200'
            }`}
          >
            {t.highlighted && (
              <span className="mb-3 w-fit rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cyan-700">
                Available now
              </span>
            )}
            <h3 className="font-bold text-blue-900">{t.name}</h3>
            <p className="mt-1 text-3xl font-extrabold text-blue-900">{t.price}</p>
            <p className="mt-1 text-sm text-slate-500">{t.tagline}</p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-cyan-600" /> {f}
                </li>
              ))}
            </ul>
            <Link
              to="/become-a-tutor"
              className={`mt-6 rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition ${
                t.highlighted
                  ? 'bg-blue-900 text-white hover:bg-blue-800'
                  : 'border border-slate-200 text-slate-500'
              }`}
            >
              {t.highlighted ? 'Create free profile' : 'Coming soon'}
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-slate-500">
        Looking for lesson prices? Each tutor sets their own hourly rate — see it on their profile.
      </p>
    </PageShell>
  )
}
