import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    // Build the callback URL for the client-side handler
    const callbackUrl = new URL("/auth/login", request.url)

    if (error) {
      callbackUrl.searchParams.set("error", error)
    } else if (code) {
      callbackUrl.searchParams.set("code", code)
      if (state) {
        callbackUrl.searchParams.set("state", state)
      }
    }

    return NextResponse.redirect(callbackUrl)
  } catch (error) {
    console.error("Microsoft OAuth callback error:", error)
    return NextResponse.redirect(new URL("/auth/login?error=callback_failed", request.url))
  }
}
