// PKCE (Proof Key for Code Exchange) utilities
export class PKCEHelper {
  private static base64URLEncode(str: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(str)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")
  }

  private static async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return await crypto.subtle.digest("SHA-256", data)
  }

  static generateCodeVerifier(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return this.base64URLEncode(array.buffer)
  }

  static async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const hashed = await this.sha256(codeVerifier)
    return this.base64URLEncode(hashed)
  }

  static storePKCEData(codeVerifier: string, state: string): void {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pkce_code_verifier", codeVerifier)
      sessionStorage.setItem("oauth_state", state)
    }
  }

  static retrievePKCEData(): { codeVerifier: string | null; state: string | null } {
    if (typeof window !== "undefined") {
      return {
        codeVerifier: sessionStorage.getItem("pkce_code_verifier"),
        state: sessionStorage.getItem("oauth_state"),
      }
    }
    return { codeVerifier: null, state: null }
  }

  static clearPKCEData(): void {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pkce_code_verifier")
      sessionStorage.removeItem("oauth_state")
    }
  }
}
