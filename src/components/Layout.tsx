import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { GraduationCap, Menu, X, LogOut, UserCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/find', label: 'Find a Tutor' },
  { to: '/become-a-tutor', label: 'Become a Tutor' },
  { to: '/how-it-works', label: 'How It Works' },
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
    <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-blue-900">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-900 text-white">
        <GraduationCap size={20} />
      </span>
      <span className="text-lg">
        MyTutor<span className="text-cyan-500">CY</span>
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
    `text-sm font-medium transition hover:text-cyan-600 ${isActive ? 'text-cyan-600' : 'text-slate-600'}`

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Logo />

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/account"
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-900 hover:text-cyan-600"
                >
                  <UserCircle size={18} /> Account
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-rose-500"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Sign in
              </Link>
            )}
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <NavLink key={l.to} to={l.to} className={linkCls} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              ))}
              {user ? (
                <>
                  <NavLink to="/account" className={linkCls} onClick={() => setOpen(false)}>
                    Account
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 text-left text-sm font-medium text-rose-500"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </>
              ) : (
                <NavLink to="/signin" className={linkCls} onClick={() => setOpen(false)}>
                  Sign in
                </NavLink>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm text-slate-500">
                Find trusted tutors for your child in Cyprus — by subject, location, level and price.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-4">
              {footerLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-slate-500 transition hover:text-cyan-600">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400">
            © {new Date().getFullYear()} MyTutorCY — a prototype. Data is stored in your browser only.
          </p>
        </div>
      </footer>
    </div>
  )
}
