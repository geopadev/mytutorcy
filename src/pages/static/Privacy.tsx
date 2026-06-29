import PageShell from '../../components/PageShell'

const sections = [
  {
    h: 'Data we store',
    p: 'This prototype stores everything — your account, profiles, favourites, enquiries and reviews — locally in your browser using localStorage. Nothing is sent to a server.',
  },
  {
    h: 'No tracking',
    p: 'We do not use analytics, advertising trackers, or third-party cookies in this prototype.',
  },
  {
    h: 'Your control',
    p: 'Because data lives in your browser, you are in full control. Clearing your browser site data permanently removes everything stored by MyTutorCY.',
  },
  {
    h: 'Future production version',
    p: 'A live version would move data to a secure database with proper authentication and privacy controls. This prototype is for demonstration only.',
  },
]

export default function Privacy() {
  return (
    <PageShell title="Privacy Policy" subtitle="How your information is handled in this prototype.">
      <div className="space-y-6">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-semibold text-ink">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.p}</p>
          </section>
        ))}
        <p className="text-xs text-slate-400">
          Reminder: never enter a real password — authentication here is cosmetic and stored in plain text locally.
        </p>
      </div>
    </PageShell>
  )
}
