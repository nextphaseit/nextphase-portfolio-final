"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PKCEHelper } from "@/lib/pkce"
import Image from "next/image"

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code")
        const state = searchParams.get("state")
        const error = searchParams.get("error")

        console.log("Client callback processing:", { code: !!code, state, error })

        if (error) {
          setErrorMessage(`OAuth error: ${error}`)
          setStatus("error")
          return
        }

        if (!code) {
          setErrorMessage("No authorization code received")
          setStatus("error")
          return
        }

        // Retrieve PKCE data
        const { codeVerifier, state: storedState } = PKCEHelper.retrievePKCEData()

        if (!codeVerifier) {
          setErrorMessage("PKCE code verifier not found. Please try logging in again.")
          setStatus("error")
          return
        }

        // Verify state parameter (optional but recommended)
        if (state && storedState && state !== storedState) {
          setErrorMessage("Invalid state parameter")
          setStatus("error")
          return
        }

        console.log("Exchanging code for token with PKCE...")

        // Exchange code for token using PKCE
        const tokenResponse = await fetch("/api/auth/microsoft/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            codeVerifier,
            state,
          }),
        })

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json()
          console.error("Token exchange failed:", errorData)
          setErrorMessage(`Token exchange failed: ${errorData.error || "Unknown error"}`)
          setStatus("error")
          return
        }

        const { user } = await tokenResponse.json()
        console.log("Authentication successful:", user.email)

        // Store user data
        localStorage.setItem("nextphase_admin_user", JSON.stringify(user))

        // Clear PKCE data
        PKCEHelper.clearPKCEData()

        setStatus("success")

        // Redirect to dashboard after a brief success message
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } catch (error) {
        console.error("Callback processing error:", error)
        setErrorMessage("An unexpected error occurred during authentication")
        setStatus("error")
      }
    }

    handleCallback()
  }, [searchParams, router])

  const handleRetry = () => {
    PKCEHelper.clearPKCEData()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <Image
            src="/images/nextphase-logo.png"
            alt="NextPhase IT"
            width={200}
            height={60}
            className="h-16 w-auto mx-auto mb-6"
          />
        </div>

        {status === "processing" && (
          <div>
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-white mb-2">Completing Sign In</h1>
            <p className="text-gray-400">Processing your Microsoft authentication...</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Sign In Successful!</h1>
            <p className="text-gray-400 mb-4">Redirecting to your dashboard...</p>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {status === "error" && (
          <div>
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Authentication Failed</h1>
            <p className="text-gray-400 mb-6">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Need help?{" "}
            <a
              href="mailto:adrian.knight@nextphaseit.org"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
