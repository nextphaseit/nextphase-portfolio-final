import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { resourceId, resourceTitle, downloadType } = await request.json()

    // Log the download (you can enhance this to save to database)
    console.log("Resource Download:", {
      resourceId,
      resourceTitle,
      downloadType,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    // You can add database logging here
    // await db.downloads.create({
    //   resourceId,
    //   resourceTitle,
    //   downloadType,
    //   timestamp: new Date(),
    //   userAgent: request.headers.get('user-agent'),
    //   ip: request.headers.get('x-forwarded-for')
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Download tracking error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
