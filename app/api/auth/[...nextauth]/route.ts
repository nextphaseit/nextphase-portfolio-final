import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

// Define the Microsoft provider configuration manually since the import might be causing issues
const MicrosoftProvider = {
  id: "microsoft",
  name: "Microsoft",
  type: "oauth" as const,
  authorization: {
    url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    params: {
      scope: "openid email profile offline_access",
      prompt: "select_account",
    },
  },
  token: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  userinfo: "https://graph.microsoft.com/v1.0/me",
  clientId: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  profile(profile: any) {
    return {
      id: profile.id,
      name: profile.displayName,
      email: profile.mail || profile.userPrincipalName,
      image: null,
    }
  },
}

const authOptions: NextAuthOptions = {
  providers: [MicrosoftProvider as any],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ profile, user }) {
      try {
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
      if (account) {
        token.accessToken = account.access_token
      }
      if (profile) {
        token.email = profile.email
        token.name = profile.name || profile.displayName
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub || ""
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
