"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getVenueById, Venue } from "@/data/venues";
import FavoriteButton from "@/components/venue-details/FavoriteButton";

export default function UserFavoritesPage() {
  const [favoriteVenues, setFavoriteVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from local storage
    const storedFavorites = localStorage.getItem("workoutFavorites");
    
    if (storedFavorites) {
      const favoriteIds = JSON.parse(storedFavorites) as number[];
      
      // Get venue details for each favorite
      const venues = favoriteIds.map(id => getVenueById(id)).filter(venue => venue !== undefined) as Venue[];
      setFavoriteVenues(venues);
    }
    
    setIsLoading(false);
  }, []);

  // Handle removing a venue from favorites
  const handleRemoveFavorite = (venueId: number) => {
    setFavoriteVenues(prev => prev.filter(venue => venue.id !== venueId));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Favorite Workspaces</h1>
        <Link href="/find-workspace" className="btn-primary py-2">
          Find a Workspace
        </Link>
      </div>
      
      {isLoading ? (
        <div className="workout-card p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-accent/50 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-accent/50 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-accent/50 rounded w-5/6 mb-4"></div>
          </div>
        </div>
      ) : favoriteVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteVenues.map((venue) => (
            <div key={venue.id} className="workout-card overflow-hidden flex flex-col">
              {/* Venue Image */}
              <Link href={`/venues/${venue.id}`} className="block relative">
                <div className="absolute top-2 right-2 z-10">
                  <FavoriteButton 
                    venueId={venue.id} 
                    initialIsFavorite={true}
                    variant="icon"
                    size="lg"
                    onToggle={() => handleRemoveFavorite(venue.id)}
                  />
                </div>
                <div className="h-48 overflow-hidden">
                  <img
                    src={venue.images[0] || "/placeholder-workspace.jpg"}
                    alt={venue.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              {/* Venue Details */}
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <Link href={`/venues/${venue.id}`} className="text-lg font-medium hover:text-primary">
                    {venue.name}
                  </Link>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm">{venue.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({venue.reviewCount})</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {venue.location.city}, {venue.location.state}
                </p>
                
                <p className="text-sm line-clamp-2 mb-3">
                  {venue.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {venue.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-accent/50 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Object.entries(venue.hours)[0][1].open} - {Object.entries(venue.hours)[0][1].close}
                  </div>
                  <div className="text-sm font-medium">${venue.pricePerHour}/hr</div>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="p-4 border-t border-border">
                <Link 
                  href={`/venues/${venue.id}`}
                  className="block w-full btn-primary text-center py-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="workout-card p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No favorite workspaces yet</h3>
            <p className="text-muted-foreground mb-4">
              Save workspaces you like to find them quickly later!
            </p>
            <Link href="/find-workspace" className="btn-primary">
              Find a Workspace
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}