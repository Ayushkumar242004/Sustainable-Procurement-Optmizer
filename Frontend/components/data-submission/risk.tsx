"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, AlertTriangle, Shield, Activity, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { RiskOverviewSection } from "@/components/data-submission/sections/RiskOverviewSection"
import { RiskMitigationSection } from "@/components/data-submission/sections/RiskMitigationSection"

type SectionId = 'overview' | 'mitigation' | 'documents';

const sections = [
  { id: "overview", title: "Risk Overview", icon: AlertCircle, description: "Key risk indicators and exposures" },
  { id: "mitigation", title: "Risk Mitigation", icon: Shield, description: "Risk control measures and strategies" },
  { id: "documents", title: "Documents", icon: Upload, description: "Supporting documentation" }
]

const userData = JSON.parse(localStorage.getItem("userData") || "{}");
const email = userData.email;

export default function Risk() {
  // Risk state variables
  const [financialRiskScore, setFinancialRiskScore] = useState("");
  const [operationalRiskScore, setOperationalRiskScore] = useState("");
  const [complianceRiskScore, setComplianceRiskScore] = useState("");
  const [reputationRiskScore, setReputationRiskScore] = useState("");
  const [cyberRiskScore, setCyberRiskScore] = useState("");
  const [supplyChainRiskScore, setSupplyChainRiskScore] = useState("");
  
  // Mitigation state variables
  const [riskMitigationBudget, setRiskMitigationBudget] = useState("");
  const [riskTrainingHours, setRiskTrainingHours] = useState("");
  const [incidentsLastYear, setIncidentsLastYear] = useState("");
  const [insuranceCoverageAmount, setInsuranceCoverageAmount] = useState("");
  const [businessContinuityPlans, setBusinessContinuityPlans] = useState("");
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ riskDocument?: File }>({});

  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    mitigation: false,
    documents: false
  });

  const toggleSection = (sectionId: SectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  };

  // Placeholder for data prefilling

  const handleFileUpload = async (key: string, file: File) => {
    // Placeholder implementation
    return;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress Bar with Status Message */}
      <div className="max-w-6xl mx-auto mb-8 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-foreground">Submission Progress</span>
          <span className="text-sm text-muted-foreground">{hasData ? 100 : uploadProgress}% Complete</span>
        </div>
        <Progress 
          value={hasData ? 100 : uploadProgress} 
          className="h-2 transition-all duration-500"
        />
        
        <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 transition-colors duration-200
            ${hasData 
              ? "bg-background border border-primary/30" 
              : "bg-background border border-destructive/30"
            }`}
        >
          {hasData ? (
            <>
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Risk data successfully processed</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Risk factors analyzed.{" "}
                  <a 
                    href="/risk-analysis" 
                    className="text-primary hover:text-primary/80 underline transition-colors"
                  >
                    View full analysis
                  </a>
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Risk assessment required</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Please upload your risk assessment documents
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {sections.map((section) => (
        <Card
          key={section.id}
          className={`transition-all duration-300 hover:shadow-lg ${expandedSections[section.id as SectionId] ? 'border-primary/30' : ''}`}
        >
          <CardHeader
            className="cursor-pointer hover:bg-muted/50 transition-colors duration-200 rounded-t-lg"
            onClick={() => toggleSection(section.id as SectionId)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <section.icon className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary" />
                <CardTitle className="text-xl lg:text-2xl">{section.title}</CardTitle>
              </div>
              {expandedSections[section.id as SectionId] ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>

          {expandedSections[section.id as SectionId] && (
            <CardContent className="space-y-6 animate-fade-in">
              {section.id === "overview" && (
                <RiskOverviewSection
                  financialRiskScore={financialRiskScore}
                  setFinancialRiskScore={setFinancialRiskScore}
                  operationalRiskScore={operationalRiskScore}
                  setOperationalRiskScore={setOperationalRiskScore}
                  complianceRiskScore={complianceRiskScore}
                  setComplianceRiskScore={setComplianceRiskScore}
                  reputationRiskScore={reputationRiskScore}
                  setReputationRiskScore={setReputationRiskScore}
                  cyberRiskScore={cyberRiskScore}
                  setCyberRiskScore={setCyberRiskScore}
                  supplyChainRiskScore={supplyChainRiskScore}
                  setSupplyChainRiskScore={setSupplyChainRiskScore}
                />
              )}

              {section.id === "mitigation" && (
                <RiskMitigationSection
                  riskMitigationBudget={riskMitigationBudget}
                  setRiskMitigationBudget={setRiskMitigationBudget}
                  riskTrainingHours={riskTrainingHours}
                  setRiskTrainingHours={setRiskTrainingHours}
                  incidentsLastYear={incidentsLastYear}
                  setIncidentsLastYear={setIncidentsLastYear}
                  insuranceCoverageAmount={insuranceCoverageAmount}
                  setInsuranceCoverageAmount={setInsuranceCoverageAmount}
                  businessContinuityPlans={businessContinuityPlans}
                  setBusinessContinuityPlans={setBusinessContinuityPlans}
                />
              )}

              {section.id === "documents" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Risk Assessment Document</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-float" />
                      <p className="text-lg font-medium mb-2">Upload Risk Report</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload your comprehensive risk assessment (PDF, Word, Excel)
                      </p>

                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload("riskDocument", file)
                        }}
                        className="hidden"
                        id="risk-document-upload"
                        accept=".pdf,.docx,.xlsx"
                      />

                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("risk-document-upload")?.click()}
                        className="transition-all duration-300 hover:scale-105"
                      >
                        Choose File
                      </Button>

                      <p className="text-xs text-muted-foreground mt-2">Max file size: 10MB</p>

                      {uploadedFiles.riskDocument && (
                        <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          {uploadedFiles.riskDocument.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}