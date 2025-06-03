"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Lightbulb, BarChart3, TrendingUp, AlertTriangle } from "lucide-react"

const sampleQuestions = [
  "Why did Supplier A score low on Governance?",
  "What if we reduce weight on emissions by 10%?",
  "Which suppliers have the best labor practices?",
  "How would increasing cost weight to 40% affect rankings?",
  "What are the main ESG risks for our top suppliers?",
]

const chatHistory = [
  {
    type: "user",
    message: "Why did SustainableParts Inc score low on Governance?",
    timestamp: "2 minutes ago",
  },
  {
    type: "assistant",
    message:
      "SustainableParts Inc scored 77/100 on Governance due to several factors:\n\n• **Board Independence (65/100)**: Only 40% independent board members (industry standard: 60%+)\n• **Transparency (70/100)**: Limited ESG reporting frequency and detail\n• **Executive Compensation (80/100)**: Compensation not fully aligned with ESG metrics\n\nRecommendations:\n1. Increase board independence to 60%+\n2. Implement quarterly ESG reporting\n3. Link executive compensation to sustainability targets",
    timestamp: "2 minutes ago",
    highlights: ["Board Independence", "Transparency", "Executive Compensation"],
  },
]

export default function AIAssistant() {
  const [messages, setMessages] = useState(chatHistory)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [simulatorValues, setSimulatorValues] = useState({
    cost: 25,
    sustainability: 25,
    risk: 25,
    reliability: 25,
  })

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      type: "user",
      message: inputMessage,
      timestamp: "Just now",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        emissions: {
          message:
            "Reducing emissions weight by 10% would affect supplier rankings as follows:\n\n**Ranking Changes:**\n• GreenTech Solutions: Remains #1 (strong overall performance)\n• EcoManufacturing Co: Moves up to #2 (cost advantage)\n• CleanEnergy Corp: Drops to #3 (heavily dependent on environmental score)\n\n**Impact Analysis:**\n📊 Cost-focused suppliers gain 2-3 ranking positions\n📉 Environmental leaders lose competitive advantage\n⚠️ Overall ESG alignment decreases by 8%\n\nWould you like me to run this simulation?",
          highlights: ["GreenTech Solutions", "CleanEnergy Corp", "environmental score"],
        },
        labor: {
          message:
            "Based on our ESG analysis, here are the suppliers with the best labor practices:\n\n**Top Performers:**\n\n🥇 **GreenTech Solutions (95/100)**\n• Zero workplace accidents in 24 months\n• Fair wage certification\n• Comprehensive employee benefits\n• Strong union relationships\n\n🥈 **CleanEnergy Corp (90/100)**\n• Excellent safety record\n• Progressive parental leave policies\n• Skills development programs\n• Mental health support\n\n🥉 **EcoManufacturing Co (85/100)**\n• Good safety protocols\n• Diversity initiatives\n• Regular employee surveys\n• Career advancement programs\n\n**Areas for Improvement:**\nSustainableParts Inc needs attention on worker safety and wage equity.",
          highlights: ["GreenTech Solutions", "CleanEnergy Corp", "worker safety"],
        },
        default: {
          message:
            "I can help you analyze supplier performance, simulate scenarios, and explain ESG scoring. Here are some things I can assist with:\n\n• **Supplier Analysis**: Deep dive into ESG scores and performance metrics\n• **What-If Scenarios**: Simulate changes in weights and see impact\n• **Risk Assessment**: Identify potential issues and mitigation strategies\n• **Benchmarking**: Compare suppliers against industry standards\n• **Recommendations**: Actionable insights for improvement\n\nWhat specific aspect would you like to explore?",
          highlights: [],
        },
      }

      const responseKey = inputMessage.toLowerCase().includes("emissions")
        ? "emissions"
        : inputMessage.toLowerCase().includes("labor")
          ? "labor"
          : "default"

      const response = responses[responseKey]

      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          message: response.message,
          timestamp: "Just now",
          highlights: response.highlights || [],
        },
      ])
      setIsLoading(false)
    }, 1500)
  }

  const handleQuestionClick = (question: string) => {
    setInputMessage(question)
  }

  const handleSimulatorChange = (factor: string, value: number[]) => {
    setSimulatorValues((prev) => ({ ...prev, [factor]: value[0] }))
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          AI Assistant & Explainability
        </h1>
        <p className="text-xl text-muted-foreground">Get insights, explanations, and run what-if scenarios</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <span>AI Assistant</span>
              </CardTitle>
              <CardDescription>Ask questions about supplier performance and ESG scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full pr-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-muted"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "assistant" && <Bot className="h-4 w-4 mt-1 text-blue-600" />}
                          {message.type === "user" && <User className="h-4 w-4 mt-1" />}
                          <div className="flex-1">
                            <div className="whitespace-pre-line text-sm">{message.message}</div>
                            {message.highlights && message.highlights.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {message.highlights.map((highlight, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <Separator className="my-4" />

              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about supplier performance, ESG scores, or run simulations..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Sample Questions</span>
              </CardTitle>
              <CardDescription>Click on any question to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {sampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto p-3"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What-If Simulator */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>What-If Simulator</span>
              </CardTitle>
              <CardDescription>Adjust values and see real-time impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Cost Weight</label>
                    <span className="text-sm text-muted-foreground">{simulatorValues.cost}%</span>
                  </div>
                  <Slider
                    value={[simulatorValues.cost]}
                    onValueChange={(value) => handleSimulatorChange("cost", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Sustainability Weight</label>
                    <span className="text-sm text-muted-foreground">{simulatorValues.sustainability}%</span>
                  </div>
                  <Slider
                    value={[simulatorValues.sustainability]}
                    onValueChange={(value) => handleSimulatorChange("sustainability", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Risk Weight</label>
                    <span className="text-sm text-muted-foreground">{simulatorValues.risk}%</span>
                  </div>
                  <Slider
                    value={[simulatorValues.risk]}
                    onValueChange={(value) => handleSimulatorChange("risk", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Reliability Weight</label>
                    <span className="text-sm text-muted-foreground">{simulatorValues.reliability}%</span>
                  </div>
                  <Slider
                    value={[simulatorValues.reliability]}
                    onValueChange={(value) => handleSimulatorChange("reliability", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              <Button className="w-full">Run Simulation</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Impact Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ranking Changes</span>
                  <Badge variant="outline">
                    <TrendingUp className="h-3 w-3 mr-1" />3 suppliers
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ESG Impact</span>
                  <Badge variant="outline">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    -5% alignment
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cost Savings</span>
                  <Badge variant="default">+12% potential</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
