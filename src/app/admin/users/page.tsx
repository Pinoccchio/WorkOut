"use client";

import { useState } from "react";
import Link from "next/link";

// Mock user data
const mockUsers = [
  {
    id: 1,
    firstName: "Corey",
    lastName: "Flynn",
    bookings: 45,
    revenue: 8985.00,
    lastBooking: "05/20/2025"
  },
  {
    id: 2,
    firstName: "Jessica",
    lastName: "Chen",
    bookings: 32,
    revenue: 6120.50,
    lastBooking: "05/28/2025"
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Rodriguez",
    bookings: 18,
    revenue: 3240.75,
    lastBooking: "06/02/2025"
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Johnson",
    bookings: 27,
    revenue: 5430.25,
    lastBooking: "05/25/2025"
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Kim",
    bookings: 39,
    revenue: 7150.80,
    lastBooking: "06/01/2025"
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Williams",
    bookings: 21,
    revenue: 4120.30,
    lastBooking: "05/30/2025"
  }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof mockUsers[0],
    direction: 'ascending' | 'descending'
  } | null>(null);

  // Sorting function
  const sortUsers = (key: keyof typeof mockUsers[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  // Helper function to get the sort icon
  const getSortIcon = (key: keyof typeof mockUsers[0]) => {
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Directory</h1>
      
      <div className="workout-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortUsers('firstName')}
                  >
                    <span>First Name</span>
                    {getSortIcon('firstName')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortUsers('lastName')}
                  >
                    <span>Last Name</span>
                    {getSortIcon('lastName')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortUsers('bookings')}
                  >
                    <span>Bookings</span>
                    {getSortIcon('bookings')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortUsers('revenue')}
                  >
                    <span>Revenue</span>
                    {getSortIcon('revenue')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => sortUsers('lastBooking')}
                  >
                    <span>Last Booking</span>
                    {getSortIcon('lastBooking')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Account</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-accent/10">
                  <td className="px-4 py-4">{user.firstName}</td>
                  <td className="px-4 py-4">{user.lastName}</td>
                  <td className="px-4 py-4">{user.bookings}</td>
                  <td className="px-4 py-4">${user.revenue.toFixed(2)}</td>
                  <td className="px-4 py-4">{user.lastBooking}</td>
                  <td className="px-4 py-4">
                    <Link 
                      href={`/admin/users/${user.id}`}
                      className="p-2 rounded-full hover:bg-accent inline-flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
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