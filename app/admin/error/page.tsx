"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AdminErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return {
          title: "Access Denied",
          message: "Only NextPhase IT personnel with @nextphaseit.org accounts can access this admin portal.",
          suggestion: "Please contact your administrator if you believe this is an error.",
        }
      case "Configuration":
        return {
          title: "Configuration Error",
          message: "There was an issue with the authentication configuration.",
          suggestion: "Please contact the system administrator.",
        }
      case "Verification":
        return {
          title: "Verification Error",
          message: "Unable to verify your account credentials.",
          suggestion: "Please try signing in again or contact support.",
        }
      default:
        return {
          title: "Authentication Error",
          message: "An unexpected error occurred during authentication.",
          suggestion: "Please try again or contact support if the problem persists.",
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
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
          <h2 className="text-2xl font-bold text-red-400 mb-4">{errorInfo.title}</h2>
          <p className="text-gray-300 mb-4">{errorInfo.message}</p>
          <p className="text-sm text-gray-400">{errorInfo.suggestion}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href="/admin/login">Try Again</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/portal" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Go to Service Portal
            </Link>
          </Button>
        </div>

        {/* Support Contact */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            Need help?{" "}
            <a href="mailto:admin@nextphaseit.org" className="text-primary hover:text-primary/80 transition-colors">
              Contact Admin Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
