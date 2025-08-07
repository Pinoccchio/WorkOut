"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkspaceSearch() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create query string from search params
    const queryString = new URLSearchParams(searchParams).toString();
    
    // Navigate to search results page with params
    router.push(`/find-workspace?${queryString}`);
  };

  return (
    <div className="workout-card max-w-3xl w-full mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
        <div className="flex-1 p-3 border-b md:border-b-0 md:border-r border-border">
          <label className="block text-sm text-muted-foreground mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={searchParams.date}
            onChange={handleChange}
            className="w-full bg-transparent focus:outline-none"
            placeholder="Any Day"
          />
        </div>
        
        <div className="flex-1 p-3 border-b md:border-b-0 md:border-r border-border">
          <label className="block text-sm text-muted-foreground mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={searchParams.time}
            onChange={handleChange}
            className="w-full bg-transparent focus:outline-none"
            placeholder="Any Time"
          />
        </div>
        
        <div className="flex-1 p-3 border-b md:border-b-0 md:border-r border-border">
          <label className="block text-sm text-muted-foreground mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={searchParams.location}
            onChange={handleChange}
            className="w-full bg-transparent focus:outline-none"
            placeholder="Any Place"
          />
        </div>
        
        <div className="p-3 flex items-center justify-center">
          <button 
            type="submit" 
            className="bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors"
            aria-label="Search workspaces"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}