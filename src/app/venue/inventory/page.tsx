"use client";

import { useState } from "react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  costPerUnit: number;
  supplier: string;
  lastUpdated: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

interface ActivityLog {
  id: string;
  type: "added" | "adjusted" | "removed" | "reordered";
  itemName: string;
  quantity: number;
  date: string;
  user: string;
  notes?: string;
}

export default function VenueInventoryPage() {
  const [activeTab, setActiveTab] = useState<"all" | "food" | "beverages" | "supplies">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in-stock" | "low-stock" | "out-of-stock">("all");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  
  // Sample inventory items
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: "item-1",
      name: "Coffee Beans (Dark Roast)",
      category: "beverages",
      quantity: 25,
      unit: "kg",
      reorderLevel: 10,
      costPerUnit: 18.50,
      supplier: "Artisan Coffee Suppliers",
      lastUpdated: "Aug 3, 2025",
      status: "in-stock"
    },
    {
      id: "item-2",
      name: "Almond Milk",
      category: "beverages",
      quantity: 12,
      unit: "L",
      reorderLevel: 8,
      costPerUnit: 3.75,
      supplier: "Organic Daily",
      lastUpdated: "Aug 5, 2025",
      status: "in-stock"
    },
    {
      id: "item-3",
      name: "Croissants",
      category: "food",
      quantity: 6,
      unit: "dozen",
      reorderLevel: 3,
      costPerUnit: 14.99,
      supplier: "Baker's Delight",
      lastUpdated: "Aug 7, 2025",
      status: "low-stock"
    },
    {
      id: "item-4",
      name: "Sandwich Bread",
      category: "food",
      quantity: 8,
      unit: "loaf",
      reorderLevel: 5,
      costPerUnit: 4.25,
      supplier: "Baker's Delight",
      lastUpdated: "Aug 6, 2025",
      status: "in-stock"
    },
    {
      id: "item-5",
      name: "Paper Cups (16oz)",
      category: "supplies",
      quantity: 150,
      unit: "pcs",
      reorderLevel: 100,
      costPerUnit: 0.15,
      supplier: "EcoSupplies Inc.",
      lastUpdated: "Jul 28, 2025",
      status: "in-stock"
    },
    {
      id: "item-6",
      name: "Disposable Napkins",
      category: "supplies",
      quantity: 50,
      unit: "pack",
      reorderLevel: 20,
      costPerUnit: 3.99,
      supplier: "EcoSupplies Inc.",
      lastUpdated: "Aug 2, 2025",
      status: "low-stock"
    },
    {
      id: "item-7",
      name: "Vanilla Syrup",
      category: "beverages",
      quantity: 0,
      unit: "bottle",
      reorderLevel: 5,
      costPerUnit: 8.75,
      supplier: "Flavor Essentials",
      lastUpdated: "Jul 25, 2025",
      status: "out-of-stock"
    },
    {
      id: "item-8",
      name: "Avocado",
      category: "food",
      quantity: 15,
      unit: "pcs",
      reorderLevel: 10,
      costPerUnit: 1.25,
      supplier: "Fresh Produce Co.",
      lastUpdated: "Aug 6, 2025",
      status: "in-stock"
    }
  ]);
  
  // Get items by category
  const getItemsByCategory = (category: string) => {
    if (category === "all") {
      return inventoryItems;
    }
    return inventoryItems.filter(item => item.category === category);
  };
  
  // Sample activity log data
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([
    {
      id: "activity-1",
      type: "added",
      itemName: "Almond Milk",
      quantity: 12,
      date: "Aug 5, 2025",
      user: "Jane Doe",
      notes: "Regular delivery from Organic Daily"
    },
    {
      id: "activity-2",
      type: "adjusted",
      itemName: "Croissants",
      quantity: -4,
      date: "Aug 7, 2025",
      user: "Michael Johnson",
      notes: "Adjusted inventory after quality check"
    },
    {
      id: "activity-3",
      type: "removed",
      itemName: "Vanilla Syrup",
      quantity: -5,
      date: "Jul 25, 2025",
      user: "John Smith",
      notes: "Expired product removed from inventory"
    },
    {
      id: "activity-4",
      type: "added",
      itemName: "Avocado",
      quantity: 15,
      date: "Aug 6, 2025",
      user: "Jane Doe"
    },
    {
      id: "activity-5",
      type: "added",
      itemName: "Sandwich Bread",
      quantity: 8,
      date: "Aug 6, 2025",
      user: "Jane Doe"
    },
    {
      id: "activity-6",
      type: "reordered",
      itemName: "Vanilla Syrup",
      quantity: 10,
      date: "Aug 7, 2025",
      user: "John Smith",
      notes: "Expedited delivery requested"
    }
  ]);

  // Filter items by status
  const filterItemsByStatus = (items: InventoryItem[]) => {
    if (statusFilter === "all") {
      return items;
    }
    return items.filter(item => item.status === statusFilter);
  };

  // Filter items by search query and status
  const filteredItems = filterItemsByStatus(getItemsByCategory(activeTab).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  ));
  
  // Group items by status
  const itemsByStatus = {
    "out-of-stock": filteredItems.filter(item => item.status === "out-of-stock"),
    "low-stock": filteredItems.filter(item => item.status === "low-stock"),
    "in-stock": filteredItems.filter(item => item.status === "in-stock")
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "low-stock":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "out-of-stock":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  // Get activity type badge class
  const getActivityBadgeClass = (type: string) => {
    switch (type) {
      case "added":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "adjusted":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "removed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "reordered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  // Calculate inventory stats
  const inventoryStats = {
    totalItems: filteredItems.length,
    totalValue: filteredItems.reduce((sum, item) => sum + (item.quantity * item.costPerUnit), 0),
    lowStockItems: filteredItems.filter(item => item.status === "low-stock").length,
    outOfStockItems: filteredItems.filter(item => item.status === "out-of-stock").length
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage your venue's inventory
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => setShowSupplierModal(true)}
            className="px-4 py-2 border border-border rounded-md hover:bg-accent/50 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            Suppliers
          </button>
          <button 
            onClick={() => setShowActivityModal(true)}
            className="px-4 py-2 border border-border rounded-md hover:bg-accent/50 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Activity Log
          </button>
          <button 
            onClick={() => setShowAddItemModal(true)}
            className="btn-primary py-2 px-4 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Item
          </button>
        </div>
      </div>
      
      {/* Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="workout-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Items</p>
          <h3 className="text-2xl font-bold">{inventoryStats.totalItems}</h3>
        </div>
        
        <div className="workout-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Inventory Value</p>
          <h3 className="text-2xl font-bold">${inventoryStats.totalValue.toFixed(2)}</h3>
        </div>
        
        <div className="workout-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Low Stock Items</p>
          <h3 className="text-2xl font-bold">{inventoryStats.lowStockItems}</h3>
        </div>
        
        <div className="workout-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Out of Stock</p>
          <h3 className="text-2xl font-bold">{inventoryStats.outOfStockItems}</h3>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="workout-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Tabs */}
          <div className="flex items-center bg-muted rounded-md p-1">
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === "all"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === "food"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("food")}
            >
              Food
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === "beverages"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("beverages")}
            >
              Beverages
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === "supplies"
                  ? "bg-white dark:bg-secondary shadow-sm"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("supplies")}
            >
              Supplies
            </button>
          </div>
          
          {/* Search & Status Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items or suppliers..."
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
            
            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
              >
                <option value="all">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Out of Stock Items */}
      {itemsByStatus["out-of-stock"].length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <h2 className="text-lg font-medium">Out of Stock Items</h2>
          </div>
          
          <div className="workout-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {itemsByStatus["out-of-stock"].map((item) => (
                    <tr key={item.id} className="hover:bg-accent/10">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                          {item.quantity} {item.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="btn-primary py-1 px-3 text-sm">
                          Reorder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Low Stock Items */}
      {itemsByStatus["low-stock"].length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <h2 className="text-lg font-medium">Low Stock Items</h2>
          </div>
          
          <div className="workout-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Reorder Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {itemsByStatus["low-stock"].map((item) => (
                    <tr key={item.id} className="hover:bg-accent/10">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                          {item.quantity} {item.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.reorderLevel} {item.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="btn-primary py-1 px-3 text-sm">
                          Reorder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* In Stock Items */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <h2 className="text-lg font-medium">In Stock Items</h2>
        </div>
        
        <div className="workout-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Reorder Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Cost per Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {itemsByStatus["in-stock"].length > 0 ? (
                  itemsByStatus["in-stock"].map((item) => (
                    <tr key={item.id} className="hover:bg-accent/10">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                          {item.quantity} {item.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.reorderLevel} {item.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.costPerUnit.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-primary hover:text-primary/80">
                            Edit
                          </button>
                          <button className="text-muted-foreground hover:text-foreground">
                            Adjust
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-muted-foreground">
                      No in-stock items found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Recent Inventory Activity</h2>
          <button 
            onClick={() => setShowActivityModal(true)}
            className="text-sm text-primary hover:underline"
          >
            View All
          </button>
        </div>
        
        <div className="workout-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activityLog.slice(0, 5).map((activity) => (
                  <tr key={activity.id} className="hover:bg-accent/10">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityBadgeClass(activity.type)}`}>
                        {activity.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.quantity > 0 ? "+" : ""}{activity.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Add Inventory Item</h3>
                <button 
                  onClick={() => setShowAddItemModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="itemName" className="block text-sm font-medium mb-2">
                      Item Name
                    </label>
                    <input
                      type="text"
                      id="itemName"
                      className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                      placeholder="Enter item name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="food">Food</option>
                      <option value="beverages">Beverages</option>
                      <option value="supplies">Supplies</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        min="0"
                        step="0.01"
                        className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="unit" className="block text-sm font-medium mb-2">
                        Unit
                      </label>
                      <input
                        type="text"
                        id="unit"
                        className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                        placeholder="kg, L, pcs, etc."
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reorderLevel" className="block text-sm font-medium mb-2">
                        Reorder Level
                      </label>
                      <input
                        type="number"
                        id="reorderLevel"
                        min="0"
                        className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="costPerUnit" className="block text-sm font-medium mb-2">
                        Cost per Unit ($)
                      </label>
                      <input
                        type="number"
                        id="costPerUnit"
                        min="0"
                        step="0.01"
                        className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="supplier" className="block text-sm font-medium mb-2">
                      Supplier
                    </label>
                    <select
                      id="supplier"
                      className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                      required
                    >
                      <option value="">Select a supplier</option>
                      <option value="Artisan Coffee Suppliers">Artisan Coffee Suppliers</option>
                      <option value="Organic Daily">Organic Daily</option>
                      <option value="Baker's Delight">Baker's Delight</option>
                      <option value="EcoSupplies Inc.">EcoSupplies Inc.</option>
                      <option value="Flavor Essentials">Flavor Essentials</option>
                      <option value="Fresh Produce Co.">Fresh Produce Co.</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddItemModal(false)}
                    className="px-4 py-2 border border-border rounded-md hover:bg-accent/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Activity Log Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Inventory Activity Log</h3>
                <button 
                  onClick={() => setShowActivityModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search activities..."
                    className="w-full p-2 pr-10 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-muted-foreground">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center bg-muted rounded-md p-1">
                  <button className="px-3 py-1 text-sm font-medium rounded bg-white dark:bg-secondary shadow-sm">
                    All
                  </button>
                  <button className="px-3 py-1 text-sm font-medium rounded text-muted-foreground">
                    Added
                  </button>
                  <button className="px-3 py-1 text-sm font-medium rounded text-muted-foreground">
                    Adjusted
                  </button>
                  <button className="px-3 py-1 text-sm font-medium rounded text-muted-foreground">
                    Removed
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-accent/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {activityLog.map((activity) => (
                      <tr key={activity.id} className="hover:bg-accent/10">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {activity.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityBadgeClass(activity.type)}`}>
                            {activity.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {activity.itemName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {activity.quantity > 0 ? "+" : ""}{activity.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {activity.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {activity.notes || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing all {activityLog.length} activities
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
          </div>
        </div>
      )}
      
      {/* Supplier Modal */}
      {showSupplierModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Suppliers</h3>
                <button 
                  onClick={() => setShowSupplierModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-end mb-4">
                <button className="btn-primary py-2 px-4 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Supplier
                </button>
              </div>
              
              <div className="workout-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-accent/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Supplier
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Items Supplied
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-accent/10">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">Artisan Coffee Suppliers</div>
                        <div className="text-xs text-muted-foreground">Premium coffee supplier</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">contact@artisancoffee.com</div>
                        <div className="text-xs text-muted-foreground">555-123-4567</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">1 item</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-primary hover:text-primary/80">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-accent/10">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">Organic Daily</div>
                        <div className="text-xs text-muted-foreground">Organic dairy products</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">orders@organicdaily.com</div>
                        <div className="text-xs text-muted-foreground">555-234-5678</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">1 item</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-primary hover:text-primary/80">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-accent/10">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">Baker's Delight</div>
                        <div className="text-xs text-muted-foreground">Fresh baked goods</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">sales@bakersdelight.com</div>
                        <div className="text-xs text-muted-foreground">555-345-6789</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">2 items</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-primary hover:text-primary/80">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-accent/10">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">EcoSupplies Inc.</div>
                        <div className="text-xs text-muted-foreground">Eco-friendly disposables</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">info@ecosupplies.com</div>
                        <div className="text-xs text-muted-foreground">555-456-7890</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">2 items</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-primary hover:text-primary/80">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-accent/10">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">Flavor Essentials</div>
                        <div className="text-xs text-muted-foreground">Coffee syrups and flavorings</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">support@flavoressentials.com</div>
                        <div className="text-xs text-muted-foreground">555-567-8901</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">1 item</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-primary hover:text-primary/80">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-accent/10">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">Fresh Produce Co.</div>
                        <div className="text-xs text-muted-foreground">Fresh fruits and vegetables</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">orders@freshproduce.com</div>
                        <div className="text-xs text-muted-foreground">555-678-9012</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">1 item</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-primary hover:text-primary/80">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}