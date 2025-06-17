"use client"

import { useState, useEffect } from "react"
import { usePathname , useRouter } from "next/navigation"

export const useAuth = () => {
  const [userData, setUser] = useState<any>(null)
  const pathname = usePathname()
  
  const checkAuth = () => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("userData")
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    checkAuth()
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [pathname] )

  return {
    userData,
    isAuthenticated: !!userData,
  }
}
