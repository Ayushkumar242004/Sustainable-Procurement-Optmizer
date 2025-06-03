"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Search, Filter, MapPin, Calendar, FileText, Award, TrendingUp, ExternalLink } from "lucide-react"

const suppliers = [
  {
    id: 1,
    name: "GreenTech Solutions",
    location: "Berlin, Germany",
    category: "Technology",
    esgScore: 92,
    certifications: ["ISO 14001", "B-Corp", "OHSAS 18001"],
    joinDate: "2022-03-15",
    status: "Active",
    contact: "contact@greentech.de",
    website: "www.greentech-solutions.de",
  },
  {
    id: 2,
    name: "EcoManufacturing Co",
    location: "Amsterdam, Netherlands",
    category: "Manufacturing",
    esgScore: 87,
    certifications: ["ISO 14001", "OHSAS 18001"],
    joinDate: "2021-11-20",
    status: "Active",
    contact: "info@ecomanufacturing.nl",
    website: "www.ecomanufacturing.nl",
  },
  {
    id: 3,
    name: "SustainableParts Inc",
    location: "Austin, USA",
    category: "Components",
    esgScore: 78,
    certifications: ["ISO 9001"],
    joinDate: "2023-01-10",
    status: "Under Review",
    contact: "sales@sustainableparts.com",
    website: "www.sustainableparts.com",
  },
  {
    id: 4,
    name: "CleanEnergy Corp",
    location: "Copenhagen, Denmark",
    category: "Energy",
    esgScore: 85,
    certifications: ["ISO 14001", "ISO 50001"],
    joinDate: "2022-07-08",
    status: "Active",
    contact: "hello@cleanenergy.dk",
    website: "www.cleanenergy.dk",
  },
  {
    id: 5,
    name: "BudgetSupply Ltd",
    location: "Manchester, UK",
    category: "General Supplies",
    esgScore: 65,
    certifications: ["ISO 9001"],
    joinDate: "2023-05-22",
    status: "Active",
    contact: "orders@budgetsupply.co.uk",
    website: "www.budgetsupply.co.uk",
  },
]

const esgHistoryData = [
  { month: "Jan", score: 85 },
  { month: "Feb", score: 87 },
  { month: "Mar", score: 89 },
  { month: "Apr", score: 90 },
  { month: "May", score: 92 },
  { month: "Jun", score: 92 },
]

const documents = [
  { name: "ESG Policy 2024", type: "Policy", date: "2024-01-15", status: "Approved" },
  { name: "Carbon Footprint Report", type: "Report", date: "2024-02-20", status: "Under Review" },
  { name: "Labor Standards Certificate", type: "Certificate", date: "2024-03-10", status: "Approved" },
  { name: "Supply Chain Transparency", type: "Report", date: "2024-04-05", status: "Pending" },
]

function getScoreBadgeVariant(score: number) {
  if (score >= 90) return "default"
  if (score >= 80) return "secondary"
  if (score >= 70) return "outline"
  return "destructive"
}

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Active":
      return "default"
    case "Under Review":
      return "secondary"
    case "Pending":
      return "outline"
    default:
      return "destructive"
  }
}

export default function SupplierDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [scoreFilter, setScoreFilter] = useState("all")
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || supplier.category === categoryFilter
    const matchesScore =
      scoreFilter === "all" ||
      (scoreFilter === "high" && supplier.esgScore >= 85) ||
      (scoreFilter === "medium" && supplier.esgScore >= 70 && supplier.esgScore < 85) ||
      (scoreFilter === "low" && supplier.esgScore < 70)

    return matchesSearch && matchesCategory && matchesScore
  })

  const categories = [...new Set(suppliers.map((s) => s.category))]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Supplier Directory
        </h1>
        <p className="text-xl text-muted-foreground">Browse and manage your supplier network</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={scoreFilter} onValueChange={setScoreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ESG Score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scores</SelectItem>
                <SelectItem value="high">High (85+)</SelectItem>
                <SelectItem value="medium">Medium (70-84)</SelectItem>
                <SelectItem value="low">Low (&lt;70)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Results</Button>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Table */}
      <Card>
        <CardHeader>
          <CardTitle>Suppliers ({filteredSuppliers.length})</CardTitle>
          <CardDescription>Click on any supplier to view detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>ESG Score</TableHead>
                <TableHead>Certifications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">{supplier.contact}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{supplier.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>
                    <Badge variant={getScoreBadgeVariant(supplier.esgScore)}>{supplier.esgScore}/100</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {supplier.certifications.slice(0, 2).map((cert, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                      {supplier.certifications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{supplier.certifications.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(supplier.status)}>{supplier.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedSupplier(supplier)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <span>{supplier.name}</span>
                            <Badge variant={getScoreBadgeVariant(supplier.esgScore)}>
                              ESG: {supplier.esgScore}/100
                            </Badge>
                          </DialogTitle>
                          <DialogDescription>Detailed supplier profile and performance metrics</DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="esg">ESG History</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                            <TabsTrigger value="kpis">KPIs</TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{supplier.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Joined: {supplier.joinDate}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                    <a href={`https://${supplier.website}`} className="text-blue-600 hover:underline">
                                      {supplier.website}
                                    </a>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Certifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex flex-wrap gap-2">
                                    {supplier.certifications.map((cert, i) => (
                                      <Badge key={i} variant="outline" className="flex items-center space-x-1">
                                        <Award className="h-3 w-3" />
                                        <span>{cert}</span>
                                      </Badge>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>

                          <TabsContent value="esg" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                  <TrendingUp className="h-5 w-5 text-green-600" />
                                  <span>ESG Score Trend</span>
                                </CardTitle>
                                <CardDescription>6-month performance history</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                  <LineChart data={esgHistoryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[80, 95]} />
                                    <Tooltip />
                                    <Line
                                      type="monotone"
                                      dataKey="score"
                                      stroke="#10b981"
                                      strokeWidth={3}
                                      dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="documents" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                  <FileText className="h-5 w-5" />
                                  <span>Uploaded Documents</span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {documents.map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                      <div className="flex items-center space-x-3">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                          <div className="font-medium">{doc.name}</div>
                                          <div className="text-sm text-muted-foreground">
                                            {doc.type} • {doc.date}
                                          </div>
                                        </div>
                                      </div>
                                      <Badge variant={getStatusBadgeVariant(doc.status)}>{doc.status}</Badge>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="kpis" className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Environmental</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm">Carbon Reduction</span>
                                        <span className="text-sm">25%</span>
                                      </div>
                                      <Progress value={25} />
                                    </div>
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm">Renewable Energy</span>
                                        <span className="text-sm">95%</span>
                                      </div>
                                      <Progress value={95} />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Social</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm">Employee Safety</span>
                                        <span className="text-sm">98%</span>
                                      </div>
                                      <Progress value={98} />
                                    </div>
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm">Diversity Index</span>
                                        <span className="text-sm">78%</span>
                                      </div>
                                      <Progress value={78} />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Governance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm">Compliance Rate</span>
                                        <span className="text-sm">92%</span>
                                      </div>
                                      <Progress value={92} />
                                    </div>
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm">Transparency</span>
                                        <span className="text-sm">85%</span>
                                      </div>
                                      <Progress value={85} />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
