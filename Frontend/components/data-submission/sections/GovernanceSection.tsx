import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const shouldDisableField = (fieldValue: string) => {
return !fieldValue;
}

interface GovernanceSectionProps {
  // Board Composition
  numberIndependentDirectors: string;
  setNumberIndependentDirectors: (value: string) => void;
  totalNumberDirectors: string;
  setTotalNumberDirectors: (value: string) => void;
  ceoPayRatio: string;
  setCeoPayRatio: (value: string) => void;
  
  // Audit Committee
  numberIndependentAuditCommitteeMembers: string;
  setNumberIndependentAuditCommitteeMembers: (value: string) => void;
  totalAuditCommitteeMembers: string;
  setTotalAuditCommitteeMembers: (value: string) => void;
  
  // Shareholder Policies
  numberShareholderFriendlyPoliciesImplemented: string;
  setNumberShareholderFriendlyPoliciesImplemented: (value: string) => void;
  totalNumberEvaluatedPolicies: string;
  setTotalNumberEvaluatedPolicies: (value: string) => void;
  
  // ESG Metrics
  numberDisclosedEsgMetrics: string;
  setNumberDisclosedEsgMetrics: (value: string) => void;
  totalNumberRelevantEsgMetrics: string;
  setTotalNumberRelevantEsgMetrics: (value: string) => void;
  
  // Compliance
  numberCorruptionIncidentsSeverityWeight: string;
  setNumberCorruptionIncidentsSeverityWeight: (value: string) => void;
  numberDisclosedTaxJurisdictions: string;
  setNumberDisclosedTaxJurisdictions: (value: string) => void;
  totalNumberOperatingJurisdictions: string;
  setTotalNumberOperatingJurisdictions: (value: string) => void;
}

export const GovernanceSection = ({
  numberIndependentDirectors,
  setNumberIndependentDirectors,
  totalNumberDirectors,
  setTotalNumberDirectors,
  ceoPayRatio,
  setCeoPayRatio,
  numberIndependentAuditCommitteeMembers,
  setNumberIndependentAuditCommitteeMembers,
  totalAuditCommitteeMembers,
  setTotalAuditCommitteeMembers,
  numberShareholderFriendlyPoliciesImplemented,
  setNumberShareholderFriendlyPoliciesImplemented,
  totalNumberEvaluatedPolicies,
  setTotalNumberEvaluatedPolicies,
  numberDisclosedEsgMetrics,
  setNumberDisclosedEsgMetrics,
  totalNumberRelevantEsgMetrics,
  setTotalNumberRelevantEsgMetrics,
  numberCorruptionIncidentsSeverityWeight,
  setNumberCorruptionIncidentsSeverityWeight,
  numberDisclosedTaxJurisdictions,
  setNumberDisclosedTaxJurisdictions,
  totalNumberOperatingJurisdictions,
  setTotalNumberOperatingJurisdictions,
}: GovernanceSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Governance Data</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Board Composition */}
        <div className="space-y-2">
          <Label htmlFor="independent-directors">Independent Directors</Label>
          <Input
            id="independent-directors"
            type="number"
            value={numberIndependentDirectors}
            onChange={(e) => setNumberIndependentDirectors(e.target.value)}
            placeholder="Number of independent directors"
            disabled={shouldDisableField(numberIndependentDirectors)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="total-directors">Total Directors</Label>
          <Input
            id="total-directors"
            type="number"
            value={totalNumberDirectors}
            onChange={(e) => setTotalNumberDirectors(e.target.value)}
            placeholder="Total board members"
            disabled={shouldDisableField(totalNumberDirectors)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ceo-pay-ratio">CEO Pay Ratio</Label>
          <Input
            id="ceo-pay-ratio"
            type="number"
            step="0.1"
            value={ceoPayRatio}
            onChange={(e) => setCeoPayRatio(e.target.value)}
            placeholder="CEO to median worker pay ratio"
            disabled={shouldDisableField(ceoPayRatio)}
          />
        </div>

        {/* Audit Committee */}
        <div className="space-y-2">
          <Label htmlFor="independent-auditors">Independent Audit Members</Label>
          <Input
            id="independent-auditors"
            type="number"
            value={numberIndependentAuditCommitteeMembers}
            onChange={(e) => setNumberIndependentAuditCommitteeMembers(e.target.value)}
            placeholder="Number of independent members"
            disabled={shouldDisableField(numberIndependentAuditCommitteeMembers)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="total-auditors">Total Audit Committee Members</Label>
          <Input
            id="total-auditors"
            type="number"
            value={totalAuditCommitteeMembers}
            onChange={(e) => setTotalAuditCommitteeMembers(e.target.value)}
            placeholder="Total committee members"
            disabled={shouldDisableField(totalAuditCommitteeMembers)}
          />
        </div>

        {/* Shareholder Policies */}
        <div className="space-y-2">
          <Label htmlFor="friendly-policies">Shareholder-Friendly Policies</Label>
          <Input
            id="friendly-policies"
            type="number"
            value={numberShareholderFriendlyPoliciesImplemented}
            onChange={(e) => setNumberShareholderFriendlyPoliciesImplemented(e.target.value)}
            placeholder="Number of implemented policies"
            disabled={shouldDisableField(numberShareholderFriendlyPoliciesImplemented)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="evaluated-policies">Total Evaluated Policies</Label>
          <Input
            id="evaluated-policies"
            type="number"
            value={totalNumberEvaluatedPolicies}
            onChange={(e) => setTotalNumberEvaluatedPolicies(e.target.value)}
            placeholder="Total policies evaluated"
            disabled={shouldDisableField(totalNumberEvaluatedPolicies)}
          />
        </div>

        {/* ESG Metrics */}
        <div className="space-y-2">
          <Label htmlFor="disclosed-metrics">Disclosed ESG Metrics</Label>
          <Input
            id="disclosed-metrics"
            type="number"
            value={numberDisclosedEsgMetrics}
            onChange={(e) => setNumberDisclosedEsgMetrics(e.target.value)}
            placeholder="Number of disclosed metrics"
            disabled={shouldDisableField(numberDisclosedEsgMetrics)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="relevant-metrics">Total Relevant ESG Metrics</Label>
          <Input
            id="relevant-metrics"
            type="number"
            value={totalNumberRelevantEsgMetrics}
            onChange={(e) => setTotalNumberRelevantEsgMetrics(e.target.value)}
            placeholder="Total applicable metrics"
            disabled={shouldDisableField(totalNumberRelevantEsgMetrics)}
          />
        </div>

        {/* Compliance */}
        <div className="space-y-2">
          <Label htmlFor="corruption-incidents">Corruption Incidents (Weighted)</Label>
          <Input
            id="corruption-incidents"
            type="number"
            value={numberCorruptionIncidentsSeverityWeight}
            onChange={(e) => setNumberCorruptionIncidentsSeverityWeight(e.target.value)}
            placeholder="Weighted score (0-10)"
            min="0"
            max="10"
            disabled={shouldDisableField(numberCorruptionIncidentsSeverityWeight)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="disclosed-jurisdictions">Disclosed Tax Jurisdictions</Label>
          <Input
            id="disclosed-jurisdictions"
            type="number"
            value={numberDisclosedTaxJurisdictions}
            onChange={(e) => setNumberDisclosedTaxJurisdictions(e.target.value)}
            placeholder="Number of disclosed jurisdictions"
            disabled={shouldDisableField(numberDisclosedTaxJurisdictions)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="operating-jurisdictions">Total Operating Jurisdictions</Label>
          <Input
            id="operating-jurisdictions"
            type="number"
            value={totalNumberOperatingJurisdictions}
            onChange={(e) => setTotalNumberOperatingJurisdictions(e.target.value)}
            placeholder="Total jurisdictions operated in"
            disabled={shouldDisableField(totalNumberOperatingJurisdictions)}
          />
        </div>
      </div>
    </div>
  );
};