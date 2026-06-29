import type { ReactNode } from 'react'

// Consistent header + container for the simple content pages.
export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/50 blur-2xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:py-16">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
          {subtitle && <p className="mx-auto mt-3 max-w-2xl text-lg text-ink-soft">{subtitle}</p>}
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12">{children}</div>
    </div>
  )
}
