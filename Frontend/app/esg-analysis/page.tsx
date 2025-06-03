"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "recharts"
import { Leaf, Users, Shield, AlertCircle, CheckCircle, Star, TrendingUp, Award, Filter, Search } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

const suppliers = [
  { id: 1, name: "GreenTech Solutions" },
  { id: 2, name: "EcoManufacturing Co" },
  { id: 3, name: "SustainableParts Inc" },
  { id: 4, name: "CleanEnergy Corp" },
]

const esgData = {
  overall: 87,
  environmental: {
    score: 90,
    factors: [
      { name: "Carbon Emissions", score: 92, status: "excellent", description: "25% reduction year-over-year" },
      { name: "Water Usage", score: 88, status: "good", description: "Efficient water management systems" },
      { name: "Waste Management", score: 85, status: "good", description: "95% waste recycling rate" },
      { name: "Renewable Energy", score: 95, status: "excellent", description: "100% renewable energy sources" },
      { name: "Biodiversity", score: 82, status: "fair", description: "Limited biodiversity initiatives" },
    ],
  },
  social: {
    score: 85,
    factors: [
      { name: "Employee Safety", score: 95, status: "excellent", description: "Zero workplace accidents in 2 years" },
      { name: "Diversity & Inclusion", score: 78, status: "fair", description: "40% female leadership, improving" },
      { name: "Community Impact", score: 88, status: "good", description: "Strong local community programs" },
      { name: "Labor Practices", score: 90, status: "excellent", description: "Fair wages and working conditions" },
      { name: "Human Rights", score: 75, status: "fair", description: "Supply chain monitoring needed" },
    ],
  },
  governance: {
    score: 86,
    factors: [
      { name: "Board Independence", score: 85, status: "good", description: "60% independent board members" },
      { name: "Executive Compensation", score: 88, status: "good", description: "Aligned with performance metrics" },
      { name: "Transparency", score: 82, status: "fair", description: "Regular ESG reporting published" },
      { name: "Ethics & Compliance", score: 92, status: "excellent", description: "Strong compliance framework" },
      { name: "Risk Management", score: 87, status: "good", description: "Comprehensive risk assessment" },
    ],
  },
}

const radarData = [
  { subject: "Carbon Emissions", A: 92, fullMark: 100 },
  { subject: "Water Usage", A: 88, fullMark: 100 },
  { subject: "Waste Management", A: 85, fullMark: 100 },
  { subject: "Renewable Energy", A: 95, fullMark: 100 },
  { subject: "Biodiversity", A: 82, fullMark: 100 },
]

const pieData = [
  { name: "Environmental", value: 90, color: "#10b981" },
  { name: "Social", value: 85, color: "#3b82f6" },
  { name: "Governance", value: 86, color: "#8b5cf6" },
]

// Supplier Ranking Data
const supplierRankings = [
  {
    id: 1,
    name: "GreenTech Solutions",
    rank: 1,
    overallScore: 92,
    esgScore: 90,
    costScore: 85,
    riskLevel: "Low",
    certifications: ["ISO 14001", "B-Corp", "Carbon Neutral"],
    location: "California, USA",
    category: "Technology",
    trend: "up",
    improvement: "+5%",
    recommendations: [
      "Expand renewable energy initiatives",
      "Enhance supply chain transparency",
      "Implement circular economy practices",
    ],
  },
  {
    id: 2,
    name: "EcoManufacturing Co",
    rank: 2,
    overallScore: 88,
    esgScore: 87,
    costScore: 82,
    riskLevel: "Low",
    certifications: ["ISO 14001", "LEED Gold"],
    location: "Ontario, Canada",
    category: "Manufacturing",
    trend: "up",
    improvement: "+3%",
    recommendations: [
      "Improve water usage efficiency",
      "Strengthen diversity programs",
      "Enhance governance reporting",
    ],
  },
  {
    id: 3,
    name: "SustainableParts Inc",
    rank: 3,
    overallScore: 85,
    esgScore: 78,
    costScore: 90,
    riskLevel: "Medium",
    certifications: ["ISO 9001", "Fair Trade"],
    location: "Berlin, Germany",
    category: "Components",
    trend: "stable",
    improvement: "0%",
    recommendations: ["Reduce carbon footprint", "Implement better waste management", "Strengthen board independence"],
  },
  {
    id: 4,
    name: "CleanEnergy Corp",
    rank: 4,
    overallScore: 82,
    esgScore: 85,
    costScore: 75,
    riskLevel: "Medium",
    certifications: ["ISO 50001", "Green Energy"],
    location: "Copenhagen, Denmark",
    category: "Energy",
    trend: "down",
    improvement: "-2%",
    recommendations: ["Optimize cost structure", "Enhance supply chain resilience", "Improve stakeholder engagement"],
  },
]

const betterSuppliers = [
  {
    name: "NextGen Sustainable Tech",
    score: 95,
    reason: "Higher ESG score with competitive pricing",
    savings: "12%",
    location: "Sweden",
  },
  {
    name: "EcoInnovate Solutions",
    score: 93,
    reason: "Superior environmental practices",
    savings: "8%",
    location: "Netherlands",
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "excellent":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "good":
      return <CheckCircle className="h-4 w-4 text-blue-600" />
    case "fair":
      return <AlertCircle className="h-4 w-4 text-yellow-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-red-600" />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "excellent":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "good":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "fair":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    default:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  }
}

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
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-600" />
    case "down":
      return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
    default:
      return <div className="h-4 w-4 rounded-full bg-gray-400" />
  }
}

export default function ESGAnalysis() {
  const [selectedSupplier, setSelectedSupplier] = useState("1")
  const [activeTab, setActiveTab] = useState("esg-analysis")

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            ESG Factor Analysis & Supplier Ranking
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive Environmental, Social & Governance evaluation with intelligent supplier recommendations
          </p>
        </div>

        <div className="flex justify-center">
          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id.toString()}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="esg-analysis">ESG Analysis</TabsTrigger>
            <TabsTrigger value="supplier-ranking">Supplier Ranking</TabsTrigger>
          </TabsList>

          <TabsContent value="esg-analysis" className="space-y-6">
            {/* Overall ESG Score */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall ESG Score</CardTitle>
                  <CardDescription>Comprehensive sustainability rating</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-green-600">{esgData.overall}</div>
                    <div className="text-lg text-muted-foreground">out of 100</div>
                    <Badge variant="default" className="text-lg px-4 py-2">
                      Excellent Performance
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ESG Breakdown</CardTitle>
                  <CardDescription>Score distribution across pillars</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-4 mt-4">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm">
                          {entry.name}: {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ESG Pillars Analysis */}
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="environmental" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold">Environmental</h3>
                      <p className="text-sm text-muted-foreground">Climate impact and resource management</p>
                    </div>
                    <Badge variant="default" className="ml-auto">
                      {esgData.environmental.score}/100
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    {esgData.environmental.factors.map((factor, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(factor.status)}
                              <span className="font-medium">{factor.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{factor.score}/100</span>
                              <Badge variant="outline" className={getStatusColor(factor.status)}>
                                {factor.status}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={factor.score} className="mb-2" />
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Environmental Performance Radar</CardTitle>
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
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="social" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold">Social</h3>
                      <p className="text-sm text-muted-foreground">Employee welfare and community impact</p>
                    </div>
                    <Badge variant="default" className="ml-auto">
                      {esgData.social.score}/100
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    {esgData.social.factors.map((factor, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(factor.status)}
                              <span className="font-medium">{factor.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{factor.score}/100</span>
                              <Badge variant="outline" className={getStatusColor(factor.status)}>
                                {factor.status}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={factor.score} className="mb-2" />
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="governance" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold">Governance</h3>
                      <p className="text-sm text-muted-foreground">Leadership and ethical practices</p>
                    </div>
                    <Badge variant="default" className="ml-auto">
                      {esgData.governance.score}/100
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    {esgData.governance.factors.map((factor, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(factor.status)}
                              <span className="font-medium">{factor.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{factor.score}/100</span>
                              <Badge variant="outline" className={getStatusColor(factor.status)}>
                                {factor.status}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={factor.score} className="mb-2" />
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="supplier-ranking" className="space-y-6">
            {/* Supplier Rankings */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center">
                          <Award className="h-6 w-6 mr-3 text-primary" />
                          Supplier Rankings
                        </CardTitle>
                        <CardDescription>Comprehensive supplier evaluation and ranking</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supplierRankings.map((supplier, index) => (
                        <Card key={supplier.id} className="transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <div className="text-3xl font-bold text-primary">#{supplier.rank}</div>
                                  {getTrendIcon(supplier.trend)}
                                </div>
                                <div>
                                  <h3 className="text-xl font-semibold">{supplier.name}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <span>{supplier.location}</span>
                                    <span>•</span>
                                    <span>{supplier.category}</span>
                                    <span>•</span>
                                    <span
                                      className={
                                        supplier.trend === "up"
                                          ? "text-green-600"
                                          : supplier.trend === "down"
                                            ? "text-red-600"
                                            : "text-gray-600"
                                      }
                                    >
                                      {supplier.improvement}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold text-green-600">{supplier.overallScore}</div>
                                <div className="text-sm text-muted-foreground">Overall Score</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="text-center">
                                <div className="text-lg font-semibold">{supplier.esgScore}</div>
                                <div className="text-sm text-muted-foreground">ESG Score</div>
                                <Progress value={supplier.esgScore} className="mt-1" />
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-semibold">{supplier.costScore}</div>
                                <div className="text-sm text-muted-foreground">Cost Score</div>
                                <Progress value={supplier.costScore} className="mt-1" />
                              </div>
                              <div className="text-center">
                                <Badge className={getRiskColor(supplier.riskLevel)}>{supplier.riskLevel} Risk</Badge>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {supplier.certifications.map((cert, certIndex) => (
                                <Badge key={certIndex} variant="secondary" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  {cert}
                                </Badge>
                              ))}
                            </div>

                            <Accordion type="single" collapsible>
                              <AccordionItem value={`recommendations-${supplier.id}`} className="border-none">
                                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                                  View Improvement Recommendations
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-2">
                                    {supplier.recommendations.map((rec, recIndex) => (
                                      <div key={recIndex} className="flex items-center space-x-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span>{rec}</span>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Suggested Better Suppliers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      Suggested Better Suppliers
                    </CardTitle>
                    <CardDescription>Alternative suppliers with higher scores</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {betterSuppliers.map((supplier, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{supplier.name}</h4>
                          <Badge variant="default" className="text-xs">
                            {supplier.score}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{supplier.reason}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600 font-medium">Save {supplier.savings}</span>
                          <span className="text-muted-foreground">{supplier.location}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Risk Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                      Risk Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-sm">High Risk Detected</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        SustainableParts Inc shows declining ESG performance
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-sm">Compliance Review</span>
                      </div>
                      <p className="text-xs text-muted-foreground">CleanEnergy Corp requires updated certifications</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Chatbot />
    </div>
  )
}
