import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const shouldDisableField = (fieldValue: string) => {
  return !fieldValue;
};

interface EnvironmentSectionProps {
  companyGhgEmissionsPerUnitRevenue: string;
  setCompanyGhgEmissionsPerUnitRevenue: (value: string) => void;

  companyEnergyConsumptionPerUnitOutput: string;
  setCompanyEnergyConsumptionPerUnitOutput: (value: string) => void;
  renewableEnergyConsumption: string;
  setRenewableEnergyConsumption: (value: string) => void;
  totalEnergyConsumption: string;
  setTotalEnergyConsumption: (value: string) => void;

  companyWaterWithdrawalPerUnitOutput: string;
  setCompanyWaterWithdrawalPerUnitOutput: (value: string) => void;

  amountWasteRecycled: string;
  setAmountWasteRecycled: (value: string) => void;
  totalWasteGenerated: string;
  setTotalWasteGenerated: (value: string) => void;

  environmentalFinesPenaltyWeight: string;
  setEnvironmentalFinesPenaltyWeight: (value: string) => void;
  biodiversityImpactScore: string;
  setBiodiversityImpactScore: (value: string) => void;
  climateRiskMitigationMeasuresImplemented: string;
  setClimateRiskMitigationMeasuresImplemented: (value: string) => void;
  totalApplicableMeasures: string;
  setTotalApplicableMeasures: (value: string) => void;
}

export const EnvironmentSection = ({
  companyGhgEmissionsPerUnitRevenue,
  setCompanyGhgEmissionsPerUnitRevenue,
  companyEnergyConsumptionPerUnitOutput,
  setCompanyEnergyConsumptionPerUnitOutput,
  renewableEnergyConsumption,
  setRenewableEnergyConsumption,
  totalEnergyConsumption,
  setTotalEnergyConsumption,
  companyWaterWithdrawalPerUnitOutput,
  setCompanyWaterWithdrawalPerUnitOutput,
  amountWasteRecycled,
  setAmountWasteRecycled,
  totalWasteGenerated,
  setTotalWasteGenerated,
  environmentalFinesPenaltyWeight,
  setEnvironmentalFinesPenaltyWeight,
  biodiversityImpactScore,
  setBiodiversityImpactScore,
  climateRiskMitigationMeasuresImplemented,
  setClimateRiskMitigationMeasuresImplemented,
  totalApplicableMeasures,
  setTotalApplicableMeasures,
}: EnvironmentSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Environmental Data</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ghg-emissions">GHG Emissions/Revenue</Label>
          <Input
            id="ghg-emissions"
            type="number"
            step="0.01"
            value={companyGhgEmissionsPerUnitRevenue}
            onChange={(e) => setCompanyGhgEmissionsPerUnitRevenue(e.target.value)}
            placeholder="Metric tons CO2e per $ revenue"
            disabled={shouldDisableField(companyGhgEmissionsPerUnitRevenue)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="energy-consumption">Energy Consumption/Output</Label>
          <Input
            id="energy-consumption"
            type="number"
            step="0.01"
            value={companyEnergyConsumptionPerUnitOutput}
            onChange={(e) => setCompanyEnergyConsumptionPerUnitOutput(e.target.value)}
            placeholder="kWh per unit output"
            disabled={shouldDisableField(companyEnergyConsumptionPerUnitOutput)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="water-withdrawal">Water Withdrawal/Output</Label>
          <Input
            id="water-withdrawal"
            type="number"
            step="0.01"
            value={companyWaterWithdrawalPerUnitOutput}
            onChange={(e) => setCompanyWaterWithdrawalPerUnitOutput(e.target.value)}
            placeholder="Cubic meters per unit output"
            disabled={shouldDisableField(companyWaterWithdrawalPerUnitOutput)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="waste-recycled">Waste Recycled (tons)</Label>
          <Input
            id="waste-recycled"
            type="number"
            step="0.01"
            value={amountWasteRecycled}
            onChange={(e) => setAmountWasteRecycled(e.target.value)}
            placeholder="Metric tons recycled"
            disabled={shouldDisableField(amountWasteRecycled)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="total-waste">Total Waste Generated (tons)</Label>
          <Input
            id="total-waste"
            type="number"
            step="0.01"
            value={totalWasteGenerated}
            onChange={(e) => setTotalWasteGenerated(e.target.value)}
            placeholder="Metric tons total waste"
            disabled={shouldDisableField(totalWasteGenerated)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="renewable-energy">Renewable Energy (MWh)</Label>
          <Input
            id="renewable-energy"
            type="number"
            step="0.01"
            value={renewableEnergyConsumption}
            onChange={(e) => setRenewableEnergyConsumption(e.target.value)}
            placeholder="MWh from renewables"
            disabled={shouldDisableField(renewableEnergyConsumption)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="total-energy">Total Energy (MWh)</Label>
          <Input
            id="total-energy"
            type="number"
            step="0.01"
            value={totalEnergyConsumption}
            onChange={(e) => setTotalEnergyConsumption(e.target.value)}
            placeholder="Total MWh consumed"
            disabled={shouldDisableField(totalEnergyConsumption)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fines-penalty">Environmental Fines (0-10)</Label>
          <Input
            id="fines-penalty"
            type="number"
            value={environmentalFinesPenaltyWeight}
            onChange={(e) => setEnvironmentalFinesPenaltyWeight(e.target.value)}
            min="0"
            max="10"
            placeholder="Weighted score"
            disabled={shouldDisableField(environmentalFinesPenaltyWeight)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="biodiversity">Biodiversity Impact (0-10)</Label>
          <Input
            id="biodiversity"
            type="number"
            step="0.1"
            value={biodiversityImpactScore}
            onChange={(e) => setBiodiversityImpactScore(e.target.value)}
            min="0"
            max="10"
            placeholder="Impact score"
            disabled={shouldDisableField(biodiversityImpactScore)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="measures-implemented">Climate Measures Implemented</Label>
          <Input
            id="measures-implemented"
            type="number"
            value={climateRiskMitigationMeasuresImplemented}
            onChange={(e) => setClimateRiskMitigationMeasuresImplemented(e.target.value)}
            placeholder="Number of measures"
            disabled={shouldDisableField(climateRiskMitigationMeasuresImplemented)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="total-measures">Total Applicable Measures</Label>
          <Input
            id="total-measures"
            type="number"
            value={totalApplicableMeasures}
            onChange={(e) => setTotalApplicableMeasures(e.target.value)}
            placeholder="Total possible measures"
            disabled={shouldDisableField(totalApplicableMeasures)}
          />
        </div>
      </div>
    </div>
  );
};
