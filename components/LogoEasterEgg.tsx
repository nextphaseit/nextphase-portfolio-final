import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LogoEasterEgg({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)

  function handleClick() {
    setCount((c) => {
      if (c + 1 === 5) {
        setShow(true)
        setTimeout(() => setShow(false), 3500)
        return 0
      }
      return c + 1
    })
  }

  return (
    <>
      <span onClick={handleClick} tabIndex={0} className="cursor-pointer outline-none focus:ring-2 focus:ring-[#1E88E5]">
        {children}
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1E88E5] text-white px-6 py-4 rounded-xl shadow-lg z-50 text-center"
            role="alert"
            aria-live="polite"
          >
            <span className="font-bold">You found our easter egg!</span>
            <div>Welcome to the next phase.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 