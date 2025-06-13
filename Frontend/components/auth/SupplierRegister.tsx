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
import { Mail, CheckCircle } from "lucide-react"

const industries = [
  "Software",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
]

export default function SupplierRegister() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    company_name: "",
    email_domain: "",
    industry: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/supplier`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Something went wrong")

      toast.success("Supplier registered successfully!")
      setForm({ company_name: "", email_domain: "", industry: "" })
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
        <Input
          id="companyName"
          value={form.company_name}
          onChange={(e) =>
            setForm({ ...form, company_name: e.target.value })
          }
          placeholder="Enter your company name"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            value={form.email_domain}
            onChange={(e) => setForm({ ...form, email_domain: e.target.value })}
            placeholder="your.email@company.com"
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry">Industry *</Label>
        <Select
          value={form.industry}
          onValueChange={(value) =>
            setForm({ ...form, industry: value })
          }
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

      {/* Submit */}
      <Button type="submit" className="w-full mt-6" disabled={loading}>
        {loading ? "Registering..." : (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Register as Supplier
          </>
        )}
      </Button>
    </form>
  )
}
