"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  picture?: string
  given_name?: string
  role: "admin" | "staff"
  department?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Authorized NextPhase IT staff members
const AUTHORIZED_USERS = [
  {
    id: "admin-adrian",
    name: "Adrian Knight",
    email: "adrian.knight@nextphaseit.org",
    given_name: "Adrian",
    role: "admin" as const,
    department: "IT Operations",
    picture: "/placeholder.svg?height=40&width=40&text=AK",
  },
  {
    id: "staff-demo",
    name: "Demo Staff",
    email: "staff@nextphaseit.org",
    given_name: "Demo",
    role: "staff" as const,
    department: "Technical Support",
    picture: "/placeholder.svg?height=40&width=40&text=DS",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("nextphase_admin_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      // Verify user is still authorized
      const authorizedUser = AUTHORIZED_USERS.find((u) => u.email === userData.email)
      if (authorizedUser) {
        setUser(userData)
      } else {
        localStorage.removeItem("nextphase_admin_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user is authorized NextPhase IT staff
    const authorizedUser = AUTHORIZED_USERS.find((u) => u.email === email)

    if (
      authorizedUser &&
      ((email === "adrian.knight@nextphaseit.org" && password === "admin123") ||
        (email === "staff@nextphaseit.org" && password === "staff123"))
    ) {
      setUser(authorizedUser)
      localStorage.setItem("nextphase_admin_user", JSON.stringify(authorizedUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nextphase_admin_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Higher-order component for protected routes
export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { isAuthenticated, isLoading } = useAuth()

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
      window.location.href = "/login"
      return null
    }

    return <Component {...props} />
  }
}

// Higher-order component for admin-only routes
export function withAdminAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AdminAuthenticatedComponent(props: T) {
    const { isAuthenticated, isAdmin, isLoading } = useAuth()

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
      window.location.href = "/login"
      return null
    }

    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-red-500 mb-4">Access Denied</div>
            <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
            <button onClick={() => (window.location.href = "/dashboard")} className="text-primary hover:underline">
              Return to Dashboard
            </button>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}
