"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { PKCEHelper } from "@/lib/pkce"
import { getTenantByEmail, getTenantConfig, isAdmin, type TenantConfig } from "@/lib/tenant-config"

interface User {
  id: string
  name: string
  email: string
  picture?: string
  given_name?: string
  role: "admin" | "user"
  department?: string
  authMethod: "azure" | "local"
  tenant: TenantConfig
  isGlobalAdmin: boolean
  loginHistory?: LoginHistoryEntry[]
  preferences?: UserPreferences
  securitySettings?: SecuritySettings
}

interface LoginHistoryEntry {
  id: string
  timestamp: string
  device: string
  location: string
  ipAddress: string
  success: boolean
  userAgent: string
}

interface UserPreferences {
  theme: "light" | "dark" | "auto"
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  defaultTicketView: "all" | "open" | "assigned"
  language: string
  timezone: string
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  passwordLastChanged?: string
  trustedDevices: string[]
  sessionTimeout: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithMicrosoft: () => Promise<boolean>
  logout: () => void
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  updatePreferences: (preferences: UserPreferences) => Promise<boolean>
  updateSecuritySettings: (settings: SecuritySettings) => Promise<boolean>
  switchTenant: (tenantId: string) => Promise<boolean>
  isAuthenticated: boolean
  isAdmin: boolean
  isGlobalAdmin: boolean
  currentTenant: TenantConfig | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function MultiTenantAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("nextphase_user_session")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        // Validate session and tenant access
        if (validateUserSession(userData)) {
          setUser(userData)
        } else {
          localStorage.removeItem("nextphase_user_session")
        }
      } catch (error) {
        localStorage.removeItem("nextphase_user_session")
      }
    }
    setIsLoading(false)
  }, [])

  const validateUserSession = (userData: User): boolean => {
    // Check if tenant still exists and user has access
    const tenant = getTenantConfig(userData.tenant.domain)
    if (!tenant) return false

    // Update tenant config in case it changed
    userData.tenant = tenant
    return true
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      // Get tenant configuration
      const tenant = getTenantByEmail(email)
      if (!tenant) {
        setIsLoading(false)
        return { success: false, error: "Organization not found. Please contact your administrator." }
      }

      // Simulate API call for authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept specific credentials
      const validCredentials = [
        { email: "adrian.knight@nextphaseit.org", password: "admin123" },
        { email: "user@nextphaseit.org", password: "user123" },
        { email: "admin@example.com", password: "admin123" },
        { email: "user@example.com", password: "user123" },
      ]

      const isValid = validCredentials.some((cred) => cred.email === email && cred.password === password)

      if (!isValid) {
        setIsLoading(false)
        return { success: false, error: "Invalid credentials" }
      }

      // Create user object
      const userData: User = {
        id: `user-${email.split("@")[0]}`,
        name: email
          .split("@")[0]
          .replace(".", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        email: email,
        given_name: email.split("@")[0].split(".")[0],
        role: isAdmin(email, tenant) ? "admin" : "user",
        department: "IT Department",
        authMethod: "local",
        tenant: tenant,
        isGlobalAdmin: isAdmin(email, tenant) && tenant.features.adminOverride,
        picture: `/placeholder.svg?height=40&width=40&text=${email.charAt(0).toUpperCase()}`,
        loginHistory: generateMockLoginHistory(),
        preferences: {
          theme: "dark",
          notifications: { email: true, sms: false, push: true },
          defaultTicketView: "all",
          language: "en-US",
          timezone: "America/New_York",
        },
        securitySettings: {
          twoFactorEnabled: false,
          passwordLastChanged: "2024-01-15",
          trustedDevices: [],
          sessionTimeout: tenant.settings.sessionTimeout,
        },
      }

      setUser(userData)
      localStorage.setItem("nextphase_user_session", JSON.stringify(userData))
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Authentication failed. Please try again." }
    }
  }

  const loginWithMicrosoft = async (): Promise<boolean> => {
    setIsLoading(true)

    try {
      const clientId = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID
      if (!clientId) {
        console.error("Microsoft Client ID not configured")
        setIsLoading(false)
        return false
      }

      // Generate PKCE parameters
      const codeVerifier = PKCEHelper.generateCodeVerifier()
      const codeChallenge = await PKCEHelper.generateCodeChallenge(codeVerifier)
      const state = Math.random().toString(36).substring(7)

      // Store PKCE data
      PKCEHelper.storePKCEData(codeVerifier, state)

      const currentOrigin = window.location.origin
      let normalizedOrigin = currentOrigin
      if (currentOrigin.includes("nextphaseit.org")) {
        normalizedOrigin = "https://www.nextphaseit.org"
      }

      // Build OAuth URL with multi-tenant support
      const authUrl = new URL("https://login.microsoftonline.com/common/oauth2/v2.0/authorize")
      authUrl.searchParams.set("client_id", clientId)
      authUrl.searchParams.set("response_type", "code")
      authUrl.searchParams.set("redirect_uri", `${normalizedOrigin}/api/auth/microsoft/callback`)
      authUrl.searchParams.set("scope", "openid profile email User.Read")
      authUrl.searchParams.set("response_mode", "query")
      authUrl.searchParams.set("state", state)
      authUrl.searchParams.set("code_challenge", codeChallenge)
      authUrl.searchParams.set("code_challenge_method", "S256")
      authUrl.searchParams.set("prompt", "select_account")

      window.location.href = authUrl.toString()
      return true
    } catch (error) {
      console.error("Microsoft OAuth error:", error)
      setIsLoading(false)
      return false
    }
  }

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    const tenant = getTenantByEmail(email)
    if (!tenant) {
      return { success: false, message: "Organization not found" }
    }

    if (!tenant.features.passwordReset) {
      return {
        success: false,
        message: "Password reset is managed by your organization's Microsoft 365 administrator",
      }
    }

    // Simulate password reset email
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: `Password reset instructions have been sent to ${email}`,
    }
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("nextphase_user_session", JSON.stringify(updatedUser))
      return true
    } catch (error) {
      return false
    }
  }

  const updatePreferences = async (preferences: UserPreferences): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = { ...user, preferences }
      setUser(updatedUser)
      localStorage.setItem("nextphase_user_session", JSON.stringify(updatedUser))
      return true
    } catch (error) {
      return false
    }
  }

  const updateSecuritySettings = async (settings: SecuritySettings): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = { ...user, securitySettings: settings }
      setUser(updatedUser)
      localStorage.setItem("nextphase_user_session", JSON.stringify(updatedUser))
      return true
    } catch (error) {
      return false
    }
  }

  const switchTenant = async (tenantId: string): Promise<boolean> => {
    if (!user || !user.isGlobalAdmin) return false

    const targetTenant = Object.values(getTenantConfig).find((t) => t?.id === tenantId)
    if (!targetTenant) return false

    const updatedUser = { ...user, tenant: targetTenant }
    setUser(updatedUser)
    localStorage.setItem("nextphase_user_session", JSON.stringify(updatedUser))
    return true
  }

  const logout = () => {
    setUser(null)
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
        login,
        loginWithMicrosoft,
        logout,
        resetPassword,
        updateProfile,
        updatePreferences,
        updateSecuritySettings,
        switchTenant,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isGlobalAdmin: user?.isGlobalAdmin || false,
        currentTenant: user?.tenant || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useMultiTenantAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useMultiTenantAuth must be used within a MultiTenantAuthProvider")
  }
  return context
}

// Helper function to generate mock login history
function generateMockLoginHistory(): LoginHistoryEntry[] {
  return [
    {
      id: "1",
      timestamp: "2024-01-28 14:30:00",
      device: "Chrome on Windows",
      location: "Clayton, NC",
      ipAddress: "192.168.1.100",
      success: true,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: "2",
      timestamp: "2024-01-27 09:15:00",
      device: "Safari on iPhone",
      location: "Clayton, NC",
      ipAddress: "192.168.1.101",
      success: true,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    },
    {
      id: "3",
      timestamp: "2024-01-26 16:45:00",
      device: "Chrome on Windows",
      location: "Clayton, NC",
      ipAddress: "192.168.1.100",
      success: true,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  ]
}

// Higher-order component for protected routes
export function withMultiTenantAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { isAuthenticated, isLoading } = useMultiTenantAuth()

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
