"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupportTicket } from "@/app/actions/ticket"

export default function DebugPage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testEmail, setTestEmail] = useState("test@example.com")

  const testTicketCreation = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const testTicket = {
        subject: "Test Ticket - Email Debug",
        priority: "medium" as const,
        description: "This is a test ticket to debug email functionality. Please ignore this ticket.",
        clientName: "Test User",
        clientEmail: testEmail,
        source: "portal" as const,
      }

      console.log("Testing ticket creation with:", testTicket)
      const response = await createSupportTicket(testTicket)
      console.log("Ticket creation response:", response)
      setResult(response)
    } catch (error) {
      console.error("Error testing ticket creation:", error)
      setResult({ success: false, message: "Error: " + (error as Error).message })
    } finally {
      setIsLoading(false)
    }
  }

  const checkEnvironmentVariables = () => {
    console.log("Checking environment variables...")

    // We can't access server environment variables from client
    // But we can test the server action
    setResult({
      success: true,
      message: "Environment variables are checked server-side. Create a test ticket to verify they're working.",
      note: "Check the browser console for detailed logs when creating a ticket.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🔧 Ticket System Debug
          </h1>

          <div className="grid gap-6">
            {/* Environment Variables Check */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Environment Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Check if the required environment variables are properly configured.
                </p>
                <Button onClick={checkEnvironmentVariables} className="bg-blue-600 hover:bg-blue-700">
                  Check Environment Variables
                </Button>
              </CardContent>
            </Card>

            {/* Test Ticket Creation */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-green-400">Test Ticket Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Create a test ticket and attempt to send emails. Check the console for detailed logs.
                </p>

                <div className="mb-4">
                  <label htmlFor="testEmail" className="block text-sm font-medium text-gray-300 mb-2">
                    Test Email Address:
                  </label>
                  <input
                    type="email"
                    id="testEmail"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email to receive test confirmation"
                  />
                </div>

                <Button
                  onClick={testTicketCreation}
                  disabled={isLoading || !testEmail}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? "Creating Test Ticket..." : "Create Test Ticket"}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-yellow-400">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`p-4 rounded-lg ${result.success ? "bg-green-900/50 border border-green-500" : "bg-red-900/50 border border-red-500"}`}
                  >
                    <pre className="text-sm overflow-auto whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Troubleshooting Guide */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Troubleshooting Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>
                    Check that <code className="bg-gray-700 px-2 py-1 rounded">RESEND_API_KEY</code> is properly set in
                    Vercel environment variables
                  </li>
                  <li>Verify the API key is valid and has sending permissions in Resend dashboard</li>
                  <li>
                    Check that the domain <code className="bg-gray-700 px-2 py-1 rounded">nextphaseit.org</code> is
                    verified in Resend
                  </li>
                  <li>Look at browser console (F12) for detailed error messages</li>
                  <li>Check spam/junk folder for test emails</li>
                  <li>
                    Verify <code className="bg-gray-700 px-2 py-1 rounded">POWER_AUTOMATE_WEBHOOK_URL</code> is correct
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Common Issues */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-red-400">Common Issues & Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-300">Domain not verified</h4>
                    <p className="text-gray-400">
                      Solution: Verify <code>nextphaseit.org</code> in your Resend dashboard
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-300">API key invalid</h4>
                    <p className="text-gray-400">
                      Solution: Generate a new API key in Resend dashboard and update environment variables
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-300">Rate limiting</h4>
                    <p className="text-gray-400">Solution: Resend free tier has limits. Wait or upgrade plan</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-300">Emails in spam</h4>
                    <p className="text-gray-400">Solution: Check spam/junk folder, add sender to contacts</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-300">Environment variables not deployed</h4>
                    <p className="text-gray-400">Solution: Redeploy after adding environment variables in Vercel</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400">How to Use This Debug Page</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>Step 1:</strong> Enter your email address in the test field above
                  </p>
                  <p>
                    <strong>Step 2:</strong> Click "Create Test Ticket" to test the system
                  </p>
                  <p>
                    <strong>Step 3:</strong> Open browser console (F12 → Console) to see detailed logs
                  </p>
                  <p>
                    <strong>Step 4:</strong> Check your email inbox (and spam folder) for confirmation
                  </p>
                  <p>
                    <strong>Step 5:</strong> Review the results displayed on this page
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
