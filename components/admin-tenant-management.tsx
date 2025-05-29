"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Building, Edit, Eye, Plus, Users, Settings, Shield } from "lucide-react"
import { TENANT_CONFIGS } from "@/lib/tenant-config"

export default function AdminTenantManagement() {
  const [tenants] = useState(Object.values(TENANT_CONFIGS))
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null)

  const editTenant = (tenantId: string) => {
    setSelectedTenant(tenantId)
    alert(`Edit tenant configuration for ${tenantId}`)
  }

  const viewTenant = (tenantId: string) => {
    alert(`View tenant details for ${tenantId}`)
  }

  const addTenant = () => {
    alert("Add new tenant configuration modal would open")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Tenant Management</h2>
          <p className="text-gray-400">Manage tenant configurations and access</p>
        </div>
        <Button onClick={addTenant} className="bg-primary hover:bg-primary/90">
          <Plus size={16} className="mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Tenant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant) => (
          <CardWrapper key={tenant.id} className="hover:border-primary/40 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: tenant.branding.primaryColor + "20" }}
                >
                  <Building className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">{tenant.name}</h3>
                  <p className="text-sm text-gray-400">{tenant.domain}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => editTenant(tenant.id)}>
                  <Edit size={14} />
                </Button>
                <Button size="sm" variant="outline" onClick={() => viewTenant(tenant.id)}>
                  <Eye size={14} />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tenant ID:</span>
                <span className="font-mono text-xs">{tenant.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Features:</span>
                <div className="flex gap-1">
                  {tenant.features.twoFactorAuth && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-1 py-0.5 rounded">2FA</span>
                  )}
                  {tenant.features.customThemes && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded">Themes</span>
                  )}
                  {tenant.features.adminOverride && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-1 py-0.5 rounded">Admin</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Admins:</span>
                <span>{tenant.admins.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Session Timeout:</span>
                <span>{tenant.settings.sessionTimeout}min</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Button size="sm" onClick={() => editTenant(tenant.id)} className="flex-1">
                  <Settings size={12} className="mr-1" />
                  Configure
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Users size={12} className="mr-1" />
                  Users
                </Button>
              </div>
            </div>
          </CardWrapper>
        ))}
      </div>

      {/* Tenant Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Building className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-1">{tenants.length}</div>
          <div className="text-sm text-gray-400">Total Tenants</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {tenants.filter((t) => t.features.twoFactorAuth).length}
          </div>
          <div className="text-sm text-gray-400">With 2FA</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {tenants.reduce((acc, t) => acc + t.admins.length, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Admins</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Settings className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {tenants.filter((t) => t.features.customThemes).length}
          </div>
          <div className="text-sm text-gray-400">Custom Themes</div>
        </CardWrapper>
      </div>
    </div>
  )
}
