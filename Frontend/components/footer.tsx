"use client"

import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "ESG Analysis", href: "/services#esg" },
    { name: "Supplier Ranking", href: "/services#ranking" },
    { name: "Risk Assessment", href: "/services#risk" },
    { name: "Compliance Monitoring", href: "/services#compliance" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-white text-gray-800 dark:bg-gradient-to-b dark:from-[#0B120F] dark:via-[#0f1f1f] dark:to-[#09090B] dark:text-white border-t transition-colors duration-500">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-5" />
      <div className="relative container mx-auto px-6 pt-12 pb-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Leaf className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all" />
              </div>
              <span className="font-heading font-bold text-xl gradient-text">ProcurePro</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming supply chains through sustainable procurement practices. Empowering businesses to make
              responsible sourcing decisions with AI-powered insights.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-lg">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-lg">Stay Connected</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@procurepro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="text-sm" />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-4 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <p>&copy; 2025 ProcurePro. All rights reserved.</p>
              <div className="flex space-x-4">
                {navigation.legal.map((item) => (
                  <Link key={item.name} href={item.href} className="hover:text-primary transition-colors duration-200">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by <span className="text-primary font-medium">Hack404</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
