import { initAuth0 } from "@auth0/nextjs-auth0"

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  baseURL: process.env.AUTH0_BASE_URL!,
  secret: process.env.AUTH0_SECRET!,
  routes: {
    login: "/login",
    logout: "/api/auth/logout",
    callback: "/api/auth/callback",
    postLogoutRedirect: "/",
  },
  session: {
    rollingDuration: 60 * 60 * 24, // 24 hours
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days
  },
})
