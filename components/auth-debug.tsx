"use client"

import { useSession } from "next-auth/react"

export function AuthDebug() {
  const { data: session, status } = useSession()

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm">
      <div className="font-bold mb-2">Auth Debug</div>
      <div>Status: {status}</div>
      {session && (
        <div>
          <div>Email: {session.user?.email}</div>
          <div>Name: {session.user?.name}</div>
        </div>
      )}
      {status === "loading" && <div>Loading session...</div>}
      {status === "unauthenticated" && <div>Not authenticated</div>}
    </div>
  )
}
