"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  AlertTriangle,
  Clock,
  FileX,
  Shield,
  CheckCircle,
  XCircle,
  Calendar,
  AlertCircle,
  Settings,
  Filter,
} from "lucide-react"

const upcomingDeadlines = [
  {
    id: 1,
    title: "GreenTech Solutions - Annual ESG Report",
    dueDate: "2024-02-15",
    daysLeft: 12,
    priority: "high",
    supplier: "GreenTech Solutions",
    type: "ESG Report",
  },
  {
    id: 2,
    title: "EcoManufacturing Co - Carbon Footprint Assessment",
    dueDate: "2024-02-20",
    daysLeft: 17,
    priority: "medium",
    supplier: "EcoManufacturing Co",
    type: "Environmental",
  },
  {
    id: 3,
    title: "SustainableParts Inc - Labor Standards Certification",
    dueDate: "2024-02-25",
    daysLeft: 22,
    priority: "medium",
    supplier: "SustainableParts Inc",
    type: "Social",
  },
  {
    id: 4,
    title: "CleanEnergy Corp - Governance Policy Update",
    dueDate: "2024-03-01",
    daysLeft: 26,
    priority: "low",
    supplier: "CleanEnergy Corp",
    type: "Governance",
  },
]

const missingDocuments = [
  {
    id: 1,
    supplier: "BudgetSupply Ltd",
    document: "Environmental Policy Statement",
    category: "Environmental",
    overdueDays: 5,
    lastReminder: "2024-01-25",
  },
  {
    id: 2,
    supplier: "SustainableParts Inc",
    document: "Diversity & Inclusion Report",
    category: "Social",
    overdueDays: 12,
    lastReminder: "2024-01-20",
  },
  {
    id: 3,
    supplier: "TechComponents LLC",
    document: "Board Independence Declaration",
    category: "Governance",
    overdueDays: 3,
    lastReminder: "2024-01-28",
  },
]

const riskAlerts = [
  {
    id: 1,
    supplier: "GlobalManufacturing Inc",
    alert: "Regulatory compliance score dropped below threshold",
    severity: "critical",
    category: "Compliance",
    detectedDate: "2024-01-30",
    impact: "High",
  },
  {
    id: 2,
    supplier: "EcoManufacturing Co",
    alert: "Carbon emissions increased by 15% this quarter",
    severity: "warning",
    category: "Environmental",
    detectedDate: "2024-01-28",
    impact: "Medium",
  },
  {
    id: 3,
    supplier: "SustainableParts Inc",
    alert: "Employee safety incidents reported",
    severity: "warning",
    category: "Social",
    detectedDate: "2024-01-26",
    impact: "Medium",
  },
  {
    id: 4,
    supplier: "TechComponents LLC",
    alert: "Financial transparency concerns identified",
    severity: "medium",
    category: "Governance",
    detectedDate: "2024-01-24",
    impact: "Low",
  },
]

const notificationSettings = [
  {
    id: "deadlines",
    title: "Upcoming Deadlines",
    description: "Get notified about approaching submission deadlines",
    enabled: true,
    frequency: "daily",
  },
  {
    id: "missing-docs",
    title: "Missing Documents",
    description: "Alerts for overdue or missing supplier documents",
    enabled: true,
    frequency: "weekly",
  },
  {
    id: "risk-alerts",
    title: "Risk Alerts",
    description: "Critical risk notifications and compliance issues",
    enabled: true,
    frequency: "immediate",
  },
  {
    id: "score-changes",
    title: "Score Changes",
    description: "Notifications when supplier ESG scores change significantly",
    enabled: false,
    frequency: "weekly",
  },
  {
    id: "new-suppliers",
    title: "New Supplier Registrations",
    description: "Alerts when new suppliers register on the platform",
    enabled: true,
    frequency: "daily",
  },
]

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-100 dark:bg-red-900/20"
    case "medium":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    case "low":
      return "text-green-600 bg-green-100 dark:bg-green-900/20"
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
  }
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "text-red-600 bg-red-100 dark:bg-red-900/20"
    case "warning":
      return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
    case "medium":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    default:
      return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
  }
}

function getSeverityIcon(severity: string) {
  switch (severity) {
    case "critical":
      return <XCircle className="h-4 w-4" />
    case "warning":
      return <AlertTriangle className="h-4 w-4" />
    case "medium":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <CheckCircle className="h-4 w-4" />
  }
}

export default function MonitoringPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [settings, setSettings] = useState(notificationSettings)
  const { toast } = useToast()

  const updateNotificationSetting = (id: string, enabled: boolean) => {
    setSettings((prev) => prev.map((setting) => (setting.id === id ? { ...setting, enabled } : setting)))
    toast({
      title: enabled ? "Notifications enabled" : "Notifications disabled",
      description: `${settings.find((s) => s.id === id)?.title} notifications have been ${enabled ? "enabled" : "disabled"}.`,
    })
  }

  const sendReminder = (supplierId: string, documentType: string) => {
    toast({
      title: "Reminder sent",
      description: `Reminder sent to supplier about missing ${documentType}.`,
    })
  }

  const acknowledgeAlert = (alertId: number) => {
    toast({
      title: "Alert acknowledged",
      description: "The alert has been marked as acknowledged.",
    })
  }

  return (
    <div className="relative pt-16 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-heading mb-4">
            Monitoring & <span className="gradient-text">Alerts Center</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay informed with real-time notifications and proactive monitoring
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-red-500/5 to-red-600/5">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-sm text-muted-foreground">Critical Alerts</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/5">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">4</div>
              <div className="text-sm text-muted-foreground">Upcoming Deadlines</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5">
            <CardContent className="p-6 text-center">
              <FileX className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-muted-foreground">Missing Documents</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">Active Monitors</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deadlines" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
              <TabsTrigger value="missing">Missing</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="deadlines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>Track approaching submission deadlines and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div
                      key={deadline.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{deadline.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Due: {deadline.dueDate} • {deadline.supplier}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{deadline.daysLeft} days left</div>
                          <Badge variant="outline" className="text-xs">
                            {deadline.type}
                          </Badge>
                        </div>
                        <Badge className={getPriorityColor(deadline.priority)}>{deadline.priority}</Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="missing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileX className="h-5 w-5 mr-2" />
                  Missing Documents
                </CardTitle>
                <CardDescription>Track overdue and missing supplier documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {missingDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <FileX className="h-4 w-4 text-red-600" />
                          <div>
                            <div className="font-medium">{doc.document}</div>
                            <div className="text-sm text-muted-foreground">
                              {doc.supplier} • {doc.category}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm font-medium text-red-600">{doc.overdueDays} days overdue</div>
                          <div className="text-xs text-muted-foreground">Last reminder: {doc.lastReminder}</div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => sendReminder(doc.supplier, doc.document)}>
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Risk Alerts
                </CardTitle>
                <CardDescription>Critical alerts and compliance notifications requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded ${getSeverityColor(alert.severity)}`}>
                            {getSeverityIcon(alert.severity)}
                          </div>
                          <div>
                            <div className="font-medium">{alert.alert}</div>
                            <div className="text-sm text-muted-foreground">
                              {alert.supplier} • {alert.category} • {alert.detectedDate}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          <div className="text-xs text-muted-foreground mt-1">Impact: {alert.impact}</div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)}>
                          Acknowledge
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure your notification preferences and alert frequencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{setting.title}</div>
                        <div className="text-sm text-muted-foreground">{setting.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">Frequency: {setting.frequency}</div>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={(checked) => updateNotificationSetting(setting.id, checked)}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Email Preferences</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily digest</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly summary</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Instant alerts</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
