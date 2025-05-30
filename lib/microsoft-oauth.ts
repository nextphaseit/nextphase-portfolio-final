import { PKCEHelper } from "./pkce"

export interface MicrosoftUser {
  id: string
  displayName: string
  givenName: string
  surname: string
  mail: string
  userPrincipalName: string
  jobTitle?: string
  department?: string
  officeLocation?: string
  mobilePhone?: string
  businessPhones?: string[]
}

export interface OAuthTokens {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
  scope: string
}

export class MicrosoftOAuthService {
  private clientId: string
  private clientSecret: string
  private tenantId: string
  private redirectUri: string

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID!
    this.clientSecret = process.env.MICROSOFT_CLIENT_SECRET!
    this.tenantId = process.env.MICROSOFT_TENANT_ID || "common"
    this.redirectUri = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/microsoft/callback`
  }

  // Generate authorization URL with PKCE
  generateAuthUrl(state?: string): string {
    const authUrl = new URL(`https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize`)

    authUrl.searchParams.set("client_id", this.clientId)
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set("redirect_uri", this.redirectUri)
    authUrl.searchParams.set("scope", "openid profile email User.Read User.ReadBasic.All")
    authUrl.searchParams.set("response_mode", "query")
    authUrl.searchParams.set("prompt", "select_account")

    if (state) {
      authUrl.searchParams.set("state", state)
    }

    return authUrl.toString()
  }

  // Generate PKCE authorization URL
  async generatePKCEAuthUrl(state?: string): Promise<{ url: string; codeVerifier: string; codeChallenge: string }> {
    const codeVerifier = PKCEHelper.generateCodeVerifier()
    const codeChallenge = await PKCEHelper.generateCodeChallenge(codeVerifier)

    const authUrl = new URL(`https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize`)

    authUrl.searchParams.set("client_id", this.clientId)
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set("redirect_uri", this.redirectUri)
    authUrl.searchParams.set("scope", "openid profile email User.Read User.ReadBasic.All")
    authUrl.searchParams.set("response_mode", "query")
    authUrl.searchParams.set("code_challenge", codeChallenge)
    authUrl.searchParams.set("code_challenge_method", "S256")
    authUrl.searchParams.set("prompt", "select_account")

    if (state) {
      authUrl.searchParams.set("state", state)
    }

    return {
      url: authUrl.toString(),
      codeVerifier,
      codeChallenge,
    }
  }

  // Exchange authorization code for tokens
  async exchangeCodeForTokens(code: string, codeVerifier?: string): Promise<OAuthTokens> {
    const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`

    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code,
      redirect_uri: this.redirectUri,
      grant_type: "authorization_code",
      scope: "openid profile email User.Read User.ReadBasic.All",
    })

    // Add PKCE code verifier if provided
    if (codeVerifier) {
      body.set("code_verifier", codeVerifier)
    }

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Token exchange failed:", errorText)
      throw new Error(`Token exchange failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<OAuthTokens> {
    const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`

    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      scope: "openid profile email User.Read User.ReadBasic.All",
    })

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Token refresh failed:", errorText)
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  // Get user profile from Microsoft Graph
  async getUserProfile(accessToken: string): Promise<MicrosoftUser> {
    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Profile fetch failed:", errorText)
      throw new Error(`Profile fetch failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  // Get user photo from Microsoft Graph
  async getUserPhoto(accessToken: string): Promise<string | null> {
    try {
      const response = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const buffer = await blob.arrayBuffer()
        const base64 = Buffer.from(buffer).toString("base64")
        return `data:image/jpeg;base64,${base64}`
      }
    } catch (error) {
      console.log("No user photo available")
    }

    return null
  }

  // Validate token and get user info
  async validateAndGetUser(accessToken: string): Promise<MicrosoftUser & { photo?: string }> {
    const [profile, photo] = await Promise.all([this.getUserProfile(accessToken), this.getUserPhoto(accessToken)])

    return {
      ...profile,
      photo: photo || undefined,
    }
  }

  // Check if user is from authorized domain
  isAuthorizedDomain(email: string): boolean {
    const authorizedDomains = ["nextphaseit.org"]
    const domain = email.split("@")[1]
    return authorizedDomains.includes(domain)
  }

  // Determine user role
  getUserRole(email: string): "admin" | "staff" {
    const adminEmails = ["adrian.knight@nextphaseit.org", "admin@nextphaseit.org"]
    return adminEmails.includes(email) ? "admin" : "staff"
  }
}

export const microsoftOAuth = new MicrosoftOAuthService()
