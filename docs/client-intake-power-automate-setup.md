# Client Intake Form Power Automate Setup Guide

This guide walks you through setting up the automated workflow for processing client intake form submissions.

## Prerequisites

1. Microsoft 365 account with Power Automate access
2. Microsoft Forms form created with ID: `QWtKpJuvTg`
3. SharePoint site with "ClientIntakeForms" document library
4. PDF generation service (HTML/CSS to PDF API)

## Step 1: Create SharePoint Document Library

1. Go to your SharePoint site: `https://nextphaseit.sharepoint.com/sites/NextPhaseIT`
2. Create a new document library called "ClientIntakeForms"
3. Set appropriate permissions for the Power Automate service account

## Step 2: Set up PDF Generation Service

### Option A: HTML/CSS to PDF API (Recommended)
1. Sign up for an HTML/CSS to PDF service (e.g., api.html-css-to-pdf.com)
2. Get your API key
3. Update the workflow JSON with your API key

### Option B: Azure Function (Custom)
1. Create an Azure Function that converts HTML to PDF
2. Deploy the function and get the endpoint URL
3. Update the workflow to use your custom endpoint

## Step 3: Import Power Automate Flow

1. Go to [Power Automate](https://flow.microsoft.com)
2. Click "My flows" > "Import" > "Import Package (Legacy)"
3. Upload the `client-intake-form-workflow.json` file
4. Configure the connections:
   - Microsoft Forms
   - SharePoint Online
   - Office 365 Outlook

## Step 4: Configure Form Field Mappings

Update the variable initialization actions to match your form fields:

\`\`\`json
{
  "r1": "Full Name",
  "r2": "Company Name", 
  "r3": "Email Address",
  "r4": "Phone Number",
  "r5": "Services Needed",
  "r6": "Additional Notes"
}
\`\`\`

## Step 5: Test the Workflow

1. Submit a test form response
2. Check that:
   - PDF is generated correctly
   - File is saved to SharePoint
   - Confirmation email is sent to the client
   - Notification email is sent to the team

## Step 6: Monitor and Maintain

1. Set up flow analytics and monitoring
2. Configure error handling and retry policies
3. Set up alerts for failed runs
4. Regularly review and update the workflow

## Troubleshooting

### Common Issues:

1. **PDF Generation Fails**
   - Check API key and endpoint
   - Verify HTML template syntax
   - Check API rate limits

2. **SharePoint Access Denied**
   - Verify service account permissions
   - Check document library exists
   - Ensure correct site URL

3. **Email Delivery Issues**
   - Check Office 365 connection
   - Verify email addresses
   - Check spam filters

### Error Handling:

The workflow includes automatic retry logic and error notifications. Failed runs will:
- Retry up to 3 times
- Send error notifications to admin team
- Log detailed error information

## Security Considerations

1. **Data Protection**
   - All form data is encrypted in transit and at rest
   - SharePoint access is restricted to authorized users
   - PDF files are stored securely with proper permissions

2. **Access Control**
   - Service account has minimal required permissions
   - Regular access reviews and audits
   - Secure API key management

## Maintenance Schedule

- **Weekly**: Review flow run history
- **Monthly**: Check error rates and performance
- **Quarterly**: Update security settings and permissions
- **Annually**: Review and update workflow logic

For additional support, contact the NextPhase IT development team.
\`\`\`

Now let me add the Client Intake Submissions section to the Admin Portal:

```typescriptreact file="app/admin/page.tsx"
[v0-no-op-code-block-prefix]"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { AdminAuthProvider, useAdminAuth, withAdminAuth } from "@/providers/admin-auth-provider"
import { AdminAnalyticsDashboard } from "@/components/admin-analytics-dashboard"
import { BarChart3, FileText, Settings, Shield, Activity, Download, Calendar, Building, Eye, Edit, Plus, RefreshCw, Mail, CheckCircle, Award } from 'lucide-react'
import Image from "next/image"
import { getAuditLog, type AuditLogEntry } from "@/lib/admin-auth"
import { TENANT_CONFIGS } from "@/lib/tenant-config"

function AdminReportsModule() {
  const [reportType, setReportType] = useState<"analytics" | "tickets" | "users" | "audit">("analytics")
  const [dateRange, setDateRange] = useState({ start: "2024-01-01", end: "2024-01-31" })
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async (format: "csv" | "pdf") => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      const filename = `${reportType}-report-${dateRange.start}-to-${dateRange.end}.${format}`
      console.log(`Generating ${format.toUpperCase()} report: ${filename}`)
      alert(`${format.toUpperCase()} report "${filename}" would be downloaded`)
      setIsGenerating(false)
    }, 2000)
  }

  const scheduleReport = () => {
    alert("Report scheduling feature would open a configuration modal")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Reports & Analytics</h2>
          <p className="text-gray-400">Generate and schedule comprehensive reports</p>
        </div>
      </div>

      {/* Report Configuration */}
      <CardWrapper>
        <h3 className="text-lg font-semibold mb-4">Report Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="analytics">Analytics Summary</option>
              <option value="tickets">Ticket Details</option>
              <option value="users">User Activity</option>
              <option value="audit">Audit Log</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={scheduleReport} variant="outline" className="w-full">
              <Calendar size={16} className="mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => generateReport("csv")}
            disabled={isGenerating}
            className="bg-primary hover:bg-primary/90"
          >
            {isGenerating ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Download size={16} className="mr-2" />
            )}
            Export CSV
          </Button>
          <Button onClick={() => generateReport("pdf")} disabled={isGenerating} variant="outline">
            {isGenerating ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Download size={16} className="mr-2" />
            )}
            Export PDF
          </Button>
        </div>
      </CardWrapper>

      {/* Recent Reports */}
      <CardWrapper>
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            {
              name: "Monthly Analytics Report - January 2024",
              type: "Analytics",
              generated: "2024-01-28 14:30:00",
              size: "2.3 MB",
              format: "PDF",
            },
            {
              name: "Ticket Summary - Q4 2023",
              type: "Tickets",
              generated: "2024-01-15 09:15:00",
              size: "1.8 MB",
              format: "CSV",
            },
            {
              name: "User Activity Report - December 2023",
              type: "Users",
              generated: "2024-01-01 16:45:00",
              size: "945 KB",
              format: "PDF",
            },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={20} />
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-gray-400">
                    {report.type} • {report.generated} • {report.size}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{report.format}</span>
                <Button size="sm" variant="outline">
                  <Download size={14} className="mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardWrapper>
    </div>
  )
}

function AdminSettingsModule() {
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
  })

  const tenants = Object.values(TENANT_CONFIGS)

  const saveSettings = () => {
    alert("Settings would be saved to the database")
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
        <h3 className="text-lg font-semibold mb-4">Tenant Configuration</h3>
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

        {/* Settings Form */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Default Notification Settings</h4>
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
                  className="rounded"
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
                  className="rounded"
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
                  className="rounded"
                />
                <span>Push notifications enabled by default</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Security Settings</h4>
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
            <div className="mt-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.twoFactorRequired}
                  onChange={(e) => setSettings({ ...settings, twoFactorRequired: e.target.checked })}
                  className="rounded"
                />
                <span>Require two-factor authentication for all users</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">
              Save Settings
            </Button>
            <Button variant="outline">Reset to Defaults</Button>
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}

function AdminAuditModule() {
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    action: "all",
    resource: "all",
    userId: "all",
    dateRange: "7d",
  })

  useEffect(() => {
    loadAuditLog()
  }, [filters])

  const loadAuditLog = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const data = getAuditLog()
      setAuditLog(data)
      setIsLoading(false)
    }, 1000)
  }

  const exportAuditLog = () => {
    const filename = `audit-log-${new Date().toISOString().split("T")[0]}.csv`
    console.log(`Exporting audit log: ${filename}`)
    alert(`Audit log "${filename}" would be downloaded`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Audit Log</h2>
          <p className="text-gray-400">Track all administrative actions and changes</p>
        </div>
        <Button onClick={exportAuditLog} variant="outline">
          <Download size={16} className="mr-2" />
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <CardWrapper>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Action</label>
            <select
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="VIEW">View</option>
              <option value="EXPORT">Export</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Resource</label>
            <select
              value={filters.resource}
              onChange={(e) => setFilters({ ...filters, resource: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Resources</option>
              <option value="tenant_settings">Tenant Settings</option>
              <option value="user_account">User Accounts</option>
              <option value="analytics_report">Analytics Reports</option>
              <option value="notification_settings">Notifications</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={loadAuditLog} variant="outline">
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardWrapper>

      {/* Audit Log Table */}
      <CardWrapper>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-gray-400">Loading audit log...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Resource</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Details</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-sm">{entry.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{entry.userName}</div>
                      <div className="text-sm text-gray-400">{entry.userId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          entry.action === "CREATE"
                            ? "bg-green-500/20 text-green-400"
                            : entry.action === "UPDATE"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : entry.action === "DELETE"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {entry.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{entry.resource}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 max-w-xs truncate">{entry.details}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{entry.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardWrapper>
    </div>
  )
}

function AdminClientIntakeModule() {
  const [intakeSubmissions, setIntakeSubmissions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)

  useEffect(() => {
    loadIntakeSubmissions()
  }, [])

  const loadIntakeSubmissions = async () => {
    setIsLoading(true)
    // Simulate API call to SharePoint
    setTimeout(() => {
      const mockData = [
        {
          id: "INT-001",
          clientName: "John Smith",
          companyName: "Smith Consulting LLC",
          email: "john@smithconsulting.com",
          phone: "(555) 123-4567",
          servicesNeeded: "Website Development, Cloud Migration",
          submittedDate: "2024-01-15 10:30:00",
          status: "new",
          pdfUrl: "/ClientIntakeForms/ClientIntake_20240115_103000_John_Smith.pdf"
        },
        {
          id: "INT-002", 
          clientName: "Sarah Johnson",
          companyName: "Johnson Marketing",
          email: "sarah@johnsonmarketing.com",
          phone: "(555) 987-6543",
          servicesNeeded: "IT Support, Security Audit",
          submittedDate: "2024-01-14 14:15:00",
          status: "contacted",
          pdfUrl: "/ClientIntakeForms/ClientIntake_20240114_141500_Sarah_Johnson.pdf"
        }
      ]
      setIntakeSubmissions(mockData)
      setIsLoading(false)
    }, 1000)
  }

  const updateSubmissionStatus = (id: string, status: string) => {
    setIntakeSubmissions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, status } : sub)
    )
  }

  const downloadPDF = (pdfUrl: string, clientName: string) => {
    // In a real implementation, this would download from SharePoint
    window.open(`https://nextphaseit.sharepoint.com/sites/NextPhaseIT${pdfUrl}`, '_blank')
  }

  const statusColors = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", 
    qualified: "bg-green-500/20 text-green-400 border-green-500/30",
    converted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    declined: "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Client Intake Submissions</h2>
          <p className="text-gray-400">Review and manage new client contact form submissions</p>
        </div>
        <Button onClick={loadIntakeSubmissions} variant="outline">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {intakeSubmissions.filter(s => s.status === 'new').length}
          </div>
          <div className="text-sm text-gray-400">New Submissions</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {intakeSubmissions.filter(s => s.status === 'contacted').length}
          </div>
          <div className="text-sm text-gray-400">Contacted</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {intakeSubmissions.filter(s => s.status === 'qualified').length}
          </div>
          <div className="text-sm text-gray-400">Qualified</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {intakeSubmissions.filter(s => s.status === 'converted').length}
          </div>
          <div className="text-sm text-gray-400">Converted</div>
        </CardWrapper>
      </div>

      {/* Submissions Table */}
      <CardWrapper>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-gray-400">Loading submissions...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Services</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Submitted</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {intakeSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{submission.clientName}</div>
                      <div className="text-sm text-gray-400">ID: {submission.id}</div>
                    </td>
                    <td className="py-3 px-4">{submission.companyName}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                          {submission.email}
                        </a>
                      </div>
                      <div className="text-sm text-gray-400">
                        <a href={`tel:${submission.phone}`} className="hover:text-primary">
                          {submission.phone}
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm max-w-xs truncate">{submission.servicesNeeded}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{submission.submittedDate}</td>
                    <td className="py-3 px-4">
                      <select
                        value={submission.status}
                        onChange={(e) => updateSubmissionStatus(submission.id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs border ${statusColors[submission.status as keyof typeof statusColors]} bg-transparent`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadPDF(submission.pdfUrl, submission.clientName)}
                        >
                          <Download size={12} className="mr-1" />
                          PDF
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <Eye size={12} className="mr-1" />
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardWrapper>
    </div>
  )
}

function AdminTenantManagement() {
  const [tenants] = useState(Object.values(TENANT_CONFIGS))
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null)

  const editTenant = (tenantId: string) => {
    setSelectedTenant(tenantId)
    alert(`Edit tenant configuration for ${tenantId}`)
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
                <Button size="sm" variant="outline">
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
                  Configure
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Users
                </Button>
              </div>
            </div>
          </CardWrapper>
        ))}
      </div>
    </div>
  )
}

function AdminPortalContent() {
  const { adminUser, logout, hasPermission } = useAdminAuth()
  const [activeTab, setActiveTab] = useState<"dashboard" | "reports" | "settings" | "tenants" | "audit" | "intake">("dashboard")

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Shield size={64} className="mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
          <p className="text-gray-400">Please log in to access the Admin Portal.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <Image
            src="/images/nextphase-logo.png"
            alt=""
            width={800}
            height={600}
            className="w-auto h-96 object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-card border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/nextphase-logo.png"
                  alt="NextPhase IT"
                  width={150}
                  height={45}
                  className="h-10 w-auto"
                />
                <div className="hidden md:block">
                  <h1 className="text-xl font-bold text-red-400">Admin Portal</h1>
                  <p className="text-sm text-gray-400">NextPhase IT Administrative Console</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">{adminUser.name}</div>
                  <div className="text-sm text-gray-400">{adminUser.role.replace("_", " ")}</div>
                </div>
                <Image
                  src={adminUser.picture || "/placeholder.svg?height=40&width=40&text=" + adminUser.name.charAt(0)}
                  alt={adminUser.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Button onClick={logout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1 overflow-x-auto py-2">
              {[
                { id: "dashboard", label: "Analytics", icon: <BarChart3 size={16} />, permission: "analytics.view" },
                { id: "reports", label: "Reports", icon: <FileText size={16} />, permission: "reports.view" },
                { id: "tenants", label: "Tenants", icon: <Building size={16} />, permission: "tenants.view" },
                { id: "settings", label: "Settings", icon: <Settings size={16} />, permission: "settings.manage" },
                { id: "audit", label: "Audit Log", icon: <Activity size={16} />, permission: "audit.view" },
                { id: "intake", label: "Client Intake", icon: <FileText size={16} />, permission: "intake.view" },
              ]
                .filter((tab) => hasPermission(tab.permission.split(".")[0], tab.permission.split(".")[1]))
                .map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {activeTab === "dashboard" && <AdminAnalyticsDashboard />}
          {activeTab === "reports" && <AdminReportsModule />}
          {activeTab === "settings" && <AdminSettingsModule />}
          {activeTab === "tenants" && <AdminTenantManagement />}
          {activeTab === "audit" && <AdminAuditModule />}
          {activeTab === "intake" && <AdminClientIntakeModule />}
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400">© 2024 NextPhase IT. All rights reserved.</p>
                <p className="text-sm text-gray-500">Administrative Portal - Restricted Access</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>User: {adminUser.email}</span>
                <span>Role: {adminUser.role.replace("_", " ")}</span>
                <span>Last Login: {adminUser.lastLogin}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

const ProtectedAdminPortal = withAdminAuth(AdminPortalContent)

export default function AdminPortalPage() {
  return (
    <AdminAuthProvider>
      <ProtectedAdminPortal />
    </AdminAuthProvider>
  )
}
