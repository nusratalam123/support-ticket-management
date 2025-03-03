"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import axios from "axios"

export default function UpdateTicket({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<any>(null)
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Fetch ticket from API
  useEffect(() => {
    const loadTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/v1/ticket/single/${params.id}`)
        console.log(response.data)
        const ticketData = response.data.data
        setTicket(ticketData)
        setSubject(ticketData.subject)
        setDescription(ticketData.description)
        setStatus(ticketData.status)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load ticket data.",
          variant: "destructive",
        })
      }
    }
    loadTicket()
  }, [params.id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.put(`http://localhost:7000/api/v1/ticket/update-post/${params.id}`, {
        subject,
        description,
        status,
      })

      console.log(response.data)

      toast({
        title: "Success",
        description: "Ticket updated successfully.",
      })

      router.push("/customer/tickets")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating the ticket.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!ticket) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Update Ticket {params.id}</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Edit Ticket</CardTitle>
              <CardDescription>Make changes to your ticket details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Ticket"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}
