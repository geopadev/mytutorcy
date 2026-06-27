import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import * as db from '../lib/db'
import type { Role, User } from '../lib/db'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<User>
  signUp: (input: { email: string; password: string; fullName: string; role: Role }) => Promise<User>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.getCurrentUser().then((u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const signIn = async (email: string, password: string) => {
    const u = await db.signIn(email, password)
    setUser(u)
    return u
  }

  const signUp = async (input: { email: string; password: string; fullName: string; role: Role }) => {
    const u = await db.signUp(input)
    setUser(u)
    return u
  }

  const signOut = async () => {
    await db.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
