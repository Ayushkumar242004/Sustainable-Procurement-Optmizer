"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SystemReliabilitySection({
  uptimePercentage,
  setUptimePercentage,
  meanTimeBetweenFailures,
  setMeanTimeBetweenFailures,
  meanTimeToRepair,
  setMeanTimeToRepair,
  criticalFailureRate,
  setCriticalFailureRate
}: {
  uptimePercentage: string
  setUptimePercentage: (value: string) => void
  meanTimeBetweenFailures: string
  setMeanTimeBetweenFailures: (value: string) => void
  meanTimeToRepair: string
  setMeanTimeToRepair: (value: string) => void
  criticalFailureRate: string
  setCriticalFailureRate: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Uptime Percentage */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="uptime">System Uptime (%)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><HelpCircle className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent>
                <p>Percentage of time systems are operational</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="uptime"
          type="number"
          min="0"
          max="100"
          value={uptimePercentage}
          onChange={(e) => setUptimePercentage(e.target.value)}
          placeholder="Enter uptime percentage"
        />
      </div>

      {/* MTBF */}
      <div className="space-y-2">
        <Label htmlFor="mtbf">Mean Time Between Failures (hours)</Label>
        <Input
          id="mtbf"
          type="number"
          value={meanTimeBetweenFailures}
          onChange={(e) => setMeanTimeBetweenFailures(e.target.value)}
          placeholder="Enter MTBF"
        />
      </div>

      {/* MTTR */}
      <div className="space-y-2">
        <Label htmlFor="mttr">Mean Time To Repair (hours)</Label>
        <Input
          id="mttr"
          type="number"
          value={meanTimeToRepair}
          onChange={(e) => setMeanTimeToRepair(e.target.value)}
          placeholder="Enter MTTR"
        />
      </div>

      {/* Critical Failure Rate */}
      <div className="space-y-2">
        <Label htmlFor="failureRate">Critical Failure Rate (%)</Label>
        <Input
          id="failureRate"
          type="number"
          min="0"
          max="100"
          value={criticalFailureRate}
          onChange={(e) => setCriticalFailureRate(e.target.value)}
          placeholder="Enter failure rate"
        />
      </div>
    </div>
  );
}