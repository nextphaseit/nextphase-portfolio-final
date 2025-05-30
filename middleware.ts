import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/about",
    "/pricing",
    "/testimonials",
    "/auth/signin",
    "/auth/error",
    "/api/auth",
    "/login",
    "/favicon.ico",
    "/_next",
  ]

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path) || pathname === path)

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check if the user is authenticated
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If the user is not authenticated, redirect to the login page
  if (!token) {
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // For admin routes, check if the user has admin privileges
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/auth/error?error=AccessDenied", request.url))
  }

  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Match all paths except static files, api routes, and public paths
    "/((?!_next/static|_next/image|favicon.ico|images|placeholder.svg).*)",
  ],
}
