"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CostMetricsSection({
  productionCostPerUnit,
  setProductionCostPerUnit,
  logisticsCostPerUnit,
  setLogisticsCostPerUnit,
  overheadCostPercentage,
  setOverheadCostPercentage,
  employeeCostPercentage,
  setEmployeeCostPercentage
}: {
  productionCostPerUnit: string
  setProductionCostPerUnit: (value: string) => void
  logisticsCostPerUnit: string
  setLogisticsCostPerUnit: (value: string) => void
  overheadCostPercentage: string
  setOverheadCostPercentage: (value: string) => void
  employeeCostPercentage: string
  setEmployeeCostPercentage: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Production Cost */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="productionCost">Production Cost/Unit (USD)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><HelpCircle className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent>
                <p>Total production cost divided by units produced</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="productionCost"
          type="number"
          value={productionCostPerUnit}
          onChange={(e) => setProductionCostPerUnit(e.target.value)}
          placeholder="Enter cost per unit"
        />
      </div>

      {/* Logistics Cost */}
      <div className="space-y-2">
        <Label htmlFor="logisticsCost">Logistics Cost/Unit (USD)</Label>
        <Input
          id="logisticsCost"
          type="number"
          value={logisticsCostPerUnit}
          onChange={(e) => setLogisticsCostPerUnit(e.target.value)}
          placeholder="Enter cost per unit"
        />
      </div>

      {/* Overhead Cost */}
      <div className="space-y-2">
        <Label htmlFor="overheadCost">Overhead Cost (%)</Label>
        <Input
          id="overheadCost"
          type="number"
          min="0"
          max="100"
          value={overheadCostPercentage}
          onChange={(e) => setOverheadCostPercentage(e.target.value)}
          placeholder="Enter percentage"
        />
      </div>

      {/* Employee Cost */}
      <div className="space-y-2">
        <Label htmlFor="employeeCost">Employee Cost (%)</Label>
        <Input
          id="employeeCost"
          type="number"
          min="0"
          max="100"
          value={employeeCostPercentage}
          onChange={(e) => setEmployeeCostPercentage(e.target.value)}
          placeholder="Enter percentage"
        />
      </div>
    </div>
  );
}