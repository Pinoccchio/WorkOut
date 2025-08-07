"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  // Mock data
  const [dateRange, setDateRange] = useState("May 24 - June 11, 2025");
  
  // Mock statistics
  const stats = {
    revenue: "10,480",
    bookings: "234",
    bookedHours: "852",
    newVenues: "16",
    newUsers: "35",
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        <div className="mt-4 md:mt-0">
          <div className="relative inline-block">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Date Range</span>
              <button className="text-sm px-2 py-1 rounded hover:bg-accent flex items-center">
                {dateRange}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <div className="workout-card p-8 text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">${stats.revenue}</h2>
          <p className="text-lg font-medium">Revenue (USD)</p>
        </div>
        
        {/* Bookings Card */}
        <div className="workout-card p-8 text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">{stats.bookings}</h2>
          <p className="text-lg font-medium">Bookings</p>
        </div>
        
        {/* Booked Hours Card */}
        <div className="workout-card p-8 text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">{stats.bookedHours}</h2>
          <p className="text-lg font-medium">Booked Hours</p>
        </div>
        
        {/* New Venues Card */}
        <div className="workout-card p-8 text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">{stats.newVenues}</h2>
          <p className="text-lg font-medium">New Venues</p>
          <Link href="/admin/venues" className="text-sm text-primary hover:underline mt-2 inline-block">
            View all venues
          </Link>
        </div>
        
        {/* New Users Card */}
        <div className="workout-card p-8 text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">{stats.newUsers}</h2>
          <p className="text-lg font-medium">New Users</p>
          <Link href="/admin/users" className="text-sm text-primary hover:underline mt-2 inline-block">
            View all users
          </Link>
        </div>
        
        {/* Quick Actions Card */}
        <div className="workout-card p-8">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              href="/admin/venues/pending" 
              className="block w-full text-left px-4 py-2 rounded-md bg-accent hover:bg-accent/80 transition-colors"
            >
              Review Pending Venues
            </Link>
            <Link 
              href="/admin/users/create" 
              className="block w-full text-left px-4 py-2 rounded-md bg-accent hover:bg-accent/80 transition-colors"
            >
              Create Admin User
            </Link>
            <Link 
              href="/admin/settings" 
              className="block w-full text-left px-4 py-2 rounded-md bg-accent hover:bg-accent/80 transition-colors"
            >
              System Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}