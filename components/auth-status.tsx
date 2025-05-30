"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="text-sm text-gray-500">Loading authentication status...</div>
  }

  if (status === "unauthenticated") {
    return <div className="text-sm text-red-400">Not authenticated</div>
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Authenticated</h3>
        <Button size="sm" variant="outline" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
      <div className="text-sm space-y-2">
        <div>
          <span className="text-gray-400">Name:</span> {session?.user?.name}
        </div>
        <div>
          <span className="text-gray-400">Email:</span> {session?.user?.email}
        </div>
        <div>
          <span className="text-gray-400">Role:</span>{" "}
          <span className={session?.user?.role === "admin" ? "text-red-400" : "text-green-400"}>
            {session?.user?.role}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Auth Method:</span> {session?.user?.authMethod}
        </div>
      </div>
    </div>
  )
}
