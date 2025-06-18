"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  User,
  Users,
  Leaf,
  TrendingUp,
  TrendingDown,
  Info,
  Target,
  DollarSign,
  Shield,
  Clock,
  Heart,
  Lightbulb,
  Globe,
  Award,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Chatbot } from "@/components/chatbot"
import { useAuth } from "@/hooks/use-auth"

const values = [
  {
    icon: Heart,
    title: "Sustainability First",
    description: "Every decision we make is guided by our commitment to environmental and social responsibility.",
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously push the boundaries of what's possible with AI and data analytics.",
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "We believe in open, honest communication and transparent business practices.",
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
]

const team = [
  {
  name: "Samridhi Jha",
  role: "COO",
  bio: "Operations leader with extensive experience in scaling businesses, optimizing internal processes, and driving cross-functional collaboration."
  },
  {
    name: "Ayush Kumar",
    role: "CEO & Founder",
    bio: "Former sustainability director at Fortune 500 companies with 15+ years of experience.",
  },
  {
    name: "Hafeez Muhammed",
    role: "CTO",
    bio: "AI researcher and engineer with expertise in machine learning and data analytics.",
  },
  {
    name: "Rahul Jambulkar",
    role: "Head of ESG",
    bio: "Environmental scientist and ESG expert with PhD in Sustainable Business Practices.",
  }
]

const suppliers = [
  { id: "greentech", name: "GreenTech Solutions" },
  { id: "ecomanufacturing", name: "EcoManufacturing Co" },
  { id: "sustainableparts", name: "SustainableParts Inc" },
  { id: "cleanenergy", name: "CleanEnergy Corp" },
  { id: "budgetsupply", name: "BudgetSupply Ltd" },
]

const personas = [
  {
    id: "analyst",
    title: "Procurement Analyst",
    description: "Focus on cost optimization and supplier performance analytics",
    icon: User,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    kpis: [
      {
        name: "Cost Savings",
        value: "12.5%",
        trend: "up",
        target: 15,
        current: 12.5,
        description: "Year-over-year procurement cost reduction through strategic sourcing",
        icon: DollarSign,
      },
      {
        name: "Supplier Performance",
        value: "87%",
        trend: "up",
        target: 90,
        current: 87,
        description: "Average performance score across all active suppliers",
        icon: TrendingUp,
      },
      {
        name: "Contract Compliance",
        value: "94%",
        trend: "down",
        target: 95,
        current: 94,
        description: "Percentage of suppliers meeting contractual obligations",
        icon: Shield,
      },
      {
        name: "Processing Time",
        value: "3.2 days",
        trend: "down",
        target: 3,
        current: 3.2,
        description: "Average time to process procurement requests",
        icon: Clock,
      },
    ],
    chartData: [
      { month: "Jan", value: 65, target: 70 },
      { month: "Feb", value: 68, target: 70 },
      { month: "Mar", value: 72, target: 70 },
      { month: "Apr", value: 75, target: 70 },
      { month: "May", value: 78, target: 70 },
      { month: "Jun", value: 82, target: 70 },
    ],
  },
  {
    id: "vendor",
    title: "Vendor Manager",
    description: "Manage supplier relationships and onboarding processes",
    icon: Users,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
    kpis: [
      {
        name: "Active Suppliers",
        value: "247",
        trend: "up",
        target: 250,
        current: 247,
        description: "Total number of active suppliers in the network",
        icon: Users,
      },
      {
        name: "Onboarding Time",
        value: "5.8 days",
        trend: "down",
        target: 5,
        current: 5.8,
        description: "Average time to complete supplier onboarding",
        icon: Clock,
      },
      {
        name: "Supplier Satisfaction",
        value: "4.2/5",
        trend: "up",
        target: 4.5,
        current: 4.2,
        description: "Average satisfaction rating from supplier feedback",
        icon: TrendingUp,
      },
      {
        name: "Risk Assessment",
        value: "Low",
        trend: "stable",
        target: 100,
        current: 85,
        description: "Overall risk level across supplier portfolio",
        icon: Shield,
      },
    ],
    chartData: [
      { month: "Jan", value: 220, target: 250 },
      { month: "Feb", value: 225, target: 250 },
      { month: "Mar", value: 235, target: 250 },
      { month: "Apr", value: 240, target: 250 },
      { month: "May", value: 245, target: 250 },
      { month: "Jun", value: 247, target: 250 },
    ],
  },
  {
    id: "sustainability",
    title: "Sustainability Head",
    description: "Drive ESG initiatives and sustainable sourcing strategies",
    icon: Leaf,
    color: "bg-green-500",
    gradient: "from-green-500 to-green-600",
    kpis: [
      {
        name: "ESG Score",
        value: "78/100",
        trend: "up",
        target: 85,
        current: 78,
        description: "Weighted average ESG score across all suppliers",
        icon: Leaf,
      },
      {
        name: "Carbon Reduction",
        value: "23%",
        trend: "up",
        target: 30,
        current: 23,
        description: "Supply chain carbon footprint reduction year-over-year",
        icon: TrendingDown,
      },
      {
        name: "Sustainable Suppliers",
        value: "65%",
        trend: "up",
        target: 70,
        current: 65,
        description: "Percentage of suppliers with sustainability certifications",
        icon: Target,
      },
      {
        name: "Compliance Rate",
        value: "92%",
        trend: "up",
        target: 95,
        current: 92,
        description: "Environmental and social compliance across suppliers",
        icon: Shield,
      },
    ],
    chartData: [
      { month: "Jan", value: 65, target: 85 },
      { month: "Feb", value: 68, target: 85 },
      { month: "Mar", value: 72, target: 85 },
      { month: "Apr", value: 75, target: 85 },
      { month: "May", value: 78, target: 85 },
      { month: "Jun", value: 78, target: 85 },
    ],
  },
]

const pieData = [
  { name: "Environmental", value: 35, color: "#10b981" },
  { name: "Social", value: 30, color: "#3b82f6" },
  { name: "Governance", value: 35, color: "#8b5cf6" },
]

const adminSteps = [
  {
    role: "Procurement Analyst",
    steps: [
      "Review cost savings metrics and identify optimization opportunities",
      "Analyze supplier performance trends and contract compliance rates",
      "Generate procurement reports for stakeholder review",
      "Monitor processing times and workflow efficiency",
    ],
  },
  {
    role: "Vendor Manager",
    steps: [
      "Onboard new suppliers through the registration portal",
      "Monitor supplier satisfaction scores and relationship health",
      "Conduct risk assessments for existing supplier portfolio",
      "Manage supplier communications and performance reviews",
    ],
  },
  {
    role: "Sustainability Head",
    steps: [
      "Track ESG scores and sustainability metrics across suppliers",
      "Monitor carbon reduction progress and environmental compliance",
      "Identify suppliers needing sustainability improvements",
      "Generate ESG reports for regulatory compliance",
    ],
  },
]

const supplierSteps = [
  "Complete your company registration and profile setup",
  "Submit required ESG documentation and certifications",
  "Complete the sustainability assessment questionnaire",
  "Monitor your ESG score and improvement recommendations",
  "Respond to procurement requests and maintain compliance",
]

export default function Dashboard() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState("greentech")
  const [userRole, setUserRole] = useState<string>("")
  const router = useRouter()
  const { userData , isAuthenticated } = useAuth( ) ; 

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const user = JSON.parse(userData)
      setUserRole(user.role)
    }
  }, [])

  const selectedPersonaData = personas.find((p) => p.id === selectedPersona)

  const isRoleAllowed = (personaId: string) => {
    if (userRole === "Supplier") return false
    if (personaId === "analyst" && userRole === "Procurement Analyst") return true
    if (personaId === "vendor" && userRole === "Vendor Manager") return true
    if (personaId === "sustainability" && userRole === "Sustainability Head") return true
    return false
  }

  const getUserSteps = () => {
    if (userRole === "Supplier") {
      return supplierSteps
    }
    return adminSteps.find((admin) => admin.role === userRole)?.steps || []
  }

  const getUserPersona = () => {
    if (userRole === "Procurement Analyst") return personas.find((p) => p.id === "analyst")
    if (userRole === "Vendor Manager") return personas.find((p) => p.id === "vendor")
    if (userRole === "Sustainability Head") return personas.find((p) => p.id === "sustainability")
    return null
  }

  const userPersona = getUserPersona()

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8 sm:space-y-12 lg:space-y-16">
        {/* About Section */}
        <section className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 sm:mb-6">
              <Globe className="h-4 w-4 mr-2" />
              About SustainPro
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Building a <span className="gradient-text">Sustainable Future</span>
              <br className="hidden sm:block" />
              Through Technology
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed px-4">
              We're on a mission to revolutionize how businesses approach procurement, making sustainability and
              responsibility the cornerstone of every supply chain decision.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">
                  <Target className="h-4 w-4 mr-2" />
                  Our Vision
                </Badge>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
                  A World Where Every Business Decision <span className="gradient-text">Creates Positive Impact</span>
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 lg:mb-6">
                  We envision a future where sustainability isn't just a buzzword, but the foundation of every business
                  operation. Where supply chains are transparent, ethical, and contribute to the wellbeing of our planet
                  and society.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Environmental Impact Reduction</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>Supply Chain Transparency</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>Social Responsibility Score</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-3" />
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Our Mission
                </Badge>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
                  Empowering Businesses with <span className="gradient-text">AI-Driven Insights</span>
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 lg:mb-6">
                  Our mission is to democratize access to sophisticated ESG analysis and sustainable procurement
                  practices. We believe that every business, regardless of size, should have the tools to make
                  responsible sourcing decisions.
                </p>
                <Card className="border-0 bg-gradient-to-br from-primary/5 to-blue-500/5">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Award className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg">Industry Recognition</h3>
                        <p className="text-sm text-muted-foreground">Winner of 2024 Sustainability Innovation Award</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Recognized for our groundbreaking approach to sustainable procurement technology.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-8 lg:space-y-12">
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                <Heart className="h-4 w-4 mr-2" />
                Our Values
              </Badge>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
                What Drives Us <span className="gradient-text">Every Day</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Our core values shape everything we do, from product development to client relationships.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/50 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg ${value.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`h-6 w-6 ${value.color}`} />
                      </div>
                      <CardTitle className="text-lg lg:text-xl font-heading">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm lg:text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Team */}
          <div className="space-y-8 lg:space-y-12">
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                <Users className="h-4 w-4 mr-2" />
                Our Team
              </Badge>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
                Meet the <span className="gradient-text">Visionaries</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Our diverse team of experts brings together decades of experience in sustainability, technology, and
                business strategy.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/50 backdrop-blur-sm"
                >
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-10 w-10 lg:h-12 lg:w-12 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-base lg:text-lg mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3 text-sm lg:text-base">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-8 lg:my-16" />

        {/* User Guidance Section */}
        <section className="space-y-8 lg:space-y-12">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <Info className="h-4 w-4 mr-2" />
              Getting Started Guide
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              Step-by-Step <span className="gradient-text">User Guidance</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Follow these role-specific steps to maximize your platform experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-blue-500/5">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl flex items-center">
                  <User className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary" />
                  Your Role: {userRole || "Not Set"}
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

          {userRole !== "Supplier" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {adminSteps.map((admin, index) => (
                <Card
                  key={index}
                  className={`border-0 transition-all duration-300 ${
                    admin.role === userRole ? "bg-primary/10 border-primary" : "bg-muted/50"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">{admin.role}</CardTitle>
                    <CardDescription className="text-sm">
                      {admin.role === userRole ? "Your current role" : "Other admin role"}
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

        <Separator className="my-8 lg:my-16" />

        {/* Dashboard Section */}
        {userRole !== "Supplier" && userPersona && (
          <section className="space-y-8 lg:space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {userPersona.title} Dashboard
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground px-4">
                Your personalized KPIs and performance insights
              </p>
            </div>

            {/* Supplier Selection */}
            <div className="flex justify-center">
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger className="w-full max-w-64">
                  <SelectValue placeholder="Select a supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6 animate-slide-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {userPersona.kpis.map((kpi, index) => {
                  const KpiIcon = kpi.icon
                  return (
                    <Card
                      key={index}
                      className="relative overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <KpiIcon className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                            <CardTitle className="text-sm lg:text-base font-medium">{kpi.name}</CardTitle>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground hover:text-primary transition-colors" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="text-sm">{kpi.description}</p>
                                <p className="text-xs mt-1 opacity-75">
                                  Current: {kpi.current} | Target: {kpi.target}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl lg:text-3xl font-bold font-heading">{kpi.value}</span>
                            <Badge
                              variant={
                                kpi.trend === "up" ? "default" : kpi.trend === "down" ? "destructive" : "secondary"
                              }
                              className="animate-pulse-slow text-xs"
                            >
                              {kpi.trend === "up" ? (
                                <TrendingUp className="h-2 w-2 lg:h-3 lg:w-3 mr-1" />
                              ) : kpi.trend === "down" ? (
                                <TrendingDown className="h-2 w-2 lg:h-3 lg:w-3 mr-1" />
                              ) : null}
                              {kpi.trend}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Progress to Target</span>
                              <span>{Math.round((kpi.current / kpi.target) * 100)}%</span>
                            </div>
                            <Progress value={(kpi.current / kpi.target) * 100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg lg:text-xl">
                      <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-primary" />
                      Performance Trend
                    </CardTitle>
                    <CardDescription>6-month performance overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={userPersona.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#6b7280"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-4 lg:space-x-6 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full" />
                        <span className="text-sm">Actual Performance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-1 bg-gray-500 rounded" />
                        <span className="text-sm">Target</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg lg:text-xl">
                      <Leaf className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-primary" />
                      ESG Score Breakdown
                    </CardTitle>
                    <CardDescription>Environmental, Social & Governance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-2 lg:space-x-4 mt-4 flex-wrap">
                      {pieData.map((entry, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-xs lg:text-sm">
                            {entry.name}: {entry.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Legend */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg lg:text-xl">
                    <Info className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-primary" />
                    KPI Legend & Explanations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    {userPersona.kpis.map((kpi, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {React.createElement(kpi.icon, { className: "h-3 w-3 lg:h-4 lg:w-4 text-primary" })}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm lg:text-base">{kpi.name}</h4>
                          <p className="text-xs lg:text-sm text-muted-foreground mt-1">{kpi.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            
          </section>
        )}

        {!isAuthenticated && (
          <section className="flex justify-center items-center pb-10 ">
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 hover:scale-105 px-8 py-4 text-xl shadow-xl w-80 h-14 rounded-xl">
                Get Started
              </Button>
            </Link>
          </section>
        )}

      </div>
      <Chatbot />
    </div>
  )
}
