"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function EmployeeLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Login failed")

      toast.success("Logged in successfully!")
      localStorage.setItem("token", data.token) 
        // user object contains email and role 
        localStorage.setItem("userData", JSON.stringify(data.user))
        router.push("/") 
      // Redirect logic can go here
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="loginEmail">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="loginEmail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your.email@company.com"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="loginPassword">Password *</Label>
        <Input
          id="loginPassword"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Your password"
          required
        />
      </div>

      <Button type="submit" className="w-full mt-6" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}
