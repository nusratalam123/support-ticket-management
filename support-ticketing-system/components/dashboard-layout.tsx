"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Ticket, LogOut, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface UserData {
  email: string
  role: string
  name: string
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Ensure corrupted data is cleared
      router.push("/login");
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  if (!isClient || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const isAdmin = user.role === "admin"
  const basePath = isAdmin ? "/admin" : "/customer"

  const navigation = [
    {
      name: "Dashboard",
      href: `${basePath}/dashboard`,
      icon: LayoutDashboard,
      current: pathname === `${basePath}/dashboard`,
    },
    {
      name: "Tickets",
      href: `${basePath}/tickets`,
      icon: Ticket,
      current: pathname === `${basePath}/tickets` || pathname.startsWith(`${basePath}/tickets/`),
    },
    {
      name: "Profile",
      href: `${basePath}/profile`,
      icon: User,
      current: pathname === `${basePath}/profile`,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-6 w-6" />
                    <span className="text-lg font-semibold">Support System</span>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                          item.current ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start gap-2 px-3"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <Link href={basePath} className="flex items-center gap-2">
              <Ticket className="h-6 w-6" />
              <span className="text-lg font-semibold hidden md:inline-block">Support System</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <span className="text-sm font-medium">
                {user.name} ({user.role})
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r md:flex">
          <nav className="flex flex-col gap-2 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                  item.current ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

