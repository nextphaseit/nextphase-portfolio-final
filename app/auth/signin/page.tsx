"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin"
  const error = searchParams.get("error")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(error)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setErrorMessage("Invalid email or password")
        setIsLoading(false)
        return
      }

      router.push(callbackUrl)
    } catch (error) {
      setErrorMessage("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  const handleMicrosoftSignIn = () => {
    setIsLoading(true)
    signIn("azure-ad", { callbackUrl })
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <CardWrapper>
          <div className="text-center mb-6">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT"
              width={200}
              height={60}
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-1">Sign in to access the admin dashboard</p>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@nextphaseit.org"
                required
                className="bg-gray-900 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-gray-900 border-gray-700"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleMicrosoftSignIn}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"
                />
              </svg>
            )}
            Microsoft 365
          </Button>

          <p className="text-center text-xs text-gray-500 mt-6">
            For NextPhase IT staff only. Unauthorized access is prohibited.
          </p>
        </CardWrapper>
      </div>
    </div>
  )
}
