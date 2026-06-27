import { useState } from 'react'
import { Mail, MapPin, CheckCircle2 } from 'lucide-react'
import PageShell from '../../components/PageShell'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const inputCls =
    'w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100'

  return (
    <PageShell title="Contact us" subtitle="Questions, feedback or partnership ideas — we'd love to hear from you.">
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
              <Mail size={18} />
            </span>
            <div>
              <p className="font-semibold text-blue-900">Email</p>
              <p className="text-sm text-slate-500">hello@mytutorcy.example</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
              <MapPin size={18} />
            </span>
            <div>
              <p className="font-semibold text-blue-900">Based in</p>
              <p className="text-sm text-slate-500">Nicosia, Cyprus</p>
            </div>
          </div>
        </div>

        {sent ? (
          <div className="flex items-start gap-2 rounded-2xl bg-green-50 p-6 text-green-800">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm">Thanks for reaching out! This is a prototype, so messages aren't actually sent.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Your name" className={inputCls} />
              <input required type="email" placeholder="Your email" className={inputCls} />
            </div>
            <textarea required rows={4} placeholder="How can we help?" className={inputCls} />
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-900 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-800"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </PageShell>
  )
}
