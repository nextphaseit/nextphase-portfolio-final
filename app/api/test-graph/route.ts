import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test the Microsoft Graph API connection
    const response = await fetch("/api/m365-service-health", {
      method: "POST", // Use the health check endpoint
    })

    const result = await response.json()

    return NextResponse.json({
      status: "success",
      message: "Microsoft Graph API test completed",
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to test Microsoft Graph API",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
