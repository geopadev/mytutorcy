import PageShell from '../../components/PageShell'

const sections = [
  {
    h: '1. About these terms',
    p: 'MyTutorCY is a prototype tutoring marketplace for Cyprus. By using the site you agree to these terms. As an early prototype, the service is provided "as is" without warranties.',
  },
  {
    h: '2. Accounts',
    p: 'You are responsible for the information you provide. Accounts in this prototype are stored only in your browser and use cosmetic, demo-only authentication — do not use a real password.',
  },
  {
    h: '3. Tutors and parents',
    p: 'MyTutorCY connects parents with independent tutors. We do not employ tutors, set their prices, or take part in lessons or payments. Any arrangement is directly between the parent and the tutor.',
  },
  {
    h: '4. Content and reviews',
    p: 'Reviews and profiles should be honest and respectful. We may remove content that is misleading, offensive, or violates the rights of others.',
  },
  {
    h: '5. Limitation of liability',
    p: 'To the extent permitted by law, MyTutorCY is not liable for the conduct of tutors or parents, or for the outcome of any lessons arranged through the site.',
  },
]

export default function Terms() {
  return (
    <PageShell title="Terms of Service" subtitle="The basics of using MyTutorCY.">
      <div className="space-y-6">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-semibold text-blue-900">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.p}</p>
          </section>
        ))}
        <p className="text-xs text-slate-400">Last updated: prototype build. These terms are illustrative only.</p>
      </div>
    </PageShell>
  )
}
