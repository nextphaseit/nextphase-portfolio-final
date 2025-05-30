import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string
      role: string
      authMethod: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    name: string
    email: string
    image?: string
    role: string
    department?: string
    picture?: string
    given_name?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string
    email: string
    picture?: string
    role: string
    authMethod: string
  }
}
