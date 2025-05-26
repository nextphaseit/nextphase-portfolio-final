"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Bot, User, Send } from "lucide-react"
import { Button } from "./ui/button"
import { createSupportTicket } from "@/app/actions/ticket"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  options?: ChatOption[]
  isTicketForm?: boolean
}

interface ChatOption {
  text: string
  action: string
  value?: string
}

interface TicketFormData {
  subject: string
  priority: "low" | "medium" | "high" | "urgent"
  description: string
  clientName: string
  clientEmail: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [ticketForm, setTicketForm] = useState<TicketFormData>({
    subject: "",
    priority: "medium",
    description: "",
    clientName: "",
    clientEmail: "",
  })
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage("👋 Hi! I'm the NextPhase IT assistant. How can I help you today?", [
          { text: "💼 What services do you offer?", action: "services" },
          { text: "💰 What are your prices?", action: "pricing" },
          { text: "🎫 Create support ticket", action: "create_ticket" },
          { text: "🚀 How do I get started?", action: "get_started" },
          { text: "📞 Contact information", action: "contact" },
        ])
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text: string, options?: ChatOption[]) => {
    setIsTyping(true)
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date(),
        options,
      }
      setMessages((prev) => [...prev, newMessage])
      setIsTyping(false)
    }, 1000)
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingTicket(true)

    try {
      const result = await createSupportTicket({
        subject: ticketForm.subject,
        priority: ticketForm.priority,
        description: ticketForm.description,
        clientName: ticketForm.clientName,
        clientEmail: ticketForm.clientEmail,
        source: "chatbot",
      })

      setShowTicketForm(false)
      setTicketForm({
        subject: "",
        priority: "medium",
        description: "",
        clientName: "",
        clientEmail: "",
      })

      if (result.success) {
        addBotMessage(
          `✅ ${result.message}\n\nYour ticket details:\n• Ticket #: ${result.ticketNumber}\n• Priority: ${ticketForm.priority.toUpperCase()}\n• Subject: ${ticketForm.subject}\n\nOur team will review your request and respond within 2-4 business hours.`,
          [
            { text: "📋 View Help Desk Portal", action: "help_desk" },
            { text: "📞 Call for urgent issues", action: "call_now" },
            { text: "🔙 Back to main menu", action: "main_menu" },
          ],
        )
      } else {
        addBotMessage(`❌ ${result.message}`, [
          { text: "🔄 Try again", action: "create_ticket" },
          { text: "📞 Call us instead", action: "call_now" },
          { text: "📧 Send email", action: "email_now" },
        ])
      }
    } catch (error) {
      addBotMessage(
        "❌ Sorry, there was an error creating your ticket. Please contact us directly at support@nextphaseit.org or call +1 984-310-9533.",
        [
          { text: "📞 Call us", action: "call_now" },
          { text: "📧 Send email", action: "email_now" },
          { text: "🔙 Back to main menu", action: "main_menu" },
        ],
      )
    } finally {
      setIsSubmittingTicket(false)
    }
  }

  const handleOptionClick = (option: ChatOption) => {
    addUserMessage(option.text)

    switch (option.action) {
      case "create_ticket":
        addBotMessage(
          "🎫 I'll help you create a support ticket. Please provide the following information so our technical team can assist you effectively:",
          [
            { text: "📝 Fill out ticket form", action: "show_ticket_form" },
            { text: "📞 Call instead", action: "call_now" },
            { text: "📧 Email support", action: "email_now" },
            { text: "🔙 Back to main menu", action: "main_menu" },
          ],
        )
        break

      case "show_ticket_form":
        setShowTicketForm(true)
        addBotMessage(
          "📋 Please fill out the support ticket form below. I'll make sure it gets to our technical team right away!",
        )
        break

      case "help_desk":
        window.open("/portal", "_blank")
        addBotMessage(
          "📋 Opening the NextPhase IT Help Desk portal... You can track your tickets and manage your account there!",
        )
        break

      case "services":
        addBotMessage("We offer comprehensive IT solutions for small businesses:", [
          { text: "🌐 Website Design & Hosting", action: "service_website" },
          { text: "☁️ Microsoft 365 Setup", action: "service_m365" },
          { text: "🔒 Security & Compliance", action: "service_security" },
          { text: "📧 Email & Domain Setup", action: "service_email" },
          { text: "🔄 Data Migration", action: "service_migration" },
          { text: "🎫 Need technical support?", action: "create_ticket" },
          { text: "📋 View all services", action: "all_services" },
        ])
        break

      case "pricing":
        addBotMessage("Our pricing is transparent and competitive. Here are some popular options:", [
          { text: "🎯 Startup IT Kit - $999", action: "startup_kit" },
          { text: "🌐 Website Design - $750-$2,000+", action: "website_pricing" },
          { text: "☁️ Microsoft 365 - $250-$500", action: "m365_pricing" },
          { text: "🎫 Get support with pricing", action: "create_ticket" },
          { text: "📋 View full pricing", action: "full_pricing" },
          { text: "💬 Get custom quote", action: "custom_quote" },
        ])
        break

      case "get_started":
        addBotMessage("Getting started is easy! Here are your options:", [
          { text: "📝 Fill out intake form", action: "intake_form" },
          { text: "📞 Schedule a call", action: "schedule_call" },
          { text: "📧 Send us an email", action: "send_email" },
          { text: "🎫 Create support ticket", action: "create_ticket" },
          { text: "💬 Chat with us now", action: "chat_now" },
        ])
        break

      case "contact":
        addBotMessage("Here's how you can reach us:", [
          { text: "📞 Call: +1 984-310-9533", action: "call_now" },
          { text: "📧 Email: support@nextphaseit.org", action: "email_now" },
          { text: "🎫 Create support ticket", action: "create_ticket" },
          { text: "📋 NextPhase IT Help Desk", action: "help_desk" },
          { text: "📍 Location: Clayton, NC", action: "location" },
          { text: "🕒 Hours: Mon-Fri 9AM-6PM EST", action: "hours" },
        ])
        break

      case "startup_kit":
        addBotMessage(
          "🎯 Our Startup IT Kit ($999) includes:\n\n✅ Professional email setup\n✅ Custom website design\n✅ Microsoft 365 configuration\n✅ Domain registration\n✅ Basic security setup\n\nSave over $300 compared to individual services!",
          [
            { text: "🚀 Get Startup Kit", action: "get_startup_kit" },
            { text: "🎫 Ask technical questions", action: "create_ticket" },
            { text: "💬 Ask questions", action: "ask_questions" },
            { text: "🔙 Back to main menu", action: "main_menu" },
          ],
        )
        break

      case "service_website":
        addBotMessage(
          "🌐 Website Design & Hosting:\n\n• Custom responsive design\n• SEO optimization\n• Content management\n• Monthly hosting & updates\n• Starting at $750",
          [
            { text: "💰 Get website quote", action: "website_quote" },
            { text: "🎫 Technical questions", action: "create_ticket" },
            { text: "📋 See examples", action: "website_examples" },
            { text: "🔙 Back to services", action: "services" },
          ],
        )
        break

      case "service_m365":
        addBotMessage(
          "☁️ Microsoft 365 Setup:\n\n• Complete environment setup\n• User account configuration\n• Security optimization\n• Ongoing support available\n• $250-$500 setup + monthly support",
          [
            { text: "💰 Get M365 quote", action: "m365_quote" },
            { text: "🎫 Technical support", action: "create_ticket" },
            { text: "📞 Schedule consultation", action: "m365_consult" },
            { text: "🔙 Back to services", action: "services" },
          ],
        )
        break

      case "call_now":
        window.open("tel:+19843109533", "_self")
        addBotMessage(
          "📞 Calling +1 984-310-9533... If the call didn't start automatically, please dial the number manually.",
        )
        break

      case "email_now":
        window.open("mailto:support@nextphaseit.org", "_blank")
        addBotMessage("📧 Opening your email client... If it didn't open, please email us at support@nextphaseit.org")
        break

      case "intake_form":
      case "get_startup_kit":
      case "custom_quote":
        window.open("https://forms.cloud.microsoft/r/5Ad9WuMA3G", "_blank")
        addBotMessage("📝 Opening our intake form... Please fill it out and we'll get back to you within 24 hours!")
        break

      case "full_pricing":
        window.open("/pricing", "_blank")
        addBotMessage("📋 Opening our pricing page... You'll see all our services and transparent pricing there!")
        break

      case "main_menu":
        addBotMessage("👋 How can I help you today?", [
          { text: "💼 What services do you offer?", action: "services" },
          { text: "💰 What are your prices?", action: "pricing" },
          { text: "🎫 Create support ticket", action: "create_ticket" },
          { text: "🚀 How do I get started?", action: "get_started" },
          { text: "📞 Contact information", action: "contact" },
        ])
        break

      default:
        addBotMessage("I'd be happy to help you with that! For detailed information, please contact our team:", [
          { text: "🎫 Create support ticket", action: "create_ticket" },
          { text: "📞 Call us", action: "call_now" },
          { text: "📧 Send email", action: "email_now" },
          { text: "📝 Fill out form", action: "intake_form" },
          { text: "🔙 Back to main menu", action: "main_menu" },
        ])
    }
  }

  const resetChat = () => {
    setMessages([])
    setShowTicketForm(false)
    setTimeout(() => {
      addBotMessage("👋 Hi! I'm the NextPhase IT assistant. How can I help you today?", [
        { text: "💼 What services do you offer?", action: "services" },
        { text: "💰 What are your prices?", action: "pricing" },
        { text: "🎫 Create support ticket", action: "create_ticket" },
        { text: "🚀 How do I get started?", action: "get_started" },
        { text: "📞 Contact information", action: "contact" },
      ])
    }, 500)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="lg"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 h-96 flex flex-col">
        {/* Header */}
        <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-white" />
            <div>
              <h3 className="font-semibold text-white">NextPhase IT Assistant</h3>
              <p className="text-xs opacity-90 text-white">Online now</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={resetChat} className="text-white hover:bg-white/20 p-1 h-auto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X size={16} className="text-white" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] ${message.isBot ? "order-2" : "order-1"}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.isBot ? "bg-white text-gray-800 border border-gray-200 shadow-sm" : "bg-primary text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line font-medium">{message.text}</p>
                </div>
                {message.options && (
                  <div className="mt-2 space-y-1">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left justify-start text-xs h-auto py-2 px-3 border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-gray-700 font-medium bg-white"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {message.isBot && (
                <div className="order-1 mr-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Bot size={12} className="text-white" />
                  </div>
                </div>
              )}
              {!message.isBot && (
                <div className="order-2 ml-2">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="mr-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Bot size={12} className="text-white" />
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">🎫 Create Support Ticket</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTicketForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </Button>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={ticketForm.clientName}
                    onChange={(e) => setTicketForm({ ...ticketForm, clientName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:border-primary"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={ticketForm.clientEmail}
                    onChange={(e) => setTicketForm({ ...ticketForm, clientEmail: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:border-primary"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value as any })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:border-primary"
                >
                  <option value="low">🟢 Low - General question</option>
                  <option value="medium">🟡 Medium - Standard issue</option>
                  <option value="high">🟠 High - Important issue</option>
                  <option value="urgent">🔴 Urgent - Business critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  required
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:border-primary resize-vertical"
                  placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and what you've already tried..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  📧 <strong>Email Confirmation:</strong> You'll receive a confirmation email with your ticket number
                  and details.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmittingTicket}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  {isSubmittingTicket ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </div>
                  ) : (
                    <>
                      <Send size={14} className="mr-2" />
                      Create Ticket
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowTicketForm(false)}
                  className="flex-1 text-gray-700 border-gray-300"
                  disabled={isSubmittingTicket}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
