"use client";

import { useState } from "react";
import VenueLayout from "@/app/venue/layout";

interface RevenueData {
  date: string;
  bookings: number;
  foodOrders: number;
  total: number;
}

interface FinancialSummary {
  totalRevenue: number;
  bookingsRevenue: number;
  foodRevenue: number;
  platformFees: number;
  payouts: number;
  pendingPayout: number;
}

export default function VenueReportsPage() {
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year">("month");
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf" | "excel">("csv");
  
  // Sample financial summary data
  const financialSummary: FinancialSummary = {
    totalRevenue: 24850.75,
    bookingsRevenue: 18650.50,
    foodRevenue: 6200.25,
    platformFees: 1242.54,
    payouts: 22366.00,
    pendingPayout: 1242.21
  };
  
  // Sample revenue data for different date ranges
  const revenueData: Record<string, RevenueData[]> = {
    week: [
      { date: "Monday", bookings: 250, foodOrders: 125, total: 375 },
      { date: "Tuesday", bookings: 320, foodOrders: 180, total: 500 },
      { date: "Wednesday", bookings: 380, foodOrders: 195, total: 575 },
      { date: "Thursday", bookings: 410, foodOrders: 230, total: 640 },
      { date: "Friday", bookings: 560, foodOrders: 325, total: 885 },
      { date: "Saturday", bookings: 650, foodOrders: 390, total: 1040 },
      { date: "Sunday", bookings: 420, foodOrders: 210, total: 630 },
    ],
    month: [
      { date: "Week 1", bookings: 2100, foodOrders: 1250, total: 3350 },
      { date: "Week 2", bookings: 2350, foodOrders: 1380, total: 3730 },
      { date: "Week 3", bookings: 2450, foodOrders: 1420, total: 3870 },
      { date: "Week 4", bookings: 2680, foodOrders: 1560, total: 4240 },
    ],
    quarter: [
      { date: "January", bookings: 8500, foodOrders: 4200, total: 12700 },
      { date: "February", bookings: 9200, foodOrders: 4800, total: 14000 },
      { date: "March", bookings: 9800, foodOrders: 5100, total: 14900 },
    ],
    year: [
      { date: "Q1", bookings: 28500, foodOrders: 14500, total: 43000 },
      { date: "Q2", bookings: 32000, foodOrders: 16800, total: 48800 },
      { date: "Q3", bookings: 35500, foodOrders: 18200, total: 53700 },
      { date: "Q4", bookings: 42000, foodOrders: 22500, total: 64500 },
    ],
  };
  
  // Sample top performing items
  const topItems = [
    { name: "Workspace - Private Desk", revenue: 8450, percentage: 34 },
    { name: "Workspace - Meeting Room", revenue: 6350, percentage: 25.5 },
    { name: "Workspace - Open Area", revenue: 3850, percentage: 15.5 },
    { name: "Food - Artisan Coffee", revenue: 2150, percentage: 8.6 },
    { name: "Food - Sandwich Platter", revenue: 1750, percentage: 7 },
  ];
  
  // Sample payout history
  const payoutHistory = [
    { id: "payout-001", date: "Aug 1, 2025", amount: 5620.50, status: "completed" },
    { id: "payout-002", date: "Jul 15, 2025", amount: 6245.75, status: "completed" },
    { id: "payout-003", date: "Jul 1, 2025", amount: 5380.25, status: "completed" },
    { id: "payout-004", date: "Jun 15, 2025", amount: 5119.50, status: "completed" },
  ];
  
  const handleExportReport = () => {
    alert(`Exporting report in ${exportFormat.toUpperCase()} format`);
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Revenue Reports</h1>
          <p className="text-muted-foreground">
            Track and analyze your venue's financial performance
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center bg-muted rounded-md p-1">
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                dateRange === "week"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setDateRange("week")}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                dateRange === "month"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setDateRange("month")}
            >
              Month
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                dateRange === "quarter"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setDateRange("quarter")}
            >
              Quarter
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                dateRange === "year"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setDateRange("year")}
            >
              Year
            </button>
          </div>
          
          <div className="flex items-center">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as any)}
              className="px-2 py-1 text-sm border border-border rounded-l-md bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
            <button
              onClick={handleExportReport}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90"
            >
              Export
            </button>
          </div>
        </div>
      </div>
      
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="workout-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <h3 className="text-2xl font-bold">${financialSummary.totalRevenue.toLocaleString()}</h3>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Bookings</span>
              <p className="text-sm font-medium">${financialSummary.bookingsRevenue.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Food & Drinks</span>
              <p className="text-sm font-medium">${financialSummary.foodRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="workout-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Platform Fees</p>
          <h3 className="text-2xl font-bold">${financialSummary.platformFees.toLocaleString()}</h3>
          <div className="mt-4">
            <div className="w-full h-1.5 bg-accent/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary"
                style={{ width: `${(financialSummary.platformFees / financialSummary.totalRevenue) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((financialSummary.platformFees / financialSummary.totalRevenue) * 100).toFixed(1)}% of total revenue
            </p>
          </div>
        </div>
        
        <div className="workout-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Payouts</p>
          <h3 className="text-2xl font-bold">${financialSummary.payouts.toLocaleString()}</h3>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Pending</span>
              <span className="text-sm font-medium">${financialSummary.pendingPayout.toLocaleString()}</span>
            </div>
            <div className="w-full h-1.5 bg-accent/50 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-amber-500"
                style={{ width: `${(financialSummary.pendingPayout / (financialSummary.payouts + financialSummary.pendingPayout)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue Chart */}
      <div className="workout-card p-6 mb-8">
        <h3 className="text-lg font-medium mb-6">Revenue Overview</h3>
        <div className="h-80 flex items-center justify-center bg-accent/20 rounded-md">
          <p className="text-muted-foreground">Revenue chart visualization would appear here</p>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          {revenueData[dateRange].map((item, index) => (
            <div key={index} className="p-4 bg-accent/10 rounded-md">
              <p className="text-sm font-medium">{item.date}</p>
              <h4 className="text-xl font-bold mt-1">${item.total}</h4>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Bookings</p>
                  <p className="font-medium">${item.bookings}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Food</p>
                  <p className="font-medium">${item.foodOrders}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Items & Payout History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Performing Items */}
        <div className="workout-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium">Top Performing Items</h3>
          </div>
          <div className="divide-y divide-border">
            {topItems.map((item, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-medium">${item.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-accent/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {item.percentage}% of total revenue
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Payout History */}
        <div className="workout-card overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-medium">Payout History</h3>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="divide-y divide-border">
            {payoutHistory.map((payout) => (
              <div key={payout.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">${payout.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{payout.date}</p>
                </div>
                <div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 capitalize">
                    {payout.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Detailed Reports */}
      <div className="workout-card p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Detailed Reports</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-accent/50 rounded-md hover:bg-accent/70">
              Custom Date Range
            </button>
            <button className="px-3 py-1 text-sm bg-accent/50 rounded-md hover:bg-accent/70">
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Food & Drinks
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Platform Fee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Net Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-accent/10">
                <td className="px-4 py-3 whitespace-nowrap">Aug 5, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap">$450.00</td>
                <td className="px-4 py-3 whitespace-nowrap">$230.50</td>
                <td className="px-4 py-3 whitespace-nowrap">$34.02</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium">$646.48</td>
              </tr>
              <tr className="hover:bg-accent/10">
                <td className="px-4 py-3 whitespace-nowrap">Aug 4, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap">$375.00</td>
                <td className="px-4 py-3 whitespace-nowrap">$195.75</td>
                <td className="px-4 py-3 whitespace-nowrap">$28.54</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium">$542.21</td>
              </tr>
              <tr className="hover:bg-accent/10">
                <td className="px-4 py-3 whitespace-nowrap">Aug 3, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap">$525.00</td>
                <td className="px-4 py-3 whitespace-nowrap">$280.25</td>
                <td className="px-4 py-3 whitespace-nowrap">$40.26</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium">$764.99</td>
              </tr>
              <tr className="hover:bg-accent/10">
                <td className="px-4 py-3 whitespace-nowrap">Aug 2, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap">$600.00</td>
                <td className="px-4 py-3 whitespace-nowrap">$350.00</td>
                <td className="px-4 py-3 whitespace-nowrap">$47.50</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium">$902.50</td>
              </tr>
              <tr className="hover:bg-accent/10">
                <td className="px-4 py-3 whitespace-nowrap">Aug 1, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap">$525.00</td>
                <td className="px-4 py-3 whitespace-nowrap">$265.75</td>
                <td className="px-4 py-3 whitespace-nowrap">$39.54</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium">$751.21</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing 5 of 31 entries
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-accent/50 rounded-md hover:bg-accent/70 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-accent/50 rounded-md hover:bg-accent/70">
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Report Settings */}
      <div className="workout-card p-6">
        <h3 className="text-lg font-medium mb-4">Report Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Default Date Range
            </label>
            <select
              className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
              defaultValue="month"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="quarter">Quarter</option>
              <option value="year">Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Default Export Format
            </label>
            <select
              className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
              defaultValue="csv"
            >
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Reports
            </label>
            <select
              className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
              defaultValue="weekly"
            >
              <option value="never">Never</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Report Recipients
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
              placeholder="Enter email addresses"
              defaultValue="manager@coffeecollective.com"
            />
            <p className="text-xs text-muted-foreground mt-1">Separate multiple emails with commas</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="btn-primary py-2 px-4">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}