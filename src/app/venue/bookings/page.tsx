"use client";

import { useState } from "react";
import Link from "next/link";

export default function VenueBookingsPage() {
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "past" | "all">("today");
  const [dateFilter, setDateFilter] = useState("");
  
  // Mock data for venue bookings
  const mockBookings = [
    {
      id: "booking-1",
      userName: "Alex Johnson",
      userEmail: "alex.j@example.com",
      date: "2025-08-07",
      startTime: "10:00",
      endTime: "12:00",
      guests: 1,
      status: "confirmed",
      createdAt: "2025-08-01T14:30:00Z",
    },
    {
      id: "booking-2",
      userName: "Sarah Williams",
      userEmail: "sarah.w@example.com",
      date: "2025-08-07",
      startTime: "13:00",
      endTime: "15:00",
      guests: 2,
      status: "confirmed",
      createdAt: "2025-08-02T09:15:00Z",
    },
    {
      id: "booking-3",
      userName: "Michael Chen",
      userEmail: "michael.c@example.com",
      date: "2025-08-08",
      startTime: "09:00",
      endTime: "11:00",
      guests: 1,
      status: "confirmed",
      createdAt: "2025-08-02T16:45:00Z",
    },
    {
      id: "booking-4",
      userName: "Emily Rodriguez",
      userEmail: "emily.r@example.com",
      date: "2025-08-09",
      startTime: "14:00",
      endTime: "17:00",
      guests: 3,
      status: "confirmed",
      createdAt: "2025-08-03T11:20:00Z",
    },
    {
      id: "booking-5",
      userName: "David Kim",
      userEmail: "david.k@example.com",
      date: "2025-08-06",
      startTime: "11:00",
      endTime: "13:00",
      guests: 1,
      status: "completed",
      createdAt: "2025-08-01T08:30:00Z",
    },
    {
      id: "booking-6",
      userName: "Jessica Lee",
      userEmail: "jessica.l@example.com",
      date: "2025-08-05",
      startTime: "15:00",
      endTime: "18:00",
      guests: 2,
      status: "completed",
      createdAt: "2025-07-30T13:45:00Z",
    },
    {
      id: "booking-7",
      userName: "James Wilson",
      userEmail: "james.w@example.com",
      date: "2025-08-10",
      startTime: "10:00",
      endTime: "14:00",
      guests: 4,
      status: "confirmed",
      createdAt: "2025-08-04T15:10:00Z",
    },
  ];
  
  // Filter bookings based on tab
  const filterBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    
    let filtered = [...mockBookings];
    
    // Filter by tab
    if (activeTab === "today") {
      filtered = filtered.filter(booking => booking.date === today);
    } else if (activeTab === "upcoming") {
      filtered = filtered.filter(booking => booking.date >= today && booking.status === "confirmed");
    } else if (activeTab === "past") {
      filtered = filtered.filter(booking => booking.date < today || booking.status === "completed");
    }
    
    // Apply date filter if set
    if (dateFilter) {
      filtered = filtered.filter(booking => booking.date === dateFilter);
    }
    
    // Sort by date and time
    return filtered.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.startTime.localeCompare(b.startTime);
    });
  };
  
  const filteredBookings = filterBookings();
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <button
            onClick={() => setDateFilter("")}
            className="text-sm text-primary hover:underline"
            disabled={!dateFilter}
          >
            Clear
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "today"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "upcoming"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "past"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "all"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Bookings
        </button>
      </div>
      
      {/* Bookings Table */}
      <div className="workout-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/50">
              <tr>
                <th className="text-left p-4 font-medium">Guest</th>
                <th className="text-left p-4 font-medium">Date & Time</th>
                <th className="text-left p-4 font-medium">Guests</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-accent/30">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{booking.userName}</p>
                      <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p>{formatDate(booking.date)}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">{booking.guests}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/venue/bookings/${booking.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        View
                      </Link>
                      
                      {booking.status === "confirmed" && (
                        <>
                          <button className="text-sm text-primary hover:underline">
                            Message
                          </button>
                          <button className="text-sm text-red-500 hover:underline">
                            Cancel
                          </button>
                        </>
                      )}
                      
                      {booking.status === "confirmed" && (
                        <button className="text-sm text-primary hover:underline">
                          Check In
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No bookings found for the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}