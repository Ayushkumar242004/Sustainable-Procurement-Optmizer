"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Upload, CheckCircle, ArrowRight, ArrowLeft, Leaf, Users, Shield, Factory, Award } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

const steps = [
  { id: 1, title: "Company Information", icon: Factory, description: "Basic company details" },
  { id: 2, title: "Environmental Data", icon: Leaf, description: "Carbon footprint & environmental policies" },
  { id: 3, title: "Social Responsibility", icon: Users, description: "Labor practices & community impact" },
  { id: 4, title: "Governance", icon: Shield, description: "Corporate governance & compliance" },
  { id: 5, title: "Certifications", icon: Award, description: "ISO certifications & standards" },
  { id: 6, title: "Review & Submit", icon: CheckCircle, description: "Final review of all data" },
]

const certifications = [
  "ISO 14001 (Environmental Management)",
  "ISO 45001 (Occupational Health & Safety)",
  "ISO 9001 (Quality Management)",
  "ISO 50001 (Energy Management)",
  "B-Corp Certification",
  "Fair Trade Certified",
  "OHSAS 18001",
  "SA8000 (Social Accountability)",
]

export default function DataSubmissionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    industry: "",
    location: "",
    employeeCount: "",
    annualRevenue: "",

    // Environmental
    carbonEmissions: "",
    renewableEnergy: false,
    wasteReduction: "",
    waterUsage: "",
    environmentalPolicy: null,

    // Social
    diversityPolicy: false,
    laborStandards: "",
    communityPrograms: "",
    employeeSafety: "",
    socialPolicy: null,

    // Governance
    boardIndependence: "",
    ethicsPolicy: null,
    transparencyReporting: false,
    riskManagement: "",

    // Certifications
    selectedCertifications: [],
    certificationDocs: [],
  })

  const [uploadedFiles, setUploadedFiles] = useState({})
  const { toast } = useToast()

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: file }))
    updateFormData(field, file)
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been uploaded.`,
    })
  }

  const calculateProgress = () => {
    const totalFields = 20
    const filledFields = Object.values(formData).filter(
      (value) => value !== "" && value !== null && value !== false && (Array.isArray(value) ? value.length > 0 : true),
    ).length
    return Math.round((filledFields / totalFields) * 100)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    toast({
      title: "Data submitted successfully!",
      description: "Your ESG data has been submitted for review. You'll receive confirmation within 24 hours.",
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  placeholder="Enter company name"
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                  <SelectTrigger className="transition-all duration-300 hover:shadow-md">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                  placeholder="City, Country"
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Select
                  value={formData.employeeCount}
                  onValueChange={(value) => updateFormData("employeeCount", value)}
                >
                  <SelectTrigger className="transition-all duration-300 hover:shadow-md">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-1000">201-1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRevenue">Annual Revenue (USD)</Label>
              <Select value={formData.annualRevenue} onValueChange={(value) => updateFormData("annualRevenue", value)}>
                <SelectTrigger className="transition-all duration-300 hover:shadow-md">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1M">Less than $1M</SelectItem>
                  <SelectItem value="1M-10M">$1M - $10M</SelectItem>
                  <SelectItem value="10M-100M">$10M - $100M</SelectItem>
                  <SelectItem value="100M+">$100M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carbonEmissions">Annual Carbon Emissions (tCO2e)</Label>
                <Input
                  id="carbonEmissions"
                  value={formData.carbonEmissions}
                  onChange={(e) => updateFormData("carbonEmissions", e.target.value)}
                  placeholder="Enter emissions data"
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wasteReduction">Waste Reduction (%)</Label>
                <Input
                  id="wasteReduction"
                  value={formData.wasteReduction}
                  onChange={(e) => updateFormData("wasteReduction", e.target.value)}
                  placeholder="Percentage reduction"
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="waterUsage">Water Usage (cubic meters/year)</Label>
              <Input
                id="waterUsage"
                value={formData.waterUsage}
                onChange={(e) => updateFormData("waterUsage", e.target.value)}
                placeholder="Annual water consumption"
                className="transition-all duration-300 focus:scale-105"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="renewableEnergy"
                checked={formData.renewableEnergy}
                onCheckedChange={(checked) => updateFormData("renewableEnergy", checked)}
                className="transition-all duration-300"
              />
              <Label htmlFor="renewableEnergy">Uses 100% renewable energy</Label>
            </div>

            <div className="space-y-2">
              <Label>Environmental Policy Document</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-float" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your environmental policy document here, or click to browse
                </p>
                <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="laborStandards">Labor Standards Compliance</Label>
                <Select
                  value={formData.laborStandards}
                  onValueChange={(value) => updateFormData("laborStandards", value)}
                >
                  <SelectTrigger className="transition-all duration-300 hover:shadow-md">
                    <SelectValue placeholder="Select compliance level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Compliance</SelectItem>
                    <SelectItem value="partial">Partial Compliance</SelectItem>
                    <SelectItem value="developing">Developing Standards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeSafety">Employee Safety Score (0-100)</Label>
                <Input
                  id="employeeSafety"
                  value={formData.employeeSafety}
                  onChange={(e) => updateFormData("employeeSafety", e.target.value)}
                  placeholder="Safety performance score"
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="communityPrograms">Community Programs Description</Label>
              <Textarea
                id="communityPrograms"
                value={formData.communityPrograms}
                onChange={(e) => updateFormData("communityPrograms", e.target.value)}
                placeholder="Describe your community involvement programs"
                rows={3}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="diversityPolicy"
                checked={formData.diversityPolicy}
                onCheckedChange={(checked) => updateFormData("diversityPolicy", checked)}
                className="transition-all duration-300"
              />
              <Label htmlFor="diversityPolicy">Has formal diversity and inclusion policy</Label>
            </div>

            <div className="space-y-2">
              <Label>Social Responsibility Policy</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-float" />
                <p className="text-sm text-muted-foreground mb-2">Upload your social responsibility policy document</p>
                <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="boardIndependence">Board Independence (%)</Label>
                <Input
                  id="boardIndependence"
                  value={formData.boardIndependence}
                  onChange={(e) => updateFormData("boardIndependence", e.target.value)}
                  placeholder="Percentage of independent board members"
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskManagement">Risk Management Framework</Label>
                <Select
                  value={formData.riskManagement}
                  onValueChange={(value) => updateFormData("riskManagement", value)}
                >
                  <SelectTrigger className="transition-all duration-300 hover:shadow-md">
                    <SelectValue placeholder="Select framework maturity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="developing">Developing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="transparencyReporting"
                checked={formData.transparencyReporting}
                onCheckedChange={(checked) => updateFormData("transparencyReporting", checked)}
                className="transition-all duration-300"
              />
              <Label htmlFor="transparencyReporting">Publishes annual transparency reports</Label>
            </div>

            <div className="space-y-2">
              <Label>Ethics & Compliance Policy</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-float" />
                <p className="text-sm text-muted-foreground mb-2">Upload your ethics and compliance policy document</p>
                <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <Label>Select Your Certifications</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 transition-all duration-300 hover:scale-105">
                    <input
                      type="checkbox"
                      id={`cert-${index}`}
                      checked={formData.selectedCertifications.includes(cert)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData("selectedCertifications", [...formData.selectedCertifications, cert])
                        } else {
                          updateFormData(
                            "selectedCertifications",
                            formData.selectedCertifications.filter((c) => c !== cert),
                          )
                        }
                      }}
                      className="rounded border-gray-300 transition-all duration-300"
                    />
                    <Label htmlFor={`cert-${index}`} className="text-sm">
                      {cert}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Certification Documents</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-float" />
                <p className="text-sm text-muted-foreground mb-2">Upload certification documents (PDF, JPG, PNG)</p>
                <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
                  Choose Files
                </Button>
              </div>
            </div>

            {formData.selectedCertifications.length > 0 && (
              <div className="space-y-2 animate-fade-in">
                <Label>Selected Certifications</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedCertifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="transition-all duration-300 hover:scale-105">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 6:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-2xl font-bold mb-2">Review Your Submission</h3>
              <p className="text-muted-foreground">
                Please review all the information below before submitting your ESG data.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Factory className="h-5 w-5 mr-2" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <strong>Company:</strong> {formData.companyName || "Not provided"}
                  </div>
                  <div>
                    <strong>Industry:</strong> {formData.industry || "Not provided"}
                  </div>
                  <div>
                    <strong>Location:</strong> {formData.location || "Not provided"}
                  </div>
                  <div>
                    <strong>Employees:</strong> {formData.employeeCount || "Not provided"}
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Environmental Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <strong>Carbon Emissions:</strong> {formData.carbonEmissions || "Not provided"} tCO2e
                  </div>
                  <div>
                    <strong>Renewable Energy:</strong> {formData.renewableEnergy ? "Yes" : "No"}
                  </div>
                  <div>
                    <strong>Waste Reduction:</strong> {formData.wasteReduction || "Not provided"}%
                  </div>
                  <div>
                    <strong>Water Usage:</strong> {formData.waterUsage || "Not provided"} m³/year
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Social Responsibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <strong>Labor Standards:</strong> {formData.laborStandards || "Not provided"}
                  </div>
                  <div>
                    <strong>Safety Score:</strong> {formData.employeeSafety || "Not provided"}
                  </div>
                  <div>
                    <strong>Diversity Policy:</strong> {formData.diversityPolicy ? "Yes" : "No"}
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Governance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <strong>Board Independence:</strong> {formData.boardIndependence || "Not provided"}%
                  </div>
                  <div>
                    <strong>Risk Management:</strong> {formData.riskManagement || "Not provided"}
                  </div>
                  <div>
                    <strong>Transparency Reporting:</strong> {formData.transparencyReporting ? "Yes" : "No"}
                  </div>
                </CardContent>
              </Card>
            </div>

            {formData.selectedCertifications.length > 0 && (
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedCertifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="transition-all duration-300 hover:scale-105">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="relative pt-16 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold font-heading mb-4">
            ESG Data <span className="gradient-text">Submission Portal</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Submit your sustainability data for comprehensive ESG evaluation
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Submission Progress</span>
            <span className="text-sm text-muted-foreground">{calculateProgress()}% Complete</span>
          </div>
          <Progress value={calculateProgress()} className="h-2 transition-all duration-500" />
        </div>

        {/* Step Indicator */}
        <div className="mb-8 animate-slide-up">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex flex-col items-center space-y-2 transition-all duration-300">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-600 text-white scale-110"
                        : isActive
                          ? "bg-primary text-white scale-110 animate-pulse-slow"
                          : "bg-muted text-muted-foreground hover:scale-105"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-sm font-medium transition-all duration-300 ${isActive ? "text-primary scale-105" : "text-muted-foreground"}`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground hidden md:block">{step.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card className="max-w-4xl mx-auto transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              {React.createElement(steps[currentStep - 1].icon, {
                className: "h-6 w-6 mr-3 text-primary animate-float",
              })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto animate-slide-up">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep === steps.length ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 flex items-center transition-all duration-300 hover:scale-105"
            >
              Submit Data
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={nextStep} className="flex items-center transition-all duration-300 hover:scale-105">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
      <Chatbot />
    </div>
  )
}
