import { type NextRequest, NextResponse } from "next/server"

interface GraphTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface GraphServiceIssue {
  id: string
  title: string
  service: string
  status: string
  classification: string
  severity: string
  startDateTime: string
  lastModifiedDateTime: string
  posts: Array<{
    description: { content: string }
    createdDateTime: string
  }>
  impactDescription?: string
}

// Transform Microsoft Graph API response to our format
function transformGraphResponse(graphIssues: GraphServiceIssue[]) {
  return graphIssues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    service: issue.service,
    status: mapGraphStatus(issue.status),
    description: issue.posts?.[0]?.description?.content || issue.impactDescription || "No description available",
    startTime: issue.startDateTime,
    lastUpdated: issue.lastModifiedDateTime,
    impactedFeatures: extractImpactedFeatures(issue.impactDescription || ""),
    classification: issue.classification?.toLowerCase() === "advisory" ? "advisory" : "incident",
    severity: mapGraphSeverity(issue.severity),
  }))
}

function mapGraphStatus(graphStatus: string): string {
  const statusMap: Record<string, string> = {
    investigating: "investigating",
    serviceRestored: "resolved",
    serviceDegradation: "service-degradation",
    serviceInterruption: "service-interruption",
    restoringService: "restoring-service",
    advisory: "advisory",
  }
  return statusMap[graphStatus] || "investigating"
}

function mapGraphSeverity(graphSeverity: string): "high" | "medium" | "low" {
  const severityMap: Record<string, "high" | "medium" | "low"> = {
    high: "high",
    medium: "medium",
    low: "low",
    critical: "high",
    warning: "medium",
    information: "low",
  }
  return severityMap[graphSeverity?.toLowerCase()] || "medium"
}

function extractImpactedFeatures(description: string): string[] {
  const features: string[] = []
  const commonFeatures = [
    "Email access",
    "Outlook Web App",
    "Mobile email",
    "Calendar",
    "SharePoint Online",
    "OneDrive",
    "File operations",
    "Site access",
    "Microsoft Teams",
    "Chat",
    "Meetings",
    "File sharing",
    "Calls",
    "Power Platform",
    "Power BI",
    "Power Apps",
    "Power Automate",
  ]

  commonFeatures.forEach((feature) => {
    if (description.toLowerCase().includes(feature.toLowerCase())) {
      features.push(feature)
    }
  })

  return features.length > 0 ? features : ["General functionality"]
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.MICROSOFT_CLIENT_ID
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET
  const tenantId = process.env.MICROSOFT_TENANT_ID

  if (!clientId || !clientSecret || !tenantId) {
    throw new Error("Missing Microsoft Graph API credentials. Please check environment variables.")
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  })

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })

    const responseText = await response.text()

    if (!response.ok) {
      console.error("Token request failed:", response.status, responseText)
      throw new Error(`Failed to get access token: ${responseText}`)
    }

    const tokenData: GraphTokenResponse = JSON.parse(responseText)
    console.log("Successfully obtained access token")
    return tokenData.access_token
  } catch (error) {
    console.error("Error in getAccessToken:", error)
    throw error
  }
}

async function fetchServiceHealth(accessToken: string) {
  // Try multiple endpoints in order of preference
  const endpoints = [
    "https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/issues",
    "https://graph.microsoft.com/beta/admin/serviceAnnouncement/issues",
    "https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/healthOverviews",
  ]

  let lastError: Error | null = null

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying endpoint: ${endpoint}`)

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`Success with endpoint: ${endpoint}`)
        return data
      } else {
        const errorText = await response.text()
        console.log(`Failed endpoint ${endpoint}: ${response.status} - ${errorText}`)
        lastError = new Error(`${endpoint} failed: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.log(`Error with endpoint ${endpoint}:`, error)
      lastError = error instanceof Error ? error : new Error(`Unknown error with ${endpoint}`)
    }
  }

  // If all endpoints fail, throw the last error
  throw lastError || new Error("All service health endpoints failed")
}

// Enhanced fallback data that looks more realistic
const enhancedFallbackData = [
  {
    id: "DEMO_001",
    title: "Service health monitoring active",
    service: "Microsoft Graph API",
    status: "advisory",
    description:
      "Service health monitoring is active and ready to display real-time Microsoft 365 service status. Currently showing demonstration data while API permissions are being configured.",
    startTime: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    impactedFeatures: ["Service health monitoring"],
    classification: "advisory",
    severity: "low",
  },
]

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching Microsoft 365 service health...")

    // Get access token
    const accessToken = await getAccessToken()
    console.log("Successfully obtained access token")

    // Try to fetch service health data
    const graphResponse = await fetchServiceHealth(accessToken)
    console.log(`Fetched service health data:`, graphResponse)

    // Handle different response formats
    let issues = []
    if (graphResponse.value) {
      issues = graphResponse.value
    } else if (Array.isArray(graphResponse)) {
      issues = graphResponse
    } else if (graphResponse.issues) {
      issues = graphResponse.issues
    }

    // Transform the data if we have any
    const transformedData = issues.length > 0 ? transformGraphResponse(issues) : []

    // Filter to show only active issues (not resolved)
    const activeIssues = transformedData.filter((issue) => issue.status !== "resolved")

    const response = {
      value: activeIssues.length > 0 ? activeIssues : enhancedFallbackData,
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#admin/serviceAnnouncement/issues",
      "@odata.count": activeIssues.length,
      lastFetched: new Date().toISOString(),
      source: activeIssues.length > 0 ? "microsoft-graph-api" : "demo-data",
      fallback: activeIssues.length === 0,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching M365 service health:", error)

    // Determine error type for better user messaging
    let errorMessage = "Failed to fetch real-time data"
    let isPermissionError = false

    if (error instanceof Error) {
      if (error.message.includes("UnknownError") || error.message.includes("Forbidden")) {
        errorMessage = "Microsoft Graph API permissions need to be configured"
        isPermissionError = true
      } else if (error.message.includes("invalid_client")) {
        errorMessage = "Authentication failed - please check credentials"
      }
    }

    // Return enhanced fallback data with error information
    const response = {
      value: enhancedFallbackData,
      error: errorMessage,
      fallback: true,
      permissionError: isPermissionError,
      lastFetched: new Date().toISOString(),
      source: "demo-data",
      errorDetails: error instanceof Error ? error.message : "Unknown error",
    }

    return NextResponse.json(response, { status: 200 }) // Return 200 with fallback data
  }
}

// Health check endpoint with permission testing
export async function POST(request: NextRequest) {
  try {
    const accessToken = await getAccessToken()

    // Test different endpoints to see which ones work
    const testResults = []

    const endpoints = [
      "https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/issues",
      "https://graph.microsoft.com/beta/admin/serviceAnnouncement/issues",
      "https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/healthOverviews",
    ]

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })

        testResults.push({
          endpoint,
          status: response.status,
          success: response.ok,
          error: response.ok ? null : await response.text(),
        })
      } catch (error) {
        testResults.push({
          endpoint,
          status: 0,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    return NextResponse.json({
      status: "healthy",
      message: "Microsoft Graph API connection successful",
      timestamp: new Date().toISOString(),
      endpointTests: testResults,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to Microsoft Graph API",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
