"use client"
import { Chatbot } from "@/components/chatbot"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ESG from "@/components/data-submission/esg"
import Risk from "@/components/data-submission/risk"
import CostEfficiency from "@/components/data-submission/costEfficiency"
import Reliability from "@/components/data-submission/reliability"

export default function DataSubmissionPage() {
  const [activeTab, setActiveTab] = useState("ESG")

  return (
    <div className="relative pt-24 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight mb-6 max-w-3xl mx-auto">
            Data <span className="gradient-text">Submission Portal</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Submit your metrics for comprehensive scoring
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-10">
          <TabsList className="w-full overflow-x-auto whitespace-nowrap flex gap-2 sm:justify-center">
            <TabsTrigger value="ESG" className="px-4 py-2 text-sm sm:text-base">
              ESG
            </TabsTrigger>
            <TabsTrigger value="Risk" className="px-4 py-2 text-sm sm:text-base">
              Risk
            </TabsTrigger>
            <TabsTrigger value="Cost Efficiency" className="px-4 py-2 text-sm sm:text-base">
              Cost Efficiency
            </TabsTrigger>
            <TabsTrigger value="Reliability" className="px-4 py-2 text-sm sm:text-base">
              Reliability
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tab Contents */}
        <div className="mt-6 space-y-12">
          {activeTab === "ESG" && <ESG />}
          {activeTab === "Risk" && <Risk />}
          {activeTab === "Cost Efficiency" && <CostEfficiency />}
          {activeTab === "Reliability" && <Reliability />}
        </div>
      </div>

      <Chatbot />
    </div>
  )
}
