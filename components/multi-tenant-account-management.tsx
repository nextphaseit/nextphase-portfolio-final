"use client"
import { useState } from "react"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Button } from "@/components/ui/button"
import { useMultiTenantAuth } from "@/providers/multi-tenant-auth-provider"
import {
  User,
  Mail,
  Building,
  Shield,
  Bell,
  Palette,
  Save,
  RefreshCw,
  Smartphone,
  Monitor,
  Globe,
  Key,
  History,
  Settings,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"

export function MultiTenantAccountManagement() {
  const { user, currentTenant, updateProfile, updatePreferences, updateSecuritySettings } = useMultiTenantAuth()
  const [activeSection, setActiveSection] = useState<"profile" | "security" | "preferences" | "activity">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
    phone: "",
    title: "",
  })

  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: user?.securitySettings?.twoFactorEnabled || false,
    passwordLastChanged: user?.securitySettings?.passwordLastChanged || "",
    sessionTimeout: user?.securitySettings?.sessionTimeout || 480,
    trustedDevices: user?.securitySettings?.trustedDevices || [],
  })

  const [preferencesData, setPreferencesData] = useState({
    theme: user?.preferences?.theme || "dark",
    notifications: user?.preferences?.notifications || { email: true, sms: false, push: true },
    defaultTicketView: user?.preferences?.defaultTicketView || "all",
    language: user?.preferences?.language || "en-US",
    timezone: user?.preferences?.timezone || "America/New_York",
  })

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
    setIsSaving(true)
    const success = await updateProfile(profileData)
    if (success) {
      setIsEditing(false)
    }
    setIsSaving(false)
  }

  const handleSavePreferences = async () => {
    setIsSaving(true)
    const success = await updatePreferences(preferencesData)
    setIsSaving(false)
  }

  const handleSaveSecurity = async () => {
    setIsSaving(true)
    const success = await updateSecuritySettings(securityData)
    setIsSaving(false)
  }

  const toggleTwoFactor = async () => {
    if (!securityData.twoFactorEnabled) {
      // Simulate 2FA setup process
      alert("Two-factor authentication setup would be initiated here")
    }
    setSecurityData({ ...securityData, twoFactorEnabled: !securityData.twoFactorEnabled })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Account Management</h2>
          <p className="text-gray-400">Manage your profile, security settings, and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-gray-400">Organization</div>
            <div className="font-medium">{currentTenant.branding.companyName}</div>
          </div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTenant.branding.primaryColor }}></div>
        </div>
      </div>

      {/* User Overview Card */}
      <CardWrapper className="bg-primary/10 border-primary/20">
        <div className="flex items-start gap-4">
          <Image
            src={user.picture || "/placeholder.svg?height=80&width=80&text=" + user.name.charAt(0)}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  user.role === "admin" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {user.role === "admin" ? "Administrator" : "User"}
              </span>
              {user.isGlobalAdmin && (
                <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400">Global Admin</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building size={16} className="text-gray-400" />
                <span>{user.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-gray-400" />
                <span>{user.authMethod === "azure" ? "Microsoft 365" : "Local Authentication"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-gray-400" />
                <span>{currentTenant.domain}</span>
              </div>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-card/50 rounded-lg p-1">
        {[
          { id: "profile", label: "Profile", icon: <User size={16} /> },
          { id: "security", label: "Security", icon: <Shield size={16} /> },
          { id: "preferences", label: "Preferences", icon: <Settings size={16} /> },
          { id: "activity", label: "Activity", icon: <History size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === tab.id
                ? "bg-primary text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <CardWrapper>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <Button
              onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
              disabled={isSaving}
              className={isEditing ? "bg-primary hover:bg-primary/90" : ""}
              variant={isEditing ? "default" : "outline"}
            >
              {isSaving ? (
                <RefreshCw size={16} className="mr-2 animate-spin" />
              ) : isEditing ? (
                <Save size={16} className="mr-2" />
              ) : (
                <User size={16} className="mr-2" />
              )}
              {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed (managed by organization)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <input
                type="text"
                value={profileData.department}
                onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
              <input
                type="text"
                value={profileData.title}
                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                disabled={!isEditing}
                placeholder="Your job title"
                className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="Your phone number"
                className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>
          </div>
        </CardWrapper>
      )}

      {/* Security Section */}
      {activeSection === "security" && (
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <CardWrapper>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
                <p className="text-gray-400 text-sm">Add an extra layer of security to your account with 2FA</p>
              </div>
              <Button
                onClick={toggleTwoFactor}
                variant={securityData.twoFactorEnabled ? "outline" : "default"}
                className={securityData.twoFactorEnabled ? "text-green-400 border-green-400" : ""}
              >
                {securityData.twoFactorEnabled ? (
                  <>
                    <CheckCircle size={16} className="mr-2" />
                    Enabled
                  </>
                ) : (
                  <>
                    <Shield size={16} className="mr-2" />
                    Enable 2FA
                  </>
                )}
              </Button>
            </div>

            {securityData.twoFactorEnabled && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-green-400 font-medium">Two-factor authentication is enabled</span>
                </div>
                <p className="text-sm text-gray-400">
                  Your account is protected with two-factor authentication. You'll need your authenticator app to sign
                  in.
                </p>
              </div>
            )}
          </CardWrapper>

          {/* Password Management */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4">Password & Authentication</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <div className="font-medium">Password</div>
                  <div className="text-sm text-gray-400">
                    {user.authMethod === "azure"
                      ? "Managed by Microsoft 365"
                      : `Last changed: ${securityData.passwordLastChanged}`}
                  </div>
                </div>
                <Button
                  variant="outline"
                  disabled={user.authMethod === "azure"}
                  onClick={() => alert("Password change would redirect to appropriate service")}
                >
                  <Key size={16} className="mr-2" />
                  {user.authMethod === "azure" ? "Managed by Microsoft" : "Change Password"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <div className="font-medium">Session Timeout</div>
                  <div className="text-sm text-gray-400">
                    Automatically sign out after {securityData.sessionTimeout} minutes of inactivity
                  </div>
                </div>
                <select
                  value={securityData.sessionTimeout}
                  onChange={(e) =>
                    setSecurityData({ ...securityData, sessionTimeout: Number.parseInt(e.target.value) })
                  }
                  className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                >
                  <option value={60}>1 hour</option>
                  <option value={240}>4 hours</option>
                  <option value={480}>8 hours</option>
                  <option value={720}>12 hours</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSaveSecurity} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                {isSaving ? <RefreshCw size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                {isSaving ? "Saving..." : "Save Security Settings"}
              </Button>
            </div>
          </CardWrapper>
        </div>
      )}

      {/* Preferences Section */}
      {activeSection === "preferences" && (
        <div className="space-y-6">
          {/* Theme Preferences */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4">Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "light", label: "Light", icon: <Monitor size={16} /> },
                    { value: "dark", label: "Dark", icon: <Monitor size={16} /> },
                    { value: "auto", label: "Auto", icon: <Palette size={16} /> },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => setPreferencesData({ ...preferencesData, theme: theme.value as any })}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                        preferencesData.theme === theme.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      {theme.icon}
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardWrapper>

          {/* Notification Preferences */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-400" />
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-400">Receive updates via email</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferencesData.notifications.email}
                    onChange={(e) =>
                      setPreferencesData({
                        ...preferencesData,
                        notifications: { ...preferencesData.notifications, email: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-gray-400" />
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-gray-400">Receive updates via text message</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferencesData.notifications.sms}
                    onChange={(e) =>
                      setPreferencesData({
                        ...preferencesData,
                        notifications: { ...preferencesData.notifications, sms: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-gray-400" />
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-gray-400">Receive browser notifications</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferencesData.notifications.push}
                    onChange={(e) =>
                      setPreferencesData({
                        ...preferencesData,
                        notifications: { ...preferencesData.notifications, push: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </CardWrapper>

          {/* Portal Preferences */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4">Portal Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Default Ticket View</label>
                <select
                  value={preferencesData.defaultTicketView}
                  onChange={(e) => setPreferencesData({ ...preferencesData, defaultTicketView: e.target.value as any })}
                  className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                >
                  <option value="all">All Tickets</option>
                  <option value="open">Open Tickets</option>
                  <option value="assigned">Assigned to Me</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                <select
                  value={preferencesData.timezone}
                  onChange={(e) => setPreferencesData({ ...preferencesData, timezone: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSavePreferences} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                {isSaving ? <RefreshCw size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                {isSaving ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </CardWrapper>
        </div>
      )}

      {/* Activity Section */}
      {activeSection === "activity" && (
        <div className="space-y-6">
          {/* Login History */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4">Recent Login Activity</h3>
            <div className="space-y-3">
              {user.loginHistory?.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${entry.success ? "bg-green-400" : "bg-red-400"}`}></div>
                    <div>
                      <div className="font-medium">{entry.device}</div>
                      <div className="text-sm text-gray-400">{entry.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{entry.timestamp}</div>
                    <div className="text-xs text-gray-400">{entry.ipAddress}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardWrapper>

          {/* Account Summary */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4">Account Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {user.loginHistory?.filter((entry) => entry.success).length || 0}
                </div>
                <div className="text-sm text-gray-400">Successful Logins</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {user.securitySettings?.twoFactorEnabled ? "Yes" : "No"}
                </div>
                <div className="text-sm text-gray-400">2FA Enabled</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-1">{currentTenant.domain}</div>
                <div className="text-sm text-gray-400">Organization</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {user.authMethod === "azure" ? "SSO" : "Local"}
                </div>
                <div className="text-sm text-gray-400">Auth Method</div>
              </div>
            </div>
          </CardWrapper>
        </div>
      )}
    </div>
  )
}
