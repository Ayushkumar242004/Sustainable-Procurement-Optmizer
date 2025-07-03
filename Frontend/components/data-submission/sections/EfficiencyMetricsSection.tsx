"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EfficiencyMetricsSection({
  energyCostPerUnit,
  setEnergyCostPerUnit,
  materialUtilizationRate,
  setMaterialUtilizationRate,
  equipmentUtilizationRate,
  setEquipmentUtilizationRate,
  laborProductivity,
  setLaborProductivity,
  wasteReductionPercentage,
  setWasteReductionPercentage
}: {
  energyCostPerUnit: string
  setEnergyCostPerUnit: (value: string) => void
  materialUtilizationRate: string
  setMaterialUtilizationRate: (value: string) => void
  equipmentUtilizationRate: string
  setEquipmentUtilizationRate: (value: string) => void
  laborProductivity: string
  setLaborProductivity: (value: string) => void
  wasteReductionPercentage: string
  setWasteReductionPercentage: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Energy Cost */}
      <div className="space-y-2">
        <Label htmlFor="energyCost">Energy Cost/Unit (USD)</Label>
        <Input
          id="energyCost"
          type="number"
          value={energyCostPerUnit}
          onChange={(e) => setEnergyCostPerUnit(e.target.value)}
          placeholder="Enter cost per unit"
        />
      </div>

      {/* Material Utilization */}
      <div className="space-y-2">
        <Label htmlFor="materialUtilization">Material Utilization Rate (%)</Label>
        <Input
          id="materialUtilization"
          type="number"
          min="0"
          max="100"
          value={materialUtilizationRate}
          onChange={(e) => setMaterialUtilizationRate(e.target.value)}
          placeholder="Enter percentage"
        />
      </div>

      {/* Equipment Utilization */}
      <div className="space-y-2">
        <Label htmlFor="equipmentUtilization">Equipment Utilization Rate (%)</Label>
        <Input
          id="equipmentUtilization"
          type="number"
          min="0"
          max="100"
          value={equipmentUtilizationRate}
          onChange={(e) => setEquipmentUtilizationRate(e.target.value)}
          placeholder="Enter percentage"
        />
      </div>

      {/* Labor Productivity */}
      <div className="space-y-2">
        <Label htmlFor="laborProductivity">Labor Productivity (Units/Hour)</Label>
        <Input
          id="laborProductivity"
          type="number"
          value={laborProductivity}
          onChange={(e) => setLaborProductivity(e.target.value)}
          placeholder="Enter productivity rate"
        />
      </div>

      {/* Waste Reduction */}
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="wasteReduction">Waste Reduction (%)</Label>
        <Input
          id="wasteReduction"
          type="number"
          min="0"
          max="100"
          value={wasteReductionPercentage}
          onChange={(e) => setWasteReductionPercentage(e.target.value)}
          placeholder="Enter percentage reduction"
        />
      </div>
    </div>
  );
}