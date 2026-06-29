import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { GraduationCap, Menu, X, LogOut, UserCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/find', label: 'Find a Tutor' },
  { to: '/how-it-works', label: 'How it works' },
]

const footerLinks: { to: string; label: string }[] = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/family-bundles', label: 'Family Bundles' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
  { to: '/terms', label: 'Terms' },
  { to: '/privacy', label: 'Privacy' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-ink">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-soft">
        <GraduationCap size={22} />
      </span>
      <span>
        MyTutor<span className="text-brand-500">CY</span>
      </span>
    </Link>
  )
}

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
    setOpen(false)
    navigate('/')
  }

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-[15px] font-semibold transition hover:text-brand-600 ${isActive ? 'text-brand-600' : 'text-ink-soft'}`

  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Logo />

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/account"
                  className="flex items-center gap-1.5 text-[15px] font-semibold text-ink hover:text-brand-600"
                >
                  <UserCircle size={18} /> Account
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-[15px] font-medium text-slate-500 hover:text-rose-500"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/become-a-tutor"
                  className="rounded-full px-4 py-2 text-[15px] font-semibold text-ink-soft transition hover:bg-brand-50 hover:text-brand-700"
                >
                  Become a Tutor
                </Link>
                <Link
                  to="/signin"
                  className="rounded-full bg-brand-500 px-5 py-2.5 text-[15px] font-semibold text-white shadow-soft transition hover:bg-brand-600"
                >
                  Sign in
                </Link>
              </div>
            )}
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl text-ink-soft transition hover:bg-slate-100 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-brand-50"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
              {user ? (
                <>
                  <NavLink
                    to="/account"
                    className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-brand-50"
                    onClick={() => setOpen(false)}
                  >
                    Account
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded-xl px-3 py-3 text-left text-base font-semibold text-rose-500"
                  >
                    <LogOut size={18} /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/become-a-tutor"
                    className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-brand-50"
                    onClick={() => setOpen(false)}
                  >
                    Become a Tutor
                  </NavLink>
                  <NavLink
                    to="/signin"
                    className="mt-1 rounded-xl bg-brand-500 px-3 py-3 text-center text-base font-semibold text-white"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Find a tutor who fits — across Cyprus. Verified profiles, real reviews, clear prices.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-4">
              {footerLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm font-medium text-slate-500 transition hover:text-brand-600">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-10 border-t border-slate-100 pt-6 text-xs text-slate-400">
            © {new Date().getFullYear()} MyTutorCY — a prototype. Data is stored in your browser only.
          </p>
        </div>
      </footer>
    </div>
  )
}
