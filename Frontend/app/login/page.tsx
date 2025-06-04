"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { LogIn, Mail, User, Building, UserCheck } from "lucide-react"

const roles = ["Procurement Analyst", "Vendor Manager", "Sustainability Head", "Supplier"]

export default function LoginPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    email: "",
    role: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async () => {
    if (!formData.companyName || !formData.fullName || !formData.email || !formData.role) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Check localStorage for existing user data
    const userData = localStorage.getItem("userData")

    if (userData) {
      const user = JSON.parse(userData)

      // Verify credentials
      if (
        user.companyName === formData.companyName &&
        user.contactName === formData.fullName &&
        user.email === formData.email &&
        user.role === formData.role
      ) {
        // Update login status
        user.isLoggedIn = true
        user.lastLogin = new Date().toISOString()
        localStorage.setItem("userData", JSON.stringify(user))

        toast({
          title: "Login successful!",
          description: "Welcome back to SustainPro.",
        })

        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your information and try again.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "No account found",
        description: "Please register first to access the platform.",
        variant: "destructive",
      })

      setTimeout(() => {
        router.push("/registration")
      }, 2000)
    }

    setIsLoading(false)
  }

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
      <div className="container mx-auto">
        <Card className="max-w-md mx-auto animate-slide-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-heading">
              Welcome Back to <span className="gradient-text">SustainPro</span>
            </CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  placeholder="Enter your company name"
                  className="pl-10 transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10 transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="your.email@company.com"
                  className="pl-10 transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Your Role *</Label>
              <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
                <SelectTrigger className="transition-all duration-300 hover:shadow-md">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button onClick={() => router.push("/registration")} className="text-primary hover:underline">
                  Register here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
