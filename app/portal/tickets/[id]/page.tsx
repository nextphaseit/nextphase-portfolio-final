"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

// Mock ticket data
const mockTicket = {
  id: "TK-1001",
  subject: "Email configuration issue",
  category: "technical",
  status: "in-progress",
  created: "2023-05-15T10:30:00Z",
  updated: "2023-05-16T14:22:00Z",
  description:
    "I am unable to configure my email client (Outlook) to connect to the company email server. I keep getting authentication errors despite using the correct password.",
  attachments: [{ name: "error_screenshot.png", size: "245 KB", type: "image/png" }],
  updates: [
    {
      id: 1,
      type: "status-change",
      from: "open",
      to: "in-progress",
      timestamp: "2023-05-15T14:22:00Z",
      author: "System",
    },
    {
      id: 2,
      type: "comment",
      content:
        "Thank you for submitting your ticket. I will be assisting you with your email configuration issue. Could you please provide the specific error message you are receiving?",
      timestamp: "2023-05-15T14:25:00Z",
      author: "John Smith",
      isStaff: true,
    },
    {
      id: 3,
      type: "comment",
      content:
        'Here is the error message: "The connection to the server has failed. Account: your.email@company.com, Server: mail.company.com, Protocol: IMAP, Port: 993, Secure (SSL): Yes, Error Number: 0x800CCC0E"',
      timestamp: "2023-05-16T09:10:00Z",
      author: "You",
    },
    {
      id: 4,
      type: "comment",
      content:
        "Thank you for providing the error message. It appears to be a connection issue. Please try the following steps:\n\n1. Verify your internet connection\n2. Check if the server address is correct (mail.company.com)\n3. Ensure that port 993 is not blocked by your firewall\n4. Try disabling any VPN if you are using one\n\nLet me know if any of these steps resolve the issue.",
      timestamp: "2023-05-16T14:22:00Z",
      author: "John Smith",
      isStaff: true,
    },
  ],
}

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'status-badge status-open'
      case 'in-progress':
        return 'status-badge status-in-progress'
      case 'completed':
        return 'status-badge status-completed'
      case 'closed':
        return 'status-badge status-closed'
      default:
        return 'status-badge'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    setIsSubmitting(true)
    
    try {
      // In a real app, this would call your API to submit the comment
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Clear the comment field
      setNewComment('')
      
      // In a real app, you would update the ticket with the new comment
      // For now, we'll just leave it as is
    } catch (err) {
      console.error('Failed to submit comment:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-8">
        <Link href="/portal/tickets" className="text-primary hover:text-primary-400 mr-4">
          ← Back to Tickets
        </Link>
        <h1 className="text-3xl font-bold">Ticket {params.id}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Ticket Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Details */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">{mockTicket.subject}</h2>
            <div className="bg-background-500 p-4 rounded-lg mb-4">
              <p className="whitespace-pre-wrap">{mockTicket.description}</p>
            </div>
            
            {mockTicket.attachments.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Attachments:</h3>
                <div className="space-y-2">
                  {mockTicket.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center bg-background-500 p-2 rounded-lg">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-sm">{attachment.name} ({attachment.size})</span>
                      <a href="#" className="ml-auto text-primary hover:text-primary-400 text-sm">
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-400">
              Submitted on {formatDate(mockTicket.created)}
            </div>
          </div>
          
          {/* Ticket Updates */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Updates</h2>
            <div className="space-y-4">
              {mockTicket.updates.map((update) => (
                <div key={update.id} className="border-l-2 border-background-400 pl-4">
                  {update.type === 'status-change' ? (
                    <div className="text-gray-400">
                      <span className="text-primary">System</span> changed status from{' '}
                      <span className={getStatusBadgeClass(update.from)}>{getStatusLabel(update.from)}</span> to{' '}
                      <span className={getStatusBadgeClass(update.to)}>{getStatusLabel(update.to)}</span>
                      <div className="text-xs mt-1">{formatDate(update.timestamp)}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center mb-1">
                        <span className={update.isStaff ? 'text-accent' : 'text-primary'}>
                          {update.author}
                        </span>
                        {update.isStaff && (
                          <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                            Staff
                          </span>
                        )}
                      </div>
                      <div className="bg-background-500 p-3 rounded-lg">
                        <p className="whitespace-pre-wrap">{update.content}</p>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{formatDate(update.timestamp)}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Add Comment */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Add Comment</h2>
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="input-field min-h-[120px] mb-4"
                placeholder="Type your comment here..."
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting || !newComment.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="\
