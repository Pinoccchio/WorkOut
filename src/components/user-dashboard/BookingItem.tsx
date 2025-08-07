import { Booking } from "@/data/bookings";
import { getVenueById } from "@/data/venues";
import Link from "next/link";
import Image from "next/image";
import { venueImages, getImageById } from "@/utils/image-placeholders";

interface BookingItemProps {
  booking: Booking;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const venue = getVenueById(booking.venueId);
  
  if (!venue) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };
  
  return (
    <div className="workout-card-hover">
      <div className="flex flex-col md:flex-row">
        {/* Venue Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
          {/* Status Overlay - different for each status */}
          {booking.status === "upcoming" && (
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 to-transparent z-10"></div>
          )}
          {booking.status === "completed" && (
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/70 to-transparent z-10"></div>
          )}
          {booking.status === "cancelled" && (
            <div className="absolute inset-0 bg-gray-500/30 z-10"></div>
          )}
          
          <Image 
            src={venue.images[0] || getImageById(venueImages, venue.id)} 
            alt={venue.name}
            className={`object-cover rounded-t-[var(--radius)] md:rounded-tr-none md:rounded-l-[var(--radius)] h-full w-full ${booking.status === "cancelled" ? "grayscale" : ""}`}
            width={400}
            height={300}
            priority
          />
          
          {/* Status Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border z-20 ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
          
          {/* Status Bar at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 text-center text-white py-2 text-sm font-medium z-20">
            {booking.status === "upcoming" && (
              <span className="bg-green-500/90 px-3 py-1 rounded">
                <span className="mr-2">•</span>
                Upcoming
              </span>
            )}
            {booking.status === "completed" && (
              <span className="bg-blue-500/90 px-3 py-1 rounded">
                <span className="mr-2">✓</span>
                Completed
              </span>
            )}
            {booking.status === "cancelled" && (
              <span className="bg-red-500/90 px-3 py-1 rounded">
                <span className="mr-2">✕</span>
                Cancelled
              </span>
            )}
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-1">{venue.name}</h3>
          <p className="text-muted-foreground text-sm mb-3">
            {venue.location.city}, {venue.location.state}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date</p>
              <p className="text-sm font-medium">{formatDate(booking.date)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Time</p>
              <p className="text-sm font-medium">{booking.startTime} - {booking.endTime}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Booking ID</p>
              <p className="text-sm font-medium">{booking.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Amount</p>
              <p className="text-sm font-medium">${booking.totalAmount.toFixed(2)}</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link 
              href={`/venues/${venue.id}`}
              className="text-sm text-primary hover:underline"
            >
              View Venue
            </Link>
            
            {booking.status === "upcoming" && (
              <Link 
                href={`/user/bookings/${booking.id}/cancel`}
                className="text-sm text-red-500 hover:underline"
              >
                Cancel Booking
              </Link>
            )}
            
            {booking.status === "completed" && venue.orderingAvailable && (
              <Link 
                href={`/venues/${venue.id}/order`}
                className="text-sm text-primary hover:underline"
              >
                Order Again
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}