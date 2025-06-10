import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import React from "react"

interface AnimatedHeroBackgroundProps {
  headline: string
  subheadline: string
  ctaText: string
  ctaHref: string
  onCtaClick?: () => void
}

export const AnimatedHeroBackground: React.FC<AnimatedHeroBackgroundProps> = ({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  onCtaClick,
}) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A4DA1] to-[#1E88E5]">
      {/* Animated Gradient Overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ pointerEvents: "none" }}
      >
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(120deg, #0A4DA1 0%, #1E88E5 100%)",
              backgroundSize: "200% 200%",
              opacity: 0.7,
            }}
          />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl px-4 text-center py-24">
        <motion.h1
          className="text-4xl lg:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {headline}
        </motion.h1>
        <motion.p
          className="text-xl text-white/90 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {subheadline}
        </motion.p>
        <motion.a
          href={ctaHref}
          onClick={onCtaClick}
          className="inline-block"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        >
          <Button
            size="lg"
            className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-6 text-lg shadow-lg focus:ring-2 focus:ring-white focus:outline-none"
          >
            {ctaText}
          </Button>
        </motion.a>
      </div>
    </section>
  )
} 