"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"  // Correct import

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { PlusCircle, Search, Trash, Pencil } from "lucide-react"

export default function CustomerTickets() {
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]) // Explicitly setting type
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/v1/ticket/all")
      const data = await response.json()
      if (data?.data && Array.isArray(data.data)) {
        setTickets(data.data)
      } else {
        setTickets([])
      }
    } catch (error) {
      console.error("Failed to fetch tickets:", error)
      setTickets([])
    } finally {
      setLoading(false)
    }
  }

  const deleteTicket = async (id: string) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      try {
        await fetch(`http://localhost:7000/api/v1/ticket/delete/${id}`, {
          method: "DELETE",
        })
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== id))
      } catch (error) {
        console.error("Failed to delete ticket:", error)
      }
    }
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
    switch (status.toLowerCase()) {
      case "open":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Open</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>
      case "closed":
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Closed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const ticketId = ticket?._id ?? ""
    const ticketSubject = ticket?.subject ?? ""
    const ticketStatus = ticket?.status?.toLowerCase() ?? ""

    const matchesSearch =
      ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticketSubject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticketStatus === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Tickets</h1>
            <p className="text-muted-foreground">View and manage all your support tickets.</p>
          </div>
          <Button asChild>
            <Link href="/customer/tickets/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Ticket
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tickets</CardTitle>
            <CardDescription>Browse, update, and delete your support tickets.</CardDescription>
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
                <Button size="icon">
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

            {loading ? (
              <div className="text-center p-4">Loading tickets...</div>
            ) : (
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-5 p-4 font-medium">
                  <div>Ticket ID</div>
                  <div className="md:col-span-2">Subject</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <div key={ticket._id} className="grid grid-cols-1 md:grid-cols-5 p-4 border-t items-center">
                      <div className="font-medium">{ticket._id}</div>
                      <div className="md:col-span-2 truncate">
                        <Link href={`/customer/tickets/${ticket._id}`} className="hover:underline text-blue-600">
                          {ticket.subject}
                        </Link>
                        <div className="text-xs text-muted-foreground md:hidden">{ticket.description}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{formatDate(ticket.createdAt)}</div>
                      </div>
                      <div>{getStatusBadge(ticket.status)}</div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/customer/tickets/update/${ticket._id}`)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => deleteTicket(ticket._id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center border-t">No tickets found matching your criteria.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
