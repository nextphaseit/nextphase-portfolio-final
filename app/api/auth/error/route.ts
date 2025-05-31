import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const error = searchParams.get("error") || "Unknown"

    const errorMessages: Record<string, string> = {
      Configuration: "There is a problem with the server configuration.",
      AccessDenied: "You do not have permission to access this resource.",
      Verification: "The verification link may have been used or is invalid.",
      OAuthSignin: "Error in constructing an authorization URL.",
      OAuthCallback: "Error in handling the response from an OAuth provider.",
      OAuthCreateAccount: "Could not create OAuth provider user in the database.",
      EmailCreateAccount: "Could not create email provider user in the database.",
      Callback: "Error in the OAuth callback handler route.",
      OAuthAccountNotLinked: "The email on the account is already linked, but not with this OAuth account.",
      SessionRequired: "The content of this page requires you to be signed in at all times.",
      Default: "An unexpected authentication error occurred.",
    }

    const message = errorMessages[error] || errorMessages.Default

    console.log(`[NextAuth Error API] Error: ${error}, Message: ${message}`)

    return NextResponse.json(
      {
        error,
        message,
        timestamp: new Date().toISOString(),
        status: "error",
      },
      { status: 400 },
    )
  } catch (err: any) {
    console.error("[NextAuth Error API] Unexpected error:", err)

    return NextResponse.json(
      {
        error: "InternalError",
        message: "An internal server error occurred while processing the authentication error.",
        detail: err.message || "Unknown internal error",
        timestamp: new Date().toISOString(),
        status: "error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  // Handle POST requests the same way as GET
  return GET(request)
}
