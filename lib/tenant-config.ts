export interface TenantConfig {
  id: string
  name: string
  domain: string
  tenantId: string
  branding: {
    primaryColor: string
    secondaryColor: string
    logo: string
    favicon: string
    companyName: string
  }
  features: {
    twoFactorAuth: boolean
    passwordReset: boolean
    customThemes: boolean
    adminOverride: boolean
  }
  sharepoint: {
    siteUrl: string
    listId: string
  }
  admins: string[]
  settings: {
    sessionTimeout: number
    maxLoginAttempts: number
    passwordPolicy: {
      minLength: number
      requireSpecialChars: boolean
      requireNumbers: boolean
    }
  }
}

// Tenant configurations - in production, this would come from a database
export const TENANT_CONFIGS: Record<string, TenantConfig> = {
  "nextphaseit.org": {
    id: "nextphase-it",
    name: "NextPhase IT",
    domain: "nextphaseit.org",
    tenantId: "your-azure-tenant-id-1",
    branding: {
      primaryColor: "#1E5AA8",
      secondaryColor: "#2563eb",
      logo: "/images/nextphase-logo.png",
      favicon: "/favicon.ico",
      companyName: "NextPhase IT",
    },
    features: {
      twoFactorAuth: true,
      passwordReset: true,
      customThemes: true,
      adminOverride: true,
    },
    sharepoint: {
      siteUrl: "https://nextphaseit968.sharepoint.com",
      listId: "your-list-id",
    },
    admins: ["adrian.knight@nextphaseit.org", "admin@nextphaseit.org"],
    settings: {
      sessionTimeout: 480, // 8 hours
      maxLoginAttempts: 5,
      passwordPolicy: {
        minLength: 8,
        requireSpecialChars: true,
        requireNumbers: true,
      },
    },
  },
  "example.com": {
    id: "example-corp",
    name: "Example Corporation",
    domain: "example.com",
    tenantId: "your-azure-tenant-id-2",
    branding: {
      primaryColor: "#059669",
      secondaryColor: "#10b981",
      logo: "/placeholder.svg?height=60&width=200&text=Example+Corp",
      favicon: "/favicon.ico",
      companyName: "Example Corporation",
    },
    features: {
      twoFactorAuth: true,
      passwordReset: false, // Azure-managed passwords only
      customThemes: false,
      adminOverride: false,
    },
    sharepoint: {
      siteUrl: "https://example.sharepoint.com",
      listId: "example-list-id",
    },
    admins: ["admin@example.com", "it@example.com"],
    settings: {
      sessionTimeout: 240, // 4 hours
      maxLoginAttempts: 3,
      passwordPolicy: {
        minLength: 12,
        requireSpecialChars: true,
        requireNumbers: true,
      },
    },
  },
}

export function getTenantConfig(domain: string): TenantConfig | null {
  return TENANT_CONFIGS[domain] || null
}

export function getTenantByEmail(email: string): TenantConfig | null {
  const domain = email.split("@")[1]
  return getTenantConfig(domain)
}

export function isAdmin(email: string, tenantConfig: TenantConfig): boolean {
  return tenantConfig.admins.includes(email.toLowerCase())
}

export function canAccessTenant(userEmail: string, targetTenantId: string): boolean {
  const userTenant = getTenantByEmail(userEmail)
  if (!userTenant) return false

  // Users can access their own tenant
  if (userTenant.id === targetTenantId) return true

  // Admins with override permissions can access other tenants
  if (userTenant.features.adminOverride && isAdmin(userEmail, userTenant)) {
    return true
  }

  return false
}
