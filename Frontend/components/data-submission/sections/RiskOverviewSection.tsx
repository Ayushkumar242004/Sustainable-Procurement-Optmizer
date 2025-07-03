"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RiskOverviewSection({
  financialRiskScore,
  setFinancialRiskScore,
  operationalRiskScore,
  setOperationalRiskScore,
  complianceRiskScore,
  setComplianceRiskScore,
  reputationRiskScore,
  setReputationRiskScore,
  cyberRiskScore,
  setCyberRiskScore,
  supplyChainRiskScore,
  setSupplyChainRiskScore
}: {
  financialRiskScore: string
  setFinancialRiskScore: (value: string) => void
  operationalRiskScore: string
  setOperationalRiskScore: (value: string) => void
  complianceRiskScore: string
  setComplianceRiskScore: (value: string) => void
  reputationRiskScore: string
  setReputationRiskScore: (value: string) => void
  cyberRiskScore: string
  setCyberRiskScore: (value: string) => void
  supplyChainRiskScore: string
  setSupplyChainRiskScore: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Financial Risk */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="financialRisk">Financial Risk Score</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><HelpCircle className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent>
                <p>Score from 1-100 based on financial stability metrics</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="financialRisk"
          type="number"
          min="1"
          max="100"
          value={financialRiskScore}
          onChange={(e) => setFinancialRiskScore(e.target.value)}
          placeholder="Enter score (1-100)"
        />
      </div>

      {/* Operational Risk */}
      <div className="space-y-2">
        <Label htmlFor="operationalRisk">Operational Risk Score</Label>
        <Input
          id="operationalRisk"
          type="number"
          min="1"
          max="100"
          value={operationalRiskScore}
          onChange={(e) => setOperationalRiskScore(e.target.value)}
          placeholder="Enter score (1-100)"
        />
      </div>

      {/* Compliance Risk */}
      <div className="space-y-2">
        <Label htmlFor="complianceRisk">Compliance Risk Score</Label>
        <Input
          id="complianceRisk"
          type="number"
          min="1"
          max="100"
          value={complianceRiskScore}
          onChange={(e) => setComplianceRiskScore(e.target.value)}
          placeholder="Enter score (1-100)"
        />
      </div>

      {/* Reputation Risk */}
      <div className="space-y-2">
        <Label htmlFor="reputationRisk">Reputation Risk Score</Label>
        <Input
          id="reputationRisk"
          type="number"
          min="1"
          max="100"
          value={reputationRiskScore}
          onChange={(e) => setReputationRiskScore(e.target.value)}
          placeholder="Enter score (1-100)"
        />
      </div>

      {/* Cyber Risk */}
      <div className="space-y-2">
        <Label htmlFor="cyberRisk">Cyber Risk Score</Label>
        <Input
          id="cyberRisk"
          type="number"
          min="1"
          max="100"
          value={cyberRiskScore}
          onChange={(e) => setCyberRiskScore(e.target.value)}
          placeholder="Enter score (1-100)"
        />
      </div>

      {/* Supply Chain Risk */}
      <div className="space-y-2">
        <Label htmlFor="supplyChainRisk">Supply Chain Risk Score</Label>
        <Input
          id="supplyChainRisk"
          type="number"
          min="1"
          max="100"
          value={supplyChainRiskScore}
          onChange={(e) => setSupplyChainRiskScore(e.target.value)}
          placeholder="Enter score (1-100)"
        />
      </div>
    </div>
  );
}