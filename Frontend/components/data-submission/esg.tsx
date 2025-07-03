"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, AlertTriangle , Leaf, Users, Shield, Factory, Award, FileText, ChevronDown, ChevronUp, HelpCircle , Loader2 } from "lucide-react"
import { useEffect } from "react"
import { CompanySection } from "@/components/data-submission/sections/CompanySection"
import { EnvironmentSection } from "@/components/data-submission/sections/EnvironmentSection"
import { GovernanceSection } from "@/components/data-submission/sections/GovernanceSection" 
import { SocialSection } from "./sections/SocialSection"

type SectionId = 'company' | 'environmental' | 'social' | 'governance' | 'documents';

const sections = [
  { id: "company", title: "Company Information", icon: Factory, description: "Basic company details" },
  { id: "environmental", title: "Environmental Data", icon: Leaf, description: "Emissions and resource usage" },
  { id: "social", title: "Social Responsibility", icon: Users, description: "Employee and community metrics" },
  { id: "governance", title: "Governance", icon: Shield, description: "Corporate governance metrics" },
  { id: "documents", title: "Documents", icon: FileText, description: "Supporting documentation" }
]

const userData = JSON.parse(localStorage.getItem("userData") || "{}");
const email = userData.email;

// Function to disable input feilds 
const shouldDisableField = (fieldValue: string) => {
return !fieldValue;
}


export default function ESG( ){
      // ESG document reports
  const [uploadedFiles, setUploadedFiles] = useState<{ esgDocument?: File }>({})
  // company state variables
  const [companyName, setCompanyName] = useState("");
  const [reportingYear, setReportingYear] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");

  // Environment variables 
  const [companyGhgEmissionsPerUnitRevenue, setCompanyGhgEmissionsPerUnitRevenue] = useState("");
  const [companyEnergyConsumptionPerUnitOutput, setCompanyEnergyConsumptionPerUnitOutput] = useState("");
  const [companyWaterWithdrawalPerUnitOutput, setCompanyWaterWithdrawalPerUnitOutput] = useState("");
  const [amountWasteRecycled, setAmountWasteRecycled] = useState("");
  const [totalWasteGenerated, setTotalWasteGenerated] = useState("");
  const [environmentalFinesPenaltyWeight, setEnvironmentalFinesPenaltyWeight] = useState("");
  const [renewableEnergyConsumption, setRenewableEnergyConsumption] = useState("");
  const [totalEnergyConsumption, setTotalEnergyConsumption] = useState("");
  const [biodiversityImpactScore, setBiodiversityImpactScore] = useState("");
  const [climateRiskMitigationMeasuresImplemented, setClimateRiskMitigationMeasuresImplemented] = useState("");
  const [totalApplicableMeasures, setTotalApplicableMeasures] = useState("");

  // social state variables
  const [employeeTurnoverRate, setEmployeeTurnoverRate] = useState("");
  const [companyInjuryRate, setCompanyInjuryRate] = useState("");
  const [numberDiverseEmployees, setNumberDiverseEmployees] = useState("");
  const [totalEmployees, setTotalEmployees] = useState("");
  const [amountInvestedCommunityPrograms, setAmountInvestedCommunityPrograms] = useState("");
  const [netPromoterScore, setNetPromoterScore] = useState("");
  const [numberReportedViolationsSeverityWeight, setNumberReportedViolationsSeverityWeight] = useState("");
  const [avgTrainingHoursPerEmployee, setAvgTrainingHoursPerEmployee] = useState("");

  // Governance
  const [numberIndependentDirectors, setNumberIndependentDirectors] = useState("");
  const [totalNumberDirectors, setTotalNumberDirectors] = useState("");
  const [ceoPayRatio, setCeoPayRatio] = useState("");
  const [numberIndependentAuditCommitteeMembers, setNumberIndependentAuditCommitteeMembers] = useState("");
  const [totalAuditCommitteeMembers, setTotalAuditCommitteeMembers] = useState("");
  const [numberShareholderFriendlyPoliciesImplemented, setNumberShareholderFriendlyPoliciesImplemented] = useState("");
  const [totalNumberEvaluatedPolicies, setTotalNumberEvaluatedPolicies] = useState("");
  const [numberDisclosedEsgMetrics, setNumberDisclosedEsgMetrics] = useState("");
  const [totalNumberRelevantEsgMetrics, setTotalNumberRelevantEsgMetrics] = useState("");
  const [numberCorruptionIncidentsSeverityWeight, setNumberCorruptionIncidentsSeverityWeight] = useState("");
  const [numberDisclosedTaxJurisdictions, setNumberDisclosedTaxJurisdictions] = useState("");
  const [totalNumberOperatingJurisdictions, setTotalNumberOperatingJurisdictions] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // state to prefill the data 
  const [ hasData , setHasdata ] = useState( false ) ; 

  const [expandedSections, setExpandedSections] = useState({
      company: true,
      environmental: false,
      social: false,
      governance: false,
      documents: false
  })

  const toggleSection = (sectionId: SectionId) => {
    setExpandedSections(prev => ({
    ...prev,
    [sectionId]: !prev[sectionId]
  }))
  }

    // function to update value 
  const updateFormFields = (parsed: any) => {
    setCompanyName(parsed.company_name || "");
    setReportingYear(parsed.reporting_year?.toString() || "");
    setCompanyGhgEmissionsPerUnitRevenue(parsed.company_ghg_emissions_per_unit_revenue?.toString() || "");
    setCompanyEnergyConsumptionPerUnitOutput(parsed.company_energy_consumption_per_unit_output?.toString() || "");
    setCompanyWaterWithdrawalPerUnitOutput(parsed.company_water_withdrawal_per_unit_output?.toString() || "");
    setAmountWasteRecycled(parsed.amount_waste_recycled?.toString() || "");
    setTotalWasteGenerated(parsed.total_waste_generated?.toString() || "");
    setEnvironmentalFinesPenaltyWeight(parsed.environmental_fines_penalty_weight?.toString() || "");
    setRenewableEnergyConsumption(parsed.renewable_energy_consumption?.toString() || "");
    setTotalEnergyConsumption(parsed.total_energy_consumption?.toString() || "");
    setBiodiversityImpactScore(parsed.biodiversity_impact_score?.toString() || "");
    setClimateRiskMitigationMeasuresImplemented(parsed.climate_risk_mitigation_measures_implemented?.toString() || "");
    setTotalApplicableMeasures(parsed.total_applicable_measures?.toString() || "");
    setEmployeeTurnoverRate(parsed.employee_turnover_rate?.toString() || "");
    setCompanyInjuryRate(parsed.company_injury_rate?.toString() || "");
    setNumberDiverseEmployees(parsed.number_diverse_employees?.toString() || "");
    setTotalEmployees(parsed.total_employees?.toString() || "");
    setAmountInvestedCommunityPrograms(parsed.amount_invested_community_programs?.toString() || "");
    setTotalRevenue(parsed.total_revenue?.toString() || "");
    setNetPromoterScore(parsed.net_promoter_score?.toString() || "");
    setNumberReportedViolationsSeverityWeight(parsed.number_reported_violations_severity_weight?.toString() || "");
    setAvgTrainingHoursPerEmployee(parsed.avg_training_hours_per_employee?.toString() || "");
    setNumberIndependentDirectors(parsed.number_independent_directors?.toString() || "");
    setTotalNumberDirectors(parsed.total_number_directors?.toString() || "");
    setCeoPayRatio(parsed.ceo_pay_ratio?.toString() || "");
    setNumberIndependentAuditCommitteeMembers(parsed.number_independent_audit_committee_members?.toString() || "");
    setTotalAuditCommitteeMembers(parsed.total_audit_committee_members?.toString() || "");
    setNumberShareholderFriendlyPoliciesImplemented(parsed.number_shareholder_friendly_policies_implemented?.toString() || "");
    setTotalNumberEvaluatedPolicies(parsed.total_number_evaluated_policies?.toString() || "");
    setNumberDisclosedEsgMetrics(parsed.number_disclosed_esg_metrics?.toString() || "");
    setTotalNumberRelevantEsgMetrics(parsed.total_number_relevant_esg_metrics?.toString() || "");
    setNumberCorruptionIncidentsSeverityWeight(parsed.number_corruption_incidents_severity_weight?.toString() || "");
    setNumberDisclosedTaxJurisdictions(parsed.number_disclosed_tax_jurisdictions?.toString() || "");
    setTotalNumberOperatingJurisdictions(parsed.total_number_operating_jurisdictions?.toString() || "");
  };

    // this useEffect will run on the first load of the route
    useEffect( ( ) => { 
      const checkData = async ( ) => {
        try{
          const dbResponse = await fetch('http://localhost:8000/api/get-esg-prefill' , 
          {
            headers: { "email": email }
          }) ; 
          
          if (dbResponse.ok) {
            const dbData = await dbResponse.json();
            console.log("Prefilled from DB:", dbData.result);
            setHasdata( true );
            updateFormFields(dbData.result);
            return;
          }
          
          setHasdata( false ) ; 
        }catch (err) {
          console.error("error:", err);
        }
      }
      checkData( ) ; 
    } ,  [ ])

    const handleFinalESGSubmit = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/calculate-and-store-esg", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send as JSON
        });

        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to calculate ESG score");
        }

        const data = await response.json();
        
        console.log("ESG scores calculated:", data);
        return data;
    } catch (err: any) {
        console.error("ESG Calculation Error:", err);
        throw err;
    }
    };

      // <---- Handles file uploads ---->
  const handleFileUpload = async (key: string, file: File) => {
  try {
    setIsLoading(true);
    setUploadedFiles((prev) => ({ ...prev, [key]: file }));
    setUploadProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    // Get email from localStorage (or any other auth provider)
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const email = userData.email || "";
    formData.append("email", email);

    console.log("Uploading file:", file.name);

    setUploadProgress(30);
    const response = await fetch("http://localhost:8000/api/submit-esg-report", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to upload ESG report.");
    }

    const data = await response.json();
    updateFormFields( data.result)
    setUploadProgress(50);
    console.log("Upload and extraction successful:", data);

    // Optionally: you can store result in state or trigger a re-fetch of prefill
    setHasdata( true ); 

    // calling function to 
    try {
      await handleFinalESGSubmit();
      setUploadProgress(100);
    } catch (err) {
    console.error("Final submission failed (non-blocking):", err);
    } 

    setUploadProgress(100);
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    setUploadProgress(0);
    console.error("Upload error:", err);
    alert("Failed to upload ESG report. Please try again.");
  }
  };

return( 
      <div>
           { isLoading && ( 
              <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center">
                  {/* Spinner (stops spinning at 100%) */}
                  <div 
                    className={`rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4 ${
                      uploadProgress < 100 ? "animate-spin" : ""
                    }`}
                  />

                  {/* Dynamic title (changes on completion) */}
                  <p className="text-lg font-medium">
                    {uploadProgress < 100 
                      ? "Processing your ESG document..." 
                      : "Done! Finalizing results..."
                    }
                  </p>

                  {/* Progress text (accessible via aria-live) */}
                  <p className="text-muted-foreground" aria-live="polite">
                    {uploadProgress < 50 
                      ? `Extracting data (${uploadProgress}%)` 
                      : `Calculating scores (${uploadProgress}%)` 
                    }
                  </p>

                  {/* Progress bar (hides at 100%) */}
                  {uploadProgress < 100 ? (
                    <Progress 
                      value={uploadProgress} 
                      className="mt-4 w-64 mx-auto h-2" 
                    />
                  ) : (
                    <div className="mt-4 h-2 w-64 mx-auto" /> // Spacer for layout consistency
                  )}
                </div>
              </div>
            )} 

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
            
            {/* Status Message - Colors matched to Card component */}
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
                    <p className="font-medium text-foreground">Data successfully processed</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ESG factors extracted from your document.{" "}
                      <a 
                        href="/esg-analysis" 
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
                    <p className="font-medium text-foreground">Upload required</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please upload your ESG report to calculate scores
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          { /* rendering each card component based on section names */ }
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
                  {section.id === "company" && (
                  <CompanySection
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    reportingYear={reportingYear}
                    setReportingYear={setReportingYear}
                    totalRevenue={totalRevenue}
                    setTotalRevenue={setTotalRevenue}
                  />
                )}

                {/* Environmental Section */}
                {section.id === "environmental" && (
                  <EnvironmentSection
                    companyGhgEmissionsPerUnitRevenue={companyGhgEmissionsPerUnitRevenue}
                    setCompanyGhgEmissionsPerUnitRevenue={setCompanyGhgEmissionsPerUnitRevenue}
                    companyEnergyConsumptionPerUnitOutput={companyEnergyConsumptionPerUnitOutput}
                    setCompanyEnergyConsumptionPerUnitOutput={setCompanyEnergyConsumptionPerUnitOutput}
                    companyWaterWithdrawalPerUnitOutput={companyWaterWithdrawalPerUnitOutput}
                    setCompanyWaterWithdrawalPerUnitOutput={setCompanyWaterWithdrawalPerUnitOutput}
                    amountWasteRecycled={amountWasteRecycled}
                    setAmountWasteRecycled={setAmountWasteRecycled}
                    totalWasteGenerated={totalWasteGenerated}
                    setTotalWasteGenerated={setTotalWasteGenerated}
                    environmentalFinesPenaltyWeight={environmentalFinesPenaltyWeight}
                    setEnvironmentalFinesPenaltyWeight={setEnvironmentalFinesPenaltyWeight}
                    renewableEnergyConsumption={renewableEnergyConsumption}
                    setRenewableEnergyConsumption={setRenewableEnergyConsumption}
                    totalEnergyConsumption={totalEnergyConsumption}
                    setTotalEnergyConsumption={setTotalEnergyConsumption}
                    biodiversityImpactScore={biodiversityImpactScore}
                    setBiodiversityImpactScore={setBiodiversityImpactScore}
                    climateRiskMitigationMeasuresImplemented={climateRiskMitigationMeasuresImplemented}
                    setClimateRiskMitigationMeasuresImplemented={setClimateRiskMitigationMeasuresImplemented}
                    totalApplicableMeasures={totalApplicableMeasures}
                    setTotalApplicableMeasures={setTotalApplicableMeasures}
                  />
                )}

                {/* Social Section */}
                {section.id === "social" && (
                  <SocialSection
                    employeeTurnoverRate={employeeTurnoverRate}
                    setEmployeeTurnoverRate={setEmployeeTurnoverRate}
                    companyInjuryRate={companyInjuryRate}
                    setCompanyInjuryRate={setCompanyInjuryRate}
                    numberDiverseEmployees={numberDiverseEmployees}
                    setNumberDiverseEmployees={setNumberDiverseEmployees}
                    totalEmployees={totalEmployees}
                    setTotalEmployees={setTotalEmployees}
                    amountInvestedCommunityPrograms={amountInvestedCommunityPrograms}
                    setAmountInvestedCommunityPrograms={setAmountInvestedCommunityPrograms}
                    netPromoterScore={netPromoterScore}
                    setNetPromoterScore={setNetPromoterScore}
                    numberReportedViolationsSeverityWeight={numberReportedViolationsSeverityWeight}
                    setNumberReportedViolationsSeverityWeight={setNumberReportedViolationsSeverityWeight}
                    avgTrainingHoursPerEmployee={avgTrainingHoursPerEmployee}
                    setAvgTrainingHoursPerEmployee={setAvgTrainingHoursPerEmployee}
                  />
                )}

                {/* Governance Section */}
                {section.id === "governance" && (
                  <GovernanceSection
                    numberIndependentDirectors={numberIndependentDirectors}
                    setNumberIndependentDirectors={setNumberIndependentDirectors}
                    totalNumberDirectors={totalNumberDirectors}
                    setTotalNumberDirectors={setTotalNumberDirectors}
                    ceoPayRatio={ceoPayRatio}
                    setCeoPayRatio={setCeoPayRatio}
                    numberIndependentAuditCommitteeMembers={numberIndependentAuditCommitteeMembers}
                    setNumberIndependentAuditCommitteeMembers={setNumberIndependentAuditCommitteeMembers}
                    totalAuditCommitteeMembers={totalAuditCommitteeMembers}
                    setTotalAuditCommitteeMembers={setTotalAuditCommitteeMembers}
                    numberShareholderFriendlyPoliciesImplemented={numberShareholderFriendlyPoliciesImplemented}
                    setNumberShareholderFriendlyPoliciesImplemented={setNumberShareholderFriendlyPoliciesImplemented}
                    totalNumberEvaluatedPolicies={totalNumberEvaluatedPolicies}
                    setTotalNumberEvaluatedPolicies={setTotalNumberEvaluatedPolicies}
                    numberDisclosedEsgMetrics={numberDisclosedEsgMetrics}
                    setNumberDisclosedEsgMetrics={setNumberDisclosedEsgMetrics}
                    totalNumberRelevantEsgMetrics={totalNumberRelevantEsgMetrics}
                    setTotalNumberRelevantEsgMetrics={setTotalNumberRelevantEsgMetrics}
                    numberCorruptionIncidentsSeverityWeight={numberCorruptionIncidentsSeverityWeight}
                    setNumberCorruptionIncidentsSeverityWeight={setNumberCorruptionIncidentsSeverityWeight}
                    numberDisclosedTaxJurisdictions={numberDisclosedTaxJurisdictions}
                    setNumberDisclosedTaxJurisdictions={setNumberDisclosedTaxJurisdictions}
                    totalNumberOperatingJurisdictions={totalNumberOperatingJurisdictions}
                    setTotalNumberOperatingJurisdictions={setTotalNumberOperatingJurisdictions}
                  />
                )}

                  {section.id === "documents" && (
                    <div className="space-y-6">
                      {/* ESG Document Upload */}
                      <div className="space-y-4">
                        <Label>ESG Report Document</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-float" />
                          <p className="text-lg font-medium mb-2">Upload ESG Report</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Upload your comprehensive ESG report (PDF, Word, Excel)
                          </p>

                          {/* Hidden File Input */}
                          <input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload("esgDocument", file)
                            }}
                            className="hidden"
                            id="esg-document-upload"
                            accept=".pdf,.docx,.xlsx"
                          />

                          {/* Button to trigger file input */}
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById("esg-document-upload")?.click()}
                            className="transition-all duration-300 hover:scale-105"
                          >
                            Choose File
                          </Button>

                          <p className="text-xs text-muted-foreground mt-2">Max file size: 10MB</p>

                          {uploadedFiles.esgDocument && (
                            <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              {uploadedFiles.esgDocument.name}
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
      </div>
)}