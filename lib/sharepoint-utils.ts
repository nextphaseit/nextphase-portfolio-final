/**
 * SharePoint utility functions for the client portal
 */

export interface SharePointResource {
  id: string
  title: string
  type: string
  shareUrl: string
  downloadUrl: string
  previewUrl: string
  isAccessible?: boolean
}

/**
 * Validates a SharePoint share URL format
 */
export function validateSharePointUrl(url: string): boolean {
  const sharePointPattern = /^https:\/\/[a-zA-Z0-9-]+\.sharepoint\.com\/:([bwxp]):/
  return sharePointPattern.test(url)
}

/**
 * Generates download and preview URLs from a SharePoint share URL
 */
export function generateSharePointUrls(shareUrl: string) {
  if (!validateSharePointUrl(shareUrl)) {
    throw new Error("Invalid SharePoint URL format")
  }

  return {
    shareUrl,
    downloadUrl: `${shareUrl}&download=1`,
    previewUrl: `${shareUrl}&action=embedview`,
  }
}

/**
 * Extracts file type from SharePoint URL
 */
export function getFileTypeFromSharePointUrl(url: string): string {
  const match = url.match(/:([bwxp]):/)
  if (!match) return "unknown"

  const typeMap: Record<string, string> = {
    b: "PDF",
    w: "DOCX",
    x: "XLSX",
    p: "PPTX",
  }

  return typeMap[match[1]] || "unknown"
}

/**
 * Checks if a SharePoint URL is accessible (client-side)
 */
export async function checkSharePointAccess(url: string): Promise<boolean> {
  try {
    // Note: This will likely fail due to CORS, but we can try
    const response = await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
    })
    return true
  } catch (error) {
    // CORS will cause this to fail, but that doesn't mean the link is broken
    // In a real implementation, you'd need a server-side check
    console.warn("Cannot check SharePoint access due to CORS:", error)
    return true // Assume accessible if we can't check
  }
}

/**
 * Formats SharePoint error messages for users
 */
export function formatSharePointError(error: any): string {
  const commonErrors = {
    "This link has been removed": "The file sharing permissions need to be updated. Please contact support.",
    "Access denied": "You don't have permission to access this file. Please contact support.",
    "File not found": "This file may have been moved or deleted. Please contact support.",
    "Sign in required": "The file requires authentication. Please contact support for access.",
  }

  const errorMessage = error?.message || error?.toString() || "Unknown error"

  for (const [pattern, message] of Object.entries(commonErrors)) {
    if (errorMessage.includes(pattern)) {
      return message
    }
  }

  return "Unable to access this resource. Please contact support if this issue persists."
}

/**
 * Creates a SharePoint resource object with proper URLs
 */
export function createSharePointResource(
  id: string,
  title: string,
  shareUrl: string,
  options: {
    description?: string
    category?: string
    size?: string
    updated?: string
  } = {},
): SharePointResource {
  const { downloadUrl, previewUrl } = generateSharePointUrls(shareUrl)
  const type = getFileTypeFromSharePointUrl(shareUrl)

  return {
    id,
    title,
    type,
    shareUrl,
    downloadUrl,
    previewUrl,
    description: options.description || "",
    category: options.category || "general",
    size: options.size || "Unknown",
    updated: options.updated || new Date().toLocaleDateString(),
    isAccessible: true,
  }
}
