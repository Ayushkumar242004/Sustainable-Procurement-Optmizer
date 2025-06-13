"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Building, User, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompanyRegister from "@/components/auth/CompanyRegister"
import SupplierRegister from "@/components/auth/SupplierRegister"
import EmployeeRegister from "@/components/auth/EmployeeRegister"
import EmployeeLogin from "@/components/auth/EmployeeLogin"

export default function AuthPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("company")
  //const [employeeTab, setEmployeeTab] = useState("login")

  return (

    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="animate-slide-up">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-float">
              {userType === "company" ? (
                <Building className="h-8 w-8 text-primary" />
              ) : userType === "supplier" ? (
                <Users className="h-8 w-8 text-primary" />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
            </div>
            
            <CardTitle className="text-2xl font-heading">
              {userType === "company" ? "Company " : userType === "supplier" ? "Supplier " : "Employee "}
              <span className="gradient-text">Portal</span>
            </CardTitle>
            
            <CardDescription>
              {userType === "employee" 
                ? "Login or register as an employee" 
                : `Register as a ${userType}`}
            </CardDescription>

            {/* User Type Selector */}
            <RadioGroup 
              defaultValue="company" 
              className="flex justify-center gap-4"
              onValueChange={(value) => setUserType(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company">Company</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="supplier" id="supplier" />
                <Label htmlFor="supplier">Supplier</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employee" id="employee" />
                <Label htmlFor="employee">Employee</Label>
              </div>
            </RadioGroup>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Company Registration Form */}
            {userType === "company" && (
              <CompanyRegister />
            )}

            {/* Supplier Registration Form */}
            {userType === "supplier" && (
              <SupplierRegister />
            )}

            {/* Employee Auth Forms */}
            {userType === "employee" && (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <EmployeeLogin />
                </TabsContent>

                <TabsContent value="register">
                  <EmployeeRegister />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}