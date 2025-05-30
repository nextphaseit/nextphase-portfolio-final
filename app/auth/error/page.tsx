"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import Link from "next/link"
import { AlertCircle, ArrowLeft } from "lucide-react"

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to access this resource.",
  Verification: "The verification link may have been used or is invalid.",
  Default: "An unexpected error occurred.",
}

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "Default"

  const errorMessage = errorMessages[error] || errorMessages.Default

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <CardWrapper>
          <div className="text-center mb-6">
            <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-red-400" size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
            <p className="text-gray-400">{errorMessage}</p>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/signin">
                <ArrowLeft size={16} className="mr-2" />
                Back to Sign In
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              If this problem persists, please contact{" "}
              <a href="mailto:support@nextphaseit.org" className="text-primary hover:underline">
                support@nextphaseit.org
              </a>
            </p>
          </div>
        </CardWrapper>
      </div>
    </div>
  )
}
