"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import { ArrowLeft, Send, AlertTriangle } from "lucide-react"

// Mock ticket data
const mockTicket = {
  id: "T-1001",
  subject: "Cannot access my account",
  description:
    "I've been trying to log in to my account for the past two days but keep getting an 'invalid credentials' error. I'm sure I'm using the correct password. Can you please help me regain access to my account?",
  status: "open",
  createdAt: "2023-06-15T10:30:00Z",
  messages: [
    {
      id: "msg-1",
      sender: "customer",
      senderName: "John Doe",
      content:
        "I've been trying to log in to my account for the past two days but keep getting an 'invalid credentials' error. I'm sure I'm using the correct password.",
      timestamp: "2023-06-15T10:30:00Z",
    },
    {
      id: "msg-2",
      sender: "admin",
      senderName: "Support Team",
      content:
        "Hello John, I'm sorry to hear you're having trouble accessing your account. Have you tried resetting your password using the 'Forgot Password' link on the login page?",
      timestamp: "2023-06-15T11:15:00Z",
    },
    {
      id: "msg-3",
      sender: "customer",
      senderName: "John Doe",
      content: "Yes, I tried that but I'm not receiving the password reset email.",
      timestamp: "2023-06-15T11:45:00Z",
    },
  ],
}

export default function CustomerTicketDetail({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState(mockTicket)
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Closed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would send the message via API
      // For demo purposes, we'll simulate sending a message

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newMsg = {
        id: `msg-${ticket.messages.length + 1}`,
        sender: "customer",
        senderName: "John Doe",
        content: newMessage,
        timestamp: new Date().toISOString(),
      }

      setTicket((prev) => ({
        ...prev,
        messages: [...prev.messages, newMsg],
      }))

      setNewMessage("")

      toast({
        title: "Message sent",
        description: "Your message has been sent to support.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseTicket = async () => {
    try {
      // In a real app, this would update the ticket status via API
      // For demo purposes, we'll simulate closing the ticket

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setTicket((prev) => ({
        ...prev,
        status: "closed",
      }))

      toast({
        title: "Ticket closed",
        description: "Your ticket has been closed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem closing your ticket. Please try again.",
        variant: "destructive",
      })
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
          <h1 className="text-2xl font-bold tracking-tight">Ticket {params.id}</h1>
          <div className="ml-auto">{getStatusBadge(ticket.status)}</div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{ticket.subject}</CardTitle>
                <CardDescription>Created on {formatDate(ticket.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {ticket.messages.map((message) => (
                    <div key={message.id} className="flex gap-4">
                      <Avatar>
                        <AvatarFallback>{message.sender === "customer" ? "JD" : "ST"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{message.senderName}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  {ticket.status !== "closed" ? (
                    <>
                      <Textarea
                        placeholder="Type your reply here..."
                        className="min-h-[100px]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button className="ml-auto" onClick={handleSendMessage} disabled={isSubmitting}>
                        <Send className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Sending..." : "Send Reply"}
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground mr-2" />
                      <p className="text-muted-foreground">This ticket is closed. You cannot reply to it.</p>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Status</h3>
                    <div className="mt-1">{getStatusBadge(ticket.status)}</div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium">Created</h3>
                    <p className="mt-1 text-sm">{formatDate(ticket.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {ticket.status !== "closed" && (
                  <Button className="w-full" variant="destructive" onClick={handleCloseTicket}>
                    Close Ticket
                  </Button>
                )}
                <Button className="w-full" variant="outline" onClick={() => router.push("/customer/tickets")}>
                  Back to All Tickets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

