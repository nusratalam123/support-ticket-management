"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import { CheckCircle, Clock, AlertCircle, Ticket } from "lucide-react"

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
]

export default function AdminDashboard() {
  const [tickets, setTickets] = useState(mockTickets)
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
  })

  useEffect(() => {
    // Calculate stats from tickets
    const total = tickets.length
    const open = tickets.filter((ticket) => ticket.status === "open").length
    const inProgress = tickets.filter((ticket) => ticket.status === "in-progress").length
    const resolved = tickets.filter((ticket) => ticket.status === "resolved").length
    const closed = tickets.filter((ticket) => ticket.status === "closed").length

    setStats({
      total,
      open,
      inProgress,
      resolved,
      closed,
    })
  }, [tickets])

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

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of all support tickets and their statuses.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All tickets in the system</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.open}</div>
              <p className="text-xs text-muted-foreground">Tickets awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Tickets being worked on</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolved}</div>
              <p className="text-xs text-muted-foreground">Tickets successfully resolved</p>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>The most recent support tickets submitted by customers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Tickets</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-1 md:grid-cols-5 p-4 font-medium">
                    <div>Ticket ID</div>
                    <div className="md:col-span-2">Subject</div>
                    <div>Customer</div>
                    <div>Status</div>
                  </div>
                  {tickets.map((ticket) => (
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
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="open" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-1 md:grid-cols-5 p-4 font-medium">
                    <div>Ticket ID</div>
                    <div className="md:col-span-2">Subject</div>
                    <div>Customer</div>
                    <div>Status</div>
                  </div>
                  {tickets
                    .filter((ticket) => ticket.status === "open")
                    .map((ticket) => (
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
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="in-progress" className="space-y-4">
                {/* Similar structure for in-progress tickets */}
                <div className="rounded-md border">
                  <div className="grid grid-cols-1 md:grid-cols-5 p-4 font-medium">
                    <div>Ticket ID</div>
                    <div className="md:col-span-2">Subject</div>
                    <div>Customer</div>
                    <div>Status</div>
                  </div>
                  {tickets
                    .filter((ticket) => ticket.status === "in-progress")
                    .map((ticket) => (
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
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="resolved" className="space-y-4">
                {/* Similar structure for resolved tickets */}
                <div className="rounded-md border">
                  <div className="grid grid-cols-1 md:grid-cols-5 p-4 font-medium">
                    <div>Ticket ID</div>
                    <div className="md:col-span-2">Subject</div>
                    <div>Customer</div>
                    <div>Status</div>
                  </div>
                  {tickets
                    .filter((ticket) => ticket.status === "resolved")
                    .map((ticket) => (
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
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/admin/tickets">View All Tickets</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

