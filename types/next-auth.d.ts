import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      department: string
      provider: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string
    department?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    department: string
    provider: string
  }
}
