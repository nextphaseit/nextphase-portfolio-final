"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Key,
  Bell,
  Globe,
  Clock,
  Smartphone,
  Monitor,
  Edit,
  Save,
  Check,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  department: string
  preferredContact: "email" | "phone" | "teams"
  timezone: string
  language: string
  joinDate: string
  lastLogin: string
  profilePicture?: string
  isM365User: boolean
}

interface LoginHistory {
  id: string
  timestamp: string
  device: string
  location: string
  ipAddress: string
  success: boolean
}

export function AccountManagement() {
  const [activeSection, setActiveSection] = useState<"profile" | "security" | "notifications" | "history">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Mock user data - in production, this would come from your backend
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "user_123",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    department: "Marketing",
    preferredContact: "email",
    timezone: "America/New_York",
    language: "en-US",
    joinDate: "2023-06-15",
    lastLogin: "2024-01-28 14:30:00",
    profilePicture: "/placeholder.svg?height=100&width=100&text=JS",
    isM365User: true,
  })

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    ticketUpdates: true,
    maintenanceAlerts: true,
    securityAlerts: true,
    weeklyReports: false,
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    passwordLastChanged: "2024-01-15",
    sessionTimeout: 30,
  })

  // Mock login history
  const loginHistory: LoginHistory[] = [
    {
      id: "1",
      timestamp: "2024-01-28 14:30:00",
      device: "Chrome on Windows",
      location: "Clayton, NC",
      ipAddress: "192.168.1.100",
      success: true,
    },
    {
      id: "2",
      timestamp: "2024-01-27 09:15:00",
      device: "Safari on iPhone",
      location: "Clayton, NC",
      ipAddress: "192.168.1.101",
      success: true,
    },
    {
      id: "3",
      timestamp: "2024-01-26 16:45:00",
      device: "Chrome on Windows",
      location: "Clayton, NC",
      ipAddress: "192.168.1.100",
      success: true,
    },
    {
      id: "4",
      timestamp: "2024-01-25 11:20:00",
      device: "Unknown Device",
      location: "Unknown Location",
      ipAddress: "203.0.113.1",
      success: false,
    },
  ]

  const handleSaveProfile = async () => {
    setIsLoading(true)
    setMessage(null)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      setMessage({ type: "success", text: "Profile updated successfully!" })

      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    }, 1000)
  }

  const handlePasswordReset = async () => {
    setIsLoading(true)
    setMessage(null)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setMessage({
        type: "success",
        text: "Password reset email sent to your registered email address.",
      })

      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000)
    }, 1000)
  }

  const handleToggle2FA = async () => {
    setIsLoading(true)
    setMessage(null)

    // Simulate API call
    setTimeout(() => {
      setSecurity((prev) => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))
      setIsLoading(false)
      setMessage({
        type: "success",
        text: `Two-factor authentication ${!security.twoFactorEnabled ? "enabled" : "disabled"} successfully!`,
      })

      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    }, 1000)
  }

  const sections = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "security", label: "Security", icon: <Shield size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "history", label: "Login History", icon: <Clock size={16} /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Account Management</h2>
          <p className="text-gray-400">Manage your profile, security settings, and preferences</p>
        </div>

        {userProfile.isM365User && (
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
            <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="text-blue-400 text-sm">Microsoft 365 Account</span>
          </div>
        )}
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
                  src={userProfile.profilePicture || "/placeholder.svg?height=100&width=100&text=JS"}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-primary/20"
                />
                {userProfile.isM365User && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1">{userProfile.name}</h3>
              <p className="text-gray-400 mb-2">{userProfile.department}</p>
              <p className="text-sm text-gray-500">Member since {userProfile.joinDate}</p>

              {userProfile.isM365User && (
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
                    value={userProfile.name}
                    onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <User size={16} className="text-gray-400" />
                    <span>{userProfile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                  <Mail size={16} className="text-gray-400" />
                  <span>{userProfile.email}</span>
                  {userProfile.isM365User && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">M365</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {userProfile.isM365User ? "Managed by Microsoft 365" : "Contact support to change email"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <Phone size={16} className="text-gray-400" />
                    <span>{userProfile.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                {isEditing ? (
                  <select
                    value={userProfile.department}
                    onChange={(e) => setUserProfile((prev) => ({ ...prev, department: e.target.value }))}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="IT">IT</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{userProfile.department}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
                {isEditing ? (
                  <select
                    value={userProfile.preferredContact}
                    onChange={(e) => setUserProfile((prev) => ({ ...prev, preferredContact: e.target.value as any }))}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="teams">Microsoft Teams</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    {userProfile.preferredContact === "email" && <Mail size={16} className="text-gray-400" />}
                    {userProfile.preferredContact === "phone" && <Phone size={16} className="text-gray-400" />}
                    {userProfile.preferredContact === "teams" && <Monitor size={16} className="text-gray-400" />}
                    <span className="capitalize">{userProfile.preferredContact}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                {isEditing ? (
                  <select
                    value={userProfile.timezone}
                    onChange={(e) => setUserProfile((prev) => ({ ...prev, timezone: e.target.value }))}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <Globe size={16} className="text-gray-400" />
                    <span>{userProfile.timezone.replace("America/", "").replace("_", " ")}</span>
                  </div>
                )}
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
                  <span className="text-sm text-gray-400">Last changed: {security.passwordLastChanged}</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  {userProfile.isM365User
                    ? "Password is managed by Microsoft 365"
                    : "Keep your account secure with a strong password"}
                </p>
                <Button onClick={handlePasswordReset} disabled={isLoading} variant="outline" size="sm">
                  {isLoading ? "Sending..." : userProfile.isM365User ? "Reset via Microsoft" : "Change Password"}
                </Button>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Two-Factor Authentication</span>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      security.twoFactorEnabled ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {security.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3">Add an extra layer of security to your account</p>
                <Button
                  onClick={handleToggle2FA}
                  disabled={isLoading}
                  size="sm"
                  className={
                    security.twoFactorEnabled ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                  }
                >
                  {isLoading ? "Processing..." : security.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                </Button>
              </div>
            </div>
          </CardWrapper>

          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              Security Settings
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Session Timeout</span>
                  <span className="text-sm text-gray-400">{security.sessionTimeout} minutes</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">Automatically log out after period of inactivity</p>
                <select
                  value={security.sessionTimeout}
                  onChange={(e) =>
                    setSecurity((prev) => ({ ...prev, sessionTimeout: Number.parseInt(e.target.value) }))
                  }
                  className="w-full bg-black border border-primary/20 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-primary"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                  <option value={480}>8 hours</option>
                </select>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">Security Recommendations</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Enable two-factor authentication</li>
                  <li>• Use a unique, strong password</li>
                  <li>• Review login history regularly</li>
                  <li>• Keep your contact information updated</li>
                </ul>
              </div>
            </div>
          </CardWrapper>
        </div>
      )}

      {/* Notifications Section */}
      {activeSection === "notifications" && (
        <CardWrapper>
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Bell size={20} className="text-primary" />
            Notification Preferences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                  <p className="text-sm text-gray-400">
                    {key === "emailUpdates" && "Receive general updates via email"}
                    {key === "smsAlerts" && "Get urgent alerts via SMS"}
                    {key === "ticketUpdates" && "Notifications about your support tickets"}
                    {key === "maintenanceAlerts" && "Scheduled maintenance notifications"}
                    {key === "securityAlerts" && "Security-related notifications"}
                    {key === "weeklyReports" && "Weekly summary reports"}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !value }))}
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
      )}

      {/* Login History Section */}
      {activeSection === "history" && (
        <CardWrapper>
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Login History
          </h3>

          <div className="space-y-4">
            {loginHistory.map((login) => (
              <div
                key={login.id}
                className={`p-4 rounded-lg border ${
                  login.success ? "bg-gray-800/50 border-gray-700" : "bg-red-500/10 border-red-500/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${login.success ? "bg-green-400" : "bg-red-400"}`} />
                    <span className="font-medium">{login.success ? "Successful Login" : "Failed Login Attempt"}</span>
                  </div>
                  <span className="text-sm text-gray-400">{login.timestamp}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    {login.device.includes("iPhone") ? <Smartphone size={16} /> : <Monitor size={16} />}
                    <span>{login.device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{login.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>{login.ipAddress}</span>
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

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="font-medium text-blue-400 mb-2">Security Notice</h4>
            <p className="text-sm text-gray-400">
              We log all login attempts for security purposes. If you notice any suspicious activity, please contact our
              support team immediately at{" "}
              <a href="mailto:support@nextphaseit.org" className="text-primary hover:underline">
                support@nextphaseit.org
              </a>
            </p>
          </div>
        </CardWrapper>
      )}
    </div>
  )
}
