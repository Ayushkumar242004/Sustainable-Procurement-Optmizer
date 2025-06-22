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
  { name: "Environmental", value: 9, color: "#10b981" },
  { name: "Social", value: 8, color: "#3b82f6" },
  { name: "Governance", value: 8, color: "#8b5cf6" },
  { name: "Cost Efficiency Score", value: 25, color: "#f43f5e" },
  { name: "Risk Score", value: 25, color: "#f59e0b" },
  { name: "Reliability Score", value: 25, color: "#ec4899" },
]

const benchmarkData = [
  { category: "Environmental", yourScore: 75.24, industryAvg: 52.00 },
  { category: "Social", yourScore: 72.56, industryAvg: 57.00 },
  { category: "Governance", yourScore: 85.00, industryAvg: 69.00 },
  { category: "Overall", yourScore: 76.74, industryAvg: 59.33 },
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
  const [selectedSupplier, setSelectedSupplier] = useState("ford")
  const [validationProgress, setValidationProgress] = useState(0)
  const [isValidating, setIsValidating] = useState(false)
  const [activeTab, setActiveTab] = useState("scoring")

  const [environmental, setEnvironmental] = useState('');
  const [social, setSocial] = useState('');
  const [governance, setGovernance] = useState('');
  const [cost, setCost] = useState('');
  const [risk, setRisk] = useState('');
  const [reliability, setReliability] = useState('');

  const [aiSuggestionE, setAiSuggestionE] = useState('');
  const [aiSuggestionS, setAiSuggestionS] = useState('');
  const [aiSuggestionG, setAiSuggestionG] = useState('');
  const [aiSuggestionC, setAiSuggestionC] = useState('');
  const [aiSuggestionRi, setAiSuggestionRi] = useState('');
  const [aiSuggestionRe, setAiSuggestionRe] = useState('');

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiLoadingS, setIsAiLoadingS] = useState(false);
  const [isAiLoadingG, setIsAiLoadingG] = useState(false);
  const [isAiLoadingC, setIsAiLoadingC] = useState(false);
  const [isAiLoadingRi, setIsAiLoadingRi] = useState(false);
  const [isAiLoadingRe, setIsAiLoadingRe] = useState(false);

  // 🌱 Environmental
  const [ghgScore, setGhgScore] = useState("");
  const [energyEfficiencyScore, setEnergyEfficiencyScore] = useState("");
  const [waterEfficiencyScore, setWaterEfficiencyScore] = useState("");
  const [wasteRecyclingScore, setWasteRecyclingScore] = useState("");
  const [complianceScore, setComplianceScore] = useState("");
  const [renewableEnergyScore, setRenewableEnergyScore] = useState("");
  const [biodiversityScore, setBiodiversityScore] = useState("");
  const [climateRiskManagementScore, setClimateRiskManagementScore] = useState("");

  // 👥 Social
  const [retentionScore, setRetentionScore] = useState("");
  const [safetyScore, setSafetyScore] = useState("");
  const [diversityScore, setDiversityScore] = useState("");
  const [communityInvestmentScore, setCommunityInvestmentScore] = useState("");
  const [customerSatisfactionScore, setCustomerSatisfactionScore] = useState("");
  const [humanRightsScore, setHumanRightsScore] = useState("");
  const [trainingScore, setTrainingScore] = useState("");

  // 🏛 Governance
  const [boardIndependenceScore, setBoardIndependenceScore] = useState("");
  const [compensationAlignmentScore, setCompensationAlignmentScore] = useState("");
  const [auditCommitteeScore, setAuditCommitteeScore] = useState("");
  const [shareholderRightsScore, setShareholderRightsScore] = useState("");
  const [transparencyScore, setTransparencyScore] = useState("");
  const [antiCorruptionScore, setAntiCorruptionScore] = useState("");
  const [taxTransparencyScore, setTaxTransparencyScore] = useState("");



  useEffect(() => {
    const interval = setInterval(() => {
      const rawData = localStorage.getItem("esg_final_subfactor_scores");
      if (!rawData) return;

      try {
        const data = JSON.parse(rawData);
        // 🌱 Environmental
        if (data.Environmental) {
          setGhgScore(data.Environmental["GHG Score"] ?? "");
          setEnergyEfficiencyScore(data.Environmental["Energy Efficiency Score"] ?? "");
          setWaterEfficiencyScore(data.Environmental["Water Efficiency Score"] ?? "");
          setWasteRecyclingScore(data.Environmental["Waste Recycling Score"] ?? "");
          setComplianceScore(data.Environmental["Compliance Score"] ?? "");
          setRenewableEnergyScore(data.Environmental["Renewable Energy Score"] ?? "");
          setBiodiversityScore(data.Environmental["Biodiversity Score"] ?? "");
          setClimateRiskManagementScore(data.Environmental["Climate Risk Management Score"] ?? "");
        }

        // 👥 Social
        if (data.Social) {

          setRetentionScore(data.Social["Retention Score"] ?? "");
          setSafetyScore(data.Social["Safety Score"] ?? "");
          setDiversityScore(data.Social["Diversity Score"] ?? "");
          setCommunityInvestmentScore(data.Social["Community Investment Score"] ?? "");
          setCustomerSatisfactionScore(data.Social["Customer Satisfaction Score"] ?? "");
          setHumanRightsScore(data.Social["Human Rights Score"] ?? "");
          setTrainingScore(data.Social["Training Score"] ?? "");
        }

        // 🏛 Governance
        if (data.Governance) {
          setBoardIndependenceScore(data.Governance["Board Independence Score"] ?? "");
          setCompensationAlignmentScore(data.Governance["Compensation Alignment Score"] ?? "");
          setAuditCommitteeScore(data.Governance["Audit Committee Score"] ?? "");
          setShareholderRightsScore(data.Governance["Shareholder Rights Score"] ?? "");
          setTransparencyScore(data.Governance["Transparency Score"] ?? "");
          setAntiCorruptionScore(data.Governance["Anti-Corruption Score"] ?? "");
          setTaxTransparencyScore(data.Governance["Tax Transparency Score"] ?? "");
        }

        console.log("✅ Subfactor scores loaded from localStorage.");
        clearInterval(interval); // stop checking once loaded
      } catch (err) {
        console.error("Failed to parse final_subfactor_scores:", err);
      }
    }, 1000); // check every 1 second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handleAiAnalyzeE = async (factor: string) => {
    setIsAiLoading(true);
    try {
      // Compose the prompt with the environmental score
      const prompt = `Current Environmental score: ${allScores.E_score} and Target Score is: ${environmental}`;
      const response = await fetch("http://localhost:8000/api/gemini-recommendations-eScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // Join the recommendations into a string for display
      setAiSuggestionE(data.recommendations.join("\n"));
    } catch (error) {
      setAiSuggestionE("Failed to get recommendations.");
    } finally {
      setIsAiLoading(false);
    }
  }

  const handleAiAnalyzeS = async (factor: string) => {
    setIsAiLoadingS(true);
    try {
      // Compose the prompt with the environmental score
      const prompt = `Current Environmental score: ${allScores.S_score} and Target Score is: ${social}`;
      const response = await fetch("http://localhost:8000/api/gemini-recommendations-sScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("AI Response:", data);
      // Join the recommendations into a string for display
      setAiSuggestionS(data.recommendations.join("\n"));
    } catch (error) {
      setAiSuggestionS("Failed to get recommendations.");
    } finally {
      setIsAiLoadingS(false);
    }
  };

  const handleAiAnalyzeG = async (factor: string) => {
    setIsAiLoadingG(true);
    try {
      // Compose the prompt with the environmental score
      const prompt = `Current Environmental score: ${allScores.G_score} and Target Score is: ${governance}`;
      const response = await fetch("http://localhost:8000/api/gemini-recommendations-gScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("AI Response:", data);
      // Join the recommendations into a string for display
      setAiSuggestionG(data.recommendations.join("\n"));
    } catch (error) {
      setAiSuggestionG("Failed to get recommendations.");
    } finally {
      setIsAiLoadingG(false);
    }
  };

  const handleAiAnalyzeC = async (factor: string) => {
    setIsAiLoadingC(true);
    try {
      // Compose the prompt with the environmental score
      const prompt = `Current Environmental score: ${allScores.Cost_Efficiency} and Target Score is: ${cost}`;
      const response = await fetch("http://localhost:8000/api/gemini-recommendations-cScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("AI Response:", data);
      // Join the recommendations into a string for display
      setAiSuggestionC(data.recommendations.join("\n"));
    } catch (error) {
      setAiSuggestionC("Failed to get recommendations.");
    } finally {
      setIsAiLoadingC(false);
    }
  };

  const handleAiAnalyzeRi = async (factor: string) => {
    setIsAiLoadingRi(true);
    try {
      // Compose the prompt with the environmental score
      const prompt = `Current Environmental score: ${allScores.Risk_Score} and Target Score is: ${risk}`;
      const response = await fetch("http://localhost:8000/api/gemini-recommendations-riScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("AI Response:", data);
      // Join the recommendations into a string for display
      setAiSuggestionRi(data.recommendations.join("\n"));
    } catch (error) {
      setAiSuggestionRi("Failed to get recommendations.");
    } finally {
      setIsAiLoadingRi(false);
    }
  };

  const handleAiAnalyzeRe = async (factor: string) => {
    setIsAiLoadingRe(true);
    try {
      // Compose the prompt with the environmental score
      const prompt = `Current Environmental score: ${allScores.Reliability_Score} and Target Score is: ${reliability}`;
      const response = await fetch("http://localhost:8000/api/gemini-recommendations-reScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("AI Response:", data);
      // Join the recommendations into a string for display
      setAiSuggestionRe(data.recommendations.join("\n"));
    } catch (error) {
      setAiSuggestionRe("Failed to get recommendations.");
    } finally {
      setIsAiLoadingRe(false);
    }
  };

  interface HandleDownloadOptions {
    text: string;
    filename?: string;
  }

  const handleDownload = (text: string, filename: string = "environmental_analysis.txt"): void => {
    const element: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const handleDownloadS = (text: string, filename: string = "Social_analysis.txt"): void => {
    const element: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const handleDownloadG = (text: string, filename: string = "Governance_analysis.txt"): void => {
    const element: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const handleDownloadC = (text: string, filename: string = "Cost_analysis.txt"): void => {
    const element: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const handleDownloadRi = (text: string, filename: string = "Risk_analysis.txt"): void => {
    const element: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const handleDownloadRe = (text: string, filename: string = "Reliability_analysis.txt"): void => {
    const element: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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


  const downloadReport = async (reportId: number) => {
    try {
      // 1. Extract data from localStorage
      const company_name = "Supplier";
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
            // Remove all special characters except basic punctuation and spaces
            const cleaned = optimizationObj.recommendations.map((rec: string) =>
              rec.replace(/[^a-zA-Z0-9\s.,:()-]/g, "").trim()
            );
            recommendationsRaw = JSON.stringify(cleaned);
          }
        } catch (e) {
          recommendationsRaw = "";
        }
      }

      const esg_category_scores = JSON.parse(categoryScoresRaw);
      const esg_final_subfactor_scores = JSON.parse(subfactorScoresRaw);
      const recommendations = recommendationsRaw ? JSON.parse(recommendationsRaw) : [];
      const cost_score = allScores.Cost_Efficiency;
      const risk_score = allScores.Risk_Score;
      const reliability_score = allScores.Reliability_Score;
      console.log("rem Scores:", cost_score, risk_score, reliability_score);
      // 2. Prepare payload
      const payload = {
        company_name,
        esg_category_scores,
        esg_final_subfactor_scores,
        recommendations,
        cost_score,
        risk_score,
        reliability_score
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

  const [showModal, setShowModal] = useState(false);
  const [allScores, setAllScores] = useState<{
    E_score?: number;
    S_score?: number;
    G_score?: number;
    ESG_score?: number;
    Cost_Efficiency?: number;
    Risk_Score?: number;
    Reliability_Score?: number;
  }>({});

  const handleShowOverallScore = async () => {
    const esgCategoryRaw = localStorage.getItem("esg_category_scores");
    const remainingRaw = localStorage.getItem("remainingScores");

    if (!esgCategoryRaw || !remainingRaw) {
      alert("Score data not found in localStorage.");
      return;
    }

    try {
      const parsedESG = JSON.parse(esgCategoryRaw);
      const parsedRemaining = JSON.parse(remainingRaw);

      const { E_score, S_score, G_score, ESG_score } = parsedESG;

      const scoreText = parsedRemaining[0]; // "Cost Efficiency: 88\nRisk Score: 12\nReliability Score: 95"
      const scoreLines = scoreText.split("\n");

      const remainingScores: any = {};
      scoreLines.forEach((line: string) => {
        const [key, value] = line.split(":").map(s => s.trim());
        if (key === "Cost Efficiency") remainingScores.Cost_Efficiency = parseFloat(value);
        else if (key === "Risk Score") remainingScores.Risk_Score = parseFloat(value);
        else if (key === "Reliability Score") remainingScores.Reliability_Score = parseFloat(value);
      });

      setAllScores({
        E_score,
        S_score,
        G_score,
        ESG_score,
        ...remainingScores,
      });

      setShowModal(true);
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
      alert("Failed to load score data.");
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

            <TabsTrigger value="risk" className="flex-1 min-w-5 px-2 py-1 text-xs">
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex-1 min-w-5 px-2 py-1 text-xs">
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="benchmarking" className="flex-1 min-w-5 px-2 py-1 text-xs">
              Benchmarking
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
                  <Button className="mt-8" variant="default" onClick={handleShowOverallScore}>
                    Show Overall Score
                  </Button>

                  {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-2xl w-[90%] max-w-xl max-h-[90vh] overflow-y-auto relative animate-fade-in p-6">
                        <button
                          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700 transition-colors"
                          onClick={() => setShowModal(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-400 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <h2 className="text-2xl font-bold text-white mb-2">Overall Performance Scores</h2>
                          <p className="text-gray-400">Comprehensive assessment of your supplier's metrics</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {/* E Score */}
                          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-300">E Score</span>
                              <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-white">{allScores.E_score ?? "N/A"}</p>
                            <div className="h-1 w-full bg-gray-700 rounded-full mt-2">
                              <div
                                className="h-1 bg-gradient-to-r from-green-600 to-emerald-400 rounded-full"
                                style={{ width: `${allScores.E_score ?? 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* S Score */}
                          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-300">S Score</span>
                              <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-white">{allScores.S_score ?? "N/A"}</p>
                            <div className="h-1 w-full bg-gray-700 rounded-full mt-2">
                              <div
                                className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                                style={{ width: `${allScores.S_score ?? 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* G Score */}
                          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-300">G Score</span>
                              <div className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-white">{allScores.G_score ?? "N/A"}</p>
                            <div className="h-1 w-full bg-gray-700 rounded-full mt-2">
                              <div
                                className="h-1 bg-gradient-to-r from-yellow-600 to-amber-400 rounded-full"
                                style={{ width: `${allScores.G_score ?? 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* ESG Score */}
                          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-300">ESG Score</span>
                              <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-white">{allScores.ESG_score ?? "N/A"}</p>
                            <div className="h-1 w-full bg-gray-700 rounded-full mt-2">
                              <div
                                className="h-1 bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full"
                                style={{ width: `${allScores.ESG_score ?? 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Cost Efficiency */}
                          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors col-span-2">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-300">Cost Efficiency</span>
                              <div className="w-8 h-8 rounded-full bg-pink-900/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-white">{allScores.Cost_Efficiency ?? "N/A"}</p>
                            <div className="h-1 w-full bg-gray-700 rounded-full mt-2">
                              <div
                                className="h-1 bg-gradient-to-r from-pink-600 to-rose-400 rounded-full"
                                style={{ width: `${allScores.Cost_Efficiency ?? 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Risk Score */}
                          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-300">Risk Score</span>
                              <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-white">{allScores.Risk_Score ?? "N/A"}</p>
                            <div className="h-1 w-full bg-gray-700 rounded-full mt-2">
                              <div
                                className="h-1 bg-gradient-to-r from-red-600 to-orange-400 rounded-full"
                                style={{ width: `${allScores.Risk_Score ?? 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Reliability Score */}
                          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-300">Reliability Score</span>
                              <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-white">{allScores.Reliability_Score ?? "N/A"}</p>
                            <div className="h-1 w-full bg-gray-700 rounded-full mt-2">
                              <div
                                className="h-1 bg-gradient-to-r from-indigo-600 to-violet-400 rounded-full"
                                style={{ width: `${allScores.Reliability_Score ?? 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                          <Button
                            onClick={() => setShowModal(false)}
                            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
                          >
                            Close Dashboard
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
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
                    <Bar dataKey="yourScore" fill="#86efac" name="Your Score" />         {/* Light Green */}
                    <Bar dataKey="industryAvg" fill="#3b82f6" name="Industry Average" /> {/* Blue */}


                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-4 h-4 bg-green-600  rounded mx-auto mb-1" />
                    <div className="text-sm font-medium">Your Score</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4  bg-blue-600  rounded mx-auto mb-1" />
                    <div className="text-sm font-medium">Industry Avg</div>
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
                  {[
                    {
                      label: "GHG Score",
                      value: ghgScore,
                    },
                    {
                      label: "Energy Efficiency Score",
                      value: energyEfficiencyScore,
                    },
                    {
                      label: "Water Effificiency Score",
                      value: waterEfficiencyScore,
                    },
                    {
                      label: "Waste Recycling Score",
                      value: wasteRecyclingScore,
                    },
                    {
                      label: "Compliance Score",
                      value: complianceScore,
                    },
                    {
                      label: "Renewable Energy Score",
                      value: renewableEnergyScore,
                    },
                    {
                      label: "Biodiversity Score",
                      value: biodiversityScore,
                    },
                    {
                      label: "Climate Risk Management Score",
                      value: climateRiskManagementScore,
                    },
                    {
                      label: "Retention Score",
                      value: retentionScore,
                    },
                    {
                      label: "Safety Score",
                      value: safetyScore,
                    },
                    {
                      label: "Community Investment Score",
                      value: communityInvestmentScore,
                    },
                    {
                      label: "Customer Satisfaction Score",
                      value: customerSatisfactionScore,
                    },
                    {
                      label: "Human Rights Score",
                      value: humanRightsScore,
                    },
                    {
                      label: "Training Score",
                      value: trainingScore,
                    },
                    {
                      label: "Board Independence Score ",
                      value: boardIndependenceScore,
                    },
                    {
                      label: "Compliance Score",
                      value: compensationAlignmentScore,
                    },
                    {
                      label: "Audit Committee Score",
                      value: auditCommitteeScore,
                    },
                    {
                      label: "Transparency Score",
                      value: transparencyScore,
                    },
                    {
                      label: "Anti-Corruption Score",
                      value: antiCorruptionScore,
                    },
                    {
                      label: "Tax Transparency Score",
                      value: taxTransparencyScore,
                    },
                    {
                      label: "Cost Efficiency Score",
                      value: allScores.Cost_Efficiency,
                    },
                    {
                      label: "Reliability Score",
                      value: allScores.Reliability_Score,
                    },
                    {
                      label: "Risk Score",
                      value: allScores.Risk_Score,
                    },
                  ].map((item, idx) => {
                    // Parse value as number, fallback to 0 if not a number
                    const score = Number(item.value) || 0;
                    let risk = "Low";
                    let badgeColor = "bg-green-200 text-green-800";
                    if (score < 50) {
                      risk = "High";
                      badgeColor = "bg-red-200 text-red-800";
                    } else if (score <= 75) {
                      risk = "Medium";
                      badgeColor = "bg-yellow-200 text-yellow-800";
                    }
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all duration-200"
                      >
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-muted-foreground">Score: {score}/100</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 h-2 bg-gray-200 rounded">
                            <div
                              className="h-2 rounded"
                              style={{
                                width: `${Math.min(score, 100)}%`,
                                background: score < 50 ? "#ef4444" : score <= 75 ? "#facc15" : "#22c55e",
                              }}
                            />
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${badgeColor}`}>
                            {risk} Risk
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Risk Assessment Summary</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Each factor above is assessed for risk. High risk: score &lt; 50, Medium risk: 50-75, Low risk: &gt; 75.
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
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-3">Environmental</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Current Score: {allScores.E_score}
                      </span>
                    </div>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Target Score"
                      value={environmental}
                      onChange={(e) => setEnvironmental(e.target.value)}
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyzeE("environmental")}
                      disabled={isAiLoading || !environmental}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiSuggestionE}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                    <Button
                      size="sm"
                      className="mt-2 bg-red-600 text-white hover:bg-green-700 transition-colors"
                      onClick={() => handleDownload(aiSuggestionE)}
                      disabled={!aiSuggestionE}
                    >
                      Download Analysis
                    </Button>
                  </div>
                  {/* Social */}
                  <div>
                     <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-3">Social</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Current Score: {allScores.S_score}
                      </span>
                    </div>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Target Score"
                      value={social}
                      onChange={(e) =>
                        setSocial(e.target.value)
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyzeS("social")}
                      disabled={isAiLoadingS || !social}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiSuggestionS}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                    <Button
                      size="sm"
                      className="mt-2 bg-red-600 text-white hover:bg-green-700 transition-colors"
                      onClick={() => handleDownloadS(aiSuggestionS)}
                      disabled={!aiSuggestionS}
                    >
                      Download Analysis
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {/* Governance */}
                  <div>
                     <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-3">Governance</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Current Score: {allScores.G_score}
                      </span>
                    </div>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Target Score"
                      value={governance}
                      onChange={(e) =>
                        setGovernance(e.target.value)
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyzeG("governance")}
                      disabled={isAiLoadingG || !governance}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiSuggestionG}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                    <Button
                      size="sm"
                      className="mt-2 bg-red-600 text-white hover:bg-green-700 transition-colors"
                      onClick={() => handleDownloadG(aiSuggestionG)}
                      disabled={!aiSuggestionG}
                    >
                      Download Analysis
                    </Button>
                  </div>
                  {/* Risk Factor */}
                  <div>
                     <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-3">Risk Factor</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Current Score: {allScores.Risk_Score}
                      </span>
                    </div>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Target Score"
                      value={risk}
                      onChange={(e) =>
                        setRisk(e.target.value)
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyzeRi("risk")}
                      disabled={isAiLoadingRi || !risk}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiSuggestionRi}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                    <Button
                      size="sm"
                      className="mt-2 bg-red-600 text-white hover:bg-green-700 transition-colors"
                      onClick={() => handleDownloadRi(aiSuggestionRi)}
                      disabled={!aiSuggestionRi}
                    >
                      Download Analysis
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {/* Cost Efficiency */}
                  <div>
                     <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-3">Cost</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Current Score: {allScores.Cost_Efficiency}
                      </span>
                    </div>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Target Score"
                      value={cost}
                      onChange={(e) =>
                        setCost(e.target.value)
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyzeC("cost")}
                      disabled={isAiLoadingC || !cost}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiSuggestionC}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                    <Button
                      size="sm"
                      className="mt-2 bg-red-600 text-white hover:bg-green-700 transition-colors"
                      onClick={() => handleDownloadC(aiSuggestionC)}
                      disabled={!aiSuggestionC}
                    >
                      Download Analysis
                    </Button>
                  </div>
                  {/* Reliability */}
                  <div>
                     <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-3">Reliability</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Current Score: {allScores.Reliability_Score}
                      </span>
                    </div>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter Target Score"
                      value={reliability}
                      onChange={(e) =>
                        setReliability(e.target.value)
                      }
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAiAnalyzeRe("reliability")}
                      disabled={isAiLoadingRe || !reliability}
                    >
                      Analyze
                    </Button>
                    <Textarea
                      className="mt-2"
                      rows={4}
                      value={aiSuggestionRe}
                      readOnly
                      placeholder="AI optimization suggestions will appear here."
                    />
                    <Button
                      size="sm"
                      className="mt-2 bg-red-600 text-white hover:bg-green-700 transition-colors"
                      onClick={() => handleDownloadRe(aiSuggestionRe)}
                      disabled={!aiSuggestionRe}
                    >
                      Download Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center">
                        <FileText className="h-6 w-6 mr-3 text-primary" />
                        Report
                      </CardTitle>
                      <CardDescription>Generate and download comprehensive reports</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
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
            </Card>
          </TabsContent>



        </Tabs>
      </div>
      <Chatbot />
    </div>
  )
}
