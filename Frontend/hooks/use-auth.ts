// "use client"

// import { useState, useEffect } from "react"
// import { usePathname , useRouter } from "next/navigation"

// export const useAuth = () => {
//   const [userData, setUser] = useState<any>(null)
//   const pathname = usePathname()
  
//   const checkAuth = () => {
//     const token = localStorage.getItem("token")
//     const userData = localStorage.getItem("userData")
    
//     if (token && userData) {
//       setUser(JSON.parse(userData))
//     } else {
//       setUser(null)
//     }
//   }

//   useEffect(() => {
//     checkAuth()
//     window.addEventListener('storage', checkAuth)
//     return () => window.removeEventListener('storage', checkAuth)
//   }, [pathname] )

//   return {
//     userData,
//     isAuthenticated: !!userData,
//   }
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [userData, setUserData] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true) // Start with loading true
  const router = useRouter()

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token")
      const storedUserData = localStorage.getItem("userData")
      
      console.log("useAuth: Checking auth status - token:", !!token, "userData:", !!storedUserData)
      
      if (token && storedUserData) {
        const user = JSON.parse(storedUserData)
        console.log("useAuth: Setting user data:", user)
        setUserData(user)
        setIsAuthenticated(true)
      } else {
        console.log("useAuth: No auth data found")
        setUserData(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("useAuth: Error checking auth status:", error)
      setUserData(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false) // Always set loading to false when done
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    // Clear guidance completion flags
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('guidance_completed_')) {
        localStorage.removeItem(key)
      }
    })
    setUserData(null)
    setIsAuthenticated(false)
    router.push("/auth")
  }

  const updateUserData = (newUserData: any) => {
    console.log("useAuth: Updating user data:", newUserData)
    setUserData(newUserData)
    setIsAuthenticated(!!newUserData)
    if (newUserData) {
      localStorage.setItem("userData", JSON.stringify(newUserData))
    }
  }

  useEffect(() => {
    checkAuthStatus()

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'userData') {
        checkAuthStatus()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return {
    userData,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    loading, // Make sure to return loading
    logout,
    checkAuthStatus,
    updateUserData
  }
}

