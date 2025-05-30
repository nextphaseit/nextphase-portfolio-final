"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

const errorMessages = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
  Signin: "Error in signing in.",
  OAuthSignin: "Error in constructing an authorization URL.",
  OAuthCallback: "Error in handling the response from an OAuth provider.",
  OAuthCreateAccount: "Could not create OAuth account.",
  EmailCreateAccount: "Could not create email account.",
  Callback: "Error in the OAuth callback handler route.",
  OAuthAccountNotLinked:
    "The account is not linked. To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Sending the e-mail with the verification token failed.",
  CredentialsSignin: "The authorize callback returned null in the Credentials provider.",
  SessionRequired: "The content of this page requires you to be signed in at all times.",
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") as keyof typeof errorMessages

  const errorMessage = errorMessages[error] || errorMessages.Default

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <CardWrapper className="w-full max-w-md">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="text-red-400" size={32} />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
            <p className="text-gray-400 mb-4">{errorMessage}</p>
            {error && <p className="text-sm text-gray-500 bg-gray-800/50 p-2 rounded">Error Code: {error}</p>}
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/auth/signin">
                <RefreshCw size={16} className="mr-2" />
                Try Again
              </Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <Home size={16} className="mr-2" />
                Go Home
              </Link>
            </Button>
          </div>

          <div className="text-xs text-gray-500 space-y-2">
            <p>If this problem persists, please contact support:</p>
            <div className="space-y-1">
              <p>Email: support@nextphaseit.org</p>
              <p>Phone: (984) 310-9533</p>
            </div>
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}
