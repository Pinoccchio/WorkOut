"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingWidgetProps {
  venueId: number;
  venueName: string;
  pricePerHour: number;
}

export default function BookingWidget({ venueId, venueName, pricePerHour }: BookingWidgetProps) {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    startTime: "",
    endTime: "",
    guests: 1,
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mocked auth state
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };
  
  // Calculate duration in hours
  const calculateDuration = () => {
    if (!bookingDetails.startTime || !bookingDetails.endTime) return 0;
    
    const startHour = parseInt(bookingDetails.startTime.split(":")[0]);
    const startMinute = parseInt(bookingDetails.startTime.split(":")[1]);
    const endHour = parseInt(bookingDetails.endTime.split(":")[0]);
    const endMinute = parseInt(bookingDetails.endTime.split(":")[1]);
    
    return (endHour - startHour) + (endMinute - startMinute) / 60;
  };
  
  const duration = calculateDuration();
  const subtotal = duration * pricePerHour;
  const serviceFee = subtotal * 0.10; // 10% service fee
  const total = subtotal + serviceFee;
  
  const handleBooking = () => {
    if (!isLoggedIn) {
      // Redirect to login
      router.push(`/login?redirect=/venues/${venueId}`);
      return;
    }
    
    // Mock booking success - would call API in real implementation
    alert(`Booking successful for ${venueName}!`);
    router.push("/user/bookings");
  };
  
  return (
    <div className="workout-card sticky top-20">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">${pricePerHour.toFixed(2)} <span className="text-sm text-muted-foreground font-normal">/ hour</span></h3>
        
        <div className="space-y-4 mb-6">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          {/* Time Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={bookingDetails.startTime}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={bookingDetails.endTime}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
          
          {/* Guests */}
          <div>
            <label htmlFor="guests" className="block text-sm font-medium mb-1">
              Number of Guests
            </label>
            <select
              id="guests"
              name="guests"
              value={bookingDetails.guests}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Price Breakdown */}
        {duration > 0 && (
          <div className="border-t border-border pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">${pricePerHour.toFixed(2)} × {duration} hours</span>
              <span className="text-sm">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-sm">Service fee</span>
              <span className="text-sm">${serviceFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between font-semibold mt-3 pt-3 border-t border-border">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}
        
        {/* Booking Button */}
        <button
          className="btn-primary w-full"
          onClick={handleBooking}
          disabled={!bookingDetails.date || !bookingDetails.startTime || !bookingDetails.endTime}
        >
          {isLoggedIn ? "Book Now" : "Login to Book"}
        </button>
        
        <p className="text-xs text-center text-muted-foreground mt-3">
          You won't be charged yet
        </p>
      </div>
    </div>
  );
}