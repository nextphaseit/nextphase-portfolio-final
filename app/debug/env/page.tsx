export default function EnvDebugPage() {
  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return <div>Not available in production</div>
  }

  const envVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "✅ Set" : "❌ Missing",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Missing",
    MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID ? "✅ Set" : "❌ Missing",
    MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET ? "✅ Set" : "❌ Missing",
    MICROSOFT_TENANT_ID: process.env.MICROSOFT_TENANT_ID ? "✅ Set" : "❌ Missing",
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="space-y-2">
        {Object.entries(envVars).map(([key, status]) => (
          <div key={key} className="flex justify-between">
            <span className="font-mono">{key}:</span>
            <span>{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
