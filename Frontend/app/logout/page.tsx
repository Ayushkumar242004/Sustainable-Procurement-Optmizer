"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut, CheckCircle } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem("userData")

    // Redirect to registration after 3 seconds
    const timer = setTimeout(() => {
      router.push("/registration")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-heading">Successfully Logged Out</CardTitle>
            <CardDescription>Thank you for using SustainPro. You have been safely logged out.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">Redirecting to registration page in a few seconds...</p>

            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />

            <Button
              onClick={() => router.push("/registration")}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Go to Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
