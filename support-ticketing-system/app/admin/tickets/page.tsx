"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { Search } from "lucide-react"

// Mock data for tickets
const mockTickets = [
  {
    id: "T-1001",
    subject: "Cannot access my account",
    status: "open",
    customer: "John Doe",
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "T-1002",
    subject: "Payment issue with subscription",
    status: "in-progress",
    customer: "Jane Smith",
    createdAt: "2023-06-14T14:45:00Z",
  },
  {
    id: "T-1003",
    subject: "Feature request: Dark mode",
    status: "resolved",
    customer: "Mike Johnson",
    createdAt: "2023-06-13T09:15:00Z",
  },
  {
    id: "T-1004",
    subject: "Mobile app crashes on startup",
    status: "open",
    customer: "Sarah Williams",
    createdAt: "2023-06-12T16:20:00Z",
  },
  {
    id: "T-1005",
    subject: "Billing discrepancy",
    status: "closed",
    customer: "Robert Brown",
    createdAt: "2023-06-11T11:10:00Z",
  },
  {
    id: "T-1006",
    subject: "Need help with API integration",
    status: "open",
    customer: "Emily Davis",
    createdAt: "2023-06-10T13:25:00Z",
  },
  {
    id: "T-1007",
    subject: "Request for refund",
    status: "in-progress",
    customer: "David Wilson",
    createdAt: "2023-06-09T09:50:00Z",
  },
  {
    id: "T-1008",
    subject: "Login issues after password reset",
    status: "resolved",
    customer: "Lisa Taylor",
    createdAt: "2023-06-08T15:15:00Z",
  },
]

export default function AdminTickets() {
  const [tickets, setTickets] = useState(mockTickets)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Tickets</h1>
          <p className="text-muted-foreground">View and manage all customer support tickets.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tickets</CardTitle>
            <CardDescription>Browse and filter all support tickets in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-5 p-4 font-medium">
                <div>Ticket ID</div>
                <div className="md:col-span-2">Subject</div>
                <div>Customer</div>
                <div>Status</div>
              </div>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <div key={ticket.id} className="grid grid-cols-1 md:grid-cols-5 p-4 border-t items-center">
                    <div className="font-medium">{ticket.id}</div>
                    <div className="md:col-span-2 truncate">
                      <Link href={`/admin/tickets/${ticket.id}`} className="hover:underline text-blue-600">
                        {ticket.subject}
                      </Link>
                      <div className="text-xs text-muted-foreground md:hidden">{formatDate(ticket.createdAt)}</div>
                    </div>
                    <div>{ticket.customer}</div>
                    <div>{getStatusBadge(ticket.status)}</div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center border-t">No tickets found matching your criteria.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

