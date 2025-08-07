"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EnrollmentStepper from "@/components/venue-enrollment/EnrollmentStepper";

interface PhotoItem {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  isMainPhoto: boolean;
}

export default function VenuePhotoUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    handleFiles(Array.from(files));
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  // Process files
  const handleFiles = (files: File[]) => {
    // Filter for image files
    const imageFiles = files.filter(file => 
      file.type.startsWith("image/")
    );
    
    if (imageFiles.length === 0) return;
    
    // Create new photo items
    const newPhotos = imageFiles.map(file => {
      const id = `photo_${Math.random().toString(36).substring(2, 11)}`;
      
      // Simulate upload progress
      simulateUpload(id);
      
      return {
        id,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        isMainPhoto: photos.length === 0 && photos.every(p => !p.isMainPhoto)
      };
    });
    
    setPhotos(prev => [...prev, ...newPhotos]);
  };
  
  // Simulate file upload
  const simulateUpload = (id: string) => {
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [id]: progress
      }));
    }, 300);
  };
  
  // Remove a photo
  const removePhoto = (id: string) => {
    const photoToRemove = photos.find(photo => photo.id === id);
    
    setPhotos(prev => {
      const filtered = prev.filter(photo => photo.id !== id);
      
      // If we removed the main photo, set a new one if available
      if (photoToRemove && photoToRemove.isMainPhoto && filtered.length > 0) {
        filtered[0].isMainPhoto = true;
      }
      
      return filtered;
    });
  };
  
  // Set a photo as the main photo
  const setAsMainPhoto = (id: string) => {
    setPhotos(prev => 
      prev.map(photo => ({
        ...photo,
        isMainPhoto: photo.id === id
      }))
    );
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    }
  };
  
  // Handle continue button
  const handleContinue = () => {
    // In a real app, we would finalize the uploads and save the data
    router.push("/venue-enrollment/documents");
  };
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <EnrollmentStepper currentStep={3} />
      
      <div className="workout-card p-6 mt-8">
        <h1 className="text-2xl font-bold mb-2">Upload Venue Photos</h1>
        <p className="text-muted-foreground mb-6">
          High-quality photos are essential for attracting customers. Upload at least 5 photos of your venue, including workspace areas, amenities, and exterior.
        </p>
        
        {/* File upload area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors ${
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-16 h-16 mb-4 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium mb-2">
            {dragActive ? "Drop your files here" : "Drag and drop your photos here"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Supported formats: JPG, PNG, WebP (Max 10MB each)
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary py-2 px-4"
          >
            Browse Files
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept="image/*"
            className="hidden"
          />
        </div>
        
        {/* Photo preview grid */}
        {photos.length > 0 && (
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-medium">
              Uploaded Photos ({photos.length})
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative rounded-lg overflow-hidden border border-border">
                  {/* Main photo badge */}
                  {photo.isMainPhoto && (
                    <div className="absolute top-2 left-2 z-10 bg-primary text-white text-xs py-1 px-2 rounded-full">
                      Main Photo
                    </div>
                  )}
                  
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-accent/30">
                    <img 
                      src={photo.url}
                      alt={photo.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Upload progress */}
                  {uploadProgress[photo.id] < 100 ? (
                    <div className="p-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="truncate mr-2">{photo.name}</span>
                        <span>{uploadProgress[photo.id]}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-accent/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${uploadProgress[photo.id]}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm truncate mr-2">{photo.name}</span>
                        <span className="text-xs text-muted-foreground">{formatFileSize(photo.size)}</span>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        {!photo.isMainPhoto && (
                          <button
                            onClick={() => setAsMainPhoto(photo.id)}
                            className="text-xs py-1 px-2 bg-accent/50 hover:bg-accent rounded"
                          >
                            Set as Main
                          </button>
                        )}
                        <button
                          onClick={() => removePhoto(photo.id)}
                          className="text-xs py-1 px-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Add more photos button */}
              <div 
                className="border border-dashed border-border rounded-lg flex flex-col items-center justify-center p-6 aspect-[4/3] cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-muted-foreground mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-sm font-medium">Add More Photos</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>• The first photo you upload or mark as "Main Photo" will be the primary image shown in search results.</p>
              <p>• We recommend uploading photos with at least 1920×1080 resolution for the best quality.</p>
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Link href="/venue-enrollment/steps" className="btn-outline py-2 px-4">
            Back
          </Link>
          
          <button
            onClick={handleContinue}
            className="btn-primary py-2 px-6"
            disabled={photos.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}