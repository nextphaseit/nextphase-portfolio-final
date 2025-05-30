"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { microsoftOAuth } from "@/lib/microsoft-oauth"
import { PKCEHelper } from "@/lib/pkce"

interface User {
  id: string
  name: string
  email: string
  picture?: string
  given_name?: string
  role: "admin" | "staff"
  department?: string
  authMethod: "microsoft" | "local"
  accessToken?: string
  refreshToken?: string
  tokenExpiry?: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithMicrosoft: () => Promise<boolean>
  logout: () => void
  refreshSession: () => Promise<boolean>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Local fallback users for development/testing
const LOCAL_USERS = [
  {
    id: "local-admin",
    name: "Adrian Knight",
    email: "adrian.knight@nextphaseit.org",
    given_name: "Adrian",
    role: "admin" as const,
    department: "IT Operations",
    picture: "/placeholder.svg?height=40&width=40&text=AK",
    authMethod: "local" as const,
  },
  {
    id: "local-staff",
    name: "Demo Staff",
    email: "staff@nextphaseit.org",
    given_name: "Demo",
    role: "staff" as const,
    department: "Technical Support",
    picture: "/placeholder.svg?height=40&width=40&text=DS",
    authMethod: "local" as const,
  },
]

export function CustomAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      // Check for existing session
      const savedUser = localStorage.getItem("nextphase_user_session")
      if (savedUser) {
        const userData = JSON.parse(savedUser)

        // If it's a Microsoft auth user, validate the token
        if (userData.authMethod === "microsoft" && userData.accessToken) {
          const isValid = await validateMicrosoftSession(userData)
          if (isValid) {
            setUser(userData)
          } else {
            // Try to refresh the token
            const refreshed = await refreshMicrosoftSession(userData)
            if (refreshed) {
              setUser(refreshed)
            } else {
              localStorage.removeItem("nextphase_user_session")
            }
          }
        } else {
          // Local auth user
          setUser(userData)
        }
      }

      // Check for OAuth callback
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get("code")
      const state = urlParams.get("state")
      const error = urlParams.get("error")

      if (error) {
        setError(`Authentication failed: ${error}`)
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
      } else if (code) {
        await handleOAuthCallback(code, state)
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
      setError("Failed to initialize authentication")
    } finally {
      setIsLoading(false)
    }
  }

  const validateMicrosoftSession = async (userData: User): Promise<boolean> => {
    if (!userData.accessToken || !userData.tokenExpiry) return false

    // Check if token is expired (with 5 minute buffer)
    const now = Date.now()
    const expiry = userData.tokenExpiry - 5 * 60 * 1000

    if (now >= expiry) {
      return false
    }

    try {
      // Validate token by making a test API call
      await microsoftOAuth.getUserProfile(userData.accessToken)
      return true
    } catch (error) {
      return false
    }
  }

  const refreshMicrosoftSession = async (userData: User): Promise<User | null> => {
    if (!userData.refreshToken) return null

    try {
      const tokens = await microsoftOAuth.refreshAccessToken(userData.refreshToken)
      const updatedUser = {
        ...userData,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || userData.refreshToken,
        tokenExpiry: Date.now() + tokens.expires_in * 1000,
      }

      localStorage.setItem("nextphase_user_session", JSON.stringify(updatedUser))
      return updatedUser
    } catch (error) {
      console.error("Token refresh failed:", error)
      return null
    }
  }

  const handleOAuthCallback = async (code: string, state: string | null) => {
    try {
      setIsLoading(true)

      // Get stored PKCE data
      const { codeVerifier } = PKCEHelper.retrievePKCEData()

      // Exchange code for tokens
      const tokens = await microsoftOAuth.exchangeCodeForTokens(code, codeVerifier || undefined)

      // Get user profile
      const profile = await microsoftOAuth.validateAndGetUser(tokens.access_token)

      // Check if user is from authorized domain
      if (!microsoftOAuth.isAuthorizedDomain(profile.mail || profile.userPrincipalName)) {
        setError("Access denied. Your organization is not authorized to use this portal.")
        return
      }

      // Create user object
      const userData: User = {
        id: `microsoft-${profile.id}`,
        name: profile.displayName || profile.givenName || "User",
        email: profile.mail || profile.userPrincipalName,
        given_name: profile.givenName,
        role: microsoftOAuth.getUserRole(profile.mail || profile.userPrincipalName),
        department: profile.department || "NextPhase IT",
        picture:
          profile.photo || `/placeholder.svg?height=40&width=40&text=${(profile.givenName?.[0] || "U").toUpperCase()}`,
        authMethod: "microsoft",
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiry: Date.now() + tokens.expires_in * 1000,
      }

      setUser(userData)
      localStorage.setItem("nextphase_user_session", JSON.stringify(userData))

      // Clear PKCE data
      PKCEHelper.clearPKCEData()

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } catch (error) {
      console.error("OAuth callback error:", error)
      setError("Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check local users for development/fallback
      const localUser = LOCAL_USERS.find((u) => u.email === email)

      if (localUser) {
        // Simple password check for demo
        const validPasswords = {
          "adrian.knight@nextphaseit.org": "admin123",
          "staff@nextphaseit.org": "staff123",
        }

        if (validPasswords[email as keyof typeof validPasswords] === password) {
          setUser(localUser)
          localStorage.setItem("nextphase_user_session", JSON.stringify(localUser))
          setIsLoading(false)
          return { success: true }
        }
      }

      setIsLoading(false)
      return { success: false, error: "Invalid credentials" }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Authentication failed" }
    }
  }

  const loginWithMicrosoft = async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      setError(null)

      // Generate PKCE auth URL
      const state = Math.random().toString(36).substring(7)
      const { url, codeVerifier } = await microsoftOAuth.generatePKCEAuthUrl(state)

      // Store PKCE data
      PKCEHelper.storePKCEData(codeVerifier, state)

      // Redirect to Microsoft OAuth
      window.location.href = url
      return true
    } catch (error) {
      console.error("Microsoft OAuth error:", error)
      setError("Failed to initiate Microsoft authentication")
      setIsLoading(false)
      return false
    }
  }

  const refreshSession = async (): Promise<boolean> => {
    if (!user || user.authMethod !== "microsoft") return false

    const refreshed = await refreshMicrosoftSession(user)
    if (refreshed) {
      setUser(refreshed)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setError(null)
    localStorage.removeItem("nextphase_user_session")
    PKCEHelper.clearPKCEData()

    // Clear any temporary cookies
    if (typeof window !== "undefined") {
      document.cookie = "nextphase_temp_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        loginWithMicrosoft,
        logout,
        refreshSession,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useCustomAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useCustomAuth must be used within a CustomAuthProvider")
  }
  return context
}

// Higher-order component for protected routes
export function withCustomAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { isAuthenticated, isLoading } = useCustomAuth()

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
      window.location.href = "/auth/login"
      return null
    }

    return <Component {...props} />
  }
}
