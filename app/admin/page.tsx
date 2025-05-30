"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminReportsModule from "@/components/admin-reports-module"
import AdminSettingsModule from "@/components/admin-settings-module"
import AdminTenantManagement from "@/components/admin-tenant-management"
import AdminAuditModule from "@/components/admin-audit-module"
import AdminClientIntakeModule from "@/components/admin-client-intake-module"
import { BarChart3, Settings, FileText, Shield, LogOut, Building, Activity } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"

export default function AdminPortal() {
  const { data: session, status } = useSession()
  const { isAdmin, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/admin")
      return
    }

    // Check if user has @nextphaseit.org email
    if (session?.user?.email && !session.user.email.endsWith("@nextphaseit.org")) {
      router.push("/auth/error?error=AccessDenied")
      return
    }

    // Check if user is admin
    if (session?.user?.role !== "admin") {
      router.push("/auth/error?error=AccessDenied")
      return
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading admin portal...</p>
        </div>
      </div>
    )
  }

  if (!session || !session.user?.email?.endsWith("@nextphaseit.org") || !isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Shield className="text-red-500 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-4">You don't have permission to access this admin portal.</p>
          <Button onClick={() => router.push("/")} variant="outline">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="text-red-500" size={32} />
              <div>
                <h1 className="text-2xl font-bold">NextPhase IT Admin Portal</h1>
                <p className="text-sm text-gray-400">Administrative Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-gray-400">{session.user.email}</p>
              </div>
              <Button onClick={() => logout()} variant="outline" size="sm" className="flex items-center gap-2">
                <LogOut size={16} />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Activity size={16} />
              Reports
            </TabsTrigger>
            <TabsTrigger value="tenants" className="flex items-center gap-2">
              <Building size={16} />
              Tenants
            </TabsTrigger>
            <TabsTrigger value="intake" className="flex items-center gap-2">
              <FileText size={16} />
              Intake
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <Shield size={16} />
              Audit
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Tenants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-green-400">+2 this month</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Active Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-yellow-400">8 high priority</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Avg Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <p className="text-xs text-green-400">-15% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Resolution Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-green-400">+3% this month</p>
                </CardContent>
              </Card>
            </div>
            <AdminReportsModule />
          </TabsContent>

          <TabsContent value="reports">
            <AdminReportsModule />
          </TabsContent>

          <TabsContent value="tenants">
            <AdminTenantManagement />
          </TabsContent>

          <TabsContent value="intake">
            <AdminClientIntakeModule />
          </TabsContent>

          <TabsContent value="audit">
            <AdminAuditModule />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettingsModule />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
