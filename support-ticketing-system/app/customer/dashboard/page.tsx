"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import { PlusCircle, MessageSquare, Clock, CheckCircle } from "lucide-react"

// Define initial stats state
const initialStats = {
  total: 0,
  open: 0,
  inProgress: 0,
  resolved: 0,
}

export default function CustomerDashboard() {
  const [tickets, setTickets] = useState([])
  const [stats, setStats] = useState(initialStats)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/v1/ticket/all")
        const data = await response.json()

        if (response.ok) {
          setTickets(data.data)
          calculateStats(data.data)
        } else {
          setError("Failed to fetch tickets.")
        }
      } catch (error) {
        setError("An error occurred while fetching tickets.")
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const calculateStats = (tickets: any[]) => {
    const total = tickets.length
    const open = tickets.filter((ticket) => ticket.status === "Open").length
    const inProgress = tickets.filter((ticket) => ticket.status === "In Progress").length
    const resolved = tickets.filter((ticket) => ticket.status === "Resolved").length

    setStats({
      total,
      open,
      inProgress,
      resolved,
    })
  }

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
      case "Open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Open
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      case "Closed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Closed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading tickets...</p>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-red-500">{error}</p>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
            <p className="text-muted-foreground">View and manage your support tickets.</p>
          </div>
          <Button asChild>
            <Link href="/customer/tickets/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Ticket
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All your support tickets</p>
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

        <Card>
          <CardHeader>
            <CardTitle>Your Recent Tickets</CardTitle>
            <CardDescription>View and manage your recent support tickets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-5 p-4 font-medium">
                <div>Ticket ID</div>
                <div>Description</div>
                <div className="md:col-span-2">Subject</div>
                <div>Status</div>
              </div>
              {tickets.map((ticket) => (
                <div key={ticket._id} className="grid grid-cols-1 md:grid-cols-5 p-4 border-t items-center">
                  <div className="font-medium">{ticket._id}</div>
                   <div className="font-medium">{(ticket.description)}</div>
                  <div className="md:col-span-2 truncate">
                    <Link href={`/customer/tickets/${ticket._id}`} className="hover:underline text-blue-600">
                      {ticket.subject}
                    </Link>
                  </div>
                  <div>{getStatusBadge(ticket.status)}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/customer/tickets">View All Tickets</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
