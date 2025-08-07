import { venues } from "./venues";

export interface Booking {
  id: string;
  userId: string;
  venueId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: "upcoming" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: string;
}

// Generate random bookings
const generateRandomBookings = (count: number): Booking[] => {
  const bookings: Booking[] = [];
  const statuses: ("upcoming" | "completed" | "cancelled")[] = ["upcoming", "completed", "cancelled"];
  
  // Current date
  const now = new Date();
  
  // Generate past, current, and future dates
  for (let i = 0; i < count; i++) {
    const randomVenueId = venues[Math.floor(Math.random() * venues.length)].id;
    const randomVenue = venues.find(v => v.id === randomVenueId)!;
    
    // Randomly determine if booking is in past, present, or future
    let bookingDate = new Date();
    let status: "upcoming" | "completed" | "cancelled";
    
    const timeFrame = Math.random();
    
    if (timeFrame < 0.4) {
      // Past booking (completed or cancelled)
      const daysAgo = Math.floor(Math.random() * 30) + 1;
      bookingDate.setDate(now.getDate() - daysAgo);
      status = Math.random() > 0.3 ? "completed" : "cancelled";
    } else {
      // Future booking
      const daysAhead = Math.floor(Math.random() * 30) + 1;
      bookingDate.setDate(now.getDate() + daysAhead);
      status = "upcoming";
    }
    
    // Format date as ISO string and extract date part
    const dateStr = bookingDate.toISOString().split('T')[0];
    
    // Random start and end times
    const startHour = 8 + Math.floor(Math.random() * 8); // 8 AM to 4 PM
    const duration = 1 + Math.floor(Math.random() * 3); // 1 to 3 hours
    const endHour = startHour + duration;
    
    const startTime = `${startHour.toString().padStart(2, '0')}:00`;
    const endTime = `${endHour.toString().padStart(2, '0')}:00`;
    
    // Calculate total amount
    const totalAmount = randomVenue.pricePerHour * duration;
    
    // Create booking
    bookings.push({
      id: `booking-${i + 1}`,
      userId: "user-1",
      venueId: randomVenueId,
      date: dateStr,
      startTime,
      endTime,
      status,
      totalAmount,
      createdAt: new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 90 days
    });
  }
  
  // Sort by date (most recent first for past bookings, soonest first for upcoming)
  return bookings.sort((a, b) => {
    if (a.status === "upcoming" && b.status === "upcoming") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (a.status !== "upcoming" && b.status !== "upcoming") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return a.status === "upcoming" ? -1 : 1;
    }
  });
};

export const userBookings = generateRandomBookings(8);

export const getUserBookings = (status?: "upcoming" | "completed" | "cancelled") => {
  if (status) {
    return userBookings.filter(booking => booking.status === status);
  }
  return userBookings;
};

export const getBookingById = (id: string) => {
  return userBookings.find(booking => booking.id === id);
};