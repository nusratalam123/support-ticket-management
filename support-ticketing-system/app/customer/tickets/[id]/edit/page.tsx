"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import { ArrowLeft } from "lucide-react"

// Mock ticket data
const mockTicket = {
  id: "T-1001",
  subject: "Cannot access my account",
  description:
    "I've been trying to log in to my account for the past two days but keep getting an 'invalid credentials' error. I'm sure I'm using the correct password. Can you please help me regain access to my account?",
  status: "open",
  createdAt: "2023-06-15T10:30:00Z",
}

export default function EditTicket({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState(mockTicket)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would update the ticket via API
      // For demo purposes, we'll simulate updating the ticket

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Ticket updated",
        description: "Your ticket has been updated successfully.",
      })

      router.push(`/customer/tickets/${params.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your ticket. Please try again.",
        variant: "destructive",
      })
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Ticket {params.id}</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Edit Ticket Details</CardTitle>
              <CardDescription>Update the information for your support ticket.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={ticket.subject}
                  onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={ticket.description}
                  onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={ticket.status} onValueChange={(value) => setTicket({ ...ticket, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Ticket"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}

