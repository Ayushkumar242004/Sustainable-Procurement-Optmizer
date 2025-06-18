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
  Loader2 , 
  Info,
  RefreshCw,
  FileText,
  Download,
  Calendar,
  Filter,
  Bot,
} from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

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
  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [validationProgress, setValidationProgress] = useState(0)
  const [isValidating, setIsValidating] = useState(false)
  const [activeTab, setActiveTab] = useState("validation")

  const [aiInputs, setAiInputs] = useState({
    environmental: "",
    social: "",
    governance: "",
    risk: "",
    cost: "",
    reliability: "",
  })
  const [aiAnalysis, setAiAnalysis] = useState({
    environmental: "",
    social: "",
    governance: "",
    risk: "",
    cost: "",
    reliability: "",
  })

  // Supplier type definition
  type Supplier = {
  _id: string; // MongoDB uses _id
  company_name: string;
  esg_upload_status?: "success" | "pending" | "failed";
  esg_final_score?: number;
  esg_E_score?: number;
  esg_S_score?: number;
  esg_G_score?: number;
  esg_category_scores?: {
    Environmental?: Record<string, number>;
    Social?: Record<string, number>;
    Governance?: Record<string, number>;
  };
  esg_subfactor_scores?: string; // JSON string
  // Add other fields as needed
  };

  //fetchins suppliers
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  useEffect(() => {
    const fetchSuppliers = async () => {
      const res = await fetch("http://localhost:8000/api/suppliers");
      const data = await res.json();
      console.log("Fetched suppliers:", data.suppliers);
      setSuppliers(data.suppliers);
    };

    fetchSuppliers();
  }, []);
  
  // Function to fetch recommendations from Gemini to genrate report 
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const fetchRecommendations = async (supplier_name) => {
    console.log("⏳ STARTING fetchRecommendations");
    setLoadingRecommendations(true);
    setRecommendations([]);
    
    try {
      const supplier = suppliers.find(s => {
        const match = s.company_name === supplier_name;
        return match;
      });

      if (!supplier) {
        console.error("Supplier not found", {
          searchedName: supplier_name,
          availableNames: suppliers.map(s => s.company_name)
        });
        setRecommendations(["Supplier data not available"]);
        return;
      }


      const esgScores = supplier?.esg_subfactor_scores || 
                      JSON.parse(supplier?.esg_subfactor_scores || "{}");
      localStorage.setItem("esg_final_subfactor_scores", JSON.stringify(esgScores)); 

      const esg_category_scores = {
        esg_E_score: supplier?.esg_E_score ?? 0,       // Environmental
        esg_G_score: supplier?.esg_G_score ?? 0,       // Governance
        esg_S_score: supplier?.esg_S_score ?? 0,       // Social
        esg_final_score: supplier?.esg_final_score ?? 0 // Final score
      };
      console.log("Combined ESG Scores:", esg_category_scores);
      localStorage.setItem("esg_category_scores", JSON.stringify(esg_category_scores));

      const response = await fetch("http://localhost:8000/api/gemini-recommendations-esgScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Suggest improvements for: " + JSON.stringify({
            company: supplier_name,
            scores: esgScores
          }),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setRecommendations(["Failed to fetch recommendations from Gemini."]);
        return;
      }
      
      const data = await response.json();
      // setting optimization
      localStorage.setItem("optimization", JSON.stringify(data));
      let points: string[] = [];

      const rawText =
        Array.isArray(data.recommendations)
          ? data.recommendations.join(" ")
          : typeof data.recommendations === "string"
          ? data.recommendations
          : typeof data === "string"
          ? data
          : "";

      if (rawText) {
        points = rawText
          .split(/(?<=[.?!])\s+/) // split on end of sentence punctuation + space
          .map((sentence:string) => sentence.replace(/^[-•*]\s*/, "").trim()) // remove starting bullet markers
          .filter((sentence:string) => sentence.length > 0)
          .map((sentence:string) => ` ${sentence}`);
      }

      setRecommendations(points.length ? points : ["No recommendations received."]);
    } catch (err) {
      setRecommendations(["Error fetching recommendations."]);
    }
    setLoadingRecommendations(false);
  };

  const [isAiLoading, setIsAiLoading] = useState(false)

  // Simulate AI analysis (replace with real API call as needed)
  const handleAiAnalyze = (factor: keyof typeof aiInputs) => {
    setIsAiLoading(true)
    setTimeout(() => {
      setAiAnalysis((prev) => ({
        ...prev,
        [factor]: `AI Optimization Suggestion for ${factor.charAt(0).toUpperCase() + factor.slice(1)}: 
- Apply advanced supplier screening using ML models.
- Use predictive analytics for risk mitigation.
- Optimize cost by dynamic sourcing and contract renegotiation.
- Enhance reliability with real-time monitoring and AI-driven alerts.
- Improve ESG scores by targeting high-impact initiatives recommended by AI.`,
      }))
      setIsAiLoading(false)
    }, 1200)
  }

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

  const [isDownloading, setIsDownloading] = useState(false);
  const downloadReport = async (reportId: number) => {
  try {
    setIsDownloading(true);
    // 1. Extract data from localStorage
    await fetchRecommendations( selectedSupplier ) ; 

    const company_name =  selectedSupplier ;
    const categoryScoresRaw = localStorage.getItem("esg_category_scores");
    const subfactorScoresRaw = localStorage.getItem("esg_final_subfactor_scores");
    const optimizationRaw = localStorage.getItem("optimization");

    if (!categoryScoresRaw || !subfactorScoresRaw) {
      console.error("Missing ESG data in localStorage");
      alert("ESG score data is missing. Please calculate scores before downloading the report.");
      return;
    }

    let recommendationsRaw = "";
    if (optimizationRaw) {
      try {
        const optimizationObj = JSON.parse(optimizationRaw);
        if (Array.isArray(optimizationObj.recommendations)) {
          // Remove special characters from each recommendation
          const cleaned = optimizationObj.recommendations.map((rec: string) =>
            rec.replace(/[^\w\s.,:()-]/g, "").trim()
          );
          recommendationsRaw = JSON.stringify(cleaned);
        }
      } catch (e) {
        recommendationsRaw = "";
      }finally {
      setIsDownloading(false);
      }
    }

    const esg_category_scores = JSON.parse(categoryScoresRaw);
    const esg_final_subfactor_scores = JSON.parse(subfactorScoresRaw);
    const recommendations = recommendationsRaw ? JSON.parse(recommendationsRaw) : [];


    // 2. Prepare payload
    const payload = {
      company_name,
      esg_category_scores,
      esg_final_subfactor_scores,
      recommendations,
    };

    // 3. Send request to backend
    const response = await fetch("http://localhost:8000/generate-esg-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    console.log("Response status:", response);
    if (!response.ok) {
      throw new Error("Failed to generate report");
    }

    // 4. Convert response to blob and download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${company_name}_ESG_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error downloading report:", error);
    alert("An error occurred while generating the report.");
  }
};


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
          <Select 
            value={selectedSupplier} 
            onValueChange={setSelectedSupplier}
          >
            <SelectTrigger className="w-64 transition-all duration-300 hover:shadow-lg">
              <SelectValue placeholder="Select a supplier">
                {selectedSupplier || "Select a supplier"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem
                  key={supplier.company_name}
                  value={String(supplier.company_name)}
                  disabled={supplier.esg_upload_status !== "success"}
                >
                  {supplier.company_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

    
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Reduce tab width so all 6 tabs fit in a line */}
          <TabsList className="flex w-full justify-between gap-2">
            <TabsTrigger value="scoring" className="flex-1 min-w-5 px-2 py-1 text-xs">
              Scoring
            </TabsTrigger>
            <TabsTrigger value="benchmarking" className="flex-1 min-w-5 px-2 py-1 text-xs">
              Benchmarking
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex-1 min-w-5 px-2 py-1 text-xs">
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex-1 min-w-5 px-2 py-1 text-xs">
              AI Analysis
            </TabsTrigger>
           
          </TabsList>
          


 
         
<TabsContent value="scoring" className="space-y-6">
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl flex items-center">
        <Target className="h-6 w-6 mr-3 text-primary" />
        Scoring Weight Model
      </CardTitle>
      <CardDescription>How different ESG factors contribute to the overall score</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={scoringWeights}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={160}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {scoringWeights.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {scoringWeights.map((weight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: weight.color }} />
              <span className="text-sm">
                {weight.name}: {weight.value}%
              </span>
            </div>
          ))}
        </div>
        <Button className="mt-8" variant="default">
          Show Overall Score
        </Button>
      </div>
    </CardContent>
  </Card>
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

             <TabsContent value="ai" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Bot className="h-6 w-6 mr-3 text-primary" />
                  AI Analysis & Optimization
                </CardTitle>
                <CardDescription>
                  Enter your scores for each factor and let AI suggest optimization techniques.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Environmental */}
                  <div>
                    <h3 className="font-semibold mb-2">Environmental</h3>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Environmental Score"
                      value={aiInputs.environmental}
                      onChange={(e) =>
                        setAiInputs((prev) => ({ ...prev, environmental: e.target.value }))
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyze("environmental")}
                      disabled={isAiLoading || !aiInputs.environmental}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiAnalysis.environmental}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                  </div>
                  {/* Social */}
                  <div>
                    <h3 className="font-semibold mb-2">Social</h3>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Social Score"
                      value={aiInputs.social}
                      onChange={(e) =>
                        setAiInputs((prev) => ({ ...prev, social: e.target.value }))
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyze("social")}
                      disabled={isAiLoading || !aiInputs.social}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiAnalysis.social}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {/* Governance */}
                  <div>
                    <h3 className="font-semibold mb-2">Governance</h3>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Governance Score"
                      value={aiInputs.governance}
                      onChange={(e) =>
                        setAiInputs((prev) => ({ ...prev, governance: e.target.value }))
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyze("governance")}
                      disabled={isAiLoading || !aiInputs.governance}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiAnalysis.governance}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                  </div>
                  {/* Risk Factor */}
                  <div>
                    <h3 className="font-semibold mb-2">Risk Factor</h3>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Risk Factor Score"
                      value={aiInputs.risk}
                      onChange={(e) =>
                        setAiInputs((prev) => ({ ...prev, risk: e.target.value }))
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyze("risk")}
                      disabled={isAiLoading || !aiInputs.risk}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiAnalysis.risk}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {/* Cost Efficiency */}
                  <div>
                    <h3 className="font-semibold mb-2">Cost Efficiency</h3>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Cost Efficiency Score"
                      value={aiInputs.cost}
                      onChange={(e) =>
                        setAiInputs((prev) => ({ ...prev, cost: e.target.value }))
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyze("cost")}
                      disabled={isAiLoading || !aiInputs.cost}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiAnalysis.cost}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                  </div>
                  {/* Reliability */}
                  <div>
                    <h3 className="font-semibold mb-2">Reliability</h3>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Reliability Score"
                      value={aiInputs.reliability}
                      onChange={(e) =>
                        setAiInputs((prev) => ({ ...prev, reliability: e.target.value }))
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyze("reliability")}
                      disabled={isAiLoading || !aiInputs.reliability}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiAnalysis.reliability}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                  </div>
                </div>
              </CardContent>

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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadReport(report.id)}
                            disabled={report.status !== "Ready" || isDownloading}
                          >
                            {isDownloading ? (
                              <div className="flex items-center">
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Generating...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Chatbot />
    </div>
  )
}
