"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { PKCEHelper } from "@/lib/pkce"
import { canAccessAdminPortal, hasPermission, type AdminUser } from "@/lib/admin-auth"

interface AdminAuthContextType {
  adminUser: AdminUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isAuthorized: boolean
  loginWithMicrosoft: () => Promise<boolean>
  logout: () => void
  hasPermission: (resource: string, action: string) => boolean
  error: string | null
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing admin session
    const savedAdminUser = localStorage.getItem("nextphase_admin_session")
    if (savedAdminUser) {
      try {
        const userData = JSON.parse(savedAdminUser)
        // Validate admin session
        if (validateAdminSession(userData)) {
          setAdminUser(userData)
        } else {
          localStorage.removeItem("nextphase_admin_session")
        }
      } catch (error) {
        localStorage.removeItem("nextphase_admin_session")
      }
    }
    setIsLoading(false)
  }, [])

  const validateAdminSession = (userData: AdminUser): boolean => {
    // Check if user is still authorized for admin access
    return canAccessAdminPortal(userData.email) && userData.isActive
  }

  const loginWithMicrosoft = async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const clientId = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID
      if (!clientId) {
        setError("Microsoft Client ID not configured")
        setIsLoading(false)
        return false
      }

      // Generate PKCE parameters
      const codeVerifier = PKCEHelper.generateCodeVerifier()
      const codeChallenge = await PKCEHelper.generateCodeChallenge(codeVerifier)
      const state = Math.random().toString(36).substring(7)

      // Store PKCE data with admin flag
      PKCEHelper.storePKCEData(codeVerifier, state)
      localStorage.setItem("admin_login_attempt", "true")

      const currentOrigin = window.location.origin
      let normalizedOrigin = currentOrigin
      if (currentOrigin.includes("nextphaseit.org")) {
        normalizedOrigin = "https://admin.nextphaseit.org"
      }

      // Build OAuth URL with tenant restriction
      const authUrl = new URL("https://login.microsoftonline.com/common/oauth2/v2.0/authorize")
      authUrl.searchParams.set("client_id", clientId)
      authUrl.searchParams.set("response_type", "code")
      authUrl.searchParams.set("redirect_uri", `${normalizedOrigin}/api/auth/microsoft/admin-callback`)
      authUrl.searchParams.set("scope", "openid profile email User.Read")
      authUrl.searchParams.set("response_mode", "query")
      authUrl.searchParams.set("state", state)
      authUrl.searchParams.set("code_challenge", codeChallenge)
      authUrl.searchParams.set("code_challenge_method", "S256")
      authUrl.searchParams.set("prompt", "select_account")
      authUrl.searchParams.set("domain_hint", "nextphaseit.org") // Hint for NextPhase IT domain

      window.location.href = authUrl.toString()
      return true
    } catch (error) {
      console.error("Admin Microsoft OAuth error:", error)
      setError("Authentication failed. Please try again.")
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setAdminUser(null)
    setError(null)
    localStorage.removeItem("nextphase_admin_session")
    localStorage.removeItem("admin_login_attempt")
    PKCEHelper.clearPKCEData()

    // Clear any temporary cookies
    if (typeof window !== "undefined") {
      document.cookie = "nextphase_admin_temp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
  }

  const checkPermission = (resource: string, action: string): boolean => {
    if (!adminUser) return false
    return hasPermission(adminUser, resource, action)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isLoading,
        isAuthenticated: !!adminUser,
        isAuthorized: !!adminUser && canAccessAdminPortal(adminUser.email),
        loginWithMicrosoft,
        logout,
        hasPermission: checkPermission,
        error,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}

// Higher-order component for admin-only routes
export function withAdminAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AdminAuthenticatedComponent(props: T) {
    const { isAuthenticated, isAuthorized, isLoading, error } = useAdminAuth()

    if (isLoading) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Verifying admin access...</p>
          </div>
        </div>
      )
    }

    if (!isAuthenticated) {
      window.location.href = "/admin/login"
      return null
    }

    if (!isAuthorized) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-red-400">Access Denied</h3>
            <p className="text-gray-400 mb-6">
              This admin portal is restricted to NextPhase IT personnel only.
              {error && <span className="block mt-2 text-red-400">{error}</span>}
            </p>
            <div className="space-y-3">
              <a
                href="/portal"
                className="block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Go to Service Desk Portal
              </a>
              <a
                href="mailto:support@nextphaseit.org"
                className="block text-gray-400 hover:text-primary transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}
