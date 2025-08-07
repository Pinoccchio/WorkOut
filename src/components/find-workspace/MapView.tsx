"use client";

import { useState } from "react";
import { Venue } from "@/data/venues";
import { useRouter } from "next/navigation";

interface MapViewProps {
  venues: Venue[];
  selectedVenueId?: number;
  onVenueSelect: (venueId: number) => void;
}

export default function MapView({ venues, selectedVenueId, onVenueSelect }: MapViewProps) {
  const router = useRouter();
  const [hoveredVenueId, setHoveredVenueId] = useState<number | null>(null);

  // In a real implementation, this would use a map library like Google Maps, Mapbox, etc.
  // For this mockup, we'll create a simple visual representation
  
  return (
    <div className="w-full h-[calc(100vh-4rem)] bg-slate-100 dark:bg-slate-800 relative overflow-hidden rounded-md">
      {/* Mock map background */}
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700">
        <div className="absolute inset-0 opacity-30">
          {/* Map grid lines */}
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(to right, #ccc 1px, transparent 1px), 
                             linear-gradient(to bottom, #ccc 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
          
          {/* Mock roads */}
          <div className="absolute left-1/4 top-0 bottom-0 w-4 bg-white/30"></div>
          <div className="absolute right-1/3 top-0 bottom-0 w-2 bg-white/30"></div>
          <div className="absolute top-1/3 left-0 right-0 h-3 bg-white/30"></div>
          <div className="absolute top-2/3 left-0 right-0 h-5 bg-white/30"></div>
          
          {/* Mock water */}
          <div className="absolute left-0 top-0 w-1/6 h-1/4 bg-blue-300/30 rounded-br-3xl"></div>
        </div>
      </div>
      
      {/* Venue markers */}
      <div className="absolute inset-0">
        {venues.map((venue) => {
          // Create a somewhat random position based on the venue ID
          const positionX = (venue.location.coordinates.lng + 75) * 10 % 80 + 10; // 10-90%
          const positionY = (venue.location.coordinates.lat - 40) * 20 % 80 + 10; // 10-90%
          
          const isSelected = venue.id === selectedVenueId;
          const isHovered = venue.id === hoveredVenueId;
          
          return (
            <div 
              key={venue.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                isSelected || isHovered 
                  ? 'z-10 scale-125' 
                  : 'z-0 scale-100'
              }`}
              style={{
                left: `${positionX}%`,
                top: `${positionY}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => onVenueSelect(venue.id)}
              onMouseEnter={() => setHoveredVenueId(venue.id)}
              onMouseLeave={() => setHoveredVenueId(null)}
            >
              {/* Price marker */}
              <div className={`flex items-center justify-center rounded-full shadow-md w-12 h-12
                ${isSelected 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-foreground hover:border-primary border-2'
                }`}
              >
                <span className="font-medium text-sm">${venue.pricePerHour}</span>
              </div>
              
              {/* Tooltip on hover or select */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white dark:bg-secondary shadow-lg rounded-md p-3 text-sm w-48">
                  <div className="font-medium mb-1">{venue.name}</div>
                  <div className="flex items-center text-yellow-500 mb-1">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {venue.rating}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{venue.location.city}, {venue.location.state}</div>
                  <button 
                    className="w-full text-center bg-primary text-white rounded-full py-1 text-xs font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/venues/${venue.id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Map controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button className="bg-white dark:bg-secondary w-8 h-8 rounded-md shadow-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        <button className="bg-white dark:bg-secondary w-8 h-8 rounded-md shadow-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        </button>
      </div>
      
      {/* Location indicator */}
      <div className="absolute left-4 bottom-4 bg-white dark:bg-secondary rounded-md shadow-md py-2 px-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <span className="text-sm font-medium">New York, NY</span>
      </div>
    </div>
  );
}