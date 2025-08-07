"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FilterBar from "@/components/find-workspace/FilterBar";
import ListView from "@/components/find-workspace/ListView";
import MapView from "@/components/find-workspace/MapView";
import { filterVenues, venues } from "@/data/venues";

export default function FindWorkspaceClient() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedVenueId, setSelectedVenueId] = useState<number | undefined>(undefined);
  
  const [filters, setFilters] = useState({
    query: searchParams.get("query") || "",
    location: searchParams.get("location") || "",
    amenities: [] as string[],
    minPrice: 0,
    maxPrice: 10,
    minRating: 0,
    minCapacity: 0,
    tags: [] as string[],
    hours: {
      open: "",
      close: "",
    },
    features: {
      hasQuietSpace: false,
      hasMeetingRooms: false,
      hasOutdoorSeating: false,
      isAccessible: false,
      allowsPets: false,
      orderingAvailable: false,
    },
  });
  
  const [filteredVenues, setFilteredVenues] = useState(venues);
  
  useEffect(() => {
    setFilteredVenues(
      filterVenues(
        filters.query,
        filters.location,
        filters.amenities,
        filters.minPrice,
        filters.maxPrice,
        filters.minRating,
        filters.minCapacity,
        filters.tags,
        filters.hours,
        filters.features
      )
    );
  }, [filters]);
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const handleVenueSelect = (venueId: number) => {
    setSelectedVenueId(venueId);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-accent/30">
          <div className="workout-container py-8">
            <h1 className="text-3xl font-bold mb-2">Find a Workspace</h1>
            <p className="text-muted-foreground">
              Discover comfortable places to work in New York City
            </p>
          </div>
        </div>
        
        <div className="workout-container py-6">
          {/* Filter Bar */}
          <FilterBar 
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
          
          {/* View Toggle */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              {filteredVenues.length} workspace{filteredVenues.length !== 1 ? "s" : ""} found
            </div>
            
            <div className="flex items-center bg-muted rounded-md p-1">
              <button
                className={`px-3 py-1 text-sm font-medium rounded ${
                  viewMode === "list"
                    ? "bg-white dark:bg-secondary shadow-sm"
                    : "text-muted-foreground"
                }`}
                onClick={() => setViewMode("list")}
              >
                List View
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium rounded ${
                  viewMode === "map"
                    ? "bg-white dark:bg-secondary shadow-sm"
                    : "text-muted-foreground"
                }`}
                onClick={() => setViewMode("map")}
              >
                Map View
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
            {/* List View (always present on larger screens) */}
            <div className={`md:col-span-3 ${viewMode === "map" ? "hidden md:block" : ""}`}>
              <ListView 
                venues={filteredVenues}
                selectedVenueId={selectedVenueId}
                onVenueSelect={handleVenueSelect}
              />
            </div>
            
            {/* Map View */}
            <div 
              className={`md:col-span-5 ${
                viewMode === "list" ? "hidden md:block" : ""
              }`}
            >
              <div className="sticky top-20">
                <MapView 
                  venues={filteredVenues}
                  selectedVenueId={selectedVenueId}
                  onVenueSelect={handleVenueSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}