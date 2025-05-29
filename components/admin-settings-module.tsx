"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Settings, Save, RotateCcw, Shield, Bell, Users } from "lucide-react"
import { TENANT_CONFIGS } from "@/lib/tenant-config"

export default function AdminSettingsModule() {
  const [selectedTenant, setSelectedTenant] = useState<string>("all")
  const [settings, setSettings] = useState({
    defaultNotifications: {
      email: true,
      sms: false,
      push: true,
    },
    sessionTimeout: 480,
    maxLoginAttempts: 5,
    twoFactorRequired: false,
    autoAssignTickets: true,
    maintenanceMode: false,
  })

  const tenants = Object.values(TENANT_CONFIGS)

  const saveSettings = () => {
    console.log("Saving settings:", settings)
    alert("Settings would be saved to the database")
  }

  const resetToDefaults = () => {
    setSettings({
      defaultNotifications: {
        email: true,
        sms: false,
        push: true,
      },
      sessionTimeout: 480,
      maxLoginAttempts: 5,
      twoFactorRequired: false,
      autoAssignTickets: true,
      maintenanceMode: false,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Admin Settings</h2>
          <p className="text-gray-400">Configure tenant settings and system preferences</p>
        </div>
      </div>

      {/* Tenant Selection */}
      <CardWrapper>
        <div className="flex items-center gap-3 mb-4">
          <Settings className="text-primary" size={20} />
          <h3 className="text-lg font-semibold">Tenant Configuration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Tenant</label>
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">Global Settings</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} ({tenant.domain})
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardWrapper>

      {/* Notification Settings */}
      <CardWrapper>
        <div className="flex items-center gap-3 mb-4">
          <Bell className="text-primary" size={20} />
          <h3 className="text-lg font-semibold">Default Notification Settings</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.defaultNotifications.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultNotifications: { ...settings.defaultNotifications, email: e.target.checked },
                })
              }
              className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
            />
            <span>Email notifications enabled by default</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.defaultNotifications.sms}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultNotifications: { ...settings.defaultNotifications, sms: e.target.checked },
                })
              }
              className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
            />
            <span>SMS notifications enabled by default</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.defaultNotifications.push}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultNotifications: { ...settings.defaultNotifications, push: e.target.checked },
                })
              }
              className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
            />
            <span>Push notifications enabled by default</span>
          </label>
        </div>
      </CardWrapper>

      {/* Security Settings */}
      <CardWrapper>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-primary" size={20} />
          <h3 className="text-lg font-semibold">Security Settings</h3>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Login Attempts</label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.twoFactorRequired}
                onChange={(e) => setSettings({ ...settings, twoFactorRequired: e.target.checked })}
                className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
              />
              <span>Require two-factor authentication for all users</span>
            </label>
          </div>
        </div>
      </CardWrapper>

      {/* System Settings */}
      <CardWrapper>
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-primary" size={20} />
          <h3 className="text-lg font-semibold">System Settings</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.autoAssignTickets}
              onChange={(e) => setSettings({ ...settings, autoAssignTickets: e.target.checked })}
              className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
            />
            <span>Auto-assign tickets to available technicians</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
            />
            <span className="text-yellow-400">Enable maintenance mode (disables public access)</span>
          </label>
        </div>
      </CardWrapper>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">
          <Save size={16} className="mr-2" />
          Save Settings
        </Button>
        <Button onClick={resetToDefaults} variant="outline">
          <RotateCcw size={16} className="mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
