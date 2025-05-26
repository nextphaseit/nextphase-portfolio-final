"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Bot, User, Send, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "./ui/button"
import { createSupportTicket } from "@/app/actions/ticket"
import chatbotResponses from "@/data/chatbot-responses.json"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  options?: ChatOption[]
  isTicketForm?: boolean
  isEscalated?: boolean
  showFeedback?: boolean
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

interface ChatSession {
  isEscalated: boolean
  hasActiveTicket: boolean
  ticketNumber?: string
  supportLevel: "basic" | "escalated" | "technician"
  sessionId: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [ticketForm, setTicketForm] = useState<TicketFormData>({
    subject: "",
    priority: "medium",
    description: "",
    clientName: "",
    clientEmail: "",
  })
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false)
  const [chatSession, setChatSession] = useState<ChatSession>({
    isEscalated: false,
    hasActiveTicket: false,
    supportLevel: "basic",
    sessionId: Math.random().toString(36).substring(7),
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get Talk2Support responses
  const talk2SupportResponses = chatbotResponses.Talk2SupportChatbot.responses

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Use Talk2Support welcome message
      setTimeout(() => {
        const welcomeMessage =
          talk2SupportResponses.find((r) => r.id === 1)?.message ||
          "👋 Hi! I'm the NextPhase IT assistant. How can I help you today?"

        addBotMessage(welcomeMessage, [
          { text: "💼 What services do you offer?", action: "services" },
          { text: "💰 What are your prices?", action: "pricing" },
          { text: "🎫 Create support ticket", action: "create_ticket" },
          { text: "🚀 How do I get started?", action: "get_started" },
          { text: "📞 Contact information", action: "contact" },
        ])
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text: string, options?: ChatOption[], isEscalated = false, showFeedback = false) => {
    setIsTyping(true)
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date(),
        options,
        isEscalated,
        showFeedback,
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

  const escalateToTechnician = () => {
    setChatSession((prev) => ({ ...prev, isEscalated: true, supportLevel: "technician" }))

    const escalationMessage =
      talk2SupportResponses.find((r) => r.id === 10)?.message ||
      "A technician has been assigned to your case. You'll receive an update via email soon."

    addBotMessage(
      escalationMessage,
      [
        { text: "📝 Provide more details", action: "create_ticket" },
        { text: "📞 Call for urgent help", action: "call_now" },
        { text: "📧 Send email instead", action: "email_now" },
        { text: "📋 Check help desk", action: "help_desk" },
      ],
      true,
    )
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
        setChatSession((prev) => ({
          ...prev,
          hasActiveTicket: true,
          ticketNumber: result.ticketNumber,
        }))

        // Use Talk2Support confirmation message
        const confirmationMessage =
          talk2SupportResponses.find((r) => r.id === 5)?.message ||
          "Got it! I've submitted your request to our team. You'll receive an update shortly."

        addBotMessage(
          `✅ ${confirmationMessage}\n\nYour ticket details:\n• Ticket #: ${result.ticketNumber}\n• Priority: ${ticketForm.priority.toUpperCase()}\n• Subject: ${ticketForm.subject}\n\nOur team will review your request and respond within 2-4 business hours.`,
          [
            { text: "📋 View Help Desk Portal", action: "help_desk" },
            { text: "🔧 Escalate to technician", action: "escalate" },
            { text: "📞 Call for urgent issues", action: "call_now" },
            { text: "💬 Continue chatting", action: "continue_chat" },
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
      const errorMessage =
        talk2SupportResponses.find((r) => r.id === 14)?.message || "We understand how important this is. We're on it."

      addBotMessage(
        `❌ ${errorMessage} Please contact us directly at support@nextphaseit.org or call +1 984-310-9533.`,
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

  const handleFeedback = (rating: "positive" | "negative") => {
    const feedbackMessage =
      rating === "positive"
        ? "Thank you for the positive feedback! We're glad we could help."
        : "Thank you for your feedback. We'll use this to improve our service."

    addBotMessage(feedbackMessage, [
      { text: "🔙 Back to main menu", action: "main_menu" },
      { text: "📞 Speak with someone", action: "call_now" },
      { text: "📧 Send additional feedback", action: "email_now" },
    ])

    setShowFeedback(false)
  }

  const handleOptionClick = (option: ChatOption) => {
    addUserMessage(option.text)

    switch (option.action) {
      case "create_ticket":
        const ticketMessage =
          talk2SupportResponses.find((r) => r.id === 4)?.message ||
          "Can you please describe the issue you're experiencing? We'll create a support ticket for you."

        addBotMessage(`🎫 ${ticketMessage}`, [
          { text: "📝 Fill out ticket form", action: "show_ticket_form" },
          { text: "📞 Call instead", action: "call_now" },
          { text: "📧 Email support", action: "email_now" },
          { text: "🔙 Back to main menu", action: "main_menu" },
        ])
        break

      case "show_ticket_form":
        setShowTicketForm(true)
        addBotMessage(
          "📋 Please fill out the support ticket form below. I'll make sure it gets to our technical team right away!",
        )
        break

      case "escalate":
        const escalateMessage =
          talk2SupportResponses.find((r) => r.id === 6)?.message ||
          "Would you like me to escalate this issue to a technician right away?"

        addBotMessage(escalateMessage, [
          { text: "✅ Yes, escalate now", action: "escalate_confirm" },
          { text: "📝 Provide more details first", action: "create_ticket" },
          { text: "🔧 Try troubleshooting", action: "troubleshoot" },
          { text: "📞 Call instead", action: "call_now" },
        ])
        break

      case "escalate_confirm":
        escalateToTechnician()
        break

      case "troubleshoot":
        const troubleshootMessage =
          talk2SupportResponses.find((r) => r.id === 12)?.message ||
          "Before we escalate, would you like to try a few troubleshooting steps together?"

        addBotMessage(troubleshootMessage, [
          { text: "🔧 Email issues", action: "troubleshoot_email" },
          { text: "🌐 Website problems", action: "troubleshoot_website" },
          { text: "☁️ Microsoft 365 issues", action: "troubleshoot_m365" },
          { text: "🔒 Security concerns", action: "troubleshoot_security" },
          { text: "🎫 Create ticket instead", action: "create_ticket" },
        ])
        break

      case "troubleshoot_email":
        const emailGuideMessage =
          talk2SupportResponses.find((r) => r.id === 13)?.message ||
          "Here's a quick guide that might resolve your issue. Want to give it a try?"

        addBotMessage(
          `📧 ${emailGuideMessage}\n\n1. Check your internet connection\n2. Verify email settings (SMTP: smtp-mail.outlook.com, Port: 587)\n3. Clear email app cache\n4. Try accessing email via web browser\n\nDid this help resolve your issue?`,
          [
            { text: "✅ Yes, it's working now", action: "issue_resolved" },
            { text: "❌ Still having issues", action: "escalate" },
            { text: "📝 Need more help", action: "create_ticket" },
          ],
        )
        break

      case "troubleshoot_website":
        addBotMessage(
          "🌐 Let's troubleshoot your website issue:\n\n1. Clear browser cache and cookies\n2. Try a different browser\n3. Check if the issue occurs on mobile\n4. Disable browser extensions temporarily\n\nDid this resolve the problem?",
          [
            { text: "✅ Yes, it's working now", action: "issue_resolved" },
            { text: "❌ Still having issues", action: "escalate" },
            { text: "📝 Need more help", action: "create_ticket" },
          ],
        )
        break

      case "troubleshoot_m365":
        addBotMessage(
          "☁️ Microsoft 365 troubleshooting steps:\n\n1. Sign out and sign back in\n2. Check service status at status.office365.com\n3. Clear browser cache\n4. Try incognito/private browsing mode\n\nDid this help?",
          [
            { text: "✅ Yes, it's working now", action: "issue_resolved" },
            { text: "❌ Still having issues", action: "escalate" },
            { text: "📝 Need more help", action: "create_ticket" },
          ],
        )
        break

      case "troubleshoot_security":
        addBotMessage(
          "🔒 Security issue guidance:\n\n1. Change passwords immediately\n2. Enable two-factor authentication\n3. Run antivirus scan\n4. Check recent login activity\n\n⚠️ For security issues, we recommend immediate escalation.",
          [
            { text: "🚨 Escalate immediately", action: "escalate_confirm" },
            { text: "📞 Call security hotline", action: "call_now" },
            { text: "📝 Create urgent ticket", action: "create_ticket" },
          ],
        )
        break

      case "issue_resolved":
        const resolvedMessage =
          talk2SupportResponses.find((r) => r.id === 15)?.message ||
          "Thanks for your patience—your request has been resolved. Let us know if you need anything else!"

        addBotMessage(
          resolvedMessage,
          [
            { text: "⭐ Rate your experience", action: "show_feedback" },
            { text: "📋 Access help desk", action: "help_desk" },
            { text: "💬 Ask another question", action: "main_menu" },
          ],
          false,
          false,
        )
        break

      case "show_feedback":
        const feedbackMessage =
          talk2SupportResponses.find((r) => r.id === 17)?.message ||
          "We'd love to hear your feedback. Would you mind rating your support experience?"

        setShowFeedback(true)
        addBotMessage(feedbackMessage, [], false, true)
        break

      case "continue_chat":
        const continueMessage =
          talk2SupportResponses.find((r) => r.id === 16)?.message ||
          "Is there anything else I can assist you with today?"

        addBotMessage(continueMessage, [
          { text: "💼 Ask about services", action: "services" },
          { text: "💰 Check pricing", action: "pricing" },
          { text: "🎫 Create another ticket", action: "create_ticket" },
          { text: "📞 Speak with someone", action: "call_now" },
          { text: "👋 End chat", action: "end_chat" },
        ])
        break

      case "end_chat":
        const endMessage =
          talk2SupportResponses.find((r) => r.id === 20)?.message ||
          "Thank you for using Talk2Support. Have a great day!"

        const chatSaveMessage =
          talk2SupportResponses.find((r) => r.id === 19)?.message ||
          "This chat will be saved for your reference. You'll also receive a copy via email."

        addBotMessage(`${endMessage}\n\n${chatSaveMessage}`, [
          { text: "📋 Access help desk", action: "help_desk" },
          { text: "📞 Call if needed", action: "call_now" },
          { text: "🔄 Start new chat", action: "reset_chat" },
        ])
        break

      case "reset_chat":
        resetChat()
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
        const mainMenuMessage =
          talk2SupportResponses.find((r) => r.id === 2)?.message ||
          "You're chatting with NextPhase IT. Let us know what issue you're facing!"

        addBotMessage(mainMenuMessage, [
          { text: "💼 What services do you offer?", action: "services" },
          { text: "💰 What are your prices?", action: "pricing" },
          { text: "🎫 Create support ticket", action: "create_ticket" },
          { text: "🚀 How do I get started?", action: "get_started" },
          { text: "📞 Contact information", action: "contact" },
        ])
        break

      default:
        const defaultMessage =
          talk2SupportResponses.find((r) => r.id === 8)?.message ||
          "Your request is being reviewed. We appreciate your patience!"

        addBotMessage(`${defaultMessage} For detailed information, please contact our team:`, [
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
    setShowFeedback(false)
    setChatSession({
      isEscalated: false,
      hasActiveTicket: false,
      supportLevel: "basic",
      sessionId: Math.random().toString(36).substring(7),
    })

    setTimeout(() => {
      const welcomeMessage =
        talk2SupportResponses.find((r) => r.id === 1)?.message ||
        "👋 Hi! I'm the NextPhase IT assistant. How can I help you today?"

      addBotMessage(welcomeMessage, [
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
        <div
          className={`text-white p-4 rounded-t-lg flex items-center justify-between ${
            chatSession.isEscalated ? "bg-orange-600" : "bg-primary"
          }`}
        >
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-white" />
            <div>
              <h3 className="font-semibold text-white">
                {chatSession.isEscalated ? "NextPhase IT - Technician" : "NextPhase IT Assistant"}
              </h3>
              <p className="text-xs opacity-90 text-white">
                {chatSession.isEscalated ? "Escalated Support" : "Online now"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {chatSession.hasActiveTicket && (
              <div className="text-xs bg-white/20 px-2 py-1 rounded text-white">#{chatSession.ticketNumber}</div>
            )}
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
                    message.isBot
                      ? message.isEscalated
                        ? "bg-orange-50 text-orange-900 border border-orange-200 shadow-sm"
                        : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                      : "bg-primary text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line font-medium">{message.text}</p>
                </div>

                {/* Feedback buttons */}
                {message.showFeedback && showFeedback && (
                  <div className="mt-2 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleFeedback("positive")}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1"
                    >
                      <ThumbsUp size={12} className="mr-1" />
                      Good
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleFeedback("negative")}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1"
                    >
                      <ThumbsDown size={12} className="mr-1" />
                      Poor
                    </Button>
                  </div>
                )}

                {message.options && (
                  <div className="mt-2 space-y-1">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className={`w-full text-left justify-start text-xs h-auto py-2 px-3 font-medium bg-white ${
                          message.isEscalated
                            ? "border-orange-300 hover:bg-orange-50 hover:border-orange-500 text-orange-700"
                            : "border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-gray-700"
                        }`}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {message.isBot && (
                <div className="order-1 mr-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.isEscalated ? "bg-orange-600" : "bg-primary"
                    }`}
                  >
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
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    chatSession.isEscalated ? "bg-orange-600" : "bg-primary"
                  }`}
                >
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
