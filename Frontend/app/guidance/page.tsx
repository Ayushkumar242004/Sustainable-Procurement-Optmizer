"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Info, ArrowRight } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const roleSteps = {
  "Procurement Analyst": [
    "Access the Data Submission portal to upload supplier ESG reports",
    "Review automated ESG scoring and analysis results",
    "Use the Analytics dashboard to compare supplier performance",
    "Generate comprehensive procurement reports for stakeholders",
    "Set up monitoring alerts for key supplier metrics",
    "Utilize the Trade-off Simulator for decision optimization"
  ],
  "Vendor Manager": [
    "Navigate to Supplier Directory to manage vendor relationships",
    "Upload and verify supplier documentation and certifications",
    "Track supplier ESG compliance status and updates",
    "Set up automated monitoring and alert systems",
    "Conduct regular supplier assessments and reviews",
    "Manage vendor communication and improvement plans"
  ],
  "Sustainability Head": [
    "Access the comprehensive ESG Analytics dashboard",
    "Review organizational sustainability performance metrics",
    "Set sustainability targets and KPIs for your organization",
    "Generate executive-level sustainability reports",
    "Monitor industry benchmarks and competitive analysis",
    "Implement and track improvement recommendations"
  ],
  "Supplier": [
    "Upload your ESG reports and sustainability certifications",
    "Complete detailed sustainability questionnaires and assessments",
    "View your ESG scores and performance rankings",
    "Access personalized improvement recommendations",
    "Track your progress over time with historical data",
    "Engage with procurement teams through the platform"
  ]
}

const adminSteps = [
  {
    role: "Procurement Analyst",
    steps: [
      "Upload and analyze supplier ESG data",
      "Generate procurement insights and reports",
      "Compare supplier performance metrics",
      "Monitor compliance and risk factors"
    ]
  },
  {
    role: "Vendor Manager", 
    steps: [
      "Manage supplier relationships and onboarding",
      "Track vendor compliance and certifications",
      "Conduct supplier assessments and reviews",
      "Maintain supplier directory and communications"
    ]
  },
  {
    role: "Sustainability Head",
    steps: [
      "Oversee organizational ESG strategy",
      "Set sustainability targets and KPIs",
      "Generate executive sustainability reports",
      "Drive improvement initiatives and benchmarking"
    ]
  }
]


export default function GuidancePage() {
  const [pageLoading, setPageLoading] = useState(true)
  const { userData, isAuthenticated, loading } = useAuth() // Make sure to get loading from useAuth
  const router = useRouter()

  useEffect(() => {
    console.log("Guidance page: useEffect triggered")
    console.log("Guidance page: loading:", loading, "isAuthenticated:", isAuthenticated, "userData:", userData)
    
    // Wait for auth hook to finish loading
    if (loading) {
      console.log("Auth still loading, waiting...")
      return
    }

    // Now we can safely check authentication
    if (!isAuthenticated || !userData) {
      console.log("Guidance page: Not authenticated, redirecting to auth")
      router.push("/auth")
      return
    }

    // Check if guidance was already completed for this specific user
    const guidanceKey = `guidance_completed_${userData.email}_${userData.role}`
    const guidanceCompleted = localStorage.getItem(guidanceKey)
    console.log("Guidance page: Checking completion:", guidanceKey, "Result:", guidanceCompleted)
    
    if (guidanceCompleted === "true") {
      console.log("Guidance page: Already completed, redirecting to home")
      router.push("/")
      return
    }

    // All checks passed, show the guidance page
    setPageLoading(false)
  }, [loading, isAuthenticated, userData, router]) // Add loading to dependencies

  const getUserSteps = () => {
    if (!userData?.role) return []
    return roleSteps[userData.role as keyof typeof roleSteps] || []
  }

  const handleGetStarted = () => {
    if (userData) {
      const guidanceKey = `guidance_completed_${userData.email}_${userData.role}`
      localStorage.setItem(guidanceKey, "true")
      console.log("Marking guidance as completed:", guidanceKey)
      
      // Redirect based on role
      const redirectPaths = {
        "Procurement Analyst": "/data-submission",
        "Vendor Manager": "/supplier-directory", 
        "Sustainability Head": "/assessment",
        "Supplier": "/data-submission"
      }
      
      const redirectPath = redirectPaths[userData.role as keyof typeof redirectPaths] || "/"
      console.log("Redirecting to:", redirectPath)
      router.push(redirectPath)
    }
  }

  const handleSkip = () => {
    if (userData) {
      const guidanceKey = `guidance_completed_${userData.email}_${userData.role}`
      localStorage.setItem(guidanceKey, "true")
      console.log("Skipping guidance, marking as completed:", guidanceKey)
      router.push("/")
    }
  }

  // Show loading while auth is loading or page is loading
  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // This should not happen now, but keep as fallback
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>No user data found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12">
          <Badge variant="outline" className="mb-4">
            <Info className="h-4 w-4 mr-2" />
            Getting Started Guide
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            Welcome to <span className="gradient-text">SustainPro</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Follow these role-specific steps to maximize your platform experience
          </p>
        </div>

        {/* User Guidance Section */}
        <section className="space-y-8 lg:space-y-12">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-blue-500/5">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl flex items-center">
                  <User className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary" />
                  Your Role: {userData.role || "Not Set"}
                </CardTitle>
                <CardDescription>Customized guidance based on your role and responsibilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getUserSteps().map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 lg:p-4 rounded-lg bg-background/50">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs lg:text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm lg:text-base leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8 lg:my-16" />

          {/* Admin Steps for Non-Supplier Roles */}
          {userData.role !== "Supplier" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {adminSteps.map((admin, index) => (
                <Card
                  key={index}
                  className={`border-0 transition-all duration-300 ${
                    admin.role === userData.role ? "bg-primary/10 border-primary" : "bg-muted/50"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">{admin.role}</CardTitle>
                    <CardDescription className="text-sm">
                      {admin.role === userData.role ? "Your current role" : "Other admin role"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {admin.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-2">
                          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-primary" />
                          </div>
                          <p className="text-xs lg:text-sm leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="px-8 py-3"
          >
            Skip for Now
          </Button>
          <Button 
            onClick={handleGetStarted}
            className="px-8 py-3 bg-primary hover:bg-primary/90"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
