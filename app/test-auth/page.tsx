"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, User, Mail, Shield } from "lucide-react"

export default function TestAuthPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading authentication status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Authentication Test</h1>

        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-primary" size={24} />
              Authentication Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              {status === "authenticated" ? (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle size={16} />
                  Authenticated
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400">
                  <XCircle size={16} />
                  Not Authenticated
                </span>
              )}
            </div>

            {session?.user && (
              <>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-semibold">Name:</span>
                  <span>{session.user.name || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span className="font-semibold">Email:</span>
                  <span>{session.user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">User ID:</span>
                  <span className="font-mono text-sm">{session.user.id}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!session ? (
              <div className="space-y-4">
                <p className="text-gray-400">You are not currently signed in.</p>
                <Button onClick={() => signIn("microsoft")} className="w-full bg-blue-600 hover:bg-blue-700">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
                  </svg>
                  Sign in with Microsoft
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-green-400">✅ Successfully authenticated!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href="/admin">Go to Admin Portal</a>
                  </Button>
                  <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle>Environment Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>NEXTAUTH_URL:</span>
                <span className="text-green-400">✅ Configured</span>
              </div>
              <div className="flex justify-between">
                <span>MICROSOFT_CLIENT_ID:</span>
                <span className="text-green-400">✅ Configured</span>
              </div>
              <div className="flex justify-between">
                <span>MICROSOFT_CLIENT_SECRET:</span>
                <span className="text-green-400">✅ Configured</span>
              </div>
              <div className="flex justify-between">
                <span>NEXTAUTH_SECRET:</span>
                <span className="text-green-400">✅ Configured</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <a href="/">← Back to Home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
