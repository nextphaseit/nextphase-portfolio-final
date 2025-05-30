import NextAuth from "next-auth"
import MicrosoftProvider from "next-auth/providers/microsoft"
import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
  providers: [
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.MICROSOFT_TENANT_ID, // Lock to nextphaseit.org tenant
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
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      // Enforce domain restriction for admin portal
      const email = profile?.email || user?.email

      // Only allow @nextphaseit.org domain
      if (email?.endsWith("@nextphaseit.org")) {
        console.log(`Admin access granted: ${email}`)
        return true
      }

      // Log unauthorized access attempts
      console.log(`Unauthorized admin access attempt: ${email}`)
      return false
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and other info to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.tenantId = account.tenant_id
        token.expiresAt = account.expires_at
      }

      if (profile) {
        token.email = profile.email
        token.name = profile.name
        token.picture = profile.picture
      }

      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string

        // Add admin-specific properties
        session.accessToken = token.accessToken as string
        session.refreshToken = token.refreshToken as string
        session.tenantId = token.tenantId as string
        session.expiresAt = token.expiresAt as number
      }

      return session
    },
    async redirect({ url, baseUrl }) {
      // Ensure redirects work correctly for admin.nextphaseit.org
      const adminBaseUrl = process.env.NEXTAUTH_URL || baseUrl

      // If it's a relative URL, make it absolute with the admin domain
      if (url.startsWith("/")) {
        return `${adminBaseUrl}${url}`
      }

      // If it's the same origin, allow it
      if (new URL(url).origin === adminBaseUrl) {
        return url
      }

      // Default redirect to admin dashboard
      return `${adminBaseUrl}/admin`
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 8 * 60 * 60, // 8 hours
  },
  debug: process.env.NODE_ENV === "development",
  // Ensure cookies work with the admin subdomain
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? ".nextphaseit.org" : undefined,
      },
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
