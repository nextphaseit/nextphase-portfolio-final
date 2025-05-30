"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import Image from "next/image"
import { AlertCircle } from "lucide-react"

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const error = searchParams.get("error")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(
    error === "CredentialsSignin" ? "Invalid email or password" : error || null,
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (result?.error) {
        setErrorMessage("Invalid email or password")
        setIsLoading(false)
        return
      }

      if (result?.url) {
        router.push(result.url)
        return
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred")
    }

    setIsLoading(false)
  }

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true)
    await signIn("azure-ad", { callbackUrl })
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/images/nextphase-logo.png" alt="NextPhase IT" width={200} height={80} className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Sign In</h1>
          <p className="text-gray-400">Access the NextPhase IT Portal</p>
        </div>

        <CardWrapper>
          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 flex items-center gap-3">
              <AlertCircle className="text-red-400" size={20} />
              <p className="text-red-400 text-sm">{errorMessage}</p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={handleMicrosoftSignIn}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
              </svg>
              Sign in with Microsoft
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-gray-400">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="your.email@nextphaseit.org"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              For demo: <span className="text-primary">adrian.knight@nextphaseit.org</span> /{" "}
              <span className="text-primary">admin123</span>
            </p>
          </div>
        </CardWrapper>
      </div>
    </div>
  )
}
