"use client"

import { useCustomAuth } from "@/providers/custom-auth-provider"
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings } from "lucide-react"
import Link from "next/link"

export default function AuthStatus() {
  const { user, isLoading, logout } = useCustomAuth()

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
        <div className="h-4 w-20 animate-pulse rounded bg-muted"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/auth/login">
          <Button variant="outline" size="sm" className="text-primary hover:text-primary-hover">
            Sign In
          </Button>
        </Link>
        <Link href="/portal/client-login">
          <Button size="sm" className="bg-primary hover:bg-primary-hover text-surface">
            Client Portal
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-surface">
          <User className="h-4 w-4" />
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-primary">{user.name}</p>
          <p className="text-xs text-muted">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <Link href="/portal">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:ml-2 sm:inline">Portal</span>
          </Button>
        </Link>

        <Button variant="ghost" size="sm" onClick={logout} className="text-primary hover:text-primary-hover">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:ml-2 sm:inline">Sign Out</span>
        </Button>
      </div>
    </div>
  )
}
