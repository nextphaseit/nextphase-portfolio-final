import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    console.log("OAuth callback received:", { code: !!code, state, error })

    if (error) {
      console.error("Microsoft OAuth error:", error)
      return NextResponse.redirect(new URL(`/login?error=oauth_failed&details=${error}`, request.url))
    }

    if (!code) {
      console.error("No authorization code received")
      return NextResponse.redirect(new URL("/login?error=no_code", request.url))
    }

    // For PKCE flow, we need to redirect back to the client with the code
    // The client will handle the token exchange using the stored code_verifier
    const callbackUrl = new URL("/auth/callback", request.url)
    callbackUrl.searchParams.set("code", code)
    if (state) {
      callbackUrl.searchParams.set("state", state)
    }

    console.log("Redirecting to client callback:", callbackUrl.toString())
    return NextResponse.redirect(callbackUrl)
  } catch (error) {
    console.error("Microsoft OAuth callback error:", error)
    return NextResponse.redirect(new URL("/login?error=callback_failed", request.url))
  }
}
