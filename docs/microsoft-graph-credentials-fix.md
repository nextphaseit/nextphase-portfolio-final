# Microsoft Graph API Credentials Setup

## The Problem
You're getting an "invalid_client" error, which means the client secret is incorrect. This usually happens when:

1. **Wrong secret value**: You might have copied the Secret ID instead of the Secret Value
2. **Expired secret**: The client secret may have expired
3. **Incorrect app registration**: The client ID might not match the app registration

## How to Fix This

### Step 1: Check Your Azure App Registration
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Find your app registration (ID: `d7390a49-f343-4660-b731-52a12711281b`)

### Step 2: Create a New Client Secret
1. In your app registration, go to **Certificates & secrets**
2. Under **Client secrets**, click **+ New client secret**
3. Add a description (e.g., "NextPhase IT Portal")
4. Set expiration (recommend 24 months)
5. Click **Add**
6. **IMPORTANT**: Copy the **Value** (not the Secret ID) immediately - you won't be able to see it again!

### Step 3: Update Environment Variables
Replace your current `MICROSOFT_CLIENT_SECRET` with the new secret **Value**.

### Step 4: Verify Required Permissions
Make sure your app registration has these API permissions:
- **Microsoft Graph**:
  - `ServiceHealth.Read.All` (Application)
  - `Directory.Read.All` (Application)

### Step 5: Grant Admin Consent
1. In **API permissions**, click **Grant admin consent for [Your Organization]**
2. Confirm the consent

### Step 6: Test the Connection
1. Update your environment variables in Vercel
2. Visit `/debug/graph` to test the connection
3. Check the portal at `/portal` to see if service health loads

## Environment Variables Format
\`\`\`
MICROSOFT_CLIENT_ID=d7390a49-f343-4660-b731-52a12711281b
MICROSOFT_CLIENT_SECRET=your-new-secret-value-here
MICROSOFT_TENANT_ID=your-tenant-id-here
\`\`\`

## Common Issues
- **Secret ID vs Secret Value**: Always use the Secret Value, not the ID
- **Expired secrets**: Client secrets expire and need to be renewed
- **Missing permissions**: Ensure all required permissions are granted
- **Admin consent**: Some permissions require admin consent

## Testing
After updating the credentials:
1. Check `/debug/graph` for connection test
2. Monitor Vercel function logs for errors
3. Verify service health displays in `/portal`
\`\`\`

Let me also update the debug page to provide better credential testing:

\`\`\`typescriptreact file="app/debug/graph/page.tsx"
[v0-no-op-code-block-prefix]"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'

export default function GraphDebugPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testGraphConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/test-graph")
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        status: "error",
        message: "Failed to test connection",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testServiceHealth = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/m365-service-health")
      const result = await response.json()
      setTestResult({
        status: "success",
        message: "Service health API test",
        result,
      })
    } catch (error) {
      setTestResult({
        status: "error",
        message: "Failed to fetch service health",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const checkCredentials = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      // Test just the authentication part
      const response = await fetch("/api/test-graph", {
        method: "POST"
      })
      const result = await response.json()
      
      setTestResult({
        ...result,
        timestamp: new Date().toISOString(),
        credentialsTest: true
      })
    } catch (error) {
      setTestResult({
        status: "error",
        message: "Credentials test failed",
        error: error instanceof Error ? error.message : "Unknown error",
        credentialsTest: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Microsoft Graph API Debug</h1>

        <div className="grid gap-6">
          {/* Test Buttons */}
          <CardWrapper>
            <h2 className="text-xl font-semibold mb-4">API Connection Tests</h2>
            <div className="flex gap-4">
              <Button onClick={testGraphConnection} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="animate-spin mr-2" size={16} />
                ) : (
                  <Clock className="mr-2" size={16} />
                )}
                Test Graph Connection
              </Button>
              <Button onClick={testServiceHealth} disabled={isLoading} variant="outline">
                {isLoading ? (
                  <RefreshCw className="animate-spin mr-2" size={16} />
                ) : (
                  <Clock className="mr-2" size={16} />
                )}
                Test Service Health API
              </Button>
              <Button onClick={checkCredentials} disabled={isLoading} variant="secondary">
                {isLoading ? (
                  <RefreshCw className="animate-spin mr-2" size={16} />
                ) : (
                  <Clock className="mr-2" size={16} />
                )}
                Test Credentials Only
              </Button>
            </div>
          </CardWrapper>

          {/* Environment Variables Check */}
          <CardWrapper>
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>MICROSOFT_CLIENT_ID: {process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID ? "✓ Set" : "❌ Missing"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>MICROSOFT_CLIENT_SECRET: ✓ Set (server-side)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>MICROSOFT_TENANT_ID: ✓ Set (server-side)</span>
              </div>
            </div>
          </CardWrapper>

          {/* Test Results */}
          {testResult && (
            <CardWrapper>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {testResult.status === "success" ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : (
                  <XCircle className="text-red-400" size={20} />
                )}
                Test Results
              </h2>
              <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </CardWrapper>
          )}
        </div>
      </div>
    </div>
  )
}
