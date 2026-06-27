import PageShell from '../../components/PageShell'

const faqs = [
  {
    q: 'Is MyTutorCY free for parents?',
    a: 'Yes. Searching, comparing tutors, saving favourites and sending enquiries are all free for parents.',
  },
  {
    q: 'How do I contact a tutor?',
    a: 'Open a tutor profile and use the Enquire box to send a message. You need a free parent account to enquire.',
  },
  {
    q: 'What does the "Verified" badge mean?',
    a: 'It marks tutors we have reviewed. In this prototype the badge is illustrative — full identity and qualification checks are planned.',
  },
  {
    q: 'How are prices set?',
    a: 'Each tutor sets their own hourly rate, shown clearly on their profile. Many also offer family bundles.',
  },
  {
    q: 'How do I become a tutor?',
    a: 'Click "Become a Tutor", create your profile with your subjects, prices and availability, and you will start appearing in search.',
  },
  {
    q: 'Where is my data stored?',
    a: 'This is a prototype — all data lives only in your browser via localStorage. Clearing site data resets everything.',
  },
]

export default function FAQ() {
  return (
    <PageShell title="Frequently asked questions" subtitle="Everything you need to know to get started.">
      <div className="space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-blue-900">
              {f.q}
              <span className="text-cyan-500 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </PageShell>
  )
}
