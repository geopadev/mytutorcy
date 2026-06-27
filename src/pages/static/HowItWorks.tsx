import { Link } from 'react-router-dom'
import { Search, Users, MessageCircle, UserPlus, ListChecks, Inbox } from 'lucide-react'
import PageShell from '../../components/PageShell'

const parents = [
  { icon: Search, title: 'Search subject + location', text: 'Tell us what your child needs and where — online or in your city.' },
  { icon: Users, title: 'Compare profiles, prices & reviews', text: 'Browse tutors side by side and shortlist your favourites.' },
  { icon: MessageCircle, title: 'Contact & arrange lessons', text: 'Send an enquiry and agree the details directly with the tutor.' },
]

const tutors = [
  { icon: UserPlus, title: 'Create your profile', text: 'Sign up and tell parents about your background and approach.' },
  { icon: ListChecks, title: 'Add subjects, prices & availability', text: 'Set your rates, locations, levels and when you teach.' },
  { icon: Inbox, title: 'Receive enquiries', text: 'Parents contact you directly — reply and grow your tutoring.' },
]

function Steps({ title, steps }: { title: string; steps: typeof parents }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900">{title}</h2>
      <ol className="mt-5 space-y-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
              <s.icon size={22} />
            </span>
            <div>
              <p className="font-semibold text-blue-900">
                {i + 1}. {s.title}
              </p>
              <p className="mt-1 text-sm text-slate-500">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <PageShell title="How it works" subtitle="Simple steps for parents and tutors.">
      <div className="grid gap-10 md:grid-cols-2">
        <Steps title="For parents" steps={parents} />
        <Steps title="For tutors" steps={tutors} />
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link to="/find" className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600">
          Find a Tutor
        </Link>
        <Link to="/become-a-tutor" className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800">
          Become a Tutor
        </Link>
      </div>
    </PageShell>
  )
}
