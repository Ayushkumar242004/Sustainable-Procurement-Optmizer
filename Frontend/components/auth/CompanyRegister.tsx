"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Building, Mail, MapPin, Globe, CheckCircle } from "lucide-react"

const industries = [
  "Software",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
]

export default function CompanyRegister() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    company_name: "",
    email_domain: "",
    industry: "",
    employee_count: "",
    location: "",
    website: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/company`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      )
      
      console.log( form )

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Something went wrong")

      toast.success("Company registered successfully!")
      setForm({
        company_name: "",
        email_domain: "",
        industry: "",
        employee_count: "",
        location: "",
        website: "",
      })
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name *</Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="companyName"
            value={form.company_name}
            onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            placeholder="Enter your company name"
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Email Domain */}
      <div className="space-y-2">
        <Label htmlFor="emailDomain">Company Email Domain *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="emailDomain"
            value={form.email_domain}
            onChange={(e) =>
              setForm({ ...form, email_domain: e.target.value })
            }
            placeholder="yourcompany.com"
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Industry and Employee Count */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select
            value={form.industry}
            onValueChange={(value) => setForm({ ...form, industry: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employeeCount">Employee Count</Label>
          <Select
            value={form.employee_count}
            onValueChange={(value) =>
              setForm({ ...form, employee_count: value })
            }
          >
            <SelectTrigger>
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

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="City, Country"
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="www.yourcompany.com"
            className="pl-10"
          />
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full mt-6" disabled={loading}>
        {loading ? "Registering..." : (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Register Company
          </>
        )}
      </Button>
    </form>
  )
}
