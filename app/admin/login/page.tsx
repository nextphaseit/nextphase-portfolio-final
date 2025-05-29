"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, AlertCircle, ArrowLeft, Building, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AdminAuthProvider, useAdminAuth } from "@/providers/admin-auth-provider"

function AdminLoginContent() {
  const [error, setError] = useState("")
  const { loginWithMicrosoft, isLoading, isAuthenticated, error: authError } = useAdminAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin")
    }

    // Check for OAuth errors
    const oauthError = searchParams.get("error")
    if (oauthError) {
      switch (oauthError) {
        case "oauth_failed":
          setError("Microsoft authentication failed. Please try again.")
          break
        case "unauthorized_domain":
          setError("Access denied. Only NextPhase IT personnel can access this admin portal.")
          break
        case "token_failed":
          setError("Authentication token error. Please try again.")
          break
        case "profile_failed":
          setError("Unable to retrieve profile information. Please try again.")
          break
        case "callback_failed":
          setError("Authentication callback failed. Please try again.")
          break
        default:
          setError("Authentication error occurred. Please try again.")
      }
    }

    // Set auth error if present
    if (authError) {
      setError(authError)
    }
  }, [isAuthenticated, router, searchParams, authError])

  const handleMicrosoftLogin = async () => {
    setError("")
    const success = await loginWithMicrosoft()
    if (!success && !authError) {
      setError("Microsoft authentication failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back to Service Portal Link */}
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Service Portal
          </Link>

          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT Admin Portal"
              width={200}
              height={60}
              className="h-16 w-auto mx-auto mb-4"
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="text-red-500" size={24} />
              <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            </div>
            <p className="text-gray-400">NextPhase IT Administrative Access</p>
          </div>

          {/* Access Restriction Notice */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lock className="text-red-400 mt-0.5" size={20} />
              <div>
                <h3 className="text-red-400 font-semibold mb-2">Restricted Access</h3>
                <p className="text-sm text-gray-300">
                  This admin portal is exclusively for NextPhase IT personnel. Only users with @nextphaseit.org accounts
                  are authorized to access administrative features.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-400" size={16} />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Microsoft Login Button */}
          <div className="mb-6">
            <Button
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-base font-medium"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
                  </svg>
                  Sign in with Microsoft 365
                </>
              )}
            </Button>
          </div>

          {/* Admin Features Preview */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Building className="text-primary" size={16} />
              Admin Portal Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Multi-tenant analytics dashboard
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Exportable reports and scheduling
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Tenant configuration management
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Audit logs and change tracking
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                User account management
              </li>
            </ul>
          </div>

          {/* Alternative Access */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-4">Need access to the regular service portal?</p>
            <Link href="/portal" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
              Go to Service Desk Portal →
            </Link>
          </div>

          {/* Support Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Access issues?{" "}
              <a href="mailto:admin@nextphaseit.org" className="text-primary hover:text-primary/80 transition-colors">
                Contact Admin Support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Admin Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-red-600 to-red-800 items-center justify-center p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-md">
          <div className="mb-8">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT"
              width={300}
              height={90}
              className="h-20 w-auto mx-auto mb-6 filter brightness-0 invert"
            />
          </div>

          <h2 className="text-3xl font-bold mb-4">Administrative Portal</h2>
          <p className="text-lg opacity-90 mb-8">
            Comprehensive multi-tenant management, analytics, and configuration tools for NextPhase IT administrators.
          </p>

          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Real-time tenant analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Automated report generation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Centralized tenant management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Comprehensive audit trails</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Role-based access control</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <AdminAuthProvider>
      <AdminLoginContent />
    </AdminAuthProvider>
  )
}
