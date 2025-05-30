import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials"

// Validate required environment variables
const requiredEnvVars = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
}

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars)
}

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
    // Only include Azure AD provider if credentials are available
    ...(process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET
      ? [
          AzureADProvider({
            clientId: process.env.MICROSOFT_CLIENT_ID,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
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

    // Credentials provider for local development
    CredentialsProvider({
      id: "credentials",
      name: "NextPhase IT Credentials",
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
        try {
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
            return {
              id: authorizedUser.id,
              name: authorizedUser.name,
              email: authorizedUser.email,
              image: authorizedUser.picture,
              role: authorizedUser.role,
            }
          }

          return null
        } catch (error) {
          console.error("Credentials authorization error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      try {
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
          if (account.provider === "credentials") {
            return {
              ...token,
              id: user.id,
              name: user.name,
              email: user.email,
              picture: user.image,
              role: (user as any).role || "staff",
              authMethod: "credentials",
            }
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
        if (token && session.user) {
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
        // Allow all sign-ins for now, domain checking is done in JWT callback
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

// Create the handler with proper error handling
const handler = NextAuth(authOptions)

// Wrap the handler to catch any errors and return proper JSON responses
const wrappedHandler = async (req: Request, context: any) => {
  try {
    return await handler(req, context)
  } catch (error) {
    console.error("NextAuth handler error:", error)

    // Return a proper JSON error response
    return new Response(
      JSON.stringify({
        error: "Authentication error",
        message: "An error occurred during authentication",
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

export { wrappedHandler as GET, wrappedHandler as POST }
