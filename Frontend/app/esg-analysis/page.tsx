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
import { useEffect } from "react";
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const suppliers = [
  { id: 1, name: "GreenTech Solutions" },
  { id: 2, name: "EcoManufacturing Co" },
  { id: 3, name: "SustainableParts Inc" },
  { id: 4, name: "CleanEnergy Corp" },
]

// Initialize all scores with default values
const initialEsgScores = {
  overall: 0,
  environmental: {
    score: 0,
    factors: [
      { name: "GHG Score", score: 0, status: "fair", description: "Greenhouse gas emissions performance" },
      { name: "Energy Efficiency Score", score: 0, status: "fair", description: "Energy consumption efficiency" },
      { name: "Water Efficiency Score", score: 0, status: "fair", description: "Water usage efficiency" },
      { name: "Waste Recycling Score", score: 0, status: "fair", description: "Waste recycling rate" },
      { name: "Compliance Score", score: 0, status: "fair", description: "Environmental compliance record" },
      { name: "Renewable Energy Score", score: 0, status: "fair", description: "Renewable energy usage" },
      { name: "Biodiversity Score", score: 0, status: "fair", description: "Biodiversity impact" },
      { name: "Climate Risk Management Score", score: 0, status: "fair", description: "Climate risk measures" },
    ],
  },
  social: {
    score: 0,
    factors: [
      { name: "Retention Score", score: 0, status: "fair", description: "Employee retention rate" },
      { name: "Safety Score", score: 0, status: "fair", description: "Workplace safety performance" },
      { name: "Diversity Score", score: 0, status: "fair", description: "Workforce diversity" },
      { name: "Community Investment Score", score: 0, status: "fair", description: "Community investment level" },
      { name: "Customer Satisfaction Score", score: 0, status: "fair", description: "Customer satisfaction (NPS)" },
      { name: "Human Rights Score", score: 0, status: "fair", description: "Human rights compliance" },
      { name: "Training Score", score: 0, status: "fair", description: "Employee training hours" },
    ],
  },
  governance: {
    score: 0,
    factors: [
      { name: "Board Independence Score", score: 0, status: "fair", description: "Board independence" },
      { name: "Compensation Alignment Score", score: 0, status: "fair", description: "Executive compensation alignment" },
      { name: "Audit Committee Score", score: 0, status: "fair", description: "Audit committee independence" },
      { name: "Shareholder Rights Score", score: 0, status: "fair", description: "Shareholder rights protection" },
      { name: "Transparency Score", score: 0, status: "fair", description: "ESG disclosure transparency" },
      { name: "Anti-Corruption Score", score: 0, status: "fair", description: "Anti-corruption measures" },
      { name: "Tax Transparency Score", score: 0, status: "fair", description: "Tax jurisdiction transparency" },
    ],
  },
}



// Input data state structure
const initialInputData = {
  environmental: {
    companyGHGEmissions: 0,
    companyEnergy: 0,
    companyWaterWithdrawal: 0,
    wasteRecycled: 0,
    totalWasteGenerated: 0,
    numberOfEnvironmentalFines: 0,
    renewableEnergy: 0,
    totalEnergy: 0,
    impactScore: 0,
    measuresImplemented: 0,
  },
  social: {
    employeeTurnover: 0,
    injuryRate: 0,
    numberOfDiverseEmployees: 0,
    totalEmployees: 0,
    communityInvestment: 0,
    totalRevenue: 0,
    netPromoterScore: 0,
    reportedViolations: 0,
    avgTrainingHours: 0,
  },
  governance: {
    independentDirectors: 0,
    totalDirectors: 0,
    ceoPayRatio: 0,
    independentAuditMembers: 0,
    totalAuditMembers: 0,
    shareholderFriendlyPolicies: 0,
    disclosedESGMetrics: 0,
    corruptionIncidents: 0,
    disclosedTaxJurisdictions: 0,
    totalOperatingJurisdictions: 0,
  },
}

const radarData = [
  { subject: "GHG Score", A: 0, fullMark: 100 },
  { subject: "Energy Efficiency", A: 0, fullMark: 100 },
  { subject: "Water Efficiency", A: 0, fullMark: 100 },
  { subject: "Waste Recycling", A: 0, fullMark: 100 },
  { subject: "Renewable Energy", A: 0, fullMark: 100 },
]

const pieData = [
  { name: "Environmental", value: 0, color: "#10b981" },
  { name: "Social", value: 0, color: "#3b82f6" },
  { name: "Governance", value: 0, color: "#8b5cf6" },
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

  const [eScore, setEScore] = useState<number | null>(null);
  const [sScore, setSScore] = useState<number | null>(null);
  const [gScore, setGScore] = useState<number | null>(null);
  const [esgScore, setESGScore] = useState<number | null>(null);


  const handleSubmit = async () => {
    try {
      // Step 1: Get values from localStorage
      const resultRaw = localStorage.getItem("esg_upload_result");
      const overallDataRaw = localStorage.getItem("esg_overall_data");

      if (!resultRaw || !overallDataRaw) {
        alert("Required ESG data not found in localStorage.");
        return;
      }

      const result = JSON.parse(resultRaw);
      const overall_data = JSON.parse(overallDataRaw);

      // Step 2: Construct request body
      const requestBody = {
        result,
        overall_data,
        status: "success",
      };

      // Step 3: Send first POST request to calculate subfactor scores
      const response = await fetch("http://localhost:8000/api/calculate-esg-scores-by-formulas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        alert("Failed to calculate ESG scores.");
        return;
      }

      const data = await response.json();

      // Step 4: Save first response to localStorage
      if (data.subfactor_scores) {
        localStorage.setItem("esg_subfactor_scores", JSON.stringify(data.subfactor_scores));
      
        // Step 5: Send second request to fill missing scores
        const secondResponse = await fetch("http://localhost:8000/api/fill-missing-esg-sub-scores-by-industryavg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subfactor_scores: data.subfactor_scores }),
        });

        if (!secondResponse.ok) {
          const errorData = await secondResponse.json();
          console.error("Second API error:", errorData);
          alert("Failed to fill missing ESG scores.");
          return;
        }

        const filledData = await secondResponse.json();

        // Step 6: Save second response to localStorage
        if (filledData.final_subfactor_scores) {
          localStorage.setItem("esg_final_subfactor_scores", JSON.stringify(filledData.final_subfactor_scores));
          alert("Final ESG scores (with industry averages) saved successfully.");
        } else {
          console.warn("Unexpected second API response:", filledData);
          alert("Invalid response from second server call.");
        }
      } else {
        console.warn("Unexpected first API response:", data);
        alert("Invalid response from first server call.");
      }
    } catch (error) {
      console.error("handleSubmit error:", error);
      alert("An unexpected error occurred during ESG processing.");
    }
  };


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

  const calculateScores = async () => {
    try {
      // Step 1: Get the ESG final subfactor scores from localStorage
      const rawData = localStorage.getItem("esg_final_subfactor_scores");
      if (!rawData) {
        console.error("No ESG data found in localStorage.");
        return;
      }

      const final_subfactor_scores = JSON.parse(rawData);

      // Step 2: Build the payload for the API
      const payload = {
        final_subfactor_scores
      };


      const response = await fetch("http://localhost:8000/api/calculate-final-esg-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      setEScore(result.E_score);
      setSScore(result.S_score);
      setGScore(result.G_score);
      setESGScore(result.ESG_score);


      console.log("escore", result.E_score);
      // Step 4: Store result in localStorage
      localStorage.setItem("esg_category_scores", JSON.stringify(result));

      alert("ESG scores calculated successfully!");
    } catch (error) {
      console.error("Error in calculateScores:", error);
    }
  };



  // Determine status for each factor
  const getStatus = (score: number) => {
    if (score >= 85) return "excellent"
    if (score >= 70) return "good"
    if (score >= 50) return "fair"
    return "poor"
  }


  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
            ESG Factor Analysis & Supplier Ranking
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive Environmental, Social & Governance evaluation with intelligent supplier recommendations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger className="w-64 transition-all duration-300 hover:shadow-lg">
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
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-background/50 backdrop-blur-sm">
            <TabsTrigger
              value="esg-analysis"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
            >
              ESG Analysis
            </TabsTrigger>
            <TabsTrigger
              value="supplier-ranking"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
            >
              Supplier Ranking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="esg-analysis" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Overall ESG Score</CardTitle>
                  <CardDescription>Comprehensive sustainability rating</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                    >
                      {esgScore !== null ? esgScore.toFixed(1) : "N/A"}
                    </motion.div>
                    <div className="text-lg text-muted-foreground">out of 100</div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-md px-5 py-1.5 rounded-full transition-all duration-300",
                        esgScore !== null && esgScore >= 85
                          ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                          : esgScore !== null && esgScore >= 70
                            ? "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
                            : esgScore !== null && esgScore >= 50
                              ? "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                              : "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                      )}
                    >
                      {esgScore !== null
                        ? esgScore >= 85
                          ? "Excellent"
                          : esgScore >= 70
                            ? "Good"
                            : esgScore >= 50
                              ? "Fair"
                              : "Poor"
                        : "N/A"}{" "}
                      Performance
                    </Badge>
                    <Button
                      onClick={calculateScores}
                      className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                      Calculate Scores
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>ESG Breakdown</CardTitle>
                  <CardDescription>Score distribution across pillars</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Environmental", value: eScore || 0, color: "#22c55e" },
                          { name: "Social", value: sScore || 0, color: "#3b82f6" },
                          { name: "Governance", value: gScore || 0, color: "#f59e0b" },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#22c55e" />
                        <Cell fill="#3b82f6" />
                        <Cell fill="#f59e0b" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="flex justify-center space-x-4 mt-4">
                    {[
                      { name: "Environmental", value: eScore || 0, color: "#22c55e" },
                      { name: "Social", value: sScore || 0, color: "#3b82f6" },
                      { name: "Governance", value: gScore || 0, color: "#f59e0b" },
                    ].map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm">
                          {entry.name}: {entry.value.toFixed(1)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <AccordionItem value="environmental" className="border rounded-lg px-4 transition-all duration-300 hover:shadow-lg">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full transition-all duration-300 hover:scale-110">
                        <Leaf className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-semibold">Environmental</h3>
                        <p className="text-sm text-muted-foreground">Climate impact and resource management</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid gap-4">
                      {/* Environmental Score Cards */}
                      {[
                        { name: "GHG Score", score: ghgScore, description: "Greenhouse gas emissions performance" },
                        { name: "Energy Efficiency Score", score: energyEfficiencyScore, description: "Energy consumption efficiency" },
                        { name: "Water Efficiency Score", score: waterEfficiencyScore, description: "Water usage efficiency" },
                        { name: "Waste Recycling Score", score: wasteRecyclingScore, description: "Waste recycling rate" },
                        { name: "Compliance Score", score: complianceScore, description: "Environmental compliance record" },
                        { name: "Renewable Energy Score", score: renewableEnergyScore, description: "Renewable energy usage" },
                        { name: "Biodiversity Score", score: biodiversityScore, description: "Biodiversity impact" },
                        { name: "Climate Risk Management Score", score: climateRiskManagementScore, description: "Climate risk measures" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          <Card className="transition-all duration-300 hover:shadow-md">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon("fair")}
                                  <span className="font-medium">{item.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium">{Number(item.score).toFixed(1)}/100</span>
                                  <Badge variant="outline" className={getStatusColor("fair")}>
                                    fair
                                  </Badge>
                                </div>
                              </div>
                              <Progress
                                value={Number(item.score)}
                                className="mb-2 transition-all duration-300"
                              />
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

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

                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">

                  <div className="grid gap-4">
                    {/* Retention Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Retention Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(retentionScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(retentionScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Employee retention rate</p>
                      </CardContent>
                    </Card>

                    {/* Safety Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Safety Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(safetyScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(safetyScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Workplace safety performance</p>
                      </CardContent>
                    </Card>

                    {/* Diversity Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Diversity Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(diversityScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(diversityScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Workforce diversity</p>
                      </CardContent>
                    </Card>

                    {/* Community Investment Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Community Investment Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(communityInvestmentScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(communityInvestmentScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Community investment level</p>
                      </CardContent>
                    </Card>

                    {/* Customer Satisfaction Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Customer Satisfaction Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(customerSatisfactionScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(customerSatisfactionScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Customer satisfaction (NPS)</p>
                      </CardContent>
                    </Card>

                    {/* Human Rights Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Human Rights Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(humanRightsScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(humanRightsScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Human rights compliance</p>
                      </CardContent>
                    </Card>

                    {/* Training Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Training Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(trainingScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(trainingScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Employee training hours</p>
                      </CardContent>
                    </Card>
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

                  </div>
                </AccordionTrigger>

                <AccordionContent className="space-y-4 pt-4">

                  <div className="grid gap-4">
                    {/* Board Independence Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Board Independence Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(boardIndependenceScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(boardIndependenceScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Proportion of independent board members</p>
                      </CardContent>
                    </Card>

                    {/* Compensation Alignment Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Compensation Alignment Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(compensationAlignmentScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(compensationAlignmentScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Executive compensation alignment</p>
                      </CardContent>
                    </Card>

                    {/* Audit Committee Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Audit Committee Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(auditCommitteeScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(auditCommitteeScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Audit committee independence and effectiveness</p>
                      </CardContent>
                    </Card>

                    {/* Shareholder Rights Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Shareholder Rights Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(shareholderRightsScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(shareholderRightsScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Strength of shareholder voting rights</p>
                      </CardContent>
                    </Card>

                    {/* Transparency Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Transparency Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(transparencyScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(transparencyScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Disclosure and transparency of governance practices</p>
                      </CardContent>
                    </Card>

                    {/* Anti-Corruption Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Anti-Corruption Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(antiCorruptionScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(antiCorruptionScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Anti-corruption policies and measures</p>
                      </CardContent>
                    </Card>

                    {/* Tax Transparency Score */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon("fair")}
                            <span className="font-medium">Tax Transparency Score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{Number(taxTransparencyScore).toFixed(1)}/100</span>
                            <Badge variant="outline" className={getStatusColor("fair")}>fair</Badge>
                          </div>
                        </div>
                        <Progress value={Number(taxTransparencyScore)} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Transparency of tax payments and policies</p>
                      </CardContent>
                    </Card>
                  </div>

                </AccordionContent>

              </AccordionItem>
            </Accordion>
            <div className="flex justify-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 
               rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 
               hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-4 
               focus:ring-red-400 focus:ring-opacity-50"
              >
                Calculate Individual Scores
              </motion.button>
            </div>

          </TabsContent>

          <TabsContent value="supplier-ranking" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2">
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center">
                          <Award className="h-6 w-6 mr-3 text-primary animate-pulse" />
                          Supplier Rankings
                        </CardTitle>
                        <CardDescription>Comprehensive supplier evaluation and ranking</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 hover:scale-105 hover:shadow-md"
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 hover:scale-105 hover:shadow-md"
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supplierRankings.map((supplier, index) => (
                        <motion.div
                          key={supplier.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        >
                          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
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
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="transition-all duration-300 hover:shadow-lg">
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

                <Card className="transition-all duration-300 hover:shadow-lg">
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
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      <Chatbot />
    </div>
  )
}