"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/header"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:7000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // If using httpOnly cookies for authentication
      });
  
      const data = await response.json();

      console.log(data)
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      // Assuming your API returns user details and token
      localStorage.setItem("user", JSON.stringify(data.data));
  
      // Show success toast
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.data.role}!`,
      });
  
      console.log("role",data.data.role)

      // Redirect based on role
      router.push(data.data.role === "ADMIN" ? "/admin/dashboard" : "/customer/dashboard")
    } catch (error) {
      toast({ 
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <Header></Header>
      {/* <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <h1 className="text-lg font-semibold">Support Ticketing System</h1>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/#services" className="text-sm font-medium hover:text-primary">
              Services
            </Link>
            <Link href="/#about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header> */}

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* <div className="text-sm text-muted-foreground">
                <p>Demo accounts:</p>
                <p>Admin: admin@example.com / password</p>
                <p>Customer: customer@example.com / password</p>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

