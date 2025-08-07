"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserBookings, Booking } from "@/data/bookings";
import BookingItem from "@/components/user-dashboard/BookingItem";
import { workspaceImages } from "@/utils/image-placeholders";

export default function UserBookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled" | "all">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    // Simulate API call
    const status = activeTab !== "all" ? activeTab : undefined;
    const fetchedBookings = getUserBookings(status as any);
    setBookings(fetchedBookings);
  }, [activeTab]);
  
  const tabs = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <Link href="/find-workspace" className="btn-primary py-2">
          Find a Workspace
        </Link>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="workout-card p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden relative mb-4">
                <Image 
                  src={workspaceImages[1]}
                  alt="Empty bookings"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-medium mb-2">No {activeTab !== "all" ? activeTab : ""} bookings found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming bookings. Start exploring workspaces!"
                  : `You don't have any ${activeTab !== "all" ? activeTab : ""} bookings.`}
              </p>
              <Link href="/find-workspace" className="btn-primary">
                Find a Workspace
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}