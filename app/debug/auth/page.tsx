"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import AuthStatus from "@/components/auth-status"
import Link from "next/link"

export default function DebugAuthPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">NextAuth.js Debug Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CardWrapper>
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <AuthStatus />
        </CardWrapper>

        <CardWrapper>
          <h2 className="text-xl font-semibold mb-4">Session Data</h2>
          <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80">
            <pre className="text-xs">{JSON.stringify(session, null, 2)}</pre>
          </div>
        </CardWrapper>

        <CardWrapper>
          <h2 className="text-xl font-semibold mb-4">Authentication Actions</h2>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild variant="destructive" className="w-full">
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          </div>
        </CardWrapper>

        <CardWrapper>
          <h2 className="text-xl font-semibold mb-4">Protected Routes</h2>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/dashboard">Dashboard (Protected)</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin">Admin (Admin Only)</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Home (Public)</Link>
            </Button>
          </div>
        </CardWrapper>
      </div>
    </div>
  )
}
