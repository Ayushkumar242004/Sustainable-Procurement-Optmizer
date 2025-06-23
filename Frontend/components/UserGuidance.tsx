"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Upload, BarChart3, Users, Building } from "lucide-react"

interface UserGuidanceProps {
  userRole: string
  userName?: string
}

const roleGuidance = {
  "Procurement Analyst": {
    icon: BarChart3,
    title: "Welcome, Procurement Analyst!",
    description: "Your role focuses on analyzing supplier data and making informed procurement decisions.",
    steps: [
      "Upload supplier ESG reports and documentation",
      "Review automated ESG scoring and analysis", 
      "Compare suppliers using our ranking system",
      "Generate comprehensive procurement reports",
      "Monitor supplier performance over time"
    ],
    nextAction: "Start by uploading your first ESG report",
    redirectPath: "/data-submission"
  },
  "Vendor Manager": {
    icon: Users,
    title: "Welcome, Vendor Manager!",
    description: "Manage your vendor relationships and ensure compliance with sustainability standards.",
    steps: [
      "Register and onboard new suppliers",
      "Track supplier ESG compliance status", 
      "Set up automated monitoring alerts",
      "Conduct regular supplier assessments",
      "Manage vendor communication and updates"
    ],
    nextAction: "Begin with supplier directory management",
    redirectPath: "/supplier-directory"
  },
  "Sustainability Head": {
    icon: Building,
    title: "Welcome, Sustainability Head!",
    description: "Lead sustainability initiatives and monitor organizational ESG performance.",
    steps: [
      "Review comprehensive ESG analytics dashboard",
      "Set sustainability targets and KPIs",
      "Generate executive sustainability reports", 
      "Monitor industry benchmarks and trends",
      "Implement improvement recommendations"
    ],
    nextAction: "Access your sustainability dashboard",
    redirectPath: "/assessment"
  },
  "Supplier": {
    icon: Upload,
    title: "Welcome, Supplier!",
    description: "Submit your sustainability data and track your ESG performance.",
    steps: [
      "Upload your ESG reports and certifications",
      "Complete sustainability questionnaires",
      "View your ESG scores and rankings",
      "Access improvement recommendations", 
      "Track your progress over time"
    ],
    nextAction: "Upload your ESG documentation",
    redirectPath: "/data-submission"
  }
}

export default function UserGuidance({ userRole, userName }: UserGuidanceProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const guidance = roleGuidance[userRole as keyof typeof roleGuidance]

  useEffect(() => {
    // Auto-advance steps for demo effect
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < guidance?.steps.length - 1 ? prev + 1 : prev))
    }, 1000)

    return () => clearInterval(interval)
  }, [guidance?.steps.length])

  if (!guidance) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Role Not Recognized</CardTitle>
            <CardDescription>
              Your role "{userRole}" is not configured for guided onboarding.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")} className="w-full">
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const IconComponent = guidance.icon

  const handleNext = () => {
    // Mark guidance as completed in localStorage with user-specific key
    const userEmail = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!).email : "unknown"
    localStorage.setItem(`guidance_completed_${userEmail}_${userRole}`, "true")
    router.push(guidance.redirectPath)
  }

  const handleSkip = () => {
    // Mark guidance as completed when skipped
    const userEmail = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!).email : "unknown"
    localStorage.setItem(`guidance_completed_${userEmail}_${userRole}`, "true")
    router.push("/")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50/90 to-blue-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{guidance.title}</CardTitle>
          {userName && (
            <Badge variant="secondary" className="mx-auto w-fit">
              {userName}
            </Badge>
          )}
          <CardDescription className="text-base mt-2">
            {guidance.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4 text-lg">Your Getting Started Guide:</h3>
            <div className="space-y-3">
              {guidance.steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <div className={`mt-0.5 ${
                    index <= currentStep ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className={`text-sm ${
                    index <= currentStep ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              💡 Next Step: {guidance.nextAction}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="flex-1"
            >
              Skip for Now
            </Button>
            <Button 
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
