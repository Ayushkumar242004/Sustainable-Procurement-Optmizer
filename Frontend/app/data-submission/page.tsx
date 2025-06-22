"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, CheckCircle, Leaf, Users, Shield, Factory, Award, FileText, ChevronDown, ChevronUp, HelpCircle , Loader2 } from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { useEffect } from "react"
import { useRouter } from "next/router";

const sections = [
  { id: "company", title: "Company Information", icon: Factory, description: "Basic company details" },
  { id: "environmental", title: "Environmental Data", icon: Leaf, description: "Emissions and resource usage" },
  { id: "social", title: "Social Responsibility", icon: Users, description: "Employee and community metrics" },
  { id: "governance", title: "Governance", icon: Shield, description: "Corporate governance metrics" },
  { id: "documents", title: "Documents", icon: FileText, description: "Supporting documentation" }
]

export default function DataSubmissionPage() {


  const [uploadedFiles, setUploadedFiles] = useState<{ esgDocument?: File }>({})
  const [companyName, setCompanyName] = useState("");
  const [reportingYear, setReportingYear] = useState("");
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
  const [employeeTurnoverRate, setEmployeeTurnoverRate] = useState("");
  const [companyInjuryRate, setCompanyInjuryRate] = useState("");
  const [numberDiverseEmployees, setNumberDiverseEmployees] = useState("");
  const [totalEmployees, setTotalEmployees] = useState("");
  const [amountInvestedCommunityPrograms, setAmountInvestedCommunityPrograms] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [netPromoterScore, setNetPromoterScore] = useState("");
  const [numberReportedViolationsSeverityWeight, setNumberReportedViolationsSeverityWeight] = useState("");
  const [avgTrainingHoursPerEmployee, setAvgTrainingHoursPerEmployee] = useState("");
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
  const [esgResult, setEsgResult] = useState(null);
  const [overallData, setOverallData] = useState(null);

    // Prefill from storage 
    useEffect(() => {
      const fetchAndPrefillESGData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const email = userData.email;
        if (!email) return;

        // Always try to fetch from DB first on reload
        const dbResponse = await fetch(`http://localhost:8000/api/get-esg-prefill`, {
          headers: { "email": email }
        });
        
        if (dbResponse.ok) {
          const dbData = await dbResponse.json();
          console.log("Prefilled from DB:", dbData.result);
          updateFormFields(dbData.result);
          return;
        }

        // Fallback to esgResult if exists (for upload scenario)
        if (esgResult) {
          console.log("Prefilled from memory:", esgResult);
          updateFormFields(esgResult);
        }

      } catch (err) {
        console.error("Prefill error:", err);
      }
    };

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
    fetchAndPrefillESGData();
  }, [uploadProgress , esgResult ]);

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

    setUploadProgress(60);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to upload ESG report.");
    }

    const data = await response.json();

    setUploadProgress(90);
    console.log("Upload and extraction successful:", data);

    // Optionally: you can store result in state or trigger a re-fetch of prefill
    setEsgResult(data.result);
    setOverallData(data.overall_data);

    setUploadProgress(100);
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    console.error("Upload error:", err);
    alert("Failed to upload ESG report. Please try again.");
  }
  };
  
  //<----- -------->
  const [formData, setFormData] = useState({
    // Company Information
    company_name: "",
    reporting_year: "",

    // Environmental
    company_ghg_emissions_per_unit_revenue: "",
    company_energy_consumption_per_unit_output: "",
    company_water_withdrawal_per_unit_output: "",
    amount_waste_recycled: "",
    total_waste_generated: "",
    environmental_fines_penalty_weight: "",
    renewable_energy_consumption: "",
    total_energy_consumption: "",
    biodiversity_impact_score: "",
    climate_risk_mitigation_measures_implemented: "",
    total_applicable_measures: "",

    // Social
    employee_turnover_rate: "",
    company_injury_rate: "",
    number_diverse_employees: "",
    total_employees: "",
    amount_invested_community_programs: "",
    total_revenue: "",
    net_promoter_score: "",
    number_reported_violations_severity_weight: "",
    avg_training_hours_per_employee: "",

    // Governance
    number_independent_directors: "",
    total_number_directors: "",
    ceo_pay_ratio: "",
    number_independent_audit_committee_members: "",
    total_audit_committee_members: "",
    number_shareholder_friendly_policies_implemented: "",
    total_number_evaluated_policies: "",
    number_disclosed_esg_metrics: "",
    total_number_relevant_esg_metrics: "",
    number_corruption_incidents_severity_weight: "",
    number_disclosed_tax_jurisdictions: "",
    total_number_operating_jurisdictions: ""
  })


  const [expandedSections, setExpandedSections] = useState({
    company: true,
    environmental: false,
    social: false,
    governance: false,
    documents: false
  })

  const { toast } = useToast()

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }


  type SectionId = 'company' | 'environmental' | 'social' | 'governance' | 'documents';

  const toggleSection = (sectionId: SectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length
    const filledFields = Object.values(formData).filter(
      value => value !== "" && value !== null
    ).length
    return Math.round((filledFields / totalFields) * 100)
  }
  
  // const handleSubmit = () => {

  //   toast({
  //     title: "Data submitted successfully!",
  //     description: "Your ESG data has been submitted for calculation. Results will be available shortly.",
  //   })
  //   setTimeout(() => {
  //   window.location.href = "http://localhost:3000/esg-analysis";
  // }, 2000); 
  // } 
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFinalESGSubmit = async () => {
    setIsSubmitting(true);
    try {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const email = userData.email || "";

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
    setIsSubmitted(true); 
    return data;

  } catch (err: any) {
    console.error("ESG Calculation Error:", err);
    throw err;
  }finally{
    setIsSubmitting( false )
  }
  };

  // Function to disable input feilds 
  const shouldDisableField = (fieldValue: string) => {
  return ( uploadProgress === 100 ) && !fieldValue;
  }

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">

      {/* loading component */}
      {isLoading && (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Processing your ESG document...</p>
          <p className="text-muted-foreground">
            Extracting data and populating fields ({uploadProgress}%)
          </p>
          <Progress 
            value={uploadProgress} 
            className="mt-4 w-64 mx-auto h-2" 
          />
        </div>
      </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-4">
            ESG Data <span className="gradient-text">Submission Portal</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">
            Submit your sustainability metrics for comprehensive ESG scoring
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Submission Progress</span>
            <span className="text-sm text-muted-foreground">{uploadProgress}% Complete</span>
          </div>
        <Progress value={uploadProgress} className="h-2 transition-all duration-500" />
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company_name">
                          <div className="flex items-center gap-2">
                            Company Name
                            <span className="text-red-500">*</span>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Label>
                        <Input
                          id="company_name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Enter company name"
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reporting_year">
                          <div className="flex items-center gap-2">
                            Reporting Year
                            <span className="text-red-500">*</span>
                          </div>
                        </Label>
                        <Input
                          id="reporting_year"
                          type="number"
                          value={reportingYear}
                          onChange={(e) => setReportingYear(e.target.value)}
                          placeholder="2023"
                          min="2000"
                          max="2099"
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total_revenue">Total Revenue (USD) </Label>
                        <Input
                          id="total_revenue"
                          type="number"
                          value={totalRevenue}
                          onChange={(e) => setTotalRevenue(e.target.value)}
                          placeholder="Amount (in USD)"
                          min="0"
                          max="INF"
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                        />
                      </div>

                    </div>
                  )}

                  {section.id === "environmental" && (
                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company_ghg_emissions_per_unit_revenue">
                            GHG Emissions per Unit Revenue
                          </Label>
                          <Input
                            id="company_ghg_emissions_per_unit_revenue"
                            type="number"
                            step="0.01"
                            value={companyGhgEmissionsPerUnitRevenue}
                            onChange={(e) => setCompanyGhgEmissionsPerUnitRevenue(e.target.value)}
                            disabled={shouldDisableField(companyGhgEmissionsPerUnitRevenue)}
                            placeholder="Metric tons CO2e per $ revenue"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company_energy_consumption_per_unit_output">
                            Energy Consumption per Unit Output
                          </Label>
                          <Input
                            id="company_energy_consumption_per_unit_output"
                            type="number"
                            step="0.01"
                            value={companyEnergyConsumptionPerUnitOutput}
                            onChange={(e) => setCompanyEnergyConsumptionPerUnitOutput(e.target.value)}
                            disabled={shouldDisableField(companyEnergyConsumptionPerUnitOutput)}
                            placeholder="kWh per unit output"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company_water_withdrawal_per_unit_output">
                            Water Withdrawal per Unit Output
                          </Label>
                          <Input
                            id="company_water_withdrawal_per_unit_output"
                            type="number"
                            step="0.01"
                            value={companyWaterWithdrawalPerUnitOutput}
                            onChange={(e) => setCompanyWaterWithdrawalPerUnitOutput(e.target.value)}
                            disabled={shouldDisableField(companyWaterWithdrawalPerUnitOutput)}
                            placeholder="Cubic meters per unit output"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="amount_waste_recycled">Amount of Waste (Metric tons kg)</Label>
                          <Input
                            id="amount_waste_recycled"
                            type="number"
                            step="0.01"
                            value={amountWasteRecycled}
                            onChange={(e) => setAmountWasteRecycled(e.target.value)}
                            disabled={shouldDisableField(amountWasteRecycled)}
                            placeholder="Metric tons recycled"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="total_waste_generated">Total Waste Generated (Metric tons kg)</Label>
                          <Input
                            id="total_waste_generated"
                            type="number"
                            step="0.01"
                            value={totalWasteGenerated}
                            onChange={(e) => setTotalWasteGenerated(e.target.value)}
                            disabled={shouldDisableField(totalWasteGenerated)}
                            placeholder="Metric tons total waste"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="environmental_fines_penalty_weight">
                            Environmental Fines/Penalties (Weighted)
                          </Label>
                          <Input
                            id="environmental_fines_penalty_weight"
                            type="number"
                            value={environmentalFinesPenaltyWeight}
                            onChange={(e) => setEnvironmentalFinesPenaltyWeight(e.target.value)}
                            disabled={shouldDisableField(environmentalFinesPenaltyWeight)}
                            placeholder="Weighted score (0-10)"
                            min="0"
                            max="10"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="renewable_energy_consumption">Renewable Energy Consumption (MWh)</Label>
                          <Input
                            id="renewable_energy_consumption"
                            type="number"
                            step="0.01"
                            value={renewableEnergyConsumption}
                            onChange={(e) => setRenewableEnergyConsumption(e.target.value)}
                            disabled={shouldDisableField(renewableEnergyConsumption)}
                            placeholder="MWh from renewables"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="total_energy_consumption">Total Energy Consumption (MWh)</Label>
                          <Input
                            id="total_energy_consumption"
                            type="number"
                            step="0.01"
                            value={totalEnergyConsumption}
                            onChange={(e) => setTotalEnergyConsumption(e.target.value)}
                            disabled={shouldDisableField(totalEnergyConsumption)}
                            placeholder="Total MWh consumed"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="biodiversity_impact_score">Biodiversity Impact Score</Label>
                          <Input
                            id="biodiversity_impact_score"
                            type="number"
                            step="0.1"
                            value={biodiversityImpactScore}
                            onChange={(e) => setBiodiversityImpactScore(e.target.value)}
                            disabled={shouldDisableField(biodiversityImpactScore)}
                            placeholder="Score (0-10)"
                            min="0"
                            max="10"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="climate_risk_mitigation_measures_implemented">
                            Climate Risk Mitigation Measures Implemented
                          </Label>
                          <Input
                            id="climate_risk_mitigation_measures_implemented"
                            type="number"
                            value={climateRiskMitigationMeasuresImplemented}
                            onChange={(e) => setClimateRiskMitigationMeasuresImplemented(e.target.value)}
                            disabled={shouldDisableField(climateRiskMitigationMeasuresImplemented)}
                            placeholder="Number of measures"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="total_applicable_measures">Total Applicable Measures</Label>
                          <Input
                            id="total_applicable_measures"
                            type="number"
                            value={totalApplicableMeasures}
                            onChange={(e) => setTotalApplicableMeasures(e.target.value)}
                            disabled={shouldDisableField(totalApplicableMeasures)}
                            placeholder="Total possible measures"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "social" && (
                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="employee_turnover_rate">Employee Turnover Rate (%)</Label>
                          <Input
                            id="employee_turnover_rate"
                            type="number"
                            step="0.1"
                            value={employeeTurnoverRate}
                            onChange={(e) => setEmployeeTurnoverRate(e.target.value)}
                            disabled={shouldDisableField(employeeTurnoverRate)}
                            placeholder="Annual turnover percentage"
                            min="0"
                            max="100"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company_injury_rate">Company Injury Rate</Label>
                          <Input
                            id="company_injury_rate"
                            type="number"
                            step="0.01"
                            value={companyInjuryRate}
                            onChange={(e) => setCompanyInjuryRate(e.target.value)}
                            disabled={shouldDisableField(companyInjuryRate)}
                            placeholder="Injuries per 100 employees"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="number_diverse_employees">Number of Diverse Employees</Label>
                          <Input
                            id="number_diverse_employees"
                            type="number"
                            value={numberDiverseEmployees}
                            onChange={(e) => setNumberDiverseEmployees(e.target.value)}
                            disabled={shouldDisableField(numberDiverseEmployees)}
                            placeholder="Count of diverse employees"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="total_employees">Total Employees</Label>
                          <Input
                            id="total_employees"
                            type="number"
                            value={totalEmployees}
                            onChange={(e) => setTotalEmployees(e.target.value)}
                            disabled={shouldDisableField(totalEmployees)}
                            placeholder="Total employee count"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>


                        <div className="space-y-2">
                          <Label htmlFor="amount_invested_community_programs">
                            Amount Invested in Community Programs (USD)
                          </Label>
                          <Input
                            id="amount_invested_community_programs"
                            type="number"
                            step="0.01"
                            value={amountInvestedCommunityPrograms}
                            onChange={(e) => setAmountInvestedCommunityPrograms(e.target.value)}
                            disabled={shouldDisableField(amountInvestedCommunityPrograms)}
                            placeholder="Dollar amount"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>



                        <div className="space-y-2">
                          <Label htmlFor="net_promoter_score">Net Promoter Score</Label>
                          <Input
                            id="net_promoter_score"
                            type="number"
                            value={netPromoterScore}
                            onChange={(e) => setNetPromoterScore(e.target.value)}
                            disabled={shouldDisableField(netPromoterScore)}
                            placeholder="Score (-100 to 100)"
                            min="-100"
                            max="100"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="number_reported_violations_severity_weight">
                            Reported Violations (Severity Weighted)
                          </Label>
                          <Input
                            id="number_reported_violations_severity_weight"
                            type="number"
                            value={numberReportedViolationsSeverityWeight}
                            onChange={(e) => setNumberReportedViolationsSeverityWeight(e.target.value)}
                            disabled={shouldDisableField(numberReportedViolationsSeverityWeight)}
                            placeholder="Weighted score (0-10)"
                            min="0"
                            max="10"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avg_training_hours_per_employee">
                            Average Training Hours per Employee
                          </Label>
                          <Input
                            id="avg_training_hours_per_employee"
                            type="number"
                            step="0.1"
                            value={avgTrainingHoursPerEmployee}
                            onChange={(e) => setAvgTrainingHoursPerEmployee(e.target.value)}
                            disabled={shouldDisableField(avgTrainingHoursPerEmployee)}
                            placeholder="Hours per employee per year"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "governance" && (
                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="number_independent_directors">Number of Independent Directors</Label>
                          <Input
                            id="number_independent_directors"
                            type="number"
                            value={numberIndependentDirectors}
                            onChange={(e) => setNumberIndependentDirectors(e.target.value)}
                            disabled={shouldDisableField(numberIndependentDirectors)}
                            placeholder="Count of independent directors"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="total_number_directors">Total Number of Directors</Label>
                          <Input
                            id="total_number_directors"
                            type="number"
                            value={totalNumberDirectors}
                            onChange={(e) => setTotalNumberDirectors(e.target.value)}
                            disabled={shouldDisableField(totalNumberDirectors)}
                            placeholder="Total board members"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ceo_pay_ratio">CEO Pay Ratio</Label>
                          <Input
                            id="ceo_pay_ratio"
                            type="number"
                            step="0.1"
                            value={ceoPayRatio}
                            onChange={(e) => setCeoPayRatio(e.target.value)}
                            disabled={shouldDisableField(ceoPayRatio)}
                            placeholder="Ratio of CEO to median worker pay"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="number_independent_audit_committee_members">
                            Independent Audit Committee Members
                          </Label>
                          <Input
                            id="number_independent_audit_committee_members"
                            type="number"
                            value={numberIndependentAuditCommitteeMembers}
                            onChange={(e) => setNumberIndependentAuditCommitteeMembers(e.target.value)}
                            disabled={shouldDisableField(numberIndependentAuditCommitteeMembers)}
                            placeholder="Count of independent members"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="total_audit_committee_members">Total Audit Committee Members</Label>
                          <Input
                            id="total_audit_committee_members"
                            type="number"
                            value={totalAuditCommitteeMembers}
                            onChange={(e) => setTotalAuditCommitteeMembers(e.target.value)}
                            disabled={shouldDisableField(totalAuditCommitteeMembers)}
                            placeholder="Total committee members"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="number_shareholder_friendly_policies_implemented">
                            Shareholder-Friendly Policies Implemented
                          </Label>
                          <Input
                            id="number_shareholder_friendly_policies_implemented"
                            type="number"
                            value={numberShareholderFriendlyPoliciesImplemented}
                            onChange={(e) => setNumberShareholderFriendlyPoliciesImplemented(e.target.value)}
                            disabled={shouldDisableField(numberShareholderFriendlyPoliciesImplemented)}
                            placeholder="Number of policies"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="total_number_evaluated_policies">Total Number of Evaluated Policies</Label>
                          <Input
                            id="total_number_evaluated_policies"
                            type="number"
                            value={totalNumberEvaluatedPolicies}
                            onChange={(e) => setTotalNumberEvaluatedPolicies(e.target.value)}
                            disabled={shouldDisableField(totalNumberEvaluatedPolicies)}
                            placeholder="Total policies evaluated"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="number_disclosed_esg_metrics">Number of Disclosed ESG Metrics</Label>
                          <Input
                            id="number_disclosed_esg_metrics"
                            type="number"
                            value={numberDisclosedEsgMetrics}
                            onChange={(e) => setNumberDisclosedEsgMetrics(e.target.value)}
                            disabled={shouldDisableField(numberDisclosedEsgMetrics)}
                            placeholder="Metrics publicly disclosed"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="total_number_relevant_esg_metrics">Total Relevant ESG Metrics</Label>
                          <Input
                            id="total_number_relevant_esg_metrics"
                            type="number"
                            value={totalNumberRelevantEsgMetrics}
                            onChange={(e) => setTotalNumberRelevantEsgMetrics(e.target.value)}
                            disabled={shouldDisableField(totalNumberRelevantEsgMetrics)}
                            placeholder="Total applicable metrics"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="number_corruption_incidents_severity_weight">
                            Corruption Incidents (Severity Weighted)
                          </Label>
                          <Input
                            id="number_corruption_incidents_severity_weight"
                            type="number"
                            value={numberCorruptionIncidentsSeverityWeight}
                            onChange={(e) => setNumberCorruptionIncidentsSeverityWeight(e.target.value)}
                            disabled={shouldDisableField(numberCorruptionIncidentsSeverityWeight)}
                            placeholder="Weighted score (0-10)"
                            min="0"
                            max="10"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="number_disclosed_tax_jurisdictions">Number of Disclosed Tax Jurisdictions</Label>
                          <Input
                            id="number_disclosed_tax_jurisdictions"
                            type="number"
                            value={numberDisclosedTaxJurisdictions}
                            onChange={(e) => setNumberDisclosedTaxJurisdictions(e.target.value)}
                            disabled={shouldDisableField(numberDisclosedTaxJurisdictions)}
                            placeholder="Jurisdictions disclosed"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="total_number_operating_jurisdictions">Total Number of Operating Jurisdictions</Label>
                          <Input
                            id="total_number_operating_jurisdictions"
                            type="number"
                            value={totalNumberOperatingJurisdictions}
                            onChange={(e) => setTotalNumberOperatingJurisdictions(e.target.value)}
                            disabled={shouldDisableField(totalNumberOperatingJurisdictions)}
                            placeholder="Total jurisdictions operated in"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                    </div>
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

          {/* Submit Button */}
          <div className="flex justify-center animate-slide-up pt-6">
             <Button
              onClick={handleFinalESGSubmit}
              disabled={isSubmitting || isSubmitted} // Disable if either submitting or already submitted
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 flex items-center transition-all duration-300 hover:scale-105 px-8 py-6 text-lg shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : isSubmitted ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Submitted</span>
                </>
              ) : (
                <>
                  <span className="mr-2">Submit ESG Data</span>
                  <CheckCircle className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  )
}