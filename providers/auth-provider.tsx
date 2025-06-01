"use client"

import type React from "react"

import { SessionProvider, useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { type ReactNode, createContext, useContext } from "react"

// Create a context for additional auth functionality
const AuthContext = createContext<{
  isAdmin: boolean
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => Promise<void>
}>({
  isAdmin: false,
  isAuthenticated: false,
  isLoading: true,
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"
  const isAdmin = session?.user?.role === "admin"

  const logout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return <AuthContext.Provider value={{ isAdmin, isAuthenticated, isLoading, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Higher-order component for protected client components
export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const { isAuthenticated, isLoading } = useAuth()
    const { data: session } = useSession()
    const router = useRouter()

    if (isLoading) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      )
    }

    if (!isAuthenticated) {
      router.push("/auth/signin")
      return null
    }

    return <Component {...props} />
  }
}

// Higher-order component for admin-only client components
export function withAdminAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AdminProtectedComponent(props: T) {
    const { isAuthenticated, isAdmin, isLoading } = useAuth()
    const router = useRouter()

    if (isLoading) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      )
    }

    if (!isAuthenticated) {
      router.push("/auth/signin")
      return null
    }

    if (!isAdmin) {
      router.push("/auth/error?error=AccessDenied")
      return null
    }

    return <Component {...props} />
  }
}

// Root SessionProvider wrapper
export function NextAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  )
}
