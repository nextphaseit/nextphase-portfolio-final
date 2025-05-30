import { Shield } from "lucide-react"
import Image from "next/image"

export default function ErrorLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <Image
          src="/images/nextphase-logo.png"
          alt="NextPhase IT"
          width={200}
          height={60}
          className="h-16 w-auto mx-auto mb-4"
        />
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="text-red-500" size={24} />
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading error details...</p>
      </div>
    </div>
  )
}
