"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { User, Mail, Shield, Edit, Save, X, Building, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface ProfileData {
  email: string
  role: string
  company_name?: string
  email_domain?: string
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<ProfileData>({ email: "", role: "" })
  const [formData, setFormData] = useState<ProfileData>({ email: "", role: "" })
  const router = useRouter()
  const { userData, isAuthenticated } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated || !userData) {
        router.push("/login")
        return
      }
      
      // Set initial data from userData
      const profileData = {
        email: userData.email,
        role: userData.role
      }
      
      setCurrentProfile(profileData)
      setFormData(profileData)
      
      // Fetch complete profile with company info
      fetchProfile()
    }, 100)

    return () => clearTimeout(timer)
  }, [isAuthenticated, userData, router])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/me`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentProfile(data.data)
        setFormData({
          email: data.data.email,
          role: data.data.role
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/update`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.detail || `HTTP ${response.status}: Failed to update profile`)
      }

      // Update localStorage with new data
      const updatedUserData = { ...userData, ...formData }
      localStorage.setItem("userData", JSON.stringify(updatedUserData))

      // Update current profile state
      setCurrentProfile(prev => ({ ...prev, ...formData }))
      
      toast.success("Profile updated successfully!")
      setEditing(false)
      
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      email: currentProfile.email,
      role: currentProfile.role
    })
    setEditing(false)
  }

  const getInitials = (email: string) => {
    if (!email) return "U"
    return email.split("@")[0].substring(0, 2).toUpperCase()
  }

  if (!userData || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading Profile...</h1>
          </div>
        </div>
      </div>
    )
  }

  const displayData = editing ? formData : currentProfile

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground">Your account information</p>
              </div>
              {!editing ? (
                <Button onClick={() => setEditing(true)} className="gap-2 w-fit">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave} 
                    disabled={saving} 
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="gap-2">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {/* Profile Overview Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <Avatar className="h-24 w-24 mx-auto sm:mx-0">
                    <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                      {getInitials(displayData.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3 text-center sm:text-left">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">
                        {displayData.email.split('@')[0]}
                      </CardTitle>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {displayData.email}
                        </span>
                      </div>
                      {currentProfile.company_name && (
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {currentProfile.company_name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center sm:justify-start">
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="h-3 w-3" />
                        {displayData.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Editable Profile Information Card */}
            {editing && (
              <Card className="border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Edit Profile Information
                  </CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Role */}
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        placeholder="Enter your role"
                        className="max-w-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Account Information Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Your account details and company information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
                    <div className="space-y-1">
                      <p className="font-medium">Email Address</p>
                      <p className="text-sm text-muted-foreground">
                        {displayData.email}
                      </p>
                    </div>
                    <Badge variant="outline" className="gap-1 w-fit">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
                    <div className="space-y-1">
                      <p className="font-medium">Company Name</p>
                      <p className="text-sm text-muted-foreground">
                        {currentProfile.company_name || "Not found"}
                      </p>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {currentProfile.company_name ? "Found" : "Not Found"}
                    </Badge>
                  </div>

                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
                    <div className="space-y-1">
                      <p className="font-medium">Account Role</p>
                      <p className="text-sm text-muted-foreground">
                        {displayData.role === "supplier" ? "Supplier Account" : "Company Account"}
                      </p>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {displayData.role}
                    </Badge>
                  </div>

                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
                    <div className="space-y-1">
                      <p className="font-medium">Email Domain</p>
                      <p className="text-sm text-muted-foreground">
                        {currentProfile.email_domain || displayData.email.split('@')[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
