import { useEffect, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import type { Tutor } from '../lib/db'
import { getTutor, upsertTutor } from '../lib/db'
import { useAuth } from '../context/AuthContext'
import { CITIES, SUBJECTS, AGE_GROUPS, LANGUAGES, MODES } from '../lib/constants'

const baseSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  headline: z.string().min(5, 'Add a short headline (e.g. "Maths Tutor — Nicosia")'),
  city: z.string().min(1, 'Select a city'),
  mode: z.enum(['online', 'in_person', 'both']),
  hourlyPriceEur: z.coerce.number().min(5, 'Minimum €5').max(200, 'Maximum €200'),
  experienceYears: z.coerce.number().min(0, 'Cannot be negative').max(60, 'Really?'),
  qualifications: z.string().min(2, 'Add your qualifications'),
  availability: z.string().min(2, 'Add your availability'),
  bio: z.string().min(20, 'Tell parents a bit more (at least 20 characters)'),
  phone: z.string().optional(),
  photoUrl: z.string().url('Enter a valid image URL').or(z.literal('')).optional(),
  familyBundles: z.string().optional(),
  subjects: z.array(z.string()).min(1, 'Pick at least one subject'),
  ageGroups: z.array(z.string()).min(1, 'Pick at least one level'),
  languages: z.array(z.string()).min(1, 'Pick at least one language'),
})

const accountSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'At least 6 characters'),
})

const fullSchema = baseSchema.merge(accountSchema)
type FormValues = z.infer<typeof fullSchema>

const inputCls =
  'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
const labelCls = 'mb-1.5 block text-sm font-medium text-slate-700'
const errCls = 'mt-1 text-xs text-rose-500'

export default function BecomeTutor() {
  const { user, loading, signUp } = useAuth()
  const navigate = useNavigate()
  const [existing, setExisting] = useState<Tutor | null>(null)
  const [formError, setFormError] = useState('')

  const isTutor = user?.role === 'tutor'
  const isParent = user?.role === 'parent'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(user ? baseSchema : fullSchema) as unknown as Resolver<FormValues>,
    defaultValues: {
      fullName: '', headline: '', city: '', mode: 'both', hourlyPriceEur: 25,
      experienceYears: 1, qualifications: '', availability: '', bio: '',
      phone: '', photoUrl: '', familyBundles: '',
      subjects: [], ageGroups: [], languages: [], email: '', password: '',
    },
  })

  // If a tutor is already signed in, load and prefill their profile (edit mode).
  useEffect(() => {
    if (!isTutor || !user) return
    getTutor(user.id).then((t) => {
      if (!t) {
        reset((prev) => ({ ...prev, fullName: user.fullName }))
        return
      }
      setExisting(t)
      reset({
        fullName: t.fullName, headline: t.headline, city: t.city, mode: t.mode,
        hourlyPriceEur: t.hourlyPriceEur, experienceYears: t.experienceYears,
        qualifications: t.qualifications, availability: t.availability, bio: t.bio,
        phone: '', photoUrl: t.photoUrl, familyBundles: '',
        subjects: t.subjects, ageGroups: t.ageGroups, languages: t.languages,
        email: '', password: '',
      })
    })
  }, [isTutor, user, reset])

  async function onSubmit(data: FormValues) {
    setFormError('')
    try {
      let id = user?.id
      if (!user) {
        const u = await signUp({
          email: data.email, password: data.password, fullName: data.fullName, role: 'tutor',
        })
        id = u.id
      }
      const tutor: Tutor = {
        id: id!,
        fullName: data.fullName,
        headline: data.headline,
        city: data.city,
        mode: data.mode,
        hourlyPriceEur: Number(data.hourlyPriceEur),
        bio: data.bio,
        experienceYears: Number(data.experienceYears),
        qualifications: data.qualifications,
        languages: data.languages,
        ageGroups: data.ageGroups,
        subjects: data.subjects,
        availability: data.availability,
        photoUrl: data.photoUrl ?? '',
        verified: existing?.verified ?? false,
        rating: existing?.rating ?? 0,
      }
      await upsertTutor(tutor)
      navigate(`/tutor/${tutor.id}`)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-2xl px-4 py-20 text-center text-slate-400">Loading…</div>
  }

  if (isParent) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">You're signed in as a parent</h1>
        <p className="mt-3 text-slate-500">
          Tutor profiles need a separate tutor account. Sign out first, then register as a tutor.
        </p>
        <Link to="/account" className="mt-4 inline-block font-semibold text-brand-600 hover:underline">
          Go to your account →
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          {isTutor ? 'Edit your tutor profile' : 'Become a tutor'}
        </h1>
        <p className="mt-2 text-slate-500">
          {isTutor
            ? 'Update your details to keep your profile fresh.'
            : 'Create your profile, set your price, and start receiving enquiries.'}
        </p>
      </div>

      {formError && (
        <div className="mt-6 flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle size={16} /> {formError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {!user && (
          <fieldset className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <legend className="px-2 text-sm font-semibold text-ink">Account</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" className={inputCls} {...register('email')} />
                {errors.email && <p className={errCls}>{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Password</label>
                <input type="password" className={inputCls} {...register('password')} />
                {errors.password && <p className={errCls}>{errors.password.message}</p>}
              </div>
            </div>
            <p className="text-xs text-slate-400">Demo only — never use a real password.</p>
          </fieldset>
        )}

        <fieldset className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <legend className="px-2 text-sm font-semibold text-ink">About you</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Full name</label>
              <input className={inputCls} {...register('fullName')} />
              {errors.fullName && <p className={errCls}>{errors.fullName.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Phone (optional)</label>
              <input className={inputCls} {...register('phone')} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Headline</label>
            <input className={inputCls} placeholder="Maths Tutor — Nicosia" {...register('headline')} />
            {errors.headline && <p className={errCls}>{errors.headline.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Short bio</label>
            <textarea rows={4} className={inputCls} {...register('bio')} />
            {errors.bio && <p className={errCls}>{errors.bio.message}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Qualifications</label>
              <input className={inputCls} placeholder="BSc Mathematics, UCY" {...register('qualifications')} />
              {errors.qualifications && <p className={errCls}>{errors.qualifications.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Years of experience</label>
              <input type="number" min={0} className={inputCls} {...register('experienceYears')} />
              {errors.experienceYears && <p className={errCls}>{errors.experienceYears.message}</p>}
            </div>
          </div>
          <div>
            <label className={labelCls}>Profile photo URL (optional)</label>
            <input className={inputCls} placeholder="https://…" {...register('photoUrl')} />
            {errors.photoUrl && <p className={errCls}>{errors.photoUrl.message}</p>}
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <legend className="px-2 text-sm font-semibold text-ink">Teaching</legend>

          <div>
            <label className={labelCls}>Subjects</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <label key={s} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50">
                  <input type="checkbox" value={s} className="accent-brand-500" {...register('subjects')} />
                  {s}
                </label>
              ))}
            </div>
            {errors.subjects && <p className={errCls}>{errors.subjects.message}</p>}
          </div>

          <div>
            <label className={labelCls}>Student levels</label>
            <div className="flex flex-wrap gap-2">
              {AGE_GROUPS.map((a) => (
                <label key={a} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50">
                  <input type="checkbox" value={a} className="accent-brand-500" {...register('ageGroups')} />
                  {a}
                </label>
              ))}
            </div>
            {errors.ageGroups && <p className={errCls}>{errors.ageGroups.message}</p>}
          </div>

          <div>
            <label className={labelCls}>Languages</label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <label key={l} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50">
                  <input type="checkbox" value={l} className="accent-brand-500" {...register('languages')} />
                  {l}
                </label>
              ))}
            </div>
            {errors.languages && <p className={errCls}>{errors.languages.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>City / area</label>
              <select className={inputCls} {...register('city')}>
                <option value="">Select…</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.city && <p className={errCls}>{errors.city.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Lesson mode</label>
              <select className={inputCls} {...register('mode')}>
                {MODES.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Price €/hour</label>
              <input type="number" min={5} className={inputCls} {...register('hourlyPriceEur')} />
              {errors.hourlyPriceEur && <p className={errCls}>{errors.hourlyPriceEur.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Availability</label>
            <input className={inputCls} placeholder="Weekday evenings, Saturday mornings" {...register('availability')} />
            {errors.availability && <p className={errCls}>{errors.availability.message}</p>}
          </div>

          <div>
            <label className={labelCls}>Family bundle options (optional)</label>
            <input className={inputCls} placeholder="Sibling discount, monthly packages…" {...register('familyBundles')} />
          </div>
        </fieldset>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-soft">
          Profile tier: <span className="font-semibold text-ink">Free</span> — all profiles are free at launch.
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-ink px-6 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving…' : isTutor ? 'Save profile' : 'Create my profile'}
        </button>
      </form>
    </div>
  )
}
