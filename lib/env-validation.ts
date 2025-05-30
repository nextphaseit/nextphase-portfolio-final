export function validateEnvironmentVariables() {
  const requiredVars = ["NEXTAUTH_SECRET", "NEXTAUTH_URL"]

  const optionalVars = ["MICROSOFT_CLIENT_ID", "MICROSOFT_CLIENT_SECRET", "MICROSOFT_TENANT_ID"]

  const missing = requiredVars.filter((varName) => !process.env[varName])
  const optional = optionalVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:", missing)
    return false
  }

  if (optional.length > 0) {
    console.warn("⚠️ Missing optional environment variables:", optional)
    console.warn("Some authentication providers may not work properly")
  }

  console.log("✅ Environment variables validated successfully")
  return true
}

export function getAuthConfig() {
  return {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    microsoftClientId: process.env.MICROSOFT_CLIENT_ID,
    microsoftClientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    microsoftTenantId: process.env.MICROSOFT_TENANT_ID || "common",
  }
}
