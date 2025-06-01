"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle, Shield, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ErrorDetails {
  title: string
  message: string
  suggestion: string
  canRetry: boolean
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null)

  useEffect(() => {
    const details = getErrorDetails(error, errorDescription)
    setErrorDetails(details)
  }, [error, errorDescription])

  const getErrorDetails = (error: string | null, description: string | null): ErrorDetails => {
    switch (error) {
      case "AccessDenied":
        return {
          title: "Access Denied",
          message: "Only NextPhase IT personnel with @nextphaseit.org accounts can access this admin portal.",
          suggestion: "Please ensure you're using your NextPhase IT Microsoft 365 account.",
          canRetry: true,
        }
      case "Configuration":
        return {
          title: "Configuration Error",
          message: "There was an issue with the authentication configuration.",
          suggestion: "Please contact the system administrator.",
          canRetry: false,
        }
      case "Verification":
        return {
          title: "Verification Error",
          message: "Unable to verify your account credentials.",
          suggestion: "Please try signing in again or contact support.",
          canRetry: true,
        }
      case "OAuthSignin":
        return {
          title: "OAuth Sign-in Error",
          message: "An error occurred during the OAuth sign-in process.",
          suggestion: "Please try again or contact support if the problem persists.",
          canRetry: true,
        }
      case "OAuthCallback":
        return {
          title: "OAuth Callback Error",
          message: "An error occurred during the OAuth callback process.",
          suggestion: "Please try signing in again.",
          canRetry: true,
        }
      case "OAuthCreateAccount":
        return {
          title: "Account Creation Error",
          message: "Could not create your OAuth account.",
          suggestion: "Please contact support for assistance.",
          canRetry: false,
        }
      case "EmailCreateAccount":
        return {
          title: "Email Account Error",
          message: "Could not create an account with this email address.",
          suggestion: "Please ensure you're using a valid @nextphaseit.org email.",
          canRetry: true,
        }
      case "Callback":
        return {
          title: "Callback URL Error",
          message: "There was an issue with the callback URL.",
          suggestion: "Please try signing in again.",
          canRetry: true,
        }
      case "OAuthAccountNotLinked":
        return {
          title: "Account Not Linked",
          message: "Your OAuth account is not linked to a valid admin account.",
          suggestion: "Please contact support to link your account.",
          canRetry: false,
        }
      case "SessionRequired":
        return {
          title: "Session Required",
          message: "You need to be signed in to access this page.",
          suggestion: "Please sign in with your NextPhase IT account.",
          canRetry: true,
        }
      default:
        return {
          title: "Authentication Error",
          message: description || "An unexpected error occurred during authentication.",
          suggestion: "Please try again or contact support if the problem persists.",
          canRetry: true,
        }
    }
  }

  if (!errorDetails) {
    return (
      <div className="min-h-screen bg-[#0a192f] text-white flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0070f3] mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading error details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/nextphase-logo.png"
            alt="NextPhase IT"
            width={200}
            height={60}
            className="h-16 w-auto mx-auto mb-4"
          />
          <div className="flex items-center justify-center gap-2">
            <Shield className="text-red-500" size={24} />
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
        </div>

        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-red-400" size={32} />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-red-400 mb-4">{errorDetails.title}</h2>
          <p className="text-gray-300 mb-4">{errorDetails.message}</p>
          <p className="text-sm text-gray-400">{errorDetails.suggestion}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {errorDetails.canRetry && (
            <Button asChild className="w-full bg-[#0070f3] hover:bg-[#0070f3]/90">
              <Link href="/auth/signin" className="flex items-center gap-2">
                <RefreshCw size={16} />
                Try Again
              </Link>
            </Button>
          )}

          <Button asChild variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
            <Link href="/" className="flex items-center gap-2">
              <Home size={16} />
              Go to Main Site
            </Link>
          </Button>
        </div>

        {/* Error Code */}
        {error && (
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              Error Code: <span className="font-mono text-red-400">{error}</span>
            </p>
            {errorDescription && (
              <p className="text-xs text-gray-500 mt-1">
                Details: <span className="font-mono text-gray-400">{errorDescription}</span>
              </p>
            )}
          </div>
        )}

        {/* Support Contact */}
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            Need help?{" "}
            <a href="mailto:admin@nextphaseit.org" className="text-[#0070f3] hover:text-[#0070f3]/80 transition-colors">
              Contact Admin Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
