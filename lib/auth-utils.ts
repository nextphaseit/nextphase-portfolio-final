"use client"

import type React from "react"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Authorized NextPhase IT staff email domains and specific users
const AUTHORIZED_DOMAINS = ["nextphaseit.org"]
const AUTHORIZED_USERS = [
  "adrian.knight@nextphaseit.org",
  "staff@nextphaseit.org",
  // Add more authorized staff emails here
]

const ADMIN_USERS = ["adrian.knight@nextphaseit.org"]

export function useAuthCheck() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  const isAuthorized =
    user?.email &&
    (AUTHORIZED_USERS.includes(user.email) || AUTHORIZED_DOMAINS.some((domain) => user.email?.endsWith(`@${domain}`)))

  const isAdmin = user?.email && ADMIN_USERS.includes(user.email)

  return {
    user,
    error,
    isLoading,
    isAuthenticated: !!user,
    isAuthorized,
    isAdmin,
  }
}

// Higher-order component for protected routes
export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { isAuthenticated, isAuthorized, isLoading } = useAuthCheck()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/api/auth/login")
      } else if (!isLoading && isAuthenticated && !isAuthorized) {
        router.push("/unauthorized")
      }
    }, [isAuthenticated, isAuthorized, isLoading, router])

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

    if (!isAuthenticated || !isAuthorized) {
      return null
    }

    return <Component {...props} />
  }
}

// Higher-order component for admin-only routes
export function withAdminAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AdminAuthenticatedComponent(props: T) {
    const { isAuthenticated, isAuthorized, isAdmin, isLoading } = useAuthCheck()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/api/auth/login")
      } else if (!isLoading && isAuthenticated && !isAuthorized) {
        router.push("/unauthorized")
      } else if (!isLoading && isAuthenticated && isAuthorized && !isAdmin) {
        router.push("/dashboard")
      }
    }, [isAuthenticated, isAuthorized, isAdmin, isLoading, router])

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

    if (!isAuthenticated || !isAuthorized || !isAdmin) {
      return null
    }

    return <Component {...props} />
  }
}
