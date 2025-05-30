import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials"

// Define authorized users for local authentication
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

// Microsoft Exchange authorized domains
const EXCHANGE_AUTHORIZED_DOMAINS = ["nextphaseit.org"]
const EXCHANGE_ADMIN_EMAILS = ["adrian.knight@nextphaseit.org"]

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
      tenantId: process.env.MICROSOFT_TENANT_ID || "common",
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
    CredentialsProvider({
      name: "NextPhase IT Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if user is authorized NextPhase IT staff
        const authorizedUser = AUTHORIZED_USERS.find((u) => u.email === credentials.email)

        if (
          authorizedUser &&
          ((credentials.email === "adrian.knight@nextphaseit.org" && credentials.password === "admin123") ||
            (credentials.email === "staff@nextphaseit.org" && credentials.password === "staff123"))
        ) {
          return authorizedUser
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // For Azure AD provider
        if (account.provider === "azure-ad") {
          const email = user.email || token.email
          const domain = email?.split("@")[1]

          // Check if email domain is authorized
          if (!domain || !EXCHANGE_AUTHORIZED_DOMAINS.includes(domain)) {
            throw new Error("Unauthorized domain")
          }

          // Determine role based on email
          const isAdmin = EXCHANGE_ADMIN_EMAILS.includes(email || "")

          return {
            ...token,
            id: user.id,
            name: user.name,
            email: email,
            picture: user.image,
            role: isAdmin ? "admin" : "staff",
            authMethod: "azure-ad",
          }
        }

        // For credentials provider
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          role: user.role,
          authMethod: "credentials",
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
        session.user.role = token.role as string
        session.user.authMethod = token.authMethod as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
