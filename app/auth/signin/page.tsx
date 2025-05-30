"use client"

import { signIn, getProviders } from "next-auth/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Building, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const errorParam = searchParams.get("error")

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders()
        setProviders(res)
      } catch (err) {
        console.error("Failed to fetch providers:", err)
        setError("Failed to load authentication providers")
      }
    }
    fetchProviders()
  }, [])

  const handleSignIn = async (providerId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn(providerId, {
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (err) {
      console.error("Sign in error:", err)
      setError("An unexpected error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <CardWrapper className="w-full max-w-md">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">Sign In</h1>
            <p className="text-gray-400">Access your NextPhase IT portal</p>
          </div>

          {/* Error Display */}
          {(error || errorParam) && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle size={16} />
                <span className="text-sm">{error || "Authentication failed. Please try again."}</span>
              </div>
            </div>
          )}

          {/* Sign In Options */}
          <div className="space-y-4">
            {providers ? (
              Object.values(providers).map((provider: any) => (
                <Button
                  key={provider.name}
                  onClick={() => handleSignIn(provider.id)}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Building className="mr-2" size={16} />
                      Sign in with {provider.name}
                    </>
                  )}
                </Button>
              ))
            ) : (
              <div className="text-center py-4">
                <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                <p className="text-gray-400">Loading sign in options...</p>
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="text-xs text-gray-500 space-y-2">
            <p>Use your Microsoft 365 account to sign in</p>
            <p>Need help? Contact support at support@nextphaseit.org</p>
          </div>

          {/* Back to Home */}
          <div className="pt-4 border-t border-gray-700">
            <Button variant="ghost" asChild className="w-full">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}
