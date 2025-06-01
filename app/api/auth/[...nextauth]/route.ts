import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// Demo accounts for testing
const DEMO_ACCOUNTS = [
  {
    id: "admin-adrian",
    name: "Adrian Knight",
    email: "adrian.knight@nextphaseit.org",
    password: "admin123",
    role: "admin",
    department: "IT Operations",
    image: "/placeholder.svg?height=40&width=40&text=AK",
  },
  {
    id: "demo-admin",
    name: "Demo Admin",
    email: "demo@nextphaseit.org",
    password: "demo123",
    role: "admin",
    department: "Administration",
    image: "/placeholder.svg?height=40&width=40&text=DA",
  },
  {
    id: "staff-support",
    name: "Support Staff",
    email: "support@nextphaseit.org",
    password: "support123",
    role: "staff",
    department: "Technical Support",
    image: "/placeholder.svg?height=40&width=40&text=SS",
  },
]

// NextAuth configuration options
export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials Provider for development and demo
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find matching demo account
        const demoAccount = DEMO_ACCOUNTS.find(
          (account) => account.email === credentials.email && account.password === credentials.password,
        )

        if (demoAccount) {
          return {
            id: demoAccount.id,
            name: demoAccount.name,
            email: demoAccount.email,
            image: demoAccount.image,
            role: demoAccount.role,
            department: demoAccount.department,
          }
        }

        return null
      },
    }),

    // Microsoft Azure AD Provider (only if credentials are available)
    ...(process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET
      ? [
          AzureADProvider({
            clientId: process.env.MICROSOFT_CLIENT_ID,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
            tenantId: process.env.MICROSOFT_TENANT_ID || "common",
          }),
        ]
      : []),
  ],

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Custom pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || "user"
        token.department = (user as any).department
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.department = token.department as string
      }
      return session
    },

    async signIn() {
      return true
    },
  },

  // Secret for JWT encryption
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",

  // Debug mode for development
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
