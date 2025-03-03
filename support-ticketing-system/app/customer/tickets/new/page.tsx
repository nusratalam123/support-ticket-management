"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import { ArrowLeft } from "lucide-react"

export default function NewTicket() {
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        console.error("No user found in localStorage");
        return;
      }

       const user = JSON.parse(storedUser);
       const customerId = user._id; // Extract customer ID
       const token=user.token

       const response = await fetch("http://localhost:7000/api/v1/ticket/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Include token if needed
        },
        body: JSON.stringify({ subject, description ,customerId}),
      });
      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }
  
      toast({
        title: "Ticket created",
        description: "Your support ticket has been submitted successfully.",
      });
  
      router.push("/customer/tickets");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Create New Ticket</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>New Support Ticket</CardTitle>
              <CardDescription>Fill out the form below to submit a new support ticket.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide details about your issue..."
                  className="min-h-[200px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}

