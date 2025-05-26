import Image from "next/image"

export function PDFForm() {
  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 print:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-blue-600 pb-4">
        <div>
          <Image src="/images/nextphase-logo.png" alt="NextPhase IT" width={200} height={60} className="h-16 w-auto" />
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-blue-600">Client Intake Form</h1>
          <p className="text-gray-600">New Client Information</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>Email: adrian.knight@nextphaseit.org</div>
            <div>Phone: +1 984-310-9533</div>
            <div>Location: Clayton, NC</div>
            <div>Website: NextPhase IT Solutions</div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            1. Full Name <span className="text-red-500">*</span>
          </label>
          <div className="border-b-2 border-gray-300 pb-2 min-h-[40px]">
            <div className="text-gray-400 text-sm">Enter your full name</div>
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            2. Email Address <span className="text-red-500">*</span>
          </label>
          <div className="border-b-2 border-gray-300 pb-2 min-h-[40px]">
            <div className="text-gray-400 text-sm">Enter your email address</div>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            3. Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="border-b-2 border-gray-300 pb-2 min-h-[40px]">
            <div className="text-gray-400 text-sm">Enter your phone number</div>
          </div>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">4. Business Name</label>
          <div className="border-b-2 border-gray-300 pb-2 min-h-[40px]">
            <div className="text-gray-400 text-sm">Enter your business name</div>
          </div>
        </div>

        {/* Services Needed */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            5. Services Needed <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400"></div>
              <span className="text-sm">Business Website Development & Hosting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400"></div>
              <span className="text-sm">Professional Email & Domain Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400"></div>
              <span className="text-sm">Client Portal & Booking Systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400"></div>
              <span className="text-sm">IT Infrastructure & Cloud Migrations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400"></div>
              <span className="text-sm">Data Security Audits & Compliance Consulting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400"></div>
              <span className="text-sm">Custom Power Apps & Workflow Automation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400"></div>
              <span className="text-sm">Other: </span>
              <div className="border-b border-gray-300 flex-1 min-h-[20px]"></div>
            </div>
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            6. Preferred Contact Method <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Email</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Phone Call</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Text Message</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Video Call</span>
            </div>
          </div>
        </div>

        {/* How Did You Hear About Us */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">7. How Did You Hear About Us?</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Google Search</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Social Media</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Referral from Friend/Colleague</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Business Directory</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Previous Client</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm">Other: </span>
              <div className="border-b border-gray-300 flex-1 min-h-[20px]"></div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">8. Any Additional Details?</label>
          <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[120px]">
            <div className="text-gray-400 text-sm">
              Please provide any additional information about your project, timeline, budget considerations, or specific
              requirements...
            </div>
            <div className="space-y-2 mt-4">
              <div className="border-b border-gray-200 min-h-[20px]"></div>
              <div className="border-b border-gray-200 min-h-[20px]"></div>
              <div className="border-b border-gray-200 min-h-[20px]"></div>
              <div className="border-b border-gray-200 min-h-[20px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-blue-600">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Next Steps</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Complete this form and return it via email to adrian.knight@nextphaseit.org</p>
            <p>• We'll review your information and contact you within 24 hours</p>
            <p>• Schedule a free consultation to discuss your project in detail</p>
            <p>• Receive a customized proposal tailored to your business needs</p>
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-gray-500">
          <p>© 2024 NextPhase IT. All rights reserved. | Clayton, NC | adrian.knight@nextphaseit.org</p>
        </div>
      </div>
    </div>
  )
}
