import Link from "next/link"
import { motion } from "framer-motion"

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Client Portal", href: "/client-portal" },
  { label: "Legal", href: "/legal" },
]

export function AnimatedFooter() {
  return (
    <footer className="bg-[#0A4DA1] text-white relative">
      {/* Moving Gradient Line */}
      <motion.div
        className="absolute left-0 right-0 h-1"
        style={{ bottom: 0, background: "linear-gradient(90deg, #1E88E5, #0A4DA1, #1E88E5)", backgroundSize: "200% 100%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">NextPhase IT</h3>
            <p className="text-white/80 max-w-xs">
              Empowering businesses with modern IT solutions and expert support.
            </p>
          </div>
          <nav aria-label="Footer links">
            <ul className="flex flex-wrap gap-6 justify-center">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <motion.span
                      className="text-white/80 hover:text-white cursor-pointer relative"
                      whileHover={{ color: "#fff" }}
                    >
                      {link.label}
                      <motion.span
                        className="absolute left-0 right-0 h-0.5 bg-[#1E88E5] rounded"
                        style={{ bottom: -2 }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
          <p>© 2024 NextPhase IT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 