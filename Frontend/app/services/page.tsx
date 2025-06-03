"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BarChart3,
  Shield,
  Leaf,
  Users,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  FileText,
  TrendingUp,
  Globe,
  Award,
  AlertTriangle,
  Search,
} from "lucide-react"

const services = [
  {
    id: "esg",
    icon: Leaf,
    title: "ESG Analysis",
    description: "Comprehensive Environmental, Social, and Governance evaluation",
    features: ["AI-powered scoring", "Real-time monitoring", "Compliance tracking", "Benchmarking"],
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: "ranking",
    icon: BarChart3,
    title: "Supplier Ranking",
    description: "Data-driven supplier performance evaluation and ranking",
    features: ["Multi-criteria analysis", "Custom weighting", "Performance trends", "Risk assessment"],
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: "risk",
    icon: Shield,
    title: "Risk Assessment",
    description: "Proactive identification and mitigation of supply chain risks",
    features: ["Risk scoring", "Early warning alerts", "Mitigation strategies", "Compliance monitoring"],
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
  {
    id: "compliance",
    icon: CheckCircle,
    title: "Compliance Monitoring",
    description: "Continuous monitoring of regulatory and policy compliance",
    features: ["Automated tracking", "Regulatory updates", "Audit trails", "Reporting tools"],
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
]

const evaluationSteps = [
  {
    step: "01",
    title: "Data Collection & Integration",
    description:
      "Gather comprehensive supplier data from multiple sources including public records, certifications, and direct submissions.",
    details: [
      "Automated data ingestion from 50+ sources",
      "Integration with existing ERP systems",
      "Real-time data synchronization",
      "Data validation and quality checks",
    ],
    icon: Search,
  },
  {
    step: "02",
    title: "AI-Powered Analysis",
    description: "Apply advanced machine learning algorithms to analyze ESG performance across multiple dimensions.",
    details: [
      "Natural language processing for document analysis",
      "Pattern recognition for risk identification",
      "Predictive modeling for future performance",
      "Sentiment analysis of public information",
    ],
    icon: Zap,
  },
  {
    step: "03",
    title: "Risk Assessment & Scoring",
    description:
      "Evaluate potential risks and assign comprehensive scores based on your specific criteria and industry standards.",
    details: [
      "Multi-dimensional risk scoring",
      "Industry-specific benchmarking",
      "Custom weighting based on priorities",
      "Continuous score updates",
    ],
    icon: Shield,
  },
  {
    step: "04",
    title: "Actionable Insights & Recommendations",
    description:
      "Generate detailed reports with specific recommendations for supplier improvement and risk mitigation.",
    details: [
      "Personalized improvement roadmaps",
      "Priority-based action items",
      "ROI calculations for improvements",
      "Implementation timelines",
    ],
    icon: Target,
  },
]

const faqs = [
  {
    question: "How accurate is your ESG scoring system?",
    answer:
      "Our AI-powered ESG scoring system achieves 95%+ accuracy by analyzing over 200 data points from multiple verified sources. We continuously validate our models against industry standards and expert assessments.",
  },
  {
    question: "How long does the supplier evaluation process take?",
    answer:
      "Initial evaluation typically takes 24-48 hours for comprehensive analysis. Real-time monitoring provides continuous updates, and our system can process bulk evaluations for large supplier networks within a week.",
  },
  {
    question: "Can you integrate with our existing procurement systems?",
    answer:
      "Yes, we offer seamless integration with 50+ popular ERP and procurement platforms including SAP, Oracle, and Microsoft Dynamics. Our API-first approach ensures smooth data flow and minimal disruption.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve clients across manufacturing, retail, technology, healthcare, automotive, and financial services. Our platform is customizable to meet industry-specific requirements and regulations.",
  },
  {
    question: "How do you ensure data security and privacy?",
    answer:
      "We maintain SOC 2 Type II certification, ISO 27001 compliance, and GDPR adherence. All data is encrypted in transit and at rest, with role-based access controls and regular security audits.",
  },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="relative pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Award className="h-4 w-4 mr-2" />
              Our Services
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              Comprehensive <span className="gradient-text">Sustainable Procurement</span>
              <br />
              Solutions
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From ESG analysis to risk assessment, we provide end-to-end solutions to transform your supply chain into
              a competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Globe className="h-4 w-4 mr-2" />
              Core Services
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for <span className="gradient-text">Sustainable Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive suite of services covers every aspect of sustainable procurement, from initial
              assessment to ongoing optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/50 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service Tabs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl font-bold mb-6">
                Explore Our <span className="gradient-text">Service Details</span>
              </h2>
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="font-heading text-3xl font-bold">Comprehensive Platform Overview</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our platform combines cutting-edge AI technology with deep sustainability expertise to deliver
                    unparalleled insights into your supply chain performance.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Real-time ESG monitoring and analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Automated risk assessment and alerts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Customizable reporting and dashboards</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Seamless integration with existing systems</span>
                    </div>
                  </div>
                </div>
                <Card className="border-0 bg-gradient-to-br from-primary/5 to-blue-500/5">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                        <div className="text-muted-foreground">Suppliers Analyzed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                        <div className="text-muted-foreground">Accuracy Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                        <div className="text-muted-foreground">Monitoring</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: BarChart3,
                    title: "Advanced Analytics",
                    description: "Deep insights with AI-powered analysis",
                  },
                  {
                    icon: Shield,
                    title: "Risk Management",
                    description: "Proactive risk identification and mitigation",
                  },
                  {
                    icon: FileText,
                    title: "Automated Reporting",
                    description: "Generate comprehensive reports instantly",
                  },
                  { icon: TrendingUp, title: "Performance Tracking", description: "Monitor improvements over time" },
                  { icon: Users, title: "Collaboration Tools", description: "Work together with suppliers and teams" },
                  { icon: Globe, title: "Global Coverage", description: "Support for international suppliers" },
                ].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm"
                    >
                      <CardHeader>
                        <Icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-0 bg-gradient-to-br from-green-500/5 to-blue-500/5">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading flex items-center">
                      <TrendingUp className="h-6 w-6 mr-3 text-green-600" />
                      Business Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Reduce procurement costs by up to 15%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Improve supplier performance by 25%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Enhance brand reputation and customer trust</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Ensure regulatory compliance</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading flex items-center">
                      <Leaf className="h-6 w-6 mr-3 text-blue-600" />
                      Sustainability Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Reduce carbon footprint by 30%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Improve social responsibility scores</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Support sustainable supplier development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Contribute to UN Sustainable Development Goals</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Starter",
                    price: "$99",
                    period: "/month",
                    description: "Perfect for small businesses",
                    features: ["Up to 50 suppliers", "Basic ESG analysis", "Monthly reports", "Email support"],
                    popular: false,
                  },
                  {
                    name: "Professional",
                    price: "$299",
                    period: "/month",
                    description: "Ideal for growing companies",
                    features: [
                      "Up to 500 suppliers",
                      "Advanced analytics",
                      "Real-time monitoring",
                      "Priority support",
                      "Custom integrations",
                    ],
                    popular: true,
                  },
                  {
                    name: "Enterprise",
                    price: "Custom",
                    period: "",
                    description: "For large organizations",
                    features: [
                      "Unlimited suppliers",
                      "Full platform access",
                      "Dedicated support",
                      "Custom development",
                      "SLA guarantee",
                    ],
                    popular: false,
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-0 bg-background/50 backdrop-blur-sm"}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-blue-600">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl font-heading">{plan.name}</CardTitle>
                      <div className="text-4xl font-bold">
                        {plan.price}
                        <span className="text-lg text-muted-foreground">{plan.period}</span>
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      <Button className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-blue-600" : ""}`}>
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Evaluation Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Target className="h-4 w-4 mr-2" />
              Evaluation Process
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Our Step-by-Step <span className="gradient-text">Evaluation Methodology</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven 4-step process ensures comprehensive, accurate, and actionable supplier evaluations every time.
            </p>
          </div>

          <div className="space-y-12">
            {evaluationSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className={`flex items-center gap-12 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white flex items-center justify-center font-bold text-lg">
                            {step.step}
                          </div>
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-heading">{step.title}</CardTitle>
                        <CardDescription className="text-lg">{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center space-x-3">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
                      <Icon className="h-24 w-24 text-primary" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              FAQ
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about our platform and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6 bg-background/50 backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Procurement?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Start your journey towards sustainable procurement today. Our experts are ready to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
