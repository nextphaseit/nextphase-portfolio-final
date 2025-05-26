"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { AuthProvider } from "@/providers/auth-provider"
import {
  Ticket,
  FolderOpen,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Download,
  ExternalLink,
  User,
  Mail,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TicketProps {
  id: string
  title: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  created: string
  lastUpdate: string
  description: string
}

function TicketCard({ ticket }: { ticket: TicketProps }) {
  const statusColors = {
    open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
    closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const priorityColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-orange-400",
    urgent: "text-red-400",
  }

  const statusIcons = {
    open: <AlertCircle size={16} />,
    "in-progress": <Clock size={16} />,
    resolved: <CheckCircle size={16} />,
    closed: <CheckCircle size={16} />,
  }

  return (
    <CardWrapper className="hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Ticket className="text-primary" size={20} />
          <h3 className="font-semibold">#{ticket.id}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${statusColors[ticket.status]}`}>
          {statusIcons[ticket.status]}
          {ticket.status.replace("-", " ")}
        </div>
      </div>

      <h4 className="font-medium mb-2">{ticket.title}</h4>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{ticket.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className={priorityColors[ticket.priority]}>{ticket.priority.toUpperCase()} Priority</span>
        <span>Updated {ticket.lastUpdate}</span>
      </div>
    </CardWrapper>
  )
}

interface ProjectProps {
  id: string
  name: string
  status: "planning" | "in-progress" | "review" | "completed"
  progress: number
  dueDate: string
  description: string
  services: string[]
}

function ProjectCard({ project }: { project: ProjectProps }) {
  const statusColors = {
    planning: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    review: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
  }

  return (
    <CardWrapper className="hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="text-primary" size={20} />
          <h3 className="font-semibold">{project.name}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs border ${statusColors[project.status]}`}>
          {project.status.replace("-", " ")}
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-3">{project.description}</p>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Due: {project.dueDate}</span>
        <span>{project.services.length} services</span>
      </div>
    </CardWrapper>
  )
}

function ClientPortalContent() {
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "projects" | "resources">("overview")
  const [showNewTicket, setShowNewTicket] = useState(false)

  // Sample data - in production, this would come from your backend
  const tickets: TicketProps[] = [
    {
      id: "TK-001",
      title: "Email setup not working on mobile",
      status: "in-progress",
      priority: "high",
      created: "2024-01-15",
      lastUpdate: "2 hours ago",
      description: "Unable to receive emails on iPhone after recent iOS update. Desktop email works fine.",
    },
    {
      id: "TK-002",
      title: "SharePoint access permission issue",
      status: "open",
      priority: "medium",
      created: "2024-01-14",
      lastUpdate: "1 day ago",
      description: "New employee cannot access shared documents in SharePoint site.",
    },
    {
      id: "TK-003",
      title: "Website contact form not sending",
      status: "resolved",
      priority: "urgent",
      created: "2024-01-12",
      lastUpdate: "3 days ago",
      description: "Contact form submissions are not being received. Customers reporting issues.",
    },
  ]

  const projects: ProjectProps[] = [
    {
      id: "PRJ-001",
      name: "Website Redesign",
      status: "in-progress",
      progress: 75,
      dueDate: "Feb 15, 2024",
      description: "Complete website redesign with new branding and improved user experience",
      services: ["Web Design", "SEO", "Content Migration"],
    },
    {
      id: "PRJ-002",
      name: "Microsoft 365 Migration",
      status: "review",
      progress: 90,
      dueDate: "Jan 30, 2024",
      description: "Migration from G Suite to Microsoft 365 with full data transfer",
      services: ["Cloud Migration", "Email Setup", "Training"],
    },
    {
      id: "PRJ-003",
      name: "Security Audit",
      status: "completed",
      progress: 100,
      dueDate: "Jan 20, 2024",
      description: "Comprehensive security audit and compliance assessment",
      services: ["Security Audit", "Compliance", "Documentation"],
    },
  ]

  const resources = [
    {
      title: "Microsoft 365 User Guide",
      type: "PDF",
      size: "2.3 MB",
      updated: "Jan 10, 2024",
      description: "Complete guide for using Microsoft 365 applications",
    },
    {
      title: "Email Setup Instructions",
      type: "PDF",
      size: "1.1 MB",
      updated: "Jan 8, 2024",
      description: "Step-by-step email configuration for all devices",
    },
    {
      title: "Security Best Practices",
      type: "PDF",
      size: "1.8 MB",
      updated: "Jan 5, 2024",
      description: "Essential security practices for small businesses",
    },
  ]

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
        <Navbar />

        {/* Header */}
        <section className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
              <p className="text-gray-400">Manage your projects, support tickets, and resources</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button onClick={() => setShowNewTicket(true)} className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                New Ticket
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-card/50 rounded-lg p-1 mb-8">
            {[
              { id: "overview", label: "Overview", icon: <User size={16} /> },
              { id: "tickets", label: "Support Tickets", icon: <Ticket size={16} /> },
              { id: "projects", label: "Projects", icon: <FolderOpen size={16} /> },
              { id: "resources", label: "Resources", icon: <FileText size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="container mx-auto px-4 pb-16">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Ticket className="text-blue-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">3</div>
                  <div className="text-sm text-gray-400">Open Tickets</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FolderOpen className="text-green-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-1">2</div>
                  <div className="text-sm text-gray-400">Active Projects</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-yellow-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">5</div>
                  <div className="text-sm text-gray-400">Days Avg Response</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="text-purple-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">98%</div>
                  <div className="text-sm text-gray-400">Satisfaction Rate</div>
                </CardWrapper>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Ticket className="text-primary" size={24} />
                    Recent Tickets
                  </h2>
                  <div className="space-y-4">
                    {tickets.slice(0, 3).map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FolderOpen className="text-primary" size={24} />
                    Active Projects
                  </h2>
                  <div className="space-y-4">
                    {projects
                      .filter((p) => p.status !== "completed")
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === "tickets" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Support Tickets</h2>
                <Button onClick={() => setShowNewTicket(true)} className="bg-primary hover:bg-primary/90">
                  <Plus size={16} className="mr-2" />
                  New Ticket
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Resources & Documentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <CardWrapper key={index} className="hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="text-primary" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{resource.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{resource.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
                            {resource.type} • {resource.size}
                          </span>
                          <span>Updated {resource.updated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download size={14} className="mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink size={14} />
                      </Button>
                    </div>
                  </CardWrapper>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* New Ticket Modal */}
        {showNewTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg p-6 w-full max-w-md border border-primary/20">
              <h3 className="text-xl font-bold mb-4">Submit New Ticket</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                    placeholder="Brief description of the issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-vertical"
                    placeholder="Detailed description of the issue..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                    Submit Ticket
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowNewTicket(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section className="container mx-auto px-4 pb-16">
          <CardWrapper className="text-center bg-primary/10">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              For urgent issues or if you prefer to speak directly with our team, don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+19843109533">
                  <Phone size={16} className="mr-2" />
                  Call +1 984-310-9533
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:support@nextphaseit.org">
                  <Mail size={16} className="mr-2" />
                  Email Support
                </a>
              </Button>
            </div>
          </CardWrapper>
        </section>

        {/* Footer */}
        <footer className="bg-card mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-gray-400">
                  Your trusted technology partner for business growth and digital transformation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Portal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <button onClick={() => setActiveTab("overview")} className="hover:text-primary transition-colors">
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab("tickets")} className="hover:text-primary transition-colors">
                      Support Tickets
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab("projects")} className="hover:text-primary transition-colors">
                      Projects
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab("resources")} className="hover:text-primary transition-colors">
                      Resources
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/faq" className="hover:text-primary transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:support@nextphaseit.org" className="hover:text-primary transition-colors">
                      Email Support
                    </a>
                  </li>
                  <li>
                    <a href="tel:+19843109533" className="hover:text-primary transition-colors">
                      Phone Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>support@nextphaseit.org</li>
                  <li>+1 984-310-9533</li>
                  <li>Clayton, NC</li>
                  <li>Mon-Fri 9AM-6PM EST</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>© 2024 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default function ClientPortalPage() {
  return (
    <AuthProvider>
      <ClientPortalContent />
    </AuthProvider>
  )
}
