import { type NextRequest, NextResponse } from "next/server"
import { PKCEHelper } from "@/lib/pkce"
import { isNextPhaseAdmin, getAdminUser } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error:", error)
    return NextResponse.redirect(new URL(`/admin/login?error=oauth_failed`, request.url))
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL(`/admin/login?error=callback_failed`, request.url))
  }

  try {
    // Verify PKCE state
    const storedPKCEData = PKCEHelper.getPKCEData()
    if (!storedPKCEData || storedPKCEData.state !== state) {
      return NextResponse.redirect(new URL(`/admin/login?error=callback_failed`, request.url))
    }

    // Exchange code for token
    const clientId = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID
    const clientSecret = process.env.MICROSOFT_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error("Missing Microsoft OAuth configuration")
      return NextResponse.redirect(new URL(`/admin/login?error=token_failed`, request.url))
    }

    const currentOrigin = request.nextUrl.origin
    let normalizedOrigin = currentOrigin
    if (currentOrigin.includes("nextphaseit.org")) {
      normalizedOrigin = "https://admin.nextphaseit.org"
    }

    const tokenResponse = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: `${normalizedOrigin}/api/auth/microsoft/admin-callback`,
        grant_type: "authorization_code",
        code_verifier: storedPKCEData.codeVerifier,
      }),
    })

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", await tokenResponse.text())
      return NextResponse.redirect(new URL(`/admin/login?error=token_failed`, request.url))
    }

    const tokenData = await tokenResponse.json()

    // Get user profile
    const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!profileResponse.ok) {
      console.error("Profile fetch failed:", await profileResponse.text())
      return NextResponse.redirect(new URL(`/admin/login?error=profile_failed`, request.url))
    }

    const profile = await profileResponse.json()

    // Verify admin access
    if (!isNextPhaseAdmin(profile.mail || profile.userPrincipalName)) {
      console.log("Unauthorized admin access attempt:", profile.mail || profile.userPrincipalName)
      return NextResponse.redirect(new URL(`/admin/login?error=unauthorized_domain`, request.url))
    }

    // Get admin user data
    const adminUser = getAdminUser(profile.mail || profile.userPrincipalName)
    if (!adminUser) {
      return NextResponse.redirect(new URL(`/admin/login?error=unauthorized_domain`, request.url))
    }

    // Update admin user with fresh profile data
    const updatedAdminUser = {
      ...adminUser,
      name: profile.displayName || adminUser.name,
      picture: profile.photo ? `data:image/jpeg;base64,${profile.photo}` : adminUser.picture,
      lastLogin: new Date().toISOString(),
    }

    // Create response with admin session
    const response = NextResponse.redirect(new URL("/admin", request.url))

    // Set secure admin session cookie
    response.cookies.set("nextphase_admin_temp", JSON.stringify(updatedAdminUser), {
      httpOnly: false, // Needs to be accessible by client for session management
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    })

    // Clear PKCE data
    PKCEHelper.clearPKCEData()

    return response
  } catch (error) {
    console.error("Admin callback error:", error)
    return NextResponse.redirect(new URL(`/admin/login?error=callback_failed`, request.url))
  }
}
