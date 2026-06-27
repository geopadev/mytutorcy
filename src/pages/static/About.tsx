import { Target, Heart, ShieldCheck } from 'lucide-react'
import PageShell from '../../components/PageShell'

const values = [
  { icon: Target, title: 'Find the right fit, faster', text: 'Clear profiles and filters help parents shortlist tutors in minutes, not days.' },
  { icon: ShieldCheck, title: 'Built on trust', text: 'Verified badges, qualifications and real reviews so families can choose with confidence.' },
  { icon: Heart, title: 'Made for Cyprus families', text: 'From Pancyprian exams to primary support — local levels, local tutors, local prices.' },
]

export default function About() {
  return (
    <PageShell
      title="About MyTutorCY"
      subtitle="We help parents in Cyprus find the right tutor faster, safer, and with clearer prices."
    >
      <div className="prose-slate space-y-4 text-slate-600">
        <p>
          MyTutorCY is a tutoring marketplace for Cyprus. Finding a good tutor usually means asking around,
          chasing phone numbers and guessing at prices. We bring tutors together in one place so parents can
          search by subject, location, level and budget — and compare profiles, reviews and rates side by side.
        </p>
        <p>
          For tutors, it's a simple way to be discovered: create a profile, set your prices and availability,
          and receive enquiries directly from families looking for exactly what you teach.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
              <v.icon size={22} />
            </span>
            <h3 className="mt-4 font-semibold text-blue-900">{v.title}</h3>
            <p className="mt-1.5 text-sm text-slate-500">{v.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This site is an early prototype. Data is stored only in your browser and resets if you clear site data.
      </p>
    </PageShell>
  )
}
