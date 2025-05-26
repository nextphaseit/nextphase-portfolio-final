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
  authMethod?: "exchange" | "local"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithMicrosoft: () => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Authorized NextPhase IT staff members (fallback for local auth)
const AUTHORIZED_USERS = [
  {
    id: "admin-adrian",
    name: "Adrian Knight",
    email: "adrian.knight@nextphaseit.org",
    given_name: "Adrian",
    role: "admin" as const,
    department: "IT Operations",
    picture: "/placeholder.svg?height=40&width=40&text=AK",
    authMethod: "local" as const,
  },
  {
    id: "staff-demo",
    name: "Demo Staff",
    email: "staff@nextphaseit.org",
    given_name: "Demo",
    role: "staff" as const,
    department: "Technical Support",
    picture: "/placeholder.svg?height=40&width=40&text=DS",
    authMethod: "local" as const,
  },
]

// Microsoft Exchange authorized domains and users
const EXCHANGE_AUTHORIZED_DOMAINS = ["nextphaseit.org"]
const EXCHANGE_ADMIN_EMAILS = ["adrian.knight@nextphaseit.org"]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("nextphase_admin_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        // Verify user is still authorized (for local auth) or valid (for Exchange auth)
        if (userData.authMethod === "exchange" || AUTHORIZED_USERS.find((u) => u.email === userData.email)) {
          setUser(userData)
        } else {
          localStorage.removeItem("nextphase_admin_user")
        }
      } catch (error) {
        localStorage.removeItem("nextphase_admin_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Microsoft Exchange authentication
  const authenticateWithExchange = async (email: string, password: string): Promise<User | null> => {
    try {
      // Check if email is from authorized domain
      const domain = email.split("@")[1]
      if (!EXCHANGE_AUTHORIZED_DOMAINS.includes(domain)) {
        return null
      }

      // Use Microsoft Graph API or Exchange Web Services for authentication
      const response = await fetch("/api/auth/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const userData = await response.json()

        // Determine role based on email
        const role = EXCHANGE_ADMIN_EMAILS.includes(email) ? "admin" : "staff"

        return {
          id: `exchange-${userData.id || email.split("@")[0]}`,
          name: userData.displayName || userData.name || email.split("@")[0],
          email: email,
          given_name: userData.givenName || userData.displayName?.split(" ")[0] || "User",
          role: role,
          department: userData.department || "NextPhase IT",
          picture: userData.photo || "/placeholder.svg?height=40&width=40&text=" + (userData.givenName?.[0] || "U"),
          authMethod: "exchange",
        }
      }
    } catch (error) {
      console.error("Exchange authentication error:", error)
    }
    return null
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // First try Microsoft Exchange authentication
      const exchangeUser = await authenticateWithExchange(email, password)
      if (exchangeUser) {
        setUser(exchangeUser)
        localStorage.setItem("nextphase_admin_user", JSON.stringify(exchangeUser))
        setIsLoading(false)
        return true
      }

      // Fallback to local authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))
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
    } catch (error) {
      console.error("Authentication error:", error)
    }

    setIsLoading(false)
    return false
  }

  // Microsoft OAuth login (alternative method)
  const loginWithMicrosoft = async (): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Redirect to Microsoft OAuth
      const clientId = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID
      const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/microsoft/callback`)
      const scope = encodeURIComponent("openid profile email User.Read")

      const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&response_mode=query`

      window.location.href = authUrl
      return true
    } catch (error) {
      console.error("Microsoft OAuth error:", error)
      setIsLoading(false)
      return false
    }
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
        loginWithMicrosoft,
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

// Safe hook that can be used outside of AuthProvider
export function useAuthSafe() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    return {
      user: null,
      isLoading: false,
      login: async () => false,
      loginWithMicrosoft: async () => false,
      logout: () => {},
      isAuthenticated: false,
      isAdmin: false,
    }
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
