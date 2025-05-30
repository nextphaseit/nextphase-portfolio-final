"use client"

import { useSession } from "next-auth/react"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Button } from "@/components/ui/button"
import { RefreshCw, User, Key, Globe } from "lucide-react"

export default function AuthDebugPage() {
  const { data: session, status, update } = useSession()

  const envVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "Not set",
    NODE_ENV: process.env.NODE_ENV || "Not set",
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Authentication Debug</h1>
          <p className="text-gray-400">Debug information for authentication issues</p>
        </div>

        {/* Session Status */}
        <CardWrapper>
          <div className="flex items-center gap-3 mb-4">
            <User className="text-primary" size={24} />
            <h2 className="text-xl font-semibold">Session Status</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-medium ${
                  status === "authenticated"
                    ? "text-green-400"
                    : status === "loading"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {status}
              </span>
            </div>
            {session?.user && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-400">User:</span>
                  <span>{session.user.name || "No name"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span>{session.user.email || "No email"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Role:</span>
                  <span>{(session.user as any).role || "No role"}</span>
                </div>
              </>
            )}
          </div>
        </CardWrapper>

        {/* Environment Variables */}
        <CardWrapper>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-primary" size={24} />
            <h2 className="text-xl font-semibold">Environment</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-400">{key}:</span>
                <span className="font-mono text-sm">{value}</span>
              </div>
            ))}
          </div>
        </CardWrapper>

        {/* Session Data */}
        {session && (
          <CardWrapper>
            <div className="flex items-center gap-3 mb-4">
              <Key className="text-primary" size={24} />
              <h2 className="text-xl font-semibold">Session Data</h2>
            </div>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm">{JSON.stringify(session, null, 2)}</pre>
          </CardWrapper>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => update()} variant="outline">
            <RefreshCw size={16} className="mr-2" />
            Refresh Session
          </Button>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      </div>
    </div>
  )
}
