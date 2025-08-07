"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserRoleMenu from "../UserRoleMenu";
import NotificationsCenter from "../NotificationsCenter";

interface DashboardHeaderProps {
  userType: "user" | "venue" | "admin";
}

export default function DashboardHeader({ userType }: DashboardHeaderProps) {
  const pathname = usePathname();
  
  // Display name based on user type
  const displayName = {
    user: "User Dashboard",
    venue: "Venue Dashboard",
    admin: "Admin Dashboard"
  }[userType];
  
  // Dashboard home route based on user type
  const dashboardHome = {
    user: "/user/bookings",
    venue: "/venue/dashboard",
    admin: "/admin/dashboard"
  }[userType];
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="workout-container flex h-16 items-center justify-between">
        {/* Dashboard Brand & Title */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              WorkOut
            </span>
          </Link>
          
          <div className="hidden md:flex border-l border-border/40 pl-4 h-8 items-center">
            <Link href={dashboardHome} className="font-medium text-foreground/80 hover:text-primary">
              {displayName}
            </Link>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-3">
          <NotificationsCenter />
          <UserRoleMenu />
          
          {/* Return to Website Button */}
          <Link href="/" className="hidden md:flex btn-ghost py-2 px-4">
            Return to Website
          </Link>
        </div>
      </div>
    </header>
  );
}