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
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle && <p className="mx-auto mt-3 max-w-2xl text-blue-100">{subtitle}</p>}
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12">{children}</div>
    </div>
  )
}
