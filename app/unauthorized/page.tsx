"use client"

import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <Image
          src="/images/nextphase-logo.png"
          alt="NextPhase IT"
          width={200}
          height={60}
          className="h-16 w-auto mx-auto mb-6"
        />

        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-6">
          You don't have permission to access this portal. This system is restricted to NextPhase IT staff members only.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft size={16} className="mr-2" />
              Return to Homepage
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <a href="/api/auth/logout">Sign Out</a>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Need access?{" "}
            <a
              href="mailto:adrian.knight@nextphaseit.org"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Contact Adrian Knight
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
