import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const greetings = [
  "Hi there! How can I help?",
  "Need IT advice? Ask away!",
  "Want to book a consult?",
  "Curious about our services?",
]

function TypingDots() {
  return (
    <div className="flex gap-1 items-center mt-2">
      <motion.span className="w-2 h-2 bg-[#1E88E5] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
      <motion.span className="w-2 h-2 bg-[#1E88E5] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
      <motion.span className="w-2 h-2 bg-[#1E88E5] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
    </div>
  )
}

function ChatbotWindow({ onClose }: { onClose: () => void }) {
  const [greetingIdx, setGreetingIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIdx((i) => (i + 1) % greetings.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-24 right-4 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl p-6 z-50 border border-[#1E88E5]"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-[#1E88E5]">NextPhase IT Chatbot</span>
        <button onClick={onClose} aria-label="Close chat" className="text-[#1E88E5] hover:text-[#0A4DA1] text-xl font-bold">×</button>
      </div>
      <div className="min-h-[48px] flex flex-col justify-center items-start">
        <motion.span
          key={greetings[greetingIdx]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-[#222]"
        >
          {greetings[greetingIdx]}
        </motion.span>
        <TypingDots />
      </div>
    </motion.div>
  )
}

export function ChatbotButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-40 bg-[#1E88E5] hover:bg-[#0A4DA1] text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
        onClick={() => setOpen(true)}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        aria-label="Open chatbot"
      >
        <motion.svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="inline-block">
          <motion.circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth={2} />
          <motion.path d="M8 15h8M9 9h.01M15 9h.01" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
        </motion.svg>
      </motion.button>
      <AnimatePresence>
        {open && <ChatbotWindow onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
} 