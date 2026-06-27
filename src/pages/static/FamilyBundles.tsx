import { Link } from 'react-router-dom'
import { Users, UsersRound, CalendarDays, Laptop } from 'lucide-react'
import PageShell from '../../components/PageShell'

const bundles = [
  { icon: Users, title: 'Two-siblings package', text: 'Book lessons for two siblings and save with a sibling discount.', tag: 'Save 15%' },
  { icon: UsersRound, title: 'Small group lessons', text: 'Share a tutor with 2–4 students for a lower price per child.', tag: 'From €12/child' },
  { icon: CalendarDays, title: 'Monthly exam-prep package', text: 'A set of weekly sessions through exam season at a bundle rate.', tag: 'Best for Pancyprian' },
  { icon: Laptop, title: 'Online revision package', text: 'Flexible online sessions you can book across the month.', tag: 'Flexible' },
]

export default function FamilyBundles() {
  return (
    <PageShell
      title="Save more with family bundles"
      subtitle="Sibling discounts, small group lessons and monthly packages."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {bundles.map((b) => (
          <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
                <b.icon size={22} />
              </span>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                {b.tag}
              </span>
            </div>
            <h3 className="mt-4 font-semibold text-blue-900">{b.title}</h3>
            <p className="mt-1.5 text-sm text-slate-500">{b.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm text-slate-500">
        Bundles are arranged directly with each tutor. Ask about options when you{' '}
        <Link to="/find" className="font-semibold text-cyan-600 hover:underline">
          enquire
        </Link>
        .
      </p>
    </PageShell>
  )
}
