import { Venue } from "@/data/venues";
import Image from "next/image";
import Link from "next/link";

interface ListViewProps {
  venues: Venue[];
  selectedVenueId?: number;
  onVenueSelect: (venueId: number) => void;
}

export default function ListView({ venues, selectedVenueId, onVenueSelect }: ListViewProps) {
  if (venues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-muted-foreground mb-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium mb-1">No venues found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6">
      {venues.map((venue) => (
        <div 
          key={venue.id}
          className={`workout-card-hover transition-all duration-200 cursor-pointer ${
            venue.id === selectedVenueId ? 'border-primary' : ''
          }`}
          onClick={() => onVenueSelect(venue.id)}
        >
          <div className="flex flex-col md:flex-row">
            {/* Venue Image */}
            <div className="relative w-full md:w-48 h-48 md:h-full">
              <div className="absolute top-3 right-3 z-10 bg-white dark:bg-secondary px-2 py-1 rounded-full text-sm font-medium">
                ${venue.pricePerHour}/hr
              </div>
              <Image 
                src={venue.images[0] || "/venues/placeholder.jpg"} 
                alt={venue.name}
                className="object-cover rounded-t-[var(--radius)] md:rounded-tr-none md:rounded-l-[var(--radius)]"
                fill
              />
            </div>
            
            {/* Venue Details */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold mb-1">{venue.name}</h3>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">{venue.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({venue.reviewCount})</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-3">
                {venue.location.city}, {venue.location.state}
              </p>
              
              <p className="text-sm mb-4 line-clamp-2">{venue.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {venue.tags.map((tag, index) => (
                  <span key={index} className="bg-accent px-2 py-1 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                  </svg>
                  {venue.features.hasWifi ? 'WiFi Available' : 'No WiFi'}
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  {venue.features.hasPower ? 'Power Outlets' : 'No Power Outlets'}
                </div>
                
                {venue.features.hasFood && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                    </svg>
                    Food Available
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-end">
                <Link 
                  href={`/venues/${venue.id}`}
                  className="btn-primary py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}