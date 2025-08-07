"use client";

import { useState, useEffect } from "react";

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  precision?: "half" | "full";
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating = 0,
  maxRating = 5,
  size = "md",
  interactive = false,
  precision = "full",
  onChange
}: StarRatingProps) {
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Update current rating when the prop changes
  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);
  
  // Size mapping to px values
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  const starSize = sizeMap[size];
  
  // Handle mouse enter on a star
  const handleMouseEnter = (value: number) => {
    if (!interactive) return;
    setHoverRating(value);
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };
  
  // Handle click on a star
  const handleClick = (value: number) => {
    if (!interactive) return;
    
    // Toggle off if clicking the same star
    if (precision === "full" && value === currentRating) {
      setCurrentRating(0);
      onChange?.(0);
      return;
    }
    
    // Handle half stars
    if (precision === "half") {
      const isHalfStar = isHalfStarClick(value);
      const newRating = isHalfStar ? value - 0.5 : value;
      setCurrentRating(newRating);
      onChange?.(newRating);
      return;
    }
    
    setCurrentRating(value);
    onChange?.(value);
  };
  
  // Determine if a half-star click was made (for precision="half")
  const isHalfStarClick = (starPosition: number): boolean => {
    // This is a simplified approach that could be improved with actual click position detection
    // For now, we'll just toggle between full and half stars
    return currentRating === starPosition && currentRating % 1 === 0;
  };
  
  // Get star fill percentage based on rating value
  const getStarFill = (starPosition: number): number => {
    const displayRating = hoverRating || currentRating;
    
    if (displayRating >= starPosition) {
      return 100; // Full star
    }
    
    if (precision === "half" && displayRating + 0.5 >= starPosition) {
      return 50; // Half star
    }
    
    return 0; // Empty star
  };
  
  return (
    <div 
      className="inline-flex" 
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starPosition = index + 1;
        const fillPercentage = getStarFill(starPosition);
        
        return (
          <button
            key={index}
            type="button"
            className={`p-0.5 focus:outline-none ${interactive ? "cursor-pointer" : "cursor-default"}`}
            onClick={() => handleClick(starPosition)}
            onMouseEnter={() => handleMouseEnter(starPosition)}
            disabled={!interactive}
            aria-label={`${starPosition} stars`}
          >
            <span className="sr-only">{starPosition} stars</span>
            <svg
              width={starSize}
              height={starSize}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <defs>
                <linearGradient id={`star-gradient-${index}`}>
                  <stop offset={`${fillPercentage}%`} stopColor="currentColor" className="text-primary" />
                  <stop offset={`${fillPercentage}%`} stopColor="#d1d5db" className="text-muted-foreground" />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={`url(#star-gradient-${index})`}
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}