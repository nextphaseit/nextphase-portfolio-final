import NextAuth from "next-auth"
import MicrosoftProvider from "next-auth/providers/microsoft"
import type { NextAuthOptions } from "next-auth"

// Validate required environment variables
const requiredEnvVars = {
  MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
  MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
}

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
}

const authOptions: NextAuthOptions = {
  providers: [
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
      tenantId: process.env.MICROSOFT_TENANT_ID, // Optional: Lock to specific tenant
      authorization: {
        params: {
          scope: "openid email profile offline_access",
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      try {
        // Get email from profile or user object
        const email = profile?.email || user?.email

        if (!email) {
          console.log("No email found in profile or user object")
          return false
        }

        // Check if email ends with @nextphaseit.org
        if (email.endsWith("@nextphaseit.org")) {
          console.log(`Admin access granted: ${email}`)
          return true
        }

        console.log(`Access denied for non-NextPhase email: ${email}`)
        return false
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
    async jwt({ token, account, profile }) {
      try {
        // Store additional information in the token
        if (account) {
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.expiresAt = account.expires_at
        }

        if (profile) {
          token.email = profile.email
          token.name = profile.name
          token.picture = profile.picture
        }

        return token
      } catch (error) {
        console.error("Error in jwt callback:", error)
        return token
      }
    },
    async session({ session, token }) {
      try {
        // Send properties to the client
        if (token && session.user) {
          session.user.id = token.sub || ""
          session.user.email = token.email as string
          session.user.name = token.name as string
          session.user.image = token.picture as string
        }

        return session
      } catch (error) {
        console.error("Error in session callback:", error)
        return session
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        // Handle redirects properly
        if (url.startsWith("/")) return `${baseUrl}${url}`
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      } catch (error) {
        console.error("Error in redirect callback:", error)
        return baseUrl
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  jwt: {
    maxAge: 8 * 60 * 60, // 8 hours
  },
  debug: process.env.NODE_ENV === "development",
}

// Create the handler with error handling
const handler = async (req: Request, context: any) => {
  try {
    return await NextAuth(req, context, authOptions)
  } catch (error) {
    console.error("NextAuth handler error:", error)

    // Return a proper JSON error response
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: "Authentication service temporarily unavailable",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

export { handler as GET, handler as POST }
