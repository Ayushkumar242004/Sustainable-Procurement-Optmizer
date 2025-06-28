"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RiskMitigationSection({
  riskMitigationBudget,
  setRiskMitigationBudget,
  riskTrainingHours,
  setRiskTrainingHours,
  incidentsLastYear,
  setIncidentsLastYear,
  insuranceCoverageAmount,
  setInsuranceCoverageAmount,
  businessContinuityPlans,
  setBusinessContinuityPlans
}: {
  riskMitigationBudget: string
  setRiskMitigationBudget: (value: string) => void
  riskTrainingHours: string
  setRiskTrainingHours: (value: string) => void
  incidentsLastYear: string
  setIncidentsLastYear: (value: string) => void
  insuranceCoverageAmount: string
  setInsuranceCoverageAmount: (value: string) => void
  businessContinuityPlans: string
  setBusinessContinuityPlans: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Risk Mitigation Budget */}
      <div className="space-y-2">
        <Label htmlFor="riskBudget">Annual Risk Mitigation Budget (USD)</Label>
        <Input
          id="riskBudget"
          type="number"
          value={riskMitigationBudget}
          onChange={(e) => setRiskMitigationBudget(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      {/* Risk Training Hours */}
      <div className="space-y-2">
        <Label htmlFor="trainingHours">Annual Risk Training Hours</Label>
        <Input
          id="trainingHours"
          type="number"
          value={riskTrainingHours}
          onChange={(e) => setRiskTrainingHours(e.target.value)}
          placeholder="Enter hours"
        />
      </div>

      {/* Incidents Last Year */}
      <div className="space-y-2">
        <Label htmlFor="incidents">Major Incidents Last Year</Label>
        <Input
          id="incidents"
          type="number"
          value={incidentsLastYear}
          onChange={(e) => setIncidentsLastYear(e.target.value)}
          placeholder="Enter number"
        />
      </div>

      {/* Insurance Coverage */}
      <div className="space-y-2">
        <Label htmlFor="insurance">Insurance Coverage Amount (USD)</Label>
        <Input
          id="insurance"
          type="number"
          value={insuranceCoverageAmount}
          onChange={(e) => setInsuranceCoverageAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      {/* Business Continuity Plans */}
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="continuityPlans">Business Continuity Plans</Label>
        <Input
          id="continuityPlans"
          type="number"
          value={businessContinuityPlans}
          onChange={(e) => setBusinessContinuityPlans(e.target.value)}
          placeholder="Enter number of active plans"
        />
      </div>
    </div>
  );
}