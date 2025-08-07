"use client";

import { useState } from "react";
import Image from "next/image";
import { workspaceImages } from "@/utils/image-placeholders";

interface VenueGalleryProps {
  images: string[];
  venueName: string;
}

export default function VenueGallery({ images, venueName }: VenueGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);

  const handleNextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  // Use placeholder images if no images are provided
  const displayImages = images.length > 0 
    ? images 
    : workspaceImages;

  return (
    <>
      {/* Main Gallery */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image
          src={displayImages[activeIndex]}
          alt={`${venueName} - Image ${activeIndex + 1}`}
          fill
          className="object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
          onClick={handlePrevImage}
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
          onClick={handleNextImage}
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        
        {/* View All Button */}
        <button
          className="absolute right-4 bottom-4 bg-black/40 text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-black/60 transition-colors flex items-center"
          onClick={() => setShowFullGallery(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          View All Photos
        </button>
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-2 mt-2 overflow-auto pb-2">
        {displayImages.map((image, index) => (
          <button
            key={index}
            className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
              index === activeIndex ? "ring-2 ring-primary" : "opacity-70"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={image}
              alt={`${venueName} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Full Gallery Modal */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col p-4 md:p-8">
          <div className="flex justify-between items-center text-white mb-4">
            <h3 className="text-xl font-medium">{venueName} - Photos</h3>
            <button
              onClick={() => setShowFullGallery(false)}
              className="p-2 hover:bg-white/10 rounded-full"
              aria-label="Close gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-full max-h-[70vh]">
              <Image
                src={displayImages[activeIndex]}
                alt={`${venueName} - Image ${activeIndex + 1}`}
                fill
                className="object-contain"
              />
              
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 overflow-auto pb-2">
            {displayImages.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                  index === activeIndex ? "ring-2 ring-primary" : "opacity-70"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={image}
                  alt={`${venueName} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}