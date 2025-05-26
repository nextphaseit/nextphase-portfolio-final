import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code, codeVerifier, state } = await request.json()

    if (!code || !codeVerifier) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Get the current origin and normalize it
    const currentOrigin = new URL(request.url).origin
    let normalizedOrigin = currentOrigin

    // Ensure we use the same domain format as configured in Azure
    if (currentOrigin.includes("nextphaseit.org")) {
      normalizedOrigin = "https://www.nextphaseit.org"
    }

    // Exchange code for access token with PKCE
    const tokenResponse = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID!,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: `${normalizedOrigin}/api/auth/microsoft/callback`,
        code_verifier: codeVerifier,
        scope: "openid profile email User.Read",
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("Token exchange failed:", errorText)
      return NextResponse.json({ error: "Token exchange failed" }, { status: 400 })
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
      return NextResponse.json({ error: "Profile fetch failed" }, { status: 400 })
    }

    const profile = await profileResponse.json()

    // Validate user is from NextPhase IT domain
    if (!profile.mail?.endsWith("@nextphaseit.org") && !profile.userPrincipalName?.endsWith("@nextphaseit.org")) {
      return NextResponse.json({ error: "Unauthorized domain" }, { status: 403 })
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

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Microsoft OAuth token exchange error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
