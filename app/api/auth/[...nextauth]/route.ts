import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials"

// Required environment variable check
const requiredEnvVars = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
}

const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars)
}

// Authorized users for credentials login
const AUTHORIZED_USERS = [
  {
    id: "admin-adrian",
    name: "Adrian Knight",
    email: "adrian.knight@nextphaseit.org",
    given_name: "Adrian",
    role: "admin",
    department: "IT Operations",
    picture: "/placeholder.svg?height=40&width=40&text=AK",
  },
  {
    id: "staff-demo",
    name: "Demo Staff",
    email: "staff@nextphaseit.org",
    given_name: "Demo",
    role: "staff",
    department: "Technical Support",
    picture: "/placeholder.svg?height=40&width=40&text=DS",
  },
]

// Domains allowed for Microsoft sign-in
const EXCHANGE_AUTHORIZED_DOMAINS = ["nextphaseit.org"]
const EXCHANGE_ADMIN_EMAILS = ["adrian.knight@nextphaseit.org"]

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET
      ? [
          AzureADProvider({
            clientId: process.env.MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
            tenantId: process.env.MICROSOFT_TENANT_ID || "common",
            authorization: {
              params: {
                scope: "openid profile email User.Read",
                prompt: "select_account",
              },
            },
          }),
        ]
      : []),
    CredentialsProvider({
      id: "credentials",
      name: "NextPhase IT Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials ?? {}

          if (!email || !password) {
            return null
          }

          const user = AUTHORIZED_USERS.find((u) => u.email === email)

          if (
            user &&
            ((email === "adrian.knight@nextphaseit.org" && password === "admin123") ||
              (email === "staff@nextphaseit.org" && password === "staff123"))
          ) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.picture,
              role: user.role,
            }
          }

          return null
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      try {
        if (account && user) {
          const email = user.email || token.email
          const domain = email?.split("@")[1]
          const isAdmin = EXCHANGE_ADMIN_EMAILS.includes(email ?? "")

          return {
            ...token,
            id: user.id,
            name: user.name,
            email,
            picture: user.image,
            role:
              account.provider === "credentials"
                ? (user as any).role || "staff"
                : domain && EXCHANGE_AUTHORIZED_DOMAINS.includes(domain)
                  ? isAdmin
                    ? "admin"
                    : "staff"
                  : "unauthorized",
            authMethod: account.provider,
          }
        }
        return token
      } catch (error) {
        console.error("JWT callback error:", error)
        return token
      }
    },
    async session({ session, token }) {
      try {
        if (session.user && token) {
          session.user.id = token.id as string
          session.user.name = token.name as string
          session.user.email = token.email as string
          session.user.image = token.picture as string
          session.user.role = token.role as string
          session.user.authMethod = token.authMethod as string
        }
        return session
      } catch (error) {
        console.error("Session callback error:", error)
        return session
      }
    },
    async signIn({ user, account, profile }) {
      try {
        // For Azure AD, check domain authorization
        if (account?.provider === "azure-ad") {
          const email = user?.email || profile?.email
          const domain = email?.split("@")[1]

          if (!domain || !EXCHANGE_AUTHORIZED_DOMAINS.includes(domain)) {
            console.log(`Access denied for domain: ${domain}`)
            return false
          }
        }

        // JWT callback handles the rest of the authorization logic
        return true
      } catch (error) {
        console.error("SignIn callback error:", error)
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      } catch (error) {
        console.error("Redirect callback error:", error)
        return baseUrl
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

// Create the NextAuth handler
const handler = NextAuth(authOptions)

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST }
