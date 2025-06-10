import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const options = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Prices", href: "/prices" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Client Portal", href: "/client-portal" },
  { label: "Success Stories", href: "/success-stories" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  function handleSelect(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel as={motion.div} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/10">
              <Dialog.Title className="text-lg font-bold mb-4 text-[#1E88E5]">Quick Navigation</Dialog.Title>
              <ul className="space-y-2">
                {options.map((opt) => (
                  <li key={opt.href}>
                    <button
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-[#222] font-medium transition"
                      onClick={() => handleSelect(opt.href)}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-gray-400 text-center">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded border">⌘K</kbd> or <kbd className="px-1 py-0.5 bg-gray-100 rounded border">Ctrl+K</kbd> to open/close</p>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
} 