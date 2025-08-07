"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VenueGallery from "@/components/venue-details/VenueGallery";
import VenueAmenities from "@/components/venue-details/VenueAmenities";
import VenueReviews from "@/components/venue-details/VenueReviews";
import BookingWidget from "@/components/venue-details/BookingWidget";
import { getVenueById, Venue } from "@/data/venues";
import Link from "next/link";

export default function VenueDetailsPage({ params }: { params: { id: string } }) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get venue details
    if (params && params.id) {
      const venueId = parseInt(params.id);
      const venueData = getVenueById(venueId);
      
      if (venueData) {
        setVenue(venueData);
      }
      
      setLoading(false);
    }
  }, [params]);
  
  // Show 404 if venue not found
  if (!loading && !venue) {
    notFound();
  }
  
  if (loading || !venue) {
    // Loading state
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow workout-container py-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-32"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        <div className="workout-container py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mx-2 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <Link href="/find-workspace" className="text-muted-foreground hover:text-foreground">
              Find Workspace
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mx-2 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="font-medium truncate">{venue.name}</span>
          </div>
          
          {/* Venue Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{venue.rating}</span>
                <span className="text-muted-foreground ml-1">({venue.reviewCount} reviews)</span>
              </div>
              <div className="text-muted-foreground">
                {venue.location.city}, {venue.location.state}
              </div>
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Venue Info */}
            <div className="md:col-span-2 space-y-8">
              {/* Gallery */}
              <VenueGallery images={venue.images} venueName={venue.name} />
              
              {/* Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About this workspace</h2>
                <p className="mb-4">{venue.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="workout-card p-4">
                    <h3 className="font-medium mb-2">Capacity</h3>
                    <p className="text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      {venue.capacity} people
                    </p>
                  </div>
                  
                  <div className="workout-card p-4">
                    <h3 className="font-medium mb-2">In-app Ordering</h3>
                    <p className="text-sm flex items-center">
                      {venue.orderingAvailable ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-emerald-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Available
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          Not Available
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Amenities */}
              <VenueAmenities venue={venue} />
              
              {/* Hours */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Hours</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(venue.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize">{day}</span>
                      <span>{hours.open} - {hours.close}</span>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Location */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 h-64 flex items-center justify-center">
                  <p className="text-muted-foreground text-center p-4">
                    {venue.location.address}, {venue.location.city}, {venue.location.state} {venue.location.zipCode}
                    <br />
                    <span className="text-sm">(Map would be displayed here)</span>
                  </p>
                </div>
              </section>
              
              {/* Reviews */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <VenueReviews venueId={venue.id} venueName={venue.name} />
              </section>
            </div>
            
            {/* Right Column - Booking Widget */}
            <div className="md:col-span-1">
              <BookingWidget 
                venueId={venue.id}
                venueName={venue.name}
                pricePerHour={venue.pricePerHour}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}