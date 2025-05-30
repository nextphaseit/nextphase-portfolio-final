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
          scope: "openid email profile User.Read",
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login", // Custom admin login page
    error: "/admin/error", // Custom admin error page
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      // Enforce domain restriction for admin portal
      const email = profile?.email || user?.email

      if (email?.endsWith("@nextphaseit.org")) {
        return true
      }

      // Log unauthorized access attempts
      console.log(`Unauthorized admin access attempt: ${email}`)
      return false
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.tenantId = account.tenant_id
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
      if (token) {
        session.user.id = token.sub!
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
        session.accessToken = token.accessToken as string
        session.tenantId = token.tenantId as string
      }

      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to admin dashboard after successful login
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/admin`
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
