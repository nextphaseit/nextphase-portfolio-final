import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.MICROSOFT_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
          prompt: "select_account",
        },
      },
    }),
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
    error: "/auth/error",
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
}

// 🚨 Wrap with error logging
export const GET = async (req: Request) => {
  try {
    return await NextAuth(req, authOptions)
  } catch (error: any) {
    console.error("❌ AUTH GET ERROR:", error.message || error)
    return new Response(JSON.stringify({ error: "Internal Auth Error", detail: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const POST = async (req: Request) => {
  try {
    return await NextAuth(req, authOptions)
  } catch (error: any) {
    console.error("❌ AUTH POST ERROR:", error.message || error)
    return new Response(JSON.stringify({ error: "Internal Auth Error", detail: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
