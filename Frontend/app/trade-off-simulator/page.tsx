"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { RefreshCw, TrendingUp, TrendingDown, Info, Send, Bot, User, Mic, MicOff } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

const initialSuppliers = [
  { id: 1, name: "GreenTech Solutions", cost: 85, sustainability: 92, risk: 15, reliability: 88, overallScore: 0 },
  { id: 2, name: "EcoManufacturing Co", cost: 78, sustainability: 87, risk: 25, reliability: 85, overallScore: 0 },
  { id: 3, name: "SustainableParts Inc", cost: 92, sustainability: 78, risk: 35, reliability: 82, overallScore: 0 },
  { id: 4, name: "CleanEnergy Corp", cost: 80, sustainability: 85, risk: 20, reliability: 90, overallScore: 0 },
  { id: 5, name: "BudgetSupply Ltd", cost: 95, sustainability: 65, risk: 45, reliability: 75, overallScore: 0 },
  { id: 6, name: "ReliableCorp", cost: 82, sustainability: 70, risk: 30, reliability: 95, overallScore: 0 },
]

const tradeOffPresets = [
  { name: "Cost Focused", weights: { cost: 50, sustainability: 20, risk: 15, reliability: 15 } },
  { name: "Sustainability First", weights: { cost: 15, sustainability: 50, risk: 20, reliability: 15 } },
  { name: "Risk Averse", weights: { cost: 20, sustainability: 25, risk: 40, reliability: 15 } },
  { name: "Reliability Priority", weights: { cost: 20, sustainability: 20, risk: 15, reliability: 45 } },
  { name: "Balanced", weights: { cost: 25, sustainability: 25, risk: 25, reliability: 25 } },
]

// AI Assistant Messages
interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

const aiResponses = {
  greeting:
    "Hello! I'm your AI procurement assistant. I can help you optimize your supplier selection using the trade-off simulator. What would you like to know?",
  weights:
    "The weight configuration allows you to prioritize different factors. For example, increasing sustainability weight will favor eco-friendly suppliers, while increasing cost weight will prioritize budget-friendly options.",
  presets:
    "I recommend starting with our preset configurations: 'Sustainability First' for ESG-focused procurement, 'Cost Focused' for budget optimization, or 'Balanced' for equal consideration of all factors.",
  suppliers:
    "Based on your current weights, I can see the supplier rankings have changed. Would you like me to explain why a particular supplier moved up or down in the rankings?",
  recommendations:
    "For optimal results, I suggest adjusting weights gradually and observing how rankings change. This helps you understand the trade-offs between different procurement priorities.",
}

export default function TradeOffSimulator() {
  const [weights, setWeights] = useState({
    cost: 25,
    sustainability: 25,
    risk: 25,
    reliability: 25,
  })

  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeTab, setActiveTab] = useState("simulator")

  // AI Assistant State
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const calculateOverallScore = (supplier: any, weights: any) => {
    return (
      (supplier.cost * weights.cost) / 100 +
      (supplier.sustainability * weights.sustainability) / 100 +
      ((100 - supplier.risk) * weights.risk) / 100 +
      (supplier.reliability * weights.reliability) / 100
    )
  }

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      const updatedSuppliers = initialSuppliers
        .map((supplier) => ({
          ...supplier,
          overallScore: calculateOverallScore(supplier, weights),
        }))
        .sort((a, b) => b.overallScore - a.overallScore)

      setSuppliers(updatedSuppliers)
      setIsAnimating(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [weights])

  useEffect(() => {
    // Add welcome message when component mounts
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: aiResponses.greeting,
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length])

  const handleWeightChange = (factor: string, value: number[]) => {
    setWeights((prev) => ({ ...prev, [factor]: value[0] }))
  }

  const applyPreset = (preset: any) => {
    setWeights(preset.weights)
  }

  const resetWeights = () => {
    setWeights({ cost: 25, sustainability: 25, risk: 25, reliability: 25 })
  }

  const getImplications = () => {
    const maxWeight = Math.max(...Object.values(weights))
    const maxFactor = Object.keys(weights).find((key) => weights[key as keyof typeof weights] === maxWeight)

    const implications = {
      cost: "Prioritizing cost may lead to lower ESG scores and higher risks",
      sustainability: "Focus on sustainability may increase costs but improve brand reputation",
      risk: "Risk-averse approach ensures stability but may limit innovation",
      reliability: "Reliability focus ensures consistent delivery but may increase costs",
    }

    return (
      implications[maxFactor as keyof typeof implications] ||
      "Balanced approach provides moderate performance across all factors"
    )
  }

  const chartData = suppliers.slice(0, 6).map((supplier) => ({
    name: supplier.name.split(" ")[0],
    score: Math.round(supplier.overallScore),
  }))

  // AI Assistant Functions
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("help")) {
      return aiResponses.greeting
    }
    if (message.includes("weight") || message.includes("factor") || message.includes("priority")) {
      return aiResponses.weights
    }
    if (message.includes("preset") || message.includes("configuration") || message.includes("recommend")) {
      return aiResponses.presets
    }
    if (message.includes("supplier") || message.includes("ranking") || message.includes("score")) {
      return aiResponses.suppliers
    }
    if (message.includes("optimize") || message.includes("best") || message.includes("advice")) {
      return aiResponses.recommendations
    }

    return "I can help you with weight configuration, preset selection, supplier analysis, and optimization strategies. What specific aspect would you like to explore?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const assistantResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(inputValue),
          sender: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        setInputValue("What's the best weight configuration for sustainability?")
      }, 2000)
    }
  }

   return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Trade-Off Simulator
          </h1>
          <p className="text-xl text-muted-foreground">
            Adjust weights to see how supplier rankings change in real-time with AI-powered insights
          </p>
        </div>

        {/* Trade-Off Simulator Content (single tab) */}
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Controls Panel */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Configuration</CardTitle>
                  <CardDescription>Adjust the importance of each factor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Cost Efficiency</label>
                        <span className="text-sm text-muted-foreground">{weights.cost}%</span>
                      </div>
                      <Slider
                        value={[weights.cost]}
                        onValueChange={(value) => handleWeightChange("cost", value)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Sustainability</label>
                        <span className="text-sm text-muted-foreground">{weights.sustainability}%</span>
                      </div>
                      <Slider
                        value={[weights.sustainability]}
                        onValueChange={(value) => handleWeightChange("sustainability", value)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Risk Management</label>
                        <span className="text-sm text-muted-foreground">{weights.risk}%</span>
                      </div>
                      <Slider
                        value={[weights.risk]}
                        onValueChange={(value) => handleWeightChange("risk", value)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Reliability</label>
                        <span className="text-sm text-muted-foreground">{weights.reliability}%</span>
                      </div>
                      <Slider
                        value={[weights.reliability]}
                        onValueChange={(value) => handleWeightChange("reliability", value)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={resetWeights} variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Presets</CardTitle>
                  <CardDescription>Apply common weight configurations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tradeOffPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => applyPreset(preset)}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Current Strategy:</strong> {getImplications()}
                </AlertDescription>
              </Alert>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Rankings</CardTitle>
                  <CardDescription>Rankings update automatically based on your weight preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`space-y-4 transition-opacity duration-300 ${isAnimating ? "opacity-50" : "opacity-100"}`}
                  >
                    {suppliers.map((supplier, index) => (
                      <div
                        key={supplier.id}
                        className="flex items-center justify-between p-4 border rounded-lg transition-all duration-500 hover:shadow-md"
                        style={{
                          transform: isAnimating ? "translateY(10px)" : "translateY(0)",
                          transition: "all 0.5s ease-in-out",
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                            {index === 0 && <TrendingUp className="h-5 w-5 text-green-600" />}
                            {index === suppliers.length - 1 && <TrendingDown className="h-5 w-5 text-red-600" />}
                          </div>
                          <div>
                            <h3 className="font-semibold">{supplier.name}</h3>
                            <div className="flex space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                Cost: {supplier.cost}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                ESG: {supplier.sustainability}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Risk: {supplier.risk}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Reliability: {supplier.reliability}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{Math.round(supplier.overallScore)}</div>
                          <div className="text-sm text-muted-foreground">Overall Score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Score Comparison</CardTitle>
                  <CardDescription>Visual comparison of top suppliers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  )
}

