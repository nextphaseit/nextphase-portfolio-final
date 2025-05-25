"use client"

import { PDFForm } from "@/components/pdf-form"

export default function FormPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">NextPhase IT Client Intake Form</h1>
          <p className="text-gray-600">Print this page or save as PDF to create a fillable form</p>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Print Form
            </button>
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save as PDF
            </button>
          </div>
        </div>

        <PDFForm />
      </div>
    </div>
  )
}
