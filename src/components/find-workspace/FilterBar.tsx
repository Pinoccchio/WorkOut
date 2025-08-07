"use client";

import { useState } from "react";

interface FilterBarProps {
  onFilterChange: (filters: {
    query: string;
    location: string;
    amenities: string[];
    minPrice: number;
    maxPrice: number;
    minRating: number;
    minCapacity: number;
    tags: string[];
    hours: {
      open: string;
      close: string;
    };
    features: {
      hasQuietSpace?: boolean;
      hasMeetingRooms?: boolean;
      hasOutdoorSeating?: boolean;
      isAccessible?: boolean;
      allowsPets?: boolean;
      orderingAvailable?: boolean;
    };
  }) => void;
  initialFilters?: {
    query: string;
    location: string;
    amenities: string[];
    minPrice: number;
    maxPrice: number;
    minRating: number;
    minCapacity: number;
    tags: string[];
    hours: {
      open: string;
      close: string;
    };
    features: {
      hasQuietSpace?: boolean;
      hasMeetingRooms?: boolean;
      hasOutdoorSeating?: boolean;
      isAccessible?: boolean;
      allowsPets?: boolean;
      orderingAvailable?: boolean;
    };
  };
}

const AMENITY_OPTIONS = [
  "WiFi",
  "Power Outlets",
  "Coffee",
  "Food",
  "Quiet Space",
  "Meeting Rooms",
  "Parking",
  "Accessible",
  "Outdoor Seating",
  "Pet Friendly",
];

const TAG_OPTIONS = [
  "Coffee Shop",
  "Co-working Space",
  "Library",
  "Quiet Space",
  "Digital Nomad Friendly",
  "Fast WiFi",
  "Food Available",
  "Meeting Rooms",
  "Comfortable Seating",
  "Eco-Friendly",
];

const HOURS_OPTIONS = [
  { label: "Early Morning (Before 8AM)", value: "before-8am" },
  { label: "Evening (After 6PM)", value: "after-6pm" },
  { label: "Late Night (After 9PM)", value: "after-9pm" },
  { label: "Weekend Availability", value: "weekend" },
];

export default function FilterBar({ onFilterChange, initialFilters }: FilterBarProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    query: initialFilters?.query || "",
    location: initialFilters?.location || "",
    amenities: initialFilters?.amenities || [],
    minPrice: initialFilters?.minPrice || 0,
    maxPrice: initialFilters?.maxPrice || 10,
    minRating: initialFilters?.minRating || 0,
    minCapacity: initialFilters?.minCapacity || 0,
    tags: initialFilters?.tags || [],
    hours: initialFilters?.hours || {
      open: "",
      close: "",
    },
    features: initialFilters?.features || {
      hasQuietSpace: false,
      hasMeetingRooms: false,
      hasOutdoorSeating: false,
      isAccessible: false,
      allowsPets: false,
      orderingAvailable: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const newFilters = {
      ...filters,
      [name]: value,
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const newFilters = {
      ...filters,
      [name]: Number(value),
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityChange = (amenity: string) => {
    let newAmenities;
    
    if (filters.amenities.includes(amenity)) {
      newAmenities = filters.amenities.filter((a) => a !== amenity);
    } else {
      newAmenities = [...filters.amenities, amenity];
    }
    
    const newFilters = {
      ...filters,
      amenities: newAmenities,
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleTagChange = (tag: string) => {
    let newTags;
    
    if (filters.tags.includes(tag)) {
      newTags = filters.tags.filter((t) => t !== tag);
    } else {
      newTags = [...filters.tags, tag];
    }
    
    const newFilters = {
      ...filters,
      tags: newTags,
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    const newFilters = {
      ...filters,
      features: {
        ...filters.features,
        [name]: checked,
      },
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    const newFilters = {
      ...filters,
      minRating: Number(value),
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    const newFilters = {
      ...filters,
      minCapacity: Number(value),
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    const newFilters = {
      ...filters,
      hours: {
        ...filters.hours,
        [name]: value,
      },
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const newFilters = {
      query: "",
      location: "",
      amenities: [],
      minPrice: 0,
      maxPrice: 10,
      minRating: 0,
      minCapacity: 0,
      tags: [],
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
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="workout-card mb-4">
      <div className="p-4">
        {/* Basic Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="query" className="block text-sm text-muted-foreground mb-1">
              Search
            </label>
            <input
              type="text"
              id="query"
              name="query"
              value={filters.query}
              onChange={handleInputChange}
              placeholder="Search venues by name or features"
              className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="location" className="block text-sm text-muted-foreground mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              placeholder="City, state, or zip code"
              className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        {/* Advanced Filters Toggle */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="text-sm font-medium flex items-center text-primary"
          >
            {isFiltersOpen ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                Hide Filters
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                Show Filters
              </>
            )}
          </button>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Advanced Filters */}
      {isFiltersOpen && (
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium mb-3">Price Range (per hour)</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">${filters.minPrice}</span>
                  <span className="text-sm text-muted-foreground">${filters.maxPrice}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    id="minPrice"
                    name="minPrice"
                    min="0"
                    max="10"
                    step="0.25"
                    value={filters.minPrice}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    id="maxPrice"
                    name="maxPrice"
                    min="0"
                    max="10"
                    step="0.25"
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Any Rating</span>
                  <span className="text-sm text-muted-foreground">5 Stars</span>
                </div>
                <input
                  type="range"
                  id="minRating"
                  name="minRating"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={handleRatingChange}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center font-medium text-primary">
                  {filters.minRating > 0 ? `${filters.minRating} stars or higher` : 'Any Rating'}
                </div>
              </div>
            </div>
            
            {/* Capacity Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3">Minimum Capacity</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Any Size</span>
                  <span className="text-sm text-muted-foreground">50+ People</span>
                </div>
                <input
                  type="range"
                  id="minCapacity"
                  name="minCapacity"
                  min="0"
                  max="50"
                  step="5"
                  value={filters.minCapacity}
                  onChange={handleCapacityChange}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center font-medium text-primary">
                  {filters.minCapacity > 0 ? `${filters.minCapacity}+ people` : 'Any Size'}
                </div>
              </div>
            </div>
            
            {/* Amenities */}
            <div>
              <h3 className="text-sm font-medium mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {AMENITY_OPTIONS.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium mb-3">Workspace Type</h3>
              <div className="grid grid-cols-1 gap-2">
                {TAG_OPTIONS.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Special Features */}
            <div>
              <h3 className="text-sm font-medium mb-3">Special Features</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasQuietSpace"
                    checked={filters.features.hasQuietSpace}
                    onChange={handleFeatureChange}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Quiet Space Available</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasMeetingRooms"
                    checked={filters.features.hasMeetingRooms}
                    onChange={handleFeatureChange}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Has Meeting Rooms</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasOutdoorSeating"
                    checked={filters.features.hasOutdoorSeating}
                    onChange={handleFeatureChange}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Outdoor Seating</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAccessible"
                    checked={filters.features.isAccessible}
                    onChange={handleFeatureChange}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Accessible Facilities</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowsPets"
                    checked={filters.features.allowsPets}
                    onChange={handleFeatureChange}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Pet Friendly</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="orderingAvailable"
                    checked={filters.features.orderingAvailable}
                    onChange={handleFeatureChange}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">In-app Ordering Available</span>
                </label>
              </div>
            </div>
            
            {/* Hours Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3">Hours</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="open" className="block text-xs text-muted-foreground mb-1">
                      Opens Before
                    </label>
                    <select
                      id="open"
                      name="open"
                      value={filters.hours.open}
                      onChange={handleHoursChange}
                      className="w-full p-2 rounded-md border border-border bg-transparent text-sm"
                    >
                      <option value="">Any Time</option>
                      <option value="06:00">6:00 AM</option>
                      <option value="07:00">7:00 AM</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="close" className="block text-xs text-muted-foreground mb-1">
                      Closes After
                    </label>
                    <select
                      id="close"
                      name="close"
                      value={filters.hours.close}
                      onChange={handleHoursChange}
                      className="w-full p-2 rounded-md border border-border bg-transparent text-sm"
                    >
                      <option value="">Any Time</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                      <option value="23:00">11:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="weekend"
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Open on Weekends</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}