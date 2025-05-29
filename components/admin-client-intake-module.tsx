"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { RefreshCw, FileText, Download, Eye, Mail, CheckCircle, Award } from "lucide-react"

export default function AdminClientIntakeModule() {
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
          pdfUrl: "/ClientIntakeForms/ClientIntake_20240115_103000_John_Smith.pdf",
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
          pdfUrl: "/ClientIntakeForms/ClientIntake_20240114_141500_Sarah_Johnson.pdf",
        },
      ]
      setIntakeSubmissions(mockData)
      setIsLoading(false)
    }, 1000)
  }

  const updateSubmissionStatus = (id: string, status: string) => {
    setIntakeSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status } : sub)))
  }

  const downloadPDF = (pdfUrl: string, clientName: string) => {
    // In a real implementation, this would download from SharePoint
    window.open(`https://nextphaseit.sharepoint.com/sites/NextPhaseIT${pdfUrl}`, "_blank")
  }

  const statusColors = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    qualified: "bg-green-500/20 text-green-400 border-green-500/30",
    converted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    declined: "bg-gray-500/20 text-gray-400 border-gray-500/30",
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
            {intakeSubmissions.filter((s) => s.status === "new").length}
          </div>
          <div className="text-sm text-gray-400">New Submissions</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {intakeSubmissions.filter((s) => s.status === "contacted").length}
          </div>
          <div className="text-sm text-gray-400">Contacted</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {intakeSubmissions.filter((s) => s.status === "qualified").length}
          </div>
          <div className="text-sm text-gray-400">Qualified</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {intakeSubmissions.filter((s) => s.status === "converted").length}
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
                        <Button size="sm" variant="outline" onClick={() => setSelectedSubmission(submission)}>
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
