"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import {
  User,
  Mail,
  MapPin,
  Shield,
  Key,
  Bell,
  Clock,
  Smartphone,
  Monitor,
  Edit,
  Save,
  Check,
  AlertCircle,
  Building,
  Settings,
  Palette,
  Users,
  Eye,
} from "lucide-react"
import Image from "next/image"
import { useMultiTenantAuth } from "@/providers/multi-tenant-auth-provider"

export function MultiTenantAccountManagement() {
  const {
    user,
    currentTenant,
    isAdmin,
    isGlobalAdmin,
    updateProfile,
    updatePreferences,
    updateSecuritySettings,
    switchTenant,
  } = useMultiTenantAuth()

  const [activeSection, setActiveSection] = useState<"profile" | "security" | "preferences" | "admin">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  if (!user || !currentTenant) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={64} className="mx-auto mb-4 text-gray-600" />
        <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
        <p className="text-gray-400">Please log in to access account management.</p>
      </div>
    )
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    setMessage(null)

    const success = await updateProfile(user)

    setIsLoading(false)
    setIsEditing(false)
    setMessage({
      type: success ? "success" : "error",
      text: success ? "Profile updated successfully!" : "Failed to update profile",
    })

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000)
  }

  const handleUpdatePreferences = async (newPreferences: any) => {
    setIsLoading(true)
    setMessage(null)

    const success = await updatePreferences(newPreferences)

    setIsLoading(false)
    setMessage({
      type: success ? "success" : "error",
      text: success ? "Preferences updated successfully!" : "Failed to update preferences",
    })

    setTimeout(() => setMessage(null), 3000)
  }

  const handleToggle2FA = async () => {
    if (!user.securitySettings) return

    setIsLoading(true)
    setMessage(null)

    const newSettings = {
      ...user.securitySettings,
      twoFactorEnabled: !user.securitySettings.twoFactorEnabled,
    }

    const success = await updateSecuritySettings(newSettings)

    setIsLoading(false)
    setMessage({
      type: success ? "success" : "error",
      text: success
        ? `Two-factor authentication ${newSettings.twoFactorEnabled ? "enabled" : "disabled"} successfully!`
        : "Failed to update security settings",
    })

    setTimeout(() => setMessage(null), 3000)
  }

  const sections = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "security", label: "Security", icon: <Shield size={16} /> },
    { id: "preferences", label: "Preferences", icon: <Settings size={16} /> },
    ...(isAdmin ? [{ id: "admin", label: "Admin", icon: <Users size={16} /> }] : []),
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Account Management</h2>
          <p className="text-gray-400">Manage your profile, security settings, and preferences</p>
        </div>

        {/* Tenant Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
            <Building className="text-primary" size={16} />
            <div className="text-sm">
              <div className="text-primary font-medium">{currentTenant.branding.companyName}</div>
              <div className="text-gray-400">{currentTenant.domain}</div>
            </div>
          </div>

          {user.authMethod === "azure" && (
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
              <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="text-blue-400 text-sm">Microsoft 365</span>
            </div>
          )}

          {isGlobalAdmin && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <Shield className="text-red-400" size={16} />
              <span className="text-red-400 text-sm">Global Admin</span>
            </div>
          )}
        </div>
      </div>

      {/* Global Message */}
      {message && (
        <div
          className={`p-4 rounded-lg border flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message.type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-card/50 rounded-lg p-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === section.id ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture & Basic Info */}
          <CardWrapper className="lg:col-span-1">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <Image
                  src={user.picture || "/placeholder.svg?height=100&width=100&text=" + user.name.charAt(0)}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-primary/20"
                />
                {user.authMethod === "azure" && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
              <p className="text-gray-400 mb-2">{user.department}</p>
              <p className="text-sm text-gray-500">
                {user.role === "admin" ? "Administrator" : "User"} • {currentTenant.branding.companyName}
              </p>

              {user.authMethod === "azure" && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    This account is managed by Microsoft 365. Some settings may be controlled by your organization.
                  </p>
                </div>
              )}
            </div>
          </CardWrapper>

          {/* Profile Details */}
          <CardWrapper className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <Button
                onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isEditing ? (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => updateProfile({ ...user, name: e.target.value })}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <User size={16} className="text-gray-400" />
                    <span>{user.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                  <Mail size={16} className="text-gray-400" />
                  <span>{user.email}</span>
                  {user.authMethod === "azure" && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">M365</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {user.authMethod === "azure" ? "Managed by Microsoft 365" : "Contact support to change email"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                {isEditing ? (
                  <select
                    value={user.department}
                    onChange={(e) => updateProfile({ ...user, department: e.target.value })}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="IT Department">IT Department</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{user.department}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                  <Shield size={16} className="text-gray-400" />
                  <span className="capitalize">{user.role}</span>
                  {isGlobalAdmin && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Global</span>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                <Button onClick={handleSaveProfile} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            )}
          </CardWrapper>
        </div>
      )}

      {/* Security Section */}
      {activeSection === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Key size={20} className="text-primary" />
              Password & Authentication
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Password</span>
                  <span className="text-sm text-gray-400">
                    Last changed: {user.securitySettings?.passwordLastChanged || "Unknown"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  {user.authMethod === "azure"
                    ? "Password is managed by Microsoft 365"
                    : "Keep your account secure with a strong password"}
                </p>
                <Button disabled={user.authMethod === "azure"} variant="outline" size="sm">
                  {user.authMethod === "azure" ? "Managed by Microsoft" : "Change Password"}
                </Button>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Two-Factor Authentication</span>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      user.securitySettings?.twoFactorEnabled
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.securitySettings?.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3">Add an extra layer of security to your account</p>
                <Button
                  onClick={handleToggle2FA}
                  disabled={isLoading || !currentTenant.features.twoFactorAuth}
                  size="sm"
                  className={
                    user.securitySettings?.twoFactorEnabled
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }
                >
                  {isLoading ? "Processing..." : user.securitySettings?.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                </Button>
                {!currentTenant.features.twoFactorAuth && (
                  <p className="text-xs text-gray-500 mt-2">Not available for this organization</p>
                )}
              </div>
            </div>
          </CardWrapper>

          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Login History
            </h3>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {user.loginHistory?.map((login) => (
                <div
                  key={login.id}
                  className={`p-4 rounded-lg border ${
                    login.success ? "bg-gray-800/50 border-gray-700" : "bg-red-500/10 border-red-500/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${login.success ? "bg-green-400" : "bg-red-400"}`} />
                      <span className="font-medium">{login.success ? "Successful Login" : "Failed Login"}</span>
                    </div>
                    <span className="text-sm text-gray-400">{login.timestamp}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      {login.device.includes("iPhone") ? <Smartphone size={16} /> : <Monitor size={16} />}
                      <span>{login.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{login.location}</span>
                    </div>
                  </div>

                  {!login.success && (
                    <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
                      <AlertCircle size={14} className="inline mr-2" />
                      If this wasn't you, please contact support immediately.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardWrapper>
        </div>
      )}

      {/* Preferences Section */}
      {activeSection === "preferences" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Bell size={20} className="text-primary" />
              Notification Preferences
            </h3>

            <div className="space-y-4">
              {user.preferences &&
                Object.entries(user.preferences.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h4 className="font-medium capitalize">{key} Notifications</h4>
                      <p className="text-sm text-gray-400">
                        {key === "email" && "Receive notifications via email"}
                        {key === "sms" && "Get urgent alerts via SMS"}
                        {key === "push" && "Browser push notifications"}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newNotifications = { ...user.preferences!.notifications, [key]: !value }
                        handleUpdatePreferences({ ...user.preferences!, notifications: newNotifications })
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? "bg-primary" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
            </div>
          </CardWrapper>

          <CardWrapper>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Palette size={20} className="text-primary" />
              Display Preferences
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {["light", "dark", "auto"].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => {
                        if (user.preferences) {
                          handleUpdatePreferences({ ...user.preferences, theme: theme as any })
                        }
                      }}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        user.preferences?.theme === theme
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-gray-800/50 border-gray-700 text-gray-400 hover:text-white"
                      }`}
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Default Ticket View</label>
                <select
                  value={user.preferences?.defaultTicketView || "all"}
                  onChange={(e) => {
                    if (user.preferences) {
                      handleUpdatePreferences({ ...user.preferences, defaultTicketView: e.target.value as any })
                    }
                  }}
                  className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="all">All Tickets</option>
                  <option value="open">Open Tickets Only</option>
                  <option value="assigned">Assigned to Me</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Timezone</label>
                <select
                  value={user.preferences?.timezone || "America/New_York"}
                  onChange={(e) => {
                    if (user.preferences) {
                      handleUpdatePreferences({ ...user.preferences, timezone: e.target.value })
                    }
                  }}
                  className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
            </div>
          </CardWrapper>
        </div>
      )}

      {/* Admin Section */}
      {activeSection === "admin" && isAdmin && (
        <div className="space-y-6">
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Users size={20} className="text-primary" />
              Administrative Controls
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Tenant Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Organization:</span>
                    <span>{currentTenant.branding.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Domain:</span>
                    <span>{currentTenant.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tenant ID:</span>
                    <span className="font-mono text-xs">{currentTenant.id}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold mb-2">Features</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Auth</span>
                    <span className={currentTenant.features.twoFactorAuth ? "text-green-400" : "text-red-400"}>
                      {currentTenant.features.twoFactorAuth ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Password Reset</span>
                    <span className={currentTenant.features.passwordReset ? "text-green-400" : "text-red-400"}>
                      {currentTenant.features.passwordReset ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Admin Override</span>
                    <span className={currentTenant.features.adminOverride ? "text-green-400" : "text-red-400"}>
                      {currentTenant.features.adminOverride ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold mb-2">Settings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Session Timeout:</span>
                    <span>{currentTenant.settings.sessionTimeout} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Login Attempts:</span>
                    <span>{currentTenant.settings.maxLoginAttempts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Min Password Length:</span>
                    <span>{currentTenant.settings.passwordPolicy.minLength}</span>
                  </div>
                </div>
              </div>
            </div>

            {isGlobalAdmin && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-3">Global Admin Actions</h4>
                <p className="text-sm text-gray-400 mb-4">
                  As a global administrator, you can access cross-tenant functionality and manage multiple
                  organizations.
                </p>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                    <Eye size={14} className="mr-2" />
                    View All Tenants
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                    <Users size={14} className="mr-2" />
                    Manage Users
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                    <Settings size={14} className="mr-2" />
                    System Settings
                  </Button>
                </div>
              </div>
            )}
          </CardWrapper>

          <CardWrapper>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              Security & Compliance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Recent Admin Actions</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">User Role Updated</span>
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                    <p className="text-xs text-gray-400">Changed user@example.com to admin role</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Security Settings Modified</span>
                      <span className="text-xs text-gray-400">1 day ago</span>
                    </div>
                    <p className="text-xs text-gray-400">Updated session timeout to 8 hours</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Tenant Configuration Updated</span>
                      <span className="text-xs text-gray-400">3 days ago</span>
                    </div>
                    <p className="text-xs text-gray-400">Modified branding settings</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Compliance Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-sm">Data Encryption</span>
                    <span className="text-green-400 text-sm">✓ Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-sm">Audit Logging</span>
                    <span className="text-green-400 text-sm">✓ Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-sm">Access Controls</span>
                    <span className="text-green-400 text-sm">✓ Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <span className="text-sm">Backup Verification</span>
                    <span className="text-yellow-400 text-sm">⚠ Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </CardWrapper>
        </div>
      )}
    </div>
  )
}
