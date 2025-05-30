import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// Check for required environment variables
const requiredEnvVars = ["NEXTAUTH_SECRET"]
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(", ")}`)
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Only include Azure AD if credentials are available
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password
        if (email === "adrian.knight@nextphaseit.org" && password === "admin123") {
          return {
            id: "admin-adrian",
            name: "Adrian Knight",
            email,
            role: "admin",
          }
        }
        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // This points to the client-side error page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  logger: {
    error(code, metadata) {
      console.error(`[next-auth] [${code}]`, metadata)
    },
    warn(code) {
      console.warn(`[next-auth] [${code}]`)
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.debug(`[next-auth] [${code}]`, metadata)
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
}

// Wrap handlers with error handling
export async function GET(req: Request) {
  try {
    return await NextAuth(req, authOptions)
  } catch (error: any) {
    console.error("NextAuth GET Error:", error.message || error)
    return new Response(
      JSON.stringify({
        error: "Internal Authentication Error",
        message: error.message || "An unexpected error occurred during authentication",
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

export async function POST(req: Request) {
  try {
    return await NextAuth(req, authOptions)
  } catch (error: any) {
    console.error("NextAuth POST Error:", error.message || error)
    return new Response(
      JSON.stringify({
        error: "Internal Authentication Error",
        message: error.message || "An unexpected error occurred during authentication",
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
