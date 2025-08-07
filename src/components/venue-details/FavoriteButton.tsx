"use client";

import { useState, useEffect } from "react";

interface FavoriteButtonProps {
  venueId: number;
  initialIsFavorite?: boolean;
  variant?: "icon" | "icon-text" | "button";
  size?: "sm" | "md" | "lg";
  onToggle?: (isFavorite: boolean) => void;
}

export default function FavoriteButton({
  venueId,
  initialIsFavorite = false,
  variant = "icon",
  size = "md",
  onToggle
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Check local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("workoutFavorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(venueId));
    }
  }, [venueId]);
  
  // Handle toggling favorite status
  const toggleFavorite = () => {
    // Update state
    setIsFavorite(!isFavorite);
    setIsAnimating(true);
    
    // Update local storage
    const storedFavorites = localStorage.getItem("workoutFavorites");
    let favorites: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter(id => id !== venueId);
    } else {
      // Add to favorites
      favorites.push(venueId);
    }
    
    localStorage.setItem("workoutFavorites", JSON.stringify(favorites));
    
    // Call the onToggle callback if provided
    if (onToggle) {
      onToggle(!isFavorite);
    }
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };
  
  // Size classes for the icon
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };
  
  // Render based on variant
  switch (variant) {
    case "icon-text":
      return (
        <button
          onClick={toggleFavorite}
          className={`flex items-center space-x-1 ${isFavorite ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className={`${isAnimating ? 'animate-pulse' : ''}`}>
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={sizeClasses[size]}>
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={sizeClasses[size]}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            )}
          </span>
          <span className="text-sm">
            {isFavorite ? "Saved" : "Save"}
          </span>
        </button>
      );
    
    case "button":
      return (
        <button
          onClick={toggleFavorite}
          className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
            isFavorite 
              ? 'bg-primary/10 text-primary hover:bg-primary/20' 
              : 'bg-accent/50 text-foreground hover:bg-accent'
          } transition-colors`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className={`${isAnimating ? 'animate-pulse' : ''}`}>
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={sizeClasses[size]}>
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={sizeClasses[size]}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            )}
          </span>
          <span>
            {isFavorite ? "Saved" : "Save"}
          </span>
        </button>
      );
    
    case "icon":
    default:
      return (
        <button
          onClick={toggleFavorite}
          className={`${isFavorite ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className={`${isAnimating ? 'animate-pulse' : ''}`}>
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={sizeClasses[size]}>
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={sizeClasses[size]}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            )}
          </span>
        </button>
      );
  }
}