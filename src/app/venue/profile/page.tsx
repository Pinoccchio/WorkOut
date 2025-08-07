"use client";

import { useState } from "react";

interface VenueProfile {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  website: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  amenities: string[];
}

export default function VenueProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample venue profile data
  const [venueProfile, setVenueProfile] = useState<VenueProfile>({
    name: "The Coffee Collective",
    description: "A cozy workspace with premium coffee, high-speed Wi-Fi, and a variety of seating options for productivity and comfort. Located in the heart of downtown, we offer the perfect environment for remote workers, freelancers, and small teams.",
    contactEmail: "info@coffeecollective.com",
    contactPhone: "(555) 123-4567",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "United States",
    website: "www.coffeecollective.com",
    socialLinks: {
      facebook: "facebook.com/coffeecollective",
      instagram: "instagram.com/coffeecollective",
      twitter: "twitter.com/coffeecollective"
    },
    businessHours: {
      monday: "7:00 AM - 8:00 PM",
      tuesday: "7:00 AM - 8:00 PM",
      wednesday: "7:00 AM - 8:00 PM",
      thursday: "7:00 AM - 8:00 PM",
      friday: "7:00 AM - 9:00 PM",
      saturday: "8:00 AM - 9:00 PM",
      sunday: "8:00 AM - 6:00 PM"
    },
    amenities: [
      "High-Speed Wi-Fi",
      "Power Outlets",
      "Meeting Rooms",
      "Coffee & Tea",
      "Snacks",
      "Printing Services",
      "Quiet Areas",
      "Outdoor Seating",
      "Bike Parking"
    ]
  });
  
  // Handle saving profile changes
  const handleSaveProfile = () => {
    // In a real app, you would save to the backend here
    setIsEditing(false);
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Venue Profile</h1>
        
        <div>
          {isEditing ? (
            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="py-2 px-4 border border-border rounded-md hover:bg-accent/50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile}
                className="btn-primary py-2 px-4"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="btn-primary py-2 px-4 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21h-9.5A2.25 2.25 0 014 18.75V8.25A2.25 2.25 0 016.25 6H11" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>
      
      {/* Basic Information */}
      <div className="workout-card overflow-hidden mb-8">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-medium">Basic Information</h2>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="venueName" className="block text-sm font-medium mb-2">
                  Venue Name
                </label>
                <input
                  type="text"
                  id="venueName"
                  value={venueProfile.name}
                  onChange={(e) => setVenueProfile({...venueProfile, name: e.target.value})}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={venueProfile.description}
                  onChange={(e) => setVenueProfile({...venueProfile, description: e.target.value})}
                  rows={4}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={venueProfile.contactEmail}
                    onChange={(e) => setVenueProfile({...venueProfile, contactEmail: e.target.value})}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={venueProfile.contactPhone}
                    onChange={(e) => setVenueProfile({...venueProfile, contactPhone: e.target.value})}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-2">
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  value={venueProfile.website}
                  onChange={(e) => setVenueProfile({...venueProfile, website: e.target.value})}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-muted-foreground mb-1">Venue Name</h3>
                <p>{venueProfile.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-muted-foreground mb-1">Description</h3>
                <p>{venueProfile.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Contact Email</h3>
                  <p>{venueProfile.contactEmail}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Contact Phone</h3>
                  <p>{venueProfile.contactPhone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm text-muted-foreground mb-1">Website</h3>
                <p>{venueProfile.website}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Address */}
      <div className="workout-card overflow-hidden mb-8">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-medium">Address</h2>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={venueProfile.address}
                  onChange={(e) => setVenueProfile({...venueProfile, address: e.target.value})}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={venueProfile.city}
                    onChange={(e) => setVenueProfile({...venueProfile, city: e.target.value})}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={venueProfile.state}
                    onChange={(e) => setVenueProfile({...venueProfile, state: e.target.value})}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={venueProfile.postalCode}
                    onChange={(e) => setVenueProfile({...venueProfile, postalCode: e.target.value})}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={venueProfile.country}
                    onChange={(e) => setVenueProfile({...venueProfile, country: e.target.value})}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>{venueProfile.address}</p>
              <p>{venueProfile.city}, {venueProfile.state} {venueProfile.postalCode}</p>
              <p>{venueProfile.country}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Business Hours */}
      <div className="workout-card overflow-hidden mb-8">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-medium">Business Hours</h2>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              {Object.entries(venueProfile.businessHours).map(([day, hours]) => (
                <div key={day} className="grid grid-cols-3 gap-4 items-center">
                  <label htmlFor={day} className="capitalize col-span-1">
                    {day}
                  </label>
                  <input
                    type="text"
                    id={day}
                    value={hours}
                    onChange={(e) => setVenueProfile({
                      ...venueProfile, 
                      businessHours: {
                        ...venueProfile.businessHours,
                        [day]: e.target.value
                      }
                    })}
                    className="col-span-2 p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(venueProfile.businessHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize font-medium">{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Amenities */}
      <div className="workout-card overflow-hidden mb-8">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-medium">Amenities</h2>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {venueProfile.amenities.map((amenity, index) => (
                  <div key={index} className="bg-accent/50 rounded-full px-3 py-1 text-sm flex items-center">
                    <span>{amenity}</span>
                    <button 
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        const newAmenities = [...venueProfile.amenities];
                        newAmenities.splice(index, 1);
                        setVenueProfile({...venueProfile, amenities: newAmenities});
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new amenity"
                  id="newAmenity"
                  className="flex-1 p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
                <button 
                  className="btn-primary py-2 px-4"
                  onClick={() => {
                    const input = document.getElementById('newAmenity') as HTMLInputElement;
                    if (input.value.trim()) {
                      setVenueProfile({
                        ...venueProfile, 
                        amenities: [...venueProfile.amenities, input.value.trim()]
                      });
                      input.value = '';
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {venueProfile.amenities.map((amenity, index) => (
                <span key={index} className="bg-accent/50 rounded-full px-3 py-1 text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Social Media Links */}
      <div className="workout-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-medium">Social Media</h2>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium mb-2">
                  Facebook
                </label>
                <input
                  type="text"
                  id="facebook"
                  value={venueProfile.socialLinks.facebook || ''}
                  onChange={(e) => setVenueProfile({
                    ...venueProfile,
                    socialLinks: {
                      ...venueProfile.socialLinks,
                      facebook: e.target.value
                    }
                  })}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium mb-2">
                  Twitter
                </label>
                <input
                  type="text"
                  id="twitter"
                  value={venueProfile.socialLinks.twitter || ''}
                  onChange={(e) => setVenueProfile({
                    ...venueProfile,
                    socialLinks: {
                      ...venueProfile.socialLinks,
                      twitter: e.target.value
                    }
                  })}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                  Instagram
                </label>
                <input
                  type="text"
                  id="instagram"
                  value={venueProfile.socialLinks.instagram || ''}
                  onChange={(e) => setVenueProfile({
                    ...venueProfile,
                    socialLinks: {
                      ...venueProfile.socialLinks,
                      instagram: e.target.value
                    }
                  })}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  value={venueProfile.socialLinks.linkedin || ''}
                  onChange={(e) => setVenueProfile({
                    ...venueProfile,
                    socialLinks: {
                      ...venueProfile.socialLinks,
                      linkedin: e.target.value
                    }
                  })}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(venueProfile.socialLinks).map(([platform, link]) => (
                link && (
                  <div key={platform} className="flex items-center gap-2">
                    <span className="capitalize font-medium">{platform}:</span>
                    <a href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {link}
                    </a>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}