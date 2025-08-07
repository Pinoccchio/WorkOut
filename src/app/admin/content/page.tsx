"use client";

import { useState } from "react";
import Link from "next/link";

interface ContentItem {
  id: string;
  title: string;
  type: "page" | "article" | "faq" | "email" | "notification";
  status: "published" | "draft" | "archived";
  author: string;
  lastUpdated: string;
  slug?: string;
}

interface ContentSection {
  id: string;
  title: string;
  description: string;
  items: ContentItem[];
}

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("pages");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "archived">("all");
  
  const contentSections: ContentSection[] = [
    {
      id: "pages",
      title: "Static Pages",
      description: "Manage website static pages like Home, About, and Terms of Service",
      items: [
        {
          id: "home",
          title: "Home Page",
          type: "page",
          status: "published",
          author: "Admin",
          lastUpdated: "2025-08-01",
          slug: "/"
        },
        {
          id: "about",
          title: "About Us",
          type: "page",
          status: "published",
          author: "Admin",
          lastUpdated: "2025-07-15",
          slug: "/about"
        },
        {
          id: "contact",
          title: "Contact Us",
          type: "page",
          status: "published",
          author: "Admin",
          lastUpdated: "2025-07-10",
          slug: "/contact"
        },
        {
          id: "terms",
          title: "Terms of Service",
          type: "page",
          status: "published",
          author: "Legal Team",
          lastUpdated: "2025-06-20",
          slug: "/terms"
        },
        {
          id: "privacy",
          title: "Privacy Policy",
          type: "page",
          status: "published",
          author: "Legal Team",
          lastUpdated: "2025-06-20",
          slug: "/privacy"
        },
        {
          id: "get-involved",
          title: "Get Involved",
          type: "page",
          status: "published",
          author: "Marketing",
          lastUpdated: "2025-07-05",
          slug: "/get-involved"
        },
        {
          id: "careers",
          title: "Careers",
          type: "page",
          status: "draft",
          author: "HR Team",
          lastUpdated: "2025-08-03",
          slug: "/careers"
        }
      ]
    },
    {
      id: "articles",
      title: "Blog Articles",
      description: "Manage blog articles and content marketing pieces",
      items: [
        {
          id: "article-1",
          title: "Top 10 Workspaces in NYC",
          type: "article",
          status: "published",
          author: "Jane Smith",
          lastUpdated: "2025-08-02",
          slug: "/blog/top-10-workspaces-nyc"
        },
        {
          id: "article-2",
          title: "How to Choose the Perfect Workspace",
          type: "article",
          status: "published",
          author: "John Doe",
          lastUpdated: "2025-07-25",
          slug: "/blog/choose-perfect-workspace"
        },
        {
          id: "article-3",
          title: "Benefits of Co-working Spaces",
          type: "article",
          status: "published",
          author: "Jane Smith",
          lastUpdated: "2025-07-18",
          slug: "/blog/benefits-coworking-spaces"
        },
        {
          id: "article-4",
          title: "Remote Work Trends for 2025",
          type: "article",
          status: "draft",
          author: "Alex Johnson",
          lastUpdated: "2025-08-05",
          slug: "/blog/remote-work-trends-2025"
        },
        {
          id: "article-5",
          title: "Digital Nomad Lifestyle",
          type: "article",
          status: "draft",
          author: "Sarah Williams",
          lastUpdated: "2025-08-04",
          slug: "/blog/digital-nomad-lifestyle"
        }
      ]
    },
    {
      id: "faqs",
      title: "FAQs",
      description: "Manage frequently asked questions and help center content",
      items: [
        {
          id: "faq-1",
          title: "How do I book a workspace?",
          type: "faq",
          status: "published",
          author: "Support Team",
          lastUpdated: "2025-07-10"
        },
        {
          id: "faq-2",
          title: "What payment methods are accepted?",
          type: "faq",
          status: "published",
          author: "Support Team",
          lastUpdated: "2025-07-10"
        },
        {
          id: "faq-3",
          title: "How do I cancel a booking?",
          type: "faq",
          status: "published",
          author: "Support Team",
          lastUpdated: "2025-07-10"
        },
        {
          id: "faq-4",
          title: "Can I get a refund?",
          type: "faq",
          status: "published",
          author: "Support Team",
          lastUpdated: "2025-07-10"
        },
        {
          id: "faq-5",
          title: "How do WorkOut credits work?",
          type: "faq",
          status: "published",
          author: "Support Team",
          lastUpdated: "2025-07-15"
        },
        {
          id: "faq-6",
          title: "How do I list my venue on WorkOut?",
          type: "faq",
          status: "draft",
          author: "Venue Team",
          lastUpdated: "2025-08-01"
        }
      ]
    },
    {
      id: "emails",
      title: "Email Templates",
      description: "Manage email notifications and marketing templates",
      items: [
        {
          id: "email-1",
          title: "Welcome Email",
          type: "email",
          status: "published",
          author: "Marketing",
          lastUpdated: "2025-06-15"
        },
        {
          id: "email-2",
          title: "Booking Confirmation",
          type: "email",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-15"
        },
        {
          id: "email-3",
          title: "Booking Reminder",
          type: "email",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-15"
        },
        {
          id: "email-4",
          title: "Booking Cancellation",
          type: "email",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-15"
        },
        {
          id: "email-5",
          title: "Password Reset",
          type: "email",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-15"
        },
        {
          id: "email-6",
          title: "Monthly Newsletter",
          type: "email",
          status: "draft",
          author: "Marketing",
          lastUpdated: "2025-08-03"
        }
      ]
    },
    {
      id: "notifications",
      title: "In-App Notifications",
      description: "Manage system notifications and alerts",
      items: [
        {
          id: "notif-1",
          title: "New Booking",
          type: "notification",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-20"
        },
        {
          id: "notif-2",
          title: "Booking Reminder",
          type: "notification",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-20"
        },
        {
          id: "notif-3",
          title: "Booking Cancelled",
          type: "notification",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-20"
        },
        {
          id: "notif-4",
          title: "Credits Added",
          type: "notification",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-20"
        },
        {
          id: "notif-5",
          title: "Payment Processed",
          type: "notification",
          status: "published",
          author: "System",
          lastUpdated: "2025-06-20"
        },
        {
          id: "notif-6",
          title: "New Review",
          type: "notification",
          status: "draft",
          author: "System",
          lastUpdated: "2025-08-01"
        }
      ]
    }
  ];
  
  const currentSection = contentSections.find(section => section.id === activeTab);
  
  // Filter items based on search query and status filter
  const filteredItems = currentSection?.items.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  }) || [];
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "draft":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "archived":
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">
            Manage and update website content, pages, and notifications
          </p>
        </div>
        
        <div>
          <Link 
            href="#"
            className="btn-primary py-2 px-4 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create New
          </Link>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-border mb-6">
        {contentSections.map((section) => (
          <button
            key={section.id}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === section.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>
      
      {currentSection && (
        <>
          {/* Filters */}
          <div className="workout-card p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search content..."
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
              <div className="w-full md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Content Table */}
          <div className="workout-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-accent/10">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{item.title}</div>
                          {item.slug && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.slug}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {item.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                        No content items found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}