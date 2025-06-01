import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const error = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")

    console.log(`[NextAuth Error API] Error: ${error}, Description: ${errorDescription}`)

    // Handle specific error cases
    const errorDetails = getErrorDetails(error, errorDescription)

    return NextResponse.json({
      error: error || "Unknown",
      message: errorDetails.message,
      description: errorDetails.description,
      canRetry: errorDetails.canRetry,
      timestamp: new Date().toISOString(),
      status: "error",
    })
  } catch (err: any) {
    console.error("[NextAuth Error API] Unexpected error:", err)

    return NextResponse.json({
      error: "InternalError",
      message: "An internal server error occurred while processing the authentication error.",
      description: "Please try again or contact support if the problem persists.",
      canRetry: true,
      timestamp: new Date().toISOString(),
      status: "error",
    })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}

function getErrorDetails(error: string | null, description: string | null) {
  const errorCode = error || "Unknown"

  switch (errorCode) {
    case "Configuration":
      return {
        message: "Authentication Configuration Error",
        description: "There is a problem with the server configuration. Please contact the system administrator.",
        canRetry: false,
      }
    case "AccessDenied":
      return {
        message: "Access Denied",
        description:
          "You do not have permission to access this resource. Please ensure you're using a valid NextPhase IT account.",
        canRetry: true,
      }
    case "Verification":
      return {
        message: "Verification Failed",
        description: "The verification link may have been used or is invalid. Please try signing in again.",
        canRetry: true,
      }
    case "OAuthSignin":
      return {
        message: "OAuth Sign-in Error",
        description: "An error occurred during the OAuth sign-in process. Please try again.",
        canRetry: true,
      }
    case "OAuthCallback":
      return {
        message: "OAuth Callback Error",
        description: "An error occurred during the OAuth callback process. Please try signing in again.",
        canRetry: true,
      }
    case "OAuthCreateAccount":
      return {
        message: "Account Creation Error",
        description: "Could not create your OAuth account. Please contact support for assistance.",
        canRetry: false,
      }
    case "EmailCreateAccount":
      return {
        message: "Email Account Error",
        description: "Could not create an account with this email address. Please ensure you're using a valid email.",
        canRetry: true,
      }
    case "Callback":
      return {
        message: "Callback URL Error",
        description: "There was an issue with the callback URL. Please try signing in again.",
        canRetry: true,
      }
    case "OAuthAccountNotLinked":
      return {
        message: "Account Not Linked",
        description:
          "Your OAuth account is not linked to a valid account. Please contact support to link your account.",
        canRetry: false,
      }
    case "SessionRequired":
      return {
        message: "Session Required",
        description: "You need to be signed in to access this page. Please sign in with your account.",
        canRetry: true,
      }
    case "Default":
    case "Unknown":
    default:
      return {
        message: "Authentication Error",
        description:
          description ||
          "An unexpected error occurred during authentication. Please try again or contact support if the problem persists.",
        canRetry: true,
      }
  }
}
