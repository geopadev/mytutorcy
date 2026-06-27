// src/lib/db.ts
// SINGLE SOURCE OF DATA ACCESS. Components import ONLY from here.
// Today: localStorage. Migration day: swap the insides for Supabase — signatures stay identical.
// Functions are async on purpose so the later swap needs no call-site changes.

export type Role = 'parent' | 'tutor'
export type Mode = 'online' | 'in_person' | 'both'

export interface User {
  id: string
  email: string
  password: string          // DEMO ONLY — plaintext in localStorage. Never use a real password.
  fullName: string
  role: Role
}

export interface Tutor {
  id: string                // same id as the owning user
  fullName: string
  headline: string
  city: string
  mode: Mode
  hourlyPriceEur: number
  bio: string
  experienceYears: number
  qualifications: string
  languages: string[]
  ageGroups: string[]
  subjects: string[]
  availability: string
  photoUrl: string
  verified: boolean
  rating: number
}

export interface Review { id: string; tutorId: string; parentId: string; parentName: string; rating: number; comment: string; createdAt: string }
export interface Favourite { parentId: string; tutorId: string }
export interface Enquiry { id: string; parentId: string; parentName: string; tutorId: string; message: string; status: 'new' | 'replied' | 'closed'; createdAt: string }

// ---- namespaced keys (GitHub Pages shares one origin across all your projects) ----
const NS = 'mytutorcy'
const K = {
  users: `${NS}:users`,
  session: `${NS}:session`,
  tutors: `${NS}:tutors`,
  reviews: `${NS}:reviews`,
  favourites: `${NS}:favourites`,
  enquiries: `${NS}:enquiries`,
}

// ---- helpers ----
function read<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback } catch { return fallback }
}
function write<T>(key: string, value: T): void { localStorage.setItem(key, JSON.stringify(value)) }
const uid = () => crypto.randomUUID()
const tick = () => new Promise<void>((r) => setTimeout(r, 0)) // keeps the API genuinely async-shaped

// ===================== AUTH (cosmetic — demo only) =====================
export async function signUp(input: { email: string; password: string; fullName: string; role: Role }): Promise<User> {
  await tick()
  const users = read<User[]>(K.users, [])
  if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) throw new Error('An account with that email already exists.')
  const user: User = { id: uid(), ...input }
  write(K.users, [...users, user])
  write(K.session, user.id)
  return user
}
export async function signIn(email: string, password: string): Promise<User> {
  await tick()
  const user = read<User[]>(K.users, []).find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  if (!user) throw new Error('Invalid email or password.')
  write(K.session, user.id)
  return user
}
export async function signOut(): Promise<void> { await tick(); localStorage.removeItem(K.session) }
export async function getCurrentUser(): Promise<User | null> {
  await tick()
  const id = read<string | null>(K.session, null)
  return id ? read<User[]>(K.users, []).find((u) => u.id === id) ?? null : null
}

// ===================== TUTORS =====================
export async function getTutors(filters?: { subject?: string; city?: string; mode?: Mode; maxPrice?: number; minRating?: number; verifiedOnly?: boolean }): Promise<Tutor[]> {
  await tick()
  let list = read<Tutor[]>(K.tutors, [])
  if (filters) {
    const { subject, city, mode, maxPrice, minRating, verifiedOnly } = filters
    list = list.filter((t) =>
      (!subject || t.subjects.some((s) => s.toLowerCase().includes(subject.toLowerCase()))) &&
      (!city || t.city.toLowerCase().includes(city.toLowerCase())) &&
      (!mode || t.mode === mode || t.mode === 'both') &&
      (maxPrice == null || t.hourlyPriceEur <= maxPrice) &&
      (minRating == null || t.rating >= minRating) &&
      (!verifiedOnly || t.verified)
    )
  }
  return list
}
export async function getTutor(id: string): Promise<Tutor | null> { await tick(); return read<Tutor[]>(K.tutors, []).find((t) => t.id === id) ?? null }
export async function upsertTutor(tutor: Tutor): Promise<Tutor> {
  await tick()
  const list = read<Tutor[]>(K.tutors, [])
  const i = list.findIndex((t) => t.id === tutor.id)
  if (i >= 0) list[i] = tutor; else list.push(tutor)
  write(K.tutors, list)
  return tutor
}

// ===================== REVIEWS =====================
export async function getReviews(tutorId: string): Promise<Review[]> { await tick(); return read<Review[]>(K.reviews, []).filter((r) => r.tutorId === tutorId) }
export async function addReview(input: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  await tick()
  const review: Review = { id: uid(), createdAt: new Date().toISOString(), ...input }
  write(K.reviews, [...read<Review[]>(K.reviews, []), review])
  return review
}

// ===================== FAVOURITES =====================
export async function getFavourites(parentId: string): Promise<Tutor[]> {
  await tick()
  const favIds = read<Favourite[]>(K.favourites, []).filter((f) => f.parentId === parentId).map((f) => f.tutorId)
  return read<Tutor[]>(K.tutors, []).filter((t) => favIds.includes(t.id))
}
export async function isFavourite(parentId: string, tutorId: string): Promise<boolean> {
  await tick()
  return read<Favourite[]>(K.favourites, []).some((f) => f.parentId === parentId && f.tutorId === tutorId)
}
export async function toggleFavourite(parentId: string, tutorId: string): Promise<boolean> {
  await tick()
  const favs = read<Favourite[]>(K.favourites, [])
  const exists = favs.some((f) => f.parentId === parentId && f.tutorId === tutorId)
  write(K.favourites, exists ? favs.filter((f) => !(f.parentId === parentId && f.tutorId === tutorId)) : [...favs, { parentId, tutorId }])
  return !exists // true if now favourited
}

// ===================== ENQUIRIES =====================
export async function sendEnquiry(input: Omit<Enquiry, 'id' | 'status' | 'createdAt'>): Promise<Enquiry> {
  await tick()
  const enquiry: Enquiry = { id: uid(), status: 'new', createdAt: new Date().toISOString(), ...input }
  write(K.enquiries, [...read<Enquiry[]>(K.enquiries, []), enquiry])
  return enquiry
}
export async function getEnquiriesForParent(parentId: string): Promise<Enquiry[]> { await tick(); return read<Enquiry[]>(K.enquiries, []).filter((e) => e.parentId === parentId) }
export async function getEnquiriesForTutor(tutorId: string): Promise<Enquiry[]> { await tick(); return read<Enquiry[]>(K.enquiries, []).filter((e) => e.tutorId === tutorId) }

// ===================== SEED (runs once on first load) =====================
export async function seedIfEmpty(): Promise<void> {
  if (read<Tutor[]>(K.tutors, []).length > 0) return
  const demoUsers: User[] = [
    { id: 'demo-parent', email: 'parent@demo.cy', password: 'demo1234', fullName: 'Elena Georgiou', role: 'parent' },
    { id: 'demo-tutor',  email: 'tutor@demo.cy',  password: 'demo1234', fullName: 'Maria Andreou',   role: 'tutor' },
  ]
  const tutors: Tutor[] = [
    { id: 'demo-tutor', fullName: 'Maria Andreou', headline: 'Maths Tutor — Nicosia', city: 'Nicosia', mode: 'both', hourlyPriceEur: 25, bio: 'Patient maths tutor focused on building confidence for Gymnasium and Lyceum students.', experienceYears: 5, qualifications: 'BSc Mathematics, University of Cyprus', languages: ['Greek', 'English'], ageGroups: ['Primary', 'Gymnasium', 'Lyceum'], subjects: ['Maths'], availability: 'Weekday evenings, Saturday mornings', photoUrl: '', verified: true, rating: 4.8 },
    { id: 't2', fullName: 'Andreas Christou', headline: 'IGCSE & A-Level Physics — Limassol', city: 'Limassol', mode: 'in_person', hourlyPriceEur: 35, bio: 'Physics specialist preparing students for IGCSE and A-Level exams.', experienceYears: 8, qualifications: 'MSc Physics', languages: ['Greek', 'English'], ageGroups: ['Lyceum', 'University'], subjects: ['Physics', 'Maths'], availability: 'Afternoons', photoUrl: '', verified: true, rating: 4.9 },
    { id: 't3', fullName: 'Sophia Pavlou', headline: 'English & IELTS — Online', city: 'Larnaca', mode: 'online', hourlyPriceEur: 28, bio: 'Native-level English tutor for IGCSE, IELTS and conversation.', experienceYears: 6, qualifications: 'CELTA, BA English Literature', languages: ['Greek', 'English'], ageGroups: ['Gymnasium', 'Lyceum', 'University'], subjects: ['English', 'IELTS'], availability: 'Flexible (online)', photoUrl: '', verified: false, rating: 4.7 },
    { id: 't4', fullName: 'Nikolas Ioannou', headline: 'Primary School Support — Paphos', city: 'Paphos', mode: 'both', hourlyPriceEur: 20, bio: 'Friendly all-rounder for primary school homework and exam basics.', experienceYears: 3, qualifications: 'BEd Primary Education', languages: ['Greek', 'English'], ageGroups: ['Primary'], subjects: ['Maths', 'Greek', 'English'], availability: 'Weekday afternoons', photoUrl: '', verified: true, rating: 4.6 },
    { id: 't5', fullName: 'Christina Loizou', headline: 'Chemistry & Biology — Nicosia', city: 'Nicosia', mode: 'in_person', hourlyPriceEur: 30, bio: 'Pancyprian exam preparation in Chemistry and Biology.', experienceYears: 7, qualifications: 'BSc Chemistry', languages: ['Greek'], ageGroups: ['Lyceum'], subjects: ['Chemistry', 'Biology'], availability: 'Evenings', photoUrl: '', verified: true, rating: 4.85 },
    { id: 't6', fullName: 'Marios Demetriou', headline: 'Greek Language & Lyceum — Limassol', city: 'Limassol', mode: 'both', hourlyPriceEur: 22, bio: 'Modern Greek language and literature support for all levels.', experienceYears: 4, qualifications: 'BA Greek Philology', languages: ['Greek', 'English'], ageGroups: ['Gymnasium', 'Lyceum'], subjects: ['Greek'], availability: 'Mornings and weekends', photoUrl: '', verified: false, rating: 4.5 },
  ]
  write(K.users, demoUsers)
  write(K.tutors, tutors)
}
