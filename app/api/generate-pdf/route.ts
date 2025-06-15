import { type NextRequest, NextResponse } from "next/server"

// Force dynamic rendering
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const formId = searchParams.get("formId")

    if (!formId) {
      return NextResponse.json({ error: "Form ID is required" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Fetch the form data from Microsoft Forms API using the formId
    // 2. Generate a PDF using a library like PDFKit or jsPDF
    // 3. Return the PDF file

    // For this example, we'll simulate the PDF generation by redirecting to the PDF form page
    // In production, you would generate a real PDF with the submitted data

    return NextResponse.redirect(new URL("/form", request.url))
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
