"use client";

import { useState } from "react";

interface Order {
  id: string;
  venue: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: "completed" | "in-progress" | "cancelled";
  total: number;
}

export default function UserOrdersPage() {
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample orders data
  const orders: Order[] = [
    {
      id: "ORD-1234",
      venue: "The Coffee Collective",
      date: "Aug 7, 2025",
      items: [
        { name: "Americano", quantity: 1, price: 3.5 },
        { name: "Croissant", quantity: 2, price: 2.25 }
      ],
      status: "completed",
      total: 8.00
    },
    {
      id: "ORD-1235",
      venue: "Urban Workspace",
      date: "Aug 5, 2025",
      items: [
        { name: "Chai Latte", quantity: 1, price: 4.25 },
        { name: "Avocado Toast", quantity: 1, price: 8.50 }
      ],
      status: "completed",
      total: 12.75
    },
    {
      id: "ORD-1236",
      venue: "The Study Hub",
      date: "Aug 3, 2025",
      items: [
        { name: "Cappuccino", quantity: 1, price: 3.75 },
        { name: "Blueberry Muffin", quantity: 1, price: 2.50 }
      ],
      status: "completed",
      total: 6.25
    },
    {
      id: "ORD-1237",
      venue: "The Coffee Collective",
      date: "Today at 2:15 PM",
      items: [
        { name: "Cold Brew", quantity: 1, price: 4.50 },
        { name: "Sandwich Combo", quantity: 1, price: 10.95 }
      ],
      status: "in-progress",
      total: 15.45
    }
  ];
  
  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter(order => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "active" && order.status === "in-progress") || 
      (activeTab === "completed" && order.status === "completed");
    
    const matchesSearch = 
      order.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      {/* Tabs & Search */}
      <div className="workout-card p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Tabs */}
          <div className="flex bg-muted rounded-md p-1">
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === "all"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Orders
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === "active"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === "completed"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pr-10 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-muted-foreground">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="workout-card overflow-hidden">
              {/* Order Header */}
              <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{order.venue}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                      {order.status === "in-progress" ? "In Progress" : order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Order {order.id} • {order.date}</p>
                </div>
                
                {order.status === "in-progress" && (
                  <button className="btn-primary py-1 px-3 text-sm">
                    Track Order
                  </button>
                )}
              </div>
              
              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex items-start">
                        <span className="text-muted-foreground mr-2">{item.quantity}×</span>
                        <span>{item.name}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Order Actions */}
              <div className="bg-accent/20 p-4 flex justify-between">
                <button className="text-primary hover:underline text-sm">View Receipt</button>
                <button className="text-primary hover:underline text-sm">Reorder</button>
              </div>
            </div>
          ))
        ) : (
          <div className="workout-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">You don't have any orders matching your criteria.</p>
            <button className="btn-primary py-2 px-4">
              Browse Workspaces
            </button>
          </div>
        )}
      </div>
    </div>
  );
}