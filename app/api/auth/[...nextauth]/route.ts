import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// Validate required environment variables
const requiredEnvVars = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
}

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars.join(", "))
}

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
    // Microsoft Azure AD Provider (only if credentials are available)
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

    // Credentials Provider for development and demo
    CredentialsProvider({
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
          // Check if credentials are provided
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials")
            return null
          }

          // Find matching demo account
          const demoAccount = DEMO_ACCOUNTS.find(
            (account) => account.email === credentials.email && account.password === credentials.password,
          )

          if (demoAccount) {
            console.log(`Demo login successful for: ${demoAccount.email}`)
            return {
              id: demoAccount.id,
              name: demoAccount.name,
              email: demoAccount.email,
              image: demoAccount.image,
              role: demoAccount.role,
              department: demoAccount.department,
            }
          }

          console.log("Invalid credentials provided")
          return null
        } catch (error) {
          console.error("Credentials authorization error:", error)
          return null
        }
      },
    }),
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
    async jwt({ token, user, account }) {
      try {
        // Add user data to token when signing in
        if (user) {
          token.id = user.id
          token.name = user.name
          token.email = user.email
          token.picture = user.image
          token.role = (user as any).role || "user"
          token.department = (user as any).department

          if (account) {
            token.provider = account.provider
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
        // Add token data to session
        if (session.user) {
          session.user.id = token.id as string
          session.user.name = token.name as string
          session.user.email = token.email as string
          session.user.image = token.picture as string
          session.user.role = token.role as string
          session.user.department = token.department as string
        }
        return session
      } catch (error) {
        console.error("Session callback error:", error)
        return session
      }
    },

    async signIn({ user, account, profile }) {
      try {
        // Allow all sign-ins for demo accounts
        console.log("Sign-in attempt:", { user: user?.email, provider: account?.provider })
        return true
      } catch (error) {
        console.error("SignIn callback error:", error)
        return false
      }
    },
  },

  // Secret for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,

  // Debug mode for development
  debug: process.env.NODE_ENV === "development",

  // Logger configuration
  logger: {
    error(code, metadata) {
      console.error(`[NextAuth Error] ${code}:`, metadata)
    },
    warn(code) {
      console.warn(`[NextAuth Warning] ${code}`)
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.debug(`[NextAuth Debug] ${code}:`, metadata)
      }
    },
  },
}

// Handler for GET requests with error handling
export async function GET(req: Request) {
  try {
    const handler = NextAuth(authOptions)
    return await handler(req)
  } catch (error: any) {
    console.error("NextAuth GET Error:", error.message || error)

    // Return a proper JSON error response
    return new Response(
      JSON.stringify({
        error: "Authentication Error",
        detail: error.message || "An unexpected error occurred during authentication",
        timestamp: new Date().toISOString(),
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

// Handler for POST requests with error handling
export async function POST(req: Request) {
  try {
    const handler = NextAuth(authOptions)
    return await handler(req)
  } catch (error: any) {
    console.error("NextAuth POST Error:", error.message || error)

    // Return a proper JSON error response
    return new Response(
      JSON.stringify({
        error: "Authentication Error",
        detail: error.message || "An unexpected error occurred during authentication",
        timestamp: new Date().toISOString(),
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
