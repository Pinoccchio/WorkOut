"use client";

import Link from "next/link";

export default function VenueDashboardPage() {
  // Mock data for venue dashboard
  const venueName = "The Coffee Collective";
  const dashboardData = {
    revenue: {
      today: 342.50,
      week: 2185.75,
      month: 8784.00,
    },
    bookings: {
      today: 12,
      week: 78,
      month: 312,
    },
    occupancy: {
      today: 68,
      week: 72,
      month: 75,
    },
    orders: {
      today: 34,
      week: 196,
      month: 845,
    },
    upcomingBookings: [
      {
        id: "booking-1",
        userName: "Alex Johnson",
        date: "2025-08-07",
        time: "10:00 - 12:00",
        guests: 1,
      },
      {
        id: "booking-2",
        userName: "Sarah Williams",
        date: "2025-08-07",
        time: "13:00 - 15:00",
        guests: 2,
      },
      {
        id: "booking-3",
        userName: "Michael Chen",
        date: "2025-08-08",
        time: "09:00 - 11:00",
        guests: 1,
      },
    ],
    popularItems: [
      { name: "Latte", orders: 145, revenue: 652.50 },
      { name: "Cappuccino", orders: 112, revenue: 504.00 },
      { name: "Espresso", orders: 87, revenue: 304.50 },
      { name: "Croissant", orders: 76, revenue: 304.00 },
    ],
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{venueName} Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Today: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Revenue */}
        <div className="workout-card p-4">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-1">Revenue (Today)</p>
            <p className="text-2xl font-bold">${dashboardData.revenue.today.toFixed(2)}</p>
            <div className="mt-2 text-xs">
              <span className="text-green-600 dark:text-green-400">↑ 12%</span> from yesterday
            </div>
          </div>
        </div>
        
        {/* Bookings */}
        <div className="workout-card p-4">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-1">Bookings (Today)</p>
            <p className="text-2xl font-bold">{dashboardData.bookings.today}</p>
            <div className="mt-2 text-xs">
              <span className="text-green-600 dark:text-green-400">↑ 5%</span> from yesterday
            </div>
          </div>
        </div>
        
        {/* Occupancy */}
        <div className="workout-card p-4">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-1">Occupancy (Today)</p>
            <p className="text-2xl font-bold">{dashboardData.occupancy.today}%</p>
            <div className="mt-2 text-xs">
              <span className="text-green-600 dark:text-green-400">↑ 8%</span> from yesterday
            </div>
          </div>
        </div>
        
        {/* Orders */}
        <div className="workout-card p-4">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-1">Orders (Today)</p>
            <p className="text-2xl font-bold">{dashboardData.orders.today}</p>
            <div className="mt-2 text-xs">
              <span className="text-green-600 dark:text-green-400">↑ 10%</span> from yesterday
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upcoming Bookings */}
        <div className="workout-card overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 className="font-semibold">Today's Bookings</h2>
            <Link href="/venue/bookings" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="divide-y divide-border">
            {dashboardData.upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-4">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">{booking.userName}</p>
                  <p className="text-sm text-muted-foreground">{booking.time}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</p>
                  <Link href={`/venue/bookings/${booking.id}`} className="text-primary hover:underline">
                    Details
                  </Link>
                </div>
              </div>
            ))}
            
            {dashboardData.upcomingBookings.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No bookings for today</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Popular Items */}
        <div className="workout-card overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 className="font-semibold">Popular Items (This Month)</h2>
            <Link href="/venue/menu" className="text-sm text-primary hover:underline">
              Manage Menu
            </Link>
          </div>
          
          <div className="divide-y divide-border">
            {dashboardData.popularItems.map((item, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="font-medium">${item.revenue.toFixed(2)}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.orders} orders</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Revenue Chart Placeholder */}
      <div className="workout-card p-6 mb-6">
        <h2 className="font-semibold mb-4">Revenue Overview</h2>
        <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            Revenue chart would be displayed here
            <br />
            <span className="text-sm">(Implementation requires chart library)</span>
          </p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="workout-card p-6">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            href="/venue/menu"
            className="flex flex-col items-center justify-center p-4 rounded-md bg-accent/50 hover:bg-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-sm font-medium">Add Menu Item</span>
          </Link>
          
          <Link 
            href="/venue/profile"
            className="flex flex-col items-center justify-center p-4 rounded-md bg-accent/50 hover:bg-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21h-9.5A2.25 2.25 0 014 18.75V8.25A2.25 2.25 0 016.25 6H11" />
            </svg>
            <span className="text-sm font-medium">Edit Venue Info</span>
          </Link>
          
          <Link 
            href="/venue/reports"
            className="flex flex-col items-center justify-center p-4 rounded-md bg-accent/50 hover:bg-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span className="text-sm font-medium">Download Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
}