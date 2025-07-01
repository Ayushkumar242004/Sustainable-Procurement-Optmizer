"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CircularProgress } from "@/components/CircularProgress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
  TrendingDown,
  Info,
  DollarSign,
  Clock,
  Heart,
  Lightbulb,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Chatbot } from "@/components/chatbot"
import { useAuth } from "@/hooks/use-auth"
import {
  BarChart3,
  Shield,
  Leaf,
  Users,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  FileText,
  TrendingUp,
  Globe,
  Award,
  AlertTriangle,
  Search,
} from "lucide-react"

const services = [
  {
    id: "esg",
    icon: Leaf,
    title: "ESG Analysis",
    description: "Comprehensive Environmental, Social, and Governance evaluation",
    features: ["AI-powered scoring", "Real-time monitoring", "Compliance tracking", "Benchmarking"],
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: "ranking",
    icon: BarChart3,
    title: "Supplier Ranking",
    description: "Data-driven supplier performance evaluation and ranking",
    features: ["Multi-criteria analysis", "Custom weighting", "Performance trends", "Risk assessment"],
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: "risk",
    icon: Shield,
    title: "Risk Assessment",
    description: "Proactive identification and mitigation of supply chain risks",
    features: ["Risk scoring", "Early warning alerts", "Mitigation strategies", "Compliance monitoring"],
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
  {
    id: "compliance",
    icon: CheckCircle,
    title: "Cost Efficiency & Reliability Evaluation",
    description: "Continuous monitoring of regulatory and policy compliance",
    features: ["Multi-criteria Analysis", "Regulatory updates", "Audit trails", "Reporting tools"],
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
]

const evaluationSteps = [
  {
    step: "01",
    title: "Data Collection & Integration",
    description:
      "Gather comprehensive supplier data from multiple sources including public records, certifications, and direct submissions.",
    details: [
      "Automated data ingestion from 50+ sources",
      "Integration with existing ERP systems",
      "Real-time data synchronization",
      "Data validation and quality checks",
    ],
    icon: Search,
  },
  {
    step: "02",
    title: "AI-Powered Analysis",
    description: "Apply advanced machine learning algorithms to analyze ESG performance across multiple dimensions.",
    details: [
      "Natural language processing for document analysis",
      "Pattern recognition for risk identification",
      "Predictive modeling for future performance",
      "Sentiment analysis of public information",
    ],
    icon: Zap,
  },
  {
    step: "03",
    title: "Risk Assessment & Scoring",
    description:
      "Evaluate potential risks and assign comprehensive scores based on your specific criteria and industry standards.",
    details: [
      "Multi-dimensional risk scoring",
      "Industry-specific benchmarking",
      "Custom weighting based on priorities",
      "Continuous score updates",
    ],
    icon: Shield,
  },
  {
    step: "04",
    title: "Actionable Insights & Recommendations",
    description:
      "Generate detailed reports with specific recommendations for supplier improvement and risk mitigation.",
    details: [
      "Personalized improvement roadmaps",
      "Priority-based action items",
      "ROI calculations for improvements",
      "Implementation timelines",
    ],
    icon: Target,
  },
]

const faqs = [
  {
    question: "How accurate is your ESG scoring system?",
    answer:
      "Our AI-powered ESG scoring system achieves 95%+ accuracy by analyzing over 200 data points from multiple verified sources. We continuously validate our models against industry standards and expert assessments.",
  },
  {
    question: "How long does the supplier evaluation process take?",
    answer:
      "Initial evaluation typically takes 24-48 hours for comprehensive analysis. Real-time monitoring provides continuous updates, and our system can process bulk evaluations for large supplier networks within a week.",
  },
  {
    question: "Can you integrate with our existing procurement systems?",
    answer:
      "Yes, we offer seamless integration with 50+ popular ERP and procurement platforms including SAP, Oracle, and Microsoft Dynamics. Our API-first approach ensures smooth data flow and minimal disruption.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve clients across manufacturing, retail, technology, healthcare, automotive, and financial services. Our platform is customizable to meet industry-specific requirements and regulations.",
  },
  {
    question: "How do you ensure data security and privacy?",
    answer:
      "We maintain SOC 2 Type II certification, ISO 27001 compliance, and GDPR adherence. All data is encrypted in transit and at rest, with role-based access controls and regular security audits.",
  },
]

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
    bio: "Operations expert in scaling businesses, streamlining processes, and leading cross-functional teams.",
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
  },
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
      "Track cost savings and supplier performance",
      "Ensure contract compliance",
      "Generate procurement reports",
      "Monitor workflow efficiency",
    ],
  },
  {
    role: "Vendor Manager",
    steps: [
      "Onboard suppliers via registration portal",
      "Track supplier satisfaction and relationships",
      "Access risk in supplier portfolio",
      "Oversee supplier communications and reviews",
    ],
  },
  {
    role: "Sustainability Head",
    steps: [
      "Track ESG scores and supplier metrics",
      "Monitor carbon reduction & compliance",
      "Identify areas of sustainability improvements",
      "Generate ESG reports for compliance",
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
  const { userData, isAuthenticated } = useAuth()

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
  const [activeTab, setActiveTab] = useState("overview")
  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 w-full">
      <div className="w-full px-4 py-8 space-y-12 md:space-y-16">
        {/* Enhanced Hero Section */}
      <section className="w-full py-16 md:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-[#2563eb]/10 via-white via-30% to-[#a21caf]/10 dark:from-black dark:via-[#2563eb]/10 dark:via-40% dark:to-[#a21caf]/10">
  <div className="absolute inset-0 pointer-events-none z-0 animate-gradient-x bg-gradient-to-r from-[#E2142D]/10 via-[#2563eb]/10 via-40% to-[#a21caf]/10" />
  
  <div className="w-full max-w-4xl mx-auto text-center space-y-6 relative z-10">
    <Badge className="px-4 py-1.5 border-[#2563eb] text-[#2563eb] bg-white/80 dark:bg-black/80 font-semibold tracking-wide shadow-md">
      <Globe className="h-3 w-3 mr-2" />
Transforming Resilient Procurement
    </Badge>

    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-tight font-['Inter','IBM Plex Sans',sans-serif]">
      <span className="bg-gradient-to-r from-[#E2142D] via-[#2563eb] to-[#a21caf] bg-clip-text text-transparent animate-gradient-text">
        ProcurePro:
      </span>{" "}
      Smarter Procurement. Greater Impact.
    </h1>

    <div className="flex justify-center items-center gap-2">
      <span className="bg-gradient-to-r from-[#E2142D] via-[#2563eb] to-[#a21caf] bg-clip-text text-transparent animate-gradient-text text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
        Scale at Speed
      </span>
    </div>

    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
      Empowering smarter, resilient procurement with AI-driven ESG insights.
    </p>

    <div className="flex justify-center gap-4 pt-4">
      <Link href="/auth">
        <Button className="px-6 h-11 rounded-lg bg-gradient-to-r from-[#E2142D] to-[#2563eb] hover:from-[#E2142D]/90 hover:to-[#2563eb]/80 transition-all duration-300 hover:shadow-xl font-bold text-white text-lg tracking-wide shadow-lg">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
      <Link href="#about">
        <Button variant="outline" className="px-6 h-11 rounded-lg border-[#2563eb] text-[#2563eb] font-bold hover:bg-[#2563eb]/10 transition-all duration-300">
          Learn More
        </Button>
      </Link>
    </div>
  </div>
</section>

        {/* About Section */}
        <section id="about" className="w-full space-y-12 md:space-y-36">
  {/* Vision & Mission */}
  <div className="w-full grid lg:grid-cols-2 gap-22 lg:gap-40 items-start mb-[8em]">
    {/* Vision */}
    <div className="space-y-4 w-full">
      <div>
        <Badge variant="outline" className="mb-4 border-[#E2142D] text-[#E2142D] bg-white/80 dark:bg-black/80 font-semibold">
          <Target className="h-3 w-3 mr-2" />
          Our Vision
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 font-['Inter','IBM Plex Sans',sans-serif]">
          Redefining Business with{" "}
          <span className="bg-gradient-to-r from-[#E2142D] via-[#2563eb] to-[#a21caf] bg-clip-text text-transparent animate-gradient-text">
            Purpose and Performance
          </span>
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6 text-base">
          We envision a future where every procurement decision is a step toward a more resilient, responsible, and high-performing supply chain.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          <CircularProgress value={85} label="Sustainable Sourcing" color="#E2142D" />
          <CircularProgress value={88} label="Social Responsibility Compliance" color="#2563eb" />
          <CircularProgress value={83} label="Ethical & Regulatory Governance" color="#a21caf" />
        </div>
      </div>
    </div>

    {/* Mission */}
    <div className="space-y-4 w-full">
      <div>
        <Badge variant="outline" className="mb-4 border-[#2563eb] text-[#2563eb] bg-white/80 dark:bg-black/80 font-semibold">
          <Lightbulb className="h-3 w-3 mr-2" />
          Our Mission
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 font-['Inter','IBM Plex Sans',sans-serif]">
          Empowering Procurement.{" "}
          <span className="bg-gradient-to-r from-[#2563eb] via-[#E2142D] to-[#a21caf] bg-clip-text text-transparent animate-gradient-text">
            Driving Sustainable Value.
          </span>
        </h2>
        <p className="text-muted-foreground leading-relaxed text-base mb-6">
          Our mission is to transform the procurement landscape by equipping organizations with data-driven insights that go beyond ESG.
        </p>
        <Card className="w-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-[#E2142D]/5 via-[#2563eb]/10 to-[#a21caf]/10 backdrop-blur-sm animate-fade-in">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-[#E2142D]" />
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Industry Recognition</h3>
                <p className="text-muted-foreground text-base">
                  Sustainability Innovation Award '24 Winner
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>

  {/* Values */}
  <div className="w-full space-y-12">
    <div className="text-center">
      <Badge variant="outline" className="mb-4 border-[#a21caf] text-[#a21caf] bg-white/80 dark:bg-black/80 font-semibold">
        <Heart className="h-3 w-3 mr-2" />
        Our Values
      </Badge>
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 font-['Inter','IBM Plex Sans',sans-serif]">
        What Drives Us{" "}
        <span className="bg-gradient-to-r from-[#E2142D] via-[#2563eb] to-[#a21caf] bg-clip-text text-transparent animate-gradient-text">
          Every Day
        </span>
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto text-base">
        Guiding our products, partnerships, and decisions at every step of the journey.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {values.map((value, index) => {
        const Icon = value.icon
        return (
          <Card
            key={index}
            className="w-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-[#E2142D]/5 via-[#2563eb]/10 to-[#a21caf]/10 backdrop-blur-sm animate-fade-in"
          >
            <CardHeader>
              <div
                className={`w-10 h-10 rounded-lg ${value.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`h-5 w-5 ${value.color}`} />
              </div>
              <CardTitle className="text-xl font-heading">{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed text-base">
                {value.description}
              </CardDescription>
            </CardContent>
          </Card>
        )
      })}
    </div>
  </div>

  {/* Team */}
  <div className="w-full space-y-12">
    <div className="text-center">
      <Badge variant="outline" className="mb-4 border-[#E2142D] text-[#E2142D] bg-white/80 dark:bg-black/80 font-semibold">
        <Users className="h-3 w-3 mr-2" />
        Our Team
      </Badge>
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 font-['Inter','IBM Plex Sans',sans-serif]">
        Meet the{" "}
        <span className="bg-gradient-to-r from-[#E2142D] via-[#2563eb] to-[#a21caf] bg-clip-text text-transparent animate-gradient-text">
          Visionaries
        </span>
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto text-base">
        A diverse team with decades of experience in sustainability, tech, and strategy.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {team.map((member, index) => (
        <Card
          key={index}
          className="w-full group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-[#E2142D]/20 bg-background/50 backdrop-blur-sm animate-fade-in"
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E2142D]/20 to-[#2563eb]/20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6 text-[#E2142D]" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-0">{member.name}</h3>
            <p className="text-[#2563eb] font-medium mb-4">{member.role}</p>
            <p className="text-muted-foreground leading-relaxed text-base">{member.bio}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

        <Separator className="my-12" />
        <section className="w-full py-20 bg-gradient-to-r from-primary to-blue-600 dark:from-[#E2142D] dark:via-[#2563eb] dark:to-[#a21caf] text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-black/10 pointer-events-none" />
  <div className="relative w-full px-4 text-center">
    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
      Join Us in Building a Sustainable Future
    </h2>
    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
      Ready to transform your procurement practices? Let's work together to create a more sustainable and responsible supply chain.
    </p>

    <Link href="/auth">
      <Button
        size="lg"
        variant="secondary"
        className="bg-white text-primary dark:text-red-600 hover:bg-white/90 dark:hover:bg-[#E2142D]/10 px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300"
      >
        Get Started Today
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  </div>
</section>

        <Separator className="my-12" />
       <section className="w-full py-20">
  <div className="w-full px-4">
    <div className="text-center mb-16">
      <Badge
        variant="outline"
        className="mb-4 border-[#a21caf] text-[#a21caf] bg-white/80 dark:bg-black/80 font-semibold"
      >
        <Globe className="h-4 w-4 mr-2" />
        Core Services
      </Badge>
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
        Everything You Need for{" "}
        <span className="bg-gradient-to-r from-[#E2142D] via-[#2563eb] to-[#a21caf] bg-clip-text text-transparent animate-gradient-text">
          Sustainable Success
        </span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Our comprehensive suite of services covers every aspect of sustainable procurement, from initial
        assessment to ongoing optimization.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Card
            key={index}
            className="w-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-[#E2142D]/5 via-[#2563eb]/10 to-[#a21caf]/10 backdrop-blur-sm animate-fade-in"
          >
            <CardHeader>
              <div
                className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`h-6 w-6 ${service.color}`} />
              </div>
              <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
              <CardDescription className="text-base">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2 text-base">
                    <CheckCircle className="h-4 w-4 text-[#E2142D]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
</section>


        {/* Detailed Service Tabs */}
       <section className="w-full py-20">
  <div className="w-full px-4">
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
          Explore Our{" "}
          <span className="bg-gradient-to-r from-[#E2142D] via-[#2563eb] to-[#a21caf] bg-clip-text text-transparent animate-gradient-text">
            Service Details
          </span>
        </h2>
        <TabsList className="grid w-full grid-cols-4 gap-2 bg-[#ffffff]/70 dark:bg-[#0f0f0f]/70  rounded-lg shadow-md">
          <TabsTrigger value="overview" className="font-semibold text-[#E2142D] dark:hover:bg-[#E2142D]/10 transition-all duration-300">Overview</TabsTrigger>
          <TabsTrigger value="features" className="font-semibold text-[#2563eb] dark:hover:bg-[#2563eb]/10 transition-all duration-300">Features</TabsTrigger>
          <TabsTrigger value="benefits" className="font-semibold text-[#a21caf] dark:hover:bg-[#a21caf]/10 transition-all duration-300">Benefits</TabsTrigger>
          <TabsTrigger value="pricing" className="font-semibold text-[#E2142D] dark:hover:bg-[#E2142D]/10 transition-all duration-300">Pricing</TabsTrigger>
        </TabsList>
      </div>

             <TabsContent value="overview" className="space-y-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-extrabold">Comprehensive Platform Overview</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform combines cutting-edge AI technology with deep sustainability expertise to deliver
              unparalleled insights into your supply chain performance.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#E2142D]" />
                <span className="text-base">Real-time ESG monitoring and analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#2563eb]" />
                <span className="text-base">Cost Efficiency & Reliability Evaluation</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#a21caf]" />
                <span className="text-base">Automated risk assessment and alerts</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#E2142D]" />
                <span className="text-base">Customizable reporting and dashboards</span>
              </div>
            </div>
          </div>

          <Card className="w-full border-0 bg-gradient-to-br from-[#E2142D]/5 via-[#2563eb]/10 to-[#a21caf]/10 shadow-lg backdrop-blur-sm animate-fade-in">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#E2142D] mb-2">10,000+</div>
                  <div className="text-muted-foreground text-base">Suppliers Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#2563eb] mb-2">95%</div>
                  <div className="text-muted-foreground text-base">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#a21caf] mb-2">24/7</div>
                  <div className="text-muted-foreground text-base">Monitoring</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

              <TabsContent value="features" className="space-y-8 w-full">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {[
                    {
                      icon: BarChart3,
                      title: "Advanced Analytics",
                      description: "Deep insights with AI-powered analysis",
                    },
                    {
                      icon: Shield,
                      title: "Risk Assessment",
                      description: "Proactive risk identification and mitigation",
                    },
                    {
                      icon: FileText,
                      title: "Automated Reporting",
                      description: "Generate comprehensive reports instantly",
                    },
                    { icon: TrendingUp, title: "Performance Tracking", description: "Monitor improvements over time" },
                    { icon: Users, title: "Supplier Ranking", description: "Ranking amongst other suppliers" },
                    { icon: Globe, title: "Global Benchmarking", description: "Comparison with international suppliers" },
                  ].map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <Card
                        key={index}
                        className="w-full hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm"
                      >
                        <CardHeader>
                          <Icon className="h-8 w-8 text-primary mb-2" />
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">{feature.description}</CardDescription>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-8 w-full">
                <div className="grid lg:grid-cols-2 gap-8 w-full">
                  <Card className="w-full border-0 bg-gradient-to-br from-green-500/5 to-blue-500/5">
                    <CardHeader>
                      <CardTitle className="text-2xl font-heading flex items-center">
                        <TrendingUp className="h-6 w-6 mr-3 text-green-600" />
                        Business Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-base">Reduce procurement costs by up to 15%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-base">Improve supplier performance by 25%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-base">Enhance brand reputation and customer trust</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-base">Ensure regulatory compliance</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="w-full border-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                    <CardHeader>
                      <CardTitle className="text-2xl font-heading flex items-center">
                        <Leaf className="h-6 w-6 mr-3 text-blue-600" />
                        Sustainability Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Reduce carbon footprint by 30%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Improve social responsibility scores</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Support sustainable supplier development</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Contribute to UN Sustainable Development Goals</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Starter",
                      price: "$99",
                      period: "/month",
                      description: "Perfect for small businesses",
                      features: ["Up to 50 suppliers", "Basic ESG analysis", "Monthly reports", "Email support"],
                      popular: false,
                    },
                    {
                      name: "Professional",
                      price: "$299",
                      period: "/month",
                      description: "Ideal for growing companies",
                      features: [
                        "Up to 500 suppliers",
                        "Advanced analytics",
                        "Real-time monitoring",
                        "Priority support",
                        "Custom integrations",
                      ],
                      popular: true,
                    },
                    {
                      name: "Enterprise",
                      price: "Custom",
                      period: "",
                      description: "For large organizations",
                      features: [
                        "Unlimited suppliers",
                        "Full platform access",
                        "Dedicated support",
                        "Custom development",
                        "SLA guarantee",
                      ],
                      popular: false,
                    },
                  ].map((plan, index) => (
                    <Card
                      key={index}
                      className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-0 bg-background/50 backdrop-blur-sm"}`}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-blue-600">
                          Most Popular
                        </Badge>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-heading">{plan.name}</CardTitle>
                        <div className="text-4xl font-bold">
                          {plan.price}
                          <span className="text-lg text-muted-foreground">{plan.period}</span>
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        <Button className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-blue-600" : ""}`}>
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>


      </div>
      <Chatbot />
    </div>
  )
}