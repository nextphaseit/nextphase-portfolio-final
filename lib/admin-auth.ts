export interface AdminUser {
  id: string
  name: string
  email: string
  picture?: string
  role: "super_admin" | "admin" | "support"
  department: string
  permissions: AdminPermission[]
  lastLogin: string
  isActive: boolean
}

export interface AdminPermission {
  resource: string
  actions: string[]
}

// NextPhase IT specific admin configuration
export const NEXTPHASE_ADMIN_CONFIG = {
  allowedDomain: "nextphaseit.org",
  allowedTenantId: "your-nextphase-tenant-id",
  adminRoles: {
    super_admin: {
      name: "Super Administrator",
      permissions: ["*"], // All permissions
      description: "Full system access and tenant management",
    },
    admin: {
      name: "Administrator",
      permissions: [
        "analytics.view",
        "reports.generate",
        "reports.export",
        "tenants.view",
        "tenants.edit",
        "settings.manage",
        "users.manage",
        "audit.view",
      ],
      description: "Administrative access with tenant management",
    },
    support: {
      name: "Support Specialist",
      permissions: ["analytics.view", "reports.view", "tenants.view", "tickets.manage", "users.view"],
      description: "Support-focused access with limited admin features",
    },
  },
}

// Admin users configuration - in production, this would come from a database
export const NEXTPHASE_ADMIN_USERS: Record<string, AdminUser> = {
  "adrian.knight@nextphaseit.org": {
    id: "admin-001",
    name: "Adrian Knight",
    email: "adrian.knight@nextphaseit.org",
    picture: "/placeholder.svg?height=40&width=40&text=AK",
    role: "super_admin",
    department: "Executive",
    permissions: [{ resource: "*", actions: ["*"] }],
    lastLogin: "2024-01-28 14:30:00",
    isActive: true,
  },
  "admin@nextphaseit.org": {
    id: "admin-002",
    name: "System Administrator",
    email: "admin@nextphaseit.org",
    picture: "/placeholder.svg?height=40&width=40&text=SA",
    role: "admin",
    department: "IT Operations",
    permissions: [
      { resource: "analytics", actions: ["view"] },
      { resource: "reports", actions: ["generate", "export"] },
      { resource: "tenants", actions: ["view", "edit"] },
      { resource: "settings", actions: ["manage"] },
      { resource: "users", actions: ["manage"] },
      { resource: "audit", actions: ["view"] },
    ],
    lastLogin: "2024-01-27 09:15:00",
    isActive: true,
  },
  "support@nextphaseit.org": {
    id: "admin-003",
    name: "Support Team",
    email: "support@nextphaseit.org",
    picture: "/placeholder.svg?height=40&width=40&text=ST",
    role: "support",
    department: "Customer Support",
    permissions: [
      { resource: "analytics", actions: ["view"] },
      { resource: "reports", actions: ["view"] },
      { resource: "tenants", actions: ["view"] },
      { resource: "tickets", actions: ["manage"] },
      { resource: "users", actions: ["view"] },
    ],
    lastLogin: "2024-01-26 16:45:00",
    isActive: true,
  },
}

export function isNextPhaseAdmin(email: string): boolean {
  const domain = email.split("@")[1]
  return domain === NEXTPHASE_ADMIN_CONFIG.allowedDomain && email in NEXTPHASE_ADMIN_USERS
}

export function getAdminUser(email: string): AdminUser | null {
  if (!isNextPhaseAdmin(email)) return null
  return NEXTPHASE_ADMIN_USERS[email] || null
}

export function hasPermission(user: AdminUser, resource: string, action: string): boolean {
  // Super admin has all permissions
  if (user.role === "super_admin") return true

  return user.permissions.some((permission) => {
    if (permission.resource === "*") return true
    if (permission.resource === resource) {
      return permission.actions.includes("*") || permission.actions.includes(action)
    }
    return false
  })
}

export function canAccessAdminPortal(email: string): boolean {
  return isNextPhaseAdmin(email)
}

export interface TenantAnalytics {
  tenantId: string
  tenantName: string
  domain: string
  activeUsers: number
  totalTickets: number
  openTickets: number
  resolvedTickets: number
  avgResolutionTime: number
  lastActivity: string
  supportCategories: { category: string; count: number }[]
  monthlyTickets: { month: string; count: number }[]
}

// Mock analytics data - in production, this would come from your analytics service
export function getTenantAnalytics(): TenantAnalytics[] {
  return [
    {
      tenantId: "nextphase-it",
      tenantName: "NextPhase IT",
      domain: "nextphaseit.org",
      activeUsers: 12,
      totalTickets: 156,
      openTickets: 23,
      resolvedTickets: 133,
      avgResolutionTime: 4.2,
      lastActivity: "2024-01-28 14:30:00",
      supportCategories: [
        { category: "Email Issues", count: 45 },
        { category: "SharePoint", count: 32 },
        { category: "Network", count: 28 },
        { category: "Software", count: 25 },
        { category: "Hardware", count: 15 },
        { category: "Security", count: 11 },
      ],
      monthlyTickets: [
        { month: "Oct", count: 18 },
        { month: "Nov", count: 22 },
        { month: "Dec", count: 31 },
        { month: "Jan", count: 28 },
      ],
    },
    {
      tenantId: "example-corp",
      tenantName: "Example Corporation",
      domain: "example.com",
      activeUsers: 45,
      totalTickets: 289,
      openTickets: 12,
      resolvedTickets: 277,
      avgResolutionTime: 2.8,
      lastActivity: "2024-01-28 11:15:00",
      supportCategories: [
        { category: "Software", count: 78 },
        { category: "Email Issues", count: 65 },
        { category: "Network", count: 52 },
        { category: "Hardware", count: 41 },
        { category: "SharePoint", count: 35 },
        { category: "Security", count: 18 },
      ],
      monthlyTickets: [
        { month: "Oct", count: 42 },
        { month: "Nov", count: 38 },
        { month: "Dec", count: 51 },
        { month: "Jan", count: 45 },
      ],
    },
    {
      tenantId: "demo-company",
      tenantName: "Demo Company",
      domain: "demo.com",
      activeUsers: 8,
      totalTickets: 67,
      openTickets: 5,
      resolvedTickets: 62,
      avgResolutionTime: 6.1,
      lastActivity: "2024-01-27 16:22:00",
      supportCategories: [
        { category: "Email Issues", count: 18 },
        { category: "Software", count: 15 },
        { category: "Network", count: 12 },
        { category: "Hardware", count: 10 },
        { category: "SharePoint", count: 8 },
        { category: "Security", count: 4 },
      ],
      monthlyTickets: [
        { month: "Oct", count: 8 },
        { month: "Nov", count: 12 },
        { month: "Dec", count: 19 },
        { month: "Jan", count: 15 },
      ],
    },
  ]
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: string
  resource: string
  details: string
  ipAddress: string
  userAgent: string
  tenantId?: string
}

// Mock audit log data
export function getAuditLog(): AuditLogEntry[] {
  return [
    {
      id: "audit-001",
      timestamp: "2024-01-28 14:30:00",
      userId: "admin-001",
      userName: "Adrian Knight",
      action: "UPDATE",
      resource: "tenant_settings",
      details: "Updated branding settings for Example Corporation",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      tenantId: "example-corp",
    },
    {
      id: "audit-002",
      timestamp: "2024-01-28 11:15:00",
      userId: "admin-002",
      userName: "System Administrator",
      action: "CREATE",
      resource: "user_account",
      details: "Created new admin account for support team",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: "audit-003",
      timestamp: "2024-01-27 16:45:00",
      userId: "admin-001",
      userName: "Adrian Knight",
      action: "EXPORT",
      resource: "analytics_report",
      details: "Exported monthly analytics report for all tenants",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: "audit-004",
      timestamp: "2024-01-27 09:30:00",
      userId: "admin-003",
      userName: "Support Team",
      action: "VIEW",
      resource: "tenant_analytics",
      details: "Viewed analytics dashboard for Demo Company",
      ipAddress: "192.168.1.102",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      tenantId: "demo-company",
    },
    {
      id: "audit-005",
      timestamp: "2024-01-26 14:20:00",
      userId: "admin-002",
      userName: "System Administrator",
      action: "UPDATE",
      resource: "notification_settings",
      details: "Updated default notification preferences for NextPhase IT",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      tenantId: "nextphase-it",
    },
  ]
}
