import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      console.error("Microsoft OAuth error:", error)
      return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url))
    }

    if (!code) {
      return NextResponse.redirect(new URL("/login?error=no_code", request.url))
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID!,
        client_secret: process.env.AUTH0_CLIENT_SECRET!, // Using existing secret
        code: code,
        grant_type: "authorization_code",
        redirect_uri: `${request.nextUrl.origin}/api/auth/microsoft/callback`,
        scope: "openid profile email User.Read",
      }),
    })

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", await tokenResponse.text())
      return NextResponse.redirect(new URL("/login?error=token_failed", request.url))
    }

    const tokenData = await tokenResponse.json()

    // Get user profile from Microsoft Graph
    const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!profileResponse.ok) {
      console.error("Profile fetch failed:", await profileResponse.text())
      return NextResponse.redirect(new URL("/login?error=profile_failed", request.url))
    }

    const profile = await profileResponse.json()

    // Validate user is from NextPhase IT domain
    if (!profile.mail?.endsWith("@nextphaseit.org") && !profile.userPrincipalName?.endsWith("@nextphaseit.org")) {
      return NextResponse.redirect(new URL("/login?error=unauthorized_domain", request.url))
    }

    // Determine role based on email
    const email = profile.mail || profile.userPrincipalName
    const isAdmin = email === "adrian.knight@nextphaseit.org"

    // Create user session data
    const userData = {
      id: `microsoft-${profile.id}`,
      name: profile.displayName || profile.givenName || "User",
      email: email,
      given_name: profile.givenName || profile.displayName?.split(" ")[0] || "User",
      role: isAdmin ? "admin" : "staff",
      department: profile.department || "NextPhase IT",
      picture: profile.photo
        ? `data:image/jpeg;base64,${profile.photo}`
        : "/placeholder.svg?height=40&width=40&text=" + (profile.givenName?.[0] || "U"),
      authMethod: "exchange",
    }

    // Create a response that will set the user data and redirect
    const response = NextResponse.redirect(new URL("/dashboard", request.url))

    // Set a temporary cookie with user data (in production, use proper session management)
    response.cookies.set("nextphase_temp_user", JSON.stringify(userData), {
      httpOnly: false, // Allow client-side access for this demo
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60, // 1 minute - just for the redirect
    })

    return response
  } catch (error) {
    console.error("Microsoft OAuth callback error:", error)
    return NextResponse.redirect(new URL("/login?error=callback_failed", request.url))
  }
}
