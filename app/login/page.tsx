"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Chrome, Github, ComputerIcon as Microsoft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Redirect to dashboard if user is already logged in
      router.push("/dashboard")
    }
  }, [user, router])

  const handleAuth0Login = () => {
    window.location.href = "/api/auth/login"
  }

  const handleSocialLogin = (connection: string) => {
    window.location.href = `/api/auth/login?connection=${connection}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">Authentication Error</div>
          <p className="text-gray-400 mb-6">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT"
              width={200}
              height={60}
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your NextPhase IT client portal</p>
          </div>

          {/* Auth0 Universal Login */}
          <div className="space-y-4 mb-6">
            <Button
              onClick={handleAuth0Login}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base font-medium"
            >
              Sign In to Client Portal
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/5 border-white/20 hover:bg-white/10 text-white"
              onClick={() => handleSocialLogin("windowslive")}
            >
              <Microsoft size={20} className="mr-3" />
              Continue with Microsoft
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/5 border-white/20 hover:bg-white/10 text-white"
              onClick={() => handleSocialLogin("google-oauth2")}
            >
              <Chrome size={20} className="mr-3" />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/5 border-white/20 hover:bg-white/10 text-white"
              onClick={() => handleSocialLogin("github")}
            >
              <Github size={20} className="mr-3" />
              Continue with GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/api/auth/login?screen_hint=signup"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Support Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Need help?{" "}
              <a href="mailto:support@nextphaseit.org" className="text-primary hover:text-primary/80 transition-colors">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary/80 items-center justify-center p-8 relative overflow-hidden">
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

          <h2 className="text-3xl font-bold mb-4">Your Technology Partner</h2>
          <p className="text-lg opacity-90 mb-8">
            Access your NextPhase IT client portal to manage services, view projects, and get support.
          </p>

          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Secure client portal access</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Project status and updates</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Direct support communication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Service management tools</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
