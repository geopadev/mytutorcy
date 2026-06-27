import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Auth() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'signin') {
        await signIn(email, password)
      } else {
        await signUp({ email, password, fullName, role: 'parent' })
      }
      navigate('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  function useDemo() {
    setMode('signin')
    setEmail('parent@demo.cy')
    setPassword('demo1234')
  }

  const inputCls =
    'w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100'
  const tab = (active: boolean) =>
    `flex-1 rounded-lg py-2 text-sm font-semibold transition ${active ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <div className="mb-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-900 text-white">
          <GraduationCap size={24} />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-blue-900">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {mode === 'signin' ? 'Sign in to enquire, save and review tutors.' : 'Sign up as a parent to get started.'}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex gap-1 rounded-xl bg-slate-100 p-1">
          <button type="button" className={tab(mode === 'signin')} onClick={() => setMode('signin')}>
            Sign in
          </button>
          <button type="button" className={tab(mode === 'signup')} onClick={() => setMode('signup')}>
            Sign up
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
              <input required className={inputCls} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              required
              type="email"
              className={inputCls}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <input
              required
              type="password"
              className={inputCls}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-blue-900 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <button
          type="button"
          onClick={useDemo}
          className="mt-4 w-full rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm text-slate-600 transition hover:border-cyan-400 hover:text-cyan-700"
        >
          Use demo account · parent@demo.cy
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        Want to teach instead?{' '}
        <Link to="/become-a-tutor" className="font-semibold text-cyan-600 hover:underline">
          Become a tutor
        </Link>
      </p>
    </div>
  )
}
