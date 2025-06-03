"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, Zap, Users, Globe, Award, TrendingUp, Heart, Lightbulb, Shield, ArrowRight } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Sustainability First",
    description: "Every decision we make is guided by our commitment to environmental and social responsibility.",
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously push the boundaries of what's possible with AI and data analytics.",
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "We believe in open, honest communication and transparent business practices.",
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work together with our clients and partners to create lasting positive impact.",
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
]

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Former sustainability director at Fortune 500 companies with 15+ years of experience.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "AI researcher and engineer with expertise in machine learning and data analytics.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Dr. Emily Watson",
    role: "Head of ESG",
    bio: "Environmental scientist and ESG expert with PhD in Sustainable Business Practices.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David Kim",
    role: "Head of Product",
    bio: "Product strategist with deep experience in enterprise software and user experience.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

const milestones = [
  { year: "2020", title: "Company Founded", description: "Started with a vision to transform procurement" },
  { year: "2021", title: "First AI Model", description: "Launched our proprietary ESG analysis algorithm" },
  { year: "2022", title: "Series A Funding", description: "Raised $15M to accelerate product development" },
  { year: "2023", title: "Global Expansion", description: "Expanded to serve clients across 25 countries" },
  { year: "2024", title: "10,000+ Suppliers", description: "Reached milestone of analyzing 10,000+ suppliers" },
]

export default function AboutPage() {
  return (
    <div className="relative pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Globe className="h-4 w-4 mr-2" />
              About SustainPro
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              Building a <span className="gradient-text">Sustainable Future</span>
              <br />
              Through Technology
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to revolutionize how businesses approach procurement, making sustainability and
              responsibility the cornerstone of every supply chain decision.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">
                  <Target className="h-4 w-4 mr-2" />
                  Our Vision
                </Badge>
                <h2 className="font-heading text-4xl font-bold mb-6">
                  A World Where Every Business Decision <span className="gradient-text">Creates Positive Impact</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We envision a future where sustainability isn't just a buzzword, but the foundation of every business
                  operation. Where supply chains are transparent, ethical, and contribute to the wellbeing of our planet
                  and society.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Environmental Impact Reduction</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>Supply Chain Transparency</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>Social Responsibility Score</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-3" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">
                  <Zap className="h-4 w-4 mr-2" />
                  Our Mission
                </Badge>
                <h2 className="font-heading text-4xl font-bold mb-6">
                  Empowering Businesses with <span className="gradient-text">AI-Driven Insights</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our mission is to democratize access to sophisticated ESG analysis and sustainable procurement
                  practices. We believe that every business, regardless of size, should have the tools to make
                  responsible sourcing decisions.
                </p>
                <Card className="border-0 bg-gradient-to-br from-primary/5 to-blue-500/5">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Award className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold text-lg">Industry Recognition</h3>
                        <p className="text-sm text-muted-foreground">Winner of 2024 Sustainability Innovation Award</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Recognized for our groundbreaking approach to sustainable procurement technology.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Heart className="h-4 w-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              What Drives Us <span className="gradient-text">Every Day</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values shape everything we do, from product development to client relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/50 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${value.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-6 w-6 ${value.color}`} />
                    </div>
                    <CardTitle className="text-xl font-heading">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Our Journey
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Milestones That <span className="gradient-text">Define Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small startup to a global leader in sustainable procurement technology.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-blue-600 rounded-full" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Badge variant="default" className="bg-gradient-to-r from-primary to-blue-600">
                            {milestone.year}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-heading">{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{milestone.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10 w-4 h-4 bg-gradient-to-r from-primary to-blue-600 rounded-full border-4 border-background shadow-lg" />

                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="h-4 w-4 mr-2" />
              Our Team
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Meet the <span className="gradient-text">Visionaries</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of experts brings together decades of experience in sustainability, technology, and
              business strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Join Us in Building a Sustainable Future</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ready to transform your procurement practices? Let's work together to create a more sustainable and
            responsible supply chain.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
