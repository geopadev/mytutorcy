// Tutor avatar: shows the photo if present, otherwise coloured initials.
const COLORS = [
  'bg-blue-100 text-blue-800',
  'bg-cyan-100 text-cyan-800',
  'bg-amber-100 text-amber-800',
  'bg-teal-100 text-teal-800',
  'bg-indigo-100 text-indigo-800',
]

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export default function Avatar({
  name,
  photoUrl,
  size = 'md',
}: {
  name: string
  photoUrl?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const dims =
    size === 'lg' ? 'h-24 w-24 text-2xl' : size === 'sm' ? 'h-10 w-10 text-sm' : 'h-14 w-14 text-lg'
  const color = COLORS[name.length % COLORS.length]

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className={`${dims} shrink-0 rounded-full object-cover`}
      />
    )
  }

  return (
    <div
      className={`${dims} ${color} grid shrink-0 place-items-center rounded-full font-semibold`}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
