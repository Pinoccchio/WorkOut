"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getVenueById } from "@/data/venues";

export default function ActivateCreditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const venueId = parseInt(params.id);
  const venue = venueId ? getVenueById(venueId) : null;
  
  const [bookingId, setBookingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Validate booking ID format - simple validation for demo
    if (bookingId.length < 5) {
      setError("Please enter a valid Booking ID");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call to validate booking ID
    setTimeout(() => {
      // For demo purposes, always succeed
      // In a real app, this would validate the booking ID against the backend
      router.push(`/venues/${venueId}/credit/status`);
    }, 1000);
  };
  
  if (!venue) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Venue not found</p>
          <Link href="/find-workspace" className="btn-primary">
            Find a Workspace
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background/90 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary">
              WorkOut
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="mr-2 text-right">
              <div className="text-sm">Seat</div>
              <div className="font-bold text-xl">14</div>
            </div>
            
            <button className="p-2 bg-accent/50 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6">
            Welcome to {venue.name}
          </h1>
          
          <p className="text-center text-muted-foreground mb-8">
            Please enter your Booking ID, found in your booking confirmation email.
          </p>
          
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value.toUpperCase())}
              className="w-full p-4 text-center text-2xl bg-accent/30 dark:bg-accent/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-6"
              placeholder="BOOKING ID"
              autoCapitalize="characters"
              autoFocus
            />
            
            <button
              type="submit"
              className="btn-primary w-full py-4 text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Confirming..." : "Confirm"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}