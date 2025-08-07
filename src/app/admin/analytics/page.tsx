"use client";

import { useState } from "react";

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

interface TopItem {
  id: number;
  name: string;
  value: number;
  change: number;
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("month");
  
  // Sample data for metrics cards
  const metricCards: MetricCard[] = [
    {
      title: "Total Revenue",
      value: "$124,592.45",
      change: 12.5,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Total Bookings",
      value: "3,428",
      change: 8.2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      )
    },
    {
      title: "Active Users",
      value: "18,249",
      change: 5.1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      title: "New Venues",
      value: "142",
      change: -2.8,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    }
  ];
  
  // Sample data for revenue chart
  const revenueData: ChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [15000, 21000, 28000, 31000, 42000, 50000, 65000, 72000, 80000, 92000, 110000, 124000]
      }
    ]
  };
  
  // Sample data for bookings chart
  const bookingsData: ChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Bookings",
        data: [230, 380, 420, 550, 620, 700, 780, 860, 920, 1050, 1150, 1280]
      }
    ]
  };
  
  // Sample data for top venues
  const topVenues: TopItem[] = [
    { id: 1, name: "Urban Workspace", value: 428, change: 12.5 },
    { id: 2, name: "The Coffee Collective", value: 392, change: 8.2 },
    { id: 3, name: "Digital Nomad Hub", value: 356, change: 15.3 },
    { id: 4, name: "The Productive Cafe", value: 312, change: 6.7 },
    { id: 5, name: "The Library Lounge", value: 298, change: -2.3 }
  ];
  
  // Sample data for top cities
  const topCities: TopItem[] = [
    { id: 1, name: "New York", value: 1245, change: 7.8 },
    { id: 2, name: "Brooklyn", value: 845, change: 15.2 },
    { id: 3, name: "Manhattan", value: 632, change: 5.5 },
    { id: 4, name: "Queens", value: 425, change: 9.3 },
    { id: 5, name: "Bronx", value: 281, change: 12.7 }
  ];
  
  // Sample data for order types
  const orderTypes = [
    { name: "Workspace Bookings", percentage: 65 },
    { name: "Food Orders", percentage: 25 },
    { name: "Beverage Orders", percentage: 10 }
  ];
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track key metrics and performance indicators
          </p>
        </div>
        
        <div className="flex items-center bg-muted rounded-md p-1">
          <button
            className={`px-3 py-1 text-sm font-medium rounded ${
              timeRange === "day"
                ? "bg-white dark:bg-secondary shadow-sm"
                : "text-muted-foreground"
            }`}
            onClick={() => setTimeRange("day")}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 text-sm font-medium rounded ${
              timeRange === "week"
                ? "bg-white dark:bg-secondary shadow-sm"
                : "text-muted-foreground"
            }`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 text-sm font-medium rounded ${
              timeRange === "month"
                ? "bg-white dark:bg-secondary shadow-sm"
                : "text-muted-foreground"
            }`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
          <button
            className={`px-3 py-1 text-sm font-medium rounded ${
              timeRange === "year"
                ? "bg-white dark:bg-secondary shadow-sm"
                : "text-muted-foreground"
            }`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricCards.map((metric, index) => (
          <div key={index} className="workout-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
              </div>
              <div className={`p-2 rounded-full ${metric.change >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                {metric.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${metric.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {metric.change >= 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs previous {timeRange}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="workout-card p-6">
          <h3 className="text-lg font-medium mb-6">Revenue Overview</h3>
          <div className="h-72 flex items-center justify-center bg-accent/20 rounded-md">
            <p className="text-muted-foreground">Revenue chart visualization would appear here</p>
          </div>
        </div>
        
        {/* Bookings Chart */}
        <div className="workout-card p-6">
          <h3 className="text-lg font-medium mb-6">Bookings Overview</h3>
          <div className="h-72 flex items-center justify-center bg-accent/20 rounded-md">
            <p className="text-muted-foreground">Bookings chart visualization would appear here</p>
          </div>
        </div>
      </div>
      
      {/* Top Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Venues */}
        <div className="workout-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium">Top Performing Venues</h3>
          </div>
          <div className="divide-y divide-border">
            {topVenues.map((venue) => (
              <div key={venue.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/50 mr-3">
                    {venue.id}
                  </div>
                  <span className="font-medium">{venue.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-4">{venue.value} bookings</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${venue.change >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {venue.change >= 0 ? '+' : ''}{venue.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Cities */}
        <div className="workout-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium">Top Cities</h3>
          </div>
          <div className="divide-y divide-border">
            {topCities.map((city) => (
              <div key={city.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/50 mr-3">
                    {city.id}
                  </div>
                  <span className="font-medium">{city.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-4">{city.value} bookings</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${city.change >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {city.change >= 0 ? '+' : ''}{city.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Order Types and Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Types */}
        <div className="workout-card p-6">
          <h3 className="text-lg font-medium mb-6">Order Distribution</h3>
          <div className="space-y-4">
            {orderTypes.map((type, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{type.name}</span>
                  <span className="text-sm font-medium">{type.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-accent/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${type.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* User Demographics */}
        <div className="workout-card p-6">
          <h3 className="text-lg font-medium mb-6">User Demographics</h3>
          <div className="h-48 flex items-center justify-center bg-accent/20 rounded-md">
            <p className="text-muted-foreground">User demographics visualization would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}