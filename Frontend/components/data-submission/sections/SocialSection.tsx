import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const shouldDisableField = (fieldValue: string) => {
return !fieldValue;
}

interface SocialSectionProps {
  // Employee Metrics
  employeeTurnoverRate: string;
  setEmployeeTurnoverRate: (value: string) => void;
  companyInjuryRate: string;
  setCompanyInjuryRate: (value: string) => void;
  avgTrainingHoursPerEmployee: string;
  setAvgTrainingHoursPerEmployee: (value: string) => void;
  
  // Diversity Metrics
  numberDiverseEmployees: string;
  setNumberDiverseEmployees: (value: string) => void;
  totalEmployees: string;
  setTotalEmployees: (value: string) => void;
  
  // Community Investment
  amountInvestedCommunityPrograms: string;
  setAmountInvestedCommunityPrograms: (value: string) => void;
  
  // Customer Satisfaction
  netPromoterScore: string;
  setNetPromoterScore: (value: string) => void;
  
  // Compliance
  numberReportedViolationsSeverityWeight: string;
  setNumberReportedViolationsSeverityWeight: (value: string) => void;
}

export const SocialSection = ({
  employeeTurnoverRate,
  setEmployeeTurnoverRate,
  companyInjuryRate,
  setCompanyInjuryRate,
  avgTrainingHoursPerEmployee,
  setAvgTrainingHoursPerEmployee,
  numberDiverseEmployees,
  setNumberDiverseEmployees,
  totalEmployees,
  setTotalEmployees,
  amountInvestedCommunityPrograms,
  setAmountInvestedCommunityPrograms,
  netPromoterScore,
  setNetPromoterScore,
  numberReportedViolationsSeverityWeight,
  setNumberReportedViolationsSeverityWeight,
}: SocialSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Social Data</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employee Metrics */}
        <div className="space-y-2">
          <Label htmlFor="turnover-rate">Employee Turnover Rate (%)</Label>
          <Input
            id="turnover-rate"
            type="number"
            step="0.1"
            value={employeeTurnoverRate}
            onChange={(e) => setEmployeeTurnoverRate(e.target.value)}
            placeholder="Annual turnover percentage"
            disabled={shouldDisableField(employeeTurnoverRate)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="injury-rate">Company Injury Rate</Label>
          <Input
            id="injury-rate"
            type="number"
            step="0.01"
            value={companyInjuryRate}
            onChange={(e) => setCompanyInjuryRate(e.target.value)}
            placeholder="Injuries per 100 employees"
            disabled={shouldDisableField(companyInjuryRate)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="training-hours">Avg Training Hours/Employee</Label>
          <Input
            id="training-hours"
            type="number"
            step="0.1"
            value={avgTrainingHoursPerEmployee}
            onChange={(e) => setAvgTrainingHoursPerEmployee(e.target.value)}
            placeholder="Annual training hours"
            disabled={shouldDisableField(avgTrainingHoursPerEmployee)}
          />
        </div>

        {/* Diversity Metrics */}
        <div className="space-y-2">
          <Label htmlFor="diverse-employees">Diverse Employees</Label>
          <Input
            id="diverse-employees"
            type="number"
            value={numberDiverseEmployees}
            onChange={(e) => setNumberDiverseEmployees(e.target.value)}
            placeholder="Number of diverse employees"
            disabled={shouldDisableField(numberDiverseEmployees)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="total-employees">Total Employees</Label>
          <Input
            id="total-employees"
            type="number"
            value={totalEmployees}
            onChange={(e) => setTotalEmployees(e.target.value)}
            placeholder="Total workforce count"
            disabled={shouldDisableField(totalEmployees)}
          />
        </div>

        {/* Community Investment */}
        <div className="space-y-2">
          <Label htmlFor="community-investment">Community Investment (USD)</Label>
          <Input
            id="community-investment"
            type="number"
            value={amountInvestedCommunityPrograms}
            onChange={(e) => setAmountInvestedCommunityPrograms(e.target.value)}
            placeholder="Amount invested"
            disabled={shouldDisableField(amountInvestedCommunityPrograms)}
          />
        </div>

        {/* Customer Satisfaction */}
        <div className="space-y-2">
          <Label htmlFor="nps-score">Net Promoter Score</Label>
          <Input
            id="nps-score"
            type="number"
            value={netPromoterScore}
            onChange={(e) => setNetPromoterScore(e.target.value)}
            placeholder="NPS (-100 to 100)"
            min="-100"
            max="100"
            disabled={shouldDisableField(netPromoterScore)}
          />
        </div>

        {/* Compliance */}
        <div className="space-y-2">
          <Label htmlFor="violations-weight">Reported Violations (Weighted)</Label>
          <Input
            id="violations-weight"
            type="number"
            value={numberReportedViolationsSeverityWeight}
            onChange={(e) => setNumberReportedViolationsSeverityWeight(e.target.value)}
            placeholder="Weighted score (0-10)"
            min="0"
            max="10"
            disabled={shouldDisableField(numberReportedViolationsSeverityWeight)}
          />
        </div>
      </div>
    </div>
  );
};