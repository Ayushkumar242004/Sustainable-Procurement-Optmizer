"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import {
  FileText,
  Download,
  Eye,
  CalendarIcon,
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  Leaf,
  Shield,
  Clock,
} from "lucide-react"
import { format } from "date-fns"

const reportTemplates = [
  {
    id: "comprehensive",
    title: "Comprehensive ESG Report",
    description: "Complete ESG analysis with all metrics and recommendations",
    icon: FileText,
    estimatedPages: "25-30",
    generationTime: "3-5 minutes",
    includes: ["ESG Scores", "Risk Analysis", "Benchmarking", "Recommendations", "Action Plans"],
  },
  {
    id: "executive",
    title: "Executive Summary",
    description: "High-level overview for leadership and stakeholders",
    icon: TrendingUp,
    estimatedPages: "5-8",
    generationTime: "1-2 minutes",
    includes: ["Key Metrics", "Performance Highlights", "Risk Summary", "Strategic Recommendations"],
  },
  {
    id: "compliance",
    title: "Compliance Report",
    description: "Regulatory compliance status and requirements",
    icon: Shield,
    estimatedPages: "15-20",
    generationTime: "2-3 minutes",
    includes: ["Compliance Status", "Regulatory Requirements", "Gap Analysis", "Remediation Plans"],
  },
  {
    id: "supplier",
    title: "Supplier Performance Report",
    description: "Individual supplier analysis and performance metrics",
    icon: Users,
    estimatedPages: "10-15",
    generationTime: "2-3 minutes",
    includes: ["Performance Metrics", "ESG Scores", "Improvement Areas", "Certification Status"],
  },
  {
    id: "environmental",
    title: "Environmental Impact Report",
    description: "Detailed environmental performance and impact analysis",
    icon: Leaf,
    estimatedPages: "12-18",
    generationTime: "2-4 minutes",
    includes: ["Carbon Footprint", "Resource Usage", "Waste Management", "Environmental Goals"],
  },
  {
    id: "benchmarking",
    title: "Industry Benchmarking Report",
    description: "Performance comparison against industry standards",
    icon: BarChart3,
    estimatedPages: "8-12",
    generationTime: "1-3 minutes",
    includes: ["Industry Comparison", "Peer Analysis", "Best Practices", "Improvement Opportunities"],
  },
]

const suppliers = [
  { id: "all", name: "All Suppliers" },
  { id: "greentech", name: "GreenTech Solutions" },
  { id: "ecomanufacturing", name: "EcoManufacturing Co" },
  { id: "sustainableparts", name: "SustainableParts Inc" },
  { id: "cleanenergy", name: "CleanEnergy Corp" },
  { id: "budgetsupply", name: "BudgetSupply Ltd" },
]

const recentReports = [
  {
    id: 1,
    title: "Q4 2024 Comprehensive ESG Report",
    type: "Comprehensive",
    supplier: "All Suppliers",
    generatedDate: "2024-01-15",
    status: "Ready",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "GreenTech Solutions Performance Report",
    type: "Supplier Performance",
    supplier: "GreenTech Solutions",
    generatedDate: "2024-01-12",
    status: "Ready",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Environmental Impact Analysis",
    type: "Environmental",
    supplier: "All Suppliers",
    generatedDate: "2024-01-10",
    status: "Ready",
    size: "3.1 MB",
  },
  {
    id: 4,
    title: "Industry Benchmarking Report",
    type: "Benchmarking",
    supplier: "All Suppliers",
    generatedDate: "2024-01-08",
    status: "Processing",
    size: "1.5 MB",
  },
]

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()

  const handleSupplierToggle = (supplierId: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(supplierId) ? prev.filter((id) => id !== supplierId) : [...prev, supplierId],
    )
  }

  const generateReport = async () => {
    if (!selectedTemplate) {
      toast({
        title: "Please select a report template",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsGenerating(false)
    toast({
      title: "Report generated successfully!",
      description: "Your report is ready for download.",
    })
  }

  const downloadReport = (reportId: number) => {
    toast({
      title: "Download started",
      description: "Your report is being downloaded.",
    })
  }

  const previewReport = () => {
    setShowPreview(true)
  }

  return (
    <div className="relative pt-16 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-heading mb-4">
            Report <span className="gradient-text">Generation Center</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Generate comprehensive ESG reports with customizable templates and filters
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Select Report Template
                </CardTitle>
                <CardDescription>Choose from our pre-built report templates or create a custom report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {reportTemplates.map((template) => {
                    const Icon = template.icon
                    return (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedTemplate === template.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{template.title}</CardTitle>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                                <span>{template.estimatedPages} pages</span>
                                <span>{template.generationTime}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {template.includes.slice(0, 3).map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                            {template.includes.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.includes.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Report Filters
                </CardTitle>
                <CardDescription>Customize your report scope and data range</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Supplier Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Select Suppliers</label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {suppliers.map((supplier) => (
                      <div key={supplier.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={supplier.id}
                          checked={selectedSuppliers.includes(supplier.id)}
                          onCheckedChange={() => handleSupplierToggle(supplier.id)}
                        />
                        <label htmlFor={supplier.id} className="text-sm">
                          {supplier.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? format(dateRange.from, "PPP") : "Start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? format(dateRange.to, "PPP") : "End date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Output Format */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                      <SelectItem value="word">Word Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <div className="flex space-x-4">
              <Button
                onClick={generateReport}
                disabled={isGenerating}
                className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={previewReport}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Report Preview */}
            {showPreview && selectedTemplate && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Report Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {reportTemplates.find((t) => t.id === selectedTemplate)?.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Preview will be available after generation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Reports
                </CardTitle>
                <CardDescription>Your recently generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{report.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {report.type} • {report.generatedDate}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {report.supplier} • {report.size}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={report.status === "Ready" ? "default" : "secondary"} className="text-xs">
                          {report.status}
                        </Badge>
                        {report.status === "Ready" && (
                          <Button size="sm" variant="ghost" onClick={() => downloadReport(report.id)}>
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Report Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Reports Generated</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">This Month</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Size</span>
                    <span className="font-medium">2.1 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Most Popular</span>
                    <span className="font-medium">Comprehensive</span>
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
