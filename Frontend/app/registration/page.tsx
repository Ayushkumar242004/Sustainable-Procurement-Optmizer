"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { UserPlus, Building, MapPin, Mail, Phone, Globe, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

const industries = [
  "Manufacturing",
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Energy",
  "Transportation",
  "Construction",
  "Agriculture",
  "Other",
]

const roles = ["Procurement Analyst", "Vendor Manager", "Sustainability Head", "Supplier", "Other"]

const publicDataSample = {
  companyName: "EcoTech Industries",
  industry: "Technology",
  location: "San Francisco, CA",
  website: "www.ecotech-industries.com",
  employeeCount: "201-1000",
  foundedYear: "2018",
  esgScore: 78,
  certifications: ["ISO 14001", "B-Corp"],
  riskLevel: "Low",
}

export default function RegistrationPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    location: "",
    website: "",
    employeeCount: "",
    contactName: "",
    email: "",
    phone: "",
    role: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })
  const [showPublicData, setShowPublicData] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if user is already registered
    const userData = localStorage.getItem("userData")
    if (userData) {
      router.push("/login")
    }
  }, [router])

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateProgress = () => {
    const requiredFields = ["companyName", "industry", "location", "contactName", "email", "role"]
    const filledFields = requiredFields.filter((field) => formData[field] !== "").length
    return Math.round((filledFields / requiredFields.length) * 100)
  }

  const checkPublicData = () => {
    // Simulate checking for public data
    if (formData.companyName.toLowerCase().includes("eco")) {
      setShowPublicData(true)
      // Pre-fill some fields
      updateFormData("industry", publicDataSample.industry)
      updateFormData("location", publicDataSample.location)
      updateFormData("website", publicDataSample.website)
    }
  }

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      toast({
        title: "Please accept the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store user data in localStorage
    const userData = {
      ...formData,
      registrationDate: new Date().toISOString(),
      isLoggedIn: true,
    }
    localStorage.setItem("userData", JSON.stringify(userData))

    setIsSubmitting(false)
    setStep(3) // Success step

    toast({
      title: "Registration successful!",
      description: "Welcome to SustainPro. Redirecting to dashboard...",
    })

    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  useEffect(() => {
    if (formData.companyName && formData.companyName.length > 3) {
      const timer = setTimeout(checkPublicData, 1000)
      return () => clearTimeout(timer)
    }
  }, [formData.companyName])

  if (step === 3) {
    return (
      <div className="relative pt-16 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold font-heading mb-4">
              Welcome to <span className="gradient-text">SustainPro!</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your registration has been completed successfully. Redirecting to dashboard...
            </p>

            {showPublicData && (
              <Card className="mb-6 border-0 bg-gradient-to-br from-primary/5 to-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 mr-2 text-primary" />
                    Initial Assessment Results
                  </CardTitle>
                  <CardDescription>Based on publicly available data about your company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{publicDataSample.esgScore}</div>
                      <div className="text-sm text-muted-foreground">ESG Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{publicDataSample.riskLevel}</div>
                      <div className="text-sm text-muted-foreground">Risk Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {publicDataSample.certifications.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Certifications</div>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-2 mt-4">
                    {publicDataSample.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-heading mb-4">
            Join <span className="gradient-text">SustainPro</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Register your company for comprehensive ESG evaluation and sustainable procurement
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Registration Progress</span>
            <span className="text-sm text-muted-foreground">{calculateProgress()}% Complete</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-center space-x-8">
            {[
              { step: 1, title: "Company Info", icon: Building },
              { step: 2, title: "Contact Details", icon: UserPlus },
            ].map((item) => {
              const Icon = item.icon
              const isActive = step === item.step
              const isCompleted = step > item.step

              return (
                <div key={item.step} className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>
                  <div className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {item.title}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Building className="h-6 w-6 mr-3 text-primary" />
                  Company Information
                </CardTitle>
                <CardDescription>Tell us about your company and industry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    placeholder="Enter your company name"
                  />
                </div>

                {showPublicData && (
                  <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                          Public data found!
                        </span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        We found some information about your company. Fields have been pre-filled where possible.
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Employee Count</Label>
                    <Select
                      value={formData.employeeCount}
                      onValueChange={(value) => updateFormData("employeeCount", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201-1000">201-1000</SelectItem>
                        <SelectItem value="1000+">1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                      placeholder="City, Country"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => updateFormData("website", e.target.value)}
                      placeholder="www.yourcompany.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <UserPlus className="h-6 w-6 mr-3 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>Provide your contact details for account setup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Full Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => updateFormData("contactName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
                    <SelectTrigger>
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

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => updateFormData("agreeToTerms", checked)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>{" "}
                      *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) => updateFormData("subscribeNewsletter", checked)}
                    />
                    <Label htmlFor="subscribeNewsletter" className="text-sm">
                      Subscribe to our newsletter for sustainability insights and platform updates
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}


          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">Step {step} of 2</div>

            {step === 2 ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.agreeToTerms}
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Go to Login Button */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/login")}
              className="text-primary underline"
            >
              Go to Login
            </Button>
          </div>



        </div>
      </div>
    </div>
  )
}
