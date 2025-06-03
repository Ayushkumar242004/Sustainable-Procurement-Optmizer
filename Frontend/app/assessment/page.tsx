"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts"
import {
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Shield,
  TrendingUp,
  Award,
  Info,
  RefreshCw,
  FileText,
  Download,
  Calendar,
  Filter,
} from "lucide-react"
import { Chatbot } from "@/components/chatbot"

const validationSteps = [
  { id: 1, name: "Data Collection", status: "completed", duration: "2 minutes" },
  { id: 2, name: "Document Verification", status: "completed", duration: "5 minutes" },
  { id: 3, name: "Cross-Reference Check", status: "completed", duration: "3 minutes" },
  { id: 4, name: "Industry Benchmarking", status: "in-progress", duration: "4 minutes" },
  { id: 5, name: "Risk Assessment", status: "pending", duration: "3 minutes" },
  { id: 6, name: "Final Scoring", status: "pending", duration: "2 minutes" },
]

const scoringWeights = [
  { name: "Environmental", value: 35, color: "#10b981" },
  { name: "Social", value: 30, color: "#3b82f6" },
  { name: "Governance", value: 25, color: "#8b5cf6" },
  { name: "Risk Factors", value: 10, color: "#f59e0b" },
]

const benchmarkData = [
  { category: "Environmental", yourScore: 85, industryAvg: 72, peerAvg: 78, topQuartile: 90 },
  { category: "Social", yourScore: 78, industryAvg: 68, peerAvg: 75, topQuartile: 88 },
  { category: "Governance", yourScore: 82, industryAvg: 75, peerAvg: 80, topQuartile: 92 },
  { category: "Overall", yourScore: 82, industryAvg: 72, peerAvg: 78, topQuartile: 90 },
]

const riskHeatmapData = [
  { area: "Supply Chain", risk: "Medium", score: 65, trend: "improving" },
  { area: "Environmental Compliance", risk: "Low", score: 85, trend: "stable" },
  { area: "Labor Practices", risk: "Low", score: 88, trend: "improving" },
  { area: "Data Privacy", risk: "Medium", score: 72, trend: "declining" },
  { area: "Financial Transparency", risk: "Low", score: 90, trend: "stable" },
  { area: "Regulatory Compliance", risk: "High", score: 45, trend: "declining" },
]

const radarData = [
  { subject: "Carbon Footprint", A: 85, fullMark: 100 },
  { subject: "Water Management", A: 78, fullMark: 100 },
  { subject: "Waste Reduction", A: 92, fullMark: 100 },
  { subject: "Energy Efficiency", A: 88, fullMark: 100 },
  { subject: "Biodiversity", A: 65, fullMark: 100 },
  { subject: "Circular Economy", A: 72, fullMark: 100 },
]

// Reports Data
const reportTemplates = [
  { id: 1, name: "ESG Performance Report", type: "Monthly", lastGenerated: "2024-01-15", status: "Ready" },
  { id: 2, name: "Supplier Risk Assessment", type: "Quarterly", lastGenerated: "2024-01-10", status: "Pending" },
  { id: 3, name: "Sustainability Dashboard", type: "Weekly", lastGenerated: "2024-01-18", status: "Ready" },
  { id: 4, name: "Compliance Audit Report", type: "Annual", lastGenerated: "2023-12-31", status: "Overdue" },
  { id: 5, name: "Cost-Benefit Analysis", type: "Monthly", lastGenerated: "2024-01-12", status: "Ready" },
]

const performanceTrends = [
  { month: "Jul", esg: 78, cost: 85, risk: 72 },
  { month: "Aug", esg: 82, cost: 83, risk: 75 },
  { month: "Sep", esg: 85, cost: 81, risk: 78 },
  { month: "Oct", esg: 87, cost: 79, risk: 80 },
  { month: "Nov", esg: 89, cost: 77, risk: 82 },
  { month: "Dec", esg: 92, cost: 75, risk: 85 },
]

const kpiMetrics = [
  { name: "ESG Score Improvement", value: "+14%", trend: "up", target: "15%" },
  { name: "Cost Reduction", value: "12%", trend: "up", target: "10%" },
  { name: "Risk Mitigation", value: "+18%", trend: "up", target: "20%" },
  { name: "Supplier Compliance", value: "94%", trend: "stable", target: "95%" },
]

function getRiskColor(risk: string) {
  switch (risk) {
    case "Low":
      return "text-green-600 bg-green-100 dark:bg-green-900/20"
    case "Medium":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    case "High":
      return "text-red-600 bg-red-100 dark:bg-red-900/20"
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
  }
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case "improving":
      return <TrendingUp className="h-4 w-4 text-green-600" />
    case "declining":
      return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
    default:
      return <div className="h-4 w-4 rounded-full bg-gray-400" />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Ready":
      return "text-green-600 bg-green-100 dark:bg-green-900/20"
    case "Pending":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    case "Overdue":
      return "text-red-600 bg-red-100 dark:bg-red-900/20"
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
  }
}

export default function AssessmentPage() {
  const [selectedSupplier, setSelectedSupplier] = useState("greentech")
  const [validationProgress, setValidationProgress] = useState(0)
  const [isValidating, setIsValidating] = useState(false)
  const [activeTab, setActiveTab] = useState("validation")

  useEffect(() => {
    const completedSteps = validationSteps.filter((step) => step.status === "completed").length
    const inProgressSteps = validationSteps.filter((step) => step.status === "in-progress").length
    setValidationProgress(((completedSteps + inProgressSteps * 0.5) / validationSteps.length) * 100)
  }, [])

  const startValidation = () => {
    setIsValidating(true)
    // Simulate validation process
    setTimeout(() => {
      setIsValidating(false)
    }, 3000)
  }

  const generateReport = (reportId: number) => {
    console.log(`Generating report ${reportId}`)
    // Simulate report generation
  }

  const downloadReport = (reportId: number) => {
    console.log(`Downloading report ${reportId}`)
    // Simulate report download
  }

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-heading mb-4">
            Analysis & <span className="gradient-text">Reporting Center</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive ESG evaluation with real-time validation, benchmarking, and automated reporting
          </p>
        </div>

        {/* Supplier Selection */}
        <div className="flex justify-center">
          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select supplier to assess" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="greentech">GreenTech Solutions</SelectItem>
              <SelectItem value="ecomanufacturing">EcoManufacturing Co</SelectItem>
              <SelectItem value="sustainableparts">SustainableParts Inc</SelectItem>
              <SelectItem value="cleanenergy">CleanEnergy Corp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="scoring">Scoring</TabsTrigger>
            <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="validation" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center">
                      <CheckCircle className="h-6 w-6 mr-3 text-primary" />
                      Validation Process
                    </CardTitle>
                    <CardDescription>Real-time validation of submitted ESG data with automated checks</CardDescription>
                  </div>
                  <Button onClick={startValidation} disabled={isValidating} className="flex items-center space-x-2">
                    <RefreshCw className={`h-4 w-4 ${isValidating ? "animate-spin" : ""}`} />
                    <span>{isValidating ? "Validating..." : "Start Validation"}</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(validationProgress)}%</span>
                    </div>
                    <Progress value={validationProgress} className="h-3" />
                  </div>

                  <div className="grid gap-4">
                    {validationSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-500 ${
                          step.status === "completed"
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200"
                            : step.status === "in-progress"
                              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200"
                              : "bg-muted/50 border-muted"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.status === "completed"
                                ? "bg-green-600 text-white"
                                : step.status === "in-progress"
                                  ? "bg-blue-600 text-white"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {step.status === "completed" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : step.status === "in-progress" ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <div className="w-2 h-2 bg-current rounded-full" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{step.name}</div>
                            <div className="text-sm text-muted-foreground">Estimated time: {step.duration}</div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            step.status === "completed"
                              ? "default"
                              : step.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {step.status === "completed"
                            ? "Completed"
                            : step.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scoring" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Target className="h-6 w-6 mr-3 text-primary" />
                    Scoring Weight Model
                  </CardTitle>
                  <CardDescription>How different ESG factors contribute to the overall score</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={scoringWeights}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {scoringWeights.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {scoringWeights.map((weight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: weight.color }} />
                        <span className="text-sm">
                          {weight.name}: {weight.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <BarChart3 className="h-6 w-6 mr-3 text-primary" />
                    Score Derivation
                  </CardTitle>
                  <CardDescription>Detailed breakdown of how scores are calculated</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span>Scores are weighted based on industry standards and best practices</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="benchmarking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Award className="h-6 w-6 mr-3 text-primary" />
                  Industry Benchmarking
                </CardTitle>
                <CardDescription>Compare performance against industry averages and peer companies</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={benchmarkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="yourScore" fill="#10b981" name="Your Score" />
                    <Bar dataKey="industryAvg" fill="#6b7280" name="Industry Average" />
                    <Bar dataKey="peerAvg" fill="#3b82f6" name="Peer Average" />
                    <Bar dataKey="topQuartile" fill="#8b5cf6" name="Top Quartile" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-4 h-4 bg-green-600 rounded mx-auto mb-1" />
                    <div className="text-sm font-medium">Your Score</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-gray-500 rounded mx-auto mb-1" />
                    <div className="text-sm font-medium">Industry Avg</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-blue-600 rounded mx-auto mb-1" />
                    <div className="text-sm font-medium">Peer Avg</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-purple-600 rounded mx-auto mb-1" />
                    <div className="text-sm font-medium">Top Quartile</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-primary" />
                  Risk Heatmap
                </CardTitle>
                <CardDescription>Identify high-risk areas requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {riskHeatmapData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(item.trend)}
                          <div>
                            <div className="font-medium">{item.area}</div>
                            <div className="text-sm text-muted-foreground">Score: {item.score}/100</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={item.score} className="w-24 h-2" />
                        <Badge className={getRiskColor(item.risk)}>{item.risk} Risk</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Risk Assessment Summary</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Regulatory Compliance shows high risk and declining trend. Immediate action recommended to address
                    compliance gaps and implement corrective measures.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* KPI Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiMetrics.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className="text-xs text-muted-foreground">Target: {kpi.target}</p>
                      </div>
                      <div
                        className={`p-2 rounded-full ${kpi.trend === "up" ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-100 dark:bg-gray-900/20"}`}
                      >
                        <TrendingUp className={`h-4 w-4 ${kpi.trend === "up" ? "text-green-600" : "text-gray-600"}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <TrendingUp className="h-6 w-6 mr-3 text-primary" />
                  Performance Trends
                </CardTitle>
                <CardDescription>6-month performance overview across key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="esg" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area
                      type="monotone"
                      dataKey="cost"
                      stackId="2"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="risk"
                      stackId="3"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                    <span className="text-sm">ESG Score</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    <span className="text-sm">Cost Efficiency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-600 rounded-full" />
                    <span className="text-sm">Risk Score</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Templates */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center">
                      <FileText className="h-6 w-6 mr-3 text-primary" />
                      Report Templates
                    </CardTitle>
                    <CardDescription>Generate and download comprehensive reports</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTemplates.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{report.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{report.type}</span>
                            <span>•</span>
                            <span>Last generated: {report.lastGenerated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => generateReport(report.id)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Generate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadReport(report.id)}
                            disabled={report.status !== "Ready"}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Chatbot />
    </div>
  )
}
