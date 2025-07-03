"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function OperationalReliabilitySection({
  onTimeDeliveryRate,
  setOnTimeDeliveryRate,
  productionYield,
  setProductionYield,
  serviceLevelAgreement,
  setServiceLevelAgreement,
  incidentResponseTime,
  setIncidentResponseTime
}: {
  onTimeDeliveryRate: string
  setOnTimeDeliveryRate: (value: string) => void
  productionYield: string
  setProductionYield: (value: string) => void
  serviceLevelAgreement: string
  setServiceLevelAgreement: (value: string) => void
  incidentResponseTime: string
  setIncidentResponseTime: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* On-Time Delivery */}
      <div className="space-y-2">
        <Label htmlFor="deliveryRate">On-Time Delivery Rate (%)</Label>
        <Input
          id="deliveryRate"
          type="number"
          min="0"
          max="100"
          value={onTimeDeliveryRate}
          onChange={(e) => setOnTimeDeliveryRate(e.target.value)}
          placeholder="Enter delivery rate"
        />
      </div>

      {/* Production Yield */}
      <div className="space-y-2">
        <Label htmlFor="yield">Production Yield (%)</Label>
        <Input
          id="yield"
          type="number"
          min="0"
          max="100"
          value={productionYield}
          onChange={(e) => setProductionYield(e.target.value)}
          placeholder="Enter yield percentage"
        />
      </div>

      {/* SLA Compliance */}
      <div className="space-y-2">
        <Label htmlFor="sla">SLA Compliance (%)</Label>
        <Input
          id="sla"
          type="number"
          min="0"
          max="100"
          value={serviceLevelAgreement}
          onChange={(e) => setServiceLevelAgreement(e.target.value)}
          placeholder="Enter SLA compliance"
        />
      </div>

      {/* Incident Response */}
      <div className="space-y-2">
        <Label htmlFor="responseTime">Avg. Incident Response (hours)</Label>
        <Input
          id="responseTime"
          type="number"
          value={incidentResponseTime}
          onChange={(e) => setIncidentResponseTime(e.target.value)}
          placeholder="Enter response time"
        />
      </div>
    </div>
  );
}