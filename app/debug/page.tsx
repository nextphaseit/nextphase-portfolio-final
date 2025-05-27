"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createSupportTicket } from "@/app/actions/ticket"

export default function DebugPage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testTicketCreation = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const testTicket = {
        subject: "Test Ticket - Email Debug",
        priority: "medium" as const,
        description: "This is a test ticket to debug email functionality. Please ignore this ticket.",
        clientName: "Test User",
        clientEmail: "test@example.com", // Change this to your email for testing
        source: "portal" as const,
      }

      console.log("Testing ticket creation with:", testTicket)
      const response = await createSupportTicket(testTicket)
      console.log("Ticket creation response:", response)
      setResult(response)
    } catch (error) {
      console.error("Error testing ticket creation:", error)
      setResult({ success: false, message: "Error: " + error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const testEnvironmentVariables = () => {
    console.log("Environment variables check:")
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
    console.log("POWER_AUTOMATE_WEBHOOK_URL exists:", !!process.env.POWER_AUTOMATE_WEBHOOK_URL)

    // Note: We can't log the actual values for security reasons
    setResult({
      success: true,
      message: "Check console for environment variable status",
      envCheck: {
        resendApiKey: !!process.env.RESEND_API_KEY,
        powerAutomateWebhook: !!process.env.POWER_AUTOMATE_WEBHOOK_URL,
      },
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ticket System Debug</h1>

        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <Button onClick={testEnvironmentVariables} className="mb-4">
              Check Environment Variables
            </Button>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Ticket Creation</h2>
            <p className="text-gray-400 mb-4">
              This will create a test ticket and attempt to send emails. Check the console for detailed logs.
            </p>
            <Button onClick={testTicketCreation} disabled={isLoading} className="mb-4">
              {isLoading ? "Creating Test Ticket..." : "Create Test Ticket"}
            </Button>
          </div>

          {result && (
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Result</h2>
              <pre className="bg-black p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Check that RESEND_API_KEY is properly set in environment variables</li>
              <li>Verify the API key is valid and has sending permissions</li>
              <li>Check that the "from" domain (nextphaseit.org) is verified in Resend</li>
              <li>Look at browser console and server logs for detailed error messages</li>
              <li>Test with a simple email address first</li>
              <li>Verify Power Automate webhook URL is correct</li>
            </ol>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Common Issues</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>Domain not verified:</strong> nextphaseit.org must be verified in Resend dashboard
              </li>
              <li>
                <strong>API key invalid:</strong> Check the API key in Resend dashboard
              </li>
              <li>
                <strong>Rate limiting:</strong> Resend may have rate limits on free tier
              </li>
              <li>
                <strong>Spam filters:</strong> Emails might be going to spam folder
              </li>
              <li>
                <strong>Environment variables:</strong> Make sure they're deployed to Vercel
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
