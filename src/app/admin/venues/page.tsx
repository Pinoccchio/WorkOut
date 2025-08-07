"use client";

import { useState } from "react";
import Link from "next/link";

// Mock venue data
const mockVenues = [
  {
    id: 1,
    name: "Example Café",
    bookings: 45,
    revenue: 8985.00,
    lastBooking: "05/20/2025",
    status: "active"
  },
  {
    id: 2,
    name: "Urban Workspace",
    bookings: 32,
    revenue: 6120.50,
    lastBooking: "05/28/2025",
    status: "active"
  },
  {
    id: 3,
    name: "Coffee Collective",
    bookings: 18,
    revenue: 3240.75,
    lastBooking: "06/02/2025",
    status: "active"
  },
  {
    id: 4,
    name: "Productive Café",
    bookings: 27,
    revenue: 5430.25,
    lastBooking: "05/25/2025",
    status: "active"
  },
  {
    id: 5,
    name: "Quiet Corner",
    bookings: 39,
    revenue: 7150.80,
    lastBooking: "06/01/2025",
    status: "pending"
  },
  {
    id: 6,
    name: "Tech Lounge",
    bookings: 21,
    revenue: 4120.30,
    lastBooking: "05/30/2025",
    status: "active"
  }
];

export default function AdminVenuesPage() {
  const [venues, setVenues] = useState(mockVenues);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof mockVenues[0],
    direction: 'ascending' | 'descending'
  } | null>(null);

  // Sorting function
  const sortVenues = (key: keyof typeof mockVenues[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    const sortedVenues = [...venues].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setVenues(sortedVenues);
    setSortConfig({ key, direction });
  };

  // Helper function to get the sort icon
  const getSortIcon = (key: keyof typeof mockVenues[0]) => {
    if (!sortConfig || sortConfig.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-muted-foreground">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      );
    }
    
    return sortConfig.direction === 'ascending' ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let className = "px-2 py-1 text-xs rounded-full ";
    
    if (status === "active") {
      className += "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    } else if (status === "pending") {
      className += "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    } else {
      className += "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    }
    
    return (
      <span className={className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Venue Directory</h1>
        
        <Link 
          href="/admin/venues/pending" 
          className="btn-primary py-2"
        >
          Review Pending Venues
        </Link>
      </div>
      
      <div className="workout-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortVenues('name')}
                  >
                    <span>Venue Name</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortVenues('bookings')}
                  >
                    <span>Bookings</span>
                    {getSortIcon('bookings')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortVenues('revenue')}
                  >
                    <span>Revenue</span>
                    {getSortIcon('revenue')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortVenues('lastBooking')}
                  >
                    <span>Last Booking</span>
                    {getSortIcon('lastBooking')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Account</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id} className="border-b border-border hover:bg-accent/10">
                  <td className="px-4 py-4">{venue.name}</td>
                  <td className="px-4 py-4">{venue.bookings}</td>
                  <td className="px-4 py-4">${venue.revenue.toFixed(2)}</td>
                  <td className="px-4 py-4">{venue.lastBooking}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={venue.status} />
                  </td>
                  <td className="px-4 py-4">
                    <Link 
                      href={`/admin/venues/${venue.id}`}
                      className="p-2 rounded-full hover:bg-accent inline-flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}