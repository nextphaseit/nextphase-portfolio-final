"use client"

import { useCustomAuth } from "@/providers/custom-auth-provider"
import { withCustomAuth } from "@/providers/custom-auth-provider"

const PortalPage = () => {
  const { user, logout, isAuthenticated } = useCustomAuth()

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Portal Page</h1>
      <p>Welcome, {user?.email}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default withCustomAuth(PortalPage)
