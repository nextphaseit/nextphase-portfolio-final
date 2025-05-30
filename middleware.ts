import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add any custom middleware logic here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define which routes require authentication
        const { pathname } = req.nextUrl

        // Public routes that don't require authentication
        const publicRoutes = ["/", "/about", "/pricing", "/testimonials", "/auth/signin", "/auth/error", "/api/auth"]

        // Check if the current path is public
        const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

        // Allow access to public routes
        if (isPublicRoute) {
          return true
        }

        // Require authentication for protected routes
        return !!token
      },
    },
  },
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|placeholder.svg).*)",
  ],
}
