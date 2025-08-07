"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DemoPage() {
  const features = [
    {
      title: "User Dashboard",
      description: "Access your bookings, favorites, and reviews",
      items: [
        { name: "Bookings", href: "/user/bookings", description: "View and manage your workspace bookings" },
        { name: "Favorites", href: "/user/favorites", description: "Access your saved workspaces" },
        { name: "Reviews", href: "/user/reviews", description: "See reviews you've left for workspaces" },
        { name: "Payment Methods", href: "/user/payment-methods", description: "Manage your payment methods" },
        { name: "Payment History", href: "/user/payment-history", description: "View your payment and invoice history" },
        { name: "Profile", href: "/user/profile", description: "Update your profile information" },
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Venue Dashboard",
      description: "Manage your listed workspace",
      items: [
        { name: "Dashboard", href: "/venue/dashboard", description: "Overview of your venue performance" },
        { name: "Bookings", href: "/venue/bookings", description: "Manage incoming bookings" },
        { name: "Live Orders", href: "/venue/orders", description: "View and fulfill food/beverage orders" },
        { name: "Menu", href: "/venue/menu", description: "Manage your food and beverage offerings" },
        { name: "Reports", href: "/venue/reports", description: "View financial reports and analytics" },
        { name: "Staff", href: "/venue/staff", description: "Manage staff members and roles" },
        { name: "Inventory", href: "/venue/inventory", description: "Track and manage your inventory" },
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      ),
      color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      title: "Admin Dashboard",
      description: "Manage the entire platform",
      items: [
        { name: "Dashboard", href: "/admin/dashboard", description: "Platform overview and metrics" },
        { name: "Users", href: "/admin/users", description: "Manage user accounts" },
        { name: "Venues", href: "/admin/venues", description: "Manage workspace listings" },
        { name: "Settings", href: "/admin/settings", description: "Platform configuration" },
        { name: "Content", href: "/admin/content", description: "Manage site content" },
        { name: "Analytics", href: "/admin/analytics", description: "Platform analytics and reports" },
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      title: "Venue Enrollment",
      description: "List your workspace on the platform",
      items: [
        { name: "Welcome", href: "/venue-enrollment", description: "Start the enrollment process" },
        { name: "Basic Info", href: "/venue-enrollment/steps", description: "Enter venue details" },
        { name: "Photos", href: "/venue-enrollment/photos", description: "Upload venue photos" },
        { name: "Documents", href: "/venue-enrollment/documents", description: "Verify your business" },
        { name: "Payment Setup", href: "/venue-enrollment/payment", description: "Set up payment information" },
        { name: "Confirmation", href: "/venue-enrollment/confirmation", description: "Complete the enrollment" },
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
  ];

  const publicFeatures = [
    {
      name: "Find Workspace",
      href: "/find-workspace",
      description: "Search for workspaces with advanced filters",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      name: "Venue Details",
      href: "/venues/1",
      description: "View details about a specific workspace",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      name: "Order Food/Drinks",
      href: "/venues/1/order",
      description: "Order food and drinks from a venue",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      name: "Notifications",
      href: "/notifications",
      description: "View your notifications",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow workout-container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">WorkOut Features Demo</h1>
            <p className="text-xl text-muted-foreground">
              Explore all the features available in the WorkOut web application
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">User Roles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="workout-card overflow-hidden flex flex-col">
                  <div className={`p-6 ${feature.color} flex items-center gap-4`}>
                    <div>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{feature.title}</h3>
                      <p className="text-sm">{feature.description}</p>
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      {feature.items.map((item) => (
                        <li key={item.name}>
                          <Link 
                            href={item.href}
                            className="flex items-center hover:text-primary transition-colors"
                          >
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">→</span>
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">{item.description}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Public Features</h2>
            <div className="workout-card p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publicFeatures.map((feature) => (
                  <li key={feature.name}>
                    <Link 
                      href={feature.href}
                      className="flex items-center p-3 rounded-md hover:bg-accent transition-colors"
                    >
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                        {feature.icon}
                      </span>
                      <div>
                        <span className="font-medium block">{feature.name}</span>
                        <span className="text-sm text-muted-foreground">{feature.description}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              This demo page helps you navigate and explore all the features implemented in the WorkOut application.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}