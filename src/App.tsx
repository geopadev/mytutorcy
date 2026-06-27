import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import FindTutor from './pages/FindTutor'
import TutorProfile from './pages/TutorProfile'
import BecomeTutor from './pages/BecomeTutor'
import Account from './pages/Account'
import Auth from './pages/Auth'
import HowItWorks from './pages/static/HowItWorks'
import About from './pages/static/About'
import Pricing from './pages/static/Pricing'
import FamilyBundles from './pages/static/FamilyBundles'
import Contact from './pages/static/Contact'
import FAQ from './pages/static/FAQ'
import Terms from './pages/static/Terms'
import Privacy from './pages/static/Privacy'

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-5xl font-extrabold text-blue-900">404</p>
      <p className="mt-3 text-slate-500">We couldn't find that page.</p>
      <Link to="/" className="mt-5 inline-block rounded-xl bg-blue-900 px-5 py-2.5 font-semibold text-white hover:bg-blue-800">
        Back home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="find" element={<FindTutor />} />
        <Route path="tutor/:id" element={<TutorProfile />} />
        <Route path="become-a-tutor" element={<BecomeTutor />} />
        <Route path="account" element={<Account />} />
        <Route path="signin" element={<Auth />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="about" element={<About />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="family-bundles" element={<FamilyBundles />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
