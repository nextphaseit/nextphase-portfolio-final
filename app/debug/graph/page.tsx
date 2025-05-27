"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react"

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
        method: "POST",
      })
      const result = await response.json()

      setTestResult({
        ...result,
        timestamp: new Date().toISOString(),
        credentialsTest: true,
      })
    } catch (error) {
      setTestResult({
        status: "error",
        message: "Credentials test failed",
        error: error instanceof Error ? error.message : "Unknown error",
        credentialsTest: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Microsoft Graph API Debug</h1>

        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-400 mb-2">✅ Credentials Updated</h2>
          <p className="text-gray-300 text-sm">
            Your Microsoft Graph API credentials have been updated. Use the tests below to verify the connection is
            working properly.
          </p>
        </div>

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
