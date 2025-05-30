import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get("error") || "Unknown"

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to access this resource.",
    Verification: "The verification link may have been used or is invalid.",
    Default: "An unexpected authentication error occurred.",
  }

  const message = errorMessages[error] || errorMessages.Default

  return NextResponse.json(
    {
      error,
      message,
      timestamp: new Date().toISOString(),
      status: "error",
    },
    { status: 400 },
  )
}
