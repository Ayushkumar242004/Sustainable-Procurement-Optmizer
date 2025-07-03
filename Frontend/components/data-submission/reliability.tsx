"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, AlertTriangle, ShieldCheck, Activity, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { SystemReliabilitySection } from "@/components/data-submission/sections/SystemReliabilitySection"
import { OperationalReliabilitySection } from "@/components/data-submission/sections/OperationalReliabilitySection"

type SectionId = 'system' | 'operational' | 'documents';

const sections = [
  { id: "system", title: "System Reliability", icon: ShieldCheck, description: "Technical system performance metrics" },
  { id: "operational", title: "Operational Reliability", icon: Activity, description: "Business process reliability indicators" },
  { id: "documents", title: "Documents", icon: Upload, description: "Supporting documentation" }
]

const userData = JSON.parse(localStorage.getItem("userData") || "{}");
const email = userData.email;

export default function Reliability() {
  // System Reliability state
  const [uptimePercentage, setUptimePercentage] = useState("");
  const [meanTimeBetweenFailures, setMeanTimeBetweenFailures] = useState("");
  const [meanTimeToRepair, setMeanTimeToRepair] = useState("");
  const [criticalFailureRate, setCriticalFailureRate] = useState("");
  
  // Operational Reliability state
  const [onTimeDeliveryRate, setOnTimeDeliveryRate] = useState("");
  const [productionYield, setProductionYield] = useState("");
  const [serviceLevelAgreement, setServiceLevelAgreement] = useState("");
  const [incidentResponseTime, setIncidentResponseTime] = useState("");
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ reliabilityDocument?: File }>({});

  const [expandedSections, setExpandedSections] = useState({
    system: true,
    operational: false,
    documents: false
  });

  const toggleSection = (sectionId: SectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  };

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
                <p className="font-medium text-foreground">Reliability data processed</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Reliability metrics analyzed.{" "}
                  <a 
                    href="/reliability-analysis" 
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
                <p className="font-medium text-foreground">Reliability data required</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Please upload your reliability reports
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
              {section.id === "system" && (
                <SystemReliabilitySection
                  uptimePercentage={uptimePercentage}
                  setUptimePercentage={setUptimePercentage}
                  meanTimeBetweenFailures={meanTimeBetweenFailures}
                  setMeanTimeBetweenFailures={setMeanTimeBetweenFailures}
                  meanTimeToRepair={meanTimeToRepair}
                  setMeanTimeToRepair={setMeanTimeToRepair}
                  criticalFailureRate={criticalFailureRate}
                  setCriticalFailureRate={setCriticalFailureRate}
                />
              )}

              {section.id === "operational" && (
                <OperationalReliabilitySection
                  onTimeDeliveryRate={onTimeDeliveryRate}
                  setOnTimeDeliveryRate={setOnTimeDeliveryRate}
                  productionYield={productionYield}
                  setProductionYield={setProductionYield}
                  serviceLevelAgreement={serviceLevelAgreement}
                  setServiceLevelAgreement={setServiceLevelAgreement}
                  incidentResponseTime={incidentResponseTime}
                  setIncidentResponseTime={setIncidentResponseTime}
                />
              )}

              {section.id === "documents" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Reliability Reports</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-float" />
                      <p className="text-lg font-medium mb-2">Upload Reliability Reports</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload your reliability documentation (PDF, Word, Excel)
                      </p>

                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload("reliabilityDocument", file)
                        }}
                        className="hidden"
                        id="reliability-document-upload"
                        accept=".pdf,.docx,.xlsx"
                      />

                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("reliability-document-upload")?.click()}
                        className="transition-all duration-300 hover:scale-105"
                      >
                        Choose File
                      </Button>

                      <p className="text-xs text-muted-foreground mt-2">Max file size: 10MB</p>

                      {uploadedFiles.reliabilityDocument && (
                        <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          {uploadedFiles.reliabilityDocument.name}
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