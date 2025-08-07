"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  category: "system" | "booking" | "payment" | "message" | "promotion";
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  
  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "notif_1",
        title: "Booking Confirmed",
        message: "Your booking at Urban Coffee Co. has been confirmed for August 10, 2:00 PM. We're looking forward to hosting you!",
        type: "success",
        timestamp: new Date(2025, 7, 7, 14, 23), // August 7, 2025, 2:23 PM
        read: false,
        actionUrl: "/user/bookings",
        actionText: "View Booking",
        category: "booking"
      },
      {
        id: "notif_2",
        title: "New Message from Tech Hub",
        message: "You have a new message from Tech Hub regarding your upcoming reservation: 'Hi there! Just confirming your booking for tomorrow. We've reserved a quiet corner spot as requested.'",
        type: "info",
        timestamp: new Date(2025, 7, 6, 9, 12), // August 6, 2025, 9:12 AM
        read: false,
        actionUrl: "/user/messages",
        actionText: "Read Message",
        category: "message"
      },
      {
        id: "notif_3",
        title: "Limited Availability Alert",
        message: "The venue you're viewing (Coastal Workspace) is almost fully booked for August 15th. Only 2 spots remaining at your preferred time.",
        type: "warning",
        timestamp: new Date(2025, 7, 5, 16, 45), // August 5, 2025, 4:45 PM
        read: true,
        category: "system"
      },
      {
        id: "notif_4",
        title: "Credit Applied to Account",
        message: "$15.00 in workspace credit has been applied to your account. This credit will be automatically applied to your next booking.",
        type: "success",
        timestamp: new Date(2025, 7, 3, 11, 30), // August 3, 2025, 11:30 AM
        read: true,
        actionUrl: "/user/credits",
        actionText: "View Credits",
        category: "payment"
      },
      {
        id: "notif_5",
        title: "Payment Failed",
        message: "Your recent payment for booking #WO-78423 could not be processed. Please update your payment method or try a different card.",
        type: "error",
        timestamp: new Date(2025, 7, 1, 13, 15), // August 1, 2025, 1:15 PM
        read: true,
        actionUrl: "/user/payment-methods",
        actionText: "Update Payment",
        category: "payment"
      },
      {
        id: "notif_6",
        title: "Weekend Promotion",
        message: "Enjoy 20% off all weekend bookings at participating venues this month. Use code WEEKEND20 at checkout.",
        type: "info",
        timestamp: new Date(2025, 6, 28, 9, 0), // July 28, 2025, 9:00 AM
        read: true,
        category: "promotion"
      },
      {
        id: "notif_7",
        title: "Booking Reminder",
        message: "Reminder: You have a booking tomorrow at Creative Space from 10:00 AM to 4:00 PM.",
        type: "info",
        timestamp: new Date(2025, 6, 25, 15, 0), // July 25, 2025, 3:00 PM
        read: true,
        actionUrl: "/user/bookings",
        actionText: "View Booking",
        category: "booking"
      },
      {
        id: "notif_8",
        title: "New Feature Available",
        message: "We've just launched our new food ordering feature! You can now order food and drinks directly from participating venues.",
        type: "success",
        timestamp: new Date(2025, 6, 20, 12, 30), // July 20, 2025, 12:30 PM
        read: true,
        category: "system"
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);
  
  // Filter notifications based on category and read/unread status
  const filteredNotifications = notifications.filter(notification => {
    const categoryMatch = selectedCategory === "all" || notification.category === selectedCategory;
    const readStatusMatch = filter === "all" || 
      (filter === "read" && notification.read) || 
      (filter === "unread" && !notification.read);
    
    return categoryMatch && readStatusMatch;
  });
  
  // Handle marking a notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
  };
  
  // Handle deleting a notification
  const handleDelete = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notif => notif.id !== id)
    );
  };
  
  // Handle clearing all notifications
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  // Format timestamp for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date >= yesterday) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
        ` at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };
  
  // Get notification type styling
  const getNotificationTypeStyle = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "error":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      case "info":
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "warning":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        );
      case "error":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        );
      case "info":
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        );
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "booking":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        );
      case "payment":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        );
      case "message":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        );
      case "promotion":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
        );
      case "system":
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
    }
  };
  
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="text-primary hover:underline text-sm"
            >
              Mark all as read
            </button>
          )}
          
          {notifications.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-red-500 dark:text-red-400 hover:underline text-sm"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4">
          <div className="workout-card p-4">
            <h2 className="font-medium mb-3">Filters</h2>
            
            <div className="space-y-4">
              {/* Read Status Filter */}
              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Status</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setFilter("all")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      filter === "all" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    All Notifications
                    <span className="float-right">{notifications.length}</span>
                  </button>
                  
                  <button
                    onClick={() => setFilter("unread")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      filter === "unread" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    Unread
                    <span className="float-right">{unreadCount}</span>
                  </button>
                  
                  <button
                    onClick={() => setFilter("read")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      filter === "read" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    Read
                    <span className="float-right">{notifications.length - unreadCount}</span>
                  </button>
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === "all" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    All Categories
                  </button>
                  
                  <button
                    onClick={() => setSelectedCategory("booking")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === "booking" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center">
                      {getCategoryIcon("booking")}
                      <span className="ml-2">Bookings</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedCategory("payment")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === "payment" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center">
                      {getCategoryIcon("payment")}
                      <span className="ml-2">Payments</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedCategory("message")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === "message" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center">
                      {getCategoryIcon("message")}
                      <span className="ml-2">Messages</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedCategory("promotion")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === "promotion" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center">
                      {getCategoryIcon("promotion")}
                      <span className="ml-2">Promotions</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedCategory("system")}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === "system" ? "bg-primary text-white" : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center">
                      {getCategoryIcon("system")}
                      <span className="ml-2">System</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Link href="/" className="text-primary hover:underline text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </aside>
        
        {/* Notifications List */}
        <div className="flex-1">
          <div className="workout-card overflow-hidden">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium mb-2">No notifications found</h2>
                <p className="text-muted-foreground">
                  {filter !== "all" || selectedCategory !== "all" 
                    ? "Try changing your filters to see more notifications"
                    : "You don't have any notifications yet"}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {filteredNotifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`p-4 sm:p-6 hover:bg-accent/30 transition-colors ${!notification.read ? 'bg-accent/10' : ''}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start">
                      {/* Notification Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 ${getNotificationTypeStyle(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      {/* Notification Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="font-medium text-lg mb-1 sm:mb-0">{notification.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(notification.timestamp)}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getNotificationTypeStyle(notification.type)} mr-2`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                          
                          <span className="flex items-center text-xs text-muted-foreground">
                            {getCategoryIcon(notification.category)}
                            <span className="ml-1 capitalize">{notification.category}</span>
                          </span>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">
                          {notification.message}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-2">
                            {notification.actionUrl && (
                              <a 
                                href={notification.actionUrl} 
                                className="text-sm text-primary hover:underline"
                              >
                                {notification.actionText}
                              </a>
                            )}
                            
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="text-sm text-red-500 dark:text-red-400 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}