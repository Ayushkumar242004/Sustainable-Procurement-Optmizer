"use client"
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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, CheckCircle, Leaf, Users, Shield, Factory, Award, FileText } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

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

    // Social
    diversityPolicy: false,
    laborStandards: "",
    communityPrograms: "",
    employeeSafety: "",

    // Governance
    boardIndependence: "",
    transparencyReporting: false,
    riskManagement: "",

    // Certifications
    selectedCertifications: [],
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    esgDocument: null,
    certificationFiles: {},
  })

  const { toast } = useToast()

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: file }))
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been uploaded.`,
    })
  }

  const handleCertificationFileUpload = (certification: string, file: File) => {
    setUploadedFiles((prev) => ({
      ...prev,
      certificationFiles: { ...prev.certificationFiles, [certification]: file },
    }))
    toast({
      title: "Certification file uploaded",
      description: `${file.name} uploaded for ${certification}.`,
    })
  }

  const calculateProgress = () => {
    const totalFields = 20
    const filledFields = Object.values(formData).filter(
      (value) => value !== "" && value !== null && value !== false && (Array.isArray(value) ? value.length > 0 : true),
    ).length
    return Math.round((filledFields / totalFields) * 100)
  }

  const handleSubmit = () => {
    toast({
      title: "Data submitted successfully!",
      description: "Your ESG data has been submitted for review. You'll receive confirmation within 24 hours.",
    })
  }

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-4">
            ESG Data <span className="gradient-text">Submission Portal</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">
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

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Company Information */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl flex items-center">
                <Factory className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary animate-float" />
                Company Information
              </CardTitle>
              <CardDescription>Basic company details and profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">Annual Revenue (USD)</Label>
                  <Select
                    value={formData.annualRevenue}
                    onValueChange={(value) => updateFormData("annualRevenue", value)}
                  >
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
            </CardContent>
          </Card>

          {/* Environmental Data */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl flex items-center">
                <Leaf className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary animate-float" />
                Environmental Data
              </CardTitle>
              <CardDescription>Carbon footprint and environmental policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </CardContent>
          </Card>

          {/* Social Responsibility */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl flex items-center">
                <Users className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary animate-float" />
                Social Responsibility
              </CardTitle>
              <CardDescription>Labor practices and community impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
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
            </CardContent>
          </Card>

          {/* Governance */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl flex items-center">
                <Shield className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary animate-float" />
                Governance
              </CardTitle>
              <CardDescription>Corporate governance and compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
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
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl flex items-center">
                <Award className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary animate-float" />
                Certifications
              </CardTitle>
              <CardDescription>ISO certifications and standards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Select Your Certifications</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
                    >
                      <Checkbox
                        id={`cert-${index}`}
                        checked={formData.selectedCertifications.includes(cert)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("selectedCertifications", [...formData.selectedCertifications, cert])
                          } else {
                            updateFormData(
                              "selectedCertifications",
                              formData.selectedCertifications.filter((c) => c !== cert),
                            )
                          }
                        }}
                        className="transition-all duration-300"
                      />
                      <Label htmlFor={`cert-${index}`} className="text-sm">
                        {cert}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Certification Upload Sections */}
              {formData.selectedCertifications.length > 0 && (
                <div className="space-y-4 animate-fade-in">
                  <Label>Upload Certification Documents</Label>
                  {formData.selectedCertifications.map((cert, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <h4 className="font-medium text-sm">{cert}</h4>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Upload document for {cert}</p>
                        <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleCertificationFileUpload(cert, file)
                          }}
                          className="hidden"
                          id={`cert-upload-${index}`}
                          accept=".pdf,.jpg,.png,.docx"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`cert-upload-${index}`)?.click()}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          Choose File
                        </Button>
                        {uploadedFiles.certificationFiles[cert] && (
                          <p className="text-xs text-green-600 mt-2">✓ {uploadedFiles.certificationFiles[cert].name}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

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
            </CardContent>
          </Card>

          {/* ESG Document Upload */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl flex items-center">
                <FileText className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-primary animate-float" />
                ESG Document
              </CardTitle>
              <CardDescription>Upload your comprehensive ESG documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-float" />
                <p className="text-lg font-medium mb-2">Upload ESG Document</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your comprehensive ESG policy, sustainability report, or related documentation
                </p>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload("esgDocument", file)
                  }}
                  className="hidden"
                  id="esg-document-upload"
                  accept=".pdf,.docx,.xlsx"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("esg-document-upload")?.click()}
                  className="transition-all duration-300 hover:scale-105"
                >
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, Word, Excel (Max 10MB)</p>
                {uploadedFiles.esgDocument && (
                  <p className="text-sm text-green-600 mt-2">✓ {uploadedFiles.esgDocument.name}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center animate-slide-up">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 flex items-center transition-all duration-300 hover:scale-105 px-8 py-3 text-lg"
            >
              Submit ESG Data
              <CheckCircle className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  )
}
