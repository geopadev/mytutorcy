// Shared option lists + the tutor category grid. Display/prototype data only.
import type { Mode } from './db'

export const CITIES = ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta', 'Kyrenia']

export const SUBJECTS = [
  'Maths', 'Physics', 'Chemistry', 'Biology', 'English', 'Greek',
  'IELTS', 'Computer Science', 'History', 'French',
]

export const AGE_GROUPS = ['Primary', 'Gymnasium', 'Lyceum', 'University']

export const LANGUAGES = ['Greek', 'English', 'Russian', 'French']

export const MODES: { value: Mode; label: string }[] = [
  { value: 'online', label: 'Online' },
  { value: 'in_person', label: 'In-person' },
  { value: 'both', label: 'Online & in-person' },
]

export function modeLabel(mode: Mode): string {
  if (mode === 'online') return 'Online'
  if (mode === 'in_person') return 'In-person'
  return 'Online & in-person'
}

// Tutor categories grid (Home). Each deep-links into /find with sensible params.
export const CATEGORIES: { label: string; icon: string; params: Record<string, string> }[] = [
  { label: 'Primary school support', icon: 'Backpack', params: { level: 'Primary' } },
  { label: 'Secondary school support', icon: 'School', params: { level: 'Gymnasium' } },
  { label: 'Lyceum support', icon: 'GraduationCap', params: { level: 'Lyceum' } },
  { label: 'Pancyprian exams', icon: 'Trophy', params: { level: 'Lyceum' } },
  { label: 'IGCSE', icon: 'BookOpenCheck', params: {} },
  { label: 'A-Level', icon: 'Award', params: {} },
  { label: 'Languages', icon: 'Languages', params: { subject: 'English' } },
  { label: 'University support', icon: 'GraduationCap', params: { level: 'University' } },
  { label: 'Music lessons', icon: 'Music', params: {} },
  { label: 'Sports coaching', icon: 'Dumbbell', params: {} },
  { label: 'Special learning support', icon: 'HeartHandshake', params: {} },
  { label: 'Online lessons', icon: 'Globe', params: { mode: 'online' } },
]
