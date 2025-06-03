"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, AlertTriangle, Lightbulb, Star, TrendingUp, MapPin } from "lucide-react"

const suppliers = [
  {
    id: 1,
    name: "GreenTech Solutions",
    esgScore: 92,
    location: "Germany",
    category: "Technology",
    environmental: 95,
    social: 88,
    governance: 93,
    risks: ["None"],
    improvements: ["Enhance diversity reporting", "Expand renewable energy usage"],
    certifications: ["ISO 14001", "B-Corp"],
  },
  {
    id: 2,
    name: "EcoManufacturing Co",
    esgScore: 87,
    location: "Netherlands",
    category: "Manufacturing",
    environmental: 90,
    social: 85,
    governance: 86,
    risks: ["Minor compliance gaps"],
    improvements: ["Improve supply chain transparency", "Strengthen governance policies"],
    certifications: ["ISO 14001", "OHSAS 18001"],
  },
  {
    id: 3,
    name: "SustainableParts Inc",
    esgScore: 78,
    location: "USA",
    category: "Components",
    environmental: 82,
    social: 75,
    governance: 77,
    risks: ["Labor practice concerns", "Environmental violations"],
    improvements: ["Implement fair labor practices", "Reduce carbon emissions", "Enhance board diversity"],
    certifications: ["ISO 9001"],
  },
  {
    id: 4,
    name: "CleanEnergy Corp",
    esgScore: 85,
    location: "Denmark",
    category: "Energy",
    environmental: 92,
    social: 80,
    governance: 83,
    risks: ["Governance transparency"],
    improvements: ["Improve stakeholder engagement", "Enhance reporting standards"],
    certifications: ["ISO 14001", "ISO 50001"],
  },
]

const suggestedSuppliers = [
  {
    name: "NextGen Sustainable",
    esgScore: 94,
    location: "Sweden",
    category: "Technology",
    reason: "Higher ESG score with excellent environmental practices",
  },
  {
    name: "EthicalSource Ltd",
    esgScore: 91,
    location: "Canada",
    category: "Manufacturing",
    reason: "Strong social governance and fair trade practices",
  },
]

function getScoreColor(score: number) {
  if (score >= 90) return "bg-green-500"
  if (score >= 80) return "bg-yellow-500"
  if (score >= 70) return "bg-orange-500"
  return "bg-red-500"
}

function getScoreBadgeVariant(score: number) {
  if (score >= 90) return "default"
  if (score >= 80) return "secondary"
  if (score >= 70) return "outline"
  return "destructive"
}

export default function SupplierRanking() {
  const [expandedSupplier, setExpandedSupplier] = useState<number | null>(null)

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Supplier Ranking & Recommendations
        </h1>
        <p className="text-xl text-muted-foreground">Suppliers ranked by ESG performance with actionable insights</p>
      </div>

      {/* Current Suppliers Ranking */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Current Supplier Rankings</h2>
        <div className="space-y-4">
          {suppliers.map((supplier, index) => (
            <Card key={supplier.id} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                      <div>
                        <CardTitle className="text-xl">{supplier.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {supplier.location} • {supplier.category}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={getScoreBadgeVariant(supplier.esgScore)} className="text-lg px-3 py-1">
                      {supplier.esgScore}/100
                    </Badge>
                    <div className="flex space-x-1">
                      {supplier.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* ESG Breakdown */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Environmental</span>
                        <span className="text-sm">{supplier.environmental}%</span>
                      </div>
                      <Progress value={supplier.environmental} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Social</span>
                        <span className="text-sm">{supplier.social}%</span>
                      </div>
                      <Progress value={supplier.social} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Governance</span>
                        <span className="text-sm">{supplier.governance}%</span>
                      </div>
                      <Progress value={supplier.governance} className="h-2" />
                    </div>
                  </div>

                  {/* Risk Alerts */}
                  {supplier.risks.length > 0 && supplier.risks[0] !== "None" && (
                    <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800 dark:text-orange-200">
                        <strong>Risk Alerts:</strong> {supplier.risks.join(", ")}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Expandable Improvements */}
                  <Collapsible
                    open={expandedSupplier === supplier.id}
                    onOpenChange={() => setExpandedSupplier(expandedSupplier === supplier.id ? null : supplier.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between">
                        <span className="flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          View Improvement Suggestions
                        </span>
                        {expandedSupplier === supplier.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {supplier.improvements.map((improvement, i) => (
                        <div key={i} className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
                          <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{improvement}</span>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Better Suppliers */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Star className="h-6 w-6 mr-2 text-yellow-500" />
          Suggested Better Suppliers
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {suggestedSuppliers.map((supplier, index) => (
            <Card
              key={index}
              className="border-green-200 bg-green-50 dark:bg-green-950/20 transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-green-800 dark:text-green-200">{supplier.name}</CardTitle>
                    <CardDescription className="text-green-600 dark:text-green-300">
                      {supplier.location} • {supplier.category}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-600 text-white">{supplier.esgScore}/100</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 dark:text-green-300 mb-4">{supplier.reason}</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">Request Information</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
