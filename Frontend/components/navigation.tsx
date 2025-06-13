"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Menu, Leaf, Home, Upload, Sliders, Database, ClipboardCheck, Bell, LogOut, Building, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Data Submission", href: "/data-submission", icon: Upload },
  { name: "ESG Analysis", href: "/esg-analysis", icon: Leaf },
  { name: "TradeOff Simulator", href: "/trade-off-simulator", icon: Sliders },
  { name: "Analysis", href: "/assessment", icon: ClipboardCheck },
  { name: "Supplier Directory", href: "/supplier-directory", icon: Database },
  { name: "Monitoring", href: "/monitoring", icon: Bell },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 20)
  //   }
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  // useEffect(() => {
  //   // Check for user data in localStorage
  //   const storedUserData = localStorage.getItem("userData")
  //   if (storedUserData) {
  //     const user = JSON.parse(storedUserData)
  //     if (user.isLoggedIn) {
  //       setUserData(user)
  //     } else {
  //       router.push("/registration")
  //     }
  //   } else {
  //     router.push("/registration")
  //   }
  // }, [router])

  const handleLogout = () => {
    router.push("/logout")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Don't render navigation on registration, login, or logout pages
  if (pathname === "/registration" || pathname === "/login" || pathname === "/logout") {
    return null
  }

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Leaf className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all" />
            </div>
            <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              SustainPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-all duration-200 hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* User Profile and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {userData && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(userData.contactName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                          {getInitials(userData.contactName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{userData.contactName}</h4>
                        <p className="text-sm text-muted-foreground">{userData.role}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.companyName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.email}</span>
                      </div>
                    </div>

                    <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <MobileNav userData={userData} onLogout={handleLogout} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileNav({ userData, onLogout }: { userData: any; onLogout: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-6 mt-8">
      <Link href="/" className="flex items-center space-x-2">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="font-heading font-bold text-lg gradient-text">SustainPro</span>
      </Link>

      {userData && (
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {userData.contactName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{userData.contactName}</h4>
            <p className="text-xs text-muted-foreground">{userData.role}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>

      {userData && (
        <Button onClick={onLogout} variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      )}
    </div>
  )
}
 