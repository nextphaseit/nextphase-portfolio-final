"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { useAuth } from "@/providers/auth-provider"
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  CheckCircle,
  Settings,
  Bell,
  Lock,
  Key,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react"

interface UserProfile {
  id: string
  fullName: string
  email: string
  phone: string
  department: string
  jobTitle: string
  company: string
  preferredContact: "email" | "phone" | "teams"
  timezone: string
  language: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  lastLogin: string
  accountCreated: string
  profilePicture?: string
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  loginHistory: Array<{
    date: string
    location: string
    device: string
    success: boolean
  }>
}

export function AccountManagement() {
  const { user, isAuthenticated } = useAuth()
  const [activeSection, setActiveSection] = useState<"profile" | "security" | "preferences">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Mock user profile data - in production, this would come from your backend
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: user?.id || "user-123",
    fullName: user?.name || "John Smith",
    email: user?.email || "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    department: user?.department || "Marketing",
    jobTitle: "Marketing Manager",
    company: "Acme Corporation",
    preferredContact: "email",
    timezone: "America/New_York",
    language: "English (US)",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    lastLogin: "2024-01-28 09:15 AM",
    accountCreated: "2023-06-15",
    profilePicture: user?.picture,
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    lastPasswordChange: "2023-12-15",
    loginHistory: [
      {
        date: "2024-01-28 09:15 AM",
        location: "Clayton, NC",
        device: "Chrome on Windows",
        success: true,
      },
      {
        date: "2024-01-27 02:30 PM",
        location: "Clayton, NC",
        device: "Safari on iPhone",
        success: true,
      },
      {
        date: "2024-01-26 10:45 AM",
        location: "Raleigh, NC",
        device: "Chrome on Windows",
        success: true,
      },
      {
        date: "2024-01-25 08:20 AM",
        location: "Unknown Location",
        device: "Chrome on Linux",
        success: false,
      },
    ],
  })

  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (user) {
      setUserProfile((prev) => ({
        ...prev,
        fullName: user.name,
        email: user.email,
        department: user.department || prev.department,
        profilePicture: user.picture,
      }))
      setEditedProfile((prev) => ({
        ...prev,
        fullName: user.name,
        email: user.email,
        department: user.department || prev.department,
        profilePicture: user.picture,
      }))
    }
  }, [user])

  const handleSaveProfile = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setUserProfile(editedProfile)
    setIsEditing(false)
    setIsLoading(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancelEdit = () => {
    setEditedProfile(userProfile)
    setIsEditing(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSecuritySettings((prev) => ({
      ...prev,
      lastPasswordChange: new Date().toISOString().split("T")[0],
    }))

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setShowPasswordForm(false)
    setIsLoading(false)
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const toggleTwoFactor = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSecuritySettings((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }))

    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Shield size={64} className="mx-auto mb-4 text-gray-600" />
        <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
        <p className="text-gray-400 mb-6">Please log in to access your account management settings.</p>
        <Button onClick={() => (window.location.href = "/login")} className="bg-primary hover:bg-primary/90">
          <Shield size={16} className="mr-2" />
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-400" size={20} />
            <p className="text-green-400 font-medium">Changes saved successfully!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Account Management</h2>
          <p className="text-gray-400">Manage your profile, security settings, and preferences</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock size={16} />
          <span>Last login: {userProfile.lastLogin}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-card/50 rounded-lg p-1">
        {[
          { id: "profile", label: "Profile", icon: <User size={16} /> },
          { id: "security", label: "Security", icon: <Shield size={16} /> },
          { id: "preferences", label: "Preferences", icon: <Settings size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === tab.id ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture & Basic Info */}
          <CardWrapper className="lg:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {userProfile.profilePicture ? (
                  <img
                    src={userProfile.profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-primary" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1">{userProfile.fullName}</h3>
              <p className="text-gray-400 mb-2">{userProfile.jobTitle}</p>
              <p className="text-sm text-gray-500">{userProfile.company}</p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-gray-400">Member since {userProfile.accountCreated}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-gray-400">{userProfile.timezone}</span>
                </div>
              </div>
            </div>
          </CardWrapper>

          {/* Profile Details */}
          <CardWrapper className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Profile Information</h3>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                  <Edit size={14} className="mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Save size={14} className="mr-2" />
                    )}
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} size="sm" variant="outline">
                    <X size={14} className="mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.fullName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, fullName: e.target.value })}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <User size={16} className="text-gray-400" />
                    <span>{userProfile.fullName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                  <Mail size={16} className="text-gray-400" />
                  <span>{userProfile.email}</span>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded ml-auto">Microsoft 365</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.department}
                    onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <Building size={16} className="text-gray-400" />
                    <span>{userProfile.department}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.jobTitle}
                    onChange={(e) => setEditedProfile({ ...editedProfile, jobTitle: e.target.value })}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <User size={16} className="text-gray-400" />
                    <span>{userProfile.jobTitle}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Contact</label>
                {isEditing ? (
                  <select
                    value={editedProfile.preferredContact}
                    onChange={(e) => setEditedProfile({ ...editedProfile, preferredContact: e.target.value as any })}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="teams">Microsoft Teams</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    <Bell size={16} className="text-gray-400" />
                    <span className="capitalize">{userProfile.preferredContact}</span>
                  </div>
                )}
              </div>
            </div>
          </CardWrapper>
        </div>
      )}

      {/* Security Section */}
      {activeSection === "security" && (
        <div className="space-y-6">
          {/* Password Management */}
          <CardWrapper>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Lock size={20} className="text-primary" />
                  Password & Authentication
                </h3>
                <p className="text-gray-400 text-sm">Manage your password and authentication settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-gray-400">Last changed: {securitySettings.lastPasswordChange}</p>
                </div>
                <Button onClick={() => setShowPasswordForm(!showPasswordForm)} size="sm" variant="outline">
                  <Key size={14} className="mr-2" />
                  Change Password
                </Button>
              </div>

              {showPasswordForm && (
                <form onSubmit={handlePasswordChange} className="p-4 bg-gray-800/30 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full bg-black border border-primary/20 rounded-lg p-3 pr-12 text-white focus:outline-none focus:border-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                      required
                      minLength={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Save size={14} className="mr-2" />
                      )}
                      Update Password
                    </Button>
                    <Button type="button" onClick={() => setShowPasswordForm(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-400">
                    {securitySettings.twoFactorEnabled ? "Enabled" : "Add an extra layer of security"}
                  </p>
                </div>
                <Button
                  onClick={toggleTwoFactor}
                  disabled={isLoading}
                  size="sm"
                  variant={securitySettings.twoFactorEnabled ? "outline" : "default"}
                  className={securitySettings.twoFactorEnabled ? "" : "bg-primary hover:bg-primary/90"}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Shield size={14} className="mr-2" />
                  )}
                  {securitySettings.twoFactorEnabled ? "Disable" : "Enable"}
                </Button>
              </div>
            </div>
          </CardWrapper>

          {/* Login History */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4">Recent Login Activity</h3>
            <div className="space-y-3">
              {securitySettings.loginHistory.map((login, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    login.success
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${login.success ? "bg-green-400" : "bg-red-400"}`} />
                    <div>
                      <p className="font-medium">{login.device}</p>
                      <p className="text-sm text-gray-400">{login.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{login.date}</p>
                    <p className={`text-xs ${login.success ? "text-green-400" : "text-red-400"}`}>
                      {login.success ? "Successful" : "Failed"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardWrapper>
        </div>
      )}

      {/* Preferences Section */}
      {activeSection === "preferences" && (
        <div className="space-y-6">
          {/* Notification Preferences */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell size={20} className="text-primary" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.notifications.email}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        notifications: { ...userProfile.notifications, email: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-gray-400">Receive urgent updates via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.notifications.sms}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        notifications: { ...userProfile.notifications, sms: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-400">Browser push notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.notifications.push}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        notifications: { ...userProfile.notifications, push: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </CardWrapper>

          {/* Regional Settings */}
          <CardWrapper>
            <h3 className="text-lg font-semibold mb-4">Regional Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                <select
                  value={userProfile.timezone}
                  onChange={(e) => setUserProfile({ ...userProfile, timezone: e.target.value })}
                  className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select
                  value={userProfile.language}
                  onChange={(e) => setUserProfile({ ...userProfile, language: e.target.value })}
                  className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
            </div>
          </CardWrapper>
        </div>
      )}
    </div>
  )
}
